import { getCollection, type CollectionEntry } from 'astro:content';

const newestFirst = (a: { data: { date: Date } }, b: { data: { date: Date } }) =>
  b.data.date.valueOf() - a.data.date.valueOf();

export async function getProjects(): Promise<CollectionEntry<'projects'>[]> {
  return (await getCollection('projects')).sort(newestFirst);
}

export async function getPosts(): Promise<CollectionEntry<'blog'>[]> {
  return (await getCollection('blog')).sort(newestFirst);
}

export async function getAboutSections(): Promise<CollectionEntry<'about'>[]> {
  return (await getCollection('about'))
    .filter((page) => page.id !== 'index')
    .sort((a, b) => a.data.order - b.data.order);
}

// Dates in frontmatter have no time of day, so format in UTC to keep them from shifting a day.
export const formatDate = (date: Date) =>
  date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });

export const formatMonth = (date: Date) =>
  date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', timeZone: 'UTC' });
