import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPortfolioProjects, PortfolioProject } from '@/lib/tina';

const PortfolioSection = () => {
  const { t, i18n } = useTranslation();
  const [projects, setProjects] = useState<PortfolioProject[]>([]);

  useEffect(() => {
    getPortfolioProjects().then((allProjects) => {
      // Filter by language first
      const currentLang = i18n.language;
      const languageFilteredProjects = allProjects.filter(project => {
        const languageSuffix = project._sys.filename.match(/\.(en|pl|sv)$/);
        if (languageSuffix) {
          return languageSuffix[1] === currentLang;
        }
        return currentLang === 'en';
      });

      // Then filter only featured projects and limit to 6
      const featuredProjects = languageFilteredProjects
        .filter(project => project.featured)
        .slice(0, 6);
      setProjects(featuredProjects);
    });
  }, [i18n.language]);

  return (
    <section id="portfolio" className="py-24 bg-muted/30">
      <div className="container mx-auto px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
              {t('portfolio.headline')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('portfolio.subheadline')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <Link
                key={project._sys.filename}
                to={`/portfolio/${project._sys.filename.replace('.mdx', '')}`}
                className="group bg-card rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 border border-border hover:border-primary/50 block cursor-pointer"
              >
                <div className="aspect-video bg-gradient-to-br from-secondary via-accent to-muted"></div>
                <div className="p-8 space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="text-xs px-3 py-1 bg-primary text-primary-foreground rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-sm text-muted-foreground mb-2">
                    {project.client}
                  </p>

                  <p className="text-muted-foreground leading-relaxed">
                    {project.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {/* Show More Button */}
          <div className="mt-12 text-center">
            <Link
              to="/portfolio"
              className="inline-flex items-center px-8 py-4 bg-primary text-primary-foreground rounded-full font-medium hover:opacity-90 transition-opacity"
            >
              {t('portfolio.show_more')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
