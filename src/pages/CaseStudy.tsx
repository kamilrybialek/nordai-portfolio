import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { getPortfolioProjectBySlug, PortfolioProject } from '@/lib/tina';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const CaseStudy = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<PortfolioProject | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      if (!id) return;

      try {
        const projectData = await getPortfolioProjectBySlug(id);
        setProject(projectData);
      } catch (error) {
        console.error('Error loading project:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  const renderBody = (body: any) => {
    // For now, body rendering is handled through static content
    // In the future, this can be enhanced with dynamic MDX rendering
    if (!body) return <p className="text-muted-foreground">Content will be displayed here.</p>;
    return <div className="prose prose-lg max-w-none text-muted-foreground">{body}</div>;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4"></div>
          <h2 className="text-xl font-semibold">Loading project...</h2>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Project Not Found</h2>
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
              Back to Portfolio
            </Link>

            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="text-xs px-3 py-1 bg-primary text-primary-foreground rounded-full font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                {project.title}
              </h1>

              <p className="text-xl text-muted-foreground">
                {project.client}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Image */}
      {project.image && (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-10 mb-12">
          <div className="max-w-4xl mx-auto">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-96 object-cover rounded-lg shadow-2xl"
            />
          </div>
        </div>
      )}

      {/* Content */}
      <article className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Excerpt */}
          <div className="text-xl leading-relaxed mb-12 pb-12 border-b border-border">
            <p className="text-foreground font-medium">{project.excerpt}</p>
          </div>

          {/* Body Content */}
          <div className="prose prose-lg max-w-none">
            {renderBody(project.body)}
          </div>

          {/* Project Link */}
          {project.link && (
            <div className="mt-12 pt-12 border-t border-border">
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors"
              >
                View Live Project
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          )}
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default CaseStudy;
