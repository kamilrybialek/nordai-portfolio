import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Calendar, Share2 } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import SEO from '@/components/SEO';

// Sample article data
const articlesData: Record<string, {
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: number;
  author: string;
  image: string;
  content: string[];
}> = {
  'future-of-ai-automation': {
    title: 'The Future of AI Automation in Business',
    excerpt: 'Exploring how artificial intelligence is reshaping enterprise workflows and what it means for the future of work.',
    category: 'ai',
    date: '2025-01-08',
    readTime: 8,
    author: 'nordAi.studio Team',
    image: '/placeholder.svg',
    content: [
      'Artificial intelligence is no longer a futuristic concept—it\'s transforming businesses today. From customer service chatbots to complex supply chain optimization, AI-powered automation is reshaping how organizations operate and compete.',
      'The integration of AI into business workflows represents a paradigm shift in operational efficiency. Companies that embrace this technology are seeing dramatic improvements in productivity, accuracy, and cost savings.',
      'One of the most significant impacts of AI automation is its ability to handle repetitive tasks with unprecedented speed and accuracy. This frees up human workers to focus on creative, strategic, and interpersonal work that machines cannot replicate.',
      'Looking ahead, we expect to see even more sophisticated AI systems that can handle complex decision-making processes, learn from their environment in real-time, and seamlessly collaborate with human teams.',
      'For businesses considering AI automation, the key is to start with clear objectives, pilot programs in controlled environments, and scale gradually based on proven results. The future belongs to organizations that can effectively blend human creativity with machine efficiency.',
    ],
  },
  'design-systems-scale': {
    title: 'Building Design Systems That Scale',
    excerpt: 'A practical guide to creating maintainable design systems that grow with your product.',
    category: 'design',
    date: '2025-01-05',
    readTime: 6,
    author: 'nordAi.studio Team',
    image: '/placeholder.svg',
    content: [
      'A well-crafted design system is the foundation of consistent, scalable product design. It serves as a single source of truth for design decisions, enabling teams to work efficiently and maintain brand coherence across all touchpoints.',
      'The key to building a scalable design system lies in establishing clear principles, flexible components, and robust documentation. These elements work together to create a system that can evolve with your product.',
      'Component design should prioritize composability and flexibility. Rather than creating rigid, single-purpose components, build modular pieces that can be combined in various ways to meet different use cases.',
      'Documentation is often undervalued but is crucial for adoption. Clear guidelines, usage examples, and best practices help designers and developers understand when and how to use each component.',
      'Remember that a design system is never truly finished. Plan for iteration and improvement from the start, and establish processes for gathering feedback and implementing updates.',
    ],
  },
};

const BlogPost = () => {
  const { slug } = useParams();
  const { t } = useTranslation();
  
  const article = articlesData[slug || ''];
  
  if (!article) {
    return (
      <Layout>
        <div className="section-padding pt-24 text-center">
          <h1>Article not found</h1>
          <Link to="/blog" className="text-primary">Back to blog</Link>
        </div>
      </Layout>
    );
  }

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
        title={`${article.title} | nordAi.studio Blog`}
        description={article.excerpt}
        canonical={`/blog/${slug}`}
        ogType="article"
      />
      
      {/* Hero */}
      <article>
        <header className="section-padding pt-24 md:pt-32 bg-gradient-to-b from-muted/30 to-background">
          <div className="container-narrow">
            <Link 
              to="/blog"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              {t('blog.title')}
            </Link>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <span className="px-3 py-1 text-sm font-medium bg-nordic-warm-light text-primary rounded-full">
                {t(`blog.categories.${article.category}`)}
              </span>
              <h1 className="mt-6 mb-6">{article.title}</h1>
              <p className="text-xl text-muted-foreground mb-8">{article.excerpt}</p>
              
              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground pb-8 border-b border-border">
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {formatDate(article.date)}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {article.readTime} {t('blog.min_read')}
                </span>
                <span>By {article.author}</span>
              </div>
            </motion.div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="container-narrow py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="aspect-[16/9] bg-muted rounded-2xl overflow-hidden"
          >
            <img 
              src={article.image} 
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>

        {/* Content */}
        <div className="container-narrow section-padding pt-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="prose prose-lg max-w-none"
          >
            {article.content.map((paragraph, i) => (
              <p key={i} className="text-lg text-muted-foreground leading-relaxed mb-6">
                {paragraph}
              </p>
            ))}
          </motion.div>
        </div>
      </article>
    </Layout>
  );
};

export default BlogPost;
