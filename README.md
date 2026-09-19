# SlideInk website

Official static website for SlideInk.

## Localization architecture

GitHub Pages builds the site with Jekyll. The complete site structure lives in two shared layouts:

- `_layouts/home.html`
- `_layouts/privacy.html`

All translated text is stored in `_data/locales/<language>.json`. Language route files contain front matter only and select a layout and locale. This keeps markup, accessibility and SEO behavior in one maintainable place.

English is served at `/` and `/privacy/`. Other languages use `/<language>/` and `/<language>/privacy/`.

The small script in `assets/language.js` handles the selector and remembers the chosen language in local storage. Page content remains fully rendered HTML and works without JavaScript.

The site does not use cookies, analytics or trackers.
