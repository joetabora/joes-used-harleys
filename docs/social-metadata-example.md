# OpenGraph + Twitter Metadata Example

## Complete Metadata Object Structure

```typescript
{
  openGraph: {
    title: "Used Harley Milwaukee | Harley for Sale Milwaukee | Joe's Used Harleys",
    description: "Buy used Harley-Davidson motorcycles in Milwaukee, Wisconsin. Low miles, full warranty, financing available. Street Glide, Road Glide, Fat Boy & more.",
    url: "https://joes-used-harleys.vercel.app",
    siteName: "Joe's Used Harleys",
    images: [
      {
        url: "https://joes-used-harleys.vercel.app/juh2.png",
        width: 1200,
        height: 630,
        alt: "Used Harley Milwaukee | Harley for Sale Milwaukee | Joe's Used Harleys"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Used Harley Milwaukee | Harley for Sale Milwaukee | Joe's Used Harleys",
    description: "Buy used Harley-Davidson motorcycles in Milwaukee, Wisconsin. Low miles, full warranty, financing available. Street Glide, Road Glide, Fat Boy & more.",
    images: ["https://joes-used-harleys.vercel.app/juh2.png"],
    creator: "@joetabora",
    site: "@joetabora"
  }
}
```

## Usage in Next.js Pages

```typescript
import { generateSocialMetadata } from '@/lib/social-metadata';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  ...generateSocialMetadata({
    title: "Used Harley Milwaukee | Harley for Sale Milwaukee",
    description: "Buy used Harley-Davidson motorcycles in Milwaukee, Wisconsin.",
    url: "https://joes-used-harleys.vercel.app",
    type: "website"
  })
};
```

## All Required Fields Included

### OpenGraph
- ✅ `og:title` - Page title
- ✅ `og:description` - Page description
- ✅ `og:image` - Social sharing image (1200x630)
- ✅ `og:type` - Content type (website/article/product)
- ✅ `og:locale` - Language/locale (en_US)
- ✅ `og:site_name` - Site name (Joe's Used Harleys)
- ✅ `og:url` - Canonical URL

### Twitter Card
- ✅ `twitter:card` - Card type (summary_large_image)
- ✅ `twitter:title` - Page title
- ✅ `twitter:description` - Page description
- ✅ `twitter:images` - Image array
- ✅ `twitter:creator` - Creator handle (@joetabora)
- ✅ `twitter:site` - Site handle (@joetabora)

