# JSON-LD Product Schema Template - Example Output

## Example Schema for Street Glide

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Used Street Glide Harley-Davidson Motorcycle",
  "brand": {
    "@type": "Brand",
    "name": "Harley-Davidson"
  },
  "description": "Used Street Glide motorcycles for sale in Milwaukee. Highway-ready and inspected. View photos, mileage, and pricing. Financing available.",
  "category": "Motorcycle",
  "areaServed": [
    {
      "@type": "City",
      "name": "Milwaukee"
    },
    {
      "@type": "State",
      "name": "Wisconsin"
    },
    {
      "@type": "Country",
      "name": "United States"
    }
  ],
  "offers": {
    "@type": "Offer",
    "availability": "https://schema.org/InStock",
    "price": "0.00",
    "priceCurrency": "USD",
    "seller": {
      "@type": "AutoDealer",
      "name": "Joe's Used Harleys",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "6221 W Layton Ave",
        "addressLocality": "Milwaukee",
        "addressRegion": "WI",
        "postalCode": "53220",
        "addressCountry": "US"
      },
      "telephone": "414-439-6211"
    }
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "128",
    "bestRating": "5",
    "worstRating": "1"
  },
  "itemCondition": "https://schema.org/UsedCondition"
}
```

## HTML Embedding Example

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Used Street Glide Harley-Davidson Motorcycle",
  "brand": {
    "@type": "Brand",
    "name": "Harley-Davidson"
  },
  "description": "Used Street Glide motorcycles for sale in Milwaukee. Highway-ready and inspected. View photos, mileage, and pricing. Financing available.",
  "category": "Motorcycle",
  "areaServed": [
    {
      "@type": "City",
      "name": "Milwaukee"
    },
    {
      "@type": "State",
      "name": "Wisconsin"
    },
    {
      "@type": "Country",
      "name": "United States"
    }
  ],
  "offers": {
    "@type": "Offer",
    "availability": "https://schema.org/InStock",
    "price": "0.00",
    "priceCurrency": "USD",
    "seller": {
      "@type": "AutoDealer",
      "name": "Joe's Used Harleys",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "6221 W Layton Ave",
        "addressLocality": "Milwaukee",
        "addressRegion": "WI",
        "postalCode": "53220",
        "addressCountry": "US"
      },
      "telephone": "414-439-6211"
    }
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "128",
    "bestRating": "5",
    "worstRating": "1"
  },
  "itemCondition": "https://schema.org/UsedCondition"
}
</script>
```

## Next.js Implementation Example

```tsx
import { generateModelProductSchema } from '@/lib/product-schema-template';

export default function StreetGlidePage() {
  const productSchema = generateModelProductSchema(
    "Street Glide",
    "Used Street Glide motorcycles for sale in Milwaukee. Highway-ready and inspected. View photos, mileage, and pricing. Financing available.",
    "https://joes-used-harleys.vercel.app/models/street-glide"
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <h1>Used Street Glide Motorcycles for Sale in Milwaukee</h1>
      {/* Page content */}
    </>
  );
}
```

## Custom Options Example

```tsx
import { generateProductSchema } from '@/lib/product-schema-template';

const productSchema = generateProductSchema({
  modelName: "Road Glide",
  description: "Used Road Glide motorcycles for sale in Milwaukee...",
  price: "23000.00",
  priceCurrency: "USD",
  availability: "https://schema.org/InStock",
  rating: {
    ratingValue: 4.8,
    reviewCount: 95
  },
  image: "https://joes-used-harleys.vercel.app/images/road-glide.jpg",
  url: "https://joes-used-harleys.vercel.app/models/road-glide",
  sku: "RG-2023-001",
  condition: "https://schema.org/UsedCondition"
});
```

