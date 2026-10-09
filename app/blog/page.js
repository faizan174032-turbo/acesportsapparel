import Link from 'next/link';
import Image from 'next/image';
import SectionTitle from '@/components/SectionTitle';
import { Crumbs } from '@/components/PageBanner';
import { posts } from '@/data/posts';
import { Arrow } from '@/components/Icons';

export const metadata = { title: 'Blog', description: 'Guides and news on boxing, MMA and martial arts gear.' };

const fmt = (d) => {
  const x = new Date(d);
  return { day: String(x.getUTCDate()).padStart(2, '0'), mon: x.toLocaleString('en', { month: 'short', timeZone: 'UTC' }).toUpperCase() };
};

export default function Blog() {
  return (
    <>
      <Crumbs items={[{ label: 'Blog' }]} />
      <div className="container" style={{ padding: '40px 20px 100px' }}>
        <SectionTitle title="Daily Updates" sub="Our Blog" as="h1" />
        <div className="posts">
          {posts.map((p) => {
            const d = fmt(p.date);
            return (
              <article className="post" key={p.slug} data-reveal="up">
                <div className="media">
                  <span className="date-box">{d.day}<small>{d.mon}</small></span>
                  <Image src={p.image} alt="" fill sizes="(max-width: 900px) 100vw, 340px" />
                </div>
                <h3><Link href={`/blog/${p.slug}`}>{p.title}</Link></h3>
                <p style={{ color: '#666', fontSize: 14 }}>{p.excerpt}</p>
                <Link href={`/blog/${p.slug}`} className="link-arrow red">Read More <Arrow /></Link>
              </article>
            );
          })}
        </div>
      </div>
    </>
  );
}
