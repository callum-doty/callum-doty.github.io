import katex from 'katex';

const escapeHtml = (text) =>
  text.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

const renderMath = (tex, displayMode, ctx) => {
  ctx.data.astro.frontmatter.hasMath = true;
  return { type: 'html', value: katex.renderToString(tex, { displayMode, throwOnError: true }) };
};

/**
 * Renders math to static HTML at build time and marks Mermaid blocks for the client.
 * The flags it sets reach templates as `remarkPluginFrontmatter`, so KaTeX's stylesheet and
 * Mermaid's script load only on pages that use them.
 */
export const mathAndDiagrams = {
  name: 'math-and-diagrams',
  math: (node, ctx) => renderMath(node.value, true, ctx),
  inlineMath: (node, ctx) => renderMath(node.value, false, ctx),
  code(node, ctx) {
    if (node.lang !== 'mermaid') return;
    ctx.data.astro.frontmatter.hasDiagrams = true;
    return { type: 'html', value: `<pre class="mermaid">${escapeHtml(node.value)}</pre>` };
  },
};

const isBlank = (node) => node.type === 'text' && !node.value.trim();
const isImage = (node) => node.type === 'element' && node.tagName === 'img';

const toFigure = (image) => {
  const { title, ...properties } = image.properties;
  const children = [{ ...image, properties: { ...properties, loading: 'lazy', decoding: 'async' } }];
  if (title) {
    children.push({
      type: 'element',
      tagName: 'figcaption',
      properties: {},
      children: [{ type: 'text', value: title }],
    });
  }
  return { type: 'element', tagName: 'figure', properties: {}, children };
};

/**
 * Turns a paragraph holding only images into figures. An image's title becomes its caption,
 * and several images in one paragraph lay out as a grid:
 *
 *   ![Alt text](/images/a.png "Caption")
 *   ![Alt text](/images/b.png "Caption")
 */
export const figures = {
  name: 'figures',
  element: {
    filter: ['p'],
    visit(node) {
      const children = node.children.filter((child) => !isBlank(child));
      if (!children.length || !children.every(isImage)) return;
      if (children.length === 1) return toFigure(children[0]);
      return {
        type: 'element',
        tagName: 'div',
        properties: { className: ['figure-grid'] },
        children: children.map(toFigure),
      };
    },
  },
};
