import React from 'react';
import '../../styles/Palter.css';
import '../../styles/Project_Catalog.css';

import heroImg from '../../assets/palteretc/DSC01646-1024x683.jpg';
import img1 from '../../assets/palteretc/DSC01643-1024x683.jpg';
import img2 from '../../assets/palteretc/DSC01644-1024x683.jpg';
import img3 from '../../assets/palteretc/DSC01648-1024x683.jpg';
import img4 from '../../assets/palteretc/DSC01646-1024x683.jpg';
import img5 from '../../assets/palteretc/DSC01647-1024x683.jpg';
import img6 from '../../assets/palteretc/DSC01655-1024x683.jpg';
import img7 from '../../assets/palteretc/DSC01657-1024x683.jpg';
import img8 from '../../assets/palteretc/DSC01659-1024x683.jpg';
import img9 from '../../assets/palteretc/DSC01662-1024x683.jpg';
import img10 from '../../assets/palteretc/DSC01664-1024x683.jpg';
import img11 from '../../assets/palteretc/DSC01675-1024x683.jpg';
import img12 from '../../assets/palteretc/p1.jpg';
import img15 from '../../assets/palteretc/DSC01666-1024x683.jpg';


const Palter = () => {
  const videoId = "Ses9fye4dFc";
  const embedUrl = `https://www.youtube.com/embed/${videoId}`;

  const otherProjectsData = [
    {
      id: 'problem',
      title: 'Context',
      subtitle: 'When challenged to design a game, I created a physical experience that balanced key elements: replayability, strategic depth, intuitive rules, and above all – pure fun.',
    },
    {
      id: 'solution',
      title: 'Solution',
      subtitle: 'After multiple iterations and rigorous user testing, I developed Palter – a game that achieves its core goals: replayability, strategic depth, accessibility, and fun.',
    },
    {
      id: 'role',
      title: 'My Role',
      subtitle: [
        'Lead Concept Researcher',
        'Lead Qualitative Researcher',
        'Lead Material Researcher',
        'Lead Graphic Designer',
        'Lead Package Designer',
        'Lead Brand Designer'
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
    { src: img9, alt: "Gallery Image 9" },
    { src: img10, alt: "Gallery Image 10" },
    { src: img11, alt: "Gallery Image 11" },
    { src: img12, alt: "Gallery Image 12" },
    { src: img1, alt: "Gallery Image 13" },
    { src: img2, alt: "Gallery Image 14" },
    { src: img15, alt: "Gallery Image 15" },
    { src: img4, alt: "Gallery Image 16" }
  ];
  
  return (
    <div className="cherge-page-wrapper">
      <main className="cherge-main-content">
        <section className="unified-initials-section">
          <div className="unified-initials-text-content">
            <h1 className="project-catalog-title cherge-specific-title">Palter</h1>
            <p className="project-catalog-subtitle">
              Palter is a four to eight player social deduction game concerning subtle
              hints and observations via a mind-bending dialogue. 
            </p>
            <div className=".project-catalog-title">
              <h3 className="cherge-detail-item">Game Design</h3>
              <h3 className="cherge-detail-item">User Testing</h3>
              <h3 className="cherge-detail-item">Brand Design</h3>
              <h3 className="cherge-detail-item">Package Design</h3>
            </div>
          </div>
          <div className="unified-initials-image-container">
            <img src={heroImg} alt="Palter Game" className="unified-initials-image" />
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
                <div className="video-section">
                    <h2 className="project-catalog-title cherge-specific-title">Demo</h2>
                    <div className="video-container">
                    <iframe
                        className="youtube-video"
                        src={embedUrl}
                        title="Palter Game Demo"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer"
                    ></iframe>
                    </div>
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

export default Palter;
