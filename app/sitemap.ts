import { MetadataRoute } from 'next';
import { SITE_CONFIG } from '@/lib/seo';

async function getBikes() {
  try {
    // Try fetch first (works in both build and runtime)
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || SITE_CONFIG.url;
    const response = await fetch(`${baseUrl}/inventory.json`, {
      next: { revalidate: 3600 },
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400'
      }
    });
    if (response.ok) {
      const data = await response.json();
      return data.bikes || [];
    }
    
    // Fallback: read from file system during build
    const fs = await import('fs/promises');
    const path = await import('path');
    const filePath = path.join(process.cwd(), 'public', 'inventory.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    const data = JSON.parse(fileContents);
    return data.bikes || [];
  } catch {
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

