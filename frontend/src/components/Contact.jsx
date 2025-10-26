import { useState } from 'react';
import emailjs from '@emailjs/browser';
import './Contact.css';

const Contact = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Configuration EmailJS
    // IMPORTANT : Remplacez ces valeurs par vos propres clés EmailJS
    const serviceID = 'YOUR_SERVICE_ID'; // À remplacer
    const templateID = 'YOUR_TEMPLATE_ID'; // À remplacer
    const publicKey = 'YOUR_PUBLIC_KEY'; // À remplacer

    emailjs.sendForm(serviceID, templateID, e.target, publicKey)
      .then(() => {
        // Succès
        setShowSuccess(true);
        setIsLoading(false);
        e.target.reset();
        
        // Cacher le message après 5 secondes
        setTimeout(() => {
          setShowSuccess(false);
        }, 5000);
      })
      .catch((error) => {
        // Erreur
        console.error('Erreur lors de l\'envoi:', error);
        setShowError(true);
        setIsLoading(false);
        
        // Cacher le message d'erreur après 5 secondes
        setTimeout(() => {
          setShowError(false);
        }, 5000);
      });
  };

  return (
    <section className="contact" id="contact">
      <div className="contact-container">
        <div className="section-header">
          <span className="section-badge">Contactez-nous</span>
          <h2 className="section-title">
            Prêt à Importer Votre <span className="gradient-text">Véhicule de Rêve ?</span>
          </h2>
          <p className="section-description">
            Notre équipe est à votre disposition pour répondre à toutes vos questions
          </p>
        </div>

        <div className="contact-content-centered">
          <div className="contact-info">
            <div className="info-card">
              <div className="info-icon">📞</div>
              <div className="info-details">
                <h3 className="info-title">Téléphone</h3>
                <a href="tel:+33762711311" className="info-value">+33 7 62 71 13 11</a>
                <p className="info-description">Lun - Sam : 9h00 - 18h00</p>
              </div>
            </div>

            <div className="info-card">
              <div className="info-icon">📧</div>
              <div className="info-details">
                <h3 className="info-title">Email</h3>
                <a href="mailto:bms.motors.riviera@gmail.com" className="info-value">
                  bms.motors.riviera@gmail.com
                </a>
                <p className="info-description">Réponse sous 24h</p>
              </div>
            </div>

            <div className="info-card">
              <div className="info-icon">📍</div>
              <div className="info-details">
                <h3 className="info-title">Adresse</h3>
                <a 
                  href="https://maps.google.com/?q=13+Rue+Massena+06000+Nice" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="info-value"
                >
                  13 Rue Massena<br />06000 Nice, France
                </a>
                <p className="info-description">Sur rendez-vous uniquement</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;


