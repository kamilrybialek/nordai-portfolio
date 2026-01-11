import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Layout from '@/components/layout/Layout';
import SEO from '@/components/SEO';
import CTASection from '@/components/sections/CTASection';
import { Lightbulb, Target, Handshake } from 'lucide-react';

const values = [
  { key: 'innovation', icon: Lightbulb },
  { key: 'quality', icon: Target },
  { key: 'partnership', icon: Handshake },
];

const About = () => {
  const { t } = useTranslation();

  return (
    <Layout>
      <SEO 
        title={t('meta.about.title')} 
        description={t('meta.about.description')}
        canonical="/about"
      />
      
      {/* Hero */}
      <section className="section-padding pt-24 md:pt-32 bg-gradient-to-b from-muted/30 to-background">
        <div className="container-narrow text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm font-medium text-primary uppercase tracking-wider"
          >
            {t('about.title')}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-4 mb-6"
          >
            {t('about.headline')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            {t('about.intro')}
          </motion.p>
        </div>
      </section>

      {/* Mission & Approach */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl md:text-3xl mb-6">{t('about.mission_title')}</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t('about.mission')}
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h2 className="text-2xl md:text-3xl mb-6">{t('about.approach_title')}</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t('about.approach')}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-muted/30">
        <div className="container-wide">
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center p-8 bg-background rounded-xl shadow-nordic"
                >
                  <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mx-auto mb-6">
                    <Icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-display font-semibold mb-3">
                    {t(`about.values.${value.key}.title`)}
                  </h3>
                  <p className="text-muted-foreground">
                    {t(`about.values.${value.key}.description`)}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <CTASection />
    </Layout>
  );
};

export default About;
