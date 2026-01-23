// Helper functions to load content from MDX files
// This file provides functions to fetch portfolio and blog data

import matter from 'gray-matter';

export interface PortfolioProject {
  title: string;
  client: string;
  category: 'ai' | 'web' | 'branding' | 'design';
  tags: string[];
  excerpt: string;
  featured?: boolean;
  body?: string;
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
  body?: string;
  seoTitle?: string;
  seoDescription?: string;
  _sys: {
    filename: string;
  };
}

// Load all portfolio MDX files using Vite's glob import
const portfolioFiles = import.meta.glob('/content/portfolio/*.mdx', {
  eager: true,
  query: '?raw',
  import: 'default'
});

// Load all blog MDX files using Vite's glob import
const blogFiles = import.meta.glob('/content/blog/*.mdx', {
  eager: true,
  query: '?raw',
  import: 'default'
});

export async function getPortfolioProjects(): Promise<PortfolioProject[]> {
  const projects: PortfolioProject[] = [];

  for (const [path, content] of Object.entries(portfolioFiles)) {
    const rawContent = content as string;
    const { data } = matter(rawContent);
    const filename = path.split('/').pop()?.replace('.mdx', '') || '';

    projects.push({
      title: data.title || '',
      client: data.client || '',
      category: data.category || 'web',
      tags: data.tags || [],
      excerpt: data.excerpt || '',
      featured: data.featured || false,
      body: data.body,
      image: data.image || '/placeholder.svg',
      link: data.link,
      seoTitle: data.seoTitle,
      seoDescription: data.seoDescription,
      _sys: { filename }
    });
  }

  return projects;
}

export async function getPortfolioProjectBySlug(slug: string): Promise<PortfolioProject | null> {
  const projects = await getPortfolioProjects();
  return projects.find(p => p._sys.filename === slug) || null;
}

export async function getBlogArticles(): Promise<BlogArticle[]> {
  const articles: BlogArticle[] = [];

  for (const [path, content] of Object.entries(blogFiles)) {
    const rawContent = content as string;
    const { data } = matter(rawContent);
    const filename = path.split('/').pop()?.replace('.mdx', '') || '';

    articles.push({
      title: data.title || '',
      excerpt: data.excerpt || '',
      category: data.category || 'insights',
      date: data.date || new Date().toISOString(),
      readTime: data.readTime || 5,
      featured: data.featured || false,
      author: data.author || 'nordAi Team',
      image: data.image || '/placeholder.svg',
      body: data.body,
      seoTitle: data.seoTitle,
      seoDescription: data.seoDescription,
      _sys: { filename }
    });
  }

  // Sort by date, newest first
  return articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getBlogArticleBySlug(slug: string): Promise<BlogArticle | null> {
  const articles = await getBlogArticles();
  return articles.find(a => a._sys.filename === slug) || null;
}
