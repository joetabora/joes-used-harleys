# SEO System Documentation - Joe's Used Harleys

## Overview

This documentation explains the complete SEO system implemented for Joe's Used Harleys website. The system is designed to maximize search engine visibility for Milwaukee-focused Harley-Davidson keywords while maintaining clean, maintainable code.

## Architecture

### Core SEO Files

1. **`lib/seo.ts`** - Central SEO configuration and utilities
   - `SEO_CONFIG` - Base SEO settings (titles, descriptions, keywords, OpenGraph, Twitter)
   - `SITE_CONFIG` - Site-wide configuration (URL, address, geo coordinates)
   - `setPageSEO()` - Main utility for per-page SEO overrides
   - Schema generators (LocalBusiness, Product, FAQ, etc.)

2. **`lib/harleyKeywords.ts`** - Keyword generation system
   - `generateHarleyKeywords(modelName)` - Generates 50-150 keyword variations for any Harley model

3. **`lib/product-seo.ts`** - Product-specific SEO utilities
   - Bike data extraction and metadata generation
   - Product schema generation

4. **`lib/model-data.ts`** - Model database
   - 18+ Harley model definitions with SEO content, specs, and images

5. **`components/SEO.tsx`** - JSON-LD schema component
   - Renders structured data (LocalBusiness, Product, FAQ, etc.)

6. **`components/SEOBlock.tsx`** - Reusable SEO content blocks
   - Structured H2 + content + optional image + CTA

## How Metadata Works

### Metadata Merging System

The SEO system uses a **hierarchical merging approach**:

1. **Base Configuration** (`SEO_CONFIG` in `lib/seo.ts`)
   - Default title, description, keywords
   - Base OpenGraph and Twitter card settings
   - Global robots configuration

2. **Page-Level Overrides** (via `setPageSEO()`)
   - Each page can override: `pageTitle`, `pageDescription`, `pageKeywords`
   - Automatic keyword generation when `modelName` is provided
   - Location-based keyword injection when `location` is provided

3. **Automatic Enhancements**
   - Model pages automatically get 50-150 keyword variations
   - Canonical URLs generated from `path` option
   - OpenGraph images from `image` option
   - Geo metadata for local SEO

### Example: Homepage Metadata

```typescript
// app/page.tsx
export const metadata: Metadata = setPageSEO({
  pageTitle: 'Used Harley Milwaukee | Used Harley for Sale Milwaukee',
  pageDescription: 'Buy used Harley-Davidson motorcycles in Milwaukee...',
  pageKeywords: ['used harley milwaukee', 'harley for sale milwaukee'],
  location: 'Milwaukee',
  path: '/'
});
```

**Result:**
- Title: `"Used Harley Milwaukee | Used Harley for Sale Milwaukee | Joe's Used Harleys"`
- Description: Custom description provided
- Keywords: Base keywords + page keywords + location keywords (deduplicated)
- Canonical: `https://joes-used-harleys.vercel.app/`
- OpenGraph: Custom title/description + default image
- Geo: Milwaukee coordinates

### Example: Model Page Metadata

```typescript
// app/models/[model]/page.tsx
export async function generateMetadata({ params }) {
  const modelData = getModelData(model);
  return setPageSEO({
    pageTitle: `Used ${modelData.name} Motorcycles for Sale in Milwaukee`,
    pageDescription: `Buy a used ${modelData.name} in Milwaukee...`,
    modelName: modelData.name, // Triggers automatic keyword generation
    location: 'Milwaukee',
    path: `/models/${model}`,
    image: modelData.image
  });
}
```

**Result:**
- Title: `"Used Street Glide Motorcycles for Sale in Milwaukee | Joe's Used Harleys"`
- Description: Custom description with model name
- Keywords: Base + 50-150 model-specific keywords + location keywords
- Canonical: `https://joes-used-harleys.vercel.app/models/street-glide`
- OpenGraph: Model-specific image
- Geo: Milwaukee coordinates

## Page Types and SEO Strategy

### 1. Homepage (`app/page.tsx`)
- **Target Keywords:** "used harley milwaukee", "harley for sale milwaukee"
- **Priority:** 1.0 (highest)
- **Update Frequency:** Daily
- **Content:** SEO-optimized intro, popular models grid, trust section, FAQ

### 2. Inventory Page (`app/inventory/page.tsx`)
- **Target Keywords:** "used harleys for sale near me", "cheap harleys milwaukee"
- **Priority:** 0.9
- **Update Frequency:** Daily
- **Content:** Dynamic inventory grid with Product schema for each bike

### 3. Model Pages (`app/models/[model]/page.tsx`)
- **Target Keywords:** Auto-generated 50-150 variations per model
- **Priority:** 0.8
- **Update Frequency:** Weekly
- **Content:** 300-500 word SEO content, specs table, financing info
- **Dynamic:** 18+ models (Street Glide, Road Glide, Softail, etc.)

### 4. Bike Detail Pages (`app/bikes/[id]/page.tsx`)
- **Target Keywords:** Model-specific + mileage + price
- **Priority:** 0.8
- **Update Frequency:** Weekly
- **Content:** Full bike details, Product schema, internal links

### 5. Local Landing Pages
- `/used-harleys-milwaukee` - "used harleys milwaukee" keywords
- `/harley-for-sale-milwaukee` - "harley for sale milwaukee" keywords
- `/milwaukee-harley-dealership` - "milwaukee harley dealership" keywords

## Sitemap Generation

**File:** `app/sitemap.ts`

The sitemap is **dynamically generated** and includes:

1. **Static Pages:**
   - Homepage (priority 1.0, daily)
   - Inventory (priority 0.9, daily)
   - Contact (priority 0.7, monthly)
   - Local landing pages (priority 0.9, weekly)

2. **Dynamic Pages:**
   - All model pages from `getAllModelSlugs()` (priority 0.8, weekly)
   - All bike pages from `inventory.json` (priority 0.8, weekly)

3. **Content Pages:**
   - Buyer guides, comparison pages (priority 0.7, monthly)

**To Add a New Page to Sitemap:**
1. Add the page route to `app/sitemap.ts`
2. Set appropriate `priority` (0.0-1.0)
3. Set `changeFrequency` ('always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never')

## Robots.txt

**File:** `app/robots.ts`

Current configuration:
```
User-agent: *
Allow: /
Sitemap: https://joes-used-harleys.vercel.app/sitemap.xml
```

**To Modify:**
- Edit `app/robots.ts`
- The sitemap URL is automatically generated from `SITE_CONFIG.url`

## Structured Data (JSON-LD)

### Types Used

1. **LocalBusiness** (`components/SEO.tsx`)
   - Business name, address, phone, hours
   - Geo coordinates for local SEO
   - Price range

2. **Product** (bike detail pages)
   - Name, description, price, condition
   - Model, mileage, availability
   - Dealer information

3. **FAQPage** (homepage)
   - 6+ FAQ questions with answers
   - Optimized for Google featured snippets

4. **WebSite + SearchAction**
   - Site search functionality
   - Site name and URL

5. **Organization**
   - Business entity information

### Adding New Schema

```typescript
// In your page component
import { SEO } from '@/components/SEO';

<SEO 
  type="website" 
  includeLocalBusiness 
  includeWebSite 
/>
```

## Maintaining SEO

### Adding a New Page

1. **Create the page file** (e.g., `app/new-page/page.tsx`)

2. **Add metadata:**
```typescript
import { setPageSEO } from '@/lib/seo';
import type { Metadata } from 'next';

export const metadata: Metadata = setPageSEO({
  pageTitle: 'Unique Page Title',
  pageDescription: 'Unique 150-160 character description',
  pageKeywords: ['keyword1', 'keyword2'],
  location: 'Milwaukee', // Optional
  path: '/new-page'
});
```

3. **Add to sitemap** (`app/sitemap.ts`):
```typescript
{
  url: `${baseUrl}/new-page`,
  lastModified: currentDate,
  changeFrequency: 'weekly',
  priority: 0.8,
}
```

4. **Add internal links** to other pages for link equity

### Adding a New Model

1. **Add to model database** (`lib/model-data.ts`):
```typescript
export const modelDatabase = {
  'new-model': {
    name: 'New Model',
    slug: 'new-model',
    seoContent: '300-500 word SEO content...',
    specs: { /* ... */ },
    startingPrice: '$XX,XXX',
    financingInfo: '...',
    image: 'https://...'
  }
};
```

2. **Model page automatically created** at `/models/new-model`
3. **Sitemap automatically includes** the new model page
4. **Keywords automatically generated** via `generateHarleyKeywords()`

### Updating Keywords

**Base Keywords** (`lib/seo.ts`):
```typescript
export const SEO_CONFIG: SEOConfig = {
  keywords: [
    "used harley milwaukee",
    "harley for sale milwaukee",
    // Add new keywords here
  ]
};
```

**Model Keywords** (`lib/harleyKeywords.ts`):
- Automatically generates 50-150 variations per model
- No manual updates needed

### Updating Site Information

**Site Config** (`lib/seo.ts`):
```typescript
export const SITE_CONFIG = {
  name: "Joe's Used Harleys",
  url: "https://joes-used-harleys.vercel.app", // Update if domain changes
  phone: "414-439-6211",
  address: { /* ... */ },
  geo: { latitude: 43.0389, longitude: -87.9065 }
};
```

## Best Practices

### ✅ DO

1. **Always use `setPageSEO()`** for page metadata
2. **Provide unique titles** for every page (no duplicates)
3. **Keep descriptions 150-160 characters** for optimal display
4. **Include location** (`location: 'Milwaukee'`) for local SEO
5. **Use `modelName`** for model pages to trigger keyword generation
6. **Add pages to sitemap** when creating new routes
7. **Use `SEOBlock` component** for structured SEO content sections
8. **Include internal links** between related pages

### ❌ DON'T

1. **Don't duplicate titles or descriptions** across pages
2. **Don't skip metadata** - every page needs it
3. **Don't forget canonical URLs** - handled automatically by `setPageSEO()`
4. **Don't hardcode URLs** - use `SITE_CONFIG.url`
5. **Don't create orphan pages** - always link internally
6. **Don't use generic descriptions** - be specific and keyword-rich

## Verification Checklist

Before deploying, verify:

- [ ] All pages have unique titles (no duplicates)
- [ ] All pages have unique descriptions (no duplicates)
- [ ] Sitemap includes all pages
- [ ] Robots.txt points to correct sitemap URL
- [ ] All model pages generate correctly
- [ ] All bike pages have Product schema
- [ ] Homepage has FAQ schema
- [ ] LocalBusiness schema includes correct address
- [ ] Canonical URLs are correct
- [ ] OpenGraph images are set for important pages
- [ ] Internal links exist between related pages

## Testing SEO

### Local Testing

1. **Build the site:**
```bash
npm run build
```

2. **Check metadata:**
   - View page source
   - Verify `<title>`, `<meta name="description">`
   - Check JSON-LD schemas in `<script type="application/ld+json">`

3. **Test sitemap:**
   - Visit `http://localhost:3000/sitemap.xml`
   - Verify all pages are listed

4. **Test robots.txt:**
   - Visit `http://localhost:3000/robots.txt`
   - Verify sitemap URL is correct

### Production Testing

1. **Google Search Console:**
   - Submit sitemap: `https://joes-used-harleys.vercel.app/sitemap.xml`
   - Monitor indexing status
   - Check for crawl errors

2. **Rich Results Test:**
   - https://search.google.com/test/rich-results
   - Test Product, FAQ, LocalBusiness schemas

3. **Lighthouse SEO Audit:**
   - Run Lighthouse in Chrome DevTools
   - Target 100/100 SEO score

## Troubleshooting

### Issue: Duplicate Titles

**Problem:** Multiple pages have the same title tag.

**Solution:**
1. Check all `setPageSEO()` calls
2. Ensure each page has a unique `pageTitle`
3. Verify no two pages use the same title

### Issue: Missing Pages in Sitemap

**Problem:** A page isn't appearing in the sitemap.

**Solution:**
1. Check `app/sitemap.ts`
2. Add the page URL with appropriate priority
3. Rebuild and verify

### Issue: Model Page Not Generating

**Problem:** `/models/[model]` returns 404.

**Solution:**
1. Verify model exists in `lib/model-data.ts`
2. Check `generateStaticParams()` in `app/models/[model]/page.tsx`
3. Ensure model slug matches database key

### Issue: Keywords Not Appearing

**Problem:** Expected keywords missing from metadata.

**Solution:**
1. Check if `modelName` is provided to `setPageSEO()`
2. Verify `generateHarleyKeywords()` is imported
3. Check keyword array in `SEO_CONFIG.keywords`

## Advanced Customization

### Custom Keyword Generation

To add custom keyword logic:

```typescript
// In lib/seo.ts, modify setPageSEO()
if (options.modelName) {
  const modelKeywords = generateHarleyKeywords(options.modelName);
  // Add custom keywords
  allKeywords.push('custom keyword 1', 'custom keyword 2');
  allKeywords.push(...modelKeywords);
}
```

### Custom Schema Types

To add new schema types:

1. Create generator in `lib/seo.ts`:
```typescript
export function generateCustomSchema(data: any) {
  return {
    "@context": "https://schema.org",
    "@type": "CustomType",
    // ... schema properties
  };
}
```

2. Use in component:
```typescript
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(generateCustomSchema(data))
  }}
/>
```

## Resources

- [Next.js Metadata API](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)
- [Schema.org Documentation](https://schema.org/)
- [Google Search Central](https://developers.google.com/search)
- [Local SEO Guide](https://developers.google.com/search/docs/appearance/local-seo)

## Support

For questions or issues with the SEO system:
1. Review this documentation
2. Check existing page implementations
3. Verify configuration in `lib/seo.ts`

---

**Last Updated:** 2024
**Maintained By:** Development Team

