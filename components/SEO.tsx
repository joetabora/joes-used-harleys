/**
 * SEO Component - Reusable component for JSON-LD structured data
 */

import { generateLocalBusinessSchema, generateWebSiteSchema, generateProductSchema } from '@/lib/seo';

interface SEOProps {
  type?: 'page' | 'product' | 'website';
  product?: {
    id: string;
    name: string;
    image: string;
    specs: string;
    price: number;
    priceFormatted: string;
    financing: string;
  };
  includeLocalBusiness?: boolean;
  includeWebSite?: boolean;
}

export function SEO({ 
  type = 'page', 
  product,
  includeLocalBusiness = false,
  includeWebSite = false 
}: SEOProps) {
  const schemas: any[] = [];

  // Always include LocalBusiness on homepage
  if (includeLocalBusiness || type === 'website') {
    schemas.push(generateLocalBusinessSchema());
  }

  // Include WebSite schema on homepage
  if (includeWebSite || type === 'website') {
    schemas.push(generateWebSiteSchema());
  }

  // Include Product schema if product is provided
  if (type === 'product' && product) {
    schemas.push(generateProductSchema(product));
  }

  if (schemas.length === 0) {
    return null;
  }

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}

