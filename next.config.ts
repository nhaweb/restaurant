import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Standalone output required for Fly.io / Docker production */
  output: "standalone",
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/shop",
        destination: "/menu",
        permanent: true,
      },
      {
        source: "/checkout",
        destination: "/reservation",
        permanent: false,
      },
      {
        source: "/checkout/success",
        destination: "/reservation",
        permanent: false,
      },
      {
        source: "/checkout/cancel",
        destination: "/reservation",
        permanent: false,
      },
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
