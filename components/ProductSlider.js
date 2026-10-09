'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import ProductCard from './ProductCard';
import { Chevron } from './Icons';

export default function ProductSlider({ products, autoplay = 4500 }) {
  const track = useRef(null);
  const [paused, setPaused] = useState(false);
  const [edge, setEdge] = useState({ start: true, end: false });

  const update = useCallback(() => {
    const el = track.current;
    if (!el) return;
    setEdge({ start: el.scrollLeft <= 4, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4 });
  }, []);

  const step = useCallback((dir) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector('.slide-card');
    const w = card ? card.getBoundingClientRect().width + 20 : el.clientWidth;
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
    if (dir > 0 && atEnd) el.scrollTo({ left: 0, behavior: 'smooth' });
    else el.scrollBy({ left: dir * w, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    update();
    const el = track.current;
    el.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      el.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [update]);

  useEffect(() => {
    if (paused || !autoplay || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = setInterval(() => step(1), autoplay);
    return () => clearInterval(t);
  }, [paused, autoplay, step]);

  return (
    <div
      className="pslider"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      aria-roledescription="carousel"
    >
      <button className="ps-arrow prev" onClick={() => step(-1)} disabled={edge.start} aria-label="Previous products">
        <Chevron dir="left" />
      </button>
      <div className="ps-track" ref={track}>
        {products.map((p) => (
          <div className="slide-card" key={p.slug}>
            <ProductCard p={p} showCategory reveal={false} />
          </div>
        ))}
      </div>
      <button className="ps-arrow next" onClick={() => step(1)} aria-label="Next products">
        <Chevron />
      </button>
    </div>
  );
}
