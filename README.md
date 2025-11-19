# Joe's Used Harleys - Next.js SEO-Optimized Website

A fully SEO-optimized Next.js website for selling used Harley-Davidson motorcycles in Milwaukee, Wisconsin.

## Features

- ✅ **Complete SEO System**
  - Next.js Metadata API integration
  - OpenGraph and Twitter Card metadata
  - Canonical URLs
  - Auto-generated robots.txt and sitemap.xml
  - JSON-LD structured data (LocalBusiness, Product, WebSite, SearchAction)

- ✅ **SEO-Optimized Content**
  - Keyword-rich copy targeting Milwaukee Harley keywords
  - Model-specific landing pages
  - FAQ section with schema markup
  - Local SEO optimization

- ✅ **Performance**
  - Static export for fast loading
  - Image optimization
  - Font optimization (Google Fonts)
  - Mobile-first responsive design

## Setup

1. Install dependencies:
```bash
npm install
```

2. Copy logo images to `public/`:
   - `juh2.png` → `public/juh2.png`
   - `juh.png` → `public/juh.png` (optional)

3. Add favicon files to `public/`:
   - `favicon.ico`
   - `apple-touch-icon.png` (180x180px)

4. Update Formspree form ID in `app/page.tsx` (line with `YOUR_FORM_ID`)

5. Run development server:
```bash
npm run dev
```

6. Build for production:
```bash
npm run build
```

## SEO Configuration

All SEO configuration is centralized in `lib/seo.ts`:

- **Keywords**: Primary and model-specific keywords
- **Metadata generators**: Title, description, OpenGraph, Twitter Cards
- **Schema generators**: LocalBusiness, Product, WebSite schemas
- **Site config**: Business information, location, contact details

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with global metadata
│   ├── page.tsx            # Homepage
│   ├── robots.ts           # Auto-generated robots.txt
│   ├── sitemap.ts          # Auto-generated sitemap.xml
│   ├── manifest.ts         # PWA manifest
│   └── globals.css         # Global styles
├── components/
│   ├── SEO.tsx             # Reusable SEO component
│   └── InventoryGrid.tsx   # Client component for inventory
├── lib/
│   └── seo.ts              # SEO utilities and config
└── public/
    ├── inventory.json      # Bike inventory data
    ├── juh2.png           # Logo
    └── [favicon files]
```

## Target Keywords

- used harley milwaukee
- used harleys milwaukee
- harley for sale milwaukee
- harley davidson for sale milwaukee
- used motorcycles milwaukee
- milwaukee harleys for sale
- harley street glide for sale milwaukee
- harley road glide for sale milwaukee
- harley softail for sale milwaukee
- harley sportster for sale milwaukee

## Deployment

This project is configured for Vercel deployment with static export. Simply push to your repository and connect to Vercel.

## License

MIT
