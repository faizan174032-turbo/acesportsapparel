# Ace Sports website (Next.js)

Rebuild of the old Deklain Sports site for acesportsapparel.com.

- `npm install` then `npm run dev` (http://localhost:3000) or `npm run build`
- Business details (phones, email, address, social links): `data/site.js`
- Products: `data/products.json` (images in `public/products`), categories in `data/catalog.js`
- Blog posts: `data/posts.js`, FAQs: `data/faqs.js`, legal text: `data/legal.js`
- Enquiry form emails via Resend: copy `.env.example` to `.env.local` (set the same vars in Vercel)

## Deploy on Vercel
Import the repo, set **Root Directory** to `web`, add the env vars, deploy, then add the acesportsapparel.com domain.
