/**
 * About page initialization
 * Uses ComponentFactory to build page content dynamically
 */

import { ComponentFactory } from './core/ComponentFactory.js';
import { PageTemplate } from './core/PageTemplate.js';
import { performanceMonitor } from './utils/PerformanceMonitor.js';
import { CONFIG } from './config.js';

/**
 * Education and certification timeline data
 */
const TIMELINE_DATA = [
    {
        title: 'Self-Initiated Curriculum',
        description: '',
        date: 'Completed - June 2025',
        isLarge: true,
        hasList: true,
        listTitle: 'Collection of books studied:',
        listItems: [
            'Operating Systems: Three Easy Pieces',
            'Inside the Machine',
            'C++ Concurrency in Action',
            'Design Patterns: Elements of Reusable Object-Oriented Software',
            'TCP/IP Illustrated, Volume 1'
        ]
    },
    {
        title: 'CS50x',
        description: 'Online Harvard Course',
        date: 'Completed - December 2024'
    },
    {
        title: 'Deep Learning Specialization',
        description: 'DeepLearning.ai Certification',
        date: 'Completed - November 2024'
    },
    {
        title: 'IBM Data Science',
        description: 'IBM Certification',
        date: 'Completed - August 2024'
    },
    {
        title: 'Power BI Data Analyst Associate',
        description: 'Microsoft Certification',
        date: 'Completed - May 2024'
    },
    {
        title: 'CompTIA A+ ce',
        description: 'Pearson Certification',
        date: 'Completed - December 2023'
    },
    {
        title: 'Google UX Design',
        description: 'Google Certification',
        date: 'Completed - December 2023'
    },
    {
        title: 'Virginia Commonwealth University',
        description: 'BFA in Graphic Design with minor in Philosophy 2023',
        date: '',
        isLarge: true
    }
];

/**
 * Build the about me section
 */
function buildAboutSection() {
    const wrapper = document.createElement('div');
    wrapper.className = 'max-w-3xl mx-auto';
    
    const title = document.createElement('h1');
    title.className = 'text-4xl font-bold mb-4';
    title.textContent = 'About Me';
    wrapper.appendChild(title);
    
    const para1 = ComponentFactory.render('paragraph', {
        text: "I'm a junior developer currently in Kansas City. I studied Graphic Design at Virginia Commonwealth University, and have self-studied to learn a bit of computer science, networking, data science, machine learning, and information technology. I partake in chess, fitness, and league."
    });
    wrapper.appendChild(para1);
    
    const para2 = ComponentFactory.render('paragraph', {
        text: "I enjoy learning about how things work at a granular level, in particular computer systems, AI, and coding languages. Philosophy of science, specifically bayesian theory/analysis is incredibly interesting, and I'm always looking for new challenges and opportunities to grow.",
        className: 'text-lg text-black leading-relaxed mt-8'
    });
    wrapper.appendChild(para2);
    
    const section = ComponentFactory.render('section', {
        content: wrapper
    });
    
    return section;
}

/**
 * Build the education timeline section
 */
function buildTimelineSection() {
    const wrapper = document.createElement('div');
    wrapper.className = 'max-w-3xl mx-auto';
    
    const title = document.createElement('h2');
    title.className = 'text-4xl font-bold mb-4';
    title.textContent = 'Broad Knowledge';
    wrapper.appendChild(title);
    
    TIMELINE_DATA.forEach((item, index) => {
        const timelineItem = document.createElement('div');
        timelineItem.className = index === 0 || item.isLarge ? 
            'border-l-2 border-indigo-200 pl-8 py-4 relative mt-6' : 
            'border-l-2 border-indigo-200 pl-8 py-4 relative';
        
        const dot = document.createElement('div');
        dot.className = 'absolute w-4 h-4 bg-indigo-600 rounded-full -left-2 top-4';
        timelineItem.appendChild(dot);
        
        const itemTitle = document.createElement('h3');
        itemTitle.className = item.isLarge ? 'text-2xl font-bold mb-4' : 'text-xl font-bold';
        itemTitle.textContent = item.title;
        timelineItem.appendChild(itemTitle);
        
        if (item.hasList) {
            const list = ComponentFactory.render('list', {
                title: item.listTitle,
                items: item.listItems
            });
            timelineItem.appendChild(list);
        } else if (item.description) {
            const desc = document.createElement('p');
            desc.className = item.isLarge ? 'text-lg text-black' : 'text-black';
            desc.textContent = item.description;
            timelineItem.appendChild(desc);
        }
        
        if (item.date) {
            const date = document.createElement('p');
            date.className = 'text-black mt-4';
            date.textContent = item.date;
            timelineItem.appendChild(date);
        }
        
        wrapper.appendChild(timelineItem);
    });
    
    const section = ComponentFactory.render('section', {
        className: 'mt-16',
        content: wrapper
    });
    
    return section;
}

/**
 * Initialize the about page
 */
function initAboutPage() {
    performanceMonitor.measure('initAboutPage', () => {
        // Initialize page template
        PageTemplate.initialize({
            title: 'About Me - Callum Doty'
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
                buildAboutSection(),
                buildTimelineSection()
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
    document.addEventListener('DOMContentLoaded', initAboutPage);
} else {
    initAboutPage();
}
