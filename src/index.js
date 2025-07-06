import { createCard } from './components.js';

async function fetchCardData() {
    const response = await fetch('/src/cardData.json');
    const cardData = await response.json();
    return cardData;
}

function renderCards(cardData) {
    const cardContainer = document.getElementById('card-container');
    cardData.forEach(data => {
        const card = createCard(data);
        cardContainer.appendChild(card);
    });
}

async function main() {
    const cardData = await fetchCardData();
    renderCards(cardData);
}

main();
