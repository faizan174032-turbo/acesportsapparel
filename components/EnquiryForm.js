'use client';
import { useState } from 'react';

export default function EnquiryForm({ product = '', compact = false }) {
  const [state, setState] = useState({ status: 'idle', msg: '' });

  async function onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setState({ status: 'sending', msg: '' });
    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, product }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || 'Something went wrong. Please try again.');
      form.reset();
      setState({ status: 'ok', msg: 'Thank you! Your enquiry has been sent. We will contact you shortly.' });
    } catch (err) {
      setState({ status: 'err', msg: err.message });
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <input className="hp" tabIndex={-1} autoComplete="off" name="website" aria-hidden="true" />
      <div className={compact ? 'row' : undefined}>
        <div className="field">
          <label htmlFor={`n-${compact}`}>Name</label>
          <input id={`n-${compact}`} name="name" required maxLength={120} autoComplete="name" />
        </div>
        <div className="field">
          <label htmlFor={`e-${compact}`}>Email</label>
          <input id={`e-${compact}`} name="email" type="email" required maxLength={160} autoComplete="email" />
        </div>
      </div>
      {compact && (
        <div className="row">
          <div className="field">
            <label htmlFor="p-c">Phone / WhatsApp</label>
            <input id="p-c" name="phone" maxLength={40} autoComplete="tel" />
          </div>
          <div className="field">
            <label htmlFor="q-c">Quantity</label>
            <input id="q-c" name="quantity" maxLength={40} placeholder="e.g. 100 pcs" />
          </div>
        </div>
      )}
      <div className="field">
        <label htmlFor={`m-${compact}`}>Message</label>
        <textarea id={`m-${compact}`} name="message" required maxLength={3000} />
      </div>
      <button className="form-btn" disabled={state.status === 'sending'}>
        {state.status === 'sending' ? 'Sending…' : 'Send Inquiry'}
      </button>
      {state.msg && <p className={`notice ${state.status}`} role="status">{state.msg}</p>}
    </form>
  );
}
