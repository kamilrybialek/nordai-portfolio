import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import SEO from '@/components/SEO';
import ContactSection from '@/components/ContactSection';
import { getPortfolioProjects, PortfolioProject } from '@/lib/tina';

const categories = ['all', 'ai', 'branding', 'web', 'design'];

const Portfolio = () => {
  const { t, i18n } = useTranslation();
  const [activeCategory, setActiveCategory] = useState('all');
  const [projects, setProjects] = useState<PortfolioProject[]>([]);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    getPortfolioProjects().then(allProjects => {
      // Filter projects by current language
      const currentLang = i18n.language;
      const languageFilteredProjects = allProjects.filter(project => {
        // Check if filename ends with .en, .pl, or .sv
        const languageSuffix = project._sys.filename.match(/\.(en|pl|sv)$/);
        if (languageSuffix) {
          return languageSuffix[1] === currentLang;
        }
        // If no language suffix, show in English by default
        return currentLang === 'en';
      });
      setProjects(languageFilteredProjects);
    });
  }, [i18n.language]);

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
      <section className="pt-12 md:pt-16 pb-12 bg-gradient-to-b from-muted/20 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block text-sm font-bold text-primary uppercase tracking-[0.2em] mb-2"
            >
              {t('portfolio.title')}
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold text-foreground leading-[1.1] tracking-tight"
            >
              {t('portfolio.headline')}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto font-medium"
            >
              {t('portfolio.subheadline')}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Filter */}
      <section className="py-12 bg-background border-y border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-3 text-sm font-bold rounded-full transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25 scale-105'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground hover:scale-105'
                }`}
              >
                {cat === 'all' ? t('portfolio.all') : t(`portfolio.filter.${cat}`)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {filteredProjects.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-2xl font-semibold text-muted-foreground">No projects found in this category.</p>
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
                    <div className="p-7 space-y-4">
                      {/* Category & Tags */}
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-3 py-1.5 text-xs font-bold bg-primary/10 text-primary rounded-full uppercase tracking-wide">
                          {t(`portfolio.filter.${project.category}`)}
                        </span>
                        {project.tags && project.tags.slice(0, 2).map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="px-3 py-1.5 text-xs font-semibold bg-muted text-muted-foreground rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Title */}
                      <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                        {project.title}
                      </h3>

                      {/* Client */}
                      <p className="text-sm font-bold text-muted-foreground uppercase tracking-wide">
                        {project.client}
                      </p>

                      {/* Excerpt */}
                      <p className="text-base text-muted-foreground leading-relaxed line-clamp-3">
                        {project.excerpt}
                      </p>

                      {/* CTA */}
                      <div className="pt-5 border-t border-border">
                        <span className="inline-flex items-center gap-2 text-sm font-bold text-primary group-hover:gap-3 transition-all">
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

      <ContactSection />
    </Layout>
  );
};

export default Portfolio;
