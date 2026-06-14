# calorisync.com

Marketing site, Terms of Service, and Privacy Policy for the CaloriSync iOS app.
Built as plain HTML/CSS/JS and served by GitHub Pages.

## Develop locally

No build step. Just serve the folder:

```sh
python3 -m http.server 8000
# open http://localhost:8000
```

Pretty URLs (`/terms`, `/privacy`) work because each lives in its own folder
with an `index.html`.

## Deploy

1. Push this repo to GitHub (`Valoroid-Technologies/calorisync-website`).
2. **Repo Settings → Pages** → Source: `main` branch, `/` (root). Save.
3. Wait ~1 minute, then verify the site at
   `https://valoroid-technologies.github.io/calorisync-website/`.
4. Point DNS for `calorisync.com` (apex):
   - `A` records → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `AAAA` records → `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`
   - Optionally `CNAME` `www.calorisync.com` → `valoroid-technologies.github.io`
5. GitHub Pages auto-issues a Let's Encrypt cert once DNS resolves. Enable
   **Enforce HTTPS** in Pages settings.
6. Verify both `https://calorisync.com/terms` and `https://calorisync.com/privacy`
   return `200` — these are the URLs `TermsSheet.swift` opens during Apple Review.

## File map

```
index.html              Landing page
terms/index.html        Served at /terms
privacy/index.html      Served at /privacy
404.html                Friendly 404
css/main.css            All styles
js/main.js              Mobile nav + FAQ accordion
assets/                 Logo, app icon, favicons, OG image, screenshots
CNAME                   calorisync.com (custom-domain marker for GH Pages)
robots.txt, sitemap.xml SEO basics
```

## Outstanding TODOs before launch

- [ ] Generate a real `og-image.png` (1200×630) — the social preview.
- [ ] Confirm `support@calorisync.com` mailbox / forwarding is live.
- [ ] Confirm Google Cloud Run region in the Privacy Policy is correct.
- [ ] Have Indian legal counsel review Terms + Privacy before scaling.
- [ ] Replace the inline Apple/Google badge SVGs with the official assets from
  Apple Marketing Resources and Google's Play Brand Guidelines once the
  developer accounts are linked, if you want pixel-perfect official badges.
