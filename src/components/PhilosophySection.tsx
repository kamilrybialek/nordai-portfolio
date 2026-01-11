import { useTranslation } from 'react-i18next';

const PhilosophySection = () => {
  const { t } = useTranslation();

  return (
    <section id="philosophy" className="py-24 bg-muted/30">
      <div className="container mx-auto px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                {t('about.headline')}
              </h2>

              <div className="space-y-6">
                <div className="p-6 bg-card rounded-xl border border-border">
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    {t('about.mission_title')}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {t('about.mission')}
                  </p>
                </div>

                <div className="p-6 bg-card rounded-xl border border-border">
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    {t('about.approach_title')}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {t('about.approach')}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-primary/5 rounded-xl p-8 border border-primary/20">
                <div className="space-y-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-primary font-bold">01</span>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-foreground mb-2">{t('about.values.innovation.title')}</h4>
                      <p className="text-sm text-muted-foreground">{t('about.values.innovation.description')}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-primary font-bold">02</span>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-foreground mb-2">{t('about.values.quality.title')}</h4>
                      <p className="text-sm text-muted-foreground">{t('about.values.quality.description')}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-primary font-bold">03</span>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-foreground mb-2">{t('about.values.partnership.title')}</h4>
                      <p className="text-sm text-muted-foreground">{t('about.values.partnership.description')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PhilosophySection;
