import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { getPortfolioProjectBySlug, PortfolioProject } from '@/lib/tina';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Markdown from 'markdown-to-jsx';

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
          <Link to="/portfolio" className="text-primary hover:underline">
            ← Back to Portfolio
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
            <Link to="/portfolio" className="inline-flex items-center text-primary hover:underline mb-8 font-medium">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Portfolio
            </Link>

            <div className="space-y-6">
              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {project.tags && project.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-4 py-1.5 text-sm font-semibold bg-primary/10 text-primary rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
                {project.title}
              </h1>

              {/* Client */}
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-muted-foreground">Client:</span>
                <span className="text-xl font-semibold text-foreground">{project.client}</span>
              </div>

              {/* Excerpt */}
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
                {project.excerpt}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Image */}
      {project.image && (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="max-w-5xl mx-auto">
            <img
              src={project.image}
              alt={project.title}
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
            {project.body && <Markdown>{project.body}</Markdown>}
          </div>

          {/* Gallery */}
          {project.gallery && project.gallery.length > 0 && (
            <div className="mt-16 pt-16 border-t border-border">
              <h2 className="text-3xl font-bold text-foreground mb-8">Project Gallery</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {project.gallery.map((item, index) => {
                  const imageUrl = typeof item === 'string' ? item : (item?.url || '');
                  if (!imageUrl) return null;
                  return (
                    <div key={index} className="group relative aspect-video overflow-hidden rounded-xl shadow-lg">
                      <img
                        src={imageUrl}
                        alt={`Project image ${index + 1}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Project Link */}
          {project.link && (
            <div className="mt-16 pt-16 border-t border-border">
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-xl hover:opacity-90 transition-opacity shadow-lg shadow-primary/25"
              >
                <ExternalLink className="w-5 h-5" />
                View Live Project
              </a>
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
                <p className="text-sm text-muted-foreground mb-1">Project for</p>
                <p className="font-semibold text-foreground text-lg">{project.client}</p>
              </div>
              <Link
                to="/portfolio"
                className="inline-flex items-center gap-2 text-primary hover:underline font-semibold"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to all projects
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CaseStudy;
