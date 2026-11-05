import { defineConfig } from 'astro/config';
import { satteri } from '@astrojs/markdown-satteri';
import sitemap from '@astrojs/sitemap';
import { readFileSync } from 'node:fs';
import { parse } from 'yaml';
import { figures, mathAndDiagrams } from './src/lib/markdown.mjs';

const { url } = parse(readFileSync('config/site.yaml', 'utf8'));

export default defineConfig({
  site: url,
  publicDir: './static',
  integrations: [
    sitemap({ filter: (page) => !new URL(page).pathname.startsWith('/pages/') }),
  ],
  markdown: {
    shikiConfig: { theme: 'github-dark' },
    processor: satteri({
      // $$-only math: a lone $ stays literal, so "$400 million" never turns into an equation.
      features: { math: { singleDollarTextMath: false } },
      mdastPlugins: [mathAndDiagrams],
      hastPlugins: [figures],
    }),
  },
});
