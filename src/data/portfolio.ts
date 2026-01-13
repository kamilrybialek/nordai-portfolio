// Portfolio Projects Data
// Edit this file to add, remove, or modify portfolio projects

export interface PortfolioProject {
  id: string;
  title: string;
  client: string;
  category: 'ai' | 'web' | 'branding' | 'design';
  tags: string[];
  excerpt: string;
  description?: string;
  image?: string;
  link?: string;
}

export const portfolioProjects: PortfolioProject[] = [
  {
    id: 'fintech-automation',
    title: 'FinTech AI Automation',
    client: 'Nordic Bank Group',
    category: 'ai',
    tags: ['AI', 'Automation'],
    excerpt: 'Automated customer service reducing response times by 80%.',
    description: 'Full description of the project...',
    image: '/placeholder.svg',
    link: 'https://example.com'
  },
  {
    id: 'ecommerce-redesign',
    title: 'E-commerce Redesign',
    client: 'Scandinavian Retail Co',
    category: 'web',
    tags: ['Development', 'Web'],
    excerpt: 'Complete platform overhaul resulting in 150% conversion increase.',
    description: 'Full description of the project...',
    image: '/placeholder.svg',
    link: 'https://example.com'
  },
  {
    id: 'brand-identity',
    title: 'Tech Startup Branding',
    client: 'GreenTech Innovations',
    category: 'branding',
    tags: ['Design', 'Branding'],
    excerpt: 'Full brand identity for sustainability-focused tech company.',
    description: 'Full description of the project...',
    image: '/placeholder.svg',
    link: 'https://example.com'
  },
  {
    id: 'healthcare-app',
    title: 'Healthcare App UX',
    client: 'MedCare Solutions',
    category: 'design',
    tags: ['Design', 'UX'],
    excerpt: 'Patient-centered mobile app with accessibility focus.',
    description: 'Full description of the project...',
    image: '/placeholder.svg',
    link: 'https://example.com'
  },
  {
    id: 'ai-content-platform',
    title: 'AI Content Platform',
    client: 'MediaHouse International',
    category: 'ai',
    tags: ['AI', 'Development'],
    excerpt: 'AI-powered content generation and distribution platform.',
    description: 'Full description of the project...',
    image: '/placeholder.svg',
    link: 'https://example.com'
  },
  {
    id: 'saas-dashboard',
    title: 'SaaS Analytics Dashboard',
    client: 'DataDriven Inc',
    category: 'web',
    tags: ['Development', 'Analytics'],
    excerpt: 'Real-time analytics dashboard with predictive insights.',
    description: 'Full description of the project...',
    image: '/placeholder.svg',
    link: 'https://example.com'
  },
];

// To add a new project, copy this template:
/*
{
  id: 'unique-project-id',
  title: 'Project Title',
  client: 'Client Name',
  category: 'ai', // ai, web, branding, or design
  tags: ['Tag1', 'Tag2'],
  excerpt: 'Short description (1-2 sentences)',
  description: 'Full project description',
  image: '/path/to/image.jpg',
  link: 'https://project-url.com'
},
*/
