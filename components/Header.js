'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { site, telHref, waHref } from '@/data/site';
import { categories } from '@/data/catalog';
import { Pin, Info, Phone, Search, Caret, Menu, WhatsApp } from './Icons';

export default function Header() {
  const path = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');

  useEffect(() => setOpen(false), [path]);

  const is = (href) => (href === '/' ? path === '/' : path.startsWith(href));
  const submit = (e) => {
    e.preventDefault();
    if (q.trim()) router.push(`/search?q=${encodeURIComponent(q.trim())}`);
  };

  return (
    <>
      <div className="topbar">
        <div className="container">
          <div className="group left">
            <span className="item"><Pin /> {site.address}</span>
            <span className="item"><Info /> Shipping All Over The World</span>
          </div>
          <div className="group">
            <a className="item" href={telHref(site.phone)}><Phone /> Call Us: {site.phone}</a>
            <a className="item" href={waHref} target="_blank" rel="noopener noreferrer"><WhatsApp /> WhatsApp: {site.whatsappDisplay}</a>
          </div>
        </div>
      </div>

      <header className="header">
        <div className="container">
          <Link href="/" className="logo" aria-label={`${site.name} home`}>
            <Image src="/logo.png" alt={site.name} width={400} height={365} priority style={{ width: 112, height: "auto" }} />
          </Link>

          {open && <div className="scrim" onClick={() => setOpen(false)} />}
          <div className={`nav-wrap${open ? ' open' : ''}`}>
              <button className="close-nav" onClick={() => setOpen(false)} aria-label="Close menu">×</button>
              <ul className="nav">
                <li><Link href="/" className={is('/') ? 'active' : ''}>Home</Link></li>
                <li><Link href="/about-us" className={is('/about-us') ? 'active' : ''}>About Us</Link></li>
                <li>
                  <Link href="/product-category/products" className={is('/product') ? 'active' : ''}>
                    Products <Caret className="caret" />
                  </Link>
                  <div className="dropdown">
                    {categories.map((c) => (
                      <div key={c.slug}>
                        <Link href={`/product-category/${c.slug}`}>{c.name}</Link>
                        {c.children && (
                          <div className="sub">
                            {c.children.map((k) => (
                              <Link key={k.slug} href={`/product-category/${k.slug}`}>{k.name}</Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </li>
                <li><Link href="/contact-us" className={is('/contact-us') ? 'active' : ''}>Contact Us</Link></li>
              </ul>
              <form className="search" onSubmit={submit} role="search">
                <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search products" aria-label="Search products" />
                <button aria-label="Search"><Search /></button>
              </form>
          </div>

          <button className="burger" onClick={() => setOpen(true)} aria-label="Open menu"><Menu /></button>
        </div>
      </header>
    </>
  );
}
