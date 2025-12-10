/**
 * Navigation utilities
 * DRY principle - eliminate duplicate active link detection
 */

/**
 * Check if a navigation link is active
 * @param {string} linkHref - Link href to check
 * @param {string} currentPath - Current page path (defaults to window.location.pathname)
 * @returns {boolean} - Whether link is active
 */
export function isLinkActive(linkHref, currentPath = window.location.pathname) {
  // Handle homepage
  if (linkHref === '/' && (currentPath === '/' || currentPath === '/index.html')) {
    return true;
  }

  // Handle blog subpages
  if (linkHref === '/blog' && currentPath.startsWith('/blog')) {
    return true;
  }

  // Standard matching
  return currentPath === linkHref || currentPath === linkHref + '.html';
}

/**
 * Get font weight class based on active state
 * @param {boolean} isActive - Whether link is active
 * @returns {string} - CSS class for font weight
 */
export function getActiveFontWeight(isActive) {
  return isActive ? 'font-bold' : '';
}
