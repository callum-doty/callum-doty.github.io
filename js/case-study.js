/**
 * Case Study page initialization
 * Uses ComponentFactory to build page content dynamically
 */

import { ComponentFactory } from './core/ComponentFactory.js';
import { PageTemplate } from './core/PageTemplate.js';
import { performanceMonitor } from './utils/PerformanceMonitor.js';
import { CONFIG } from './config.js';

/**
 * Build the case study header
 */
function buildCaseStudyHeader() {
    const header = document.createElement('header');
    header.className = 'text-center mb-12';
    
    const title = document.createElement('h1');
    title.className = 'text-4xl font-bold';
    title.textContent = 'Real-Time Analytics Dashboard';
    header.appendChild(title);
    
    const metaInfo = document.createElement('div');
    metaInfo.className = 'mt-4 text-black grid grid-cols-2 md:grid-cols-3 gap-4';
    
    const role = document.createElement('div');
    role.innerHTML = '<strong>Role:</strong> Lead Engineer';
    
    const tech = document.createElement('div');
    tech.innerHTML = '<strong>Tech:</strong> Go, Kafka, React, K8s';
    
    const duration = document.createElement('div');
    duration.innerHTML = '<strong>Duration:</strong> 6 Months';
    
    metaInfo.appendChild(role);
    metaInfo.appendChild(tech);
    metaInfo.appendChild(duration);
    header.appendChild(metaInfo);
    
    return header;
}

/**
 * Build challenge section
 */
function buildChallengeSection() {
    const section = document.createElement('section');
    section.className = 'mb-12';
    
    const title = document.createElement('h2');
    title.className = 'text-2xl font-bold mb-4';
    title.textContent = 'The Initial Challenge';
    section.appendChild(title);
    
    const para = ComponentFactory.render('paragraph', {
        text: 'The marketing team was flying blind. They relied on a daily data dump from our main production database to assess campaign performance. This meant a 24-hour delay in crucial insights, leading to wasted ad spend and missed opportunities. The existing system was simple but slow, and the business was starting to feel the pain.'
    });
    section.appendChild(para);
    
    return section;
}

/**
 * Build decision section
 */
function buildDecisionSection() {
    const section = document.createElement('section');
    section.className = 'mb-12 bg-indigo-50 p-8 rounded-lg';
    
    const title = document.createElement('h2');
    title.className = 'text-2xl font-bold mb-4';
    title.textContent = 'The Decision: Simplify or Add Complexity?';
    section.appendChild(title);
    
    const para1 = ComponentFactory.render('paragraph', {
        text: 'The initial request was to "make the daily report run faster." A simple path would have been to optimize the existing SQL queries. However, after investigating, I realized this would only provide a marginal improvement. The core problem was the batch-processing architecture itself.'
    });
    section.appendChild(para1);
    
    const para2 = ComponentFactory.render('paragraph', {
        innerHTML: 'I made the case to <strong class="text-indigo-700">add architectural complexity</strong> by introducing a real-time streaming pipeline. This was a significant departure from the original ask. I had to convince stakeholders that the upfront investment in a more complex system (using Kafka and a separate data stream) would provide disproportionate value by enabling not just this, but a whole new class of real-time features in the future.',
        className: 'text-lg text-black leading-relaxed mt-4'
    });
    section.appendChild(para2);
    
    return section;
}

/**
 * Build action section
 */
function buildActionSection() {
    const section = document.createElement('section');
    section.className = 'mb-12';
    
    const title = document.createElement('h2');
    title.className = 'text-2xl font-bold mb-4';
    title.textContent = 'Action & Solution';
    section.appendChild(title);
    
    const para = ComponentFactory.render('paragraph', {
        text: 'I led a small team to build a proof-of-concept. We used a Go service to capture relevant events from our application and publish them to a Kafka topic. A separate consumer service processed these events in real-time, aggregating the data into a time-series database. The front-end was a React dashboard that polled for new data every few seconds. This decoupled system was more complex to build and maintain, but it was infinitely more scalable and powerful.'
    });
    section.appendChild(para);
    
    return section;
}

/**
 * Build impact section
 */
function buildImpactSection() {
    const section = document.createElement('section');
    section.className = 'mb-12 text-center';
    
    const title = document.createElement('h2');
    title.className = 'text-2xl font-bold mb-4';
    title.textContent = 'Measurable Impact';
    section.appendChild(title);
    
    const metrics = [
        { value: '<1 min', label: 'Reduction in Data Latency' },
        { value: '15%', label: 'Improvement in Ad Spend Efficiency' }
    ];
    
    const metricCards = metrics.map(metric => 
        ComponentFactory.render('metricCard', metric)
    );
    
    const grid = ComponentFactory.render('grid', {
        children: metricCards,
        columns: 2,
        gap: 8
    });
    
    section.appendChild(grid);
    
    return section;
}

/**
 * Build reflection section
 */
function buildReflectionSection() {
    const section = document.createElement('section');
    
    const title = document.createElement('h2');
    title.className = 'text-2xl font-bold mb-4';
    title.textContent = 'Personal Reflection';
    section.appendChild(title);
    
    const para = ComponentFactory.render('paragraph', {
        text: 'This project was a pivotal moment for me. It reinforced my belief that our job isn\'t just to write code, but to solve the right problem. By looking past the simple request and identifying the root cause, we delivered a solution that had a far greater impact than what was initially imagined. It was a lesson in the strategic value of well-justified technical complexity.'
    });
    section.appendChild(para);
    
    return section;
}

/**
 * Initialize the case study page
 */
function initCaseStudyPage() {
    performanceMonitor.measure('initCaseStudyPage', () => {
        // Initialize page template
        PageTemplate.initialize({
            title: 'Case Study - Callum Doty'
        });
        
        // Get or create main container
        let main = document.querySelector('main');
        if (!main) {
            main = document.createElement('main');
            document.body.appendChild(main);
        }
        
        // Clear existing content
        main.innerHTML = '';
        
        // Build article
        const article = document.createElement('article');
        article.className = 'container mx-auto px-6 py-12 max-w-4xl';
        
        article.appendChild(buildCaseStudyHeader());
        article.appendChild(buildChallengeSection());
        article.appendChild(buildDecisionSection());
        article.appendChild(buildActionSection());
        article.appendChild(buildImpactSection());
        article.appendChild(buildReflectionSection());
        
        main.appendChild(article);
    });
    
    if (CONFIG.ENV === 'development') {
        performanceMonitor.log();
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCaseStudyPage);
} else {
    initCaseStudyPage();
}
