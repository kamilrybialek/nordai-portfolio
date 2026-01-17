import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ArrowLeft, Clock, Calendar } from 'lucide-react';
import { client } from '../../.tina/__generated__/client';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

interface Article {
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: number;
  author: string;
  image?: string;
  body: any;
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!slug) return;

      try {
        const response = await client.queries.blog({
          relativePath: `${slug}.mdx`,
        });
        setArticle(response.data.blog);
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

  const renderBody = (body: any) => {
    if (!body || !body.children) return null;

    return body.children.map((node: any, index: number) => {
      switch (node.type) {
        case 'h1':
          return (
            <h1 key={index} className="text-4xl font-bold mb-6 mt-12">
              {node.children.map((child: any) => child.text).join('')}
            </h1>
          );
        case 'h2':
          return (
            <h2 key={index} className="text-3xl font-bold mb-4 mt-10">
              {node.children.map((child: any) => child.text).join('')}
            </h2>
          );
        case 'h3':
          return (
            <h3 key={index} className="text-2xl font-bold mb-3 mt-8">
              {node.children.map((child: any) => child.text).join('')}
            </h3>
          );
        case 'p':
          return (
            <p key={index} className="text-lg leading-relaxed mb-6 text-muted-foreground">
              {node.children.map((child: any) => child.text).join('')}
            </p>
          );
        case 'ul':
          return (
            <ul key={index} className="list-disc list-inside mb-6 space-y-2">
              {node.children.map((li: any, liIndex: number) => (
                <li key={liIndex} className="text-lg text-muted-foreground">
                  {li.children.map((lic: any) => lic.children.map((child: any) => child.text).join('')).join('')}
                </li>
              ))}
            </ul>
          );
        case 'ol':
          return (
            <ol key={index} className="list-decimal list-inside mb-6 space-y-2">
              {node.children.map((li: any, liIndex: number) => (
                <li key={liIndex} className="text-lg text-muted-foreground">
                  {li.children.map((lic: any) => lic.children.map((child: any) => child.text).join('')).join('')}
                </li>
              ))}
            </ol>
          );
        default:
          return null;
      }
    });
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
          <Link to="/" className="text-primary hover:underline">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Link to="/" className="inline-flex items-center text-primary hover:underline mb-8">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Link>

            <div className="space-y-6">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full font-medium">
                  {getCategoryLabel(article.category)}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {formatDate(article.date)}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {article.readTime} min read
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                {article.title}
              </h1>

              <p className="text-xl text-muted-foreground">
                {article.excerpt}
              </p>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-bold text-sm">
                      {article.author.charAt(0)}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-foreground">
                    {article.author}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Image */}
      {article.image && (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-10 mb-12">
          <div className="max-w-4xl mx-auto">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-96 object-cover rounded-lg shadow-2xl"
            />
          </div>
        </div>
      )}

      {/* Content */}
      <article className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="prose prose-lg max-w-none">
            {renderBody(article.body)}
          </div>
        </div>
      </article>

      {/* Share Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-3xl mx-auto">
          <div className="border-t border-b border-border py-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Written by</p>
                <p className="font-medium text-foreground">{article.author}</p>
              </div>
              <Link
                to="/"
                className="text-primary hover:underline font-medium"
              >
                ← Back to all articles
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
