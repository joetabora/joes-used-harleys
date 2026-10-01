const nextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  outputFileTracingIncludes: {
    "/inventory/*/opengraph-image": [
      "./assets/fonts/**/*",
      "./public/logo.png",
      "./public/top.png",
    ],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
      },
      {
        protocol: "https",
        hostname: "cdn.room58.com",
      },
    ],
  },
};

export default nextConfig;
