/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['meet.francaassessoria.com', 'lh3.googleusercontent.com'],
  },
  // Correção para o erro do undici/firebase
  transpilePackages: ['undici', '@firebase/auth', 'firebase'],
  experimental: {
    esmExternals: 'loose',
  },
  webpack: (config, { isServer }) => {
    // Resolver problemas com módulos ESM
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };
    return config;
  },
}

module.exports = nextConfig
