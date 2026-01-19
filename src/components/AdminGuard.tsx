import { useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';

interface AdminGuardProps {
  children: ReactNode;
}

const AdminGuard = ({ children }: AdminGuardProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Check if already authenticated in session
  useEffect(() => {
    const auth = sessionStorage.getItem('admin_auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  // In production, completely block access
  useEffect(() => {
    if (import.meta.env.PROD) {
      navigate('/', { replace: true });
    }
  }, [navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simple password check - in production this should use proper auth
    const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'admin123';

    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem('admin_auth', 'true');
      setError('');
    } else {
      setError('Incorrect password');
      setPassword('');
    }
  };

  // If in production, show nothing (will redirect)
  if (import.meta.env.PROD) {
    return null;
  }

  // If not authenticated, show login form
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-full max-w-md">
          <div className="bg-card border border-border rounded-lg p-8 shadow-xl">
            <div className="flex flex-col items-center mb-8">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Lock className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-2xl font-bold text-foreground">Admin Panel</h1>
              <p className="text-muted-foreground text-sm mt-2">
                Enter password to access
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-2">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Enter admin password"
                  autoFocus
                />
              </div>

              {error && (
                <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                  <p className="text-sm text-destructive">{error}</p>
                </div>
              )}

              <button
                type="submit"
                className="w-full px-4 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Access Admin Panel
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-border">
              <button
                onClick={() => navigate('/')}
                className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                ← Back to Website
              </button>
            </div>
          </div>

          <div className="mt-4 text-center">
            <p className="text-xs text-muted-foreground">
              This panel is only available in development mode
            </p>
          </div>
        </div>
      </div>
    );
  }

  // If authenticated, show admin panel
  return <>{children}</>;
};

export default AdminGuard;
