/**
 * JSON-LD WebSite Schema with SearchAction for Joe's Used Harleys
 * Enables search functionality in search engine results
 */

import { SITE_CONFIG } from './seo';

/**
 * Generate WebSite schema with SearchAction
 * 
 * @param searchUrl - URL pattern for search (default: /search?q={search_term_string})
 * @returns Complete WebSite schema object
 */
export function generateWebsiteSchema(searchUrl?: string) {
  const defaultSearchUrl = `${SITE_CONFIG.url}/search?q={search_term_string}`;
  
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Joe's Used Harleys",
    "alternateName": "Joe's Used Harleys Milwaukee",
    "url": SITE_CONFIG.url,
    "description": "Used Harley-Davidson motorcycle dealership in Milwaukee, Wisconsin. Buy used Harleys with low miles, full warranty, and financing available.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": searchUrl || defaultSearchUrl
      },
      "query-input": "required name=search_term_string"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Joe's Used Harleys",
      "logo": {
        "@type": "ImageObject",
        "url": `${SITE_CONFIG.url}/juh3.png`
      }
    }
  };
}

/**
 * Get WebSite schema as JSON string for embedding
 */
export function getWebsiteSchemaJSON(searchUrl?: string): string {
  return JSON.stringify(generateWebsiteSchema(searchUrl), null, 2);
}

/**
 * Default WebSite schema
 */
export const websiteSchema = generateWebsiteSchema();

