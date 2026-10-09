'use client';
import { useEnquiry } from './EnquiryProvider';

export default function EnquiryButton({ product = '', children = 'Enquiry!', className = 'btn-enquiry' }) {
  const { open } = useEnquiry();
  return (
    <button type="button" className={className} onClick={() => open(product)}>
      {children}
    </button>
  );
}
