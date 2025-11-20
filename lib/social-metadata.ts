/**
 * OpenGraph and Twitter Card Metadata for Joe's Used Harleys
 * Complete social media metadata configuration
 */

import { SITE_CONFIG } from './seo';

export interface SocialMetadataOptions {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
}

/**
 * Generate complete OpenGraph and Twitter metadata
 * 
 * @param options - Social metadata configuration
 * @returns Complete metadata object compatible with Next.js Metadata API
 */
export function generateSocialMetadata(options: SocialMetadataOptions = {}) {
  const {
    title = "Used Harley Milwaukee | Harley for Sale Milwaukee | Joe's Used Harleys",
    description = "Buy used Harley-Davidson motorcycles in Milwaukee, Wisconsin. Low miles, full warranty, financing available. Street Glide, Road Glide, Fat Boy & more.",
    image = `${SITE_CONFIG.url}/juh2.png`,
    url = SITE_CONFIG.url,
    type = 'website'
  } = options;

  return {
    openGraph: {
      title: title,
      description: description,
      url: url,
      siteName: "Joe's Used Harleys",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title
        }
      ],
      locale: 'en_US',
      type: type
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
      images: [image],
      creator: '@joetabora',
      site: '@joetabora'
    }
  };
}

/**
 * Default social metadata for homepage
 */
export const defaultSocialMetadata = generateSocialMetadata({
  title: "Used Harley Milwaukee | Harley for Sale Milwaukee | Joe's Used Harleys",
  description: "Buy used Harley-Davidson motorcycles in Milwaukee, Wisconsin. Low miles, full warranty, financing available. Street Glide, Road Glide, Fat Boy & more.",
  url: SITE_CONFIG.url,
  type: 'website'
});

/**
 * Social metadata for inventory page
 */
export const inventorySocialMetadata = generateSocialMetadata({
  title: "Used Harleys for Sale Near Me | Cheap Harleys Milwaukee",
  description: "Browse our complete inventory of used Harleys for sale in Milwaukee. Find cheap Harleys, affordable financing, and low-mileage bikes. View all models.",
  url: `${SITE_CONFIG.url}/inventory`,
  type: 'website'
});

/**
 * Social metadata for model pages
 */
export function getModelSocialMetadata(modelName: string, modelSlug: string) {
  return generateSocialMetadata({
    title: `Used ${modelName} Milwaukee | Harley ${modelName} for Sale`,
    description: `Buy a used ${modelName} in Milwaukee, Wisconsin. Highway-ready and inspected. View photos, mileage, and pricing. Financing available.`,
    url: `${SITE_CONFIG.url}/models/${modelSlug}`,
    type: 'product',
    image: `${SITE_CONFIG.url}/images/${modelSlug}.jpg` // Placeholder - update with actual image
  });
}

/**
 * Social metadata for contact page
 */
export const contactSocialMetadata = generateSocialMetadata({
  title: "Contact Joe's Used Harleys | Milwaukee Harley Dealer",
  description: "Contact Joe's Used Harleys in Milwaukee. Call 414-439-6211 or visit House Of Harley on W Layton Ave. Get financing info and schedule a test ride.",
  url: `${SITE_CONFIG.url}/contact`,
  type: 'website'
});

/**
 * Social metadata for about page
 */
export const aboutSocialMetadata = generateSocialMetadata({
  title: "About Joe's Used Harleys | Milwaukee Harley Dealer",
  description: "Learn about Joe's Used Harleys, Milwaukee's trusted used Harley-Davidson dealer. Transparent pricing, 48-hour guarantee, financing available.",
  url: `${SITE_CONFIG.url}/about`,
  type: 'website'
});

/**
 * Complete metadata object for Next.js Metadata API
 * Combines OpenGraph and Twitter metadata
 * 
 * @example
 * export const metadata: Metadata = {
 *   ...generateSocialMetadata({
 *     title: "Custom Page Title",
 *     description: "Custom description"
 *   })
 * };
 */
export function getCompleteSocialMetadata(options: SocialMetadataOptions = {}) {
  return generateSocialMetadata(options);
}

