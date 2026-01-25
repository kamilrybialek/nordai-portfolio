import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import matter from 'gray-matter';

interface FormData {
  title: string;
  excerpt: string;
  category: string;
  language: 'en' | 'pl' | 'sv';
  date?: string;
  readTime?: number;
  author?: string;
  client?: string;
  tags?: string[];
  featured: boolean;
  image: string;
  gallery?: string[];
  link?: string;
  seoTitle: string;
  seoDescription: string;
  body: string;
}

export default function AdminEdit() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type') as 'blog' | 'portfolio';
  const slug = searchParams.get('slug');
  const isNew = searchParams.get('new') === 'true';

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    title: '',
    excerpt: '',
    category: type === 'blog' ? 'ai' : 'web',
    language: 'en',
    date: new Date().toISOString().slice(0, 16),
    readTime: 5,
    author: 'nordAi Team',
    client: '',
    tags: [],
    featured: false,
    image: '/placeholder.svg',
    gallery: [],
    link: '',
    seoTitle: '',
    seoDescription: '',
    body: '',
  });
  const [newTag, setNewTag] = useState('');
  const [newGalleryImage, setNewGalleryImage] = useState('');

  useEffect(() => {
    if (!isNew && slug) {
      loadContent();
    }
  }, [slug, isNew]);

  const loadContent = async () => {
    console.log('📖 [LOAD] Starting load process', {
      type,
      slug,
      isNew,
      timestamp: new Date().toISOString()
    });

    setLoading(true);
    try {
      const token = localStorage.getItem('github_token');
      const path = `content/${type}/${slug}.mdx`;

      console.log('📖 [LOAD] Request details:', {
        path,
        hasToken: !!token,
        tokenLength: token?.length
      });

      const url = `https://api.github.com/repos/kamilrybialek/nordai-portfolio/contents/${path}`;
      console.log('📖 [LOAD] Fetching from:', url);

      const response = await fetch(url, {
        headers: {
          Authorization: `token ${token}`,
          Accept: 'application/vnd.github.v3+json',
        },
      });

      console.log('📖 [LOAD] Response:', {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('📖 [LOAD] Failed to load:', errorText);
        throw new Error(`Failed to load file: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log('📖 [LOAD] Data received:', {
        hasContent: !!data.content,
        name: data.name,
        size: data.size,
        sha: data.sha
      });

      if (!data.content) {
        throw new Error('No content in response');
      }

      const content = atob(data.content);
      console.log('📖 [LOAD] Content decoded, length:', content.length);
      const { data: frontmatter, content: body } = matter(content);

      // Parse language from slug (e.g., "my-post.en" -> "en")
      const languageMatch = slug?.match(/\.(en|pl|sv)$/);
      const detectedLanguage = languageMatch ? languageMatch[1] as 'en' | 'pl' | 'sv' : 'en';

      setFormData({
        title: frontmatter.title || '',
        excerpt: frontmatter.excerpt || '',
        category: frontmatter.category || '',
        language: detectedLanguage,
        date: frontmatter.date || '',
        readTime: frontmatter.readTime,
        author: frontmatter.author,
        client: frontmatter.client,
        tags: frontmatter.tags || [],
        featured: frontmatter.featured || false,
        image: frontmatter.image || '/placeholder.svg',
        gallery: frontmatter.gallery || [],
        link: frontmatter.link,
        seoTitle: frontmatter.seoTitle || '',
        seoDescription: frontmatter.seoDescription || '',
        body: body,
      });
    } catch (error) {
      console.error('Error loading content:', error);
      alert('Failed to load content');
    }
    setLoading(false);
  };

  const handleSave = async () => {
    console.log('💾 [SAVE] Starting save process', {
      isNew,
      type,
      slug,
      formData: {
        title: formData.title,
        language: formData.language,
        hasBody: !!formData.body,
        hasExcerpt: !!formData.excerpt
      },
      timestamp: new Date().toISOString()
    });

    if (!formData.title || !formData.excerpt || !formData.body) {
      console.warn('💾 [SAVE] Validation failed - missing required fields');
      alert('Please fill in all required fields (Title, Excerpt, Content)');
      return;
    }

    setSaving(true);
    try {
      const token = localStorage.getItem('github_token');
      console.log('💾 [SAVE] Token check:', {
        hasToken: !!token,
        tokenLength: token?.length
      });

      // Generate base slug from title (without language suffix)
      let baseSlug: string;
      if (isNew) {
        baseSlug = formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      } else {
        // Remove language suffix from existing slug (e.g., "my-post.en" -> "my-post")
        baseSlug = slug?.replace(/\.(en|pl|sv)$/, '') || '';
      }

      // Add language suffix to filename
      const fileSlug = `${baseSlug}.${formData.language}`;
      const path = `content/${type}/${fileSlug}.mdx`;

      console.log('💾 [SAVE] File path generated:', {
        baseSlug,
        fileSlug,
        fullPath: path,
        language: formData.language
      });

      // Create frontmatter
      const frontmatter: any = {
        title: formData.title,
        excerpt: formData.excerpt,
        category: formData.category,
        featured: formData.featured,
        image: formData.image,
        seoTitle: formData.seoTitle || formData.title,
        seoDescription: formData.seoDescription || formData.excerpt,
      };

      if (type === 'blog') {
        frontmatter.date = formData.date;
        frontmatter.readTime = formData.readTime;
        frontmatter.author = formData.author;
      } else {
        frontmatter.client = formData.client;
        frontmatter.tags = formData.tags;
        if (formData.link) frontmatter.link = formData.link;
      }

      // Add gallery if not empty
      if (formData.gallery && formData.gallery.length > 0) {
        frontmatter.gallery = formData.gallery;
      }

      console.log('💾 [SAVE] Frontmatter created:', frontmatter);

      // Create MDX content
      const mdxContent = matter.stringify(formData.body, frontmatter);
      console.log('💾 [SAVE] MDX content length:', mdxContent.length);

      // Get current file SHA if updating
      let sha = undefined;
      if (!isNew) {
        console.log('💾 [SAVE] Fetching existing file SHA...');
        const currentFile = await fetch(
          `https://api.github.com/repos/kamilrybialek/nordai-portfolio/contents/${path}`,
          {
            headers: {
              Authorization: `token ${token}`,
              Accept: 'application/vnd.github.v3+json',
            },
          }
        );
        console.log('💾 [SAVE] Get SHA response:', {
          status: currentFile.status,
          ok: currentFile.ok
        });

        if (currentFile.ok) {
          const currentData = await currentFile.json();
          sha = currentData.sha;
          console.log('💾 [SAVE] Existing file SHA:', sha);
        } else {
          console.warn('💾 [SAVE] Could not get existing SHA, file might not exist');
        }
      }

      // Save to GitHub
      const requestBody = {
        message: isNew
          ? `Create ${type}: ${formData.title}`
          : `Update ${type}: ${formData.title}`,
        content: btoa(unescape(encodeURIComponent(mdxContent))),
        sha,
        branch: 'main',
      };

      console.log('💾 [SAVE] Sending PUT request:', {
        url: `https://api.github.com/repos/kamilrybialek/nordai-portfolio/contents/${path}`,
        method: 'PUT',
        message: requestBody.message,
        hasSHA: !!sha,
        contentLength: requestBody.content.length
      });

      const response = await fetch(
        `https://api.github.com/repos/kamilrybialek/nordai-portfolio/contents/${path}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `token ${token}`,
            Accept: 'application/vnd.github.v3+json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        }
      );

      console.log('💾 [SAVE] Save response:', {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('💾 [SAVE] Success! Response data:', responseData);
        alert('✅ Saved successfully!');
        console.log('💾 [SAVE] Navigating to /admin');
        navigate('/admin');
      } else {
        const errorText = await response.text();
        console.error('💾 [SAVE] Failed to save:', {
          status: response.status,
          statusText: response.statusText,
          error: errorText
        });
        throw new Error(`Failed to save: ${response.status} ${errorText}`);
      }
    } catch (error) {
      console.error('💾 [SAVE] Error caught:', error);
      console.error('💾 [SAVE] Error stack:', error instanceof Error ? error.stack : 'No stack');
      alert('❌ Failed to save content. Check console for details.');
    }
    setSaving(false);
  };

  const handleDelete = async () => {
    if (!confirm('⚠️ Are you sure you want to delete this item? This cannot be undone!')) return;

    setSaving(true);
    try {
      const token = localStorage.getItem('github_token');
      const path = `content/${type}/${slug}.mdx`;

      // Get file SHA
      const currentFile = await fetch(
        `https://api.github.com/repos/kamilrybialek/nordai-portfolio/contents/${path}`,
        {
          headers: {
            Authorization: `token ${token}`,
            Accept: 'application/vnd.github.v3+json',
          },
        }
      );
      const currentData = await currentFile.json();

      // Delete file
      const response = await fetch(
        `https://api.github.com/repos/kamilrybialek/nordai-portfolio/contents/${path}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `token ${token}`,
            Accept: 'application/vnd.github.v3+json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: `Delete ${type}: ${formData.title}`,
            sha: currentData.sha,
            branch: 'main',
          }),
        }
      );

      if (response.ok) {
        alert('✅ Deleted successfully!');
        navigate('/admin');
      } else {
        throw new Error('Failed to delete');
      }
    } catch (error) {
      console.error('Error deleting:', error);
      alert('❌ Failed to delete content');
    }
    setSaving(false);
  };

  const addTag = () => {
    if (newTag && !formData.tags?.includes(newTag)) {
      setFormData({ ...formData, tags: [...(formData.tags || []), newTag] });
      setNewTag('');
    }
  };

  const removeTag = (tag: string) => {
    setFormData({
      ...formData,
      tags: formData.tags?.filter((t) => t !== tag),
    });
  };

  const addGalleryImage = () => {
    if (newGalleryImage && !formData.gallery?.includes(newGalleryImage)) {
      setFormData({
        ...formData,
        gallery: [...(formData.gallery || []), newGalleryImage],
      });
      setNewGalleryImage('');
    }
  };

  const removeGalleryImage = (index: number) => {
    setFormData({
      ...formData,
      gallery: formData.gallery?.filter((_, i) => i !== index),
    });
  };

  const uploadImageToGitHub = async (file: File): Promise<string> => {
    const token = localStorage.getItem('github_token');
    if (!token) throw new Error('Not authenticated');

    setUploading(true);
    try {
      // Generate filename with timestamp to avoid conflicts
      const timestamp = Date.now();
      const extension = file.name.split('.').pop();
      const filename = `${timestamp}-${file.name.replace(/[^a-z0-9.-]/gi, '-')}`;
      const path = `public/images/${filename}`;

      // Read file as base64
      const reader = new FileReader();
      const fileContent = await new Promise<string>((resolve, reject) => {
        reader.onload = () => {
          const result = reader.result as string;
          // Remove data URL prefix
          const base64 = result.split(',')[1];
          resolve(base64);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      // Upload to GitHub
      const response = await fetch(
        `https://api.github.com/repos/kamilrybialek/nordai-portfolio/contents/${path}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `token ${token}`,
            Accept: 'application/vnd.github.v3+json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: `Upload image: ${filename}`,
            content: fileContent,
            branch: 'main',
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to upload image');
      }

      // Return public URL
      return `/images/${filename}`;
    } catch (error) {
      console.error('Upload error:', error);
      alert('❌ Failed to upload image');
      throw error;
    } finally {
      setUploading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, isGallery = false) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image must be smaller than 5MB');
      return;
    }

    try {
      const imageUrl = await uploadImageToGitHub(file);

      if (isGallery) {
        setFormData({
          ...formData,
          gallery: [...(formData.gallery || []), imageUrl],
        });
        alert('✅ Image uploaded to gallery!');
      } else {
        setFormData({ ...formData, image: imageUrl });
        alert('✅ Featured image uploaded!');
      }
    } catch (error) {
      // Error already handled in uploadImageToGitHub
    }
  };

  const insertMarkdown = (before: string, after: string = '') => {
    const textarea = document.querySelector('textarea[name="body"]') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = formData.body.substring(start, end);
    const newText =
      formData.body.substring(0, start) +
      before +
      selectedText +
      after +
      formData.body.substring(end);

    setFormData({ ...formData, body: newText });

    // Restore cursor position
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, end + before.length);
    }, 0);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Loading content...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={() => navigate('/admin')} size="sm">
                ← Back
              </Button>
              <div>
                <h1 className="text-2xl font-bold">
                  {isNew ? '✨ Create New' : '✏️ Edit'} {type === 'blog' ? 'Article' : 'Project'}
                </h1>
                <p className="text-xs text-muted-foreground mt-1">
                  {isNew ? 'Fill in the form below to create new content' : `Editing: ${slug}`}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              {!isNew && (
                <Button variant="destructive" onClick={handleDelete} disabled={saving} size="sm">
                  🗑️ Delete
                </Button>
              )}
              <Button onClick={handleSave} disabled={saving} size="lg">
                {saving ? '⏳ Saving...' : '💾 Save Changes'}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Form */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="content" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="content">📝 Content</TabsTrigger>
            <TabsTrigger value="media">🖼️ Media & Gallery</TabsTrigger>
            <TabsTrigger value="seo">🔍 SEO & Settings</TabsTrigger>
          </TabsList>

          {/* Content Tab */}
          <TabsContent value="content" className="space-y-6">
            <Card className="p-6 space-y-6">
              <div className="space-y-2">
                <h2 className="text-xl font-semibold">Basic Information</h2>
                <p className="text-sm text-muted-foreground">
                  Main content details that will be visible to your readers
                </p>
              </div>

              {/* Language Selector */}
              <div className="p-4 border-2 border-primary/20 rounded-lg bg-primary/5">
                <label className="block text-sm font-medium mb-2">
                  🌐 Language <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.language}
                  onChange={(e) => setFormData({ ...formData, language: e.target.value as 'en' | 'pl' | 'sv' })}
                  className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-primary"
                >
                  <option value="en">🇬🇧 English</option>
                  <option value="pl">🇵🇱 Polish (Polski)</option>
                  <option value="sv">🇸🇪 Swedish (Svenska)</option>
                </select>
                <p className="text-xs text-muted-foreground mt-2">
                  💡 Content language - Each language version is saved as a separate file
                </p>
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-3 border border-border rounded-lg bg-background text-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="Enter a compelling title..."
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Used for the main heading and SEO
                </p>
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Excerpt <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-primary"
                  rows={3}
                  placeholder="Write a short, engaging summary (1-2 sentences)..."
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {formData.excerpt.length} characters - Appears in cards and previews
                </p>
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-primary"
                >
                  {type === 'blog' ? (
                    <>
                      <option value="ai">🤖 AI</option>
                      <option value="automation">⚙️ Automation</option>
                      <option value="design">🎨 Design</option>
                      <option value="insights">💡 Insights</option>
                      <option value="trends">📈 Trends</option>
                    </>
                  ) : (
                    <>
                      <option value="ai">🤖 AI</option>
                      <option value="web">🌐 Web</option>
                      <option value="branding">🎯 Branding</option>
                      <option value="design">🎨 Design</option>
                    </>
                  )}
                </select>
              </div>

              {/* Blog specific fields */}
              {type === 'blog' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
                  <div>
                    <label className="block text-sm font-medium mb-2">📅 Date</label>
                    <input
                      type="datetime-local"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">⏱️ Read Time</label>
                    <input
                      type="number"
                      value={formData.readTime}
                      onChange={(e) =>
                        setFormData({ ...formData, readTime: parseInt(e.target.value) })
                      }
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background"
                      placeholder="Minutes"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">✍️ Author</label>
                    <input
                      type="text"
                      value={formData.author}
                      onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background"
                    />
                  </div>
                </div>
              )}

              {/* Portfolio specific fields */}
              {type === 'portfolio' && (
                <div className="space-y-4 pt-4 border-t">
                  <div>
                    <label className="block text-sm font-medium mb-2">🏢 Client</label>
                    <input
                      type="text"
                      value={formData.client}
                      onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background"
                      placeholder="Client or company name..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">🏷️ Tags</label>
                    <div className="flex gap-2 mb-3 flex-wrap">
                      {formData.tags?.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm flex items-center gap-2 hover:bg-primary/20 transition-colors"
                        >
                          {tag}
                          <button
                            onClick={() => removeTag(tag)}
                            className="hover:text-destructive font-bold"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                        className="flex-1 px-4 py-2 border border-border rounded-lg bg-background"
                        placeholder="Add a tag and press Enter..."
                      />
                      <Button type="button" onClick={addTag}>
                        + Add
                      </Button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">🔗 Project Link</label>
                    <input
                      type="url"
                      value={formData.link}
                      onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background"
                      placeholder="https://example.com"
                    />
                  </div>
                </div>
              )}
            </Card>

            {/* Content Editor */}
            <Card className="p-6 space-y-4">
              <div className="space-y-2">
                <h2 className="text-xl font-semibold">Content Editor</h2>
                <p className="text-sm text-muted-foreground">
                  Write your content in Markdown format
                </p>
              </div>

              {/* Markdown Toolbar */}
              <div className="flex gap-2 flex-wrap border-b pb-4">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => insertMarkdown('**', '**')}
                  title="Bold"
                >
                  <strong>B</strong>
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => insertMarkdown('*', '*')}
                  title="Italic"
                >
                  <em>I</em>
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => insertMarkdown('\n## ')}
                  title="Heading"
                >
                  H2
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => insertMarkdown('\n### ')}
                  title="Subheading"
                >
                  H3
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => insertMarkdown('[', '](url)')}
                  title="Link"
                >
                  🔗 Link
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => insertMarkdown('![alt text](', ')')}
                  title="Image"
                >
                  🖼️ Image
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => insertMarkdown('\n- ')}
                  title="List"
                >
                  • List
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => insertMarkdown('\n```\n', '\n```\n')}
                  title="Code Block"
                >
                  {'</>'}
                </Button>
              </div>

              <div>
                <textarea
                  name="body"
                  value={formData.body}
                  onChange={(e) => setFormData({ ...formData, body: e.target.value })}
                  className="w-full px-4 py-3 border border-border rounded-lg bg-background font-mono text-sm focus:ring-2 focus:ring-primary focus:border-primary"
                  rows={25}
                  placeholder="Write your content here using Markdown...

Example:
## Section Heading

This is a paragraph with **bold** and *italic* text.

- List item 1
- List item 2

[Link text](https://example.com)"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  💡 Tip: Use the toolbar buttons above to quickly insert Markdown formatting
                </p>
              </div>
            </Card>
          </TabsContent>

          {/* Media Tab */}
          <TabsContent value="media" className="space-y-6">
            <Card className="p-6 space-y-6">
              <div className="space-y-2">
                <h2 className="text-xl font-semibold">Featured Image</h2>
                <p className="text-sm text-muted-foreground">
                  Main image shown in cards and at the top of your post
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Upload Image</label>
                  <div className="flex gap-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, false)}
                      className="hidden"
                      id="featured-image-upload"
                      disabled={uploading}
                    />
                    <label
                      htmlFor="featured-image-upload"
                      className={`flex-1 px-4 py-3 border-2 border-dashed border-border rounded-lg text-center cursor-pointer hover:border-primary transition-colors ${
                        uploading ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      {uploading ? (
                        <span className="flex items-center justify-center gap-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                          Uploading...
                        </span>
                      ) : (
                        <span className="flex items-center justify-center gap-2">
                          📤 Click to upload image (max 5MB)
                        </span>
                      )}
                    </label>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Automatically uploads to /public/images/ via GitHub
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border"></div>
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="bg-card px-2 text-muted-foreground">OR</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Image URL</label>
                  <input
                    type="text"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background"
                    placeholder="/images/your-image.jpg or https://..."
                  />
                </div>

                {formData.image && formData.image !== '/placeholder.svg' && (
                  <div className="mt-4 rounded-lg border border-border overflow-hidden">
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="w-full max-h-96 object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/placeholder.svg';
                      }}
                    />
                  </div>
                )}
              </div>
            </Card>

            {/* Gallery */}
            <Card className="p-6 space-y-6">
              <div className="space-y-2">
                <h2 className="text-xl font-semibold">🖼️ Gallery</h2>
                <p className="text-sm text-muted-foreground">
                  Add multiple images to display in a gallery at the end of your post
                </p>
              </div>

              {/* Gallery Images */}
              {formData.gallery && formData.gallery.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {formData.gallery.map((url, index) => (
                    <div key={index} className="relative group rounded-lg border border-border overflow-hidden">
                      <img
                        src={url}
                        alt={`Gallery ${index + 1}`}
                        className="w-full h-48 object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/placeholder.svg';
                        }}
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => removeGalleryImage(index)}
                        >
                          🗑️ Remove
                        </Button>
                      </div>
                      <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                        #{index + 1}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Add Gallery Image */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Upload to Gallery</label>
                  <div className="flex gap-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, true)}
                      className="hidden"
                      id="gallery-image-upload"
                      disabled={uploading}
                    />
                    <label
                      htmlFor="gallery-image-upload"
                      className={`flex-1 px-4 py-3 border-2 border-dashed border-border rounded-lg text-center cursor-pointer hover:border-primary transition-colors ${
                        uploading ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      {uploading ? (
                        <span className="flex items-center justify-center gap-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                          Uploading...
                        </span>
                      ) : (
                        <span className="flex items-center justify-center gap-2">
                          📤 Upload image to gallery (max 5MB)
                        </span>
                      )}
                    </label>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border"></div>
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="bg-card px-2 text-muted-foreground">OR</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Add from URL</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newGalleryImage}
                      onChange={(e) => setNewGalleryImage(e.target.value)}
                      onKeyPress={(e) =>
                        e.key === 'Enter' && (e.preventDefault(), addGalleryImage())
                      }
                      className="flex-1 px-4 py-2 border border-border rounded-lg bg-background"
                      placeholder="/images/gallery-image.jpg or https://..."
                    />
                    <Button type="button" onClick={addGalleryImage}>
                      + Add URL
                    </Button>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground">
                  💡 Uploaded images are automatically committed to GitHub repository
                </p>
              </div>
            </Card>
          </TabsContent>

          {/* SEO Tab */}
          <TabsContent value="seo" className="space-y-6">
            <Card className="p-6 space-y-6">
              <div className="space-y-2">
                <h2 className="text-xl font-semibold">🔍 SEO Settings</h2>
                <p className="text-sm text-muted-foreground">
                  Optimize your content for search engines
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">SEO Title</label>
                <input
                  type="text"
                  value={formData.seoTitle}
                  onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background"
                  placeholder={formData.title || 'Leave empty to use main title'}
                  maxLength={60}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {formData.seoTitle.length}/60 characters - Shown in search results
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">SEO Description</label>
                <textarea
                  value={formData.seoDescription}
                  onChange={(e) => setFormData({ ...formData, seoDescription: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background"
                  rows={3}
                  placeholder={formData.excerpt || 'Leave empty to use excerpt'}
                  maxLength={160}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {formData.seoDescription.length}/160 characters - Meta description for search engines
                </p>
              </div>

              {/* Featured Toggle */}
              <div className="flex items-start gap-3 p-4 border border-border rounded-lg bg-muted/20">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-5 h-5 mt-0.5"
                />
                <div className="flex-1">
                  <label htmlFor="featured" className="text-sm font-medium cursor-pointer">
                    ⭐ Featured on Homepage
                  </label>
                  <p className="text-xs text-muted-foreground mt-1">
                    Enable this to show this content on the homepage featured section
                  </p>
                </div>
              </div>

              {/* SEO Preview */}
              <div className="p-4 border border-border rounded-lg bg-muted/10">
                <h3 className="text-sm font-semibold mb-3">Search Engine Preview</h3>
                <div className="space-y-1">
                  <div className="text-blue-600 text-lg hover:underline cursor-default">
                    {formData.seoTitle || formData.title || 'Your Title Here'}
                  </div>
                  <div className="text-green-700 text-sm">
                    nordai.studio › {type} › {formData.title.toLowerCase().replace(/\s+/g, '-')}
                  </div>
                  <div className="text-sm text-gray-600">
                    {formData.seoDescription || formData.excerpt || 'Your description will appear here...'}
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Save Button (bottom) */}
        <div className="sticky bottom-4 flex justify-end mt-8">
          <Button onClick={handleSave} disabled={saving} size="lg" className="shadow-lg">
            {saving ? '⏳ Saving to GitHub...' : '💾 Save All Changes'}
          </Button>
        </div>
      </div>
    </div>
  );
}
