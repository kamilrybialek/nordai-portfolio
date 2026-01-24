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
      <section className="pt-24 md:pt-32 pb-16 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-4"
            >
              {t('portfolio.title')}
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-bold text-foreground mb-6"
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
        </div>
      </section>

      {/* Filter */}
      <section className="py-8 bg-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2.5 text-sm font-semibold rounded-full transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                    : 'bg-background border-2 border-border text-muted-foreground hover:border-primary hover:text-foreground'
                }`}
              >
                {cat === 'all' ? t('portfolio.all') : t(`portfolio.filter.${cat}`)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {filteredProjects.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl text-muted-foreground">No projects found in this category.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
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
                    className="group block bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/50 hover:shadow-2xl transition-all duration-300"
                  >
                    {/* Image */}
                    <div className="aspect-[4/3] bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5 overflow-hidden">
                      <img
                        src={project.image || '/placeholder.svg'}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-4">
                      {/* Category & Tags */}
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-3 py-1 text-xs font-semibold bg-primary/10 text-primary rounded-full">
                          {t(`portfolio.filter.${project.category}`)}
                        </span>
                        {project.tags && project.tags.slice(0, 2).map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="px-3 py-1 text-xs font-medium bg-muted text-muted-foreground rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Title */}
                      <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {project.title}
                      </h3>

                      {/* Client */}
                      <p className="text-sm font-medium text-muted-foreground">
                        {project.client}
                      </p>

                      {/* Excerpt */}
                      <p className="text-base text-muted-foreground leading-relaxed line-clamp-3">
                        {project.excerpt}
                      </p>

                      {/* CTA */}
                      <div className="pt-4">
                        <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary group-hover:gap-3 transition-all">
                          View Project
                          <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>

      <CTASection />
    </Layout>
  );
};

export default Portfolio;
