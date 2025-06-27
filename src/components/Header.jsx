import React, { useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import '../styles/Header.css';

export default function Header() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLinkClick = (e, path) => {
    if (location.pathname === path) {
      e.preventDefault();
    }
    toggleMenu();
  };

  // Determine current page indicator
  let pageIndicator = "/01 HOME"; // Default
  if (location.pathname.startsWith('/about')) {
    pageIndicator = "/02 ABOUT";
  } else if (location.pathname.startsWith('/experience')) {
    pageIndicator = "/03 EXPERIENCE";
  } else if (location.pathname.startsWith('/blog')) {
    pageIndicator = "/04 BLOG";
  } else if (location.pathname.startsWith('/projects/')) {
    const pathParts = location.pathname.split('/');
    const projectName = pathParts[pathParts.length - 1];
    if (projectName) {
      pageIndicator = `/05 ${projectName.toUpperCase()}`;
    } else {
      pageIndicator = "/05 PROJECTS";
    }
  }
  const displayPageIndicator = pageIndicator.startsWith('/') ? pageIndicator.substring(1) : pageIndicator;

  const menuLinks = [
    { path: "/", label: "01 HOME" },
    { path: "/about", label: "02 ABOUT" },
    { path: "/experience", label: "03 EXPERIENCE" },
    { path: "/blog", label: "04 BLOG" },
  ];

  return (
    <>
      <nav className="abgd-style-header" id="abgd-style-header">
        <div className="header-item header-main-title">
          <Link to="/">PORTFOLIO</Link>
        </div>
        <div 
          className="header-item header-index-indicator" 
          onClick={toggleMenu}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && toggleMenu()}
        >
          Index/{displayPageIndicator}
        </div>
      </nav>

      <div className={`slide-out-menu ${isMenuOpen ? 'open' : ''}`}>
        <button className="menu-close-button" onClick={toggleMenu} aria-label="Close menu">
          &times;
        </button>
        <div className="menu-links-container">
          {menuLinks.map(link => (
            <Link key={link.path} to={link.path} className="menu-link" onClick={(e) => handleLinkClick(e, link.path)}>
              {link.label}
            </Link>
          ))}
        </div>
      </div>
      {isMenuOpen && <div className="menu-overlay" onClick={toggleMenu}></div>}
    </>
  );
}
