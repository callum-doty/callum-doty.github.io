import { createHeader } from './components.js';

function renderHeader() {
    const header = createHeader();
    document.body.prepend(header);

    const favicon = document.createElement('link');
    favicon.rel = 'icon';
    favicon.href = '/assets/cd.png';
    document.head.appendChild(favicon);
}

renderHeader();
