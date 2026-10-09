import Link from 'next/link';
import Image from 'next/image';
import PageBanner from '@/components/PageBanner';
import { Arrow } from '@/components/Icons';
import { site } from '@/data/site';

export const metadata = {
  title: 'About Us',
  description: `Learn about ${site.name}, a manufacturer and exporter of MMA, boxing and martial arts gear in Sialkot, Pakistan.`,
};

export default function About() {
  return (
    <>
      <PageBanner pre={`Welcome to ${site.name}`} title="About Us" />

      <section className="about" style={{ marginTop: 60 }}>
        <div className="container inner">
          <div>
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

      <div className="about-page-wrap" style={{ marginTop: 40 }}>
        <section className="split" data-reveal="up">
          <Image src="/about/quality.jpg" alt="Red and black boxing gloves" width={1024} height={682} />
          <div className="text">
            <h2>Production &amp; Quality</h2>
            <p>
              At {site.name}, production excellence and uncompromised quality are at the heart of everything we do. Since our establishment
              in {site.founded}, we have continuously refined our manufacturing processes to deliver MMA and Boxing equipment that meets
              international performance standards. Advanced Production Facility Our production unit in Sialkot is equipped with modern
              machinery, skilled craftsmen, and specialized departments for cutting, stitching, molding, finishing, and quality inspection.
              Each product is manufactured using premium-grade materials including genuine leather, PU, high-density foams, and durable
              textiles to ensure strength, comfort, and long-lasting performance.
            </p>
            <Link href="/contact-us" className="link-arrow">Send Inquiry <Arrow /></Link>
          </div>
        </section>

        <section className="split flip" data-reveal="up">
          <div className="text">
            <h2>Our Passion</h2>
            <p>
              We are well known for our products in Australia, USA and New Zealand as major wholesalers to leading retail shopping stores
              with number of satisfied and ever increasing customers. {site.name} is well renowned for its high quality MMA Shorts and
              Boxing gloves. The production units are fully equipped to manufacturing. Our team is skilled, devoted and works diligently to
              produce the products which reflects their mastery over craftsmanship.
            </p>
            <Link href="/contact-us" className="link-arrow">Send Inquiry <Arrow /></Link>
          </div>
          <Image src="/about/passion.jpg" alt="Boxer with hand wraps in a defensive stance" width={1024} height={683} />
        </section>
      </div>
    </>
  );
}
