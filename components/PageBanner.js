import Link from 'next/link';
import { Home } from './Icons';

export function Crumbs({ items }) {
  return (
    <div className="container">
      <nav className="crumbs" aria-label="Breadcrumb">
        <Link href="/" aria-label="Home"><Home /></Link>
        {items.map((it) => (
          <span key={it.label} style={{ display: 'contents' }}>
            <span className="sep">›</span>
            {it.href ? <Link href={it.href}>{it.label}</Link> : <span>{it.label}</span>}
          </span>
        ))}
      </nav>
    </div>
  );
}

export default function PageBanner({ pre, title, crumb }) {
  return (
    <>
      <Crumbs items={[{ label: crumb || title }]} />
      <section className="banner">
        {pre && <div className="pre">{pre}</div>}
        <h1>{title}</h1>
      </section>
    </>
  );
}
