/**
 * Homepage card rendering
 * Uses ComponentFactory for component creation
 * Uses PerformanceMonitor for performance tracking
 */

import { ComponentFactory } from './core/ComponentFactory.js';
import { CONFIG } from './config.js';
import { globalEventBus } from './core/EventEmitter.js';
import { performanceMonitor } from './utils/PerformanceMonitor.js';

/**
 * Card data - inline configuration
 * DISABLED: Cards removed from homepage
 */
// const CARD_DATA = [
//     {
//         href: '/simple',
//         imagePath: 'assets/yantra.png',
//         title: 'The Simple Path',
//         description: 'A concise overview of my skills and impact.'
//     },
//     {
//         href: '/complex',
//         imagePath: 'assets/decision-tree.png',
//         title: 'The Complex Path',
//         description: 'A detailed look at my process and projects.'
//     }
// ];

/**
 * Render cards to the container with performance monitoring
 * @param {Array} cardData - Array of card data objects
 * DISABLED: Cards removed from homepage
 */
// function renderCards(cardData) {
//     performanceMonitor.measure('renderCards', () => {
//         const cardContainer = document.getElementById('card-container');
//         
//         if (!cardContainer) {
//             console.error('Card container not found');
//             return;
//         }
//         
//         cardData.forEach(data => {
//             try {
//                 // Use ComponentFactory directly instead of wrapper function
//                 const card = ComponentFactory.render('card', data);
//                 cardContainer.appendChild(card);
//                 globalEventBus.emit('cardRendered', { cardData: data });
//             } catch (error) {
//                 console.error('Failed to render card:', error, data);
//             }
//         });
//     });
// }

/**
 * Show error message to user
 * @param {string} message - Error message
 */
function showError(message) {
    const cardContainer = document.getElementById('card-container');
    if (cardContainer) {
        cardContainer.innerHTML = `
            <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                <p class="font-bold">Error loading cards</p>
                <p class="text-sm">${message}</p>
            </div>
        `;
    }
}

/**
 * Main initialization function with performance monitoring
 */
function main() {
    performanceMonitor.measure('main', () => {
        try {
            // Card rendering disabled
            // renderCards(CARD_DATA);
            // globalEventBus.emit('cardsLoaded', { count: CARD_DATA.length });
            
            // Log performance metrics in development
            if (CONFIG.ENV === 'development') {
                performanceMonitor.log();
            }
        } catch (error) {
            console.error('Failed to initialize:', error);
            showError(error.message || 'Unknown error occurred');
        }
    });
}

// Wait for DOM to be ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', main);
} else {
    main();
}
