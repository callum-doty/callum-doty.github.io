import type { APIRoute, GetStaticPaths } from 'astro';

// Pages from the previous site, so links already shared elsewhere keep working.
const moved: Record<string, string> = {
  'about.html': '/about/',
  'work.html': '/projects/',
  'project-catalog.html': '/projects/axiom-catalog/',
  'political-portfolio.html': '/projects/political-modeling/',
  'kalshi.html': '/projects/weather-modeling/',
  'blog/index.html': '/blog/',
  'blog/blog-post-1.html': '/blog/dui-bayesian-analysis/',
  'blog/blog-post-4.html': '/blog/cpu-gpu-training-divergence/',
  'blog/blog-post-5.html': '/blog/chess-to-problems/',
  'blog/blog-post-6.html': '/blog/political-theta/',
  'blog/blog-post-7.html': '/blog/persuasion-ceiling/',
};

export const getStaticPaths = (() =>
  Object.entries(moved).map(([path, to]) => ({ params: { path }, props: { to } }))) satisfies GetStaticPaths;

export const GET: APIRoute = ({ props }) =>
  new Response(
    `<!doctype html><meta charset="utf-8"><title>Moved</title><link rel="canonical" href="${props.to}"><meta http-equiv="refresh" content="0; url=${props.to}"><a href="${props.to}">This page has moved.</a>`,
    { headers: { 'Content-Type': 'text/html; charset=utf-8' } },
  );
