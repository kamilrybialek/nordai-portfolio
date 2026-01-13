# Content Editing Guide - nordAi Portfolio

This guide will show you how to easily edit portfolio projects and blog articles on your website.

## 📁 Where to Find Content Files

All editable content is located in the `src/data/` folder:

```
src/data/
├── portfolio.ts  → Portfolio projects
└── blog.ts       → Blog articles
```

---

## 📂 How to Edit Portfolio Projects

### File Location
`src/data/portfolio.ts`

### Structure
Each project has the following fields:

```typescript
{
  id: 'unique-project-id',        // Must be unique, lowercase with dashes
  title: 'Project Title',         // Main project title
  client: 'Client Name',          // Client or company name
  category: 'ai',                 // Options: 'ai', 'web', 'branding', 'design'
  tags: ['Tag1', 'Tag2'],         // Up to 3 tags recommended
  excerpt: 'Short description',   // 1-2 sentences
  description: 'Full details',    // Optional: Full project description
  image: '/path/to/image.jpg',    // Optional: Project image path
  link: 'https://example.com'     // Optional: Project URL
}
```

### How to Add a New Project

1. Open `src/data/portfolio.ts` in your code editor (VS Code recommended)
2. Scroll to the bottom of the `portfolioProjects` array
3. Copy this template:

```typescript
{
  id: 'my-new-project',
  title: 'My Amazing Project',
  client: 'Tech Company Inc',
  category: 'web',
  tags: ['Development', 'React'],
  excerpt: 'A revolutionary web application that changed the industry.',
  description: 'Detailed project story here...',
  image: '/placeholder.svg',
  link: 'https://myproject.com'
},
```

4. Add a comma after the last project
5. Paste your new project
6. Save the file
7. Refresh your browser - the new project will appear automatically!

### How to Edit an Existing Project

1. Open `src/data/portfolio.ts`
2. Find the project by its `id` or `title`
3. Edit any field you want
4. Save the file
5. Refresh your browser

### How to Delete a Project

1. Open `src/data/portfolio.ts`
2. Find the project and delete the entire object (including the comma)
3. Save the file
4. Refresh your browser

---

## ✍️ How to Edit Blog Articles

### File Location
`src/data/blog.ts`

### Structure
Each article has the following fields:

```typescript
{
  id: 'unique-article-id',        // Must be unique, lowercase with dashes
  title: 'Article Title',         // Main article title
  excerpt: 'Brief description',   // 1-2 sentences
  category: 'ai',                 // Options: 'ai', 'automation', 'design', 'insights', 'trends'
  date: '2025-01-15',            // Format: YYYY-MM-DD
  readTime: 5,                   // Reading time in minutes
  author: 'Author Name',         // Optional: Author name
  image: '/path/to/image.jpg',   // Optional: Article image
  content: 'Full article text'   // Optional: Full article content
}
```

### How to Add a New Article

1. Open `src/data/blog.ts` in your code editor
2. Scroll to the bottom of the `blogArticles` array
3. Copy this template:

```typescript
{
  id: 'my-new-article',
  title: 'My New Blog Post',
  excerpt: 'This article covers amazing insights about AI and design.',
  category: 'insights',
  date: '2025-01-15',
  readTime: 7,
  author: 'nordAi Team',
  image: '/placeholder.svg',
  content: 'Full article content goes here...'
},
```

4. Add a comma after the last article
5. Paste your new article
6. **Important**: Update the `date` to today's date
7. Save the file
8. Refresh your browser - the new article will appear!

### How to Edit an Existing Article

1. Open `src/data/blog.ts`
2. Find the article by its `id` or `title`
3. Edit any field you want
4. Save the file
5. Refresh your browser

### How to Delete an Article

1. Open `src/data/blog.ts`
2. Find the article and delete the entire object (including the comma)
3. Save the file
4. Refresh your browser

---

## 📸 How to Add Images

### Adding Images to Projects or Articles

1. Place your image in the `public/` folder:
   - Example: `public/images/my-project.jpg`

2. Reference it in your data file:
   ```typescript
   image: '/images/my-project.jpg'
   ```

3. Recommended image sizes:
   - **Portfolio projects**: 1200x800px (16:9 ratio)
   - **Blog articles**: 1200x750px (16:10 ratio)
   - Format: JPG or PNG
   - Keep file size under 500KB for fast loading

---

## 🌍 Multi-Language Support

The titles and excerpts you write will appear in all languages. If you want different content per language:

1. Edit translation files in `src/i18n/locales/`:
   - `en.json` - English
   - `sv.json` - Swedish
   - `pl.json` - Polish

2. Add your translations there following the existing format

---

## 🔄 Tips for Content Management

### Best Practices

1. **Always save your file** before refreshing the browser
2. **Use unique IDs** - never duplicate an `id` field
3. **Keep excerpts short** - 1-2 sentences (around 150 characters)
4. **Use descriptive titles** - Clear and engaging
5. **Date format** - Always use YYYY-MM-DD (e.g., 2025-01-15)
6. **Check for commas** - Each entry needs a comma after it (except the last one)

### Common Mistakes to Avoid

❌ Missing comma between entries
❌ Duplicate IDs
❌ Wrong date format (use YYYY-MM-DD, not DD/MM/YYYY)
❌ Missing closing bracket `}`
❌ Forgetting to save the file

### Checking for Errors

If something doesn't work after editing:

1. Check the browser console (F12 → Console tab)
2. Look for red error messages
3. Common issues:
   - Missing comma
   - Extra comma at the end
   - Unclosed quotes or brackets
   - Typo in field names

---

## 🛠️ Recommended Tools

- **VS Code** - Best code editor (https://code.visualstudio.com/)
- **Image Optimization** - TinyPNG (https://tinypng.com/)
- **Date Helper** - Use `new Date().toISOString().split('T')[0]` in browser console for today's date

---

## 📝 Quick Reference

### Portfolio Categories
- `ai` - AI & Automation projects
- `web` - Web Development projects
- `branding` - Branding & Identity projects
- `design` - UX/UI Design projects

### Blog Categories
- `ai` - AI-related articles
- `automation` - Automation guides
- `design` - Design articles
- `insights` - Business insights
- `trends` - Industry trends

---

## 🆘 Need Help?

1. Double-check the syntax in the data files
2. Make sure all quotes are matching `"` or `'`
3. Verify all brackets are closed `{ }` and `[ ]`
4. Look at existing entries as examples
5. Save and refresh - most changes appear immediately!

---

**Remember**: Changes to `src/data/portfolio.ts` and `src/data/blog.ts` will update your website automatically when you save and refresh! 🎉
