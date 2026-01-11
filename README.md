# nordAi.studio - Portfolio & Blog Website

A modern, multi-language portfolio and blog website combining the minimalist Scandinavian design aesthetic with comprehensive content management capabilities.

## Overview

This project combines:
- **Visual Design**: Clean, minimalist Scandinavian design from scandi-ai-canvas
- **Content & Features**: Comprehensive portfolio, blog, and multi-language support from nordai-studio-hub
- **Internationalization**: Built-in support for English, Swedish, and Polish languages
- **Dark/Light Mode**: Smooth theme switching with system preference detection

## Features

- **Multi-language Support**: Switch between English (EN), Swedish (SV), and Polish (PL)
- **Portfolio System**: Showcase your work with detailed case studies
- **Blog Platform**: Multi-language blog with categorization and tagging
- **Responsive Design**: Mobile-first, fully responsive layout
- **Modern Stack**: React 18, TypeScript, Vite, Tailwind CSS
- **SEO Optimized**: Built-in SEO components with react-helmet-async
- **Theme Support**: Dark and light mode with smooth transitions

## Pages

- **Home** (`/`) - Hero section, services overview, and call-to-action
- **About** (`/about`) - Company information and values
- **Services** (`/services`) - Service listings with detailed pages
- **Portfolio** (`/portfolio`) - Project showcase with case studies
- **Blog** (`/blog`) - Multi-language blog articles
- **Contact** (`/contact`) - Contact form and information

## Technologies

### Core Stack
- **React 18.3** - Modern React with hooks
- **TypeScript 5.8** - Type-safe development
- **Vite 5.4** - Fast build tool and dev server
- **React Router 6** - Client-side routing

### UI & Styling
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **shadcn/ui** - High-quality React components
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icon set
- **Framer Motion** - Smooth animations

### Internationalization
- **i18next** - Internationalization framework
- **react-i18next** - React bindings for i18next

### Additional Features
- **react-helmet-async** - SEO and meta tag management
- **TanStack Query** - Powerful data fetching
- **next-themes** - Theme management
- **Zod** - Schema validation
- **React Hook Form** - Form management

## Getting Started

### Prerequisites

- Node.js 18+ (recommended: use [nvm](https://github.com/nvm-sh/nvm))
- npm or bun

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd nordai-portfolio

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Development

### Project Structure

```
nordai-portfolio/
├── src/
│   ├── components/
│   │   ├── layout/          # Layout components (Header, Footer, Layout)
│   │   ├── sections/        # Page sections (Hero, Services, etc.)
│   │   └── ui/              # shadcn/ui components
│   ├── i18n/
│   │   ├── locales/         # Translation files (en.json, sv.json, pl.json)
│   │   └── index.ts         # i18n configuration
│   ├── pages/               # Page components
│   ├── App.tsx              # Main app component
│   ├── main.tsx             # Entry point
│   └── index.css            # Global styles & design system
├── public/                  # Static assets
├── tailwind.config.ts       # Tailwind configuration
├── vite.config.ts           # Vite configuration
└── package.json
```

### Adding Translations

Edit the JSON files in `src/i18n/locales/`:
- `en.json` - English translations
- `sv.json` - Swedish translations
- `pl.json` - Polish translations

### Customizing Design

The design system is defined in `src/index.css`. All colors use HSL values and support both light and dark themes.

### Adding New Pages

1. Create page component in `src/pages/`
2. Add route in `src/App.tsx`
3. Add translations in locale files
4. Update navigation in `src/components/layout/Header.tsx`

## Deployment

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

### Deployment Options

#### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

#### Netlify
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod --dir=dist
```

#### GitHub Pages

1. Update `vite.config.ts` with base path
2. Build: `npm run build`
3. Deploy `dist/` folder to `gh-pages` branch

#### Static Hosting (AWS S3, Cloudflare Pages, etc.)

Simply upload the contents of the `dist/` folder to your hosting provider.

## Environment Configuration

Create a `.env` file for environment-specific variables:

```env
VITE_API_URL=your-api-url
VITE_CONTACT_EMAIL=your-email
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

This is a proprietary project. For any questions or issues, please contact the project maintainer.

## License

All rights reserved © 2025 nordAi.studio

---

**Built with ❤️ using modern web technologies**
