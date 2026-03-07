/**
 * Project Catalog page initialization
 * Uses ComponentFactory to build page content dynamically
 */

import { ComponentFactory } from './core/ComponentFactory.js';
import { PageTemplate } from './core/PageTemplate.js';
import { performanceMonitor } from './utils/PerformanceMonitor.js';
import { CONFIG } from './config.js';

/**
 * Build page header
 */
function buildPageHeader() {
    const header = document.createElement('header');
    header.className = 'text-center mb-16 border-b-2 border-black pb-10';

    const title = document.createElement('h1');
    title.className = 'text-4xl font-bold text-black mb-3';
    title.textContent = 'Project Catalog';
    header.appendChild(title);

    const subtitle = document.createElement('p');
    subtitle.className = 'text-lg text-black';
    subtitle.textContent = 'AI-Powered Political File Management System';
    header.appendChild(subtitle);

    const meta = document.createElement('div');
    meta.className = 'mt-6 flex justify-center gap-8 text-sm text-black';

    const metaItems = [
        { label: 'Role', value: 'Full-Stack Software Engineer' },
        { label: 'Duration', value: '6 months (Ongoing)' },
        { label: 'Team', value: 'Solo Project' },
        { label: 'Status', value: 'Workflow Integration' },
    ];

    metaItems.forEach(({ label, value }) => {
        const item = document.createElement('div');
        item.innerHTML = `<span class="font-bold">${label}:</span> ${value}`;
        meta.appendChild(item);
    });

    header.appendChild(meta);
    return header;
}

/**
 * Build a labeled content section with a bold left border
 */
function buildSection(label, paragraphText) {
    const wrapper = document.createElement('section');
    wrapper.className = 'mb-12 border-l-4 border-black pl-8';

    const heading = document.createElement('h2');
    heading.className = 'text-2xl font-bold text-black mb-4';
    heading.textContent = label;
    wrapper.appendChild(heading);

    const para = ComponentFactory.render('paragraph', {
        text: paragraphText,
        className: 'text-lg text-black leading-relaxed'
    });
    wrapper.appendChild(para);

    return wrapper;
}

/**
 * Build outcome metrics row
 */
function buildOutcomeSection() {
    const wrapper = document.createElement('section');
    wrapper.className = 'mb-12 border-l-4 border-black pl-8';

    const heading = document.createElement('h2');
    heading.className = 'text-2xl font-bold text-black mb-4';
    heading.textContent = 'Outcome';
    wrapper.appendChild(heading);

    const para = ComponentFactory.render('paragraph', {
        text: 'Reduced file discovery time from 1–5 minutes per search to near-instant results. Designers gained the ability to find creative inspiration from past campaigns by theme, candidate, or concept — not just by file name. Account managers could fulfill requests in seconds rather than manually navigating folder hierarchies.',
        className: 'text-lg text-black leading-relaxed'
    });
    wrapper.appendChild(para);

    const metrics = [
        { value: '< 2 sec', label: 'Average Search Time' },
        { value: 'Hours / week', label: 'Time Saved for the Team' },
        { value: 'Natural Language', label: 'Query Method' },
    ];

    const grid = document.createElement('div');
    grid.className = 'mt-8 grid grid-cols-1 md:grid-cols-3 gap-4';

    metrics.forEach(({ value, label }) => {
        const card = document.createElement('div');
        card.className = 'border-2 border-black p-6 text-center';

        const val = document.createElement('div');
        val.className = 'text-2xl font-bold text-black';
        val.textContent = value;

        const lbl = document.createElement('div');
        lbl.className = 'text-sm text-black mt-1';
        lbl.textContent = label;

        card.appendChild(val);
        card.appendChild(lbl);
        grid.appendChild(card);
    });

    wrapper.appendChild(grid);
    return wrapper;
}

/**
 * Build GitHub link footer
 */
function buildFooter() {
    const footer = document.createElement('div');
    footer.className = 'mt-16 pt-8 border-t-2 border-black text-center';

    const link = document.createElement('a');
    link.href = 'https://github.com/callum-doty/pc-simple';
    link.target = '_blank';
    link.className = 'inline-block border-2 border-black px-8 py-3 font-bold text-black hover:bg-black hover:text-white transition-colors duration-200';
    link.textContent = 'View on GitHub →';

    footer.appendChild(link);
    return footer;
}

/**
 * Initialize the project catalog page
 */
function initProjectCatalogPage() {
    performanceMonitor.measure('initProjectCatalogPage', () => {
        PageTemplate.initialize({
            title: 'Project Catalog - Callum Doty'
        });

        let main = document.querySelector('main');
        if (!main) {
            main = document.createElement('main');
            document.body.appendChild(main);
        }

        main.innerHTML = '';

        const article = document.createElement('article');
        article.className = 'container mx-auto px-6 py-12 max-w-3xl';

        article.appendChild(buildPageHeader());
        article.appendChild(buildSection(
            'Problem',
            'During the 2024 election cycle, designers and account managers were spending 1–5 minutes per file search in Dropbox. With hundreds of daily file requests, this was costing the team hours each week. The deeper issue was that Dropbox only searches by file name or exact keywords — there was no way to discover past creative work by theme, message, or visual concept.'
        ));
        article.appendChild(buildSection(
            'Approach',
            'I designed and built a full-stack AI-powered catalog that automatically analyzes and semantically tags political design files. The system uses vector embeddings and multi-modal AI to understand the content of each file, enabling natural language queries like "healthcare policy graphics" or "Biden campaign materials." It integrates with existing Dropbox workflows so the team didn\'t need to change how they store files.'
        ));
        article.appendChild(buildOutcomeSection());
        article.appendChild(buildFooter());

        main.appendChild(article);
    });

    if (CONFIG.ENV === 'development') {
        performanceMonitor.log();
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initProjectCatalogPage);
} else {
    initProjectCatalogPage();
}