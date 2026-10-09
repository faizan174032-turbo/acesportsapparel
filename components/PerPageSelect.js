'use client';
import { usePathname, useRouter } from 'next/navigation';

export default function PerPageSelect({ value, options }) {
  const router = useRouter();
  const path = usePathname();
  return (
    <select
      className="select"
      aria-label="Products per page"
      value={value}
      onChange={(e) => router.push(e.target.value === String(options[0]) ? path : `${path}?per=${e.target.value}`)}
    >
      {options.map((o) => (
        <option key={o} value={o}>{o === 0 ? 'All' : o}</option>
      ))}
    </select>
  );
}
