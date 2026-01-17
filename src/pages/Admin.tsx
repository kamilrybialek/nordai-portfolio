import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to the full admin interface
    navigate('/full-admin', { replace: true });
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4"></div>
        <h2 className="text-xl font-semibold text-foreground mb-2">Loading Admin Panel...</h2>
        <p className="text-muted-foreground">Redirecting to Content Manager</p>
      </div>
    </div>
  );
};

export default Admin;
