/**
 * Axiom-BSM page initialization
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
    title.textContent = 'Axiom-BSM';
    header.appendChild(title);

    const subtitle = document.createElement('p');
    subtitle.className = 'text-lg text-black';
    subtitle.textContent = 'Mathematical Framework for Political Campaign Optimization';
    header.appendChild(subtitle);

    const meta = document.createElement('div');
    meta.className = 'mt-6 flex flex-wrap justify-center gap-8 text-sm text-black';

    const metaItems = [
        { label: 'Role', value: 'Research Engineer & Applied Mathematician' },
        { label: 'Duration', value: '6 months (Sep 2025 – Feb 2026)' },
        { label: 'Team', value: 'Solo Project' },
        { label: 'Status', value: 'Active Development' },
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
 * Build a labeled content section with bold left border
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
 * Build outcome section with metrics
 */
function buildOutcomeSection() {
    const wrapper = document.createElement('section');
    wrapper.className = 'mb-12 border-l-4 border-black pl-8';

    const heading = document.createElement('h2');
    heading.className = 'text-2xl font-bold text-black mb-4';
    heading.textContent = 'Outcome';
    wrapper.appendChild(heading);

    const para = ComponentFactory.render('paragraph', {
        text: 'By pooling information across races through hierarchical Bayesian shrinkage, the framework achieves 5.6× better parameter precision than siloed competitors who estimate each race independently. Full posterior sampling produces uncertainty estimates that are 40–70% more accurate than approximation methods. Operating across a portfolio of races enables volume discounts and shared fixed costs that save an estimated $60k per race — advantages that are structurally impossible when races are treated in isolation.',
        className: 'text-lg text-black leading-relaxed'
    });
    wrapper.appendChild(para);

    const metrics = [
        { value: '5.6×', label: 'Better Parameter Precision' },
        { value: '40–70%', label: 'More Accurate Uncertainty' },
        { value: '$60k', label: 'Fixed Cost Savings / Race' },
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
 * Build GitHub footer link
 */
function buildFooter() {
    const footer = document.createElement('div');
    footer.className = 'mt-16 pt-8 border-t-2 border-black text-center';

    const link = document.createElement('a');
    link.href = 'https://github.com/callum-doty/axiom-BSM';
    link.target = '_blank';
    link.className = 'inline-block border-2 border-black px-8 py-3 font-bold text-black hover:bg-black hover:text-white transition-colors duration-200';
    link.textContent = 'View on GitHub →';

    footer.appendChild(link);
    return footer;
}

/**
 * Initialize the axiom-bsm page
 */
function initAxiomBSMPage() {
    performanceMonitor.measure('initAxiomBSMPage', () => {
        PageTemplate.initialize({
            title: 'Axiom-BSM - Callum Doty'
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
    'Political campaigns — and the firms advising them — face a fundamental resource allocation problem with no rigorous solution: given a candidate and a budget, which services should they buy, in what amounts, and when? Traditional political analytics answer this by treating each race in isolation, producing high-variance parameter estimates, overconfident win probability predictions, and no systematic way to compare the value of a dollar across a portfolio of races. There is also no framework for the "inverted" client-facing question: given a budget, how should a candidate optimally invest across a catalog of 23 campaign services — digital persuasion, field GOTV, polling, broadcast TV, direct mail, and more — to maximize their probability of winning?'
));
article.appendChild(buildSection(
    'Problem',
    'Political campaigns — and the firms advising them — face a fundamental resource allocation problem with no rigorous solution: given a candidate and a budget, which services should they buy, in what amounts, and when? Traditional political analytics answer this by treating each race in isolation, producing high-variance parameter estimates, overconfident win probability predictions, and no systematic way to compare the value of a dollar across a portfolio of races. There is also no framework for the "inverted" client-facing question: given a budget, how should a candidate optimally invest across a catalog of 23 campaign services — digital persuasion, field GOTV, polling, broadcast TV, direct mail, and more — to maximize their probability of winning?'
));
article.appendChild(buildSection(
    'Approach',
    'Inspired by the Black-Scholes-Merton model, I built a six-model statistical pipeline structured as A → E → B → F → C → D. Model A estimates each race\'s baseline political environment by compressing seven economic indicators into three latent factors and computing a continuously updated prior win probability P₀. Model E segments the voter universe by ideology and persuadability, producing voter-level scores that modulate downstream treatment effects. Model B uses doubly robust AIPW causal inference to estimate how spending on each of 23 services actually moves votes — producing effectiveness parameters η (logit uplift per $1k) and λ (saturation threshold). Model F applies four-level Bayesian hierarchical shrinkage to pool those estimates across races, regions, and nationally, so data from a race in Ohio sharpens estimates for a race in Michigan. Model C combines the baseline from A and causal estimates from B/F into a full spend-to-probability curve P(d) for each race. Model D then solves a mixed-integer program to find the optimal service bundle for a given client budget — outputting which services to buy, how much to spend on each, and a projected win probability with 90% confidence intervals.'
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
    document.addEventListener('DOMContentLoaded', initAxiomBSMPage);
} else {
    initAxiomBSMPage();
}