const NAV = [
  { href: '/',                        text: 'Home'  },
  { href: '/pages/work.html',         text: 'Work'  },
  { href: '/pages/about.html',        text: 'About' },
  { href: '/pages/blog/index.html',   text: 'Blog'  },
];

const SOCIAL = [
  { href: 'https://github.com/callum-doty',                        text: 'Github'   },
  { href: 'https://www.linkedin.com/in/callum-doty-62b501192',     text: 'LinkedIn' },
  { href: 'mailto:doty.callum9@gmail.com',                         text: 'Email'    },
];

function isActive(href) {
  const path = window.location.pathname;
  if (href === '/') return path === '/' || path === '/index.html';
  return path.startsWith(href.replace('/index.html', ''));
}

function onHomepage() {
  const p = window.location.pathname;
  return p === '/' || p === '/index.html';
}

class SiteHeader extends HTMLElement {
  connectedCallback() {
    const navLinks = NAV.map(({ href, text }) => {
      const active = isActive(href);
      return `<a href="${href}" class="text-sm text-white hover:text-amber-400 transition-colors${active ? ' font-bold underline underline-offset-4' : ''}">${text}</a>`;
    }).join('');

    const mobileNavLinks = NAV.map(({ href, text }) =>
      `<a href="${href}" class="block text-white hover:text-amber-400 px-3 py-2 text-sm">${text}</a>`
    ).join('');

    this.innerHTML = `
      <header class="site-header py-4 fixed top-0 left-0 right-0 z-50">
        <div class="container mx-auto px-6 text-center">
          <nav class="hidden md:flex justify-center gap-8" aria-label="Main navigation">
            ${navLinks}
          </nav>
          <div class="md:hidden flex justify-center">
            <button id="hamburger" aria-expanded="false" aria-controls="mobile-menu"
              class="text-white focus:outline-none">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M4 6h16M4 12h16m-7 6h7"/>
              </svg>
              <span class="sr-only">Open menu</span>
            </button>
          </div>
        </div>
        <div id="mobile-menu" class="md:hidden hidden site-mobile-menu" role="navigation" aria-label="Mobile navigation">
          <nav class="px-2 pt-2 pb-4 text-center space-y-1">
            ${mobileNavLinks}
          </nav>
        </div>
      </header>
    `;

    const hamburger = this.querySelector('#hamburger');
    const mobileMenu = this.querySelector('#mobile-menu');

    hamburger?.addEventListener('click', () => {
      const expanded = hamburger.getAttribute('aria-expanded') === 'true';
      hamburger.setAttribute('aria-expanded', String(!expanded));
      mobileMenu?.classList.toggle('hidden');
    });
  }
}

class SiteFooter extends HTMLElement {
  connectedCallback() {
    const links = SOCIAL.map(({ href, text }) => {
      const isExternal = href.startsWith('http');
      const attrs = isExternal ? ' target="_blank" rel="noopener noreferrer"' : '';
      return `<a href="${href}"${attrs} class="text-sm text-white hover:text-amber-400 transition-colors">${text}</a>`;
    }).join('');

    const footerClass = onHomepage()
      ? 'py-4 fixed bottom-0 left-0 right-0 z-50'
      : 'py-6 mt-auto';

    this.innerHTML = `
      <footer class="${footerClass}">
        <div class="container mx-auto px-6 text-center">
          <div class="flex justify-center gap-8">
            ${links}
          </div>
        </div>
      </footer>
    `;
  }
}

customElements.define('site-header', SiteHeader);
customElements.define('site-footer', SiteFooter);
