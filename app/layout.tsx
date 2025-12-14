import type { Metadata } from 'next';
import { Inter, Bebas_Neue } from 'next/font/google';
import { generateMetadata as generateSEOMetadata, SITE_CONFIG, SEO_CONFIG } from '@/lib/seo';
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

// Generate default metadata using centralized SEO config
const defaultMetadata = generateSEOMetadata({
  title: SEO_CONFIG.title,
  description: SEO_CONFIG.description,
  keywords: SEO_CONFIG.keywords,
  path: '/'
});

export const metadata: Metadata = {
  ...defaultMetadata,
  metadataBase: new URL(SEO_CONFIG.canonicalBaseUrl),
  authors: [{ name: 'Joe Tabora' }],
  creator: 'Joe Tabora',
  publisher: SEO_CONFIG.siteName,
  // Use centralized robots config
  robots: SEO_CONFIG.robots,
  // Use centralized OpenGraph config
  openGraph: {
    ...SEO_CONFIG.openGraph,
    ...defaultMetadata.openGraph,
  },
  // Use centralized Twitter config
  twitter: {
    ...SEO_CONFIG.twitter,
    ...defaultMetadata.twitter,
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: '/fav.png', sizes: '500x500', type: 'image/png' },
      { url: '/icon.png', sizes: '500x500', type: 'image/png' },
    ],
    shortcut: '/fav.png',
    apple: '/fav.png',
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: SEO_CONFIG.siteName,
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
        {/* Favicon links - explicit for better browser compatibility */}
        <link rel="icon" type="image/png" href="/fav.png" sizes="500x500" />
        <link rel="shortcut icon" type="image/png" href="/fav.png" />
        <link rel="apple-touch-icon" href="/fav.png" />
        {/* Preload critical resources */}
        <link
          rel="preload"
          href="/juh3.png"
          as="image"
          type="image/png"
        />
        {/* Preconnect to Google Fonts for Core Web Vitals */}
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* Preconnect to external image domains */}
        <link
          rel="preconnect"
          href="https://i.imgur.com"
        />
        <link
          rel="preconnect"
          href="https://videos.pexels.com"
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
        {/* Keywords meta tag from centralized config */}
        <meta name="keywords" content={SEO_CONFIG.keywords.join(", ")} />
        {/* Global JSON-LD schemas: Organization, WebSite (with SearchAction), LocalBusiness */}
        <SEO type="website" includeOrganization includeWebSite includeLocalBusiness />
      </head>
      <body className={`${inter.variable} ${bebasNeue.variable}`}>
        {children}
      </body>
    </html>
  );
}

