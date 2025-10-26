import { useState, useEffect } from 'react';
import './Vehicules.css';

const Vehicules = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Liste des images de véhicules depuis le dossier public/images/vehicules/
  const vehicules = [
    { id: 1, image: '/images/vehicules/Audi_gris1.png' },
    { id: 2, image: '/images/vehicules/Audi_gris2.png' },
    { id: 3, image: '/images/vehicules/G8_bleu1.png' },
    { id: 4, image: '/images/vehicules/G8_bleu2.png' },
    { id: 5, image: '/images/vehicules/G8_bleu3.png' },
    { id: 6, image: '/images/vehicules/G8_bleu4.png' },
    { id: 7, image: '/images/vehicules/G8_gris1.png' },
    { id: 8, image: '/images/vehicules/G8_gris2.png' },
    { id: 9, image: '/images/vehicules/G8_noir1.png' },
    { id: 10, image: '/images/vehicules/G8_noir2.png' },
    { id: 11, image: '/images/vehicules/Merco_noir1.png' },
    { id: 12, image: '/images/vehicules/Merco_noir2.png' },
    { id: 13, image: '/images/vehicules/Merco_noir3.png' },
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % vehicules.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, vehicules.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % vehicules.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + vehicules.length) % vehicules.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const getSlidePosition = (index) => {
    const diff = index - currentIndex;
    const total = vehicules.length;
    
    // Calcul de la position circulaire
    let position = diff;
    if (diff > total / 2) position = diff - total;
    if (diff < -total / 2) position = diff + total;
    
    return position;
  };

  return (
    <section className="vehicules" id="vehicules">
      <div className="vehicules-container">
        <div className="section-header">
          <span className="section-badge">Notre Collection</span>
          <h2 className="section-title">
            Dernières Voitures <span className="gradient-text">Importées</span>
          </h2>
          <p className="section-description">
            Découvrez notre sélection de véhicules premium fraîchement importés d'Allemagne
          </p>
        </div>

        <div className="carousel-wrapper">
          <div className="carousel-container">
            <div className="carousel-track">
              {vehicules.map((vehicule, index) => {
                const position = getSlidePosition(index);
                const isActive = position === 0;
                const distance = Math.abs(position);
                
                return (
                  <div
                    key={vehicule.id}
                    className={`carousel-slide ${isActive ? 'active' : ''}`}
                    style={{
                      transform: `
                        translateX(${position * 350}px) 
                        scale(${isActive ? 1 : 0.7 - distance * 0.1}) 
                        rotateY(${position * 15}deg)
                      `,
                      zIndex: 100 - distance * 10,
                      opacity: distance > 2 ? 0 : 1 - distance * 0.3,
                    }}
                    onClick={() => !isActive && goToSlide(index)}
                  >
                    <div className="slide-content">
                      <div className="slide-image-wrapper">
                        <img 
                          src={vehicule.image} 
                          alt={`Véhicule ${vehicule.id}`}
                          className="slide-image"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                        <div className="slide-placeholder" style={{ display: 'none' }}>
                          <span className="placeholder-icon">🚗</span>
                          <span className="placeholder-text">Image non disponible</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <button className="carousel-btn prev" onClick={prevSlide}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            
            <button className="carousel-btn next" onClick={nextSlide}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          <div className="carousel-dots">
            {vehicules.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === currentIndex ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Vehicules;

