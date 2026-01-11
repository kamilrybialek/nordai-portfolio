import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowRight, Brain, Palette, Layout as LayoutIcon, Code, Megaphone } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import SEO from '@/components/SEO';
import CTASection from '@/components/sections/CTASection';

const services = [
  { key: 'ai_automation', icon: Brain, href: '/services/ai-automation' },
  { key: 'branding', icon: Palette, href: '/services/branding' },
  { key: 'ux_design', icon: LayoutIcon, href: '/services/ux-design' },
  { key: 'digital_products', icon: Code, href: '/services/digital-products' },
  { key: 'content_marketing', icon: Megaphone, href: '/services/content-marketing' },
];

const Services = () => {
  const { t } = useTranslation();

  return (
    <Layout>
      <SEO 
        title={t('meta.services.title')} 
        description={t('meta.services.description')}
        canonical="/services"
      />
      
      {/* Hero */}
      <section className="section-padding pt-24 md:pt-32 bg-gradient-to-b from-muted/30 to-background">
        <div className="container-narrow text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm font-medium text-primary uppercase tracking-wider"
          >
            {t('services.title')}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-4 mb-6"
          >
            {t('services.headline')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            {t('services.subheadline')}
          </motion.p>
        </div>
      </section>

      {/* Services List */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="space-y-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              const features = t(`services.items.${service.key}.features`, { returnObjects: true }) as string[];
              
              return (
                <motion.article
                  key={service.key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={service.href}
                    className="group block card-nordic"
                  >
                    <div className="flex flex-col md:flex-row md:items-center gap-6">
                      <div className="flex-shrink-0 w-16 h-16 bg-nordic-warm-light rounded-xl flex items-center justify-center group-hover:bg-primary transition-colors duration-300">
                        <Icon className="w-8 h-8 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-xl md:text-2xl font-display font-semibold mb-2 group-hover:text-primary transition-colors">
                          {t(`services.items.${service.key}.title`)}
                        </h2>
                        <p className="text-muted-foreground mb-4 max-w-2xl">
                          {t(`services.items.${service.key}.description`)}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {features.map((feature: string, i: number) => (
                            <span 
                              key={i}
                              className="px-3 py-1 text-xs font-medium bg-muted text-muted-foreground rounded-full"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex-shrink-0">
                        <span className="inline-flex items-center gap-2 text-sm font-medium text-primary group-hover:gap-3 transition-all duration-300">
                          {t('services.cta')}
                          <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <CTASection />
    </Layout>
  );
};

export default Services;
