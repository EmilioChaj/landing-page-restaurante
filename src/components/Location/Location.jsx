import styles from './Location.module.css';

const Location = () => {
  return (
    <section id="contacto" className={`section ${styles.location}`}>
      <div className="container">
        <div className="section-title">
          <h2>Encuéntranos</h2>
        </div>

        <div className={styles.wrapper}>
          <div className={styles.info}>
            <div className={styles.infoItem}>
              <span className={styles.icon}>📍</span>
              <div>
                <h3>Dirección</h3>
                <p>Calle Gran Vía, 42<br />28013 Madrid, España</p>
              </div>
            </div>

            <div className={styles.infoItem}>
              <span className={styles.icon}>📞</span>
              <div>
                <h3>Teléfono</h3>
                <a href="tel:+34912345678">+34 912 345 678</a>
              </div>
            </div>

            <div className={styles.infoItem}>
              <span className={styles.icon}>✉️</span>
              <div>
                <h3>Email</h3>
                <a href="mailto:info@ladolcevita.es">info@ladolcevita.es</a>
              </div>
            </div>

            <div className={styles.infoItem}>
              <span className={styles.icon}>🕐</span>
              <div>
                <h3>Horarios</h3>
                <p>
                  <strong>Lunes - Viernes:</strong> 13:00 - 16:00, 19:00 - 23:00<br />
                  <strong>Sábados:</strong> 13:00 - 23:30<br />
                  <strong>Domingos:</strong> 13:00 - 16:00
                </p>
              </div>
            </div>

            <div className={styles.social}>
              <h3>Síguenos</h3>
              <div className={styles.socialLinks}>
                <a href="#" aria-label="Instagram">📷</a>
                <a href="#" aria-label="Facebook">👥</a>
                <a href="#" aria-label="TripAdvisor">⭐</a>
              </div>
            </div>
          </div>

          <div className={styles.mapContainer}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3037.123456789!2d-3.7037!3d40.4168!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDI1JzAwLjAiTiAzwrA0MicyMS4zIlc!5e0!3m2!1ses!2ses!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación del restaurante"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;
