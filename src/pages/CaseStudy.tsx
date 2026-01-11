import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import SEO from '@/components/SEO';
import CTASection from '@/components/sections/CTASection';
import { Button } from '@/components/ui/button';

// Sample case study data
const caseStudies: Record<string, {
  title: string;
  client: string;
  category: string;
  challenge: string;
  solution: string;
  process: string[];
  results: { metric: string; value: string }[];
  techStack: string[];
  image: string;
}> = {
  'fintech-automation': {
    title: 'FinTech AI Automation',
    client: 'Nordic Bank Group',
    category: 'ai',
    challenge: 'Nordic Bank Group was struggling with overwhelming customer service volumes, with average response times exceeding 24 hours and customer satisfaction scores declining.',
    solution: 'We implemented a comprehensive AI-powered customer service automation system that handles 70% of inquiries automatically while seamlessly escalating complex issues to human agents.',
    process: [
      'Discovery & audit of existing customer service workflows',
      'AI model training on historical customer interactions',
      'Integration with existing CRM and ticketing systems',
      'Phased rollout with continuous optimization',
    ],
    results: [
      { metric: 'Response Time Reduction', value: '80%' },
      { metric: 'Customer Satisfaction', value: '+45%' },
      { metric: 'Cost Savings', value: '$2.4M/year' },
      { metric: 'Automation Rate', value: '70%' },
    ],
    techStack: ['GPT-4', 'Python', 'AWS', 'Salesforce', 'Custom NLP'],
    image: '/placeholder.svg',
  },
  'ecommerce-redesign': {
    title: 'E-commerce Redesign',
    client: 'Scandinavian Retail Co',
    category: 'web',
    challenge: 'Legacy e-commerce platform with poor mobile experience, slow load times, and outdated design was causing high cart abandonment rates.',
    solution: 'Complete platform rebuild with modern tech stack, AI-powered product recommendations, and streamlined checkout experience.',
    process: [
      'Comprehensive UX research and competitive analysis',
      'Design system creation with accessibility focus',
      'Headless commerce architecture implementation',
      'Performance optimization and A/B testing',
    ],
    results: [
      { metric: 'Conversion Rate', value: '+150%' },
      { metric: 'Mobile Revenue', value: '+220%' },
      { metric: 'Page Load Time', value: '-65%' },
      { metric: 'Cart Abandonment', value: '-40%' },
    ],
    techStack: ['Next.js', 'Shopify', 'Algolia', 'Vercel', 'Tailwind CSS'],
    image: '/placeholder.svg',
  },
};

const CaseStudy = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  
  const project = caseStudies[id || ''];
  
  if (!project) {
    return (
      <Layout>
        <div className="section-padding pt-24 text-center">
          <h1>Case study not found</h1>
          <Link to="/portfolio" className="text-primary">Back to portfolio</Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <SEO 
        title={`${project.title} | Case Study | nordAi.studio`}
        description={project.challenge}
        canonical={`/portfolio/${id}`}
      />
      
      {/* Hero */}
      <section className="section-padding pt-24 md:pt-32 bg-gradient-to-b from-muted/30 to-background">
        <div className="container-wide">
          <Link 
            to="/portfolio"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {t('portfolio.title')}
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="px-3 py-1 text-sm font-medium bg-nordic-warm-light text-primary rounded-full">
              {t(`portfolio.filter.${project.category}`)}
            </span>
            <h1 className="mt-6 mb-4">{project.title}</h1>
            <p className="text-xl text-muted-foreground">Client: {project.client}</p>
          </motion.div>
        </div>
      </section>

      {/* Hero Image */}
      <section className="pb-16">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="aspect-[16/9] bg-muted rounded-2xl overflow-hidden"
          >
            <img 
              src={project.image} 
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding pt-0">
        <div className="container-narrow">
          <div className="grid gap-16">
            {/* Challenge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-display font-semibold mb-4">{t('portfolio.challenge')}</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">{project.challenge}</p>
            </motion.div>

            {/* Solution */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-display font-semibold mb-4">{t('portfolio.solution')}</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">{project.solution}</p>
            </motion.div>

            {/* Process */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-display font-semibold mb-6">{t('portfolio.process')}</h2>
              <ol className="space-y-4">
                {project.process.map((step, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">
                      {i + 1}
                    </span>
                    <p className="text-muted-foreground pt-1">{step}</p>
                  </li>
                ))}
              </ol>
            </motion.div>

            {/* Results */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-display font-semibold mb-6">{t('portfolio.results')}</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {project.results.map((result, i) => (
                  <div key={i} className="text-center p-6 bg-muted/50 rounded-xl">
                    <p className="text-3xl font-display font-bold text-primary mb-2">{result.value}</p>
                    <p className="text-sm text-muted-foreground">{result.metric}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Tech Stack */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-display font-semibold mb-6">{t('portfolio.tech_stack')}</h2>
              <div className="flex flex-wrap gap-3">
                {project.techStack.map((tech, i) => (
                  <span key={i} className="px-4 py-2 bg-card border border-border rounded-lg text-sm font-medium">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <CTASection />
    </Layout>
  );
};

export default CaseStudy;
