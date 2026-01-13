// Blog Articles Data
// Edit this file to add, remove, or modify blog articles

export interface BlogArticle {
  id: string;
  title: string;
  excerpt: string;
  category: 'ai' | 'automation' | 'design' | 'insights' | 'trends';
  date: string; // Format: YYYY-MM-DD
  readTime: number; // in minutes
  author?: string;
  image?: string;
  content?: string;
}

export const blogArticles: BlogArticle[] = [
  {
    id: 'future-of-ai-automation',
    title: 'The Future of AI Automation in Business',
    excerpt: 'Exploring how artificial intelligence is reshaping enterprise workflows and what it means for the future of work.',
    category: 'ai',
    date: '2025-01-08',
    readTime: 8,
    author: 'nordAi Team',
    image: '/placeholder.svg',
    content: 'Full article content goes here...'
  },
  {
    id: 'design-systems-scale',
    title: 'Building Design Systems That Scale',
    excerpt: 'A practical guide to creating maintainable design systems that grow with your product.',
    category: 'design',
    date: '2025-01-05',
    readTime: 6,
    author: 'nordAi Team',
    image: '/placeholder.svg',
    content: 'Full article content goes here...'
  },
  {
    id: 'ai-branding-strategy',
    title: 'How AI is Transforming Brand Strategy',
    excerpt: 'Data-driven insights are revolutionizing how brands connect with their audiences.',
    category: 'insights',
    date: '2025-01-02',
    readTime: 5,
    author: 'nordAi Team',
    image: '/placeholder.svg',
    content: 'Full article content goes here...'
  },
  {
    id: 'workflow-automation-guide',
    title: 'Complete Guide to Workflow Automation',
    excerpt: 'Step-by-step approach to identifying and automating repetitive business processes.',
    category: 'automation',
    date: '2024-12-28',
    readTime: 10,
    author: 'nordAi Team',
    image: '/placeholder.svg',
    content: 'Full article content goes here...'
  },
  {
    id: 'ux-trends-2025',
    title: 'UX Design Trends to Watch in 2025',
    excerpt: 'From AI-powered interfaces to spatial design, here are the trends shaping user experience.',
    category: 'trends',
    date: '2024-12-22',
    readTime: 7,
    author: 'nordAi Team',
    image: '/placeholder.svg',
    content: 'Full article content goes here...'
  },
  {
    id: 'measuring-ai-roi',
    title: 'Measuring ROI on AI Investments',
    excerpt: 'Practical frameworks for quantifying the business value of artificial intelligence initiatives.',
    category: 'insights',
    date: '2024-12-18',
    readTime: 9,
    author: 'nordAi Team',
    image: '/placeholder.svg',
    content: 'Full article content goes here...'
  },
];

// To add a new article, copy this template:
/*
{
  id: 'unique-article-id',
  title: 'Article Title',
  excerpt: 'Short description (1-2 sentences)',
  category: 'ai', // ai, automation, design, insights, or trends
  date: '2025-01-15', // Format: YYYY-MM-DD
  readTime: 5, // in minutes
  author: 'Author Name',
  image: '/path/to/image.jpg',
  content: 'Full article content in markdown or HTML...'
},
*/
