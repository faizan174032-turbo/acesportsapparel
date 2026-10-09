import { NextResponse } from 'next/server';
import { site } from '@/data/site';

export const runtime = 'nodejs';

const clean = (v, max) => String(v ?? '').replace(/[\u0000-\u001f\u007f]/g, ' ').trim().slice(0, max);
const esc = (s) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

// Best-effort per-instance rate limit (serverless instances are short lived, so this only stops bursts).
const hits = new Map();
function limited(ip) {
  const now = Date.now();
  const arr = (hits.get(ip) || []).filter((t) => now - t < 10 * 60 * 1000);
  arr.push(now);
  hits.set(ip, arr);
  return arr.length > 5;
}

export async function POST(req) {
  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  // Honeypot: bots fill this hidden field.
  if (body.website) return NextResponse.json({ ok: true });

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  if (limited(ip)) return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });

  const d = {
    name: clean(body.name, 120),
    email: clean(body.email, 160),
    phone: clean(body.phone, 40),
    quantity: clean(body.quantity, 40),
    product: clean(body.product, 160),
    message: String(body.message ?? '').replace(/\u0000/g, '').trim().slice(0, 3000),
  };
  if (!d.name || !d.message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email)) {
    return NextResponse.json({ error: 'Please fill in your name, a valid email and a message.' }, { status: 400 });
  }

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.log('[enquiry]', JSON.stringify(d));
    return NextResponse.json({ ok: true });
  }

  const rows = [['Name', d.name], ['Email', d.email], ['Phone', d.phone], ['Product', d.product], ['Quantity', d.quantity]]
    .filter(([, v]) => v)
    .map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0"><b>${k}</b></td><td>${esc(v)}</td></tr>`)
    .join('');
  const html = `<table>${rows}</table><p style="white-space:pre-wrap">${esc(d.message)}</p>`;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: process.env.ENQUIRY_FROM || `${site.name} <onboarding@resend.dev>`,
      to: [process.env.ENQUIRY_TO || site.email],
      reply_to: d.email,
      subject: `New enquiry${d.product ? ` – ${d.product}` : ''} from ${d.name}`,
      html,
    }),
  });
  if (!res.ok) {
    console.error('[enquiry] resend failed', res.status, await res.text());
    return NextResponse.json({ error: 'We could not send your enquiry right now. Please email or WhatsApp us.' }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
