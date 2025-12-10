/**
 * Simple page initialization
 * Uses ComponentFactory to build page content dynamically
 */

import { ComponentFactory } from './core/ComponentFactory.js';
import { PageTemplate } from './core/PageTemplate.js';
import { performanceMonitor } from './utils/PerformanceMonitor.js';
import { CONFIG } from './config.js';

/**
 * Competency data
 */
const COMPETENCIES = [
    {
        title: 'Software Development',
        color: 'indigo',
        sections: [
            {
                label: 'Languages',
                items: ['Python', 'JavaScript (React)', 'SQL', 'C++']
            },
            {
                label: 'Databases',
                items: ['PostgreSQL', 'MySQL']
            },
            {
                label: 'Development Principles',
                items: ['Design Patterns', 'Version Control (Git)']
            }
        ]
    },
    {
        title: 'Data Science & Analytics',
        color: 'green',
        sections: [
            {
                label: 'Analysis & Visualization',
                items: ['Power BI', 'Pandas', 'Matplotlib/Seaborn']
            },
            {
                label: 'Machine Learning',
                items: ['Model Development', 'Neural Architectures', 'Applied AI', 'Model Optimization']
            }
        ]
    },
    {
        title: 'Product & Visual Design',
        color: 'purple',
        sections: [
            {
                label: 'UI/UX',
                items: ['User Interface Design', 'User Experience Design', 'Wireframing', 'Prototyping']
            },
            {
                label: 'Tools',
                items: ['Figma', 'Adobe Creative Suite']
            }
        ]
    },
    {
        title: 'Computer Science Foundations',
        color: 'orange',
        sections: [
            {
                label: 'Operating Systems',
                items: ['Virtualization', 'Concurrency', 'Persistence']
            },
            {
                label: 'Networking',
                items: ['TCP/IP Fundamentals']
            }
        ]
    }
];

/**
 * Build essentials section
 */
function buildEssentialsSection() {
    const section = document.createElement('section');
    section.id = 'essentials';
    section.className = 'mb-16';
    
    const title = document.createElement('h2');
    title.className = 'text-3xl font-bold text-center mb-8';
    title.textContent = 'Essentials';
    section.appendChild(title);
    
    const contentWrapper = document.createElement('div');
    contentWrapper.className = 'max-w-3xl mx-auto';
    
    const intro = ComponentFactory.render('paragraph', {
        text: 'A creative developer and designer with a passion for building elegant solutions to complex challenges. I am a quick learner who thrives on leading products through the full lifecycle, from research and design to development and implementation. My focus is on delivering impactful software and physical creations while continuously improving the processes behind them.',
        className: 'text-lg text-left text-black'
    });
    contentWrapper.appendChild(intro);
    
    const competenciesWrapper = document.createElement('div');
    competenciesWrapper.className = 'mt-8';
    
    const competenciesTitle = document.createElement('h3');
    competenciesTitle.className = 'text-2xl font-bold text-center mb-6';
    competenciesTitle.textContent = 'Core Competencies';
    competenciesWrapper.appendChild(competenciesTitle);
    
    const competencyCards = COMPETENCIES.map(comp => 
        ComponentFactory.render('competencyCard', comp)
    );
    
    const grid = ComponentFactory.render('grid', {
        children: competencyCards,
        columns: 2,
        gap: 6
    });
    
    competenciesWrapper.appendChild(grid);
    contentWrapper.appendChild(competenciesWrapper);
    section.appendChild(contentWrapper);
    
    return section;
}

/**
 * Build project highlights section
 */
function buildHighlightsSection() {
    const section = document.createElement('section');
    section.id = 'highlights';
    section.className = 'mb-16';
    
    const title = document.createElement('h2');
    title.className = 'text-3xl font-bold text-center mb-8';
    title.textContent = 'Project Highlights';
    section.appendChild(title);
    
    const wrapper = document.createElement('div');
    wrapper.className = 'flex justify-center';
    
    const projectHighlight = ComponentFactory.render('projectHighlight', {
        href: '/pages/project-catalog.html',
        imagePath: '/assets/simplechart.png',
        title: 'Project Catalog',
        problem: 'Time-consuming file searches for account managers.',
        approach: 'Built a full-stack AI-powered app for intelligent file retrieval.'
    });
    
    wrapper.appendChild(projectHighlight);
    section.appendChild(wrapper);
    
    return section;
}

/**
 * Initialize the simple page
 */
function initSimplePage() {
    performanceMonitor.measure('initSimplePage', () => {
        // Initialize page template
        PageTemplate.initialize({
            title: 'The Simple Path - Callum Doty'
        });
        
        // Get or create main container
        let main = document.querySelector('main');
        if (!main) {
            main = document.createElement('main');
            document.body.appendChild(main);
        }
        
        // Clear existing content
        main.innerHTML = '';
        
        // Build page sections
        const container = ComponentFactory.render('container', {
            children: [
                buildEssentialsSection(),
                buildHighlightsSection()
            ]
        });
        
        main.appendChild(container);
    });
    
    if (CONFIG.ENV === 'development') {
        performanceMonitor.log();
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSimplePage);
} else {
    initSimplePage();
}
