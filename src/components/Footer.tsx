const Footer = () => {
  return (
    <footer className="py-16 bg-background border-t border-border">
      <div className="container mx-auto px-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <div className="text-xl font-bold tracking-tight text-foreground mb-6">
                nordAi studio
              </div>
              <p className="text-sm text-muted-foreground">
                Scandinavian Design & AI Innovation
              </p>
            </div>
            
            <div>
              <p className="text-sm font-bold text-foreground mb-4">Services</p>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p className="hover:text-foreground transition-colors cursor-pointer">Web Development</p>
                <p className="hover:text-foreground transition-colors cursor-pointer">Design & Branding</p>
                <p className="hover:text-foreground transition-colors cursor-pointer">AI Integration</p>
              </div>
            </div>
            
            <div>
              <p className="text-sm font-bold text-foreground mb-4">Legal</p>
              <div className="space-y-2 text-sm text-muted-foreground">
                <a href="#" className="block hover:text-foreground transition-colors">Privacy Policy</a>
                <a href="#" className="block hover:text-foreground transition-colors">Terms of Service</a>
              </div>
            </div>
          </div>
          
          <div className="mt-16 pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground">
              © 2025 nordAi studio. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
