import Link from 'next/link';
import Image from 'next/image';
import { site, telHref, waHref } from '@/data/site';
import { Instagram, WhatsApp } from './Icons';

export const aboutBlurb = `Welcome to ${site.name} — a dedicated manufacturer and exporter of top-quality MMA and boxing gear based in Sialkot, Pakistan, founded in ${site.founded}. Growing out of Sialkot’s rich tradition of sports-goods manufacturing and global exports, ${site.name} combines decades of local craftsmanship with modern manufacturing standards.`;

export default function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="container">
          <div className="cols">
            <div className="flogo">
              <Image src="/logo.png" alt={site.name} width={400} height={365} style={{ width: 155, height: 'auto' }} />
            </div>
            <div>
              <h4>Get In Touch</h4>
              <div className="lbl">Phone</div>
              <div className="val"><a href={telHref(site.phone)}>{site.phone}</a></div>
              <div className="lbl" style={{ marginTop: 16 }}>WhatsApp</div>
              <div className="val"><a href={waHref} target="_blank" rel="noopener noreferrer">{site.whatsappDisplay}</a></div>
              <div className="lbl" style={{ marginTop: 16 }}>Email</div>
              <div className="val"><a href={`mailto:${site.email}`}>{site.email}</a></div>
              <div className="lbl" style={{ marginTop: 16 }}>Address</div>
              <div className="val dim">{site.address}</div>
              <div className="lbl" style={{ marginTop: 16 }}>Working days / hours:</div>
              <div className="val dim">{site.hours}</div>
            </div>
            <div>
              <h4>My Account</h4>
              <ul>
                <li><Link href="/contact-us">Contact Us</Link></li>
                <li><Link href="/about-us">About Us</Link></li>
                <li><Link href="/privacy-policy">Privacy Policy</Link></li>
                <li><Link href="/terms-conditions">Terms &amp; conditions</Link></li>
                <li><Link href="/blog">Blog</Link></li>
                <li><Link href="/faqs">FAQs</Link></li>
              </ul>
            </div>
            <div className="about-col">
              <h4>About Us</h4>
              <p>{aboutBlurb}</p>
              <div className="socials">
                <a href={site.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Instagram /></a>
                <a href={waHref} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><WhatsApp /></a>
              </div>
            </div>
          </div>
        </div>
        <div className="copy">Copyright © {new Date().getFullYear()} {site.name}. All Rights Reserved.</div>
      </footer>
      <a className="wa" href={waHref} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
        <WhatsApp />
      </a>
    </>
  );
}
