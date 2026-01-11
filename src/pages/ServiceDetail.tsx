import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, Brain, Palette, Layout as LayoutIcon, Code, Megaphone } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import SEO from '@/components/SEO';
import CTASection from '@/components/sections/CTASection';
import { Button } from '@/components/ui/button';

const serviceData: Record<string, { key: string; icon: any; nextHref: string }> = {
  'ai-automation': { key: 'ai_automation', icon: Brain, nextHref: '/services/branding' },
  'branding': { key: 'branding', icon: Palette, nextHref: '/services/ux-design' },
  'ux-design': { key: 'ux_design', icon: LayoutIcon, nextHref: '/services/digital-products' },
  'digital-products': { key: 'digital_products', icon: Code, nextHref: '/services/content-marketing' },
  'content-marketing': { key: 'content_marketing', icon: Megaphone, nextHref: '/services/ai-automation' },
};

const ServiceDetail = () => {
  const { slug } = useParams();
  const { t } = useTranslation();
  
  const service = serviceData[slug || ''];
  if (!service) {
    return null;
  }

  const Icon = service.icon;
  const features = t(`services.items.${service.key}.features`, { returnObjects: true }) as string[];

  return (
    <Layout>
      <SEO 
        title={`${t(`services.items.${service.key}.title`)} | nordAi.studio`}
        description={t(`services.items.${service.key}.description`)}
        canonical={`/services/${slug}`}
      />
      
      {/* Hero */}
      <section className="section-padding pt-24 md:pt-32 bg-gradient-to-b from-muted/30 to-background">
        <div className="container-wide">
          <Link 
            to="/services"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {t('services.title')}
          </Link>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mb-6">
                <Icon className="w-8 h-8 text-primary-foreground" />
              </div>
              <h1 className="mb-6">
                {t(`services.items.${service.key}.title`)}
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                {t(`services.items.${service.key}.description`)}
              </p>
              <Link to="/contact">
                <Button variant="hero" size="lg">
                  {t('cta.global_button')}
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-card rounded-2xl p-8 shadow-nordic"
            >
              <h3 className="text-lg font-display font-semibold mb-6">What's Included</h3>
              <ul className="space-y-4">
                {features.map((feature: string, i: number) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-nordic-warm-light rounded-full flex items-center justify-center mt-0.5">
                      <Check className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      <CTASection />
    </Layout>
  );
};

export default ServiceDetail;
