/**
 * SEO Configuration and Utilities for Joe's Used Harleys
 * Centralized SEO management for Milwaukee-focused keywords
 */

import { generateHarleyKeywords } from './harleyKeywords';

/**
 * Comprehensive SEO Configuration Interface
 */
export interface SEOConfig {
  title: string;
  description: string;
  keywords: string[];
  openGraph: {
    title: string;
    description: string;
    url: string;
    siteName: string;
    images: Array<{
      url: string;
      width?: number;
      height?: number;
      alt?: string;
    }>;
    locale: string;
    type: string;
  };
  twitter: {
    card: string;
    title: string;
    description: string;
    images: string[];
  };
  canonicalBaseUrl: string;
  robots: {
    index: boolean;
    follow: boolean;
    googleBot?: {
      index: boolean;
      follow: boolean;
      'max-video-preview'?: number;
      'max-image-preview'?: 'none' | 'standard' | 'large';
      'max-snippet'?: number;
    };
  };
  siteName: string;
}

export const SITE_CONFIG = {
  name: "Joe's Used Harleys",
  url: "https://joesusedharleys.com",
  description: "Buy used Harley-Davidson motorcycles in Milwaukee, Wisconsin. Low miles, full warranty, financing available.",
  image: "https://joesusedharleys.com/juh3.png",
  phone: "414-439-6211",
  address: {
    street: "6221 W Layton Ave",
    city: "Milwaukee",
    state: "WI",
    zip: "53220",
    country: "US"
  },
  geo: {
    latitude: 43.0389,
    longitude: -87.9065
  },
  hours: {
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "09:00",
    closes: "18:00"
  },
  social: {
    instagram: "https://instagram.com/joetabora"
  }
};

/**
 * Comprehensive SEO Configuration - Centralized and strongly typed
 */
export const SEO_CONFIG: SEOConfig = {
  title: "Used Harleys Milwaukee | $499 Shipping | Joe's",
  description: "🔥 Best prices on used Harleys in Milwaukee! $499 nationwide shipping. Low miles, full warranty, financing from $299/month. Text Joe: 414-439-6211",
  keywords: [
    // Primary Milwaukee keywords
    "used harley milwaukee",
    "used harleys milwaukee",
    "harley for sale milwaukee",
    "harley davidson for sale milwaukee",
    "used motorcycles milwaukee",
    "milwaukee harleys for sale",
    "used harley for sale milwaukee",
    "harley milwaukee",
    "milwaukee harley davidson",
    // Wisconsin keywords
    "harley for sale wisconsin",
    "used harley wisconsin",
    "used harleys wisconsin",
    "harley davidson wisconsin",
    // Model-specific keywords
    "street glide milwaukee",
    "road glide milwaukee",
    "fat boy milwaukee",
    "heritage classic milwaukee",
    "low rider milwaukee",
    "softail milwaukee",
    "sportster milwaukee",
    "used street glide milwaukee",
    "used road glide milwaukee",
    "used fat boy milwaukee",
    "harley street glide for sale milwaukee",
    "harley road glide for sale milwaukee",
    "harley fat boy for sale milwaukee",
    // Dealer keywords
    "harley dealership milwaukee",
    "harley dealer milwaukee",
    "milwaukee harley dealership",
    "used harley dealer milwaukee",
    "pre-owned harley milwaukee",
    "harley motorcycle dealer milwaukee",
    // Service area keywords
    "used harley waukesha",
    "used harley racine",
    "harley for sale waukesha",
    "harley for sale racine"
  ],
  openGraph: {
    title: "Used Harleys Milwaukee | $499 Shipping | Joe's",
    description: "🔥 Best prices on used Harleys in Milwaukee! $499 nationwide shipping. Low miles, full warranty, financing from $299/month. Text Joe: 414-439-6211",
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    images: [
      {
        url: SITE_CONFIG.image,
        width: 1200,
        height: 630,
        alt: "Joe's Used Harleys - Used Harley-Davidson Motorcycles for Sale in Milwaukee"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Used Harleys Milwaukee | $499 Shipping | Joe's",
    description: "🔥 Best prices on used Harleys in Milwaukee! $499 nationwide shipping. Low miles, full warranty, financing from $299/month. Text Joe: 414-439-6211",
    images: [SITE_CONFIG.image]
  },
  canonicalBaseUrl: SITE_CONFIG.url,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large" as const,
      "max-snippet": -1
    }
  },
  siteName: SITE_CONFIG.name
};

/**
 * Primary target keywords for SEO
 */
export const PRIMARY_KEYWORDS = [
  "used harley milwaukee",
  "used harleys milwaukee",
  "harley for sale milwaukee",
  "harley davidson for sale milwaukee",
  "used motorcycles milwaukee",
  "milwaukee harleys for sale"
];

/**
 * Model-specific keywords
 */
export const MODEL_KEYWORDS = {
  "street glide": [
    "harley street glide for sale milwaukee",
    "used street glide milwaukee",
    "street glide milwaukee"
  ],
  "road glide": [
    "harley road glide for sale milwaukee",
    "used road glide milwaukee",
    "road glide milwaukee"
  ],
  "softail": [
    "harley softail for sale milwaukee",
    "used softail milwaukee",
    "softail milwaukee"
  ],
  "sportster": [
    "harley sportster for sale milwaukee",
    "used sportster milwaukee",
    "sportster milwaukee"
  ],
  "fat boy": [
    "fat boy milwaukee",
    "used fat boy milwaukee",
    "harley fat boy for sale milwaukee"
  ],
  "heritage classic": [
    "heritage classic milwaukee",
    "used heritage classic milwaukee",
    "harley heritage classic for sale milwaukee"
  ],
  "low rider": [
    "low rider milwaukee",
    "used low rider milwaukee",
    "harley low rider for sale milwaukee"
  ]
};

/**
 * LSI and semantic keywords
 */
export const SEMANTIC_KEYWORDS = [
  "used harley davidson milwaukee",
  "milwaukee used motorcycles",
  "used motorcycles milwaukee wi",
  "harley dealership milwaukee",
  "pre-owned harley milwaukee",
  "harley davidson dealer milwaukee",
  "buy used harley milwaukee",
  "harley motorcycle dealer milwaukee"
];

/**
 * Generate page title with keyword optimization
 */
export function generateTitle(
  pageTitle?: string,
  keywords?: string[],
  model?: string
): string {
  if (pageTitle) {
    return `${pageTitle} | ${SITE_CONFIG.name}`;
  }

  if (model) {
    const modelKeywords = MODEL_KEYWORDS[model.toLowerCase() as keyof typeof MODEL_KEYWORDS];
    if (modelKeywords) {
      return `${modelKeywords[0]} | ${SITE_CONFIG.name}`;
    }
  }

  if (keywords && keywords.length > 0) {
    return `${keywords[0]} | ${SITE_CONFIG.name}`;
  }

  return `${PRIMARY_KEYWORDS[0]} | ${SITE_CONFIG.name}`;
}

/**
 * Generate meta description with keyword optimization
 */
export function generateDescription(
  customDescription?: string,
  keywords?: string[],
  model?: string
): string {
  if (customDescription) {
    return customDescription;
  }

  const baseDescription = "Buy used Harley-Davidson motorcycles in Milwaukee, Wisconsin. Low miles, full warranty, financing available.";

  if (model) {
    const modelName = model.charAt(0).toUpperCase() + model.slice(1);
    return `${baseDescription} ${modelName}, Street Glide, Road Glide, Fat Boy, Heritage Classic & more. All bikes through House Of Harley. Nationwide shipping $499.`;
  }

  if (keywords && keywords.length > 0) {
    return `${baseDescription} ${keywords.slice(0, 3).join(", ")}. All bikes through House Of Harley. Nationwide shipping $499.`;
  }

  return `${baseDescription} Street Glide, Road Glide, Fat Boy, Heritage Classic & more. All bikes through House Of Harley. Nationwide shipping $499.`;
}

/**
 * Generate keywords meta tag content
 */
export function generateKeywords(
  additionalKeywords?: string[],
  model?: string
): string {
  const allKeywords = [
    ...PRIMARY_KEYWORDS,
    ...SEMANTIC_KEYWORDS
  ];

  if (model) {
    const modelKeywords = MODEL_KEYWORDS[model.toLowerCase() as keyof typeof MODEL_KEYWORDS];
    if (modelKeywords) {
      allKeywords.push(...modelKeywords);
    }
  }

  if (additionalKeywords) {
    allKeywords.push(...additionalKeywords);
  }

  return [...new Set(allKeywords)].join(", ");
}

/**
 * Generate canonical URL
 */
export function generateCanonical(path: string = ""): string {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_CONFIG.url}${cleanPath === "/" ? "" : cleanPath}`;
}

/**
 * Generate Open Graph metadata
 */
export function generateOpenGraph(
  title: string,
  description: string,
  image?: string,
  type: string = "website",
  path: string = ""
): {
  title: string;
  description: string;
  url: string;
  siteName: string;
  images: Array<{ url: string; width?: number; height?: number; alt?: string }>;
  locale: string;
  type: string;
} {
  return {
    title,
    description,
    url: generateCanonical(path),
    siteName: SITE_CONFIG.name,
    images: [
      {
        url: image || SITE_CONFIG.image,
        width: 1200,
        height: 630,
        alt: title
      }
    ],
    locale: "en_US",
    type
  };
}

/**
 * Generate Twitter Card metadata
 */
export function generateTwitterCard(
  title: string,
  description: string,
  image?: string
): {
  card: string;
  title: string;
  description: string;
  images: string[];
} {
  return {
    card: "summary_large_image",
    title,
    description,
    images: [image || SITE_CONFIG.image]
  };
}

/**
 * Generate LocalBusiness schema
 */
export function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "AutoDealer",
    "@id": `${SITE_CONFIG.url}/#organization`,
    name: SITE_CONFIG.name,
    image: SITE_CONFIG.image,
    url: SITE_CONFIG.url,
    telephone: SITE_CONFIG.phone,
    priceRange: "$18,500 - $24,900",
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE_CONFIG.address.street,
      addressLocality: SITE_CONFIG.address.city,
      addressRegion: SITE_CONFIG.address.state,
      postalCode: SITE_CONFIG.address.zip,
      addressCountry: SITE_CONFIG.address.country
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE_CONFIG.geo.latitude,
      longitude: SITE_CONFIG.geo.longitude
    },
    openingHoursSpecification: SITE_CONFIG.hours.days.map(day => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: day,
      opens: SITE_CONFIG.hours.opens,
      closes: SITE_CONFIG.hours.closes
    })),
    sameAs: [SITE_CONFIG.social.instagram],
    areaServed: [
      {
        "@type": "City",
        name: "Milwaukee",
        sameAs: "https://en.wikipedia.org/wiki/Milwaukee"
      },
      {
        "@type": "AdministrativeArea",
        name: "Milwaukee County",
        sameAs: "https://en.wikipedia.org/wiki/Milwaukee_County,_Wisconsin"
      },
      {
        "@type": "State",
        name: "Wisconsin",
        sameAs: "https://en.wikipedia.org/wiki/Wisconsin"
      }
    ],
    containedIn: {
      "@type": "AdministrativeArea",
      name: "Milwaukee County",
      addressRegion: "WI"
    }
  };
}

/**
 * Generate Product schema for a motorcycle
 */
export function generateProductSchema(bike: {
  id: string;
  name: string;
  image: string;
  specs: string;
  price: number;
  priceFormatted: string;
  financing: string;
}) {
  const modelName = bike.name.replace(/^\d{4}\s+/, "");
  
  // Extract numeric price from formatted string if price is 0 or missing
  let numericPrice = bike.price;
  if (numericPrice === 0 || !numericPrice) {
    const priceMatch = bike.priceFormatted?.match(/\$?([\d,]+)/);
    if (priceMatch) {
      numericPrice = parseInt(priceMatch[1].replace(/,/g, '')) || 6999; // Default to $6999 if no price found
    } else {
      numericPrice = 6999; // Default price if "Call" or no price
    }
  }
  
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${SITE_CONFIG.url}/bikes/${bike.id}`,
    name: bike.name,
    image: bike.image,
    description: `Used ${bike.name} for sale in Milwaukee, Wisconsin. ${bike.specs}. ${bike.financing}`,
    brand: {
      "@type": "Brand",
      name: "Harley-Davidson"
    },
    category: "Motorcycle",
    offers: {
      "@type": "Offer",
      price: numericPrice,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      priceValidUntil: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 90 days from now
      url: `${SITE_CONFIG.url}/bikes/${bike.id}`,
      seller: {
        "@type": "AutoDealer",
        name: SITE_CONFIG.name,
        address: {
          "@type": "PostalAddress",
          addressLocality: SITE_CONFIG.address.city,
          addressRegion: SITE_CONFIG.address.state,
          postalCode: SITE_CONFIG.address.zip
        }
      }
    }
  };
}

/**
 * Generate Organization schema
 */
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_CONFIG.url}/#organization`,
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    logo: {
      "@type": "ImageObject",
      url: SITE_CONFIG.image,
      width: 600,
      height: 200
    },
    image: SITE_CONFIG.image,
    description: SITE_CONFIG.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE_CONFIG.address.street,
      addressLocality: SITE_CONFIG.address.city,
      addressRegion: SITE_CONFIG.address.state,
      postalCode: SITE_CONFIG.address.zip,
      addressCountry: SITE_CONFIG.address.country
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: SITE_CONFIG.phone,
      contactType: "Sales",
      areaServed: ["US", "US-WI"],
      availableLanguage: "English"
    },
    sameAs: [SITE_CONFIG.social.instagram]
  };
}

/**
 * Generate WebSite schema with SearchAction
 */
export function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_CONFIG.url}/#website`,
    url: SITE_CONFIG.url,
    name: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    publisher: {
      "@id": `${SITE_CONFIG.url}/#organization`
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_CONFIG.url}/?search={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };
}

/**
 * Generate FAQPage schema
 */
export function generateFAQSchema(questions: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
    }))
  };
}

/**
 * Page-specific SEO options interface
 */
export interface PageSEOOptions {
  pageTitle?: string;
  pageDescription?: string;
  pageKeywords?: string[];
  modelName?: string;
  location?: string;
  path?: string;
  image?: string;
  noindex?: boolean;
}

/**
 * Set page-specific SEO - merges page options with base config
 * This is the main utility for per-page SEO overrides
 */
export function setPageSEO(options: PageSEOOptions = {}): {
  title: string;
  description: string;
  keywords: string;
  openGraph: ReturnType<typeof generateOpenGraph>;
  twitter: ReturnType<typeof generateTwitterCard>;
  alternates: {
    canonical: string;
  };
  robots?: {
    index: boolean;
    follow: boolean;
  };
  other: {
    "geo.region": string;
    "geo.placename": string;
    "geo.position": string;
    "ICBM": string;
  };
} {
  // Build keywords array from page options
  let allKeywords: string[] = [...SEO_CONFIG.keywords];
  
  // Add location-based keywords if location is provided
  if (options.location) {
    const locationLower = options.location.toLowerCase();
    allKeywords.push(
      `used harley ${locationLower}`,
      `harley for sale ${locationLower}`,
      `used harleys ${locationLower}`
    );
  }
  
  // Add model-based keywords if modelName is provided
  if (options.modelName) {
    // Use the comprehensive keyword generator for 50-150 keyword variations
    const modelKeywords = generateHarleyKeywords(options.modelName);
    allKeywords.push(...modelKeywords);
  }
  
  // Add page-specific keywords
  if (options.pageKeywords) {
    allKeywords.push(...options.pageKeywords);
  }
  
  // Remove duplicates
  allKeywords = [...new Set(allKeywords)];
  
  // Generate title
  let title: string;
  if (options.pageTitle) {
    title = `${options.pageTitle} | ${SEO_CONFIG.siteName}`;
  } else if (options.modelName && options.location) {
    title = `Used ${options.modelName} ${options.location} | ${SEO_CONFIG.siteName}`;
  } else if (options.modelName) {
    title = `Used ${options.modelName} Milwaukee | ${SEO_CONFIG.siteName}`;
  } else {
    title = SEO_CONFIG.title;
  }
  
  // Generate description
  let description: string;
  if (options.pageDescription) {
    description = options.pageDescription;
  } else if (options.modelName && options.location) {
    description = `Buy a used ${options.modelName} in ${options.location}, Wisconsin. Highway-ready and inspected. View photos, mileage, and pricing. Financing available.`;
  } else if (options.modelName) {
    description = `Buy a used ${options.modelName} in Milwaukee, Wisconsin. Highway-ready and inspected. View photos, mileage, and pricing. Financing available.`;
  } else {
    description = SEO_CONFIG.description;
  }
  
  // Generate canonical URL
  const path = options.path || '/';
  const canonical = generateCanonical(path);
  
  // Build metadata object
  const metadata: any = {
    title,
    description,
    keywords: allKeywords.join(", "),
    openGraph: {
      ...SEO_CONFIG.openGraph,
      title,
      description,
      url: canonical,
      images: options.image ? [{
        url: options.image,
        width: 1200,
        height: 630,
        alt: title
      }] : SEO_CONFIG.openGraph.images
    },
    twitter: {
      ...SEO_CONFIG.twitter,
      title,
      description,
      images: options.image ? [options.image] : SEO_CONFIG.twitter.images
    },
    alternates: {
      canonical
    },
    other: {
      "geo.region": "US-WI",
      "geo.placename": options.location || "Milwaukee",
      "geo.position": `${SITE_CONFIG.geo.latitude};${SITE_CONFIG.geo.longitude}`,
      "ICBM": `${SITE_CONFIG.geo.latitude}, ${SITE_CONFIG.geo.longitude}`
    }
  };
  
  // Add robots if noindex
  if (options.noindex) {
    metadata.robots = {
      index: false,
      follow: false
    };
  } else {
    metadata.robots = SEO_CONFIG.robots;
  }
  
  return metadata;
}

/**
 * Generate default metadata for Next.js Metadata API
 * @deprecated Use setPageSEO() instead for better per-page control
 */
export function generateMetadata(
  options: {
    title?: string;
    description?: string;
    keywords?: string[];
    model?: string;
    path?: string;
    image?: string;
    noindex?: boolean;
  } = {}
): {
  title: string;
  description: string;
  keywords: string;
  openGraph: ReturnType<typeof generateOpenGraph>;
  twitter: ReturnType<typeof generateTwitterCard>;
  alternates: {
    canonical: string;
  };
  robots?: {
    index: boolean;
    follow: boolean;
  };
  other: {
    "geo.region": string;
    "geo.placename": string;
    "geo.position": string;
    "ICBM": string;
  };
} {
  // Convert old format to new format
  return setPageSEO({
    pageTitle: options.title,
    pageDescription: options.description,
    pageKeywords: options.keywords,
    modelName: options.model,
    path: options.path,
    image: options.image,
    noindex: options.noindex
  });
}

