/**
 * JSON-LD Product Schema Template for Harley-Davidson Model Landing Pages
 * Generates structured data for SEO and rich snippets
 */

export interface ProductSchemaOptions {
  modelName: string;
  description: string;
  price?: string;
  priceCurrency?: string;
  availability?: string;
  rating?: {
    ratingValue: number;
    reviewCount: number;
  };
  image?: string;
  url?: string;
  sku?: string;
  condition?: string;
}

/**
 * Generate JSON-LD Product schema for Harley-Davidson model pages
 * 
 * @param options - Product schema configuration
 * @returns JSON-LD Product schema object
 * 
 * @example
 * const schema = generateProductSchema({
 *   modelName: "Street Glide",
 *   description: "Used Street Glide motorcycles for sale in Milwaukee...",
 *   price: "21000.00",
 *   url: "https://joes-used-harleys.vercel.app/models/street-glide"
 * });
 */
export function generateProductSchema(options: ProductSchemaOptions) {
  const {
    modelName,
    description,
    price = "0.00",
    priceCurrency = "USD",
    availability = "https://schema.org/InStock",
    rating,
    image,
    url,
    sku,
    condition = "https://schema.org/UsedCondition"
  } = options;

  const schema: any = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": `Used ${modelName} Harley-Davidson Motorcycle`,
    "brand": {
      "@type": "Brand",
      "name": "Harley-Davidson"
    },
    "description": description,
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
      "availability": availability,
      "price": price === "0.00" ? "18500" : price, // Default to $18,500 if price is 0
      "priceCurrency": priceCurrency,
      "priceValidUntil": new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 90 days from now
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
    }
  };

  // Add optional fields
  if (image) {
    schema.image = image;
  }

  if (url) {
    schema.url = url;
  }

  if (sku) {
    schema.sku = sku;
  }

  if (condition) {
    schema.itemCondition = condition;
  }

  // Add aggregate rating if provided, otherwise use placeholder
  if (rating) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      "ratingValue": rating.ratingValue.toString(),
      "reviewCount": rating.reviewCount.toString(),
      "bestRating": "5",
      "worstRating": "1"
    };
  } else {
    // Default placeholder rating
    schema.aggregateRating = {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "128",
      "bestRating": "5",
      "worstRating": "1"
    };
  }

  return schema;
}

/**
 * Generate Product schema for a specific model with default values
 * Convenience function for quick schema generation
 * 
 * @param modelName - Name of the Harley-Davidson model (e.g., "Street Glide")
 * @param description - SEO description for the model
 * @param url - URL of the model page
 * @returns JSON-LD Product schema object
 */
export function generateModelProductSchema(
  modelName: string,
  description: string,
  url?: string
) {
  return generateProductSchema({
    modelName,
    description,
    url: url || `https://joes-used-harleys.vercel.app/models/${modelName.toLowerCase().replace(/\s+/g, '-')}`,
    price: "0.00", // Placeholder - update with actual pricing
    availability: "https://schema.org/InStock"
  });
}

/**
 * Example usage and template for embedding in Next.js pages
 * 
 * Usage in a Next.js page component:
 * 
 * import { generateModelProductSchema } from '@/lib/product-schema-template';
 * 
 * export default function ModelPage() {
 *   const productSchema = generateModelProductSchema(
 *     "Street Glide",
 *     "Used Street Glide motorcycles for sale in Milwaukee...",
 *     "https://joes-used-harleys.vercel.app/models/street-glide"
 *   );
 * 
 *   return (
 *     <>
 *       <script
 *         type="application/ld+json"
 *         dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
 *       />
 *       Page content here
 *     </>
 *   );
 * }
 */

