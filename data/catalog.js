import products from './products.json';

export const categories = [
  { slug: 'muay-thai-shorts', name: 'Muay Thai Shorts' },
  { slug: 'boxing-gloves', name: 'Boxing Gloves' },
  { slug: 'mma-shorts', name: 'MMA Shorts' },
  {
    slug: 'martial-arts',
    name: 'Martial Arts Uniforms',
    children: [
      { slug: 'karate-uniforms', name: 'Karate Uniforms' },
      { slug: 'judo-uniforms', name: 'Judo Uniforms' },
      { slug: 'kung-fu-uniforms', name: 'Kung Fu Uniforms' },
      { slug: 'taekwondo-uniforms', name: 'Taekwondo Uniforms' },
      { slug: 'jiu-jitsu-uniforms-for-men', name: 'Jiu Jitsu Uniforms For Men' },
      { slug: 'jiu-jitsu-uniforms-for-women', name: 'Jiu Jitsu Uniforms For Women' },
      { slug: 'jiu-jitsu-uniforms-for-kid', name: 'Jiu Jitsu Uniforms For Kids' },
      { slug: 'karate-belts', name: 'Karate Belts' },
    ],
  },
];

const flat = [];
for (const c of categories) {
  flat.push({ slug: c.slug, name: c.name });
  (c.children || []).forEach((k) => flat.push({ ...k, parent: c.slug }));
}

export const allCategories = [{ slug: 'products', name: 'Products' }, ...flat];
export const getCategory = (slug) => allCategories.find((c) => c.slug === slug);

const nameOf = (slug) => flat.find((c) => c.slug === slug)?.name || slug;

export const allProducts = products.map((p) => ({
  ...p,
  name: `${nameOf(p.category)} ${String(p.n).padStart(2, '0')}`,
  categoryName: nameOf(p.category),
}));

export const getProduct = (slug) => allProducts.find((p) => p.slug === slug);

export function productsIn(slug) {
  if (slug === 'products') return allProducts;
  if (!flat.find((c) => c.slug === slug)) return [];
  const kids = flat.filter((c) => c.parent === slug).map((c) => c.slug);
  return allProducts.filter((p) => p.category === slug || kids.includes(p.category));
}

export function related(p, n = 4) {
  const same = allProducts.filter((x) => x.category === p.category && x.slug !== p.slug);
  const i = same.findIndex((x) => x.n > p.n);
  const rot = i < 0 ? same : [...same.slice(i), ...same.slice(0, i)];
  return rot.slice(0, n);
}

export function neighbours(p) {
  const list = productsIn(p.category);
  const i = list.findIndex((x) => x.slug === p.slug);
  return { prev: list[i - 1] || null, next: list[i + 1] || null };
}
