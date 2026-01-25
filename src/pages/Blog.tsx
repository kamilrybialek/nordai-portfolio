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
  const { t, i18n } = useTranslation();
  const [activeCategory, setActiveCategory] = useState('all');
  const [articles, setArticles] = useState<BlogArticle[]>([]);

  useEffect(() => {
    getBlogArticles().then(allArticles => {
      // Filter articles by current language
      const currentLang = i18n.language;
      const languageFilteredArticles = allArticles.filter(article => {
        // Check if filename ends with .en, .pl, or .sv
        const languageSuffix = article._sys.filename.match(/\.(en|pl|sv)$/);
        if (languageSuffix) {
          return languageSuffix[1] === currentLang;
        }
        // If no language suffix, show in English by default
        return currentLang === 'en';
      });
      setArticles(languageFilteredArticles);
    });
  }, [i18n.language]);

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
      <section className="pt-12 md:pt-16 pb-12 bg-gradient-to-b from-muted/20 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block text-sm font-bold text-primary uppercase tracking-[0.2em] mb-2"
            >
              {t('blog.title')}
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold text-foreground leading-[1.1] tracking-tight"
            >
              {t('blog.headline')}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto font-medium"
            >
              {t('blog.subheadline')}
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
                {t(`blog.categories.${cat}`)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {filteredArticles.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-2xl font-semibold text-muted-foreground">No articles found in this category.</p>
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
                    <div className="p-7 space-y-4 flex-1 flex flex-col">
                      {/* Category & Read Time */}
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="px-3 py-1.5 text-xs font-bold bg-primary/10 text-primary rounded-full uppercase tracking-wide">
                          {t(`blog.categories.${article.category}`)}
                        </span>
                        <span className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
                          <Clock className="w-3.5 h-3.5" />
                          {article.readTime} {t('blog.min_read')}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                        {article.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-base text-muted-foreground leading-relaxed line-clamp-3 flex-1">
                        {article.excerpt}
                      </p>

                      {/* Footer */}
                      <div className="pt-5 border-t border-border flex items-center justify-between">
                        <span className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
                          <Calendar className="w-4 h-4" />
                          {formatDate(article.date)}
                        </span>
                        <span className="inline-flex items-center gap-2 text-sm font-bold text-primary group-hover:gap-3 transition-all">
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
