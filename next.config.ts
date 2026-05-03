import { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: [
    "@uiw/react-md-editor",
    "@uiw/react-markdown-preview",
    "next-mdx-remote",
  ],
  outputFileTracingExcludes: {
    "/api/**": [
      "**/node_modules/**",
      "**/.next/**",
      "**/.vercel/**",
      "**/public/**",
    ],
  },
  images: {
    dangerouslyAllowLocalIP: true,
    remotePatterns: [
      {
        hostname: "firebasestorage.googleapis.com",
      },
      {
        hostname: "localhost",
      },
    ],
  },
};

export default nextConfig;
