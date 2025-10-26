import './Services.css';

const Services = () => {
  const services = [
    {
      title: 'Recherche Personnalisée',
      description: 'Nous trouvons le véhicule exact qui correspond à vos critères parmi des milliers d\'annonces en Allemagne.',
      color: '#8b9199',
      backgroundImage: '/images/services/recherche_personnalisé.jpg'
    },
    {
      title: 'Inspection Complète',
      description: 'Vérification technique approfondie par nos experts avant chaque importation. Garantie qualité.',
      color: '#4a5568'
    },
    {
      title: 'Démarches Simplifiées',
      description: 'Nous gérons toute la paperasse : documents, immatriculation, douane, et homologation.',
      color: '#6b7280'
    },
    {
      title: 'Transport Sécurisé',
      description: 'Livraison en camion fermé avec assurance tous risques. Suivi en temps réel de votre véhicule.',
      color: '#8b9199'
    },
    {
      title: 'Prix Transparents',
      description: 'Aucun frais caché. Devis détaillé incluant tous les coûts d\'importation et de livraison.',
      color: '#4a5568'
    },
    {
      title: 'Service Rapide',
      description: 'De la recherche à la livraison en 2-3 semaines. Suivi personnalisé tout au long du processus.',
      color: '#6b7280'
    }
  ];

  return (
    <section className="services" id="services">
      <div className="services-container">
        <div className="section-header">
          <span className="section-badge">Nos Services</span>
          <h2 className="section-title">
            Pourquoi Choisir <span className="gradient-text">BMS Motors</span>
          </h2>
          <p className="section-description">
            Une expertise complète pour votre importation automobile en toute sérénité
          </p>
        </div>

        <div className="services-grid">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="service-card"
              style={{ 
                animationDelay: `${index * 0.1}s`,
                backgroundImage: service.backgroundImage ? `url(${service.backgroundImage})` : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            >
              <div className="service-content">
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
              </div>
              <div className="service-hover-effect" style={{ background: `${service.color}15` }}></div>
            </div>
          ))}
        </div>

        <div className="brands-section">
          <h3 className="brands-title">Marques Disponibles</h3>
          <div className="brands-grid">
            {['Mercedes-Benz', 'BMW', 'Audi', 'Porsche', 'Volkswagen', 'BMW M'].map((brand, index) => (
              <div key={index} className="brand-badge">
                {brand}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;

