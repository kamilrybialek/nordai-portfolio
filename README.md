# nordai.studio Portfolio Website

## Project Overview

This is a modern, multilingual portfolio website for **nordai.studio** - a Nordic digital studio specializing in AI-powered web development and graphic design services. The website showcases the company's services, portfolio projects, blog articles, and provides information about the founders Daniela (Graphic Designer) and Kamil (AI Technology Lead).

**Primary Tech Stack:**
- **React 18.3** with TypeScript
- **Vite 5.4** as build tool
- **TailwindCSS** for styling
- **TinaCMS** for content management
- **React Router** for navigation
- **i18next** for internationalization (EN, PL, SV)
- **Framer Motion** for animations

**Deployment:**
- GitHub repository: https://github.com/kamilrybialek/nordai-portfolio
- Vercel for production hosting (automatic deployments from `main` branch)

---

## Project Structure

```
nordai-portfolio/
├── src/
│   ├── components/           # Reusable React components
│   │   ├── admin/           # Admin panel components
│   │   │   ├── ImageUploader.tsx
│   │   │   └── RichTextEditor.tsx
│   │   ├── layout/          # Layout components
│   │   │   ├── Footer.tsx
│   │   │   └── LanguageSwitcher.tsx
│   │   ├── sections/        # Alternative section components
│   │   │   ├── HeroSection.tsx
│   │   │   └── ServicesSection.tsx
│   │   ├── ui/              # shadcn/ui components
│   │   │   └── button.tsx
│   │   ├── AnimatedThemeToggler.tsx
│   │   ├── BlogSection.tsx
│   │   ├── ContactSection.tsx
│   │   ├── Footer.tsx
│   │   ├── HeroSection.tsx
│   │   ├── Navigation.tsx
│   │   ├── PhilosophySection.tsx  # About Us section
│   │   ├── PortfolioSection.tsx
│   │   └── ServicesSection.tsx
│   ├── pages/               # Route pages
│   │   ├── Admin.tsx        # Redirects to FullAdmin
│   │   ├── Blog.tsx         # Blog listing page
│   │   ├── BlogPost.tsx     # Individual blog post
│   │   ├── CaseStudy.tsx    # Individual portfolio project
│   │   ├── FullAdmin.tsx    # Full admin panel with Portfolio & Blog management
│   │   ├── Index.tsx        # Homepage
│   │   ├── Portfolio.tsx    # Portfolio listing page
│   │   └── SimpleAdmin.tsx  # Legacy admin (not used)
│   ├── i18n/                # Internationalization
│   │   ├── locales/
│   │   │   ├── en.json      # English translations
│   │   │   ├── pl.json      # Polish translations
│   │   │   └── sv.json      # Swedish translations
│   │   └── config.ts        # i18n configuration
│   ├── App.tsx              # Main app with routes
│   ├── main.tsx             # Entry point
│   └── index.css            # Global CSS with design system
├── content/                 # TinaCMS content files (MDX)
│   ├── blog/
│   └── portfolio/
├── .tina/                   # TinaCMS configuration
│   └── config.ts
├── public/
├── index.html               # HTML template with font imports
├── tailwind.config.ts       # Tailwind configuration
├── tsconfig.json            # TypeScript configuration
└── vite.config.ts           # Vite configuration
```

---

## Design System & Styling

### Color System (HSL Format)

All colors are defined in `src/index.css` using CSS custom properties in HSL format.

**Light Mode:**
- Background: `0 0% 100%` (pure white)
- Foreground: `0 0% 10%` (dark gray)
- Primary: `0 0% 10%` (dark for buttons/accents)
- Border: `0 0% 90%` (light gray)

**Dark Mode (CURRENT ACTIVE THEME):**
```css
.dark {
  --background: 0 0% 5%;           /* Almost black (#0D0D0D) */
  --foreground: 0 0% 100%;         /* Pure white text */
  --card: 0 0% 8%;                 /* Slightly lighter than background */
  --card-foreground: 0 0% 100%;    /* White text on cards */
  --primary: 0 0% 100%;            /* White buttons */
  --primary-foreground: 0 0% 5%;   /* Dark text on white buttons */
  --muted-foreground: 0 0% 85%;    /* Light gray for secondary text */
  --border: 200 15% 20%;           /* Subtle graphite borders */
  --ring: 0 0% 100%;               /* White focus rings */
}
```

**Key Design Decisions:**
- All text in dark mode is white (`0 0% 100%`)
- All buttons/badges/tags have white background in dark mode
- Consistent styling: buttons, tags, and badges all use `bg-primary text-primary-foreground`

### Typography

**Fonts:**
- **Body text**: Montserrat weight 300 (light)
- **Headings (h1-h6)**: Montserrat weight 400 (normal)
- Font loaded from Google Fonts + Adobe Fonts (Futura PT as fallback)

**Font Import (in `index.html`):**
```html
<!-- Adobe Fonts - Futura PT -->
<link rel="stylesheet" href="https://use.typekit.net/iny7rsd.css">

<!-- Google Fonts -->
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&family=Open+Sans:wght@300;400&display=swap" rel="stylesheet">
```

### Tailwind Configuration

Key customizations in `tailwind.config.ts`:
```typescript
fontFamily: {
  sans: ['Montserrat', 'sans-serif'],
  heading: ['Montserrat', 'sans-serif'],
  body: ['Montserrat', 'sans-serif'],
}
```

---

## Component Architecture

### Main Sections (Homepage - `src/pages/Index.tsx`)

1. **Navigation** - Fixed top navigation bar
2. **HeroSection** - Hero with tagline, headline, CTA buttons
3. **ServicesSection** - Service cards with tags
4. **PhilosophySection** - About Us + Founders section
5. **PortfolioSection** - Portfolio project cards
6. **BlogSection** - Blog article cards
7. **ContactSection** - Contact form + info
8. **Footer** - Footer with links and copyright

### Key Components Detail

#### Navigation (`src/components/Navigation.tsx`)
- Fixed position, backdrop blur
- Logo: "nordai.studio" (lowercase, with dot)
- Menu items with scroll-to-section functionality
- Language switcher (EN/PL/SV)
- Theme toggle (light/dark)
- Mobile hamburger menu

#### ContactSection (`src/components/ContactSection.tsx`)
- **Left side**: Contact information (email only, no location)
- **Right side**: Contact form with fields:
  - Name (required)
  - Email (required)
  - Company (optional)
  - Message (required)
- Form submission is currently simulated (setTimeout)
- Success message after submission

#### PhilosophySection (`src/components/PhilosophySection.tsx`)
- Section ID: `#philosophy` (used for navigation)
- **Header**: "We Are nordai.studio" title + intro
- **Main content grid**:
  - Left: Two cards with "Our Mission" and "Our Approach"
  - Right: Values (Innovation, Quality, Partnership)
- **Founders section**:
  - Title: "Meet the Founders" / "Poznaj Założycieli" / "Möt Grundarna"
  - Two cards side by side:
    - **Daniela**: Graphic Designer, 3 years experience, placeholder with "D"
    - **Kamil**: AI Technology Lead, AI enthusiast, placeholder with "K"

#### FullAdmin (`src/pages/FullAdmin.tsx`)
- **Tab navigation**: Portfolio | Blog
- **Features**:
  - List all portfolio projects or blog articles
  - Edit existing items
  - Rich text editor with toolbar
  - Image uploader with URL input and sample gallery
  - Save functionality using GraphQL mutations
  - Preview mode
- **GraphQL**: Direct fetch() calls to `http://localhost:4001/graphql`
- **Important**: Uses `updatePortfolio` and `updateBlog` mutations

### Tag/Badge Styling Pattern

**ALL tags and badges across the site use consistent styling:**
```tsx
className="px-3 py-1 bg-primary text-primary-foreground rounded-full text-xs font-medium"
```

**This applies to:**
- Hero section tagline badge ("AI-Powered Digital Studio")
- Service cards tags
- Portfolio project tags
- Blog article category badges
- Case study page tags
- Blog post page category badge
- Portfolio filter buttons (active state)
- Blog filter buttons (active state)

**Inactive filter buttons use:**
```tsx
className="px-4 py-2 bg-primary text-primary-foreground opacity-60 hover:opacity-100 rounded-full"
```

---

## Internationalization (i18n)

### Supported Languages
- **English (en)** - Default
- **Polish (pl)**
- **Swedish (sv)**

### Translation Files Location
`src/i18n/locales/[lang].json`

### Translation Structure
```json
{
  "nav": { "home": "Home", ... },
  "hero": { "tagline": "...", "headline": "...", ... },
  "about": {
    "headline": "We Are nordai.studio",
    "founders_title": "Meet the Founders",
    "founders": {
      "daniela": { "name": "Daniela", "role": "...", "bio": "..." },
      "kamil": { "name": "Kamil", "role": "...", "bio": "..." }
    }
  },
  "contact": { "form": { ... }, "info": { ... } },
  "footer": { "copyright": "© 2025 nordai.studio. All rights reserved." }
}
```

### Usage in Components
```tsx
import { useTranslation } from 'react-i18next';

const Component = () => {
  const { t } = useTranslation();
  return <h1>{t('hero.headline')}</h1>;
};
```

---

## TinaCMS Integration

### Content Files
Content is stored as MDX files in:
- `content/portfolio/*.mdx` - Portfolio projects
- `content/blog/*.mdx` - Blog articles

### TinaCMS Configuration
`/.tina/config.ts` defines:
- Content schemas (Portfolio, Blog)
- Field types and validation
- GraphQL schema generation

### Running TinaCMS Dev Server
```bash
npm run dev
```
This starts both Vite and TinaCMS dev server:
- Frontend: http://localhost:8080
- TinaCMS Admin: http://localhost:8080/admin
- GraphQL API: http://localhost:4001/graphql

### Admin Access
- Route: `/admin` (redirects to `/full-admin`)
- Full admin panel at `/full-admin`
- Authenticated access via TinaCMS

---

## Development Guide

### Installation
```bash
npm install
```

### Running Locally
```bash
npm run dev
```
Access at: http://localhost:8080

### Building for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

---

## Git Workflow & Deployment

### Branch Structure
- `main` - Production branch (auto-deploys to Vercel)

### Commit Message Format
Use descriptive commit messages with context:
```
[Action] Brief description

Detailed explanation:
- Change 1
- Change 2
- Change 3

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
```

### Deployment to Vercel
1. Push to `main` branch: `git push`
2. Vercel automatically detects changes
3. Builds and deploys (1-2 minutes)
4. Live at production URL

### Important Commits Reference
- `aefb9e1` - Typography: Montserrat font system
- `0ec06f5` - Branding: nordai.studio updates
- `cd2d3f5` - Founders section + contact form
- `669dd23` - Localization for all languages (PL, SV)
- `1eb8661` - Dark mode colors + unified tag styling

---

## Important Code Conventions

### 1. File Naming
- Components: PascalCase (e.g., `HeroSection.tsx`)
- Utilities: camelCase
- CSS: kebab-case

### 2. Component Structure
```tsx
import { ... } from '...';

const ComponentName = () => {
  const { t } = useTranslation(); // Always use i18n

  return (
    <section id="section-id" className="...">
      {/* Component content */}
    </section>
  );
};

export default ComponentName;
```

### 3. Styling Patterns
- Use Tailwind utility classes
- Dark mode: use `dark:` prefix or CSS variables
- Consistent spacing: `px-8`, `py-24` for sections
- Rounded corners: `rounded-xl` for cards, `rounded-full` for badges
- Transitions: `transition-all duration-300`

### 4. Branding
- Company name: **Always** "nordai.studio" (lowercase, with .studio)
- Never: "nordAi.studio", "nordAi studio", "NordAI", etc.
- Copyright: "© 2025 nordai.studio. All rights reserved."

### 5. Dark Mode Consideration
- All new components MUST work well in dark mode
- Test with theme toggle before committing
- Text should be white/light in dark mode
- Buttons/badges use white background with dark text

---

## Critical Design System Rules

### DO:
✅ Use `bg-primary text-primary-foreground` for all buttons, badges, and tags
✅ Use Montserrat font for all text (body weight 300, headings weight 400)
✅ Use white text in dark mode (`--foreground: 0 0% 100%`)
✅ Use consistent spacing and rounded corners
✅ Test all changes in both light and dark mode
✅ Use translation keys from i18n files
✅ Keep branding consistent: "nordai.studio"

### DON'T:
❌ Don't use `bg-secondary` or `bg-muted` for tags/badges (inconsistent)
❌ Don't hardcode text - always use `t('key')`
❌ Don't use colors outside the design system
❌ Don't forget to update all language files (en.json, pl.json, sv.json)
❌ Don't use heavy font weights (keep it light and elegant)
❌ Don't create new color variables without updating the entire theme

---

## Content Management

### Adding New Portfolio Project
1. Go to `/admin` or `/full-admin`
2. Click "Portfolio" tab
3. Click on existing project or add new
4. Fill in fields:
   - Title
   - Client
   - Category
   - Tags (comma-separated)
   - Excerpt
   - Featured image URL
   - Full content (Markdown)
   - SEO settings
5. Click "Save"

### Adding New Blog Article
1. Go to `/admin` or `/full-admin`
2. Click "Blog" tab
3. Click on existing article or add new
4. Fill in fields:
   - Title
   - Author
   - Date
   - Category
   - Read time
   - Excerpt
   - Featured image URL
   - Full content (Markdown)
   - SEO settings
5. Click "Save"

---

## Troubleshooting

### Issue: TinaCMS content not loading
**Solution**: Make sure TinaCMS dev server is running (`npm run dev`)

### Issue: GraphQL mutations failing
**Solution**: Check that GraphQL API is accessible at `http://localhost:4001/graphql`

### Issue: Fonts not loading
**Solution**: Check that Adobe Fonts and Google Fonts links are in `index.html`

### Issue: Dark mode colors wrong
**Solution**: Verify CSS custom properties in `src/index.css` under `.dark` selector

### Issue: Translations missing
**Solution**: Check all three language files (en.json, pl.json, sv.json) have the same keys

---

## Key Files Reference

### Must-Know Files:
1. **`src/index.css`** - Design system (colors, fonts, global styles)
2. **`src/pages/Index.tsx`** - Homepage structure
3. **`src/components/Navigation.tsx`** - Top navigation
4. **`src/components/PhilosophySection.tsx`** - About + Founders section
5. **`src/components/ContactSection.tsx`** - Contact form
6. **`src/pages/FullAdmin.tsx`** - Admin panel
7. **`src/i18n/locales/*.json`** - All translations
8. **`tailwind.config.ts`** - Tailwind customization
9. **`.tina/config.ts`** - CMS schema

### Quick Edit Patterns:

**Change text:**
→ Edit `src/i18n/locales/en.json` (and pl.json, sv.json)

**Change colors:**
→ Edit `src/index.css` under `.dark` or `:root`

**Change button style:**
→ Look for `bg-primary text-primary-foreground` pattern

**Change fonts:**
→ Edit `tailwind.config.ts` fontFamily section

**Add new section:**
→ Create component in `src/components/`
→ Add to `src/pages/Index.tsx`
→ Add translations to all language files

---

## Testing Checklist

Before committing changes, verify:

- [ ] Light mode works correctly
- [ ] Dark mode works correctly
- [ ] All three languages work (EN, PL, SV)
- [ ] Responsive on mobile, tablet, desktop
- [ ] Navigation links work
- [ ] Contact form submits
- [ ] Admin panel loads
- [ ] Typography is consistent (Montserrat, correct weights)
- [ ] All tags/badges have white background in dark mode
- [ ] Branding is "nordai.studio" everywhere
- [ ] No console errors

---

## Project Context for AI

### What This Project Is:
A professional portfolio website for a Nordic digital studio that combines AI technology with design services. The site showcases their work, explains their services, introduces the founders, and provides a contact form. Content is managed through TinaCMS, and the site supports three languages.

### Design Philosophy:
- **Minimalist**: Clean, simple, Scandinavian-inspired design
- **Elegant typography**: Light weights, good spacing
- **Dark mode first**: Optimized for dark theme with white text
- **Consistent branding**: "nordai.studio" everywhere
- **Professional**: No emojis, no casual language, business-focused

### Target Audience:
Businesses looking for AI-powered web development and professional graphic design services.

### Key Features:
1. Multilingual (EN/PL/SV)
2. Dark/Light theme toggle
3. Portfolio project showcase
4. Blog for articles
5. About section with founders
6. Contact form
7. Full CMS admin panel

---

## Final Notes for AI Models

### When Making Changes:
1. **Always** check both light and dark mode
2. **Always** update all three language files if adding text
3. **Always** maintain consistent styling (follow existing patterns)
4. **Always** use the design system colors (don't create new ones)
5. **Always** test responsive design
6. **Never** change the branding from "nordai.studio"
7. **Never** use heavy font weights
8. **Never** hardcode English text (use i18n)

### Git Commit Guidelines:
- Commit working features, not broken code
- Write clear commit messages with context
- Include "Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>" in commits
- Push to main branch triggers automatic Vercel deployment

### If You Get Stuck:
1. Check this README
2. Look at similar existing components for patterns
3. Check the design system in `src/index.css`
4. Verify translation keys exist in all language files
5. Test in dev mode before committing

---

**Last Updated**: January 18, 2026
**Project Status**: Active Development
**Production URL**: Check Vercel dashboard for current deployment URL
**Repository**: https://github.com/kamilrybialek/nordai-portfolio
