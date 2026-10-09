import Link from 'next/link';
import Image from 'next/image';
import HeroSlider from '@/components/HeroSlider';
import SectionTitle from '@/components/SectionTitle';
import ProductCard from '@/components/ProductCard';
import ProductSlider from '@/components/ProductSlider';
import { Arrow } from '@/components/Icons';
import { Truck, Support, Coins, Tag } from '@/components/Icons';
import { productsIn } from '@/data/catalog';
import { posts } from '@/data/posts';
import { site } from '@/data/site';

const slides = [
  { src: '/hero/slide-0.jpg', href: '/product-category/muay-thai-shorts', alt: 'Muay Thai Shorts' },
  { src: '/hero/slide-1.jpg', href: '/product-category/boxing-gloves', alt: 'Boxing Gloves' },
  { src: '/hero/slide-2.jpg', href: '/product-category/martial-arts', alt: 'Martial Arts Uniform' },
  { src: '/hero/slide-3.jpg', href: '/product-category/mma-shorts', alt: 'MMA Shorts' },
];

const features = [
  { Icon: Truck, t: 'Shipping All Over The World', d: 'Get delivery of your bulk orders all over the world.' },
  { Icon: Support, t: 'Customer Support 24/7', d: 'We provide convenient support of 24/7 for our customers.' },
  { Icon: Coins, t: '100% SECURE PAYMENT', d: 'We fully guarantee 100% SECURE PAYMENT with no doubt.' },
  { Icon: Tag, t: 'HIGH QUALITY PRODUCTS', d: 'High Quality Products guarantee' },
];

const tiles = [
  { href: '/product-category/martial-arts', alt: 'Martial Arts Uniform' },
  { href: '/product-category/muay-thai-shorts', alt: 'Muay Thai Shorts' },
  { href: '/product-category/boxing-gloves', alt: 'Boxing Gloves' },
  { href: '/product-category/mma-shorts', alt: 'Martial Arts Shorts' },
  { href: '/contact-us', alt: 'Team Uniforms' },
  { href: '/contact-us', alt: 'Gym Wear' },
];

const rows = [
  { title: 'Muay Thai Shorts', slug: 'muay-thai-shorts' },
  { title: 'Boxing Gloves', slug: 'boxing-gloves' },
  { title: 'MMA Shorts', slug: 'mma-shorts' },
  { title: 'Martial Arts Uniforms', slug: 'karate-uniforms' },
];

const fmt = (d) => {
  const x = new Date(d);
  return { day: String(x.getUTCDate()).padStart(2, '0'), mon: x.toLocaleString('en', { month: 'short', timeZone: 'UTC' }).toUpperCase() };
};

export default function Home() {
  return (
    <>
      <HeroSlider slides={slides} />

      <div className="container">
        <div className="features">
          {features.map(({ Icon, t, d }) => (
            <div className="feature" key={t} data-reveal="up">
              <Icon />
              <h3>{t}</h3>
              <p>{d}</p>
            </div>
          ))}
        </div>
      </div>

      <section className="about">
        <div className="container inner">
          <div data-reveal="left">
            <div className="eyebrow">About Us</div>
            <h2>{site.name}</h2>
            <p>
              Welcome to {site.name} — a dedicated manufacturer and exporter of top-quality MMA and boxing gear based in Sialkot, Pakistan,
              founded in {site.founded}. Growing out of Sialkot’s rich tradition of sports-goods manufacturing and global exports,{' '}
              {site.name} combines decades of local craftsmanship with modern manufacturing standards. Sialkot has long been recognized as a
              global hub for sports goods, supplying high-quality gear to clients worldwide.
            </p>
            <Link href="/contact-us" className="btn-red">Send Inquiry</Link>
          </div>
          <div className="circle-img" data-reveal="right">
            <Image src="/about/intro.jpg" alt="Athlete in the ring wearing boxing gloves" fill sizes="480px" />
          </div>
        </div>
      </section>

      <section className="section home-products" style={{ paddingTop: 30, paddingBottom: 10 }}>
        <div className="container">
          <SectionTitle title="Muay Thai Shorts" sub="Our Products" />
          <ProductSlider products={productsIn('muay-thai-shorts')} />
          <div style={{ textAlign: 'center', marginTop: 28 }}>
            <Link href="/product-category/muay-thai-shorts" className="link-arrow">View all Muay Thai Shorts <Arrow /></Link>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 30 }}>
        <div className="container">
          <SectionTitle title="Browse Our Categories" sub="View Our Products" as="h1" />
        </div>
        <div className="tiles" style={{ maxWidth: 1440, margin: '0 auto' }}>
          {tiles.map((t, i) => (
            <Link key={t.alt} href={t.href} data-reveal="zoom">
              <Image src={`/tiles/tile-${i}.jpg`} alt={t.alt} width={1024} height={1024} sizes="(max-width: 900px) 50vw, 33vw" />
            </Link>
          ))}
        </div>
      </section>

      {rows.slice(1).map((r) => (
        <section className="section home-products" key={r.slug} style={{ paddingTop: 20, paddingBottom: 30 }}>
          <div className="container">
            <SectionTitle title={r.title} sub="Our Products" />
            <div className="grid-4">
              {productsIn(r.slug).slice(0, 4).map((p) => <ProductCard key={p.slug} p={p} />)}
            </div>
          </div>
        </section>
      ))}

      <section className="section" style={{ paddingBottom: 20 }}>
        <div className="container">
          <SectionTitle title="Our Global Manufacturing Process" sub="High Quality Material Grantee" />
        </div>
        <div className="strip" data-reveal="up" style={{ maxWidth: 1440, margin: '0 auto' }}>
          <Image src="/sections/process.png" alt="Manufacturing process: concept review, sourcing, PPS approval, order confirmed, manufacturing, AQL inspection, global export, final delivery" width={1507} height={198} />
        </div>
      </section>

      <section className="section" style={{ paddingTop: 30, paddingBottom: 20 }}>
        <div className="container">
          <SectionTitle title="Our Certificates" sub="Our Certification Partners" />
          <div className="strip" data-reveal="up"><Image src="/sections/certificates.jpg" alt="ISO 9001, CE, SCCI and FBR certifications" width={1507} height={298} /></div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 30, paddingBottom: 20 }}>
        <div className="container">
          <SectionTitle title="Payment Options" sub="100% Secure Payment" />
          <div className="strip narrow" data-reveal="up"><Image src="/sections/payment.jpg" alt="Visa, bank transfer, Remitly, Western Union and MoneyGram" width={1186} height={189} /></div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 30 }}>
        <div className="container">
          <SectionTitle title="Delivery Options" sub="Shipping All Over The World" />
          <div className="strip" data-reveal="up"><Image src="/sections/delivery.png" alt="Delivery by DHL, EMS, UPS and FedEx with estimated delivery times" width={1201} height={339} /></div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 30, paddingBottom: 90 }}>
        <div className="container">
          <SectionTitle title="Daily Updates" sub="Our Blog" />
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
                  <Link href={`/blog/${p.slug}`} className="link-arrow red">Read More <Arrow /></Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
