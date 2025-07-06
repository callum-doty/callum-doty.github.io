import { createHeader } from './components.js';

function renderHeader() {
    const header = createHeader();
    document.body.prepend(header);
}

renderHeader();
