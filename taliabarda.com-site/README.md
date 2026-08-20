# taliabarda.com

Portfolio site for **Talia Barda** — choreographer & dance artist.

Pure static HTML / CSS / JS. No build step, no dependencies.

## Structure

```
index.html            Home — full-screen Vimeo hero + menu
works.html            Works gallery            (skeleton — awaiting content)
collaborations.html   Collaborations gallery   (skeleton — awaiting content)
teaching.html         Workshops & teaching     (skeleton — awaiting content)
about.html            Biography                (skeleton — awaiting content)
contact.html          Contact — live form + details
css/style.css         All styles
js/main.js            Nav overlay, Vimeo embed, scroll reveals
favicon.svg           "TB" monogram favicon
robots.txt, sitemap.xml
assets/images/        Site images (use compressed WebP)
```

## Setting the hero video

In `index.html`, replace the placeholder ID on the hero section with the
Vimeo ID of the video-art piece:

```html
<section class="hero" data-vimeo-id="YOUR_VIMEO_ID">
```

The video must allow embedding (Vimeo → video Settings → Privacy → Embed).
It plays as a muted, looping background via Vimeo's `background=1` player
mode. Until a real ID is set, the hero falls back to a dark backdrop.

## Local preview

Any static server works, e.g.:

```
python3 -m http.server 8000
```

## Contact form

`contact.html` posts to [FormSubmit](https://formsubmit.co/) — no backend,
no signup. It's wired to `hello@taliabarda.com`; the **first** real
submission triggers a one-time confirmation email to that address, which
must be clicked once to activate delivery. If the final address is
different, update the `action="https://formsubmit.co/..."` attribute on
the `<form>` in `contact.html` before going live.

## Deploying

The repo deploys as-is on **Vercel** or **Netlify**: import the GitHub
repo, framework preset "Other" / no build command, output directory = repo
root. Nothing else to configure.

## Moving the domain off Wix

1. Deploy this repo to Vercel or Netlify (above) and confirm it works on
   the platform's `*.vercel.app` / `*.netlify.app` subdomain first.
2. In the hosting platform, add `taliabarda.com` (and `www.taliabarda.com`)
   as a custom domain — it will show the DNS records to set (usually an
   `A`/`ALIAS` record for the apex and a `CNAME` for `www`).
3. Where the domain is registered decides the next step:
   - **Registered through Wix** (common for Wix sites): in the Wix
     dashboard, remove/replace the existing A and CNAME records under
     Domains → DNS records with the ones the host gave you. No transfer
     needed — Wix keeps being the registrar, DNS just points elsewhere.
   - **Registered elsewhere** (GoDaddy, Namecheap, etc., connected to
     Wix): same idea, but the DNS records live at that registrar instead.
4. DNS propagation can take a few minutes to ~48 hours. Once it resolves
   to the new host, disconnect/cancel the Wix *site* (not necessarily the
   domain registration) to stop paying for both.
5. Keep the Wix site untouched until the new domain is confirmed working
   end-to-end (including `www` and the contact form) — don't cancel early.

## Notes

- Images should be added as compressed `.webp` under `assets/images/`.
- Hebrew/RTL support is planned as a later phase (markup already keeps
  `lang`/`dir` attributes on `<html>` for easy switching).
- `works.html`, `collaborations.html`, `teaching.html` and `about.html`
  are still skeletons — real text, photos/video and bio go in once
  supplied, to avoid inventing placeholder history for a real person.
