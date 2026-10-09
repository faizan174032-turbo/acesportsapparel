'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Chevron } from './Icons';

export default function HeroSlider({ slides }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = slides.length;

  useEffect(() => {
    if (paused || n < 2) return;
    const t = setInterval(() => setI((v) => (v + 1) % n), 5000);
    return () => clearInterval(t);
  }, [paused, n]);

  return (
    <section className="hero" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} aria-roledescription="carousel" aria-label="Featured products">
      <div className="slides">
        {slides.map((s, k) => (
          <Link key={s.href} href={s.href} className={`slide${k === i ? ' on' : ''}`} aria-hidden={k !== i} tabIndex={k === i ? 0 : -1}>
            <Image src={s.src} alt={s.alt} fill sizes="100vw" priority={k === 0} />
          </Link>
        ))}
      </div>
      <button className="arrow prev" onClick={() => setI((i - 1 + n) % n)} aria-label="Previous slide"><Chevron dir="left" /></button>
      <button className="arrow next" onClick={() => setI((i + 1) % n)} aria-label="Next slide"><Chevron /></button>
      <div className="dots">
        {slides.map((s, k) => (
          <button key={s.href} className={k === i ? 'on' : ''} onClick={() => setI(k)} aria-label={`Go to slide ${k + 1}`} />
        ))}
      </div>
    </section>
  );
}
