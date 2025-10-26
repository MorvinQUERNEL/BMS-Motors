import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import './Header.css';

const Header = () => {
  const { isDark, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="header-container">
        <a href="#accueil" className="logo">
          <img src="/images/logo/logo.png" alt="BMS Motors" className="logo-image" />
          <span className="logo-text">BMS Motors</span>
        </a>

        <a href="#accueil" className="mobile-header-left">
          <img src="/images/logo/logo.png" alt="BMS Motors" className="mobile-logo-image" />
        </a>

        <a href="#accueil" className="mobile-logo">
          <span className="mobile-logo-text">BMS Motors</span>
        </a>

        <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
          <a href="#accueil" className="nav-link" onClick={closeMenu}>Accueil</a>
          <a href="#services" className="nav-link" onClick={closeMenu}>Services</a>
          <a href="#vehicules" className="nav-link" onClick={closeMenu}>Véhicules</a>
          <a href="#contact" className="nav-link" onClick={closeMenu}>Contact</a>
        </nav>

        <div className="header-actions">
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            {isDark ? '☀️' : '🌙'}
          </button>
          
          <button 
            className={`burger-menu ${isMenuOpen ? 'burger-open' : ''}`} 
            onClick={toggleMenu}
            aria-label="Menu"
          >
            <span className="burger-line"></span>
            <span className="burger-line"></span>
            <span className="burger-line"></span>
          </button>
        </div>
      </div>

      {isMenuOpen && <div className="overlay" onClick={closeMenu}></div>}
    </header>
  );
};

export default Header;

