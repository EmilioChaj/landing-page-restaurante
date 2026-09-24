import restaurantData from '../../data/restaurant.json';
import useForm from '../../hooks/useForm';
import styles from './Footer.module.css';

const initialValues = { email: '', gdprConsent: false };

const validate = (data) => {
  const errors = {};
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Email no válido';
  }
  if (!data.gdprConsent) {
    errors.gdprConsent = 'Debes aceptar la política de privacidad';
  }
  return errors;
};

const Footer = () => {
  const { formData, errors, isSubmitting, submitSuccess, submitError, handleChange, handleSubmit } =
    useForm(initialValues, validate);

  const onSubmit = async (data) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/subscribe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: data.email, gdprConsent: data.gdprConsent }),
    });
    if (!res.ok) throw new Error('Error al suscribirse');
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.brand}>
            <a href="#inicio" className={styles.logo}>
              <span className={styles.logoIcon}>🍝</span>
              <span className={styles.logoText}>Corte Italiana</span>
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
            <p>📍 {restaurantData.direccion.calle}<br />{restaurantData.direccion.ciudad.split(',')[0]}</p>
            <p>📞 {restaurantData.telefono}</p>
            <p>✉️ {restaurantData.email}</p>
          </div>

          <div className={styles.newsletter}>
            <h4>Newsletter</h4>
            <p>Suscríbete para ofertas exclusivas</p>
            {submitSuccess ? (
              <p className={styles.success}>¡Revisa tu email para confirmar!</p>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className={styles.form} noValidate>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Tu email"
                  required
                />
                {errors.email && <span className={styles.error}>{errors.email}</span>}
                <label className={styles.checkbox}>
                  <input
                    type="checkbox"
                    name="gdprConsent"
                    checked={formData.gdprConsent}
                    onChange={handleChange}
                  />
                  <span className={styles.gdprLabel}>
                    Acepto recibir emails y la política de privacidad
                  </span>
                </label>
                {errors.gdprConsent && <span className={styles.error}>{errors.gdprConsent}</span>}
                {submitError && <span className={styles.error}>{submitError}</span>}
                <button type="submit" disabled={isSubmitting} className={isSubmitting ? styles.loading : ''}>
                  {isSubmitting ? 'Enviando...' : '→'}
                </button>
              </form>
            )}
          </div>
        </div>

        <div className={styles.bottom}>
          <p>&copy; {currentYear} Corte Italiana. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
