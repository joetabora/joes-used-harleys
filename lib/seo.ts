/**
 * SEO Configuration and Utilities for Joe's Used Harleys
 * Centralized SEO management for Milwaukee-focused keywords
 */

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
  url: "https://joes-used-harleys.vercel.app",
  description: "Buy used Harley-Davidson motorcycles in Milwaukee, Wisconsin. Low miles, full warranty, financing available.",
  image: "https://joes-used-harleys.vercel.app/juh2.png",
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
  title: "Used Harley Milwaukee | Used Harley for Sale Milwaukee | Joe's Used Harleys",
  description: "Buy used Harley-Davidson motorcycles in Milwaukee, Wisconsin. Low miles, full warranty, financing available. Street Glide, Road Glide, Fat Boy, Heritage Classic & more.",
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
    title: "Used Harley Milwaukee | Used Harley for Sale Milwaukee | Joe's Used Harleys",
    description: "Buy used Harley-Davidson motorcycles in Milwaukee, Wisconsin. Low miles, full warranty, financing available. Street Glide, Road Glide, Fat Boy, Heritage Classic & more.",
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
    title: "Used Harley Milwaukee | Used Harley for Sale Milwaukee",
    description: "Buy used Harley-Davidson motorcycles in Milwaukee, Wisconsin. Low miles, full warranty, financing available.",
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
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${SITE_CONFIG.url}/#product-${bike.id}`,
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
      price: bike.price,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: `${SITE_CONFIG.url}/#${bike.id}`,
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
 * Generate default metadata for Next.js Metadata API
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
  const title = generateTitle(options.title, options.keywords, options.model);
  const description = generateDescription(options.description, options.keywords, options.model);
  const keywords = generateKeywords(options.keywords, options.model);
  const canonical = generateCanonical(options.path);

  const metadata: any = {
    title,
    description,
    keywords,
    openGraph: generateOpenGraph(title, description, options.image, "website", options.path),
    twitter: generateTwitterCard(title, description, options.image),
    alternates: {
      canonical
    },
    other: {
      "geo.region": "US-WI",
      "geo.placename": "Milwaukee",
      "geo.position": `${SITE_CONFIG.geo.latitude};${SITE_CONFIG.geo.longitude}`,
      "ICBM": `${SITE_CONFIG.geo.latitude}, ${SITE_CONFIG.geo.longitude}`
    }
  };

  if (options.noindex) {
    metadata.robots = {
      index: false,
      follow: false
    };
  }

  return metadata;
}

