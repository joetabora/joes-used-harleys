/**
 * Sanity Client Configuration
 * Revalidation-ready client for Next.js ISR
 */

import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID || '';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_DATASET || 'production';
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || process.env.SANITY_API_VERSION || '2024-05-01';
const token = process.env.SANITY_API_READ_TOKEN || process.env.SANITY_READ_TOKEN;

// Create read-only client (with fallback projectId for build-time)
export const client = createClient({
  projectId: projectId || 'placeholder', // Use placeholder during build if not configured
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === 'production',
  token: token || undefined,
  perspective: 'published', // Only fetch published documents
});

// Create write client (for mutations if needed)
export const writeClient = (process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_WRITE_TOKEN)
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false,
      token: process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_WRITE_TOKEN,
    })
  : null;

// Image URL builder
const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  if (!source) return null;
  return builder.image(source);
}

/**
 * Revalidate function for Next.js ISR
 * Call this after content updates in Sanity
 */
export async function revalidatePath(path: string) {
  try {
    if (process.env.NEXT_PUBLIC_SANITY_REVALIDATE_SECRET) {
      await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/revalidate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          secret: process.env.NEXT_PUBLIC_SANITY_REVALIDATE_SECRET,
          path,
        }),
      });
    }
  } catch (error) {
    console.error('Revalidation error:', error);
  }
}

/**
 * Check if Sanity is configured
 */
export function isSanityConfigured(): boolean {
  return !!projectId && !!dataset;
}

