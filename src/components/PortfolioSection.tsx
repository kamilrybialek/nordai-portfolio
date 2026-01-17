import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPortfolioProjects, PortfolioProject } from '@/lib/tina';

const PortfolioSection = () => {
  const { t } = useTranslation();
  const [projects, setProjects] = useState<PortfolioProject[]>([]);

  useEffect(() => {
    getPortfolioProjects().then(setProjects);
  }, []);

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
                        className="text-xs px-3 py-1 bg-secondary text-muted-foreground rounded-full"
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
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
