const CopyPlugin = require("copy-webpack-plugin");
const withPWA = require("next-pwa");

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    "@uiw/react-md-editor",
    "@uiw/react-markdown-preview",
  ],
  images: {
    remotePatterns: [
      {
        hostname: "firebasestorage.googleapis.com",
      },
      {
        hostname: "localhost",
      },
    ],
  },
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
  webpack: (config) => {
    config.plugins.push(
      new CopyPlugin({
        patterns: [
          {
            from: "node_modules/pdfjs-dist/build",
            to: "../public/noprecache/pdfjs/",
          },
        ],
      })
    );
    return config;
  },
};

module.exports = withPWA({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  publicExcludes: ['!noprecache/**/*']
})(nextConfig);
