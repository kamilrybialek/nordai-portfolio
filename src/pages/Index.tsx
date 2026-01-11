import { useTranslation } from 'react-i18next';
import Layout from '@/components/layout/Layout';
import SEO from '@/components/SEO';
import HeroSection from '@/components/sections/HeroSection';
import ServicesSection from '@/components/sections/ServicesSection';
import WhyUsSection from '@/components/sections/WhyUsSection';
import CTASection from '@/components/sections/CTASection';

const Index = () => {
  const { t } = useTranslation();

  return (
    <Layout>
      <SEO 
        title={t('meta.home.title')} 
        description={t('meta.home.description')}
        canonical="/"
      />
      <HeroSection />
      <ServicesSection />
      <WhyUsSection />
      <CTASection />
    </Layout>
  );
};

export default Index;
