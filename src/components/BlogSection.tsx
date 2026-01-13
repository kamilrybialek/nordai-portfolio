import { useTranslation } from 'react-i18next';

const articles = [
  {
    id: 'future-of-ai-automation',
    title: 'The Future of AI Automation in Business',
    excerpt: 'Exploring how artificial intelligence is reshaping enterprise workflows and what it means for the future of work.',
    category: 'AI',
    date: '2025-01-08',
    readTime: 8,
  },
  {
    id: 'design-systems-scale',
    title: 'Building Design Systems That Scale',
    excerpt: 'A practical guide to creating maintainable design systems that grow with your product.',
    category: 'Design',
    date: '2025-01-05',
    readTime: 6,
  },
  {
    id: 'ai-branding-strategy',
    title: 'How AI is Transforming Brand Strategy',
    excerpt: 'Data-driven insights are revolutionizing how brands connect with their audiences.',
    category: 'Insights',
    date: '2025-01-02',
    readTime: 5,
  },
  {
    id: 'workflow-automation-guide',
    title: 'Complete Guide to Workflow Automation',
    excerpt: 'Step-by-step approach to identifying and automating repetitive business processes.',
    category: 'Automation',
    date: '2024-12-28',
    readTime: 10,
  },
  {
    id: 'ux-trends-2025',
    title: 'UX Design Trends to Watch in 2025',
    excerpt: 'From AI-powered interfaces to spatial design, here are the trends shaping user experience.',
    category: 'Trends',
    date: '2024-12-22',
    readTime: 7,
  },
  {
    id: 'measuring-ai-roi',
    title: 'Measuring ROI on AI Investments',
    excerpt: 'Practical frameworks for quantifying the business value of artificial intelligence initiatives.',
    category: 'Insights',
    date: '2024-12-18',
    readTime: 9,
  },
];

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
            {articles.map((article, index) => (
              <div
                key={index}
                className="group bg-card rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 border border-border hover:border-primary/50"
              >
                <div className="aspect-video bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10"></div>
                <div className="p-8 space-y-4">
                  <div className="flex flex-wrap gap-2 items-center">
                    <span className="text-xs px-3 py-1 bg-secondary text-muted-foreground rounded-full">
                      {article.category}
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
