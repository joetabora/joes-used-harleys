/**
 * TypeScript Types for Sanity CMS Schemas
 * Type-safe interfaces for all CMS documents
 */

// PortableText types - using inline type for compatibility
export type PortableTextBlock = {
  _type: 'block';
  _key: string;
  style?: string;
  children: Array<{
    _type: 'span';
    _key: string;
    text: string;
    marks?: string[];
  }>;
  markDefs?: Array<{
    _type: string;
    _key: string;
    href?: string;
  }>;
};

export interface SanityImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
  crop?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
}

export interface MotorcycleSpecs {
  engine?: string;
  displacement?: string;
  torque?: string;
  fuelCapacity?: string;
  seatHeight?: string;
  weight?: string;
  transmission?: string;
  wheelbase?: string;
}

export interface Motorcycle {
  _id: string;
  _type: 'motorcycle';
  title: string;
  slug: {
    current: string;
    _type: 'slug';
  };
  model: string;
  year: number;
  mileage: number;
  price: number;
  priceFormatted?: string;
  condition: 'excellent' | 'very-good' | 'good' | 'fair';
  description?: PortableTextBlock[];
  features?: string[];
  images: SanityImage[];
  specs?: MotorcycleSpecs;
  financing?: string;
  featured?: boolean;
  justArrived?: boolean;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
  _createdAt: string;
  _updatedAt: string;
}

export interface ModelPageSpecs {
  engine?: string;
  displacement?: string;
  torque?: string;
  fuelCapacity?: string;
  seatHeight?: string;
  weight?: string;
  transmission?: string;
  wheelbase?: string;
}

export interface ModelPage {
  _id: string;
  _type: 'modelPage';
  name: string;
  slug: {
    current: string;
    _type: 'slug';
  };
  heroImage: SanityImage;
  body?: PortableTextBlock[];
  specs?: ModelPageSpecs;
  startingPrice?: string;
  financingInfo?: string;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
  _createdAt: string;
  _updatedAt: string;
}

export interface HomepageSettings {
  _id: string;
  _type: 'homepage';
  heroTitle?: string;
  heroSubtitle?: string;
  heroImage?: SanityImage;
  heroVideo?: string;
  featuredBikes?: Motorcycle[];
  introContent?: PortableTextBlock[];
  trustContent?: PortableTextBlock[];
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
  _updatedAt: string;
}

export interface Address {
  street?: string;
  city?: string;
  state?: string;
  zip?: string;
}

export interface SocialLinks {
  instagram?: string;
  facebook?: string;
  twitter?: string;
}

export interface GlobalSettings {
  _id: string;
  _type: 'globalSettings';
  siteTitle?: string;
  siteDescription?: string;
  logo?: SanityImage;
  footerText?: string;
  phone?: string;
  email?: string;
  address?: Address;
  socialLinks?: SocialLinks;
  _updatedAt: string;
}
