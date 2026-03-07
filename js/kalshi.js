/**
 * Kalshi Quantitative Trading page initialization
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
    title.textContent = 'Kalshi Quantitative Trading';
    header.appendChild(title);

    const subtitle = document.createElement('p');
    subtitle.className = 'text-lg text-black';
    subtitle.textContent = 'Ensemble ML Trading System for Weather Prediction Markets';
    header.appendChild(subtitle);

    const meta = document.createElement('div');
    meta.className = 'mt-6 flex flex-wrap justify-center gap-8 text-sm text-black';

    const metaItems = [
        { label: 'Role', value: 'ML Engineer & Integration Lead' },
        { label: 'Duration', value: '9 weeks (Feb – Apr 2026)' },
        { label: 'Team', value: '3-Person Equal Partnership' },
        { label: 'Status', value: 'Model Refinement' },
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
        text: "Phase 2's hourly model produced only 10.9% bucket accuracy — barely above random — because optimizing hourly RMSE averaged over all 24 hours masked poor performance at the afternoon peak, the only hour Kalshi markets price. Phase 3 rebuilds directly around the daily high target. The system is currently in backtesting with a target of 55%+ bucket accuracy, sub-3.5°F RMSE, and a 10% annualized return at a Sharpe ratio of 1.5 or better. Live trading is gated behind those benchmarks.",
        className: 'text-lg text-black leading-relaxed'
    });
    wrapper.appendChild(para);

    const metrics = [
        { value: '10.9% → 55%+', label: 'Bucket Accuracy (Phase 2 → Target)' },
        { value: '< 2.5°F', label: 'Daily High RMSE Target' },
        { value: '10% ann.', label: 'Return Target at Sharpe ≥ 1.5' },
    ];

    const grid = document.createElement('div');
    grid.className = 'mt-8 grid grid-cols-1 md:grid-cols-3 gap-4';

    metrics.forEach(({ value, label }) => {
        const card = document.createElement('div');
        card.className = 'border-2 border-black p-6 text-center';

        const val = document.createElement('div');
        val.className = 'text-xl font-bold text-black';
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
    link.href = 'https://github.com/PKapoorSR/KalshiOverOurHeads';
    link.target = '_blank';
    link.className = 'inline-block border-2 border-black px-8 py-3 font-bold text-black hover:bg-black hover:text-white transition-colors duration-200';
    link.textContent = 'View on GitHub →';

    footer.appendChild(link);
    return footer;
}

/**
 * Initialize the kalshi page
 */
function initKalshiPage() {
    performanceMonitor.measure('initKalshiPage', () => {
        PageTemplate.initialize({
            title: 'Kalshi Quantitative Trading - Callum Doty'
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
            'How do you build a model whose accuracy metric directly corresponds to Kalshi\'s contract structure (1°F buckets on daily high)?'
        ));
        article.appendChild(buildSection(
            'Approach',
            'I built the Temporal Fusion Transformer component of a three-model ensemble alongside two collaborators (XGBoost and NBeats). My work covers the full TFT pipeline: ingesting 46 years of KNYC station data and 17 Open-Meteo NWP forecast variables, engineering intraday features like morning temperature snapshots and diurnal range lags, training a quantile regression model (p10/p50/p90) to predict daily highs directly, and computing a live edge signal against Kalshi\'s posted market price. The ensemble uses dynamic weighting based on rolling 7-day RMSE, and a standardized JSON inference schema ensures the three models integrate cleanly. Circuit breakers at -10% daily through -40% total protect capital throughout live trading.'
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
    document.addEventListener('DOMContentLoaded', initKalshiPage);
} else {
    initKalshiPage();
}
