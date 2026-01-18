import { AnimatedThemeToggler } from "./AnimatedThemeToggler";
import LanguageSwitcher from "./layout/LanguageSwitcher";
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Navigation = () => {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-8 py-6 flex items-center justify-between">
        <div className="text-xl font-bold tracking-tight text-foreground">
          nordai.studio
        </div>

        <div className="flex items-center gap-8">
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection('services')}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {t('nav.services')}
            </button>
            <button
              onClick={() => scrollToSection('portfolio')}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {t('nav.portfolio')}
            </button>
            <button
              onClick={() => scrollToSection('blog')}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {t('nav.blog')}
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {t('nav.contact')}
            </button>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-4">
              <LanguageSwitcher />
              <AnimatedThemeToggler />
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-foreground"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-t border-border">
          <div className="container mx-auto px-8 py-4 space-y-1">
            <button
              onClick={() => scrollToSection('services')}
              className="block w-full text-left px-4 py-3 text-base rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
            >
              {t('nav.services')}
            </button>
            <button
              onClick={() => scrollToSection('portfolio')}
              className="block w-full text-left px-4 py-3 text-base rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
            >
              {t('nav.portfolio')}
            </button>
            <button
              onClick={() => scrollToSection('blog')}
              className="block w-full text-left px-4 py-3 text-base rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
            >
              {t('nav.blog')}
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="block w-full text-left px-4 py-3 text-base rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
            >
              {t('nav.contact')}
            </button>
            <div className="pt-4 flex items-center justify-center gap-4">
              <LanguageSwitcher />
              <AnimatedThemeToggler />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
