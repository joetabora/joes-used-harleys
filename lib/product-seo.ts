/**
 * Product-specific SEO utilities for individual motorcycle pages
 */

import { SITE_CONFIG } from './seo';

export interface BikeData {
  id: string;
  name: string;
  image: string;
  specs: string;
  price: number;
  priceFormatted: string;
  financing: string;
  featured?: boolean;
  justArrived?: boolean;
  mileage?: number | null;
  year?: number | null;
  model?: string;
  condition?: string;
}

/**
 * Extract model name from bike name (e.g., "2023 Street Glide Special" -> "Street Glide")
 */
export function extractModelName(bikeName: string): string {
  // Remove year prefix
  const withoutYear = bikeName.replace(/^\d{4}\s+/, '');
  
  // Common model patterns
  const modelPatterns = [
    /Street Glide( Special)?/i,
    /Road Glide( Special)?/i,
    /Fat Boy/i,
    /Heritage Classic/i,
    /Low Rider S/i,
    /Softail Deluxe/i,
    /Sportster/i,
    /Breakout/i,
    /Electra Glide/i,
    /Road King/i,
    /Ultra Classic/i
  ];
  
  for (const pattern of modelPatterns) {
    const match = withoutYear.match(pattern);
    if (match) {
      return match[0];
    }
  }
  
  // Fallback: return first two words after year
  const words = withoutYear.split(' ');
  return words.slice(0, 2).join(' ');
}

/**
 * Extract year from bike name
 */
export function extractYear(bikeName: string): number | null {
  const match = bikeName.match(/^(\d{4})/);
  return match ? parseInt(match[1], 10) : null;
}

/**
 * Extract mileage from specs string
 */
export function extractMileage(specs: string): number | null {
  const match = specs.match(/([\d,]+)\s*miles/i);
  if (match) {
    return parseInt(match[1].replace(/,/g, ''), 10);
  }
  return null;
}

/**
 * Generate model-specific keywords
 */
export function generateModelKeywords(model: string): string[] {
  const modelLower = model.toLowerCase();
  return [
    `used harley ${modelLower} milwaukee`,
    `harley ${modelLower} for sale milwaukee`,
    `milwaukee ${modelLower} harley for sale`,
    `used ${modelLower} milwaukee`,
    `${modelLower} harley milwaukee`,
    `harley davidson ${modelLower} milwaukee`
  ];
}

/**
 * Generate product page title
 */
export function generateProductTitle(model: string): string {
  return `Used Harley-Davidson ${model} for Sale in Milwaukee | Joe's Used Harleys`;
}

/**
 * Generate product page description
 */
export function generateProductDescription(model: string, mileage?: number | null, price?: string): string {
  let desc = `Buy a used Harley ${model} in Milwaukee. Highway-ready and inspected.`;
  if (mileage) {
    desc += ` Low mileage ${mileage.toLocaleString()} miles.`;
  }
  if (price) {
    desc += ` Priced at ${price}.`;
  }
  desc += ` View photos, specifications, and pricing. Financing available.`;
  return desc;
}

/**
 * Generate Product schema for individual bike page
 */
export function generateProductPageSchema(bike: BikeData) {
  const model = bike.model || extractModelName(bike.name);
  const year = bike.year || extractYear(bike.name);
  const mileage = bike.mileage || extractMileage(bike.specs);
  
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
    ...(model && {
      model: model
    }),
    ...(year && {
      productionDate: year.toString()
    }),
    ...(mileage && {
      mileageFromOdometer: {
        "@type": "QuantitativeValue",
        value: mileage,
        unitCode: "MI"
      }
    }),
    itemCondition: bike.condition ? `https://schema.org/${bike.condition}` : "https://schema.org/UsedCondition",
    offers: {
      "@type": "Offer",
      price: bike.price,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: `${SITE_CONFIG.url}/bikes/${bike.id}`,
      seller: {
        "@type": "AutoDealer",
        name: SITE_CONFIG.name,
        address: {
          "@type": "PostalAddress",
          streetAddress: SITE_CONFIG.address.street,
          addressLocality: SITE_CONFIG.address.city,
          addressRegion: SITE_CONFIG.address.state,
          postalCode: SITE_CONFIG.address.zip,
          addressCountry: SITE_CONFIG.address.country
        },
        telephone: SITE_CONFIG.phone
      },
      priceValidUntil: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    }
  };
}

/**
 * Generate model-specific content sections
 */
export function getModelContent(model: string) {
  const modelLower = model.toLowerCase();
  
  const contentMap: Record<string, {
    about: string;
    whyMilwaukee: string;
    upgrades: string;
  }> = {
    "street glide": {
      about: `The Harley-Davidson Street Glide is Milwaukee's most popular touring motorcycle, combining iconic styling with modern performance. Featuring the powerful Milwaukee-Eight engine, the Street Glide delivers smooth power delivery perfect for long rides along Lake Michigan or cross-country touring. The batwing fairing provides excellent wind protection, while the integrated infotainment system keeps you connected on every journey.`,
      whyMilwaukee: `Milwaukee riders love the Street Glide for its versatility. Whether you're cruising through downtown Milwaukee, exploring Wisconsin's scenic country roads, or heading out on a weekend trip, the Street Glide handles it all with confidence. The comfortable riding position and ample storage make it ideal for Milwaukee's diverse riding conditions, from city streets to highway touring.`,
      upgrades: `Common upgrades for the Street Glide include Stage 1 and Stage 2 performance kits for increased horsepower, aftermarket exhaust systems for that signature Harley sound, upgraded audio systems, LED lighting packages, and custom paint schemes. Many Milwaukee riders also add luggage systems, highway pegs, and upgraded seats for enhanced touring comfort.`
    },
    "road glide": {
      about: `The Harley-Davidson Road Glide stands out with its distinctive frame-mounted shark-nose fairing, providing superior wind protection and a unique look. Powered by the Milwaukee-Eight engine, the Road Glide offers exceptional long-distance touring capabilities. The fixed fairing design reduces wind buffeting and provides a stable ride, making it a favorite among serious touring riders.`,
      whyMilwaukee: `The Road Glide's frame-mounted fairing makes it particularly popular with Milwaukee riders who appreciate its stability in crosswinds – a common condition along Lake Michigan. The bike's touring-focused design makes it perfect for Wisconsin's long, straight highways and scenic routes. Milwaukee riders also appreciate the Road Glide's distinctive styling that sets it apart from other touring models.`,
      upgrades: `Popular Road Glide upgrades include Stage 1 and Stage 2 performance packages, aftermarket exhaust systems, upgraded infotainment systems, LED lighting conversions, custom paint and graphics, and touring accessories like luggage racks and highway bars. Many Milwaukee Road Glide owners also upgrade to premium audio systems and add GPS navigation units.`
    },
    "fat boy": {
      about: `The Harley-Davidson Fat Boy is an iconic cruiser that combines classic styling with modern performance. Known for its distinctive solid-disc wheels and muscular stance, the Fat Boy delivers a powerful riding experience. The Milwaukee-Eight engine provides smooth, responsive power, while the low-slung design offers an aggressive, commanding presence on Milwaukee streets.`,
      whyMilwaukee: `Milwaukee riders are drawn to the Fat Boy's timeless design and powerful performance. The bike's low center of gravity makes it easy to handle in city traffic, while its powerful engine provides plenty of power for highway cruising. The Fat Boy's classic styling appeals to Milwaukee riders who want that authentic Harley-Davidson look with modern reliability.`,
      upgrades: `Common Fat Boy upgrades include Stage 1 and Stage 2 performance kits, aftermarket exhaust systems (especially popular for that deep Harley rumble), custom handlebars and grips, LED lighting packages, custom paint and chrome accessories, and upgraded suspension components. Many Milwaukee Fat Boy owners also add forward controls and custom seats for personalized comfort.`
    },
    "heritage classic": {
      about: `The Harley-Davidson Heritage Classic delivers authentic retro styling with modern engineering. Featuring nostalgic design elements like the detachable windshield, leather-look saddlebags, and classic chrome accents, the Heritage Classic captures the spirit of Harley-Davidson's past while delivering contemporary performance and reliability.`,
      whyMilwaukee: `Milwaukee riders appreciate the Heritage Classic's blend of classic aesthetics and modern functionality. The bike's comfortable riding position and smooth power delivery make it perfect for Milwaukee's diverse riding conditions. The Heritage Classic's timeless design appeals to riders who want to experience the golden age of motorcycling with today's reliability and performance.`,
      upgrades: `Popular Heritage Classic upgrades include Stage 1 performance packages, aftermarket exhaust systems, custom paint schemes with vintage-inspired designs, upgraded lighting (including LED conversions), custom seats and handlebars, and chrome accessory packages. Many Milwaukee Heritage Classic owners also add period-correct accessories to enhance the retro aesthetic.`
    },
    "low rider s": {
      about: `The Harley-Davidson Low Rider S is a performance-focused cruiser that combines aggressive styling with powerful performance. Featuring the high-performance Milwaukee-Eight 117 engine, the Low Rider S delivers exceptional acceleration and power. The bike's sporty stance and premium components make it a favorite among riders who want both style and performance.`,
      whyMilwaukee: `Milwaukee riders love the Low Rider S for its powerful performance and aggressive styling. The bike's sporty handling makes it perfect for Milwaukee's mix of city streets and open highways. The Low Rider S appeals to Milwaukee riders who want a bike that stands out with its performance capabilities and distinctive blacked-out styling.`,
      upgrades: `Common Low Rider S upgrades include Stage 2 and Stage 3 performance packages (the bike already comes with Stage 1), aftermarket exhaust systems, upgraded suspension components, performance air filters, custom handlebars and controls, LED lighting packages, and custom paint or powder coating. Many Milwaukee Low Rider S owners also add performance-oriented accessories like upgraded brakes and tires.`
    },
    "softail deluxe": {
      about: `The Harley-Davidson Softail Deluxe combines classic styling with modern Softail frame technology. Featuring nostalgic design elements like whitewall tires, chrome accents, and retro-inspired paint schemes, the Softail Deluxe delivers an authentic classic motorcycle experience with contemporary reliability and performance.`,
      whyMilwaukee: `Milwaukee riders appreciate the Softail Deluxe's classic styling and smooth ride. The bike's Softail frame provides a comfortable ride while maintaining the hardtail look that defines classic Harley-Davidson design. The Softail Deluxe is perfect for Milwaukee riders who want that timeless cruiser experience with modern engineering.`,
      upgrades: `Popular Softail Deluxe upgrades include Stage 1 performance packages, aftermarket exhaust systems, custom paint with vintage-inspired designs, upgraded lighting, custom seats and handlebars, chrome accessory packages, and whitewall tire options. Many Milwaukee Softail Deluxe owners also add period-correct accessories to enhance the classic aesthetic.`
    }
  };
  
  // Try exact match first
  if (contentMap[modelLower]) {
    return contentMap[modelLower];
  }
  
  // Try partial match
  for (const [key, value] of Object.entries(contentMap)) {
    if (modelLower.includes(key) || key.includes(modelLower)) {
      return value;
    }
  }
  
  // Default content
  return {
    about: `The Harley-Davidson ${model} is a premium motorcycle that combines iconic Harley-Davidson styling with modern performance and reliability. This used ${model} in Milwaukee offers exceptional value for riders seeking a quality pre-owned Harley-Davidson.`,
    whyMilwaukee: `Milwaukee riders appreciate the ${model} for its combination of style, performance, and reliability. Whether you're cruising through downtown Milwaukee or exploring Wisconsin's scenic routes, the ${model} delivers an exceptional riding experience.`,
    upgrades: `Common upgrades for the ${model} include Stage 1 and Stage 2 performance packages, aftermarket exhaust systems, custom paint and graphics, LED lighting conversions, and premium accessories. Many Milwaukee ${model} owners personalize their bikes with these popular modifications.`
  };
}

