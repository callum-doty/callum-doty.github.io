import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom'; // Import Link, useLocation
import '../styles/Home.css'; // We will create/update this
import modularImagePath from '../assets/modular.png'; // Import the image


const projectsData = [
  {
    id: 'cherge',
    title: 'Project Catalog',
    subtitle: 'Project Catalog is an ongoing, self-initiated project using AI to extract data, semantically understand, and help end users find relevant files faster',
    path: '/projects/project-catalog',
    // Add a representative image path if available and desired for the card
    // image: '/path/to/cherge-preview.jpg', 
  },
  {
    id: 'mycelium',
    title: 'Mycelium',
    subtitle: 'Mycelium is a seventy-page catalog for the 2023 Virginia Commonwealth University graphic design exhibition.',
    path: '/projects/mycelium',
    // image: '/path/to/mycelium-preview.jpg',
  },
  {
    id: 'palter',
    title: 'Palter',
    subtitle: 'Palter is a four to eight player social deduction game concerning subtle hints and observations via a mind-bending dialogue.',
    path: '/projects/palter',
    // image: '/path/to/palter-preview.jpg',
  },
];

const equations = [
  { text: "I=C∪D", className: "equation-short" },
  { text: "Identity={C,D}", className: "equation-medium" },
  { text: <span>f(C,D)<span className="equation-arrow">→</span>I</span>, className: "equation-tall" }
];

const Home = () => {
  const [equation, setEquation] = useState({ text: '', className: '' });

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * equations.length);
    setEquation(equations[randomIndex]);
  }, []);

  const location = useLocation();
  const projectsSectionRef = useRef(null);

  useEffect(() => {
    if (location.hash === '#projects' && projectsSectionRef.current) {
      projectsSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location]); // Rerun on location change

  return (
    <div className="abgd-home-wrapper">
      {/* The header that was here has been removed, as the global Header component in App.js serves this purpose. */}
      <main className="abgd-main-content">
        <section className="unified-initials-section home-page-initials">
          <h1 className={`home-main-text ${equation.className}`}>{equation.text}</h1>
          <div className="text-details">
            <p>CALLUM DOTY</p>
            <p>BASED IN AMERICA</p>
            <p>DESIGNER OF SOLUTIONS</p>
            <p>ALWAYS LEARNING</p>
          </div>
        </section>

        <div className="description-container">
          <section className="description-section">
            <p style={{ marginBottom: '1em' }}>
              As a developer and designer, I focus on product development across software, architecture, and physical forms. I operate on the belief that half of the problem is defining the problem, including the decision to simplify or add complexity.
            </p>

            <p>
              I've found the most successful solutions start with building a quick and dirty proof of concept. My approach is part of a larger design process defined by iteration, computer science fundamentals, and user feedback.
            </p>
          </section>
          <img src={modularImagePath} alt="Modular Design" className="description-image" />
        </div>

        <section ref={projectsSectionRef} className="home-projects-overview-section" id="projects">
          <h2>Projects</h2>
          <div className="home-projects-grid">
            {projectsData.map(project => (
              <Link to={project.path} key={project.id} className="home-project-card-link">
                <div className="home-project-card">
                  {/* Optional: Add project.image here if you have preview images */}
                  {/* <img src={project.image} alt={project.title} className="project-card-image" /> */}
                  <h3>{project.title}</h3>
                  <p>{project.subtitle}</p>
                  <span className="home-project-card-cta">View Project &rarr;</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        
      </main>

      {/* The animated striped graphic would be a more complex component, 
          for now, we'll omit it or add a placeholder if simple.
          Let's omit for now to focus on layout. */}
      {/* <div className="abgd-animated-graphic-placeholder"></div> */}
    </div>
  );
};

export default Home;
