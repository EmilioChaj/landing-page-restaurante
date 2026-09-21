import restaurantData from '../../data/restaurant.json';
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
                <p>{restaurantData.direccion.calle}<br />{restaurantData.direccion.ciudad}</p>
              </div>
            </div>

            <div className={styles.infoItem}>
              <span className={styles.icon}>📞</span>
              <div>
                <h3>Teléfono</h3>
                <a href={`tel:${restaurantData.telefonoLink}`}>{restaurantData.telefono}</a>
              </div>
            </div>

            <div className={styles.infoItem}>
              <span className={styles.icon}>✉️</span>
              <div>
                <h3>Email</h3>
                <a href={`mailto:${restaurantData.email}`}>{restaurantData.email}</a>
              </div>
            </div>

            <div className={styles.infoItem}>
              <span className={styles.icon}>🕐</span>
              <div>
                <h3>Horarios</h3>
                <p>
                  <strong>Lunes - Viernes:</strong> {restaurantData.horarios.lunesViernes}<br />
                  <strong>Sábados:</strong> {restaurantData.horarios.sabados}<br />
                  <strong>Domingos:</strong> {restaurantData.horarios.domingos}
                </p>
              </div>
            </div>

            <div className={styles.social}>
              <h3>Síguenos</h3>
              <div className={styles.socialLinks}>
                <a href={restaurantData.redesSociales.instagram} aria-label="Instagram">📷</a>
                <a href={restaurantData.redesSociales.facebook} aria-label="Facebook">👥</a>
                <a href={restaurantData.redesSociales.tripadvisor} aria-label="TripAdvisor">⭐</a>
              </div>
            </div>
          </div>



          <div className={styles.mapContainer}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d987315.6133302937!2d-92.576359953125!3d14.841995400000009!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x858ea58ee636a7ed%3A0x385d57a6f8c53f31!2sGasolinera%20San%20Miguel!5e0!3m2!1ses!2sgt!4v1789978052545!5m2!1ses!2sgt"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              title="Ubicación del restaurante La Dolce Vita en Google Maps"
            /> 
          </div>

          <p className={styles.disclaimer}>
            Esta ubicación solo es para mostrar el funcionamiento de la app
          </p>
        </div>
      </div>
    </section>
  );
};

export default Location;
