# Rapport Institute for Psychoeducation: website

A static, four-page site: Home, About, Services (Programmes) and Contact (Request a programme). It's plain HTML, one CSS file and one small vanilla JS file. There's no framework and no build step.

```
index.html  about.html  services.html  contact.html
css/style.css        tokens, layout and components (read DESIGN.md first)
js/main.js           mobile menu, header, accordion, Services tabs, request form
fonts/               Plus Jakarta Sans variable font (WOFF2 + TTF fallback)
images/              logo-mark.svg, logo-lockup.svg, favicon.svg, favicon-32.png,
                     apple-touch-icon.png, og-image.png
sitemap.xml  robots.txt  DESIGN.md  README.md
```

## Preview locally

Any static server works. From this folder:

```bash
python -m http.server 8000
```

Then open http://localhost:8000. Opening `index.html` straight from disk also works, but the `?audience=` pre-selection on the Contact page is easiest to test through a server.

## Deploy for free

**Netlify:**
1. Sign in at app.netlify.com.
2. Go to *Add new site*, then *Deploy manually*.
3. Drag this folder onto the page.
4. Optionally, connect a Git repository instead for automatic deploys. Leave the build command empty and set the publish directory to `/`.

**GitHub Pages:**
1. Push this folder to a repository.
2. Go to *Settings*, then *Pages*.
3. Under *Build and deployment*, choose *Deploy from a branch*, pick `main` and `/ (root)`, then save.

After the domain is known, replace `https://rapport.ng` in each page's `<head>` (canonical, Open Graph, JSON-LD), in `sitemap.xml` and in `robots.txt`. Search for `rapport.ng` to find every occurrence.

## Editing notes

- **Shared markup:** the header, footer and closing call-to-action band are repeated in each HTML file, because there's no build step. Change all four files together.
- **Programme names:** they appear in two places, `services.html` and the `PROGRAMMES` list at the top of `js/main.js`, which feeds the form's Programme dropdown. Keep both in sync.
- **The request form:** it doesn't send anything to a server. It validates, then opens `wa.me/2348147549034` with a formatted summary, and offers an email fallback.
- **New copy:** every line that isn't the client's own text is marked `<!-- COPY: client to review -->`.

## Checks done

- **Screenshots:** every page at 390, 768 and 1440px, with no horizontal scroll at 390.
- **Interactions tested in a browser:**
  - The mobile menu: focus moves into it, Escape closes it, and the rest of the page is inert while it's open.
  - The header background appearing after scrolling.
  - The accordion.
  - The Services tabs highlighting while scrolling.
  - The form: `?audience=` pre-selection, the programme list updating per audience, inline errors with focus moving to the first error, the WhatsApp message, and the success state.
- **Page audit:** one H1 per page, no skipped heading levels, no duplicate IDs or broken ARIA or label references, no unnamed links or buttons, and a unique title, description and canonical on every page.
- **Contrast:** checked numerically. See DESIGN.md.
- **Lighthouse: not run yet.** No Node.js install was available on the build machine. Run it once the site is deployed (Chrome DevTools, then Lighthouse, mobile and desktop) and fix anything under 95.

## Waiting on client

- [ ] **Reviews.** The content doc says they'll be sent on WhatsApp. The slot is marked in `index.html`, between "How we work" and "Questions".
- [ ] **X handle.** The content doc lists "Rapportg_", but it isn't linked until confirmed. TODOs are in each footer and on the Contact page.
- [ ] **Founder or team details**, with names, roles, short bios and photos. The slot is marked in `about.html`.
- [ ] **Event photos.** There are no stock photos by design. Add real photos once available, as a dedicated section with the client's permission and proper alt text.
- [ ] **Instagram feed.** The slot is marked in `index.html`. Leave it out until there's a feed worth embedding.
- [ ] **Live domain**, for canonical, Open Graph, JSON-LD, the sitemap and robots.
- [ ] **Approval of every new line of copy**, marked `<!-- COPY: client to review -->`. In particular:
  - The Home headline "Psychoeducation and training that put people at the centre."
  - The three "How we work" step sentences.
  - The promise "We'll reply within one working day."
  - The Contact safety note ("…call 112").
  - The footer disclaimer.
  - The meta descriptions.
  - The form helper and success text.
