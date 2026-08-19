# taliabarda.com

Portfolio site for **Talia Barda** — choreographer & dance artist.

Pure static HTML / CSS / JS. No build step, no dependencies.

## Structure

```
index.html            Home — full-screen Vimeo hero + menu
works.html            Works gallery            (skeleton)
collaborations.html   Collaborations gallery   (skeleton)
teaching.html         Workshops & teaching     (skeleton)
about.html            Biography                (skeleton)
contact.html          Contact                  (skeleton)
css/style.css         All styles
js/main.js            Nav overlay, Vimeo embed, scroll reveals
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

## Deploying

The repo deploys as-is on **Vercel** or **Netlify**: import the GitHub
repo, framework preset "Other" / no build command, output directory = repo
root. Nothing else to configure.

## Notes

- Images should be added as compressed `.webp` under `assets/images/`.
- Hebrew/RTL support is planned as a later phase (markup already keeps
  `lang`/`dir` attributes on `<html>` for easy switching).
