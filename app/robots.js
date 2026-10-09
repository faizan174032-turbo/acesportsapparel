import { site } from '@/data/site';

export default function robots() {
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/api/', '/search'] },
    sitemap: `${site.domain}/sitemap.xml`,
  };
}
