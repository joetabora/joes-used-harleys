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
        {/* Geo metadata for local SEO */}
        <meta name="geo.region" content="US-WI" />
        <meta name="geo.placename" content="Milwaukee" />
        <meta name="geo.position" content="43.0389;-87.9065" />
        <meta name="ICBM" content="43.0389, -87.9065" />
      </head>
      <body className={`${inter.variable} ${bebasNeue.variable}`}>
        <style dangerouslySetInnerHTML={{ __html: `
          .under-construction-btn {
            background: linear-gradient(135deg, #ea580c 0%, #f59e0b 100%);
            color: #ffffff;
            padding: 1rem 2rem;
            font-size: 1rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 2px;
            text-decoration: none;
            font-family: var(--font-clash);
            border-radius: 50px;
            box-shadow: 0 10px 40px rgba(234, 88, 12, 0.4);
            transition: all 0.3s ease;
            display: inline-block;
          }
          .under-construction-btn:hover {
            transform: translateY(-3px) scale(1.02);
            box-shadow: 0 20px 60px rgba(234, 88, 12, 0.6);
          }
        `}} />
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #000000 0%, #0a0a0a 50%, #000000 100%)',
          padding: '2rem',
          textAlign: 'center'
        }}>
          <div style={{
            maxWidth: '600px',
            width: '100%'
          }}>
            <h1 style={{
              fontSize: 'clamp(3rem, 8vw, 6rem)',
              fontWeight: 900,
              fontFamily: 'var(--font-clash)',
              background: 'linear-gradient(135deg, #ea580c 0%, #f59e0b 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '2rem',
              letterSpacing: '-2px',
              lineHeight: '1.1'
            }}>
              UNDER CONSTRUCTION
            </h1>
            <p style={{
              fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
              color: '#9ca3af',
              fontWeight: 500,
              letterSpacing: '1px',
              marginBottom: '3rem',
              lineHeight: '1.6'
            }}>
              We're working on something amazing. Check back soon!
            </p>
            <div style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <a
                href="sms:4144396211?body=Hey Joe!"
                className="under-construction-btn"
              >
                TEXT JOE
              </a>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}

