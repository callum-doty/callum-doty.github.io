function createCard(cardData) {
    const card = document.createElement('a');
    card.href = cardData.href;
    card.dataset.path = cardData.dataPath;
    card.className = 'cursor-pointer bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col items-center';

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'w-12 h-12 text-indigo-500');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('viewBox', '0 0 24 24');

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('stroke-linecap', 'round');
    path.setAttribute('stroke-linejoin', 'round');
    path.setAttribute('stroke-width', '2');
    path.setAttribute('d', cardData.svgPath);

    svg.appendChild(path);

    const title = document.createElement('h2');
    title.className = 'mt-4 text-2xl font-bold';
    title.textContent = cardData.title;

    const description = document.createElement('p');
    description.className = 'mt-2 text-black';
    description.textContent = cardData.description;

    card.appendChild(svg);
    card.appendChild(title);
    card.appendChild(description);

    return card;
}

function createFooter() {
    const footer = document.createElement('footer');
    footer.className = 'text-center mt-16 pb-8';
    const p = document.createElement('p');
    p.className = 'text-black';
    p.innerHTML = `
        <a href="https://github.com/callum-doty" target="_blank" class="hover:underline">github</a> |
        <a href="https://www.linkedin.com/in/callum-doty-62b501192" target="_blank" class="hover:underline">linkedin</a> |
        <a href="mailto:doty.callum9@gmail.com" class="hover:underline">email</a>
    `;
    footer.appendChild(p);
    return footer;
}
