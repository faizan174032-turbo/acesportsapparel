import PageBanner from '@/components/PageBanner';
import { faqGroups } from '@/data/faqs';

export const metadata = {
  title: 'FAQs',
  description: 'Answers about MOQ, samples, custom designs, materials and payment methods.',
};

export default function Faqs() {
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqGroups.flatMap((g) => g.items).map((i) => ({
      '@type': 'Question',
      name: i.q,
      acceptedAnswer: { '@type': 'Answer', text: i.a.replace(/<[^>]+>/g, '') },
    })),
  };
  return (
    <>
      <PageBanner pre="Frequently" title="Asked Questions" crumb="FAQs" />
      <div className="container">
        <div className="faqs">
          {faqGroups.map((g) => (
            <div key={g.title} data-reveal="up">
              <h2>{g.title}</h2>
              <div className="acc">
                {g.items.map((it, k) => (
                  <details key={it.q} open={k === 0}>
                    <summary>{it.q}</summary>
                    <div className="a" dangerouslySetInnerHTML={{ __html: it.a }} />
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </>
  );
}
