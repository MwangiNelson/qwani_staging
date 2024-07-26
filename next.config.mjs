/** @type {import('next').NextConfig} */
const nextConfig = {
  //cdn.sanity.io domain for images
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
};

export default nextConfig;
