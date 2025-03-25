/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: [`${process.env.NEXT_PUBLIC_IMAGE_URL}`],
  },
};

export default nextConfig;
