'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

// Fades/slides in any element marked with [data-reveal] when it scrolls into view.
export default function RevealObserver() {
  const path = usePathname();

  useEffect(() => {
    const els = [...document.querySelectorAll('[data-reveal]:not(.in)')];
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      els.forEach((e) => e.classList.add('in'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add('in');
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, [path]);

  useEffect(() => {
    const header = document.querySelector('.header');
    const onScroll = () => header?.classList.toggle('scrolled', window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return null;
}
