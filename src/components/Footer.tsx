import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Mail, MapPin, Linkedin, Twitter, Github, Facebook, Instagram } from 'lucide-react';

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

  const socialLinks = [
    { icon: Linkedin, href: 'https://linkedin.com/company/nordai-studio', label: 'LinkedIn' },
    { icon: Facebook, href: 'https://facebook.com/nordai.studio', label: 'Facebook' },
    { icon: Instagram, href: 'https://instagram.com/nordai.studio', label: 'Instagram' },
    { icon: Twitter, href: 'https://twitter.com/nordai_studio', label: 'X (Twitter)' },
  ];

  return (
    <footer className="bg-muted/30 border-t border-border mt-40">
      <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-8">
              <span className="text-2xl font-display font-bold tracking-tight text-foreground">
                nordai.studio
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-8">
              {t('footer.tagline')}
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-all"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm font-display font-semibold uppercase tracking-wider mb-8 text-foreground">
              {t('footer.navigation')}
            </h4>
            <ul className="space-y-4">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-display font-semibold uppercase tracking-wider mb-8 text-foreground">
              {t('footer.services')}
            </h4>
            <ul className="space-y-4">
              {services.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-display font-semibold uppercase tracking-wider mb-8 text-foreground">
              {t('footer.connect')}
            </h4>
            <ul className="space-y-5">
              {/* Email temporarily hidden */}
              {/* <li>
                <a
                  href="mailto:hello@nordai.studio"
                  className="flex items-center gap-3 text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  {t('contact.info.email')}
                </a>
              </li> */}
              <li className="flex items-center gap-3 text-muted-foreground text-sm">
                <MapPin className="w-4 h-4" />
                {t('contact.info.location')}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-20 pt-10 border-t border-border flex flex-col sm:flex-row items-center justify-center gap-4">
          <p className="text-muted-foreground text-sm">
            © 2026 nordai.studio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
