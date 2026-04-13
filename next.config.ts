import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* SEO & Performance Optimizations */
  compress: true, // Enable Gzip compression
  
  /* Image Optimization */
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [],
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year for immutable images
  },
  
  /* Headers for SEO and Security */
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "geolocation=(self), microphone=(), camera=()",
          },
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/sitemap.xml",
        headers: [
          {
            key: "Content-Type",
            value: "application/xml; charset=utf-8",
          },
          {
            key: "Cache-Control",
            value: "public, max-age=3600",
          },
        ],
      },
      {
        source: "/robots.txt",
        headers: [
          {
            key: "Content-Type",
            value: "text/plain; charset=utf-8",
          },
          {
            key: "Cache-Control",
            value: "public, max-age=3600",
          },
        ],
      },
    ];
  },
  
  /* Redirects for SEO */
  async redirects() {
    return [
      {
        source: "/tour-packages",
        destination: "/packages",
        permanent: true, // 301 redirect for SEO
      },
      {
        source: "/destinations",
        destination: "/locations",
        permanent: true,
      },
    ];
  },
  
  /* Rewrites to clean URLs */
  async rewrites() {
    return {
      beforeFiles: [],
      afterFiles: [],
      fallback: [],
    };
  },
  
  /* Trailing slash configuration */
  trailingSlash: false,
  
  /* React Strict Mode for development */
  reactStrictMode: true,
  
  /* Optimize Production Builds */
  productionBrowserSourceMaps: false,
  
  /* Environment Variables */
  env: {
    NEXT_PUBLIC_SITE_URL: "https://gulearshtourandtravel.in",
  },
};

if (process.env.NODE_ENV === "development") {
  const { initOpenNextCloudflareForDev } = require("@opennextjs/cloudflare");
  initOpenNextCloudflareForDev();
}

export default nextConfig;
