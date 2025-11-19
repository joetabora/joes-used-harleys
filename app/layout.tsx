import type { Metadata } from 'next';
import { Inter, Bebas_Neue } from 'next/font/google';
import { generateMetadata as generateSEOMetadata, SITE_CONFIG } from '@/lib/seo';
import { SEO } from '@/components/SEO';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
});

const bebasNeue = Bebas_Neue({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-clash',
  display: 'swap',
  preload: true,
});

// Generate default metadata
const defaultMetadata = generateSEOMetadata({
  title: 'Used Harley Milwaukee | Used Harley for Sale Milwaukee',
  description: 'Buy used Harley-Davidson motorcycles in Milwaukee, Wisconsin. Low miles, full warranty, financing available. Street Glide, Road Glide, Fat Boy, Heritage Classic & more.',
  keywords: ['used harley milwaukee', 'harley for sale milwaukee'],
  path: '/'
});

export const metadata: Metadata = {
  ...defaultMetadata,
  metadataBase: new URL(SITE_CONFIG.url),
  authors: [{ name: 'Joe Tabora' }],
  creator: 'Joe Tabora',
  publisher: SITE_CONFIG.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: SITE_CONFIG.name,
  },
  other: {
    ...defaultMetadata.other,
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#FF6600',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" itemScope itemType="https://schema.org/AutoDealer">
      <head>
        {/* Preload critical resources */}
        <link
          rel="preload"
          href="/juh2.png"
          as="image"
          type="image/png"
        />
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="dns-prefetch"
          href="https://videos.pexels.com"
        />
        <link
          rel="dns-prefetch"
          href="https://i.imgur.com"
        />
        {/* Geo metadata for local SEO */}
        <meta name="geo.region" content="US-WI" />
        <meta name="geo.placename" content="Milwaukee" />
        <meta name="geo.position" content="43.0389;-87.9065" />
        <meta name="ICBM" content="43.0389, -87.9065" />
      </head>
      <body className={`${inter.variable} ${bebasNeue.variable}`}>
        {children}
      </body>
    </html>
  );
}

