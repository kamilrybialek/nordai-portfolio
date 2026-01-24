import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import matter from 'gray-matter';

interface FormData {
  title: string;
  excerpt: string;
  category: string;
  date?: string;
  readTime?: number;
  author?: string;
  client?: string;
  tags?: string[];
  featured: boolean;
  image: string;
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
  const [formData, setFormData] = useState<FormData>({
    title: '',
    excerpt: '',
    category: type === 'blog' ? 'ai' : 'web',
    date: new Date().toISOString().slice(0, 16),
    readTime: 5,
    author: 'nordAi Team',
    client: '',
    tags: [],
    featured: false,
    image: '/placeholder.svg',
    link: '',
    seoTitle: '',
    seoDescription: '',
    body: '',
  });
  const [newTag, setNewTag] = useState('');

  useEffect(() => {
    if (!isNew && slug) {
      loadContent();
    }
  }, [slug, isNew]);

  const loadContent = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('github_token');
      const path = `content/${type}/${slug}.mdx`;

      const response = await fetch(
        `https://api.github.com/repos/kamilrybialek/nordai-portfolio/contents/${path}`,
        {
          headers: {
            Authorization: `token ${token}`,
            Accept: 'application/vnd.github.v3+json',
          },
        }
      );

      const data = await response.json();
      const content = atob(data.content);
      const { data: frontmatter, content: body } = matter(content);

      setFormData({
        title: frontmatter.title || '',
        excerpt: frontmatter.excerpt || '',
        category: frontmatter.category || '',
        date: frontmatter.date || '',
        readTime: frontmatter.readTime,
        author: frontmatter.author,
        client: frontmatter.client,
        tags: frontmatter.tags || [],
        featured: frontmatter.featured || false,
        image: frontmatter.image || '/placeholder.svg',
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
    if (!formData.title || !formData.excerpt || !formData.body) {
      alert('Please fill in all required fields');
      return;
    }

    setSaving(true);
    try {
      const token = localStorage.getItem('github_token');
      const fileSlug = isNew
        ? formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')
        : slug;
      const path = `content/${type}/${fileSlug}.mdx`;

      // Create frontmatter
      const frontmatter: any = {
        title: formData.title,
        excerpt: formData.excerpt,
        category: formData.category,
        featured: formData.featured,
        image: formData.image,
        seoTitle: formData.seoTitle,
        seoDescription: formData.seoDescription,
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

      // Create MDX content
      const mdxContent = matter.stringify(formData.body, frontmatter);

      // Get current file SHA if updating
      let sha = undefined;
      if (!isNew) {
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
        sha = currentData.sha;
      }

      // Save to GitHub
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
            message: isNew
              ? `Create ${type}: ${formData.title}`
              : `Update ${type}: ${formData.title}`,
            content: btoa(unescape(encodeURIComponent(mdxContent))),
            sha,
            branch: 'main',
          }),
        }
      );

      if (response.ok) {
        alert('Saved successfully!');
        navigate('/admin');
      } else {
        throw new Error('Failed to save');
      }
    } catch (error) {
      console.error('Error saving:', error);
      alert('Failed to save content');
    }
    setSaving(false);
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this item?')) return;

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
        alert('Deleted successfully!');
        navigate('/admin');
      } else {
        throw new Error('Failed to delete');
      }
    } catch (error) {
      console.error('Error deleting:', error);
      alert('Failed to delete content');
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={() => navigate('/admin')}>
                ← Back
              </Button>
              <h1 className="text-2xl font-bold">
                {isNew ? 'Create New' : 'Edit'} {type === 'blog' ? 'Article' : 'Project'}
              </h1>
            </div>
            <div className="flex gap-2">
              {!isNew && (
                <Button variant="destructive" onClick={handleDelete} disabled={saving}>
                  Delete
                </Button>
              )}
              <Button onClick={handleSave} disabled={saving}>
                {saving ? 'Saving...' : 'Save'}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Form */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="p-6 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 border border-border rounded-md bg-background"
              placeholder="Enter title..."
            />
          </div>

          {/* Excerpt */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Excerpt <span className="text-red-500">*</span>
            </label>
            <textarea
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              className="w-full px-3 py-2 border border-border rounded-md bg-background"
              rows={3}
              placeholder="Short description..."
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium mb-2">Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-3 py-2 border border-border rounded-md bg-background"
            >
              {type === 'blog' ? (
                <>
                  <option value="ai">AI</option>
                  <option value="automation">Automation</option>
                  <option value="design">Design</option>
                  <option value="insights">Insights</option>
                  <option value="trends">Trends</option>
                </>
              ) : (
                <>
                  <option value="ai">AI</option>
                  <option value="web">Web</option>
                  <option value="branding">Branding</option>
                  <option value="design">Design</option>
                </>
              )}
            </select>
          </div>

          {/* Blog specific fields */}
          {type === 'blog' && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Date</label>
                  <input
                    type="datetime-local"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3 py-2 border border-border rounded-md bg-background"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Read Time (min)</label>
                  <input
                    type="number"
                    value={formData.readTime}
                    onChange={(e) =>
                      setFormData({ ...formData, readTime: parseInt(e.target.value) })
                    }
                    className="w-full px-3 py-2 border border-border rounded-md bg-background"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Author</label>
                <input
                  type="text"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background"
                />
              </div>
            </>
          )}

          {/* Portfolio specific fields */}
          {type === 'portfolio' && (
            <>
              <div>
                <label className="block text-sm font-medium mb-2">Client</label>
                <input
                  type="text"
                  value={formData.client}
                  onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background"
                  placeholder="Client name..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Tags</label>
                <div className="flex gap-2 mb-2 flex-wrap">
                  {formData.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm flex items-center gap-2"
                    >
                      {tag}
                      <button
                        onClick={() => removeTag(tag)}
                        className="hover:text-destructive"
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
                    className="flex-1 px-3 py-2 border border-border rounded-md bg-background"
                    placeholder="Add tag..."
                  />
                  <Button type="button" onClick={addTag}>
                    Add
                  </Button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Project Link</label>
                <input
                  type="url"
                  value={formData.link}
                  onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background"
                  placeholder="https://..."
                />
              </div>
            </>
          )}

          {/* Image */}
          <div>
            <label className="block text-sm font-medium mb-2">Image URL</label>
            <input
              type="text"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="w-full px-3 py-2 border border-border rounded-md bg-background"
              placeholder="/images/..."
            />
            {formData.image && formData.image !== '/placeholder.svg' && (
              <img
                src={formData.image}
                alt="Preview"
                className="mt-2 max-w-xs rounded-lg border border-border"
              />
            )}
          </div>

          {/* Featured */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="featured"
              checked={formData.featured}
              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              className="w-4 h-4"
            />
            <label htmlFor="featured" className="text-sm font-medium">
              Featured on Homepage
            </label>
          </div>

          {/* SEO */}
          <div className="space-y-4 pt-4 border-t border-border">
            <h3 className="font-semibold">SEO Settings</h3>
            <div>
              <label className="block text-sm font-medium mb-2">SEO Title</label>
              <input
                type="text"
                value={formData.seoTitle}
                onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
                className="w-full px-3 py-2 border border-border rounded-md bg-background"
                placeholder="Leave empty to use title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">SEO Description</label>
              <textarea
                value={formData.seoDescription}
                onChange={(e) =>
                  setFormData({ ...formData, seoDescription: e.target.value })
                }
                className="w-full px-3 py-2 border border-border rounded-md bg-background"
                rows={2}
                placeholder="Leave empty to use excerpt"
              />
            </div>
          </div>

          {/* Body */}
          <div className="pt-4 border-t border-border">
            <label className="block text-sm font-medium mb-2">
              Content (Markdown) <span className="text-red-500">*</span>
            </label>
            <textarea
              value={formData.body}
              onChange={(e) => setFormData({ ...formData, body: e.target.value })}
              className="w-full px-3 py-2 border border-border rounded-md bg-background font-mono text-sm"
              rows={20}
              placeholder="Write your content in markdown..."
            />
          </div>
        </Card>
      </div>
    </div>
  );
}
