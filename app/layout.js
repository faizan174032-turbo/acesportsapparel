import { Poppins } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import EnquiryProvider from '@/components/EnquiryProvider';
import RevealObserver from '@/components/RevealObserver';
import { site } from '@/data/site';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL(site.domain),
  title: { default: `${site.name} – ${site.tagline}`, template: `%s – ${site.name}` },
  description: `${site.name} is a manufacturer and exporter of MMA, boxing, Muay Thai and martial arts gear from Sialkot, Pakistan. Custom designs, low MOQ, worldwide shipping.`,
  openGraph: { siteName: site.name, type: 'website', images: ['/hero/slide-0.jpg'] },
  icons: { icon: '/icon.png' },
};

export const viewport = { themeColor: '#e4121d' };

const orgLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: site.name,
  url: site.domain,
  logo: `${site.domain}/logo.png`,
  email: site.email,
  telephone: site.phone,
  sameAs: [site.instagram],
  address: { '@type': 'PostalAddress', streetAddress: 'Fateh Gar', addressLocality: 'Sialkot', addressCountry: 'PK' },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={poppins.variable}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <RevealObserver />
        <EnquiryProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </EnquiryProvider>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }} />
      </body>
    </html>
  );
}
