import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, Calendar } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import SEO from '@/components/SEO';
import { getBlogArticles, BlogArticle } from '@/lib/tina';

const categories = ['all', 'ai', 'automation', 'design', 'insights', 'trends'];

const Blog = () => {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState('all');
  const [articles, setArticles] = useState<BlogArticle[]>([]);

  useEffect(() => {
    getBlogArticles().then(setArticles);
  }, []);

  const filteredArticles = activeCategory === 'all'
    ? articles
    : articles.filter(a => a.category === activeCategory);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Layout>
      <SEO
        title={t('meta.blog.title')}
        description={t('meta.blog.description')}
        canonical="/blog"
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
              {t('blog.title')}
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-bold text-foreground mb-6"
            >
              {t('blog.headline')}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-muted-foreground max-w-2xl mx-auto"
            >
              {t('blog.subheadline')}
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
                {t(`blog.categories.${cat}`)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {filteredArticles.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl text-muted-foreground">No articles found in this category.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {filteredArticles.map((article, index) => (
                <motion.article
                  key={article._sys.filename}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  layout
                >
                  <Link
                    to={`/blog/${article._sys.filename}`}
                    className="group block bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/50 hover:shadow-2xl transition-all duration-300 h-full flex flex-col"
                  >
                    {/* Image */}
                    <div className="aspect-[16/10] bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5 overflow-hidden">
                      <img
                        src={article.image || '/placeholder.svg'}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-4 flex-1 flex flex-col">
                      {/* Category & Read Time */}
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="px-3 py-1 text-xs font-semibold bg-primary/10 text-primary rounded-full">
                          {t(`blog.categories.${article.category}`)}
                        </span>
                        <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                          <Clock className="w-3.5 h-3.5" />
                          {article.readTime} {t('blog.min_read')}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {article.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-base text-muted-foreground leading-relaxed line-clamp-3 flex-1">
                        {article.excerpt}
                      </p>

                      {/* Footer */}
                      <div className="pt-4 border-t border-border flex items-center justify-between">
                        <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Calendar className="w-3.5 h-3.5" />
                          {formatDate(article.date)}
                        </span>
                        <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary group-hover:gap-3 transition-all">
                          {t('blog.read_more')}
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
    </Layout>
  );
};

export default Blog;
