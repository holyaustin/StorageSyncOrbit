/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Optional: disable only during builds
  },
  typescript: {
    ignoreBuildErrors: true, // Optional: disable TypeScript errors too
  },
};
export default nextConfig;
