'use client';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import EnquiryForm from './EnquiryForm';

const Ctx = createContext({ open: () => {} });
export const useEnquiry = () => useContext(Ctx);

export default function EnquiryProvider({ children }) {
  const [product, setProduct] = useState(null); // null = closed, '' = general, 'name' = product
  const open = useCallback((name = '') => setProduct(name), []);
  const close = () => setProduct(null);

  useEffect(() => {
    if (product === null) return;
    const onKey = (e) => e.key === 'Escape' && close();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [product]);

  return (
    <Ctx.Provider value={{ open }}>
      {children}
      {product !== null && (
        <div className="overlay" onClick={close}>
          <div className="modal" role="dialog" aria-modal="true" aria-label="Product enquiry" onClick={(e) => e.stopPropagation()}>
            <button className="close" onClick={close} aria-label="Close">×</button>
            <h3>Product Enquiry</h3>
            <p className="for">{product ? `For: ${product}` : 'Tell us what you need and we will get back to you.'}</p>
            <EnquiryForm product={product} compact />
          </div>
        </div>
      )}
    </Ctx.Provider>
  );
}
