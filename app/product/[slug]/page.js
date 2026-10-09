import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import EnquiryButton from '@/components/EnquiryButton';
import ProductCard from '@/components/ProductCard';
import SectionTitle from '@/components/SectionTitle';
import { Home, Arrow, Facebook, XIcon, Pinterest } from '@/components/Icons';
import { allProducts, getProduct, neighbours, related } from '@/data/catalog';
import { site } from '@/data/site';

export function generateStaticParams() {
  return allProducts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return {};
  return {
    title: p.name,
    description: `${p.name} — custom-made by ${site.name}. Low MOQ, your logo and designs, worldwide shipping.`,
    alternates: { canonical: `/product/${slug}` },
    openGraph: { images: [p.image] },
  };
}

export default async function Product({ params }) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) notFound();
  const { prev, next } = neighbours(p);
  const rel = related(p);
  const url = encodeURIComponent(`${site.domain}/product/${p.slug}`);

  const ld = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: p.name,
    image: `${site.domain}${p.image}`,
    category: p.categoryName,
    brand: { '@type': 'Brand', name: site.name },
    description: `${p.name} — custom-made by ${site.name}.`,
  };

  return (
    <>
      <div className="container">
        <div className="pdp">
          <div className="gallery" data-reveal="left">
            <div className="thumbs">
              <button aria-label="Product image"><Image src={p.image} alt="" width={110} height={110} /></button>
            </div>
            <div className="main">
              <Image src={p.image} alt={p.name} fill sizes="(max-width: 900px) 100vw, 560px" priority />
            </div>
          </div>

          <div data-reveal="right">
            <div className="top">
              <div className="crumb">
                <Link href="/" aria-label="Home"><Home style={{ width: 15 }} /></Link> ›
                <Link href={`/product-category/${p.category}`}>{p.categoryName}</Link> ›
                <span style={{ color: '#222' }}>{p.name}</span>
              </div>
              <div className="pn">
                {prev ? <Link href={`/product/${prev.slug}`}><Arrow dir="left" /> Prev</Link> : <span className="dis"><Arrow dir="left" /> Prev</span>}
                {next ? <Link href={`/product/${next.slug}`}>Next <Arrow /></Link> : <span className="dis">Next <Arrow /></span>}
              </div>
            </div>
            <h1>{p.name}</h1>
            <div className="meta">
              Category: <Link href={`/product-category/${p.category}`}>{p.categoryName}</Link>
            </div>
            <EnquiryButton product={p.name} />
            <div className="share">
              <a href={`https://www.facebook.com/sharer/sharer.php?u=${url}`} target="_blank" rel="noopener noreferrer" aria-label="Share on Facebook"><Facebook /></a>
              <a href={`https://twitter.com/intent/tweet?url=${url}`} target="_blank" rel="noopener noreferrer" aria-label="Share on X"><XIcon /></a>
              <a href={`https://pinterest.com/pin/create/button/?url=${url}&media=${encodeURIComponent(site.domain + p.image)}`} target="_blank" rel="noopener noreferrer" aria-label="Share on Pinterest"><Pinterest /></a>
            </div>
          </div>
        </div>

        <div className="tabs"><span>Product Details</span></div>
        <div className="details">
          <ul>
            <li>Made to order in Sialkot, Pakistan — your logo, colours and sizes.</li>
            <li>Standard MOQ: 50 pieces per design (smaller quantities can be discussed).</li>
            <li>Samples available before bulk orders.</li>
            <li>Worldwide shipping via DHL, EMS, UPS and FedEx.</li>
            <li>Prices depend on design, material and quantity — send an enquiry for a quote.</li>
          </ul>
        </div>

        {rel.length > 0 && (
          <section className="related" data-reveal="up">
            <h2>Related Products</h2>
            <div className="grid-4">{rel.map((r) => <ProductCard key={r.slug} p={r} />)}</div>
          </section>
        )}
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </>
  );
}
