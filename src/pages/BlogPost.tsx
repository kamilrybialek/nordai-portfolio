import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ArrowLeft, Clock, Calendar } from 'lucide-react';
import { getBlogArticleBySlug, BlogArticle } from '@/lib/tina';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Markdown from 'markdown-to-jsx';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<BlogArticle | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!slug) return;

      try {
        const articleData = await getBlogArticleBySlug(slug);
        setArticle(articleData);
      } catch (error) {
        console.error('Error loading article:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [slug]);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4"></div>
          <h2 className="text-xl font-semibold">Loading article...</h2>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Article Not Found</h2>
          <Link to="/blog" className="text-primary hover:underline">
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <div className="bg-gradient-to-b from-muted/30 to-background py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Link to="/blog" className="inline-flex items-center text-primary hover:underline mb-8 font-medium">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Link>

            <div className="space-y-6">
              <div className="flex items-center gap-4 text-sm flex-wrap">
                <span className="px-4 py-1.5 bg-primary text-primary-foreground rounded-full font-semibold">
                  {getCategoryLabel(article.category)}
                </span>
                <span className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  {formatDate(article.date)}
                </span>
                <span className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  {article.readTime} min read
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
                {article.title}
              </h1>

              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
                {article.excerpt}
              </p>

              {article.author && (
                <div className="flex items-center gap-3 pt-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-bold text-lg">
                      {article.author.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{article.author}</p>
                    <p className="text-sm text-muted-foreground">Author</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Featured Image */}
      {article.image && (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="max-w-5xl mx-auto">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-[400px] md:h-[500px] object-cover rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      )}

      {/* Content */}
      <article className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="max-w-3xl mx-auto">
          <div className="prose prose-lg prose-slate max-w-none
            prose-headings:font-bold prose-headings:text-foreground
            prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
            prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
            prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-6
            prose-a:text-primary prose-a:no-underline hover:prose-a:underline
            prose-strong:text-foreground prose-strong:font-semibold
            prose-ul:my-6 prose-ul:list-disc prose-ul:pl-6
            prose-ol:my-6 prose-ol:list-decimal prose-ol:pl-6
            prose-li:text-muted-foreground prose-li:my-2
            prose-code:text-primary prose-code:bg-primary/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
            prose-pre:bg-muted prose-pre:border prose-pre:border-border
            prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-4 prose-blockquote:italic
            prose-img:rounded-lg prose-img:shadow-lg">
            {article.body && <Markdown>{article.body}</Markdown>}
          </div>

          {/* Gallery */}
          {article.gallery && article.gallery.length > 0 && (
            <div className="mt-16 pt-16 border-t border-border">
              <h2 className="text-3xl font-bold text-foreground mb-8">Gallery</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {article.gallery.map((image, index) => (
                  <div key={index} className="group relative aspect-video overflow-hidden rounded-xl shadow-lg">
                    <img
                      src={image}
                      alt={`Gallery image ${index + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>

      {/* Footer Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-3xl mx-auto">
          <div className="border-t border-b border-border py-8">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Written by</p>
                <p className="font-semibold text-foreground text-lg">{article.author}</p>
              </div>
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-primary hover:underline font-semibold"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to all articles
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BlogPost;
