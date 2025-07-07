export function createCard(cardData) {
    const card = document.createElement('a');
    card.href = cardData.href;
    card.className = 'custom-card cursor-pointer bg-white p-8 rounded-lg shadow-lg flex flex-col';

    const topRow = document.createElement('div');
    topRow.className = 'flex flex-row items-center';

    const img = document.createElement('img');
    img.src = cardData.imagePath;
    img.alt = cardData.title;
    img.className = 'w-12 h-12 custom-card-icon mr-4';

    const title = document.createElement('h2');
    title.className = 'text-lg md:text-xl font-bold';
    title.textContent = cardData.title;

    topRow.appendChild(img);
    topRow.appendChild(title);

    const description = document.createElement('p');
    description.className = 'mt-2';
    description.textContent = cardData.description;

    card.appendChild(topRow);
    card.appendChild(description);

    return card;
}

export function createHeader() {
    const header = document.createElement('header');
    header.className = 'bg-white border-b border-black';

    const leftNavLinks = [
        { href: '/', text: 'Home' },
        { href: '/complex', text: 'Work' },
        { href: '/about', text: 'About' },
        { href: '/blog', text: 'Blog' }
    ];

    const rightNavLinks = [
        { href: 'https://github.com/callum-doty', text: 'Github' },
        { href: 'https://www.linkedin.com/in/callum-doty-62b501192', text: 'LinkedIn' },
        { href: 'mailto:doty.callum9@gmail.com', text: 'Email' }
    ];

    const allNavLinks = [...leftNavLinks, ...rightNavLinks];

    const currentPath = window.location.pathname;

    const desktopLeftNavLinksHTML = leftNavLinks.map(link => {
        let isActive = currentPath === link.href || currentPath === link.href + '.html';

        // Handle homepage
        if (link.href === '/' && (currentPath === '/' || currentPath === '/index.html')) {
            isActive = true;
        }

        // Handle blog subpages
        if (link.href === '/blog' && currentPath.startsWith('/blog')) {
            isActive = true;
        }

        const fontWeight = isActive ? 'font-bold' : '';
        
        return `<span><a href="${link.href}" class="text-gray-800 hover:text-indigo-600 px-3 py-2 ${fontWeight}">${link.text}</a></span>`;
    }).join(' <span class="separator">|</span> ');

    const desktopRightNavLinksHTML = rightNavLinks.map(link => `
        <span><a href="${link.href}" target="_blank" class="text-gray-800 hover:text-indigo-600 px-3 py-2">${link.text}</a></span>
    `).join(' <span class="separator">|</span> ');

    const mobileNavLinksHTML = allNavLinks.map(link => {
        let isActive = currentPath === link.href || currentPath === link.href + '.html';

        // Handle homepage
        if (link.href === '/' && (currentPath === '/' || currentPath === '/index.html')) {
            isActive = true;
        }

        // Handle blog subpages
        if (link.href === '/blog' && currentPath.startsWith('/blog')) {
            isActive = true;
        }

        const fontWeight = isActive ? 'font-bold' : '';
        
        return `<a href="${link.href}" class="block text-gray-800 hover:text-indigo-600 px-3 py-2 ${fontWeight}">${link.text}</a>`;
    }).join('');

    header.innerHTML = `
    <div class="container mx-auto px-6 py-4 flex justify-between items-center">
      <nav class="hidden md:flex">
        ${desktopLeftNavLinksHTML}
      </nav>
      <nav class="hidden md:flex">
        ${desktopRightNavLinksHTML}
      </nav>
      <div class="md:hidden flex items-center">
        <button id="hamburger-button" class="text-gray-800 focus:outline-none">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
      </div>
    </div>
    <div id="mobile-menu" class="md:hidden hidden">
      <nav class="px-2 pt-2 pb-4 space-y-1 sm:px-3">
        ${mobileNavLinksHTML}
      </nav>
    </div>
  `;

    const hamburgerButton = header.querySelector('#hamburger-button');
    const mobileMenu = header.querySelector('#mobile-menu');

    hamburgerButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    return header;
}
