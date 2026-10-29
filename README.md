# PS Gallery — architectural photography archive (prototype)

Next.js (App Router) · TypeScript · Tailwind CSS 4. Same approach as the sibling `../atlast` prototype.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm run lint && npm run typecheck
```

## Pages
`/` immersive hero + featured series · `/archive` browse with city / subject / year filters (URL-driven, shareable) ·
`/series` and `/series/[slug]` · `/photo/[id]` image detail (← → move through the series, F opens full screen) ·
`/about` · `/contact` (mock form).

Lightbox: click any photograph; ← / → / Home / End to navigate, Esc to close, swipe on touch, focus is trapped and restored.

## Structure
- `src/data/` typed model (`types.ts`), demo series and photographs.
- `src/lib/content.ts` the only module pages read content through; swap for a DB/CMS here.
- `src/components/` `ui` (Picture, placeholders, Reveal), `layout`, `gallery` (grid, lightbox, filters, forms, hero).
- `public/images/` drop real photos here (see its README); placeholders are replaced automatically.

## Honesty about content
Every series and photograph has `demo: true` and shows a "Demo content" marker. Cities, eras and materials come from the
existing studio mockup (itself sample content); titles, years and alt text are illustrative. No real photographs, credits,
prices, licence terms or contact email are included. Forms validate but send nothing (`EnquiryForm.tsx`). Contact email is
`SITE.email` in `content.ts` (currently `null`).

## Accessibility
Skip link, labelled landmarks, keyboard-navigable lightbox (modal dialog), `aria-current` on filters/nav, form errors tied
with `aria-describedby`, hero slideshow pause control, and `prefers-reduced-motion` disables slideshow autoplay and animation.

## Standalone
PS Gallery is its own site with its own domain; it does not depend on the Petrus Atelier site. The studio site may link out to it (see `../psgallery.html`).
