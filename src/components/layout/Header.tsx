import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { AnimatedThemeToggler } from '@/components/AnimatedThemeToggler';
import LanguageSwitcher from './LanguageSwitcher';

const Header = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isHomePage = location.pathname === '/';

  const navItems = [
    { href: '/', label: t('nav.home'), scrollId: null },
    { href: '/services', label: t('nav.services'), scrollId: 'services' },
    { href: '/portfolio', label: t('nav.portfolio'), scrollId: 'portfolio' },
    { href: '/blog', label: t('nav.blog'), scrollId: 'blog' },
    { href: '/contact', label: t('nav.contact'), scrollId: 'contact' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  const handleNavClick = (e: React.MouseEvent, item: typeof navItems[0]) => {
    e.preventDefault();
    setIsMenuOpen(false);

    if (item.href === '/' && isHomePage) {
      // On home page, clicking Home scrolls to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (isHomePage && item.scrollId) {
      // On home page, scroll to section
      const element = document.getElementById(item.scrollId);
      element?.scrollIntoView({ behavior: 'smooth' });
    } else if (item.scrollId && item.href !== '/') {
      // On other pages, navigate to home and scroll
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(item.scrollId);
        element?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      // Regular navigation
      navigate(item.href);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-8 py-6 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold tracking-tight text-foreground">
          nordai.studio
        </Link>

        <div className="flex items-center gap-8">
          <div className="hidden md:flex items-center gap-12">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item)}
                className={`text-sm transition-colors cursor-pointer ${
                  isActive(item.href)
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>
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

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-t border-border">
          <div className="container mx-auto px-8 py-4 space-y-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item)}
                className={`block px-4 py-3 text-base rounded-lg transition-colors cursor-pointer ${
                  isActive(item.href)
                    ? 'text-foreground bg-accent'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                }`}
              >
                {item.label}
              </a>
            ))}
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

export default Header;
