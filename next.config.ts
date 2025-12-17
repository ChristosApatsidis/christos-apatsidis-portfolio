import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin({
  experimental: {
    messages: {
      path: '../messages',
      locales: ['en', 'el'],
      format: 'json'
    }
  }
});

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },

  // Trailing slash preference
  trailingSlash: false,

  // Power by header
  poweredByHeader: false,

  // Compression
  compress: true,

  // Environment variables available to the browser
  env: {
    SITE_NAME: "Christos Apatsidis Portfolio",
  },
};

export default withNextIntl(nextConfig);
