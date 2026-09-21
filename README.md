# Cranford Realty Group website

A simple website for buying, selling, and renting homes in Middle Georgia.

You do **not** need the old GoHighLevel site anymore. This one is meant to be used like a phone book: call, text, or send a note.

## How to look at it on your computer

1. Open this project in Cursor.
2. In the terminal, run:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000).

## How to use the live site (once it is published)

- **Call** the gold button or the number on every page.
- **Text** the bar at the bottom of the phone screen.
- **English / Español** is the EN | ES switch at the top.
- **Homes** shows your listings. Each home has a form and a call button.
- **Contact** is the only place someone needs for questions. There is no extra maze of pages.

The first time someone uses the contact form, FormSubmit will send a confirmation email to `info@Cranford-Realty-Group.com`. Click that email once so messages start arriving.

## How to change a listing

Open [http://localhost:3020/admin](http://localhost:3020/admin) (or `/admin` on the live site). Log in with the team password.

- Add a home, change a price, upload a photo, or mark it sold.
- This page is not in the public menu. Bookmark it.

Phone numbers, the office address, and the team are in `src/content/site.ts`.

## How to put this on cranfordrealtygroup.com

1. Push this project to GitHub (already connected).
2. Create a free account at [vercel.com](https://vercel.com) and import the GitHub repo.
3. In GoDaddy (where `.com` is registered), point `cranfordrealtygroup.com` to Vercel. Vercel shows the exact DNS steps.
4. Keep `cranfordrealtygroup.org` as a redirect to `.com` so old links still work.
5. After that, the new site replaces the old template.

Until DNS is changed, the old `.org` site stays live and this new one only runs on your computer or on a Vercel preview link.
