# SlideInk website

Official static website for SlideInk.

## Localization architecture

GitHub Pages builds the site with Jekyll. The complete site structure lives in three shared layouts:

- `_layouts/home.html`
- `_layouts/privacy.html`
- `_layouts/support.html`

All translated text is stored in `_data/locales/<language>.json`. Language route files contain front matter only and select a layout and locale. This keeps markup, accessibility and SEO behavior in one maintainable place.

English is served at `/`, `/privacy/` and `/support/`. Other languages use `/<language>/`, `/<language>/privacy/` and `/<language>/support/`.

The small script in `assets/site.js` handles the language selector (it remembers only an explicitly chosen language in local storage) and closes the mobile menu. Page content remains fully rendered HTML and works without JavaScript.

`404.html` (layout `_layouts/not_found.html`) is the page GitHub Pages serves for unknown URLs. `assets/social/slideink-og.png` is the image shown when a page is shared.

The homepage hero video (`assets/video/`) shows the real app: the panel slides out over the home screen and the SlideInk pen draws the stroke and writes the slogan. `assets/hero-demo.js` plays it once when it is on screen and drives the small pause/replay button; visitors who prefer reduced motion see the final frame. The slogan text (`slogan` in `_config.yml`) is also in the page for screen readers and search engines.

The site does not use cookies, analytics or trackers.
