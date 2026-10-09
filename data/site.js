// Single place for all business details.
export const site = {
  name: 'Ace Sports',
  domain: 'https://acesportsapparel.com',
  tagline: 'Exporter & Manufacturer of All Kinds of Sportswear',
  address: 'Fateh Gar, Sialkot, Pakistan',
  phone: '+92 323 5901940',
  whatsappDisplay: '+1 (207) 955-7555',
  whatsapp: '12079557555',
  email: 'info@acesportsapparel.com',
  hours: '24/7',
  founded: 2001,
  instagram: 'https://www.instagram.com/acesports_apparel/',
};

export const telHref = (p) => 'tel:' + p.replace(/[^+\d]/g, '');
export const waHref = `https://wa.me/${site.whatsapp}`;
