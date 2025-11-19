import { MetadataRoute } from 'next';
import { SITE_CONFIG } from '@/lib/seo';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_CONFIG.name,
    short_name: "Joe's Harleys",
    description: SITE_CONFIG.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#FF6600',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  };
}

