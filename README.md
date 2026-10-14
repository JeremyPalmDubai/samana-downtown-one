# SAMANA Downtown One

Multilingual real estate website for samana-downtown-one.com. Vite multi-page application with English, French, Spanish, German, Dutch and Portuguese HTML pages, embedded Tally form, payment calculator and local images/fonts.

## Hostinger deployment

Import this GitHub repository as a Node.js frontend web application.

- Framework: **Vite**
- Root directory: **./** (repository root)
- Node.js: **22** (22.12 or newer), or **24**
- Install command: **npm ci**
- Build command: **npm run build**
- Output directory: **dist**
- No environment variables required.
- Domain: **samana-downtown-one.com**

The package.json, lockfile, vite.config.js and index.html are intentionally at repository root so Hostinger can detect the project. Do not select src or dist as the project root. No Python runtime is required by the deployment.

## Local development

```sh
npm ci
npm run dev
npm run build
npm run preview
```

## Content and assets

Each language has a pre-rendered index.html at its SEO URL. Shared styles and interactions are in src/style.css and src/app.js. Static assets, robots.txt and sitemap.xml are in public/. The sitemap link is intentionally absent from the footer.

The optional Python editorial generator uses src/content.py and src/build.py. Run python3 src/build.py after changing translation data, then npm run build; commit the updated HTML files alongside the translation source. The generator is not needed on Hostinger.

## Lead form and commercial details

Tally form: YjDDpd. Custom field labels and the Tally branding badge are managed in the Tally account. The site itself has no outgoing navigation links. Form submission delivery has not been tested with a real lead.

Prices: studio AED 689,000; one bedroom AED 1,039,000; two bedrooms AED 1,429,000. USD figures are indicative at AED 3.6725 per USD. PDC: 10% booking + 80 monthly payments of 1% + 5% at months 6 and 12. Non-PDC: 15% booking + 75 monthly payments of 1% + 5% at months 6 and 12. Availability, fees and eligibility require confirmation before purchase.

Project imagery and logo originate from the supplied project brochure. Font license files are included with the local fonts. No open-source license is granted for project branding or imagery.
