import { getAboutSections, getPosts, getProjects } from './content';

export interface NavNode {
  label: string;
  href: string;
  children?: NavNode[];
}

// Groups this size or smaller stay expanded everywhere; larger ones open only around the current page.
const ALWAYS_OPEN_MAX = 8;

/** The site hierarchy. The sidebar and breadcrumbs both derive from this one tree. */
export async function getNav(): Promise<NavNode[]> {
  const [projects, about, posts] = await Promise.all([getProjects(), getAboutSections(), getPosts()]);
  return [
    {
      label: 'Home',
      href: '/',
      children: [
        {
          label: 'Projects',
          href: '/projects/',
          children: projects.map((p) => ({ label: p.data.title, href: `/projects/${p.id}/` })),
        },
      ],
    },
    {
      label: 'About',
      href: '/about/',
      children: about.map((p) => ({ label: p.data.title, href: `/about/${p.id}/` })),
    },
    {
      label: 'Blog',
      href: '/blog/',
      children: posts.map((p) => ({ label: p.data.title, href: `/blog/${p.id}/` })),
    },
  ];
}

export const normalizePath = (pathname: string) => (pathname.endsWith('/') ? pathname : `${pathname}/`);

/** The chain of nodes from the top of the tree down to `path`, or [] if it isn't in the tree. */
export function findTrail(nodes: NavNode[], path: string): NavNode[] {
  for (const node of nodes) {
    if (node.href === path) return [node];
    const rest = findTrail(node.children ?? [], path);
    if (rest.length) return [node, ...rest];
  }
  return [];
}

export const shouldOpen = (node: NavNode, path: string) =>
  (node.children?.length ?? 0) <= ALWAYS_OPEN_MAX || findTrail([node], path).length > 0;
