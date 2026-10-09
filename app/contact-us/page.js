import PageBanner from '@/components/PageBanner';
import EnquiryForm from '@/components/EnquiryForm';
import { site, telHref, waHref } from '@/data/site';

export const metadata = {
  title: 'Contact Us',
  description: `Send an enquiry to ${site.name} — custom MMA, boxing and martial arts gear, low MOQ, worldwide shipping.`,
};

export default function Contact() {
  return (
    <>
      <PageBanner title="Contact Us" />
      <div className="container">
        <div className="contact">
          <aside className="info" data-reveal="left">
            <h3>Location</h3>
            <p>{site.address}</p>
            <h3>Phone Number</h3>
            <p><a href={telHref(site.phone)}>{site.phone}</a></p>
            <h3>WhatsApp</h3>
            <p><a href={waHref} target="_blank" rel="noopener noreferrer">{site.whatsappDisplay}</a></p>
            <h3>Support</h3>
            <p><a href={`mailto:${site.email}`}>{site.email}</a></p>
            <h3>WORKING HOURS:</h3>
            <p>{site.hours}</p>
          </aside>
          <div className="form-box" data-reveal="right">
            <EnquiryForm />
          </div>
        </div>
      </div>
    </>
  );
}
