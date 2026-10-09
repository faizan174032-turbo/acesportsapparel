import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container" style={{ textAlign: 'center', padding: '110px 20px' }}>
      <h1 style={{ fontSize: 72, color: 'var(--red)', fontWeight: 800 }}>404</h1>
      <p style={{ fontSize: 18, margin: '10px 0 28px' }}>Sorry, we couldn’t find that page.</p>
      <Link href="/" className="btn-red">Back to home</Link>
    </div>
  );
}
