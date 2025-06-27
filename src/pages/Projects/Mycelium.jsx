import React from 'react';
import '../../styles/Mycelium.css';
import '../../styles/Project_Catalog.css';

import heroImg from '../../assets/mycelium/DSC01688-1024x683.jpg';
import img1 from '../../assets/mycelium/DSC01689-1024x683.jpg';
import img2 from '../../assets/mycelium/DSC01691-1024x683.jpg';
import img3 from '../../assets/mycelium/DSC01692-1024x683.jpg';
import img4 from '../../assets/mycelium/DSC01695-1024x683.jpg';
import img5 from '../../assets/mycelium/DSC01697-1024x683.jpg';
import img6 from '../../assets/mycelium/DSC01699-1024x683.jpg';
import img7 from '../../assets/mycelium/DSC01700-1024x683.jpg';
import img8 from '../../assets/mycelium/DSC01704-1024x683.jpg';

const Mycelium = () => {
  const otherProjectsData = [
    {
      id: 'problem',
      title: 'Context',
      subtitle: "I led a team of 18 graphic designers in creating a comprehensive catalog for ninety clients, overseeing everything from concept to completion. Working alongside installation and branding teams, we crafted a cohesive publication centered on the theme of 'mycelium'.",
    },
    {
      id: 'solution',
      title: 'Solution',
      subtitle: "Our solution combined elegance with innovation: individual vellum pages showcase each student's work through customized templates. The translucent design enables viewers to create dynamic compositions by overlaying different projects, embodying the interconnected nature of mycelium.",
    },
    {
      id: 'role',
      title: 'My Role',
      subtitle: [
        'Catalog Manager',
        'Research Coordinator',
        'Design Coordinator',
        'Print Coordinator',
        'Assembly Coordinator'
      ],
    }
  ];

  const galleryImages = [
    { src: img1, alt: "Gallery Image 1" },
    { src: img2, alt: "Gallery Image 2" },
    { src: img3, alt: "Gallery Image 3" },
    { src: img4, alt: "Gallery Image 4" },
    { src: img5, alt: "Gallery Image 5" },
    { src: img6, alt: "Gallery Image 6" },
    { src: img7, alt: "Gallery Image 7" },
    { src: img8, alt: "Gallery Image 8" },
  ];
  
  return (
    <div className="cherge-page-wrapper">
      <main className="cherge-main-content">
        <section className="unified-initials-section">
          <div className="unified-initials-text-content">
            <h1 className="project-catalog-title cherge-specific-title">Mycelium</h1>
            <p className="project-catalog-subtitle">
              Mycelium is a seventy-page catalog for the 2023 Virginia Commonwealth University graphic design exhibition.
            </p>
            <div className=".project-catalog-title">
              <h3 className="cherge-detail-item">Catalog Design</h3>
              <h3 className="cherge-detail-item">Team Leadership</h3>
              <h3 className="cherge-detail-item">Print Production</h3>
              <h3 className="cherge-detail-item">Project Management</h3>
            </div>
          </div>
          <div className="unified-initials-image-container">
            <img src={heroImg} alt="Mycelium Catalog" className="unified-initials-image" />
          </div>
        </section>

        <section className="catalog-projects-overview-section" id="other-projects">
        <div className="catalog-projects-grid">
          {otherProjectsData.map(project => (
            <div key={project.id} className="catalog-project-card-link">
              <div className="catalog-project-card">
                <h3>{project.title}</h3>
                {Array.isArray(project.subtitle) ? (
                  <ul>
                    {project.subtitle.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p>{project.subtitle}</p>
                )}
              </div>
            </div>
          ))}
        </div>
                <div className="gallery-section">
                    <h2 className="project-catalog-title cherge-specific-title">Project Gallery</h2>
                    <div className="gallery-grid">
                        {galleryImages.map((image, index) => (
                        <div key={index} className="gallery-item">
                            <img 
                                src={image.src} 
                                alt={image.alt} 
                                className="gallery-image"
                                loading={index > 3 ? "lazy" : "eager"}
                            />
                        </div>
                        ))}
                    </div>
                </div>
        </section>
      </main>
    </div>
  );
};

export default Mycelium;
