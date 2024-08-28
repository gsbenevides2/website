const CopyPlugin = require("copy-webpack-plugin");
const withPWA = require("next-pwa");

/** @type {import('next').NextConfig} */
const nextConfig = {
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
  webpack: (config) => {
    config.plugins.push(
      new CopyPlugin({
        patterns: [
          { from: "node_modules/pdfjs-dist/build", to: "../public/pdfjs/" },
        ],
      })
    );
    return config;
  },
};

module.exports = withPWA({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
})(nextConfig);
