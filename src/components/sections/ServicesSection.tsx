import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowRight, Brain, Palette, Layout, Code, Megaphone } from 'lucide-react';

const services = [
  { key: 'ai_automation', icon: Brain, href: '/services/ai-automation' },
  { key: 'branding', icon: Palette, href: '/services/branding' },
  { key: 'ux_design', icon: Layout, href: '/services/ux-design' },
  { key: 'digital_products', icon: Code, href: '/services/digital-products' },
  { key: 'content_marketing', icon: Megaphone, href: '/services/content-marketing' },
];

const ServicesSection = () => {
  const { t } = useTranslation();

  return (
    <section className="section-padding bg-background">
      <div className="container-wide">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-medium text-primary uppercase tracking-wider"
          >
            {t('services.title')}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 mb-6"
          >
            {t('services.headline')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground"
          >
            {t('services.subheadline')}
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={service.href}
                  className="group block card-nordic h-full"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-nordic-warm-light rounded-lg flex items-center justify-center group-hover:bg-primary transition-colors duration-300">
                      <Icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-display font-semibold mb-2 group-hover:text-primary transition-colors">
                        {t(`services.items.${service.key}.title`)}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                        {t(`services.items.${service.key}.short`)}
                      </p>
                      <span className="inline-flex items-center gap-2 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {t('services.cta')}
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
