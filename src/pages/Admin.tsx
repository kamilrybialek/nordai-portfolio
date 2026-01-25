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
  const [activeTab, setActiveTab] = useState<'blog' | 'portfolio'>('blog');
  const [languageFilter, setLanguageFilter] = useState<'all' | 'en' | 'pl' | 'sv'>('all');

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

  // Filter items by language
  const allItems = activeTab === 'blog' ? blogPosts : projects;
  const items = languageFilter === 'all'
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
            onClick={() => setActiveTab('blog')}
          >
            Blog Articles ({blogPosts.length})
          </Button>
          <Button
            variant={activeTab === 'portfolio' ? 'default' : 'outline'}
            onClick={() => setActiveTab('portfolio')}
          >
            Portfolio Projects ({projects.length})
          </Button>
        </div>

        {/* Language Filter */}
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

        {/* Create New Button */}
        <div className="mb-6">
          <Button
            onClick={() => navigate(`/admin/edit?type=${activeTab}&new=true`)}
            size="lg"
          >
            + Create New {activeTab === 'blog' ? 'Article' : 'Project'}
          </Button>
        </div>

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

              return (
                <Card key={item._sys.filename} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold">{item.title}</h3>
                        <span className="px-2 py-1 bg-primary/10 text-primary rounded text-xs font-medium">
                          {languageEmoji} {languageLabel}
                        </span>
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
                    <Button
                      onClick={() => navigate(`/admin/edit?type=${activeTab}&slug=${item._sys.filename}`)}
                    >
                      Edit
                    </Button>
                  </div>
                </Card>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
