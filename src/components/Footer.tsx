import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="py-16 bg-background border-t border-border">
      <div className="container mx-auto px-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <div className="text-xl font-bold tracking-tight text-foreground mb-6">
                nordai.studio
              </div>
              <p className="text-sm text-muted-foreground">
                {t('footer.tagline')}
              </p>
            </div>

            <div>
              <p className="text-sm font-bold text-foreground mb-4">{t('footer.services')}</p>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p className="hover:text-foreground transition-colors cursor-pointer">{t('services.items.ai_automation.title')}</p>
                <p className="hover:text-foreground transition-colors cursor-pointer">{t('services.items.ux_design.title')}</p>
                <p className="hover:text-foreground transition-colors cursor-pointer">{t('services.items.digital_products.title')}</p>
              </div>
            </div>

            <div>
              <p className="text-sm font-bold text-foreground mb-4">Legal</p>
              <div className="space-y-2 text-sm text-muted-foreground">
                <a href="#" className="block hover:text-foreground transition-colors">{t('footer.legal.privacy')}</a>
                <a href="#" className="block hover:text-foreground transition-colors">{t('footer.legal.terms')}</a>
              </div>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground">
              {t('footer.copyright')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
