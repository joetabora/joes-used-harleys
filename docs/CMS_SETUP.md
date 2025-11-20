# Sanity CMS Integration Guide

## Overview

This project now includes a full Sanity.io CMS integration for managing motorcycles, model pages, homepage content, and global settings. The CMS is fully integrated with Next.js and includes automatic fallback to `inventory.json` if Sanity is not configured.

---

## 🚀 Quick Start

### 1. Create a Sanity Project

1. Go to [sanity.io](https://www.sanity.io) and create an account
2. Create a new project
3. Note your **Project ID** and **Dataset** name (default: `production`)

### 2. Install Sanity CLI (if not already installed)

```bash
npm install -g @sanity/cli
```

### 3. Initialize Sanity in Your Project

```bash
cd /Users/josephtabora/git/joes-used-harleys
npx sanity init --env
```

Follow the prompts:
- Use existing project: **Yes**
- Select your project
- Dataset: `production`
- Output path: `./sanity` (already exists)
- Use TypeScript: **Yes**
- Use ESLint: **Yes**

### 4. Set Up Environment Variables

Create a `.env.local` file in the project root:

```env
# Sanity CMS Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id-here
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-05-01
SANITY_API_READ_TOKEN=your-read-token-here
SANITY_API_WRITE_TOKEN=your-write-token-here
SANITY_REVALIDATE_SECRET=your-secret-here

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://joes-used-harleys.vercel.app
```

### 5. Get API Tokens

1. Go to [sanity.io/manage](https://www.sanity.io/manage)
2. Select your project
3. Go to **API** → **Tokens**
4. Create a new token:
   - **Read token** (for fetching content)
   - **Write token** (for mutations, optional)

### 6. Deploy Sanity Studio

The Sanity Studio is embedded in your Next.js app at `/studio`. You can also deploy it separately:

```bash
npx sanity deploy
```

---

## 📁 Project Structure

```
joes-used-harleys/
├── sanity/
│   ├── schemas/
│   │   ├── motorcycle.ts      # Motorcycle listings schema
│   │   ├── modelPage.ts       # Model landing pages schema
│   │   ├── homepage.ts        # Homepage settings schema
│   │   ├── globalSettings.ts  # Global site settings schema
│   │   └── index.ts           # Schema exports
│   ├── lib/
│   │   ├── client.ts          # Sanity client configuration
│   │   ├── queries.ts         # GROQ queries
│   │   └── types.ts           # TypeScript types
│   └── config.ts              # Sanity Studio configuration
├── app/
│   ├── studio/                # Sanity Studio route
│   ├── api/
│   │   ├── motorcycles/       # Motorcycles API endpoint
│   │   └── revalidate/        # ISR revalidation endpoint
│   └── bikes/[slug]/          # Dynamic bike pages (CMS-driven)
├── components/
│   ├── CMSInventoryGrid.tsx   # CMS-powered inventory grid
│   ├── PortableText.tsx       # Renders Sanity block content
│   └── SanityImage.tsx        # Optimized Sanity images
└── .env.local                  # Environment variables
```

---

## 🏗️ Content Schemas

### 1. Motorcycle Schema

**Purpose:** Individual motorcycle listings

**Fields:**
- `title` - Full bike name (e.g., "2023 Street Glide Special")
- `slug` - URL-friendly identifier
- `model` - Harley-Davidson model name
- `year` - Manufacturing year
- `mileage` - Mileage in miles
- `price` - Price in USD
- `priceFormatted` - Display price (e.g., "$21,999")
- `condition` - Condition rating
- `description` - Rich text description
- `features` - Array of features/modifications
- `images` - Array of images
- `specs` - Technical specifications
- `financing` - Financing information
- `featured` - Featured flag
- `justArrived` - New arrival flag
- `seoTitle`, `seoDescription`, `seoKeywords` - SEO fields

### 2. Model Page Schema

**Purpose:** SEO landing pages for specific Harley models

**Fields:**
- `name` - Model name (e.g., "Street Glide")
- `slug` - URL-friendly identifier
- `heroImage` - Hero image
- `body` - Rich text content (300-500 words)
- `specs` - Model specifications
- `startingPrice` - Starting price
- `financingInfo` - Financing details
- SEO fields

### 3. Homepage Settings Schema

**Purpose:** Control homepage content

**Fields:**
- `heroTitle` - Main hero headline
- `heroSubtitle` - Hero subheadline
- `heroImage` - Hero image
- `heroVideo` - Optional video URL
- `featuredBikes` - References to featured motorcycles
- `introContent` - SEO intro section
- `trustContent` - Trust section content
- SEO fields

### 4. Global Settings Schema

**Purpose:** Site-wide settings

**Fields:**
- `siteTitle` - Default site title
- `siteDescription` - Default site description
- `logo` - Site logo
- `footerText` - Footer text
- `phone` - Contact phone
- `email` - Contact email
- `address` - Business address
- `socialLinks` - Social media links

---

## 🎨 Using the CMS

### Accessing Sanity Studio

1. **Local Development:**
   ```
   npm run dev
   ```
   Navigate to `http://localhost:3000/studio`

2. **Production:**
   Navigate to `https://your-domain.com/studio`

### Creating Content

1. **Add a Motorcycle:**
   - Go to **Motorcycles** in the Studio
   - Click **Create**
   - Fill in all required fields
   - Upload images
   - Click **Publish**

2. **Create a Model Page:**
   - Go to **Model Pages**
   - Click **Create**
   - Enter model name and slug
   - Add content and SEO fields
   - Click **Publish**

3. **Update Homepage:**
   - Go to **Homepage Settings**
   - Edit content
   - Select featured bikes
   - Click **Publish**

4. **Update Global Settings:**
   - Go to **Global Settings**
   - Update site information
   - Click **Publish**

---

## 🔄 Revalidation & ISR

The site uses Next.js ISR (Incremental Static Regeneration) with automatic revalidation.

### Manual Revalidation

When content is updated in Sanity, you can trigger revalidation:

```bash
curl -X POST "https://your-domain.com/api/revalidate?secret=YOUR_SECRET&path=/bikes/slug-name"
```

### Automatic Revalidation

Set up a webhook in Sanity to automatically revalidate:

1. Go to [sanity.io/manage](https://www.sanity.io/manage)
2. Select your project
3. Go to **API** → **Webhooks**
4. Create a new webhook:
   - **URL:** `https://your-domain.com/api/revalidate?secret=YOUR_SECRET`
   - **Dataset:** `production`
   - **Trigger on:** Document created/updated/deleted

---

## 🚀 Deployment

### Vercel Deployment

1. **Add Environment Variables:**
   - Go to your Vercel project settings
   - Add all environment variables from `.env.local`

2. **Deploy:**
   ```bash
   git push origin main
   ```
   Vercel will automatically deploy

### Sanity Studio Deployment

Deploy Sanity Studio separately (optional):

```bash
npx sanity deploy
```

This creates a standalone Studio at `your-project.sanity.studio`

---

## 🔧 Troubleshooting

### CMS Not Loading

1. **Check Environment Variables:**
   ```bash
   echo $NEXT_PUBLIC_SANITY_PROJECT_ID
   ```

2. **Verify Project ID:**
   - Ensure `NEXT_PUBLIC_SANITY_PROJECT_ID` matches your Sanity project

3. **Check API Tokens:**
   - Verify tokens are correct and have proper permissions

### Images Not Displaying

1. **Check Image URLs:**
   - Ensure images are uploaded to Sanity
   - Verify `cdn.sanity.io` is in `next.config.js` remote patterns

2. **Check Image Component:**
   - Verify `SanityImage` component is used correctly
   - Check image dimensions

### Build Errors

1. **Type Errors:**
   ```bash
   npm run build
   ```
   Check for TypeScript errors

2. **Missing Dependencies:**
   ```bash
   npm install
   ```

### Fallback to inventory.json

If Sanity is not configured, the site automatically falls back to `inventory.json`. This ensures the site works even without CMS setup.

---

## 📚 Additional Resources

- [Sanity Documentation](https://www.sanity.io/docs)
- [Next.js + Sanity Guide](https://www.sanity.io/guides/nextjs-app-router)
- [GROQ Query Language](https://www.sanity.io/docs/groq)
- [Portable Text](https://www.sanity.io/docs/block-content)

---

## 🎯 Next Steps

1. **Set up Sanity project** (if not done)
2. **Add environment variables**
3. **Create your first motorcycle listing**
4. **Set up homepage content**
5. **Configure global settings**
6. **Set up webhook for automatic revalidation**

---

## 💡 Tips

- **Use Featured Bikes:** Mark popular bikes as "featured" to show on homepage
- **SEO Fields:** Always fill in SEO fields for better search rankings
- **Image Optimization:** Upload high-quality images (Sanity handles optimization)
- **Rich Text:** Use block content for descriptions to maintain formatting
- **Slugs:** Keep slugs short and descriptive (e.g., `2023-street-glide-special`)

---

## 🆘 Support

If you encounter issues:
1. Check the troubleshooting section above
2. Review Sanity documentation
3. Check Next.js build logs
4. Verify environment variables are set correctly

