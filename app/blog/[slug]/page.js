import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Crumbs } from '@/components/PageBanner';
import { getPost, posts } from '@/data/posts';
import { site } from '@/data/site';

export const generateStaticParams = () => posts.map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) return {};
  return { title: p.title, description: p.excerpt, openGraph: { images: [p.image], type: 'article' } };
}

const inline = (s) => s.split(/(\*\*[^*]+\*\*)/g).map((t, i) => (t.startsWith('**') ? <strong key={i}>{t.slice(2, -2)}</strong> : t));

export default async function Post({ params }) {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) notFound();
  const others = posts.filter((x) => x.slug !== p.slug);
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: p.title,
    datePublished: p.date,
    image: `${site.domain}${p.image}`,
    author: { '@type': 'Organization', name: site.name },
  };
  return (
    <>
      <Crumbs items={[{ label: 'Blog', href: '/blog' }, { label: p.title }]} />
      <article className="prose article" style={{ paddingTop: 20 }}>
        <Image className="article-img" src={p.image} alt="" width={1024} height={683} priority />
        <h1 style={{ fontSize: 34 }}>{p.title}</h1>
        <div className="byline">{site.name} · {new Date(p.date).toLocaleDateString('en', { dateStyle: 'long', timeZone: 'UTC' })}</div>
        {p.body.map((b, i) => (b.startsWith('## ') ? <h2 key={i}>{b.slice(3)}</h2> : <p key={i}>{inline(b)}</p>))}
        <h2>Read more</h2>
        <ul>{others.map((o) => <li key={o.slug}><Link href={`/blog/${o.slug}`} style={{ color: 'var(--red)' }}>{o.title}</Link></li>)}</ul>
      </article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </>
  );
}
