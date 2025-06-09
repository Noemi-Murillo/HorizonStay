const nextConfig = {
  images: {
    unoptimized: true, // Evita que next/image optimice durante build
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;