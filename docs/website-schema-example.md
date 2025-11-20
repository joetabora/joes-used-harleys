# JSON-LD WebSite Schema with SearchAction

## Complete Schema Output

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Joe's Used Harleys",
  "alternateName": "Joe's Used Harleys Milwaukee",
  "url": "https://joes-used-harleys.vercel.app",
  "description": "Used Harley-Davidson motorcycle dealership in Milwaukee, Wisconsin. Buy used Harleys with low miles, full warranty, and financing available.",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://joes-used-harleys.vercel.app/search?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Joe's Used Harleys",
    "logo": {
      "@type": "ImageObject",
      "url": "https://joes-used-harleys.vercel.app/juh2.png"
    }
  }
}
</script>
```

## Usage in Next.js

```typescript
import { generateWebsiteSchema } from '@/lib/website-schema';

export default function RootLayout({ children }) {
  const websiteSchema = generateWebsiteSchema();

  return (
    <html>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

## Custom Search URL

If you have a custom search endpoint:

```typescript
const websiteSchema = generateWebsiteSchema(
  "https://joes-used-harleys.vercel.app/inventory?search={search_term_string}"
);
```

## Schema Properties

- ✅ `@type`: "WebSite"
- ✅ `name`: "Joe's Used Harleys"
- ✅ `url`: Site URL
- ✅ `potentialAction`: SearchAction with query input
- ✅ `target`: EntryPoint with URL template
- ✅ `query-input`: Required search parameter
- ✅ `publisher`: Organization info with logo

## Benefits

This schema enables:
- Search box in Google search results
- Direct search functionality from SERPs
- Better understanding of site structure
- Enhanced search engine visibility

