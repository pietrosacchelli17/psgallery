import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // PS Gallery is served inside the Petrus Atelier site at /psgallery.
  basePath: "/psgallery",
  async redirects() {
    return [
      { source: "/", destination: "/psgallery", basePath: false, permanent: false },
      { source: "/about", destination: "/#about", permanent: false },
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
