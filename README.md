# nitwise.github.io

[![Deploy](https://github.com/nitwise/nitwise.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/nitwise/nitwise.github.io/actions/workflows/deploy.yml)

Source of [nitwise.github.io](https://nitwise.github.io), the website for Nitwise, an independent AI code reviewer for GitHub pull requests.

The site is a single static page built with [Astro](https://astro.build) and served by GitHub Pages.

## Getting started

Requires Node.js 22.23.4 or later. `.nvmrc` holds the version the deploy workflow uses.

```sh
git clone https://github.com/nitwise/nitwise.github.io.git
cd nitwise.github.io
nvm use
npm ci
npm run dev
```

The dev server runs at http://localhost:4321.

## Commands

| Command           | Action                                      |
| ----------------- | ------------------------------------------- |
| `npm run dev`     | Start the dev server                        |
| `npm run build`   | Build the site into `dist/`                 |
| `npm run preview` | Serve the built site locally                |
| `npm test`        | Build, then run the smoke tests in `tests/` |
| `npm run format`  | Format every file with Prettier             |

## Project structure

```text
.
├── .github/workflows/deploy.yml   Build, test and deploy to GitHub Pages
├── public/                        Files served as they are
├── src/
│   ├── fonts/                     Geist and Geist Mono, self-hosted
│   ├── pages/index.astro          The page
│   └── styles/                    Design tokens and component styles
├── tests/site.test.mjs            Smoke tests over the built page
└── astro.config.mjs               Content security policy
```

## Deployment

Every push to `main` runs the deploy workflow. It builds the site, runs the smoke tests and publishes `dist/` to GitHub Pages. A failing test stops the deploy.

## Content security policy

The page loads nothing from other origins. Astro writes a policy into the page that allows only the site's own origin and adds hashes for its scripts. The dev server does not apply the policy, so check it with `npm run build` followed by `npm run preview`.

## License

Copyright © 2026 Ashish Patel. All rights reserved.

The Geist and Geist Mono fonts in `src/fonts/` are by The Geist Project Authors and licensed under the [SIL Open Font License 1.1](src/fonts/OFL.txt).
