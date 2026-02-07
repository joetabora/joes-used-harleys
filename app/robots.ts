import { MetadataRoute } from 'next';
import { SITE_CONFIG } from '@/lib/seo';

function isMaintenanceModeEnabled(): boolean {
  const raw =
    process.env.MAINTENANCE_MODE ??
    process.env.NEXT_PUBLIC_MAINTENANCE_MODE ??
    'true';
  const normalized = raw.trim().toLowerCase();
  return !['0', 'false', 'off', 'no'].includes(normalized);
}

export default function robots(): MetadataRoute.Robots {
  if (isMaintenanceModeEnabled()) {
    return {
      rules: {
        userAgent: '*',
        disallow: '/',
      },
      sitemap: `${SITE_CONFIG.url}/sitemap.xml`,
    };
  }

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [],
    },
    sitemap: `${SITE_CONFIG.url}/sitemap.xml`,
  };
}
