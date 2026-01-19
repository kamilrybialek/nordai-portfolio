import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

// Tina Cloud configuration

export default defineConfig({
  branch,

  // Get this from tina.io
  clientId: process.env.TINA_CLIENT_ID,
  // Get this from tina.io
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "images",
      publicFolder: "public",
    },
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
  schema: {
    collections: [
      {
        name: "portfolio",
        label: "Portfolio Projects",
        path: "content/portfolio",
        format: "mdx",
        ui: {
          router: ({ document }) => {
            return `/portfolio/${document._sys.filename}`;
          },
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Project Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "client",
            label: "Client Name",
            required: true,
          },
          {
            type: "string",
            name: "category",
            label: "Category",
            required: true,
            options: [
              { value: "ai", label: "AI & Automation" },
              { value: "web", label: "Web Development" },
              { value: "branding", label: "Branding" },
              { value: "design", label: "UX/UI Design" },
            ],
          },
          {
            type: "string",
            name: "tags",
            label: "Tags",
            required: true,
            list: true,
            ui: {
              component: "tags",
            },
          },
          {
            type: "string",
            name: "excerpt",
            label: "Short Description",
            required: true,
            ui: {
              component: "textarea",
            },
          },
          {
            type: "boolean",
            name: "featured",
            label: "Show on Homepage",
            description: "Display this project on the homepage (max 6 featured projects will be shown)",
            default: false,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Full Description",
            isBody: true,
          },
          {
            type: "image",
            name: "image",
            label: "Project Image",
          },
          {
            type: "string",
            name: "link",
            label: "Project URL",
          },
          {
            type: "string",
            name: "seoTitle",
            label: "SEO Title",
            description: "Title for search engines (recommended: 50-60 characters)",
          },
          {
            type: "string",
            name: "seoDescription",
            label: "SEO Description",
            description: "Description for search engines (recommended: 150-160 characters)",
            ui: {
              component: "textarea",
            },
          },
        ],
      },
      {
        name: "blog",
        label: "Blog Articles",
        path: "content/blog",
        format: "mdx",
        ui: {
          router: ({ document }) => {
            return `/blog/${document._sys.filename}`;
          },
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Article Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "excerpt",
            label: "Short Description",
            required: true,
            ui: {
              component: "textarea",
            },
          },
          {
            type: "string",
            name: "category",
            label: "Category",
            required: true,
            options: [
              { value: "ai", label: "AI" },
              { value: "automation", label: "Automation" },
              { value: "design", label: "Design" },
              { value: "insights", label: "Insights" },
              { value: "trends", label: "Trends" },
            ],
          },
          {
            type: "datetime",
            name: "date",
            label: "Publication Date",
            required: true,
            ui: {
              dateFormat: "YYYY-MM-DD",
            },
          },
          {
            type: "number",
            name: "readTime",
            label: "Reading Time (minutes)",
            required: true,
          },
          {
            type: "string",
            name: "author",
            label: "Author",
            default: "nordAi Team",
          },
          {
            type: "boolean",
            name: "featured",
            label: "Show on Homepage",
            description: "Display this article on the homepage (max 6 featured articles will be shown)",
            default: false,
          },
          {
            type: "image",
            name: "image",
            label: "Article Image",
          },
          {
            type: "rich-text",
            name: "body",
            label: "Article Content",
            isBody: true,
          },
          {
            type: "string",
            name: "seoTitle",
            label: "SEO Title",
            description: "Title for search engines (recommended: 50-60 characters)",
          },
          {
            type: "string",
            name: "seoDescription",
            label: "SEO Description",
            description: "Description for search engines (recommended: 150-160 characters)",
            ui: {
              component: "textarea",
            },
          },
        ],
      },
    ],
  },
});
