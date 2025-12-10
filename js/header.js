/**
 * Header initialization
 * Uses Component Factory pattern directly
 */

import { ComponentFactory } from './core/ComponentFactory.js';
import { CONFIG } from './config.js';
import { globalEventBus } from './core/EventEmitter.js';

function renderHeader() {
    const header = ComponentFactory.render('header', {});
    document.body.prepend(header);

    // Add favicon if not already present
    if (!document.querySelector('link[rel="icon"]')) {
        const favicon = document.createElement('link');
        favicon.rel = 'icon';
        favicon.href = CONFIG.PATHS.FAVICON;
        favicon.sizes = '192x108';
        document.head.appendChild(favicon);
    }
    
    globalEventBus.emit('headerRendered');
}

renderHeader();
