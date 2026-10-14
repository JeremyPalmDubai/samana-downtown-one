import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';

// Every language is a separate HTML entry, preserving crawlable SEO content.
const pages = [
  "index.html",
  "pt/comprar-apartamento-dubai-a-partir-de-portugal/index.html",
  "nl/appartement-dubai-kopen-vanuit-nederland/index.html",
  "de/wohnung-dubai-kaufen-aus-deutschland/index.html",
  "fr/acheter-appartement-dubai-depuis-france/index.html",
  "es/comprar-apartamento-dubai-desde-espana/index.html",
  "404.html"
];
export default defineConfig({
  appType: 'mpa',
  build: {
    outDir: 'dist',
    rolldownOptions: { input: pages.map(page => fileURLToPath(new URL(page, import.meta.url))) }
  }
});
