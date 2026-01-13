import { useTranslation } from 'react-i18next';
import { blogArticles } from '@/data/blog';

const BlogSection = () => {
  const { t } = useTranslation();

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      ai: 'AI',
      automation: 'Automation',
      design: 'Design',
      insights: 'Insights',
      trends: 'Trends'
    };
    return labels[category] || category;
  };

  return (
    <section id="blog" className="py-24 bg-background">
      <div className="container mx-auto px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
              {t('blog.headline')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('blog.subheadline')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogArticles.map((article, index) => (
              <div
                key={article.id}
                className="group bg-card rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 border border-border hover:border-primary/50"
              >
                <div className="aspect-video bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10"></div>
                <div className="p-8 space-y-4">
                  <div className="flex flex-wrap gap-2 items-center">
                    <span className="text-xs px-3 py-1 bg-secondary text-muted-foreground rounded-full">
                      {getCategoryLabel(article.category)}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {article.readTime} {t('blog.min_read')}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                    {article.title}
                  </h3>

                  <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                    {article.excerpt}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <span className="text-xs text-muted-foreground">
                      {formatDate(article.date)}
                    </span>
                    <span className="text-sm font-medium text-primary group-hover:underline">
                      {t('blog.read_more')}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
