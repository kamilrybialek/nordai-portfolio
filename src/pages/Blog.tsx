import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowRight, Clock } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import SEO from '@/components/SEO';

// Sample blog data
const articles = [
  {
    id: 'future-of-ai-automation',
    title: 'The Future of AI Automation in Business',
    excerpt: 'Exploring how artificial intelligence is reshaping enterprise workflows and what it means for the future of work.',
    category: 'ai',
    date: '2025-01-08',
    readTime: 8,
    image: '/placeholder.svg',
  },
  {
    id: 'design-systems-scale',
    title: 'Building Design Systems That Scale',
    excerpt: 'A practical guide to creating maintainable design systems that grow with your product.',
    category: 'design',
    date: '2025-01-05',
    readTime: 6,
    image: '/placeholder.svg',
  },
  {
    id: 'ai-branding-strategy',
    title: 'How AI is Transforming Brand Strategy',
    excerpt: 'Data-driven insights are revolutionizing how brands connect with their audiences.',
    category: 'insights',
    date: '2025-01-02',
    readTime: 5,
    image: '/placeholder.svg',
  },
  {
    id: 'workflow-automation-guide',
    title: 'Complete Guide to Workflow Automation',
    excerpt: 'Step-by-step approach to identifying and automating repetitive business processes.',
    category: 'automation',
    date: '2024-12-28',
    readTime: 10,
    image: '/placeholder.svg',
  },
  {
    id: 'ux-trends-2025',
    title: 'UX Design Trends to Watch in 2025',
    excerpt: 'From AI-powered interfaces to spatial design, here are the trends shaping user experience.',
    category: 'trends',
    date: '2024-12-22',
    readTime: 7,
    image: '/placeholder.svg',
  },
  {
    id: 'measuring-ai-roi',
    title: 'Measuring ROI on AI Investments',
    excerpt: 'Practical frameworks for quantifying the business value of artificial intelligence initiatives.',
    category: 'insights',
    date: '2024-12-18',
    readTime: 9,
    image: '/placeholder.svg',
  },
];

const categories = ['all', 'ai', 'automation', 'design', 'insights', 'trends'];

const Blog = () => {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState('all');

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
      <section className="section-padding pt-24 md:pt-32 bg-gradient-to-b from-muted/30 to-background">
        <div className="container-narrow text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm font-medium text-primary uppercase tracking-wider"
          >
            {t('blog.title')}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-4 mb-6"
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
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {t(`blog.categories.${cat}`)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="section-padding pt-8">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article, index) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                layout
              >
                <Link
                  to={`/blog/${article.id}`}
                  className="group block card-nordic overflow-hidden h-full"
                >
                  <div className="aspect-[16/10] bg-muted rounded-lg mb-6 overflow-hidden">
                    <img 
                      src={article.image} 
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-2 py-1 text-xs font-medium bg-nordic-warm-light text-primary rounded">
                      {t(`blog.categories.${article.category}`)}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {article.readTime} {t('blog.min_read')}
                    </span>
                  </div>
                  <h3 className="text-lg font-display font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {formatDate(article.date)}
                    </span>
                    <span className="inline-flex items-center gap-2 text-sm font-medium text-primary">
                      {t('blog.read_more')}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Blog;
