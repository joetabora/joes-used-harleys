/**
 * JSON-LD LocalBusiness Schema for Joe's Used Harleys
 * Complete LocalBusiness/AutomotiveBusiness structured data
 */

import { SITE_CONFIG } from './seo';

export interface LocalBusinessSchemaOptions {
  phone?: string;
  openingHours?: string[];
  priceRange?: string;
  areaServed?: string[];
}

/**
 * Generate complete LocalBusiness JSON-LD schema
 * 
 * @param options - Optional configuration overrides
 * @returns Complete LocalBusiness schema object
 */
export function generateLocalBusinessSchema(options: LocalBusinessSchemaOptions = {}) {
  const {
    phone = "414-439-6211",
    openingHours = [
      "Mo-Sa 10:00-18:00"
    ],
    priceRange = "$18,500-$24,900",
    areaServed = ["Milwaukee", "Wisconsin", "United States"]
  } = options;

  return {
    "@context": "https://schema.org",
    "@type": "AutomotiveBusiness",
    "@id": `${SITE_CONFIG.url}/#business`,
    "name": "Joe's Used Harleys",
    "alternateName": "Joe's Used Harleys Milwaukee",
    "description": "Used Harley-Davidson motorcycle dealership in Milwaukee, Wisconsin. Low miles, full warranty, financing available. Serving Milwaukee and Wisconsin.",
    "url": SITE_CONFIG.url,
    "logo": `${SITE_CONFIG.url}/juh2.png`,
    "image": `${SITE_CONFIG.url}/juh2.png`,
    "telephone": phone,
    "email": "info@joesusedharleys.com", // Placeholder
    "address": {
      "@type": "PostalAddress",
      "streetAddress": SITE_CONFIG.address.street,
      "addressLocality": SITE_CONFIG.address.city,
      "addressRegion": SITE_CONFIG.address.state,
      "postalCode": SITE_CONFIG.address.zip,
      "addressCountry": SITE_CONFIG.address.country
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": SITE_CONFIG.geo.latitude,
      "longitude": SITE_CONFIG.geo.longitude
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
    "priceRange": priceRange,
    "paymentAccepted": "Cash, Credit Card, Financing",
    "currenciesAccepted": "USD",
    "areaServed": areaServed.map(area => ({
      "@type": area === "United States" ? "Country" : area === "Wisconsin" ? "State" : "City",
      "name": area
    })),
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
      SITE_CONFIG.social.instagram
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "128",
      "bestRating": "5",
      "worstRating": "1"
    }
  };
}

/**
 * Get LocalBusiness schema as JSON string for embedding
 */
export function getLocalBusinessSchemaJSON(options?: LocalBusinessSchemaOptions): string {
  return JSON.stringify(generateLocalBusinessSchema(options), null, 2);
}

/**
 * Complete LocalBusiness schema for Joe's Used Harleys
 */
export const localBusinessSchema = generateLocalBusinessSchema();

