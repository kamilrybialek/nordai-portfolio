import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Mail, MapPin, Linkedin, Twitter, Github } from 'lucide-react';

const Footer = () => {
  const { t } = useTranslation();

  const services = [
    { href: '/services/ai-automation', label: t('services.items.ai_automation.title') },
    { href: '/services/branding', label: t('services.items.branding.title') },
    { href: '/services/ux-design', label: t('services.items.ux_design.title') },
    { href: '/services/digital-products', label: t('services.items.digital_products.title') },
    { href: '/services/content-marketing', label: t('services.items.content_marketing.title') },
  ];

  const navigation = [
    { href: '/about', label: t('nav.about') },
    { href: '/portfolio', label: t('nav.portfolio') },
    { href: '/blog', label: t('nav.blog') },
    { href: '/contact', label: t('nav.contact') },
  ];

  return (
    <footer className="bg-foreground text-background">
      <div className="container-wide section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-6">
              <span className="text-2xl font-display font-bold tracking-tight">
                nord<span className="text-nordic-warm">Ai</span>.studio
              </span>
            </Link>
            <p className="text-background/70 text-sm leading-relaxed mb-6">
              {t('footer.tagline')}
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-background/60 hover:text-background transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-background/60 hover:text-background transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-background/60 hover:text-background transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm font-display font-semibold uppercase tracking-wider mb-6">
              {t('footer.navigation')}
            </h4>
            <ul className="space-y-3">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="text-background/70 hover:text-background text-sm transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-display font-semibold uppercase tracking-wider mb-6">
              {t('footer.services')}
            </h4>
            <ul className="space-y-3">
              {services.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="text-background/70 hover:text-background text-sm transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-display font-semibold uppercase tracking-wider mb-6">
              {t('footer.connect')}
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="mailto:hello@nordai.studio"
                  className="flex items-center gap-3 text-background/70 hover:text-background text-sm transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  {t('contact.info.email')}
                </a>
              </li>
              <li className="flex items-center gap-3 text-background/70 text-sm">
                <MapPin className="w-4 h-4" />
                {t('contact.info.location')}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-background/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-background/50 text-sm">
            {t('footer.copyright')}
          </p>
          <div className="flex items-center gap-6">
            <Link
              to="/privacy"
              className="text-background/50 hover:text-background/70 text-sm transition-colors"
            >
              {t('footer.legal.privacy')}
            </Link>
            <Link
              to="/terms"
              className="text-background/50 hover:text-background/70 text-sm transition-colors"
            >
              {t('footer.legal.terms')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
