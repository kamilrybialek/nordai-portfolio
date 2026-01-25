import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getBlogArticles, BlogArticle } from '@/lib/tina';

const BlogSection = () => {
  const { t, i18n } = useTranslation();
  const [articles, setArticles] = useState<BlogArticle[]>([]);

  useEffect(() => {
    getBlogArticles().then((allArticles) => {
      // Filter by language first
      const currentLang = i18n.language;
      const languageFilteredArticles = allArticles.filter(article => {
        const languageSuffix = article._sys.filename.match(/\.(en|pl|sv)$/);
        if (languageSuffix) {
          return languageSuffix[1] === currentLang;
        }
        return currentLang === 'en';
      });

      // Then filter only featured articles and limit to 6
      const featuredArticles = languageFilteredArticles
        .filter(article => article.featured)
        .slice(0, 6);
      setArticles(featuredArticles);
    });
  }, [i18n.language]);

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
            {articles.map((article) => (
              <Link
                key={article._sys.filename}
                to={`/blog/${article._sys.filename.replace('.mdx', '')}`}
                className="group bg-card rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 border border-border hover:border-primary/50 block cursor-pointer"
              >
                <div className="aspect-video bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10"></div>
                <div className="p-8 space-y-4">
                  <div className="flex flex-wrap gap-2 items-center">
                    <span className="text-xs px-3 py-1 bg-primary text-primary-foreground rounded-full">
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
              </Link>
            ))}
          </div>

          {/* Show More Button */}
          <div className="mt-12 text-center">
            <Link
              to="/blog"
              className="inline-flex items-center px-8 py-4 bg-primary text-primary-foreground rounded-full font-medium hover:opacity-90 transition-opacity"
            >
              {t('blog.show_more')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
