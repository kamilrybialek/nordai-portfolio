import { AnimatedThemeToggler } from "./AnimatedThemeToggler";
import LanguageSwitcher from "./layout/LanguageSwitcher";
import { useTranslation } from 'react-i18next';

const Navigation = () => {
  const { t } = useTranslation();

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
              {t('nav.services')}
            </button>
            <button
              onClick={() => scrollToSection('work')}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Portfolio
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
              {t('nav.contact')}
            </button>
          </div>
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <AnimatedThemeToggler />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
