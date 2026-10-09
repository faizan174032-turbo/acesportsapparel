import { allCategories, allProducts } from '@/data/catalog';
import { posts } from '@/data/posts';
import { site } from '@/data/site';

export default function sitemap() {
  const u = (p) => `${site.domain}${p}`;
  const staticPages = ['', '/about-us', '/contact-us', '/faqs', '/blog', '/privacy-policy', '/terms-conditions'];
  return [
    ...staticPages.map((p) => ({ url: u(p || '/'), priority: p === '' ? 1 : 0.6 })),
    ...allCategories.map((c) => ({ url: u(`/product-category/${c.slug}`), priority: 0.8 })),
    ...allProducts.map((p) => ({ url: u(`/product/${p.slug}`), priority: 0.7 })),
    ...posts.map((p) => ({ url: u(`/blog/${p.slug}`), priority: 0.5, lastModified: p.date })),
  ];
}
