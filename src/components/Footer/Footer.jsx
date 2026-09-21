import { useState } from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.brand}>
            <a href="#inicio" className={styles.logo}>
              <span className={styles.logoIcon}>🍝</span>
              <span className={styles.logoText}>La Dolce Vita</span>
            </a>
            <p className={styles.tagline}>
              Auténtica cocina italiana desde 1985
            </p>
          </div>

          <div className={styles.links}>
            <h4>Enlaces Rápidos</h4>
            <ul>
              <li><a href="#inicio">Inicio</a></li>
              <li><a href="#menu">Menú</a></li>
              <li><a href="#reservar">Reservar</a></li>
              <li><a href="#galeria">Galería</a></li>
              <li><a href="#contacto">Contacto</a></li>
            </ul>
          </div>

          <div className={styles.contact}>
            <h4>Contacto</h4>
            <p>📍 Calle Gran Vía, 42<br />28013 Madrid</p>
            <p>📞 +34 912 345 678</p>
            <p>✉️ info@ladolcevita.es</p>
          </div>

          <div className={styles.newsletter}>
            <h4>Newsletter</h4>
            <p>Suscríbete para ofertas exclusivas</p>
            {subscribed ? (
              <p className={styles.success}>¡Gracias por suscribirte!</p>
            ) : (
              <form onSubmit={handleSubmit} className={styles.form}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Tu email"
                  required
                />
                <button type="submit">→</button>
              </form>
            )}
          </div>
        </div>

        <div className={styles.bottom}>
          <p>&copy; {currentYear} La Dolce Vita. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
