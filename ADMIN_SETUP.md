# Custom CMS Admin Panel Setup

This project includes a custom-built CMS admin panel for managing blog articles and portfolio projects. The panel uses GitHub OAuth for secure authentication.

## Features

✅ **Secure GitHub OAuth authentication**
✅ **User authorization list** - only approved GitHub users can access
✅ **Full CRUD operations** - Create, Read, Update, Delete content
✅ **MDX file management** - Direct integration with your content files
✅ **Image uploads** - Easy image management
✅ **SEO settings** - Built-in SEO controls for each post
✅ **Clean, modern interface** - Built with your existing UI components

## Setup Instructions

### 1. Create GitHub OAuth App

1. Go to https://github.com/settings/developers
2. Click **"New OAuth App"**
3. Fill in the details:
   - **Application name**: nordAi Portfolio CMS
   - **Homepage URL**: `https://nordai.studio`
   - **Authorization callback URL**: `https://nordai.studio/admin`
4. Click **"Register application"**
5. Copy the **Client ID**
6. Click **"Generate a new client secret"** and copy the **Client Secret**

### 2. Configure Environment Variables

#### For Local Development:

Create a `.env.local` file in the project root:

```bash
VITE_GITHUB_CLIENT_ID=your_github_client_id_here
```

#### For Netlify Production:

1. Go to your Netlify dashboard
2. Navigate to **Site configuration** → **Environment variables**
3. Add the following variables:
   - `VITE_GITHUB_CLIENT_ID` = your GitHub Client ID
   - `GITHUB_CLIENT_ID` = your GitHub Client ID
   - `GITHUB_CLIENT_SECRET` = your GitHub Client Secret

### 3. Add Authorized Users

Edit `/src/pages/Admin.tsx` and update the `AUTHORIZED_USERS` array:

```typescript
const AUTHORIZED_USERS = ['kamilrybialek', 'another-github-username'];
```

Only users in this list will be able to access the admin panel after authenticating with GitHub.

### 4. Deploy

After setting up environment variables in Netlify:

```bash
git add .
git commit -m "Add custom CMS admin panel"
git push
```

Netlify will automatically deploy the changes.

## Usage

### Accessing the Admin Panel

1. Navigate to `https://nordai.studio/admin`
2. Click **"Login with GitHub"**
3. Authorize the application
4. You'll be redirected back to the admin panel

### Managing Content

#### Blog Articles

- View all blog articles
- Create new articles with markdown editor
- Edit existing articles
- Delete articles
- Set featured status for homepage
- Configure SEO settings

#### Portfolio Projects

- View all portfolio projects
- Create new projects
- Edit existing projects
- Delete projects
- Manage tags
- Add project links

### Content Structure

All content is stored as MDX files in:
- Blog: `/content/blog/`
- Portfolio: `/content/portfolio/`

Changes are committed directly to your GitHub repository via the GitHub API.

## Security

- **OAuth Authentication**: Secure GitHub OAuth flow
- **User Authorization**: Only approved GitHub users can access
- **Token Storage**: Access tokens stored in localStorage (client-side only)
- **API Permissions**: Uses your GitHub personal access token (from OAuth)
- **No Database**: All content in Git (version controlled, auditable)

## Troubleshooting

### "Unauthorized user" error

Make sure your GitHub username is in the `AUTHORIZED_USERS` array in `/src/pages/Admin.tsx`.

### OAuth callback errors

1. Check that the callback URL in your GitHub OAuth App settings matches exactly: `https://nordai.studio/admin`
2. Verify environment variables are set correctly in Netlify
3. Check browser console for detailed error messages

### Can't save changes

1. Make sure you're authenticated (logged in)
2. Check that the Netlify Function is deployed (check `/netlify/functions/github-oauth.ts`)
3. Verify your GitHub OAuth token has `repo` scope

## Local Development

To run the admin panel locally:

```bash
# Install dependencies
npm install

# Create .env.local with VITE_GITHUB_CLIENT_ID
# (You'll need to create a separate OAuth app for localhost)

# Run dev server
npm run dev

# Access admin at http://localhost:5173/admin
```

**Note**: For local development, create a separate GitHub OAuth App with callback URL: `http://localhost:5173/admin`

## Support

For issues or questions, contact the development team or check the GitHub repository issues.
