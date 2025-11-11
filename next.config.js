import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import("next").NextConfig} */
const config = {
  images: {
    domains: ["i.pinimg.com", "avatars.githubusercontent.com", "i.scdn.co", "upload.wikimedia.org", "user-images.githubusercontent.com", "mdxjs.com", "raw.githubusercontent.com", "github.com", "cdn.jsdelivr.net", "www.svgrepo.com", "images.unsplash.com"],
    formats: ["image/avif", "image/webp"], // Modern image formats for better compression
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840], // Responsive breakpoints
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384], // Icon/thumbnail sizes
    minimumCacheTTL: 60, // Cache images for 60 seconds minimum
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  // Production optimizations
  compress: true, // Enable gzip compression
  poweredByHeader: false, // Remove X-Powered-By header for security

  // Additional performance optimizations
  reactStrictMode: true,

  // Experimental features for better performance
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react', 'react-icons'],
  },

  // Webpack optimizations for code splitting
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      // Aggressive code splitting for production client bundles
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            default: false,
            vendors: false,
            // Vendor chunk for node_modules
            vendor: {
              name: 'vendor',
              chunks: 'all',
              test: /node_modules/,
              priority: 20
            },
            // Common chunk for shared code
            common: {
              name: 'common',
              minChunks: 2,
              chunks: 'all',
              priority: 10,
              reuseExistingChunk: true,
              enforce: true
            },
            // Framer Motion in separate chunk (large library)
            framerMotion: {
              name: 'framer-motion',
              test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
              priority: 30,
              reuseExistingChunk: true
            },
            // React and related libraries
            react: {
              name: 'react-vendor',
              test: /[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/,
              priority: 40,
              reuseExistingChunk: true
            },
            // Icons and UI libraries
            icons: {
              name: 'icons',
              test: /[\\/]node_modules[\\/](lucide-react|react-icons)[\\/]/,
              priority: 25,
              reuseExistingChunk: true
            }
          }
        }
      };
    }
    return config;
  },
  async rewrites() {
    return [
      {
        source: "/ingest/static/:path*",
        destination: "https://us-assets.i.posthog.com/static/:path*",
      },
      {
        source: "/ingest/:path*",
        destination: "https://us.i.posthog.com/:path*",
      },
      {
        source: "/ingest/decide",
        destination: "https://us.i.posthog.com/decide",
      },
    ];
  },
  // This is required to support PostHog trailing slash API requests
  skipTrailingSlashRedirect: true,
};

export default withBundleAnalyzer(config);
