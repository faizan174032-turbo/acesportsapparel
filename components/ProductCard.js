import Link from 'next/link';
import Image from 'next/image';
import EnquiryButton from './EnquiryButton';

export default function ProductCard({ p, showCategory = false, priority = false, reveal = true }) {
  return (
    <article className="card" data-reveal={reveal ? 'up' : undefined}>
      <Link href={`/product/${p.slug}`} className="thumb" aria-label={p.name}>
        <Image src={p.image} alt={p.name} fill sizes="(max-width: 900px) 50vw, 280px" priority={priority} />
      </Link>
      {showCategory && <span className="cat">{p.categoryName}</span>}
      <h3><Link href={`/product/${p.slug}`}>{p.name}</Link></h3>
      <EnquiryButton product={p.name} />
    </article>
  );
}
