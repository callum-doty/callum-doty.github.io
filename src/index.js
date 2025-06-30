document.addEventListener('DOMContentLoaded', () => {
    const mainContent = document.querySelector('main');
    const navLinks = document.querySelectorAll('[data-path]');

    async function loadPage(page, pushState = true) {
        try {
            let url;
            if (page.startsWith('blog')) {
                // Handles "blog" and "blog/blog-post-1", etc.
                const pagePath = page === 'blog' ? 'blog/index' : page;
                url = `/pages/${pagePath}.html`;
            } else {
                url = `/pages/${page}.html`;
            }

            const response = await fetch(url);
            if (!response.ok) {
                // If the page doesn't exist, load the fork page as a fallback
                if (page !== 'fork') {
                    console.warn(`Page "${page}" not found, loading fork page.`);
                    loadPage('fork');
                } else {
                    throw new Error(`Failed to load page: ${response.statusText}`);
                }
                return;
            }
            const html = await response.text();
            mainContent.innerHTML = html;
            updateHeader(page);
            if (page === 'fork') {
                renderForkPageCards();
            } else {
                const footer = createFooter();
                mainContent.appendChild(footer);
            }
            window.scrollTo(0, 0);

            if (pushState) {
                // Add a new entry to the browser's history
                const pagePath = page === 'blog' ? 'blog/index' : page;
                const newPath = page === 'fork' ? '/' : `/${pagePath}`;
                history.pushState({ page: page }, '', newPath);
            }

            reloadTailwind();
        } catch (error) {
            console.error("Error loading page:", error);
            mainContent.innerHTML = `<p class="text-center text-red-500">Error: Could not load page.</p>`;
        }
    }

    function reloadTailwind() {
        const tailwindScript = document.querySelector('script[src="https://cdn.tailwindcss.com"]');
        if (tailwindScript) {
            tailwindScript.remove();
        }
        const newScript = document.createElement('script');
        newScript.src = 'https://cdn.tailwindcss.com';
        document.head.appendChild(newScript);
    }

    function updateHeader(page) {
        let header = document.querySelector('header');
        if (page !== 'fork') {
            if (!header) {
                header = document.createElement('header');
                header.className = 'bg-white shadow-md sticky top-0 z-10';
                document.body.prepend(header);
            }

            if (page === 'simple') {
                header.innerHTML = `
                    <nav class="container mx-auto px-6 py-4 flex justify-between items-center">
                        <a href="/" class="text-lg font-bold cursor-pointer" data-path="fork">Callum Doty</a>
                        <div>
                            <a href="/complex" data-path="complex" class="text-black hover:text-indigo-800">Take the Complex Path &rarr;</a>
                        </div>
                    </nav>
                `;
            } else {
                header.innerHTML = `
                    <nav class="container mx-auto px-6 py-4 flex justify-between items-center">
                        <a href="/" class="text-lg font-bold cursor-pointer" data-path="fork">Callum Doty</a>
                        <div>
                            <a href="/complex" data-path="complex" class="text-black hover:text-indigo-800 mr-6">Work</a>
                            <a href="/about" data-path="about" class="text-black hover:text-indigo-800 mr-6">About</a>
                            <a href="/blog" data-path="blog" class="text-black hover:text-indigo-800">Blog</a>
                        </div>
                    </nav>
                `;
            }

            // Highlight the active page link
            const navLinks = header.querySelectorAll('a[data-path]');
            navLinks.forEach(link => {
                const linkPath = link.getAttribute('data-path');
                const isActive = (linkPath === page) || (page.startsWith('blog') && linkPath === 'blog');
                if (isActive) {
                    link.classList.add('text-indigo-600', 'font-bold');
                    link.classList.remove('text-black');
                } else {
                    link.classList.remove('text-indigo-600', 'font-bold');
                    link.classList.add('text-black');
                }
            });
        } else {
            if (header) {
                header.remove();
            }
        }
    }

    // DELEGATED EVENT LISTENER FOR NAVIGATION
    document.body.addEventListener('click', (event) => {
        const target = event.target.closest('[data-path]');
        if (target) {
            event.preventDefault();
            const pageId = target.getAttribute('data-path');
            loadPage(pageId);
        }
    });

    // Listen for browser back/forward navigation
    window.addEventListener('popstate', (event) => {
        if (event.state && event.state.page) {
            loadPage(event.state.page, false); // Don't push a new state
        } else {
            // Handle cases where state is null (e.g., initial page load)
            const path = window.location.pathname.substring(1).replace('.html', '');
            const pageId = path.replace('blog/index', 'blog');
            loadPage(pageId || 'fork', false);
        }
    });

    // Load the initial page based on the URL path
    let initialPath = window.location.pathname.substring(1).replace('.html', '');
    if (initialPath.endsWith('/')) {
        initialPath = initialPath.slice(0, -1);
    }
    const pageId = initialPath.replace('blog/index', 'blog');
    loadPage(pageId || 'fork');

    function renderForkPageCards() {
        const cardContainer = document.getElementById('card-container');
        if (!cardContainer) return;

        const cardData = [
            {
                href: '/simple',
                dataPath: 'simple',
                svgPath: 'M14 5l7 7m0 0l-7 7m7-7H3',
                title: 'The Simple Path',
                description: 'A concise overview of my skills and impact.'
            },
            {
                href: '/complex',
                dataPath: 'complex',
                svgPath: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6',
                title: 'The Complex Path',
                description: 'A detailed look at my process and projects.'
            }
        ];

        cardData.forEach(data => {
            const card = createCard(data);
            cardContainer.appendChild(card);
        });
    }
});
