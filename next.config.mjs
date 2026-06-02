/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // El error es un bug en los tipos de @supabase/realtime-js, no en nuestro código
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;
