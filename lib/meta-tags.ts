/**
 * Google-Optimized Meta Titles and Descriptions
 * Titles: ≤ 60 characters
 * Descriptions: ≤ 155 characters
 * Natural SEO with Milwaukee + Harley keywords
 */

export interface MetaTags {
  title: string;
  description: string;
  titleLength: number;
  descriptionLength: number;
}

export const metaTags: { [key: string]: MetaTags } = {
  // Homepage
  homepage: {
    title: "Used Harley Milwaukee | Harley for Sale Milwaukee",
    description: "Buy used Harley-Davidson motorcycles in Milwaukee, Wisconsin. Low miles, full warranty, financing available. Street Glide, Road Glide & more.",
    titleLength: 50,
    descriptionLength: 142
  },

  // Inventory Page
  inventory: {
    title: "Used Harleys for Sale Near Me | Cheap Harleys Milwaukee",
    description: "Browse our complete inventory of used Harleys for sale in Milwaukee. Find cheap Harleys, affordable financing, and low-mileage bikes.",
    titleLength: 52,
    descriptionLength: 134
  },

  // Contact Page
  contact: {
    title: "Contact Joe's Used Harleys | Milwaukee Harley Dealer",
    description: "Contact Joe's Used Harleys in Milwaukee. Call 414-439-6211 or visit House Of Harley on W Layton Ave. Get financing info today.",
    titleLength: 48,
    descriptionLength: 140
  },

  // About Page
  about: {
    title: "About Joe's Used Harleys | Milwaukee Harley Dealer",
    description: "Learn about Joe's Used Harleys, Milwaukee's trusted used Harley-Davidson dealer. Transparent pricing, 48-hour guarantee, financing available.",
    titleLength: 48,
    descriptionLength: 137
  },

  // Model Pages
  'street-glide': {
    title: "Used Street Glide Milwaukee | Harley Street Glide Sale",
    description: "Buy a used Street Glide in Milwaukee. Highway-ready with Milwaukee-Eight engine, premium audio & touring comfort. Financing available.",
    titleLength: 50,
    descriptionLength: 140
  },

  'road-glide': {
    title: "Used Road Glide Milwaukee | Harley Road Glide for Sale",
    description: "Find used Road Glide motorcycles in Milwaukee. Distinctive sharknose fairing, superior wind protection & long-distance touring comfort.",
    titleLength: 50,
    descriptionLength: 141
  },

  'road-king': {
    title: "Used Road King Milwaukee | Harley Road King for Sale",
    description: "Buy a used Road King in Milwaukee. Classic touring styling, Milwaukee-Eight power & legendary reliability. Inspected & ready to ride.",
    titleLength: 50,
    descriptionLength: 140
  },

  'softail': {
    title: "Used Softail Milwaukee | Harley Softail for Sale WI",
    description: "Find used Softail motorcycles in Milwaukee. Classic cruiser styling, smooth ride quality & modern Milwaukee-Eight performance. Low miles.",
    titleLength: 48,
    descriptionLength: 139
  },

  'sportster': {
    title: "Used Sportster Milwaukee | Harley Sportster 883 & 1200",
    description: "Buy used Sportster motorcycles in Milwaukee. 883 & 1200 models with nimble handling & classic V-twin power. Perfect for city riding.",
    titleLength: 52,
    descriptionLength: 144
  },

  'dyna': {
    title: "Used Dyna Milwaukee | Harley Dyna for Sale Wisconsin",
    description: "Find used Dyna motorcycles in Milwaukee. Raw power, responsive handling & authentic Harley-Davidson character. Well-maintained & priced fairly.",
    titleLength: 50,
    descriptionLength: 140
  },

  'fat-bob': {
    title: "Used Fat Bob Milwaukee | Harley Fat Bob for Sale",
    description: "Buy a used Fat Bob in Milwaukee. Aggressive styling, dual headlights & powerful Milwaukee-Eight engine. Inspected & ready to ride.",
    titleLength: 48,
    descriptionLength: 135
  },

  'ultra-limited': {
    title: "Used Ultra Limited Milwaukee | Harley Ultra Limited",
    description: "Find used Ultra Limited motorcycles in Milwaukee. Premium touring luxury with comprehensive amenities & advanced infotainment systems.",
    titleLength: 52,
    descriptionLength: 137
  },

  'breakout': {
    title: "Used Breakout Milwaukee | Harley Breakout for Sale",
    description: "Buy a used Breakout in Milwaukee. Muscular styling, wide rear tire & powerful Milwaukee-Eight performance. Low miles & well-maintained.",
    titleLength: 48,
    descriptionLength: 139
  }
};

/**
 * Get meta tags for a specific page
 */
export function getMetaTags(pageKey: string): MetaTags | null {
  return metaTags[pageKey] || null;
}

/**
 * Get meta tags for a model page
 */
export function getModelMetaTags(modelSlug: string): MetaTags | null {
  return metaTags[modelSlug] || null;
}

/**
 * Validate meta tag lengths
 */
export function validateMetaTags(tags: MetaTags): {
  titleValid: boolean;
  descriptionValid: boolean;
  titleLength: number;
  descriptionLength: number;
} {
  return {
    titleValid: tags.titleLength <= 60,
    descriptionValid: tags.descriptionLength <= 155,
    titleLength: tags.titleLength,
    descriptionLength: tags.descriptionLength
  };
}

/**
 * Get all meta tags with validation
 */
export function getAllMetaTags(): Array<MetaTags & { key: string; valid: boolean }> {
  return Object.entries(metaTags).map(([key, tags]) => {
    const validation = validateMetaTags(tags);
    return {
      ...tags,
      key,
      valid: validation.titleValid && validation.descriptionValid
    };
  });
}

