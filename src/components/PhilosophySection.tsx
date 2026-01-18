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

          {/* Founders Section */}
          <div className="mt-24">
            <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground text-center mb-12">
              {t('about.founders_title')}
            </h3>

            <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
              {/* Daniela */}
              <div className="bg-card rounded-xl border border-border overflow-hidden">
                <div className="aspect-square bg-gradient-to-br from-accent/20 via-secondary/20 to-primary/20 flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full bg-accent/30 flex items-center justify-center">
                    <span className="text-4xl font-bold text-accent">D</span>
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="text-2xl font-bold text-foreground mb-1">
                    {t('about.founders.daniela.name')}
                  </h4>
                  <p className="text-sm text-primary font-medium mb-4">
                    {t('about.founders.daniela.role')}
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    {t('about.founders.daniela.bio')}
                  </p>
                </div>
              </div>

              {/* Kamil */}
              <div className="bg-card rounded-xl border border-border overflow-hidden">
                <div className="aspect-square bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full bg-primary/30 flex items-center justify-center">
                    <span className="text-4xl font-bold text-primary">K</span>
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="text-2xl font-bold text-foreground mb-1">
                    {t('about.founders.kamil.name')}
                  </h4>
                  <p className="text-sm text-primary font-medium mb-4">
                    {t('about.founders.kamil.role')}
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    {t('about.founders.kamil.bio')}
                  </p>
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
