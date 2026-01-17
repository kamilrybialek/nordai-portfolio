import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Eye, Save, X, FileText, Briefcase } from 'lucide-react';
import { client } from '../../.tina/__generated__/client';
import RichTextEditor from '@/components/admin/RichTextEditor';
import ImageUploader from '@/components/admin/ImageUploader';

interface Project {
  id: string;
  _sys: { filename: string };
  title: string;
  client: string;
  category: string;
  tags: string[];
  excerpt: string;
  image?: string;
  link?: string;
  seoTitle?: string;
  seoDescription?: string;
  body: any;
}

interface Article {
  id: string;
  _sys: { filename: string };
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: number;
  author: string;
  image?: string;
  seoTitle?: string;
  seoDescription?: string;
  body: any;
}

// Helper functions for Markdown conversion
const convertBodyToMarkdown = (body: any): string => {
  if (!body || !body.children) return '';
  return body.children.map((node: any) => {
    switch (node.type) {
      case 'h1': return `# ${node.children.map((child: any) => child.text).join('')}\n\n`;
      case 'h2': return `## ${node.children.map((child: any) => child.text).join('')}\n\n`;
      case 'h3': return `### ${node.children.map((child: any) => child.text).join('')}\n\n`;
      case 'p': return `${node.children.map((child: any) => child.text).join('')}\n\n`;
      case 'ul':
        return node.children.map((li: any) =>
          `- ${li.children.map((lic: any) => lic.children.map((child: any) => child.text).join('')).join('')}\n`
        ).join('') + '\n';
      case 'ol':
        return node.children.map((li: any, idx: number) =>
          `${idx + 1}. ${li.children.map((lic: any) => lic.children.map((child: any) => child.text).join('')).join('')}\n`
        ).join('') + '\n';
      default: return '';
    }
  }).join('');
};

const convertMarkdownToBody = (markdown: string): any => {
  const lines = markdown.split('\n');
  const children: any[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i].trim();
    if (!line) { i++; continue; }

    if (line.startsWith('### ')) {
      children.push({ type: 'h3', children: [{ type: 'text', text: line.substring(4) }] });
    } else if (line.startsWith('## ')) {
      children.push({ type: 'h2', children: [{ type: 'text', text: line.substring(3) }] });
    } else if (line.startsWith('# ')) {
      children.push({ type: 'h1', children: [{ type: 'text', text: line.substring(2) }] });
    } else if (line.startsWith('- ') || line.startsWith('* ')) {
      const listItems: any[] = [];
      while (i < lines.length && (lines[i].trim().startsWith('- ') || lines[i].trim().startsWith('* '))) {
        listItems.push({ type: 'li', children: [{ type: 'lic', children: [{ type: 'text', text: lines[i].trim().substring(2) }] }] });
        i++;
      }
      children.push({ type: 'ul', children: listItems });
      continue;
    } else if (/^\d+\.\s/.test(line)) {
      const listItems: any[] = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i].trim())) {
        listItems.push({ type: 'li', children: [{ type: 'lic', children: [{ type: 'text', text: lines[i].trim().replace(/^\d+\.\s/, '') }] }] });
        i++;
      }
      children.push({ type: 'ol', children: listItems });
      continue;
    } else {
      children.push({ type: 'p', children: [{ type: 'text', text: line }] });
    }
    i++;
  }

  return { type: 'root', children };
};

const FullAdmin = () => {
  const [activeTab, setActiveTab] = useState<'portfolio' | 'blog'>('portfolio');
  const [projects, setProjects] = useState<Project[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const [markdownContent, setMarkdownContent] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (editingProject) {
      setMarkdownContent(convertBodyToMarkdown(editingProject.body));
    } else if (editingArticle) {
      setMarkdownContent(convertBodyToMarkdown(editingArticle.body));
    }
  }, [editingProject, editingArticle]);

  const fetchData = async () => {
    try {
      const [portfolioRes, blogRes] = await Promise.all([
        client.queries.portfolioConnection(),
        client.queries.blogConnection(),
      ]);
      setProjects(portfolioRes.data.portfolioConnection.edges?.map((e: any) => e.node) || []);
      setArticles(blogRes.data.blogConnection.edges?.map((e: any) => e.node) || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const handleEditProject = async (projectId: string) => {
    const filename = projectId.split('/').pop();
    if (!filename) return;
    try {
      const response = await client.queries.portfolio({ relativePath: filename });
      setEditingProject(response.data.portfolio);
      setEditingArticle(null);
    } catch (error) {
      console.error('Error loading project:', error);
    }
  };

  const handleEditArticle = async (articleId: string) => {
    const filename = articleId.split('/').pop();
    if (!filename) return;
    try {
      const response = await client.queries.blog({ relativePath: filename });
      setEditingArticle(response.data.blog);
      setEditingProject(null);
    } catch (error) {
      console.error('Error loading article:', error);
    }
  };

  const handleSave = async () => {
    if (!editingProject && !editingArticle) return;

    setSaving(true);
    setSaveMessage('');

    try {
      if (editingProject) {
        const mutation = `
          mutation UpdatePortfolio($relativePath: String!, $params: PortfolioMutation!) {
            updatePortfolio(relativePath: $relativePath, params: $params) { id title }
          }
        `;

        const response = await fetch('http://localhost:4001/graphql', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            query: mutation,
            variables: {
              relativePath: editingProject._sys.filename,
              params: {
                title: editingProject.title,
                client: editingProject.client,
                category: editingProject.category,
                tags: editingProject.tags,
                excerpt: editingProject.excerpt,
                image: editingProject.image || '',
                link: editingProject.link || '',
                seoTitle: editingProject.seoTitle || '',
                seoDescription: editingProject.seoDescription || '',
                body: convertMarkdownToBody(markdownContent),
              },
            },
          }),
        });

        const result = await response.json();
        if (result.errors) throw new Error(result.errors[0].message);
      } else if (editingArticle) {
        const mutation = `
          mutation UpdateBlog($relativePath: String!, $params: BlogMutation!) {
            updateBlog(relativePath: $relativePath, params: $params) { id title }
          }
        `;

        const response = await fetch('http://localhost:4001/graphql', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            query: mutation,
            variables: {
              relativePath: editingArticle._sys.filename,
              params: {
                title: editingArticle.title,
                excerpt: editingArticle.excerpt,
                category: editingArticle.category,
                date: editingArticle.date,
                readTime: editingArticle.readTime,
                author: editingArticle.author,
                image: editingArticle.image || '',
                seoTitle: editingArticle.seoTitle || '',
                seoDescription: editingArticle.seoDescription || '',
                body: convertMarkdownToBody(markdownContent),
              },
            },
          }),
        });

        const result = await response.json();
        if (result.errors) throw new Error(result.errors[0].message);
      }

      setSaveMessage('✅ Saved successfully!');
      setTimeout(() => {
        setSaveMessage('');
        setEditingProject(null);
        setEditingArticle(null);
        fetchData();
      }, 2000);
    } catch (error) {
      console.error('Error saving:', error);
      setSaveMessage('❌ Error saving');
    } finally {
      setSaving(false);
    }
  };

  const updateProjectField = (field: string, value: any) => {
    if (!editingProject) return;
    setEditingProject({ ...editingProject, [field]: value });
  };

  const updateArticleField = (field: string, value: any) => {
    if (!editingArticle) return;
    setEditingArticle({ ...editingArticle, [field]: value });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4"></div>
          <h2 className="text-xl font-semibold">Loading...</h2>
        </div>
      </div>
    );
  }

  // Editor View
  if (editingProject || editingArticle) {
    const isProject = !!editingProject;
    const item = (editingProject || editingArticle)!;
    const previewLink = isProject
      ? `/portfolio/${item._sys.filename.replace('.mdx', '')}`
      : `/blog/${item._sys.filename.replace('.mdx', '')}`;

    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-card border-b border-border">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => {
                    setEditingProject(null);
                    setEditingArticle(null);
                  }}
                  className="p-2 hover:bg-muted rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <div>
                  <h1 className="text-xl font-bold">
                    {isProject ? 'Edit Project' : 'Edit Article'}
                  </h1>
                  <p className="text-sm text-muted-foreground">{item._sys.filename}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {saveMessage && (
                  <span className={`text-sm font-medium ${saveMessage.includes('✅') ? 'text-green-600' : 'text-red-600'}`}>
                    {saveMessage}
                  </span>
                )}
                <Link
                  to={previewLink}
                  target="_blank"
                  className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors"
                >
                  <Eye className="w-4 h-4" />
                  Preview
                </Link>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  {saving ? 'Saving...' : 'Save'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Editor Content */}
        <div className="container mx-auto px-6 py-8 max-w-5xl">
          <div className="space-y-8">
            {/* Basic Info */}
            <div className="bg-card border border-border rounded-lg p-6 space-y-6">
              <h2 className="text-lg font-bold">Basic Information</h2>

              {isProject ? (
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Project Title *</label>
                    <input
                      type="text"
                      value={editingProject.title}
                      onChange={(e) => updateProjectField('title', e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Client Name *</label>
                    <input
                      type="text"
                      value={editingProject.client}
                      onChange={(e) => updateProjectField('client', e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Category *</label>
                    <select
                      value={editingProject.category}
                      onChange={(e) => updateProjectField('category', e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      <option value="ai">AI & Automation</option>
                      <option value="web">Web Development</option>
                      <option value="branding">Branding</option>
                      <option value="design">UX/UI Design</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Tags</label>
                    <input
                      type="text"
                      value={editingProject.tags.join(', ')}
                      onChange={(e) => updateProjectField('tags', e.target.value.split(',').map(t => t.trim()))}
                      className="w-full px-3 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium mb-2">Short Description *</label>
                    <textarea
                      value={editingProject.excerpt}
                      onChange={(e) => updateProjectField('excerpt', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium mb-2">Project URL</label>
                    <input
                      type="text"
                      value={editingProject.link || ''}
                      onChange={(e) => updateProjectField('link', e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-6">
                  <div className="col-span-2">
                    <label className="block text-sm font-medium mb-2">Article Title *</label>
                    <input
                      type="text"
                      value={editingArticle!.title}
                      onChange={(e) => updateArticleField('title', e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Category *</label>
                    <select
                      value={editingArticle!.category}
                      onChange={(e) => updateArticleField('category', e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      <option value="ai">AI</option>
                      <option value="automation">Automation</option>
                      <option value="design">Design</option>
                      <option value="insights">Insights</option>
                      <option value="trends">Trends</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Author</label>
                    <input
                      type="text"
                      value={editingArticle!.author}
                      onChange={(e) => updateArticleField('author', e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Date *</label>
                    <input
                      type="date"
                      value={editingArticle!.date.split('T')[0]}
                      onChange={(e) => updateArticleField('date', e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Read Time (minutes)</label>
                    <input
                      type="number"
                      value={editingArticle!.readTime}
                      onChange={(e) => updateArticleField('readTime', parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium mb-2">Excerpt *</label>
                    <textarea
                      value={editingArticle!.excerpt}
                      onChange={(e) => updateArticleField('excerpt', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Featured Image */}
            <div className="bg-card border border-border rounded-lg p-6 space-y-6">
              <h2 className="text-lg font-bold">Featured Image</h2>
              <ImageUploader
                currentImage={item.image}
                onImageSelect={(url) => isProject ? updateProjectField('image', url) : updateArticleField('image', url)}
              />
            </div>

            {/* Content Editor */}
            <div className="bg-card border border-border rounded-lg p-6 space-y-6">
              <h2 className="text-lg font-bold">Full Content</h2>
              <RichTextEditor value={markdownContent} onChange={setMarkdownContent} />
            </div>

            {/* SEO */}
            <div className="bg-card border border-border rounded-lg p-6 space-y-6">
              <h2 className="text-lg font-bold">SEO Settings</h2>
              <div>
                <label className="block text-sm font-medium mb-2">SEO Title</label>
                <input
                  type="text"
                  value={item.seoTitle || ''}
                  onChange={(e) => isProject ? updateProjectField('seoTitle', e.target.value) : updateArticleField('seoTitle', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">SEO Description</label>
                <textarea
                  value={item.seoDescription || ''}
                  onChange={(e) => isProject ? updateProjectField('seoDescription', e.target.value) : updateArticleField('seoDescription', e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // List View
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Content Manager</h1>
              <p className="text-muted-foreground mt-1">Manage portfolio projects and blog articles</p>
            </div>
            <Link
              to="/"
              className="px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors"
            >
              ← Back to Website
            </Link>
          </div>
        </div>

        {/* Tabs */}
        <div className="container mx-auto px-6">
          <div className="flex gap-4 border-b border-border">
            <button
              onClick={() => setActiveTab('portfolio')}
              className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors ${
                activeTab === 'portfolio'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              Portfolio ({projects.length})
            </button>
            <button
              onClick={() => setActiveTab('blog')}
              className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors ${
                activeTab === 'blog'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <FileText className="w-4 h-4" />
              Blog ({articles.length})
            </button>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="container mx-auto px-6 py-8">
        {activeTab === 'portfolio' ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div key={project.id} className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-gradient-to-br from-secondary via-accent to-muted"></div>
                <div className="p-6 space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, index) => (
                      <span key={index} className="text-xs px-2 py-1 bg-secondary/50 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-xl font-bold">{project.title}</h3>
                  <p className="text-sm text-muted-foreground">{project.client}</p>
                  <p className="text-sm line-clamp-2">{project.excerpt}</p>
                  <div className="flex gap-2 pt-4">
                    <button
                      onClick={() => handleEditProject(project.id)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
                    >
                      <Edit className="w-4 h-4" />
                      Edit
                    </button>
                    <Link
                      to={`/portfolio/${project._sys.filename.replace('.mdx', '')}`}
                      target="_blank"
                      className="px-4 py-2 border border-border rounded-lg hover:bg-muted flex items-center justify-center"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <div key={article.id} className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10"></div>
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="px-2 py-1 bg-secondary/50 rounded-full">{article.category}</span>
                    <span>{article.readTime} min read</span>
                  </div>
                  <h3 className="text-xl font-bold">{article.title}</h3>
                  <p className="text-sm line-clamp-2">{article.excerpt}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(article.date).toLocaleDateString()} • {article.author}
                  </p>
                  <div className="flex gap-2 pt-4">
                    <button
                      onClick={() => handleEditArticle(article.id)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
                    >
                      <Edit className="w-4 h-4" />
                      Edit
                    </button>
                    <Link
                      to={`/blog/${article._sys.filename.replace('.mdx', '')}`}
                      target="_blank"
                      className="px-4 py-2 border border-border rounded-lg hover:bg-muted flex items-center justify-center"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FullAdmin;
