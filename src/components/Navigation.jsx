import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Navigation.css';

const navItems = {
  info: { Home: '/', About: '/about' },
  projects: {
    'Project Catalog': '/projects/project-catalog',
    Mycelium: '/projects/mycelium',
    Palter: '/projects/palter',
  },
  blog: {
    DUI: '/blogs/dui',
    'Silver Rule': '/blogs/silver-rule',
    'Empathetic Salmon': '/blogs/empathetic-salmon',
  },
};

const Navigation = () => {
  const [activeMenu, setActiveMenu] = useState('info');
  const [activeSubMenu, setActiveSubMenu] = useState(navItems.info);
  const [isOpen, setIsOpen] = useState(false);

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
    setActiveSubMenu(navItems[menu]);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = (e, path) => {
    if (window.location.pathname === path) {
      e.preventDefault();
    } else {
      toggleMenu();
    }
  };

  return (
    <>
      <div className={`overlay ${isOpen ? 'open' : ''}`} onClick={toggleMenu}></div>
      <div className="hamburger-icon" onClick={toggleMenu}>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className={`navigation-container ${isOpen ? 'open' : ''} content-fade-in`}>
        <div className="navigation-column">
          <ul>
            {Object.keys(navItems).map((menu) => (
              <li
                key={menu}
                onClick={() => handleMenuClick(menu)}
                className={activeMenu === menu ? 'selected' : ''}
              >
                {menu.charAt(0).toUpperCase() + menu.slice(1)}
              </li>
            ))}
          </ul>
        </div>
        <div className="navigation-column">
          <ul>
            {Object.entries(activeSubMenu).map(([name, path]) => (
              <li key={name}>
                <NavLink to={path} onClick={(e) => handleLinkClick(e, path)}>{name}</NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navigation;
