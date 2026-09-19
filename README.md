# SlideInk website

Official static website for SlideInk.

## Localization architecture

GitHub Pages builds the site with Jekyll. The complete site structure lives in three shared layouts:

- `_layouts/home.html`
- `_layouts/privacy.html`
- `_layouts/support.html`

All translated text is stored in `_data/locales/<language>.json`. Language route files contain front matter only and select a layout and locale. This keeps markup, accessibility and SEO behavior in one maintainable place.

English is served at `/`, `/privacy/` and `/support/`. Other languages use `/<language>/`, `/<language>/privacy/` and `/<language>/support/`.

The small script in `assets/language.js` handles the selector and remembers the chosen language in local storage. Page content remains fully rendered HTML and works without JavaScript.

The site does not use cookies, analytics or trackers.
