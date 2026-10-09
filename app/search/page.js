import ProductCard from '@/components/ProductCard';
import { allProducts } from '@/data/catalog';

export const metadata = { title: 'Search', robots: { index: false } };

export default async function Search({ searchParams }) {
  const sp = await searchParams;
  const q = String(sp?.q || '').trim().toLowerCase();
  const terms = q.split(/\s+/).filter(Boolean);
  const hits = terms.length
    ? allProducts.filter((p) => terms.every((t) => `${p.name} ${p.categoryName}`.toLowerCase().includes(t)))
    : [];
  return (
    <div className="container" style={{ padding: '50px 20px 90px' }}>
      <h1 style={{ fontSize: 28, marginBottom: 30, fontWeight: 700 }}>
        {q ? `Search results for “${sp.q}”` : 'Search'} {q && <span style={{ color: '#888', fontSize: 16, fontWeight: 400 }}>({hits.length})</span>}
      </h1>
      {hits.length ? (
        <div className="shop-grid">{hits.map((p) => <ProductCard key={p.slug} p={p} />)}</div>
      ) : (
        <p className="empty">{q ? 'No products matched your search.' : 'Type something in the search box above.'}</p>
      )}
    </div>
  );
}
