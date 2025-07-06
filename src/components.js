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

    const currentPath = window.location.pathname;

    const leftNavLinksHTML = leftNavLinks.map(link => {
        let isActive = currentPath === link.href;

        // Handle homepage /index.html
        if (link.href === '/' && currentPath === '/index.html') {
            isActive = true;
        }

        // Handle blog subpages
        if (link.href === '/blog' && currentPath.startsWith('/blog')) {
            isActive = true;
        }

        const fontWeight = isActive ? 'font-bold' : '';
        
        return `<a href="${link.href}" class="text-gray-800 hover:text-indigo-600 px-3 py-2 ${fontWeight}">${link.text}</a>`;
    }).join(' | ');

    const rightNavLinksHTML = rightNavLinks.map(link => `
        <a href="${link.href}" target="_blank" class="text-gray-800 hover:text-indigo-600 px-3 py-2">${link.text}</a>
    `).join(' | ');

    header.innerHTML = `
    <div class="container mx-auto px-6 py-4 flex justify-between items-center">
      <nav>
        ${leftNavLinksHTML}
      </nav>
      <nav>
        ${rightNavLinksHTML}
      </nav>
    </div>
  `;
    return header;
}
