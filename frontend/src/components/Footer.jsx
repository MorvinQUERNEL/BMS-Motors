import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-col">
            <div className="footer-logo">
              <img src="/images/logo/logo.png" alt="BMS Motors" className="footer-logo-image" />
              <span className="logo-text">BMS Motors</span>
            </div>
            <p className="footer-description">
              Votre partenaire de confiance pour l'import de véhicules premium d'Allemagne depuis plus de 5 ans.
            </p>
            <div className="social-links">
              <a href="#" className="social-link">📘</a>
              <a href="#" className="social-link">📷</a>
              <a href="#" className="social-link">🐦</a>
              <a href="#" className="social-link">💼</a>
            </div>
          </div>

          <div className="footer-col">
            <h4 className="footer-title">Services</h4>
            <ul className="footer-links">
              <li><a href="#services">Import de véhicules</a></li>
              <li><a href="#services">Inspection technique</a></li>
              <li><a href="#services">Transport</a></li>
              <li><a href="#services">Homologation</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-title">Entreprise</h4>
            <ul className="footer-links">
              <li><a href="#about">À propos</a></li>
              <li><a href="#contact">Contact</a></li>
              <li><a href="#faq">FAQ</a></li>
              <li><a href="#blog">Blog</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-title">Contact</h4>
            <ul className="footer-contact">
              <li>
                <span className="contact-icon">📧</span>
                <span>bms.motors.riviera@gmail.com</span>
              </li>
              <li>
                <span className="contact-icon">📞</span>
                <span>+33 7 62 71 13 11</span>
              </li>
              <li>
                <span className="contact-icon">📍</span>
                <span>13 Rue Massena, 06000 Nice</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="copyright">
              © 2025 BMS Motors. Tous droits réservés.
            </p>
            <div className="footer-legal">
              <a href="#privacy">Confidentialité</a>
              <span className="separator">•</span>
              <a href="#terms">Conditions</a>
              <span className="separator">•</span>
              <a href="#cookies">Cookies</a>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-gradient"></div>
    </footer>
  );
};

export default Footer;

