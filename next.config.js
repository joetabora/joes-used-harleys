/** @type {import('next').NextConfig} */
const nextConfig = {
  // No output mode - let Vercel handle it automatically
  async rewrites() {
    // City slugs for rewrites (matches lib/city-pages-data.ts)
    const citySlugs = [
      'los-angeles', 'san-diego', 'san-francisco', 'miami', 'tampa', 'orlando',
      'houston', 'dallas', 'austin', 'chicago', 'cleveland', 'columbus',
      'madison', 'philadelphia', 'pittsburgh', 'new-york-city', 'buffalo', 'detroit', 'st-louis'
    ];
    
    // Create rewrites for each city: /used-harleys-{city} -> /used-harleys/{city}
    // This maps external URLs like /used-harleys-detroit to internal route /used-harleys/detroit
    const cityRewrites = citySlugs.map(city => ({
      source: `/used-harleys-${city}`,
      destination: `/used-harleys/${city}`
    }));
    
    return {
      beforeFiles: cityRewrites
    };
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.imgur.com',
      },
      {
        protocol: 'https',
        hostname: 'videos.pexels.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: 'dl.airtable.com',
      },
      {
        protocol: 'https',
        hostname: '**.airtableusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'files.catbox.moe',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  trailingSlash: false,
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  swcMinify: true,
  // Payload CMS compatibility
  transpilePackages: ['payload', '@payloadcms'],
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Ensure Payload modules are properly resolved
      config.externals = config.externals || [];
      if (typeof config.externals === 'function') {
        const originalExternals = config.externals;
        config.externals = [
          ...originalExternals,
          ({ request }, callback) => {
            if (request?.includes('payload')) {
              return callback();
            }
            originalExternals({ request }, callback);
          },
        ];
      }
    }
    
    // Disable pino-pretty in production to fix logging errors
    if (process.env.NODE_ENV === 'production') {
      config.resolve.alias = {
        ...config.resolve.alias,
        'pino-pretty': false,
      };
    }
    
    return config;
  },
};

module.exports = nextConfig;

