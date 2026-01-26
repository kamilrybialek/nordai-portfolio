import { Button } from "@/components/ui/button";
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import AppleWatchWords from './AppleWatchWords';

const HeroSection = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen pt-40 pb-32 px-8 flex items-center">
      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="inline-block px-4 py-2 bg-primary rounded-full">
                <span className="text-sm font-medium text-primary-foreground">{t('hero.tagline')}</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.1]">
                {t('hero.headline')}
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl">
                {t('hero.subheadline')}
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                onClick={() => scrollToSection('contact')}
                className="rounded-full px-8"
              >
                {t('hero.cta')}
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate('/portfolio')}
                className="rounded-full px-8"
              >
                {t('hero.cta_secondary')}
              </Button>
            </div>

            <div className="flex items-center gap-12 pt-8 border-t border-border">
              <div>
                <p className="text-3xl font-bold text-foreground">50+</p>
                <p className="text-sm text-muted-foreground">Projects Delivered</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-foreground">15+</p>
                <p className="text-sm text-muted-foreground">Happy Clients</p>
              </div>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="aspect-square flex items-center justify-center">
              <AppleWatchWords />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
