import React from 'react';
import '../styles/About.css'; // Styles will be updated
import profile from "../assets/profile.png";
import modular2 from "../assets/modular2.png"; // Import the new image

const About = () => {
  return (
    <div className="abgd-home-wrapper about-page-specific-styling"> {/* Added abgd-home-wrapper and a specific class */}
      <main className="abgd-main-content"> {/* Added abgd-main-content */}
        {/* Section for "About me" title, similar to home-main-text if desired */}
        {/* For now, keeping existing structure within abgd-main-content */}

        <div className="about-intro-container"> {/* Renamed from about-container for clarity, acts like description-container */}
          {/* Image column removed */}
          <div className="about-text-column">
            {/* New structure for "initials" style */}
            <section className="about-title-section"> {/* Similar to unified-initials-section */}
              <h1 className="about-main-text">ABOUT ME</h1> {/* Styled like home-main-text */}
              <div className="about-text-details"> {/* Styled like text-details */}
                <p>PROBLEM SOLVER</p> {/* This can be the main name */}
                <p>SOFTWARE DEVELOPER</p> {/* Adapted from subtitle */}
                <p>GRAPHIC DESIGNER</p> {/* Adapted from subtitle */}
                <p>CONTINUOUS LEARNER</p> {/* Adapted from paragraphs */}
              </div>
            </section>
            
            {/* Remaining paragraph content, styled appropriately */}
            <div className="image-text-row"> {/* New wrapper for image and text */}
              <div className="about-image-container"> {/* Image first for left alignment */}
                <img src={modular2} alt="Modular Design" className="about-modular-image" />
              </div>
              <div className="about-narrative"> {/* Text second */}
                <p>
                  I’m a junior developer currently in Kansas City. I studied Graphic Design at Virginia Commonwealth University, and have self-studied to learn a bit of computer science, networking, data science, machine learning, and information technology. I partake in chess, fitness, and league.
                </p>
                <p>
                  I enjoy learning about how things work at a granular level, in particular computer systems, AI, and coding languages. Philosophy of science, specifically bayesian theory/analysis is incredibly interesting, and I’m always looking for new challenges and opportunities to grow.
                </p>
              
              </div>
            </div>
          </div>
        </div>

        <section className="skills-section"> {/* Wrapped skills in a section */}
          {/* Consider a main title for skills if it fits the home page style */}
          {/* <h2>My Skills</h2> */}
          <div className="skills-container-grid"> {/* Renamed from skills-container for clarity */}
            <div className="skills-column education">
              <h3>Broad Knowledge</h3>
              <ul>
                <li>
                  <h4>Self-Initiated Curriculum</h4>
                  <p>Collection of books studied:</p>
                  <ul className="book-list">
                    <li>Operating Systems: Three Easy Pieces</li>
                    <li>Inside the Machine</li>
                    <li>C++ Concurrency in Action</li>
                    <li>Design Patterns: Elements of Reusable Object-Oriented Software</li>
                    <li>TCP/IP Illustrated, Volume 1</li>
                  </ul>
                  <span>January - June 2025</span>
                </li>
                <li>
                  <h4>CS50x</h4>
                  <p>Online Harvard Course</p>
                  <span>August - December 2024</span>
                </li>
                <li>
                  <h4>Deep Learning Specialization</h4>
                  <p>DeepLearning.ai Certification</p>
                  <span>July - November 2024</span>
                </li>
                <li>
                  <h4>IBM Data Science</h4>
                  <p>IBM Certification</p>
                  <span>May - August 2024</span>
                </li>
                <li>
                  <h4>Power BI Data Analyst Associate</h4>
                  <p>Microsoft Certification</p>
                  <span>January - May 2024</span>
                </li>
                <li>
                  <h4>CompTIA A+ ce</h4>
                  <p>Pearson Certification</p>
                  <span>August - December 2023</span>
                </li>
                <li>
                  <h4>Google UX Design</h4>
                  <p>Google Certification</p>
                  <span>August - December 2023</span>
                </li>
                <li>
                  <h4>Virginia Commonwealth University</h4>
                  <p>Graphic Design</p>
                  <span>2019 - 2023</span>
                </li>
              </ul>
            </div>

          </div>
        </section>
      </main>
    </div>
  );
};

export default About;
