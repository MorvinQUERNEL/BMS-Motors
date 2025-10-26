import { useEffect, useState } from 'react';
import './Hero.css';

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="hero" id="accueil">
      <div className="hero-background"></div>

      <div className="hero-content">
        <div className="hero-badge">
          <span className="badge-dot"></span>
          Import Premium d'Allemagne
        </div>
        
        <h1 className="hero-title">
          Votre Rêve Automobile
          <br />
          <span className="gradient-text">Directement d'Allemagne</span>
        </h1>
        
        <p className="hero-description">
          Spécialistes de l'import-export de véhicules premium allemands.
          Mercedes, BMW, Audi, Porsche et plus encore.
          Qualité certifiée, prix transparents.
        </p>

        <div className="hero-actions">
          <a href="#vehicules" className="primary-btn">
            <span>Explorer nos derniers véhicules exportés</span>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M7 3L14 10L7 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <a href="#services" className="secondary-btn">
            <span>Comment ça marche</span>
          </a>
        </div>

        <div className="hero-stats">
          <div className="stat">
            <div className="stat-number">50+</div>
            <div className="stat-label">Véhicules importés</div>
          </div>
          <div className="stat">
            <div className="stat-number">98%</div>
            <div className="stat-label">Clients satisfaits</div>
          </div>
          <div className="stat">
            <div className="stat-number">5+</div>
            <div className="stat-label">Ans d'expérience</div>
          </div>
        </div>
      </div>

      <div className="hero-image">
        <video 
          className="hero-video" 
          autoPlay 
          loop 
          muted 
          playsInline
        >
          <source src="/videos/hero_video.mp4" type="video/mp4" />
        </video>
        <div className="image-placeholder">
          <img src="/images/logo/logo.png" alt="BMS Motors Logo" className="hero-logo" />
        </div>
        <div className="floating-card card-2">
          <div className="card-icon">⚡</div>
          <div className="card-text">
            <strong>Livraison</strong>
            <span>Rapide & sécurisée</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

