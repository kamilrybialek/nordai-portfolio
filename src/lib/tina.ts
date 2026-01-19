// Helper functions to load content from Tina CMS
// This file provides functions to fetch portfolio and blog data

export interface PortfolioProject {
  title: string;
  client: string;
  category: 'ai' | 'web' | 'branding' | 'design';
  tags: string[];
  excerpt: string;
  featured?: boolean;
  body?: any;
  image?: string;
  link?: string;
  seoTitle?: string;
  seoDescription?: string;
  _sys: {
    filename: string;
  };
}

export interface BlogArticle {
  title: string;
  excerpt: string;
  category: 'ai' | 'automation' | 'design' | 'insights' | 'trends';
  date: string;
  readTime: number;
  featured?: boolean;
  author?: string;
  image?: string;
  body?: any;
  seoTitle?: string;
  seoDescription?: string;
  _sys: {
    filename: string;
  };
}

// In development, we'll use the static data
// In production with Tina Cloud, this will be replaced with TinaClient
export async function getPortfolioProjects(): Promise<PortfolioProject[]> {
  // For now, return static data structure
  // This will be connected to Tina CMS content later
  return [
    {
      title: 'FinTech AI Automation',
      client: 'Nordic Bank Group',
      category: 'ai',
      tags: ['AI', 'Automation'],
      excerpt: 'Automated customer service reducing response times by 80%.',
      featured: true,
      image: '/placeholder.svg',
      link: 'https://example.com',
      seoTitle: 'FinTech AI Automation - Nordic Bank Group Case Study',
      seoDescription: 'How we automated customer service for Nordic Bank Group using AI.',
      _sys: { filename: 'fintech-automation' }
    },
    {
      title: 'E-commerce Redesign',
      client: 'Scandinavian Retail Co',
      category: 'web',
      tags: ['Development', 'Web'],
      excerpt: 'Complete platform overhaul resulting in 150% conversion increase.',
      featured: true,
      image: '/placeholder.svg',
      link: 'https://example.com',
      seoTitle: 'E-commerce Redesign - Scandinavian Retail Co Success Story',
      seoDescription: 'Complete e-commerce platform redesign that increased conversions by 150%.',
      _sys: { filename: 'ecommerce-redesign' }
    },
    {
      title: 'Tech Startup Branding',
      client: 'GreenTech Innovations',
      category: 'branding',
      tags: ['Design', 'Branding'],
      excerpt: 'Full brand identity for sustainability-focused tech company.',
      featured: true,
      image: '/placeholder.svg',
      link: 'https://example.com',
      seoTitle: 'Tech Startup Branding - GreenTech Innovations Brand Identity',
      seoDescription: 'Complete brand identity design for sustainability-focused tech startup.',
      _sys: { filename: 'brand-identity' }
    },
    {
      title: 'Healthcare App UX',
      client: 'MedCare Solutions',
      category: 'design',
      tags: ['Design', 'UX'],
      excerpt: 'Patient-centered mobile app with accessibility focus.',
      featured: true,
      image: '/placeholder.svg',
      link: 'https://example.com',
      seoTitle: 'Healthcare App UX Design - MedCare Solutions Mobile Application',
      seoDescription: 'Patient-centered mobile healthcare app design with strong accessibility focus.',
      _sys: { filename: 'healthcare-app' }
    },
    {
      title: 'AI Content Platform',
      client: 'MediaHouse International',
      category: 'ai',
      tags: ['AI', 'Development'],
      excerpt: 'AI-powered content generation and distribution platform.',
      image: '/placeholder.svg',
      link: 'https://example.com',
      seoTitle: 'AI Content Platform - MediaHouse International Content Solution',
      seoDescription: 'AI-powered content generation and distribution platform for MediaHouse International.',
      _sys: { filename: 'ai-content-platform' }
    },
    {
      title: 'SaaS Analytics Dashboard',
      client: 'DataDriven Inc',
      category: 'web',
      tags: ['Development', 'Analytics'],
      excerpt: 'Real-time analytics dashboard with predictive insights.',
      image: '/placeholder.svg',
      link: 'https://example.com',
      seoTitle: 'SaaS Analytics Dashboard - DataDriven Inc Real-time Solution',
      seoDescription: 'Real-time analytics dashboard with predictive insights for DataDriven Inc.',
      _sys: { filename: 'saas-dashboard' }
    }
  ];
}

export async function getBlogArticles(): Promise<BlogArticle[]> {
  // For now, return static data structure
  // This will be connected to Tina CMS content later
  return [
    {
      title: 'The Future of AI Automation in Business',
      excerpt: 'Exploring how artificial intelligence is reshaping enterprise workflows and what it means for the future of work.',
      category: 'ai',
      date: '2025-01-08',
      readTime: 8,
      featured: true,
      author: 'nordAi Team',
      image: '/placeholder.svg',
      seoTitle: 'The Future of AI Automation in Business - 2025 Trends & Insights',
      seoDescription: 'Explore how artificial intelligence is reshaping enterprise workflows in 2025.',
      _sys: { filename: 'future-of-ai-automation' }
    },
    {
      title: 'Building Design Systems That Scale',
      excerpt: 'A practical guide to creating maintainable design systems that grow with your product.',
      category: 'design',
      date: '2025-01-05',
      readTime: 6,
      featured: true,
      author: 'nordAi Team',
      image: '/placeholder.svg',
      seoTitle: 'Building Design Systems That Scale - Complete Guide 2025',
      seoDescription: 'Learn how to create maintainable, scalable design systems that grow with your product.',
      _sys: { filename: 'design-systems-scale' }
    },
    {
      title: 'How AI is Transforming Brand Strategy',
      excerpt: 'Data-driven insights are revolutionizing how brands connect with their audiences.',
      category: 'insights',
      date: '2025-01-02',
      readTime: 5,
      featured: true,
      author: 'nordAi Team',
      image: '/placeholder.svg',
      seoTitle: 'How AI is Transforming Brand Strategy - Data-Driven Insights 2025',
      seoDescription: 'Discover how AI and data-driven insights are revolutionizing brand strategy.',
      _sys: { filename: 'ai-branding-strategy' }
    },
    {
      title: 'Complete Guide to Workflow Automation',
      excerpt: 'Step-by-step approach to identifying and automating repetitive business processes.',
      category: 'automation',
      date: '2024-12-28',
      readTime: 10,
      featured: true,
      author: 'nordAi Team',
      image: '/placeholder.svg',
      seoTitle: 'Complete Guide to Workflow Automation - Step-by-Step Process',
      seoDescription: 'Learn how to identify and automate repetitive business processes with our complete workflow automation guide.',
      _sys: { filename: 'workflow-automation-guide' }
    },
    {
      title: 'UX Design Trends to Watch in 2025',
      excerpt: 'From AI-powered interfaces to spatial design, here are the trends shaping user experience.',
      category: 'trends',
      date: '2024-12-22',
      readTime: 7,
      author: 'nordAi Team',
      image: '/placeholder.svg',
      seoTitle: 'UX Design Trends 2025 - Top User Experience Innovations',
      seoDescription: 'Discover the top UX design trends for 2025, from AI-powered interfaces to spatial design.',
      _sys: { filename: 'ux-trends-2025' }
    },
    {
      title: 'Measuring ROI on AI Investments',
      excerpt: 'Practical frameworks for quantifying the business value of artificial intelligence initiatives.',
      category: 'insights',
      date: '2024-12-18',
      readTime: 9,
      author: 'nordAi Team',
      image: '/placeholder.svg',
      seoTitle: 'Measuring ROI on AI Investments - Complete Framework & Metrics',
      seoDescription: 'Learn practical frameworks for quantifying business value of AI initiatives.',
      _sys: { filename: 'measuring-ai-roi' }
    }
  ];
}
