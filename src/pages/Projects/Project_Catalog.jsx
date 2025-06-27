import React, { useState } from 'react'; // Import useState
import { Link } from 'react-router-dom'; // Import Link
import '../../styles/Project_Catalog.css';
import simplechart from '../../assets/simplechart.png'; // Replaced chergeHero with simplechart
import mycelium1 from '../../assets/mycelium/DSC01688-1024x683.jpg';
import mycelium2 from '../../assets/mycelium/DSC01689-1024x683.jpg';
import mycelium3 from '../../assets/mycelium/DSC01691-1024x683.jpg';
import mycelium4 from '../../assets/mycelium/DSC01692-1024x683.jpg';
import modular from '../../assets/modular.png'; // Added import for modular.png

const ProjectCatalog = () => {
  const galleryImages = [mycelium1, mycelium2, mycelium3, mycelium4];
  const [selectedImage, setSelectedImage] = useState(galleryImages[0]);

  const otherProjectsData = [
    {
      id: 'mycelium',
      title: 'CONTEXT',
      subtitle: 'Hired for the election-cycle of 2024, my role was to offload the trivial tasks of the senior graphic designers. After the cycle, I audited my peers and my own processes to see what could be improved. The time spent finding a specific file, either for accessing the working files or for content, through Dropbox took between 1 to 5 minutes. This was a significant chunk of time given hundreds of edits. If an application existed that could tag, categorize, and allow for user querying, it could save hours of time.',
    },
    {
      id: 'palter',
      title: 'STACK',
      subtitle: {
        backendStackPt1: [
          "Python 3.9",
          "Flask 3.1.0",
          "Gunicorn 20.1.0",
          "PostgreSQL",
          "Redis 5.2.1",
          "Celery 5.4.0",
          "SQLAlchemy 2.0.37",
          "Alembic 1.14.1",
          "MinIO 7.2.15",
          "Dropbox API 11.36.2",
          "Anthropic Claude API",
          "OpenAI API",
          "Tesseract OCR",
          "Docker"
        ],
        frontendStack: [
          "Jinja2 3.1.5",
          "HTML5",
          "Tailwind CSS",
          "Vanilla JavaScript ES6+",
          "Custom CSS"
        ],

        description: "The application is designed to be deployed on a cloud platform and accessed through a web-interface(chrome/edge/safari). Currently deployed to Render."
      },
      path: '/projects/palter',
    },
    {
      id: 'new-project-1',
      title: 'ROLE',
      subtitle: [
        'Product Manager | Conceived idea, defined requirements, created project charter',
        'Solutions Architect/Technical Architect | Designed system architecture, selected tech stack',
        'Full-Stack Software Engineer | Built complete web application with Flask backend and JavaScript frontend',
        'Data Engineer | Designed database schema, implemented ETL pipelines, built vector search',
        'DevOps Engineer/Platform Engineer | Created Docker containerization, deployed to render',
        'AI/ML Engineer | Integrated Claude/OpenAI APIs, built embeddings system, implemented document analysis'
      ],
      path: '/projects/creative-branding', // Example path
    },
  ];

  return (
    <div className="cherge-page-wrapper">
      <main className="cherge-main-content">
        <section className="unified-initials-section">
          <div className="unified-initials-text-content"> {/* Wrapper for text content */}
            <h1 className="project-catalog-title cherge-specific-title">Project Catalog</h1>
            <p className="project-catalog-subtitle">
              A full-stack application developed for Axiom Strategies, a national political consulting firm. This self-initiated project leverages AI to help users find relevant files more efficiently. Spanning over six months, the project involved end-to-end execution, from user-centered design and project management to full-stack development and business systems analysis.
            </p>
            <div className=".project-catalog-title">
              <h3 className="cherge-detail-item">Artificial Intelligence</h3>
              <h3 className="cherge-detail-item">Categorization</h3>
              <h3 className="cherge-detail-item">Full Stack Development</h3>
              <h3 className="cherge-detail-item">User-Centered Design</h3>
            </div>
          </div> {/* End of text-content wrapper */}
          <div className="unified-initials-image-container"> {/* Wrapper for the image */}
            <img src={simplechart} alt="Simple Chart Visual" className="unified-initials-image" />
          </div>
        </section>

      <section className="catalog-projects-overview-section" id="other-projects">
      
        <div className="catalog-projects-grid">
          {otherProjectsData.map(project => (
            <div key={project.id} className="catalog-project-card-link"> {/* Changed Link to div */}
              <div className="catalog-project-card">
                {/* Optional: Add project.image here if you have preview images */}
                {/* <img src={project.image} alt={project.title} className="project-card-image" /> */}
                <h3>{project.title}</h3>
                {Array.isArray(project.subtitle) ? (
                  <ul className="role-list">
                    {project.subtitle.map((item, index) => {
                      const parts = item.split(' | ');
                      return (
                        <li key={index}>
                          <span className="role-title">{parts[0]}</span>
                          <span className="role-description">{parts[1]}</span>
                        </li>
                      );
                    })}
                  </ul>
                ) : typeof project.subtitle === 'object' && project.subtitle !== null && project.subtitle.backendStackPt1 && project.subtitle.frontendStack ? (
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <div>
                        <h4>Backend</h4>
                        <ul>
                          {project.subtitle.backendStackPt1.map((item, index) => (
                            <li key={`backend-pt1-${index}`}>{item}</li>
                          ))}
                        </ul>
                      </div>
                      <div style={{ flex: 1, paddingLeft: '10px' }}>
                        <h4>Frontend</h4>
                        <ul>
                          {project.subtitle.frontendStack.map((item, index) => (
                            <li key={`frontend-${index}`}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    {project.subtitle.backendStackPt2 && project.subtitle.backendStackPt2.length > 0 && (
                      <div>
                        <h4>Backend & Infrastructure (Pt. 2):</h4>
                        <ul>
                          {project.subtitle.backendStackPt2.map((item, index) => (
                            <li key={`backend-pt2-${index}`}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <div style={{ marginTop: '1em' }}></div>
                    <p>{project.subtitle.description}</p>
                  </div>
                ) : (
                  <p>{project.subtitle}</p>
                )}
              </div>
            </div>
          ))}
        </div>
          <h1 className="project-catalog-title cherge-specific-title">Concept to Fruition</h1>
          <hr />
          <div className="three-column-layout">
            <div className="column">
              {/* Column 1: Month/Year */}
              <p>DECEMBER 2024</p>
            </div>
            <div className="column">
              {/* Column 2: Text */}
              <p> December 2024 marked the official start of the project, focusing on defining the core problem, establishing the project's charter, conducting initial user research, and setting up the preliminary technical environment. The core challenge was identified as the inefficient method of retrieving design assets from Dropbox, where issues like rasterized, non-searchable text in images and the lack of a structured search system were significant pain points. A formal Project Charter and a high-level plan were drafted to address this, and a key early decision was made to select PostgreSQL as the project's database, chosen specifically for its robustness and ability to support a future CNN-based document processing system.</p><p>To ensure the solution was grounded in real-world needs, a detailed audit of a key designer's (Brett's) manual search process was conducted. The audit documented the exact user workflow: accessing Dropbox via a web browser, entering search terms like "texas intro," filtering by "Most relevant," and then visually sifting through the returned imagery. This investigation revealed a reliance on an informal, memorized system of keywords (Intro, Issue, Bio, Endorsement, GOTV) created to manually narrow down content. This process underscored the need for an intelligent system, as designers were trying to find assets where a current client's needs overlapped with a previous project's design in order to find a unique angle while aligning with existing branding.</p><p>Concurrently, the foundational technical environment was built. A Git repository was established using a component-based branch structure (api, database, frontend, ml, preprocessing) for logical code organization. Poetry was chosen for dependency management, and a critical early hurdle was overcome when an attempt to use Python 3.13 failed due to compatibility issues with PyTorch and TensorFlow. The environment was successfully stabilized by switching to Python 3.10. On the database front, a complete PostgreSQL environment was configured and monitored via pgAdmin 4. Using SQLAlchemy, initial models for five interconnected tables—clients, documents, extracted_text, classifications, and design_elements—were created. Finally, Flask-Migrate was implemented for database version control, and the initial migration was successfully applied to create the production-ready schema, establishing a solid technical footing for the project.</p>
            </div>
            <div className="column">
              {/* Column 3: 4 Image Grid */}
              <div className="image-grid-container">
                {[...Array(4)].map((_, index) => (
                  <img
                    key={index}
                    src={modular}
                    alt={`Grid image ${index + 1}`}
                    className="grid-image"
                  />
                ))}
              </div>
            </div>
          </div>
          {/* Duplicated three-column layout */}
          <div className="three-column-layout">
            <div className="column">
              {/* Column 1: Month/Year */}
              <p>JANUARY 2025</p>
            </div>
            <div className="column">
              {/* Column 2: Text */}
              <p>Following the foundational setup in December, January 2025 was a period of intense architectural refinement and development, marked by a decisive pivot in the core technology. The initial plan centered on creating a basic architecture using a Convolutional Neural Network (CNN), specifically a ResNet model paired with a framework like PyTorch, to perform text extraction and classification on design assets. However, significant challenges were identified with this approach, including the complexity of fine-tuning a custom model, the need for specialized hardware and troubleshooting for GPU acceleration (e.g., tensorflow-metal on Mac), handling varied PDF dimensions, and meeting the project's high accuracy requirements of 95% text extraction and 90% classification.</p><p>This critical analysis led to a strategic pivot away from a pure CNN approach towards leveraging a powerful, multimodal Large Language Model (LLM). The new proposed architecture simplified the entire process into a more manageable, automated pipeline: PDF Upload → Storage → LLM Analysis → Database Storage → User Query. This change leveraged the advanced capabilities of the Claude 3 LLM to handle both visual and content analysis, effectively replacing the planned ResNet component and streamlining future development.</p><p>Substantial progress was made on the application's core components. A full-stack system was established with a Flask backend and a React frontend. The team successfully created the necessary PostgreSQL database schema with SQLAlchemy models for clients, documents, extracted_text, classifications, and design_elements, and configured Flask-Migrate for proper database migrations. API endpoints were then built to serve data from these tables. To enable end-to-end testing, a corresponding React dashboard was developed, featuring a tabbed interface to display the database content by fetching data from the new Flask APIs. The integration was validated by creating and running a script to populate the database with synthetic data, confirming the system worked as a whole. Concurrently, work was done to integrate the system with the Dropbox API, creating a synchronization manager to automatically download files and store their metadata and file hashes in the database for change detection. The project's deployment and operational scope were also defined, with plans to use AWS S3 for cloud storage (later specified as MinIO in a workflow diagram), an expected processing load of under 1000 documents per month, and a target of 20 concurrent users for the frontend application.</p>
            </div>
            <div className="column">
              {/* Column 3: 4 Image Grid */}
              <div className="image-grid-container">
                {[...Array(4)].map((_, index) => (
                  <img
                    key={index}
                    src={modular}
                    alt={`Grid image ${index + 1}`}
                    className="grid-image"
                  />
                ))}
              </div>
            </div>
          </div>
          {/* Duplicated three-column layout */}
          <div className="three-column-layout">
            <div className="column">
              {/* Column 1: Month/Year */}
              <p>FEBRUARY 2025</p>
            </div>
            <div className="column">
              {/* Column 2: Text */}
              <p>In February 2025, following a pivotal meeting with the client, the project's architecture pivoted from a ResNet-based CNN to Anthropic's Claude 3 LLM. This strategic shift was made to leverage the model's powerful multimodal capabilities for comprehensive document analysis and to eliminate the complexity and hardware dependency of managing a local GPU. To support this new direction, a full enterprise-grade infrastructure for "Project Catalog" was designed. The stack included a Flask web layer, Gunicorn with Uvicorn as the web server, Celery with Redis for the asynchronous task queue, PostgreSQL as the database, MinIO for S3-compatible object storage, Docker with Kubernetes for containerization, and Prometheus with Grafana for a complete monitoring solution.</p><p>The implementation phase involved resolving numerous critical integration issues, such as fixing circular imports between application components, correcting PostgreSQL user permissions that caused database authentication failures between Docker containers, and solving complex Docker networking problems that prevented services from communicating. A major focus was placed on data integrity after discovering the UI failed to render items when duplicate files were uploaded. The database schema was revamped through a specific migration that added a file_hash column for detection and an original_document_id foreign key for tracking relationships. This new system successfully prevents redundant, costly LLM processing for identical files.</p><p>Significant effort was also dedicated to prompt engineering to standardize the inherently "random" data returned by the LLM, a known effect of its attention mechanism. The goal was to create a prompt descriptive enough for consistent output without adding excessive computational overhead or latency. The project matured to include a formal risk analysis, documenting not only the operational costs (~$0.01 for 2-3 documents) but also the strategic risks. These included dependency on an external service whose model or pricing could change, and the potential for AI hallucinations—for instance, the model classifying the same document as a "Report" one day and a "Memo" the next. Mitigation strategies, such as caching responses and adding manual review processes, were considered. By the end of the month, the core pipeline was functional: a file upload triggers storage in MinIO, initiating a background task via Celery to process the document with Claude, with the structured results stored in dedicated llm_analysis and llm_keywords tables.</p>
            </div>
            <div className="column">
              {/* Column 3: 4 Image Grid */}
              <div className="image-grid-container">
                {[...Array(4)].map((_, index) => (
                  <img
                    key={index}
                    src={modular}
                    alt={`Grid image ${index + 1}`}
                    className="grid-image"
                  />
                ))}
              </div>
            </div>
          </div>
          {/* Duplicated three-column layout */}
          <div className="three-column-layout">
            <div className="column">
              {/* Column 1: Month/Year */}
              <p>MARCH 2025</p>
            </div>
            <div className="column">
              {/* Column 2: Text */}
              <p>March 2025 was defined by a live presentation of the application to the team, which initiated a major technical upgrade and a formal user testing plan. The core engineering effort was the migration from Claude 2 to the claude-3-opus-20240229 model. This was a significant undertaking, requiring code changes across llm_service.py, document_tasks.py, and llm_parser.py. The work involved switching to the new Messages API endpoint, updating the request payload structure to use a system prompt, and adding functionality to handle image analysis by passing base64 encoded images. The prompt itself was heavily refined to mitigate five identified issues: filename bias, web-sourcing for information, paraphrasing instead of exact transcription, inconsistent confidence scoring, and making temporal assumptions. A new, highly detailed prompt was engineered with a strictly enforced JSON schema, demanding specific outputs for political analysis covering seven distinct areas like visual elements, sentiment, and policy positions.</p><p>Following the presentation, the immediate priority was making the application accessible for user testing. Several deployment options were evaluated: using low-cost PaaS providers like Railway or Render for their simple GitHub integration; using Ngrok to provide a temporary public URL to the local Docker setup with zero infrastructure changes; or deploying to a cost-effective platform like Digital Ocean. Ultimately, Railway.app was selected for its ease of use, with a defined monthly budget of ~$20 for hosting and a ~$10 cap for the Claude API. The initial usability test plan, however, faced setbacks when feedback from the asset management group, requested via Slack, was delayed. After direct consultation with "Chris," the plan was revised to shorten the questionnaire to 10 questions, change a key task, and add more targeted questions, such as "What information about the mailer is the most useful to you when you are combing search results?"</p><p>Concurrently, work continued on stabilizing the application by resolving persistent issues, including Flask blueprint routing problems, application context conflicts between Flask and Celery, and Anthropic API client configuration errors. The Dropbox integration was also finalized, with a Celery Beat task set to automatically sync files every five minutes, check for new content, and create database records to track sync status. The month concluded with initial research into commercial deployment standards and security protocols, exploring 2-factor authentication, hosting privately on the company VPN, and restricting access via IP tables.</p>
            </div>
            <div className="column">
              {/* Column 3: 4 Image Grid */}
              <div className="image-grid-container">
                {[...Array(4)].map((_, index) => (
                  <img
                    key={index}
                    src={modular}
                    alt={`Grid image ${index + 1}`}
                    className="grid-image"
                  />
                ))}
              </div>
            </div>
          </div>
          {/* Duplicated three-column layout */}
          <div className="three-column-layout">
            <div className="column">
              {/* Column 1: Month/Year */}
              <p>APRIL 2025</p>
            </div>
            <div className="column">
              {/* Column 2: Text */}
              <p>April 2025 was a month of deep architectural enhancement, driven by user feedback and a need to address significant performance and reliability issues. Responding to user insights, immediate UI/UX work began on the document card, redesigning it to feature a larger, higher-quality preview image and the filename, with a simple link to the underlying file in MinIO. A backlog item was also created to allow users to select multiple documents for a side-by-side comparison view. The most substantial effort was a complete redesign of the keyword and search system. A hierarchical keyword taxonomy was designed and implemented to provide structured, multi-level filtering. This required creating new database models (KeywordTaxonomy, KeywordSynonym, DocumentKeyword) with self-referential relationships, initializing them with a master taxonomy, and updating the entire search stack—from the LLM parser to the UI—to support this faceted navigation.</p><p>In parallel, the application's slow performance was tackled. The existing search, which relied on PostgreSQL's full-text search (tsvector) and basic LIKE queries, was identified as a major bottleneck as it did not understand semantic relationships. It was replaced with a true vector search solution. This involved adding an embeddings column to the database, integrating the pgvector extension, and creating an EmbeddingsService to generate vector embeddings for documents using OpenAI's API. This new system enabled semantic searches based on cosine similarity. Further optimizations were made across the stack: implementing Redis caching for document previews and search results, moving intensive tasks to asynchronous Celery workers, and optimizing database queries with SQLAlchemy's joinedload() and selectinload() to prevent over-fetching of data.</p><p>The second major architectural pivot was a complete refactor of the LLM interaction model. The single, monolithic prompt was identified as a critical point of failure—it was difficult to debug and a failure in one section would cause the entire analysis to fail. It was replaced with a modular, multi-component analysis system. The analysis was broken down into seven independent components (e.g., Core Metadata, Text Extraction, Classification), each with its own specialized prompt and API call. These components are processed in prioritized batches, allowing for better error isolation, graceful degradation if a non-critical component fails, and the ability to enrich later prompts with context from successfully processed earlier components. This modular approach created a more robust, maintainable, and flexible processing pipeline, setting the stage for future refinements.</p>
            </div>
            <div className="column">
              {/* Column 3: 4 Image Grid */}
              <div className="image-grid-container">
                {[...Array(4)].map((_, index) => (
                  <img
                    key={index}
                    src={modular}
                    alt={`Grid image ${index + 1}`}
                    className="grid-image"
                  />
                ))}
              </div>
            </div>
          </div>
          {/* Duplicated three-column layout */}
          <div className="three-column-layout">
            <div className="column">
              {/* Column 1: Month/Year */}
              <p>MAY 2025</p>
            </div>
            <div className="column">
              {/* Column 2: Text */}
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>
            <div className="column">
              {/* Column 3: 4 Image Grid */}
              <div className="image-grid-container">
                {[...Array(4)].map((_, index) => (
                  <img
                    key={index}
                    src={modular}
                    alt={`Grid image ${index + 1}`}
                    className="grid-image"
                  />
                ))}
              </div>
            </div>
          </div>
          {/* Duplicated three-column layout */}
          <div className="three-column-layout">
            <div className="column">
              {/* Column 1: Month/Year */}
              <p>JUNE 2025</p>
            </div>
            <div className="column">
              {/* Column 2: Text */}
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>
            <div className="column">
              {/* Column 3: 4 Image Grid */}
              <div className="image-grid-container">
                {[...Array(4)].map((_, index) => (
                  <img
                    key={index}
                    src={modular}
                    alt={`Grid image ${index + 1}`}
                    className="grid-image"
                  />
                ))}
              </div>
            </div>
          </div>
      </section>
    </main>
  </div>
);
};

export default ProjectCatalog;
