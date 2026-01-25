import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { getBlogArticles, getPortfolioProjects } from '@/lib/tina';
import type { BlogArticle, PortfolioProject } from '@/lib/tina';

const GITHUB_CLIENT_ID = import.meta.env.VITE_GITHUB_CLIENT_ID || '';
const AUTHORIZED_USERS = ['kamilrybialek']; // Lista autoryzowanych userów

export default function Admin() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [blogPosts, setBlogPosts] = useState<BlogArticle[]>([]);
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [activeTab, setActiveTab] = useState<'blog' | 'portfolio' | 'messages'>('blog');
  const [languageFilter, setLanguageFilter] = useState<'all' | 'en' | 'pl' | 'sv'>('all');
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    // Check for OAuth callback
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
      // Exchange code for token
      handleOAuthCallback(code);
    } else {
      // Check if already authenticated
      const token = localStorage.getItem('github_token');
      const userData = localStorage.getItem('github_user');

      if (token && userData) {
        const parsedUser = JSON.parse(userData);
        if (AUTHORIZED_USERS.includes(parsedUser.login)) {
          setUser(parsedUser);
          loadContent();
        } else {
          localStorage.removeItem('github_token');
          localStorage.removeItem('github_user');
        }
      }
      setLoading(false);
    }
  }, []);

  const handleOAuthCallback = async (code: string) => {
    try {
      // Exchange code for access token via our backend (works on both Vercel and Netlify)
      const response = await fetch(`/api/github-oauth?code=${code}`);
      const data = await response.json();

      if (data.access_token) {
        localStorage.setItem('github_token', data.access_token);

        // Get user info
        const userResponse = await fetch('https://api.github.com/user', {
          headers: {
            Authorization: `token ${data.access_token}`,
          },
        });
        const userData = await userResponse.json();

        // Check if user is authorized
        if (AUTHORIZED_USERS.includes(userData.login)) {
          localStorage.setItem('github_user', JSON.stringify(userData));
          setUser(userData);
          loadContent();
          window.history.replaceState({}, '', '/admin');
        } else {
          alert('Unauthorized user. Contact admin for access.');
          handleLogout();
        }
      }
    } catch (error) {
      console.error('OAuth error:', error);
      alert('Authentication failed');
    }
    setLoading(false);
  };

  const handleLogin = () => {
    const redirectUri = `${window.location.origin}/admin`;
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${redirectUri}&scope=repo`;
    window.location.href = githubAuthUrl;
  };

  const handleLogout = () => {
    localStorage.removeItem('github_token');
    localStorage.removeItem('github_user');
    setUser(null);
  };

  const loadContent = async () => {
    const [articles, portfolioProjects] = await Promise.all([
      getBlogArticles(),
      getPortfolioProjects(),
    ]);
    setBlogPosts(articles);
    setProjects(portfolioProjects);
    setSelectedItems(new Set()); // Clear selection when reloading
  };

  const handleDelete = async (filename: string) => {
    if (!confirm(`Are you sure you want to delete this ${activeTab === 'blog' ? 'article' : 'project'}?`)) {
      return;
    }

    setDeleting(true);
    try {
      const token = localStorage.getItem('github_token');
      const path = `content/${activeTab}/${filename}.mdx`;

      // Get file SHA
      const getResponse = await fetch(
        `https://api.github.com/repos/kamilrybialek/nordai-portfolio/contents/${path}`,
        {
          headers: {
            Authorization: `token ${token}`,
            Accept: 'application/vnd.github.v3+json',
          },
        }
      );

      if (!getResponse.ok) {
        throw new Error('Failed to get file info');
      }

      const fileData = await getResponse.json();

      // Delete file
      const deleteResponse = await fetch(
        `https://api.github.com/repos/kamilrybialek/nordai-portfolio/contents/${path}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `token ${token}`,
            Accept: 'application/vnd.github.v3+json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: `Delete ${activeTab}: ${filename}`,
            sha: fileData.sha,
            branch: 'main',
          }),
        }
      );

      if (deleteResponse.ok) {
        alert('✅ Deleted successfully!');
        loadContent(); // Reload content
      } else {
        throw new Error('Failed to delete file');
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('❌ Failed to delete. Check console for details.');
    } finally {
      setDeleting(false);
    }
  };

  const handleBulkDelete = async () => {
    if (selectedItems.size === 0) {
      alert('No items selected');
      return;
    }

    if (!confirm(`Are you sure you want to delete ${selectedItems.size} items? This cannot be undone!`)) {
      return;
    }

    setDeleting(true);
    const token = localStorage.getItem('github_token');
    let successCount = 0;
    let failCount = 0;

    for (const filename of Array.from(selectedItems)) {
      try {
        const path = `content/${activeTab}/${filename}.mdx`;

        // Get file SHA
        const getResponse = await fetch(
          `https://api.github.com/repos/kamilrybialek/nordai-portfolio/contents/${path}`,
          {
            headers: {
              Authorization: `token ${token}`,
              Accept: 'application/vnd.github.v3+json',
            },
          }
        );

        if (!getResponse.ok) throw new Error('Failed to get file');

        const fileData = await getResponse.json();

        // Delete file
        const deleteResponse = await fetch(
          `https://api.github.com/repos/kamilrybialek/nordai-portfolio/contents/${path}`,
          {
            method: 'DELETE',
            headers: {
              Authorization: `token ${token}`,
              Accept: 'application/vnd.github.v3+json',
            },
            body: JSON.stringify({
              message: `Bulk delete: ${filename}`,
              sha: fileData.sha,
              branch: 'main',
            }),
          }
        );

        if (deleteResponse.ok) {
          successCount++;
        } else {
          failCount++;
        }
      } catch (error) {
        console.error(`Failed to delete ${filename}:`, error);
        failCount++;
      }
    }

    setDeleting(false);
    alert(`✅ Deleted ${successCount} items${failCount > 0 ? `, ${failCount} failed` : ''}`);
    loadContent();
  };

  const toggleItemSelection = (filename: string) => {
    const newSelected = new Set(selectedItems);
    if (newSelected.has(filename)) {
      newSelected.delete(filename);
    } else {
      newSelected.add(filename);
    }
    setSelectedItems(newSelected);
  };

  const toggleSelectAll = () => {
    if (selectedItems.size === items.length) {
      setSelectedItems(new Set());
    } else {
      setSelectedItems(new Set(items.map(item => item._sys.filename)));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/20 to-background">
        <Card className="p-8 max-w-md w-full">
          <div className="text-center space-y-6">
            <h1 className="text-3xl font-bold">nordAi CMS</h1>
            <p className="text-muted-foreground">
              Secure admin panel for managing blog and portfolio content
            </p>
            <Button onClick={handleLogin} size="lg" className="w-full">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              Login with GitHub
            </Button>
            <p className="text-xs text-muted-foreground">
              Only authorized users can access this panel
            </p>
          </div>
        </Card>
      </div>
    );
  }

  // Helper function to extract language from slug
  const getLanguageFromSlug = (slug: string): string => {
    const match = slug.match(/\.(en|pl|sv)$/);
    return match ? match[1] : 'en';
  };

  // Filter items by language (only for blog/portfolio tabs)
  const allItems = activeTab === 'messages' ? [] : (activeTab === 'blog' ? blogPosts : projects);
  const items = (languageFilter === 'all' || activeTab === 'messages')
    ? allItems
    : allItems.filter(item => getLanguageFromSlug(item._sys.filename) === languageFilter);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">nordAi CMS</h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                {user.name || user.login}
              </span>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <Button
            variant={activeTab === 'blog' ? 'default' : 'outline'}
            onClick={() => { setActiveTab('blog'); setSelectedItems(new Set()); }}
          >
            📝 Blog Articles ({blogPosts.length})
          </Button>
          <Button
            variant={activeTab === 'portfolio' ? 'default' : 'outline'}
            onClick={() => { setActiveTab('portfolio'); setSelectedItems(new Set()); }}
          >
            💼 Portfolio Projects ({projects.length})
          </Button>
          <Button
            variant={activeTab === 'messages' ? 'default' : 'outline'}
            onClick={() => { setActiveTab('messages'); setSelectedItems(new Set()); }}
          >
            ✉️ Contact Messages
          </Button>
        </div>

        {/* Language Filter - hide for messages tab */}
        {activeTab !== 'messages' && (
          <div className="mb-6 p-4 border border-border rounded-lg bg-card">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium">🌐 Filter by Language:</span>
            <div className="flex gap-2">
              <Button
                variant={languageFilter === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setLanguageFilter('all')}
              >
                All Languages
              </Button>
              <Button
                variant={languageFilter === 'en' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setLanguageFilter('en')}
              >
                🇬🇧 English
              </Button>
              <Button
                variant={languageFilter === 'pl' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setLanguageFilter('pl')}
              >
                🇵🇱 Polish
              </Button>
              <Button
                variant={languageFilter === 'sv' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setLanguageFilter('sv')}
              >
                🇸🇪 Swedish
              </Button>
            </div>
          </div>
        </div>
        )}

        {/* Bulk Actions Toolbar */}
        {activeTab !== 'messages' && selectedItems.size > 0 && (
          <div className="mb-6 p-4 border-2 border-primary/50 rounded-lg bg-primary/5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-sm font-semibold">{selectedItems.size} items selected</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedItems(new Set())}
                >
                  Clear Selection
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleBulkDelete}
                  disabled={deleting}
                >
                  {deleting ? '⏳ Deleting...' : '🗑️ Delete Selected'}
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Create New Button */}
        {activeTab !== 'messages' && (
          <div className="mb-6">
            <Button
              onClick={() => navigate(`/admin/edit?type=${activeTab}&new=true`)}
              size="lg"
            >
              + Create New {activeTab === 'blog' ? 'Article' : 'Project'}
            </Button>
          </div>
        )}

        {/* Messages Tab Content */}
        {activeTab === 'messages' ? (
          <Card className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Contact Form Messages</h2>
            <p className="text-muted-foreground mb-4">
              Contact form submissions will appear here once the form is connected to a backend.
            </p>
            <p className="text-sm text-muted-foreground">
              Currently using demo mode. Configure Netlify Forms or EmailJS to receive actual submissions.
            </p>
          </Card>
        ) : (
          <>
            {/* Select All */}
            {items.length > 0 && (
              <div className="mb-4 flex items-center gap-2 px-2">
                <input
                  type="checkbox"
                  checked={selectedItems.size === items.length && items.length > 0}
                  onChange={toggleSelectAll}
                  className="w-4 h-4 cursor-pointer"
                  id="select-all"
                />
                <label htmlFor="select-all" className="text-sm font-medium cursor-pointer">
                  Select All ({items.length} items)
                </label>
              </div>
            )}

            {/* Content List */}
            <div className="grid gap-4">
              {items.length === 0 ? (
                <Card className="p-8 text-center">
                  <p className="text-muted-foreground">
                    No {activeTab === 'blog' ? 'articles' : 'projects'} found for this language.
                  </p>
                </Card>
              ) : (
                items.map((item) => {
                  const itemLanguage = getLanguageFromSlug(item._sys.filename);
                  const languageEmoji = itemLanguage === 'en' ? '🇬🇧' : itemLanguage === 'pl' ? '🇵🇱' : '🇸🇪';
                  const languageLabel = itemLanguage === 'en' ? 'EN' : itemLanguage === 'pl' ? 'PL' : 'SV';
                  const isSelected = selectedItems.has(item._sys.filename);

                  return (
                    <Card
                      key={item._sys.filename}
                      className={`p-6 hover:shadow-lg transition-all ${isSelected ? 'ring-2 ring-primary' : ''}`}
                    >
                      <div className="flex items-start gap-4">
                        {/* Checkbox */}
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleItemSelection(item._sys.filename)}
                          className="mt-1 w-5 h-5 cursor-pointer"
                        />

                        {/* Content */}
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-semibold">{item.title}</h3>
                            <span className="px-2 py-1 bg-primary/10 text-primary rounded text-xs font-medium">
                              {languageEmoji} {languageLabel}
                            </span>
                            {item.featured && (
                              <span className="px-2 py-1 bg-yellow-500/10 text-yellow-600 rounded text-xs font-medium">
                                ⭐ Featured
                              </span>
                            )}
                          </div>
                          <p className="text-muted-foreground text-sm mb-4">
                            {item.excerpt}
                          </p>
                          <div className="flex gap-4 text-xs text-muted-foreground">
                            <span>Category: {item.category}</span>
                            {activeTab === 'blog' && 'date' in item && (
                              <span>Date: {new Date(item.date).toLocaleDateString()}</span>
                            )}
                            {activeTab === 'portfolio' && 'client' in item && (
                              <span>Client: {item.client}</span>
                            )}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => navigate(`/admin/edit?type=${activeTab}&slug=${item._sys.filename}`)}
                          >
                            ✏️ Edit
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDelete(item._sys.filename)}
                            disabled={deleting}
                          >
                            🗑️ Delete
                          </Button>
                        </div>
                      </div>
                    </Card>
                  );
                })
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
