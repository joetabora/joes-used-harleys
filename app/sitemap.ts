import { MetadataRoute } from 'next';
import { SITE_CONFIG } from '@/lib/seo';
import { getAllModelSlugs } from '@/lib/model-data';
import { getAllModelPageSlugs } from '@/lib/model-pages-data';

async function getBikes() {
  try {
    // Read from file system during build (most reliable)
    const fs = await import('fs/promises');
    const path = await import('path');
    const filePath = path.join(process.cwd(), 'public', 'inventory.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    const data = JSON.parse(fileContents);
    return data.bikes || [];
  } catch (error) {
    console.error('Error reading inventory.json for sitemap:', error);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_CONFIG.url;
  const currentDate = new Date().toISOString().split('T')[0];
  const bikes = await getBikes();

  const bikePages = bikes.map((bike: { id: string }) => ({
    url: `${baseUrl}/bikes/${bike.id}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    ...bikePages,
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

