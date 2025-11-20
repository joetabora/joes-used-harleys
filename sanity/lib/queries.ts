/**
 * GROQ Queries for Sanity CMS
 * All queries for fetching content from Sanity
 */

import { client, isSanityConfigured } from './client';

// Motorcycle Queries
export const motorcycleQueries = {
  // Get all motorcycles
  all: `*[_type == "motorcycle" && defined(slug.current)] | order(_createdAt desc) {
    _id,
    title,
    slug,
    model,
    year,
    mileage,
    price,
    priceFormatted,
    condition,
    description,
    features,
    images,
    specs,
    financing,
    featured,
    justArrived,
    seoTitle,
    seoDescription,
    seoKeywords,
    _createdAt,
    _updatedAt
  }`,

  // Get featured motorcycles
  featured: `*[_type == "motorcycle" && featured == true] | order(_createdAt desc) {
    _id,
    title,
    slug,
    model,
    year,
    mileage,
    price,
    priceFormatted,
    condition,
    description,
    features,
    images,
    specs,
    financing,
    featured,
    justArrived,
    seoTitle,
    seoDescription,
    _createdAt
  }`,

  // Get single motorcycle by slug
  bySlug: `*[_type == "motorcycle" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    model,
    year,
    mileage,
    price,
    priceFormatted,
    condition,
    description,
    features,
    images,
    specs,
    financing,
    featured,
    justArrived,
    seoTitle,
    seoDescription,
    seoKeywords,
    _createdAt,
    _updatedAt
  }`,

  // Get motorcycles by model
  byModel: `*[_type == "motorcycle" && model == $model] | order(year desc) {
    _id,
    title,
    slug,
    model,
    year,
    mileage,
    price,
    priceFormatted,
    condition,
    images,
    featured,
    _createdAt
  }`,

  // Get all slugs for static generation
  slugs: `*[_type == "motorcycle" && defined(slug.current)].slug.current`,
};

// Model Page Queries
export const modelPageQueries = {
  // Get all model pages
  all: `*[_type == "modelPage" && defined(slug.current)] | order(name asc) {
    _id,
    name,
    slug,
    heroImage,
    body,
    specs,
    startingPrice,
    financingInfo,
    seoTitle,
    seoDescription,
    seoKeywords,
    _createdAt,
    _updatedAt
  }`,

  // Get single model page by slug
  bySlug: `*[_type == "modelPage" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    heroImage,
    body,
    specs,
    startingPrice,
    financingInfo,
    seoTitle,
    seoDescription,
    seoKeywords,
    _createdAt,
    _updatedAt
  }`,

  // Get all slugs for static generation
  slugs: `*[_type == "modelPage" && defined(slug.current)].slug.current`,
};

// Homepage Queries
export const homepageQueries = {
  // Get homepage settings
  settings: `*[_type == "homepage"][0] {
    _id,
    heroTitle,
    heroSubtitle,
    heroImage,
    heroVideo,
    featuredBikes[]-> {
      _id,
      title,
      slug,
      model,
      year,
      mileage,
      price,
      priceFormatted,
      condition,
      images,
      featured,
      justArrived
    },
    introContent,
    trustContent,
    seoTitle,
    seoDescription,
    seoKeywords,
    _updatedAt
  }`,
};

// Global Settings Queries
export const globalSettingsQueries = {
  // Get global settings
  settings: `*[_type == "globalSettings"][0] {
    _id,
    siteTitle,
    siteDescription,
    logo,
    footerText,
    phone,
    email,
    address,
    socialLinks,
    _updatedAt
  }`,
};

/**
 * Fetch helper functions
 */
export async function fetchAllMotorcycles() {
  if (!isSanityConfigured()) return [];
  try {
    return await client.fetch(motorcycleQueries.all);
  } catch (error) {
    console.error('Error fetching motorcycles:', error);
    return [];
  }
}

export async function fetchFeaturedMotorcycles() {
  if (!isSanityConfigured()) return [];
  try {
    return await client.fetch(motorcycleQueries.featured);
  } catch (error) {
    console.error('Error fetching featured motorcycles:', error);
    return [];
  }
}

export async function fetchMotorcycleBySlug(slug: string) {
  if (!isSanityConfigured()) return null;
  try {
    return await client.fetch(motorcycleQueries.bySlug, { slug });
  } catch (error) {
    console.error('Error fetching motorcycle:', error);
    return null;
  }
}

export async function fetchMotorcyclesByModel(model: string) {
  if (!isSanityConfigured()) return [];
  try {
    return await client.fetch(motorcycleQueries.byModel, { model });
  } catch (error) {
    console.error('Error fetching motorcycles by model:', error);
    return [];
  }
}

export async function fetchAllModelPages() {
  if (!isSanityConfigured()) return [];
  try {
    return await client.fetch(modelPageQueries.all);
  } catch (error) {
    console.error('Error fetching model pages:', error);
    return [];
  }
}

export async function fetchModelPageBySlug(slug: string) {
  if (!isSanityConfigured()) return null;
  try {
    return await client.fetch(modelPageQueries.bySlug, { slug });
  } catch (error) {
    console.error('Error fetching model page:', error);
    return null;
  }
}

export async function fetchHomepageSettings() {
  if (!isSanityConfigured()) return null;
  try {
    return await client.fetch(homepageQueries.settings);
  } catch (error) {
    console.error('Error fetching homepage settings:', error);
    return null;
  }
}

export async function fetchGlobalSettings() {
  if (!isSanityConfigured()) return null;
  try {
    return await client.fetch(globalSettingsQueries.settings);
  } catch (error) {
    console.error('Error fetching global settings:', error);
    return null;
  }
}

export async function fetchMotorcycleSlugs() {
  if (!isSanityConfigured()) return [];
  try {
    return await client.fetch(motorcycleQueries.slugs);
  } catch (error) {
    console.error('Error fetching motorcycle slugs:', error);
    return [];
  }
}

export async function fetchModelPageSlugs() {
  if (!isSanityConfigured()) return [];
  try {
    return await client.fetch(modelPageQueries.slugs);
  } catch (error) {
    console.error('Error fetching model page slugs:', error);
    return [];
  }
}

