/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { formats: ['image/avif', 'image/webp'] },
  poweredByHeader: false,
  // hides the Next.js dev-only badge/menu in the bottom-left corner (it never appears in production)
  devIndicators: false,
};
export default nextConfig;
