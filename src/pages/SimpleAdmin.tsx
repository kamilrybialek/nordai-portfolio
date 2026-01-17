import { useState, useEffect } from 'react';
import { client } from '../../.tina/__generated__/client';

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

const SimpleAdmin = () => {
  const [portfolioProjects, setPortfolioProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const portfolioResponse = await client.queries.portfolioConnection();
      const projects = portfolioResponse.data.portfolioConnection.edges?.map((edge: any) => edge.node) || [];
      setPortfolioProjects(projects);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
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
      alert('Error loading project. Check console for details.');
    }
  };

  const handleSave = async () => {
    if (!editingProject) return;

    setSaving(true);
    setSaveMessage('');

    try {
      await client.mutations.updatePortfolio({
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
          body: editingProject.body,
        },
      });

      setSaveMessage('✅ Saved successfully!');
      setTimeout(() => {
        setSaveMessage('');
        setEditingProject(null);
        fetchProjects();
      }, 2000);
    } catch (error) {
      console.error('Error saving:', error);
      setSaveMessage('❌ Error saving. Check console for details.');
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
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-900">Loading Content...</h2>
        </div>
      </div>
    );
  }

  if (editingProject) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Edit Project</h2>
              <button
                onClick={() => setEditingProject(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕ Close
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Project Title *
                </label>
                <input
                  type="text"
                  value={editingProject.title}
                  onChange={(e) => updateField('title', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Client Name *
                </label>
                <input
                  type="text"
                  value={editingProject.client}
                  onChange={(e) => updateField('client', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category *
                </label>
                <select
                  value={editingProject.category}
                  onChange={(e) => updateField('category', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="ai">AI & Automation</option>
                  <option value="web">Web Development</option>
                  <option value="branding">Branding</option>
                  <option value="design">UX/UI Design</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tags (comma-separated)
                </label>
                <input
                  type="text"
                  value={editingProject.tags.join(', ')}
                  onChange={(e) => updateField('tags', e.target.value.split(',').map(t => t.trim()))}
                  placeholder="AI, Automation, Machine Learning"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Short Description (Excerpt) *
                </label>
                <textarea
                  value={editingProject.excerpt}
                  onChange={(e) => updateField('excerpt', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image URL
                </label>
                <input
                  type="text"
                  value={editingProject.image || ''}
                  onChange={(e) => updateField('image', e.target.value)}
                  placeholder="/placeholder.svg"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Project URL
                </label>
                <input
                  type="text"
                  value={editingProject.link || ''}
                  onChange={(e) => updateField('link', e.target.value)}
                  placeholder="https://example.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  SEO Title
                </label>
                <input
                  type="text"
                  value={editingProject.seoTitle || ''}
                  onChange={(e) => updateField('seoTitle', e.target.value)}
                  placeholder="Project Title - Client Name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-xs text-gray-500 mt-1">Recommended: 50-60 characters</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  SEO Description
                </label>
                <textarea
                  value={editingProject.seoDescription || ''}
                  onChange={(e) => updateField('seoDescription', e.target.value)}
                  rows={2}
                  placeholder="Brief description for search engines..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-xs text-gray-500 mt-1">Recommended: 150-160 characters</p>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
                <p className="text-sm text-yellow-800">
                  <strong>Note:</strong> Full content (body) editing is available in the advanced editor.
                  For now, you can edit basic project information here.
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-between items-center">
              <div>
                {saveMessage && (
                  <span className={`text-sm font-medium ${saveMessage.includes('✅') ? 'text-green-600' : 'text-red-600'}`}>
                    {saveMessage}
                  </span>
                )}
              </div>
              <div className="space-x-3">
                <button
                  onClick={() => setEditingProject(null)}
                  className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50"
                  disabled={saving}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="px-4 py-2 bg-blue-600 text-sm font-medium rounded-md text-white hover:bg-blue-700 disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Portfolio Manager</h1>
              <p className="text-sm text-gray-600 mt-1">Manage your portfolio projects</p>
            </div>
            <a
              href="/"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              ← Back to Website
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pb-12">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {portfolioProjects.map((project) => (
            <div key={project.id} className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{project.title}</h3>
              <p className="text-sm text-gray-600 mb-1"><strong>Client:</strong> {project.client}</p>
              <p className="text-sm text-gray-600 mb-3"><strong>Category:</strong> {project.category}</p>
              <p className="text-sm text-gray-700 mb-4 line-clamp-2">{project.excerpt}</p>
              <button
                onClick={() => handleEdit(project.id)}
                className="w-full px-4 py-2 bg-blue-600 text-sm font-medium rounded-md text-white hover:bg-blue-700"
              >
                Edit Project
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SimpleAdmin;
