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
        { label: 'Role', value: 'Researcher and Developer' },
        { label: 'Duration', value: '4 months (December 2025 – March 2026)' },
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
        text: 'By pooling information across races rather than analyzing each in isolation, I estimate this framework achieves 5.6× better parameter precision than competitors working race-by-race. I estimate the uncertainty estimates are 40–70% more accurate than standard approximation methods. And because the system operates across a portfolio of races, it can capture volume discounts and share fixed costs in ways that are structurally impossible for firms working one race at a time — saving an estimated $60,000 per race.',
        className: 'text-lg text-black leading-relaxed'
    });
    wrapper.appendChild(para);

    // Using the Tool subsection
    const toolHeading = document.createElement('h3');
    toolHeading.className = 'text-xl font-bold text-black mt-8 mb-3';
    toolHeading.textContent = 'Using the Tool';
    wrapper.appendChild(toolHeading);

    const toolIntro = ComponentFactory.render('paragraph', {
        text: 'A consultant runs the optimizer by providing five inputs about their client\'s race:',
        className: 'text-lg text-black leading-relaxed mb-4'
    });
    wrapper.appendChild(toolIntro);

    const inputsList = document.createElement('ul');
    inputsList.className = 'list-disc list-inside text-lg text-black leading-relaxed mb-4 space-y-2';
    const inputs = [
        'District — the race identifier (e.g., PA-17, TX-SEN)',
        'Party — the candidate\'s party',
        'Budget — total available spend in dollars',
        'Months until election — how much of the campaign calendar remains',
        'Recent polling — the most recent poll margin and sample size, if available'
    ];
    inputs.forEach(input => {
        const li = document.createElement('li');
        li.textContent = input;
        inputsList.appendChild(li);
    });
    wrapper.appendChild(inputsList);

    const toolDetails = ComponentFactory.render('paragraph', {
        text: 'The system automatically pulls the remaining context it needs from public sources — FEC fundraising filings, historical election results, and economic indicators — so consultants don\'t need to gather data themselves. If a poll isn\'t available, the model proceeds using the district\'s structural characteristics alone.\n\nFrom those inputs, the optimizer produces a recommended service-by-service spending plan, a projected win probability, and a 90% confidence interval around that projection.',
        className: 'text-lg text-black leading-relaxed'
    });
    wrapper.appendChild(toolDetails);

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
    'Political campaigns and the consulting firms that advise them face a practical challenge with no good solution: given a candidate and a limited budget, how should they spend their money across dozens of possible services — digital ads, door-knocking, TV, direct mail, polling, and more — to give themselves the best chance of winning?\n\nMost answer this question campaign by campaign, in isolation. That approach wastes information, produces unreliable predictions, and offers no systematic way to compare the value of a dollar spent in one race versus another. It also leaves candidates without a clear answer to the most pressing question they actually have: given my budget, what should I buy to maximize my chances of winning?'
));
article.appendChild(buildSection(
    'Approach',
    'I built a six-model statistical pipeline. The models work in sequence:\n\nModel A establishes a baseline picture of each race — what the political environment looks like before any campaign spending, distilling economic and electoral indicators into a starting win probability.\n\nModel E maps the voter universe, scoring individual voters by ideology and persuadability so that later models know which voters are actually movable.\n\nModel B estimates the causal effect of each of 23 campaign services — how much does an additional $1,000 in door-knocking actually shift votes, and at what point does more spending stop paying off?\n\nModel F is where the system gains its core advantage: rather than treating each race in isolation, it uses Bayesian hierarchical shrinkage to pool information across races, regions, and the full national portfolio. Data from a competitive race in Ohio genuinely improves estimates for a similar race in Michigan.\n\nModel C combines the baseline and causal estimates into a full spend-to-win-probability curve for each race.\n\nModel D solves an optimization problem: given a client\'s budget, it finds the exact combination of services — how much of each, in what amounts — that maximizes their probability of winning, along with a projected outcome and confidence range.\n\nThe overall structure was inspired by the Black-Scholes-Merton model in finance, which similarly transformed an industry by replacing intuition-based pricing with a mathematical framework.'
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
