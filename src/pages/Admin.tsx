import { useEffect } from 'react';

const Admin = () => {
  useEffect(() => {
    // Redirect to the actual TinaCMS admin UI
    window.location.replace('/admin/index.html');
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4"></div>
        <h2 className="text-xl font-semibold text-foreground mb-2">Loading Admin Panel...</h2>
        <p className="text-muted-foreground">Redirecting to TinaCMS</p>
      </div>
    </div>
  );
};

export default Admin;
