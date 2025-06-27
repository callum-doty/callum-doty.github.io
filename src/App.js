import React from 'react';
import AnimatedBorders from './components/AnimatedBorders.jsx';
import Navigation from './components/Navigation.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Palter from './pages/Projects/Palter.jsx';
import Mycelium from './pages/Projects/Mycelium.jsx';
import ProjectCatalog from './pages/Projects/Project_Catalog.jsx';
import DUI from './pages/Blogs/DUI.jsx';
import SilverRule from './pages/Blogs/SilverRule.jsx';
import EmpatheticSalmon from './pages/Blogs/EmpatheticSalmon.jsx';
import { Routes, Route, useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import './styles/App.css';
import './styles/transitions.css';
import ProjectGallery from './components/Projects.jsx';
import FullImageView from './components/FullImageView.jsx';
import NotFound from './pages/NotFound';

const routes = [
  { path: '/', name: 'Home', Component: Home },
  { path: '/about', name: 'About', Component: About },
  { path: '/blogs/dui', name: 'DUI', Component: DUI },
  { path: '/blogs/silver-rule', name: 'SilverRule', Component: SilverRule },
  { path: '/blogs/empathetic-salmon', name: 'EmpatheticSalmon', Component: EmpatheticSalmon },
  { path: '/projects/palter', name: 'Palter', Component: Palter },
  { path: '/projects/mycelium', name: 'Mycelium', Component: Mycelium },
  { path: '/projects/project-catalog', name: 'ProjectCatalog', Component: ProjectCatalog },
  { path: '/gallery', name: 'ProjectGallery', Component: ProjectGallery },
  { path: '/gallery/:imagePath', name: 'FullImageView', Component: FullImageView },
  { path: '*', name: 'NotFound', Component: NotFound },
];

function App() {
  const location = useLocation();

  return (
    <div style={{ display: 'flex' }}>
      <AnimatedBorders />
      <Navigation />
      <main className="main-content content-fade-in">
        <TransitionGroup component={null}>
          <CSSTransition
            key={location.key}
            classNames="page"
            timeout={1000}
            onEntered={() => window.scrollTo(0, 0)}
          >
            <div className="page-wrapper">
              <div className="content-wrapper">
                <Routes location={location}>
                  {routes.map(({ path, Component }) => (
                    <Route key={path} path={path} element={<Component />} />
                  ))}
                </Routes>
              </div>
            </div>
          </CSSTransition>
        </TransitionGroup>
        <Footer />
      </main>
    </div>
  );
}


export default App;
