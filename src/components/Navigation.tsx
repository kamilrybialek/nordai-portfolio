import { AnimatedThemeToggler } from "./AnimatedThemeToggler";

const Navigation = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-8 py-6 flex items-center justify-between">
        <div className="text-xl font-bold tracking-tight text-foreground">
          nordAi studio
        </div>
        
        <div className="flex items-center gap-8">
          <div className="hidden md:flex items-center gap-12">
            <button 
              onClick={() => scrollToSection('services')}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Services
            </button>
            <button 
              onClick={() => scrollToSection('work')}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Cases
            </button>
            <button 
              onClick={() => scrollToSection('philosophy')}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Studio
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Contact
            </button>
          </div>
          <AnimatedThemeToggler />
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
