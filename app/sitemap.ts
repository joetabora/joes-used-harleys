import { MetadataRoute } from 'next';
import { SITE_CONFIG } from '@/lib/seo';
import { getAllModelSlugs } from '@/lib/model-data';
import { getAllModelPageSlugs } from '@/lib/model-pages-data';
import { getAllCityPageSlugs } from '@/lib/city-pages-data';
import { getAllStatePageSlugs } from '@/lib/state-pages-data';
import { getAllBlogPosts } from '@/lib/blog-data';

// Removed getBikes() function - not using individual bike pages anymore
// Focusing on social media drops instead

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_CONFIG.url;
  const currentDate = new Date().toISOString().split('T')[0];

  return [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    // Individual bike pages removed - using social media for inventory
    {
      url: `${baseUrl}/inventory`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/used-harleys-milwaukee`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/harley-for-sale-milwaukee`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/milwaukee-harley-dealership`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    // Model pages - dynamically generated from model database
    ...getAllModelSlugs().map((slug) => ({
      url: `${baseUrl}/models/${slug}`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
    // Dedicated model pages at root level
    ...getAllModelPageSlugs().map((slug) => ({
      url: `${baseUrl}/${slug}`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    })),
    // City landing pages
    ...getAllCityPageSlugs().map((slug) => ({
      url: `${baseUrl}/used-harleys-${slug}`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    })),
    // State landing pages (NEW - High Priority SEO)
    ...getAllStatePageSlugs().map((slug) => ({
      url: `${baseUrl}/used-harleys-state/${slug}`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    })),
    // Blog index
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    // Blog posts
    ...getAllBlogPosts().map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.date,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
    {
      url: `${baseUrl}/used-street-glide-milwaukee`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/used-road-glide-milwaukee`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/used-fat-boy-milwaukee`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/used-heritage-classic-milwaukee`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/used-low-rider-s-milwaukee`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/used-softail-deluxe-milwaukee`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/buyers-guide-used-harley-milwaukee`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/road-glide-vs-street-glide-milwaukee`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/best-used-harleys-under-10k-milwaukee`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];
}

