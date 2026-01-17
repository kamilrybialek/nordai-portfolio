import { useEffect } from 'react';

const Admin = () => {
  useEffect(() => {
    // Redirect to Tina Cloud admin panel
    const tinaCloudUrl = `https://app.tina.io/projects/${import.meta.env.VITE_TINA_CLIENT_ID || '33ea147c-51af-4fa0-aed5-70aa57f97e73'}/index.html`;
    window.location.href = tinaCloudUrl;
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4"></div>
        <h2 className="text-xl font-semibold text-foreground mb-2">Redirecting to Admin Panel...</h2>
        <p className="text-muted-foreground">Taking you to Tina CMS</p>
      </div>
    </div>
  );
};

export default Admin;
