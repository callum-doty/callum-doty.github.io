/**
 * Simple Page Initialization
 * Dynamically builds page content using ComponentFactory
 */

import { ComponentFactory } from "./core/ComponentFactory.js";
import { PageTemplate } from "./core/PageTemplate.js";
import { performanceMonitor } from "./utils/PerformanceMonitor.js";
import { CONFIG } from "./config.js";

/**
 * Core Competencies
 */
const COMPETENCIES = [
  {
    title: "Software Development",
    color: "indigo",
    sections: [
      {
        label: "Languages",
        items: ["Python", "JavaScript (React)", "SQL", "C++"]
      },
      {
        label: "Databases",
        items: ["PostgreSQL", "MySQL"]
      },
      {
        label: "Development Principles",
        items: ["Design Patterns", "Version Control (Git)"]
      }
    ]
  },
  {
    title: "Data Science & Analytics",
    color: "green",
    sections: [
      {
        label: "Analysis & Visualization",
        items: ["Power BI", "Pandas", "Matplotlib", "Seaborn"]
      },
      {
        label: "Machine Learning",
        items: [
          "Model Development",
          "Neural Architectures",
          "Applied AI",
          "Model Optimization"
        ]
      }
    ]
  },
  {
    title: "Product & Visual Design",
    color: "purple",
    sections: [
      {
        label: "UI/UX",
        items: [
          "User Interface Design",
          "User Experience Design",
          "Wireframing",
          "Prototyping"
        ]
      },
      {
        label: "Tools",
        items: ["Figma", "Adobe Creative Suite"]
      }
    ]
  },
  {
    title: "Computer Science Foundations",
    color: "orange",
    sections: [
      {
        label: "Operating Systems",
        items: ["Virtualization", "Concurrency", "Persistence"]
      },
      {
        label: "Networking",
        items: ["TCP/IP Fundamentals"]
      }
    ]
  }
];

/**
 * Build Essentials Section
 */
function buildEssentialsSection() {
  const section = document.createElement("section");
  section.id = "essentials";
  section.className = "mb-16";

  const title = document.createElement("h2");
  title.className = "text-3xl font-bold text-center mb-8";
  title.textContent = "Essentials";

  const wrapper = document.createElement("div");
  wrapper.className = "max-w-3xl mx-auto";

  const intro = ComponentFactory.render("paragraph", {
    text:
      "A developer and analytical problem-solver focused on building systems that turn complex data into actionable decisions. My work spans statistical modeling, software development, and product design, allowing me to lead projects from research and experimentation through implementation. I enjoy tackling problems where rigorous analysis and well-designed software can meaningfully improve how teams make decisions.",
    className: "text-lg text-left text-black"
  });

  const competenciesTitle = document.createElement("h3");
  competenciesTitle.className = "text-2xl font-bold text-center mt-8 mb-6";
  competenciesTitle.textContent = "Core Competencies";

  const competencyCards = COMPETENCIES.map((comp) =>
    ComponentFactory.render("competencyCard", comp)
  );

  const grid = ComponentFactory.render("grid", {
    children: competencyCards,
    columns: 2,
    gap: 6
  });

  wrapper.appendChild(intro);
  wrapper.appendChild(competenciesTitle);
  wrapper.appendChild(grid);

  section.appendChild(title);
  section.appendChild(wrapper);

  return section;
}

/**
 * Build Project Highlights Section
 */
function buildHighlightsSection() {
  const section = document.createElement("section");
  section.id = "highlights";
  section.className = "mb-16";

  const title = document.createElement("h2");
  title.className = "text-3xl font-bold text-center mb-8";
  title.textContent = "Project Highlights";

  const wrapper = document.createElement("div");
  wrapper.className = "grid md:grid-cols-2 gap-8 max-w-4xl mx-auto";

  const projects = [
    {
      href: "/pages/project-catalog.html",
      title: "Project Catalog",
      description: "AI-powered political file management system"
    },
    {
      href: "/pages/axiom-BSM.html",
      title: "Axiom-BSM",
      description: "Portfolio-based campaign optimization framework"
    },
    {
      href: "/pages/kalshi.html",
      title: "Kalshi Quantitative Trading",
      description: "ML ensemble trading system for weather prediction markets"
    }
  ];

  projects.forEach((project) => {
    wrapper.appendChild(
      ComponentFactory.render("projectHighlight", project)
    );
  });

  section.appendChild(title);
  section.appendChild(wrapper);

  return section;
}

/**
 * Initialize Page
 */
function initPage() {
  performanceMonitor.measure("pageInitialization", () => {
    PageTemplate.initialize({
      title: "The Simple Path - Callum Doty"
    });

    let main = document.querySelector("main");

    if (!main) {
      main = document.createElement("main");
      document.body.appendChild(main);
    }

    main.innerHTML = "";

    const container = ComponentFactory.render("container", {
      children: [
        buildEssentialsSection(),
        buildHighlightsSection()
      ]
    });

    main.appendChild(container);
  });

  if (CONFIG.ENV === "development") {
    performanceMonitor.log();
  }
}

/**
 * Run when DOM is ready
 */
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initPage);
} else {
  initPage();
}