import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, Eye, Save, X } from 'lucide-react';
import { client } from '../../.tina/__generated__/client';
import RichTextEditor from '@/components/admin/RichTextEditor';
import ImageUploader from '@/components/admin/ImageUploader';

interface Project {
  id: string;
  _sys: {
    filename: string;
  };
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

// Helper functions to convert between TinaCMS body format and Markdown
const convertBodyToMarkdown = (body: any): string => {
  if (!body || !body.children) return '';

  return body.children.map((node: any) => {
    switch (node.type) {
      case 'h1':
        return `# ${node.children.map((child: any) => child.text).join('')}\n\n`;
      case 'h2':
        return `## ${node.children.map((child: any) => child.text).join('')}\n\n`;
      case 'h3':
        return `### ${node.children.map((child: any) => child.text).join('')}\n\n`;
      case 'p':
        return `${node.children.map((child: any) => child.text).join('')}\n\n`;
      case 'ul':
        return node.children.map((li: any) =>
          `- ${li.children.map((lic: any) => lic.children.map((child: any) => child.text).join('')).join('')}\n`
        ).join('') + '\n';
      case 'ol':
        return node.children.map((li: any, idx: number) =>
          `${idx + 1}. ${li.children.map((lic: any) => lic.children.map((child: any) => child.text).join('')).join('')}\n`
        ).join('') + '\n';
      default:
        return '';
    }
  }).join('');
};

const convertMarkdownToBody = (markdown: string): any => {
  const lines = markdown.split('\n');
  const children: any[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i].trim();

    if (!line) {
      i++;
      continue;
    }

    if (line.startsWith('### ')) {
      children.push({
        type: 'h3',
        children: [{ type: 'text', text: line.substring(4) }]
      });
    } else if (line.startsWith('## ')) {
      children.push({
        type: 'h2',
        children: [{ type: 'text', text: line.substring(3) }]
      });
    } else if (line.startsWith('# ')) {
      children.push({
        type: 'h1',
        children: [{ type: 'text', text: line.substring(2) }]
      });
    } else if (line.startsWith('- ') || line.startsWith('* ')) {
      const listItems: any[] = [];
      while (i < lines.length && (lines[i].trim().startsWith('- ') || lines[i].trim().startsWith('* '))) {
        const itemText = lines[i].trim().substring(2);
        listItems.push({
          type: 'li',
          children: [{
            type: 'lic',
            children: [{ type: 'text', text: itemText }]
          }]
        });
        i++;
      }
      children.push({
        type: 'ul',
        children: listItems
      });
      continue;
    } else if (/^\d+\.\s/.test(line)) {
      const listItems: any[] = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i].trim())) {
        const itemText = lines[i].trim().replace(/^\d+\.\s/, '');
        listItems.push({
          type: 'li',
          children: [{
            type: 'lic',
            children: [{ type: 'text', text: itemText }]
          }]
        });
        i++;
      }
      children.push({
        type: 'ol',
        children: listItems
      });
      continue;
    } else {
      children.push({
        type: 'p',
        children: [{ type: 'text', text: line }]
      });
    }

    i++;
  }

  return {
    type: 'root',
    children
  };
};

const FullAdmin = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [creatingNew, setCreatingNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const [markdownContent, setMarkdownContent] = useState('');

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    if (editingProject) {
      setMarkdownContent(convertBodyToMarkdown(editingProject.body));
    }
  }, [editingProject]);

  const fetchProjects = async () => {
    try {
      const response = await client.queries.portfolioConnection();
      const projects = response.data.portfolioConnection.edges?.map((edge: any) => edge.node) || [];
      setProjects(projects);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching projects:', error);
      setLoading(false);
    }
  };

  const handleEdit = async (projectId: string) => {
    const filename = projectId.split('/').pop();
    if (!filename) return;

    try {
      const response = await client.queries.portfolio({
        relativePath: filename,
      });
      setEditingProject(response.data.portfolio);
    } catch (error) {
      console.error('Error loading project:', error);
      alert('Error loading project');
    }
  };

  const handleCreateNew = () => {
    const newProject: Project = {
      id: 'new',
      _sys: { filename: 'new-project.mdx' },
      title: '',
      client: '',
      category: 'ai',
      tags: [],
      excerpt: '',
      image: '',
      link: '',
      seoTitle: '',
      seoDescription: '',
      body: { type: 'root', children: [] }
    };
    setEditingProject(newProject);
    setCreatingNew(true);
  };

  const handleSave = async () => {
    if (!editingProject) return;

    setSaving(true);
    setSaveMessage('');

    try {
      const mutation = `
        mutation UpdatePortfolio($relativePath: String!, $params: PortfolioMutation!) {
          updatePortfolio(relativePath: $relativePath, params: $params) {
            id
            title
          }
        }
      `;

      const response = await fetch('http://localhost:4001/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
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

      if (result.errors) {
        throw new Error(result.errors[0].message);
      }

      setSaveMessage('✅ Saved successfully!');
      setTimeout(() => {
        setSaveMessage('');
        setEditingProject(null);
        setCreatingNew(false);
        fetchProjects();
      }, 2000);
    } catch (error) {
      console.error('Error saving:', error);
      setSaveMessage('❌ Error saving. Check console.');
    } finally {
      setSaving(false);
    }
  };

  const updateField = (field: string, value: any) => {
    if (!editingProject) return;
    setEditingProject({
      ...editingProject,
      [field]: value,
    });
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

  if (editingProject) {
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
                    setCreatingNew(false);
                  }}
                  className="p-2 hover:bg-muted rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <div>
                  <h1 className="text-xl font-bold">
                    {creatingNew ? 'Create New Project' : 'Edit Project'}
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    {editingProject._sys.filename}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {saveMessage && (
                  <span className={`text-sm font-medium ${saveMessage.includes('✅') ? 'text-green-600' : 'text-red-600'}`}>
                    {saveMessage}
                  </span>
                )}
                <Link
                  to={`/portfolio/${editingProject._sys.filename.replace('.mdx', '')}`}
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

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Project Title *</label>
                  <input
                    type="text"
                    value={editingProject.title}
                    onChange={(e) => updateField('title', e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Client Name *</label>
                  <input
                    type="text"
                    value={editingProject.client}
                    onChange={(e) => updateField('client', e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Category *</label>
                  <select
                    value={editingProject.category}
                    onChange={(e) => updateField('category', e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="ai">AI & Automation</option>
                    <option value="web">Web Development</option>
                    <option value="branding">Branding</option>
                    <option value="design">UX/UI Design</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Tags (comma-separated)</label>
                  <input
                    type="text"
                    value={editingProject.tags.join(', ')}
                    onChange={(e) => updateField('tags', e.target.value.split(',').map(t => t.trim()))}
                    placeholder="AI, Automation, Machine Learning"
                    className="w-full px-3 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Short Description (Excerpt) *</label>
                <textarea
                  value={editingProject.excerpt}
                  onChange={(e) => updateField('excerpt', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Project URL</label>
                <input
                  type="text"
                  value={editingProject.link || ''}
                  onChange={(e) => updateField('link', e.target.value)}
                  placeholder="https://example.com"
                  className="w-full px-3 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>

            {/* Featured Image */}
            <div className="bg-card border border-border rounded-lg p-6 space-y-6">
              <h2 className="text-lg font-bold">Featured Image</h2>
              <ImageUploader
                currentImage={editingProject.image}
                onImageSelect={(url) => updateField('image', url)}
              />
            </div>

            {/* Content Editor */}
            <div className="bg-card border border-border rounded-lg p-6 space-y-6">
              <h2 className="text-lg font-bold">Full Content</h2>
              <RichTextEditor
                value={markdownContent}
                onChange={setMarkdownContent}
              />
            </div>

            {/* SEO */}
            <div className="bg-card border border-border rounded-lg p-6 space-y-6">
              <h2 className="text-lg font-bold">SEO Settings</h2>

              <div>
                <label className="block text-sm font-medium mb-2">SEO Title</label>
                <input
                  type="text"
                  value={editingProject.seoTitle || ''}
                  onChange={(e) => updateField('seoTitle', e.target.value)}
                  placeholder="Project Title - Client Name"
                  className="w-full px-3 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <p className="text-xs text-muted-foreground mt-1">Recommended: 50-60 characters</p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">SEO Description</label>
                <textarea
                  value={editingProject.seoDescription || ''}
                  onChange={(e) => updateField('seoDescription', e.target.value)}
                  rows={2}
                  placeholder="Brief description for search engines..."
                  className="w-full px-3 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <p className="text-xs text-muted-foreground mt-1">Recommended: 150-160 characters</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Portfolio Manager</h1>
              <p className="text-muted-foreground mt-1">Manage your portfolio projects with a full visual editor</p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                to="/"
                className="px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors"
              >
                ← Back to Website
              </Link>
              <button
                onClick={handleCreateNew}
                className="flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                <Plus className="w-4 h-4" />
                New Project
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-gradient-to-br from-secondary via-accent to-muted"></div>
              <div className="p-6 space-y-4">
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="text-xs px-2 py-1 bg-secondary/50 text-secondary-foreground rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-xl font-bold">{project.title}</h3>
                <p className="text-sm text-muted-foreground">{project.client}</p>
                <p className="text-sm text-muted-foreground line-clamp-2">{project.excerpt}</p>

                <div className="flex gap-2 pt-4">
                  <button
                    onClick={() => handleEdit(project.id)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                  <Link
                    to={`/portfolio/${project._sys.filename.replace('.mdx', '')}`}
                    target="_blank"
                    className="px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FullAdmin;
