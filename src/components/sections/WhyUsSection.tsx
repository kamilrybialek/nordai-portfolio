import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Lightbulb, Sparkles, Users, TrendingUp } from 'lucide-react';

const reasons = [
  { key: 'expertise', icon: Lightbulb },
  { key: 'design', icon: Sparkles },
  { key: 'results', icon: TrendingUp },
  { key: 'partnership', icon: Users },
];

const WhyUsSection = () => {
  const { t } = useTranslation();

  return (
    <section className="section-padding bg-muted/30">
      <div className="container-wide">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-medium text-primary uppercase tracking-wider"
          >
            {t('why.title')}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4"
          >
            {t('why.headline')}
          </motion.h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={reason.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-5 p-6 rounded-xl bg-background shadow-nordic"
              >
                <div className="flex-shrink-0 w-14 h-14 bg-primary rounded-xl flex items-center justify-center">
                  <Icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-display font-semibold mb-2">
                    {t(`why.items.${reason.key}.title`)}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {t(`why.items.${reason.key}.description`)}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;
