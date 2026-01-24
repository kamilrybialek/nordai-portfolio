import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import SEO from '@/components/SEO';
import CTASection from '@/components/sections/CTASection';
import { getPortfolioProjects, PortfolioProject } from '@/lib/tina';

const categories = ['all', 'ai', 'branding', 'web', 'design'];

const Portfolio = () => {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState('all');
  const [projects, setProjects] = useState<PortfolioProject[]>([]);

  useEffect(() => {
    getPortfolioProjects().then(setProjects);
  }, []);

  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  return (
    <Layout>
      <SEO 
        title={t('meta.portfolio.title')} 
        description={t('meta.portfolio.description')}
        canonical="/portfolio"
      />
      
      {/* Hero */}
      <section className="section-padding pt-24 md:pt-32 bg-gradient-to-b from-muted/30 to-background">
        <div className="container-narrow text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm font-medium text-primary uppercase tracking-wider"
          >
            {t('portfolio.title')}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-4 mb-6"
          >
            {t('portfolio.headline')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            {t('portfolio.subheadline')}
          </motion.p>
        </div>
      </section>

      {/* Filter */}
      <section className="pb-8">
        <div className="container-wide">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-primary text-primary-foreground opacity-60 hover:opacity-100'
                }`}
              >
                {cat === 'all' ? t('portfolio.all') : t(`portfolio.filter.${cat}`)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="section-padding pt-8">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.article
                key={project._sys.filename}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                layout
              >
                <Link
                  to={`/portfolio/${project._sys.filename}`}
                  className="group block card-nordic overflow-hidden"
                >
                  <div className="aspect-[4/3] bg-muted rounded-lg mb-6 overflow-hidden">
                    <img
                      src={project.image || '/placeholder.svg'}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-1 text-xs font-medium bg-nordic-warm-light text-primary rounded">
                      {t(`portfolio.filter.${project.category}`)}
                    </span>
                  </div>
                  <h3 className="text-xl font-display font-semibold mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {project.excerpt}
                  </p>
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-primary">
                    {t('portfolio.view_case')}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </Layout>
  );
};

export default Portfolio;
