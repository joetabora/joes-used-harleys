# JSON-LD LocalBusiness Schema for Joe's Used Harleys

## Complete Schema Output

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "AutomotiveBusiness",
  "@id": "https://joes-used-harleys.vercel.app/#business",
  "name": "Joe's Used Harleys",
  "alternateName": "Joe's Used Harleys Milwaukee",
  "description": "Used Harley-Davidson motorcycle dealership in Milwaukee, Wisconsin. Low miles, full warranty, financing available. Serving Milwaukee and Wisconsin.",
  "url": "https://joes-used-harleys.vercel.app",
  "logo": "https://joes-used-harleys.vercel.app/juh2.png",
  "image": "https://joes-used-harleys.vercel.app/juh2.png",
  "telephone": "414-439-6211",
  "email": "info@joesusedharleys.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "6221 W Layton Ave",
    "addressLocality": "Milwaukee",
    "addressRegion": "WI",
    "postalCode": "53220",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 43.0389,
    "longitude": -87.9065
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "10:00",
      "closes": "18:00"
    }
  ],
  "priceRange": "$18,500-$24,900",
  "paymentAccepted": "Cash, Credit Card, Financing",
  "currenciesAccepted": "USD",
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
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Used Harley-Davidson Motorcycles",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Product",
          "name": "Used Harley-Davidson Motorcycles",
          "category": "Motorcycle"
        }
      }
    ]
  },
  "sameAs": [
    "https://instagram.com/joetabora"
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "128",
    "bestRating": "5",
    "worstRating": "1"
  }
}
</script>
```

## Usage in Next.js

```typescript
import { generateLocalBusinessSchema } from '@/lib/local-business-schema';

export default function HomePage() {
  const localBusinessSchema = generateLocalBusinessSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      {/* Page content */}
    </>
  );
}
```

## Schema Properties Included

- ✅ `@type`: "AutomotiveBusiness"
- ✅ `name`: "Joe's Used Harleys"
- ✅ `description`: Business description
- ✅ `address`: Complete postal address
- ✅ `geo`: Latitude/longitude coordinates
- ✅ `telephone`: Phone number
- ✅ `openingHoursSpecification`: Mon-Sat 10am-6pm
- ✅ `priceRange`: Price range
- ✅ `areaServed`: Milwaukee, Wisconsin, United States
- ✅ `paymentAccepted`: Payment methods
- ✅ `hasOfferCatalog`: Product catalog
- ✅ `aggregateRating`: Business ratings
- ✅ `sameAs`: Social media links

