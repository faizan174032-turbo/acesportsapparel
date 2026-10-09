import Link from 'next/link';
import { notFound } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import { allCategories, getCategory, productsIn } from '@/data/catalog';
import { Arrow } from '@/components/Icons';
import PerPageSelect from '@/components/PerPageSelect';

const SIZES = [24, 48, 96, 0]; // 0 = all

export function generateStaticParams() {
  return allCategories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const cat = getCategory(slug);
  if (!cat) return {};
  const title = cat.slug === 'products' ? 'Products' : cat.name;
  return {
    title,
    description: `Browse ${cat.name === 'Products' ? 'all' : cat.name} — made to order by Ace Sports with custom branding and low MOQ.`,
    alternates: { canonical: `/product-category/${slug}` },
  };
}

export default async function Category({ params, searchParams }) {
  const { slug } = await params;
  const sp = await searchParams;
  const cat = getCategory(slug);
  if (!cat) notFound();

  const all = productsIn(slug);
  const per = SIZES.includes(parseInt(sp?.per, 10)) ? parseInt(sp.per, 10) : SIZES[0];
  const PER_PAGE = per === 0 ? Math.max(all.length, 1) : per;
  const pages = Math.max(1, Math.ceil(all.length / PER_PAGE));
  const page = Math.min(pages, Math.max(1, parseInt(sp?.page, 10) || 1));
  const start = (page - 1) * PER_PAGE;
  const items = all.slice(start, start + PER_PAGE);
  const href = (n) => {
    const q = new URLSearchParams();
    if (per !== SIZES[0]) q.set('per', per);
    if (n > 1) q.set('page', n);
    const qs = q.toString();
    return `/product-category/${slug}${qs ? `?${qs}` : ''}`;
  };

  return (
    <div className="container">
      <h1 style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>{cat.name}</h1>
      <div className="toolbar" data-reveal="up">
        <div className="left">
          <select className="select" aria-label="Select price" defaultValue="">
            <option value="">Select Price</option>
            <option disabled>Prices on request</option>
          </select>
          <select className="select" aria-label="Sorting" defaultValue="default">
            <option value="default">Default sorting</option>
          </select>
        </div>
        <div className="right">
          <span className="show">Show :</span>
          <PerPageSelect value={per} options={SIZES} />
        </div>
      </div>

      {items.length === 0 ? (
        <p className="empty">No products found in this category yet. <Link href="/contact-us" style={{ color: 'var(--red)' }}>Send us an enquiry</Link> for custom orders.</p>
      ) : (
        <div className="shop-grid">
          {items.map((p, i) => <ProductCard key={p.slug} p={p} priority={i < 4} />)}
        </div>
      )}

      <div className="pager">
        <span>Showing {all.length ? start + 1 : 0}–{Math.min(start + PER_PAGE, all.length)} of {all.length} Products</span>
        {pages > 1 && (
          <nav aria-label="Pagination">
            {page > 1 ? <Link href={href(page - 1)}><Arrow dir="left" /> Prev</Link> : <span className="dis"><Arrow dir="left" /> Prev</span>}
            {Array.from({ length: pages }, (_, k) => k + 1).map((n) => (
              <Link key={n} href={href(n)} className={`num${n === page ? ' on' : ''}`} aria-current={n === page ? 'page' : undefined}>{n}</Link>
            ))}
            {page < pages ? <Link href={href(page + 1)}>Next <Arrow /></Link> : <span className="dis">Next <Arrow /></span>}
          </nav>
        )}
      </div>
    </div>
  );
}
