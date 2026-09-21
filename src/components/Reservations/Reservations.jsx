import restaurantData from '../../data/restaurant.json';
import useForm from '../../hooks/useForm';
import styles from './Reservations.module.css';

const initialValues = {
  nombre: '',
  email: '',
  telefono: '',
  fecha: '',
  hora: '',
  personas: '2',
  notas: ''
};

const validate = (data) => {
  const newErrors = {};

  if (!data.nombre.trim() || data.nombre.trim().length < 2) {
    newErrors.nombre = 'El nombre debe tener al menos 2 caracteres';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    newErrors.email = 'Email no válido';
  }

  const phoneRegex = /^[\+]?[\d\s\-\(\)]{7,15}$/;
  if (!phoneRegex.test(data.telefono)) {
    newErrors.telefono = 'Teléfono no válido';
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (!data.fecha || new Date(data.fecha) < today) {
    newErrors.fecha = 'Selecciona una fecha futura';
  }

  if (!data.hora) {
    newErrors.hora = 'Selecciona una hora';
  }

  return newErrors;
};

const Reservations = () => {
  const {
    formData,
    errors,
    isSubmitting,
    submitSuccess,
    handleChange,
    handleSubmit,
  } = useForm(initialValues, validate);

  const getWhatsAppUrl = (data) => {
    const msg = `🍽️ Reserva\nNombre: ${data.nombre}\nPersonas: ${data.personas}\nFecha: ${data.fecha}\nHora: ${data.hora}\nTeléfono: ${data.telefono}\nNotas: ${data.notas || 'Ninguna'}`;
    return `https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  };

  const onSubmit = async (data) => {
    const res = await fetch(`https://formspree.io/f/${import.meta.env.VITE_FORMSPREE_ID}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Error al enviar la reserva');
  };

  return (
    <section id="reservar" className={`section ${styles.reservations}`}>
      <div className="container">
        <div className="section-title">
          <h2>Reserva Tu Mesa</h2>
        </div>

        <div className={styles.wrapper}>
          <div className={styles.formContainer}>
            {submitSuccess && (
              <div className={styles.success}>
                ¡Reserva enviada correctamente! Te contactaremos pronto.
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
              <div className={styles.row}>
                <div className={styles.field}>
                  <label htmlFor="nombre">Nombre *</label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    placeholder="Tu nombre"
                  />
                  {errors.nombre && <span className={styles.error}>{errors.nombre}</span>}
                </div>

                <div className={styles.field}>
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="tu@email.com"
                  />
                  {errors.email && <span className={styles.error}>{errors.email}</span>}
                </div>
              </div>

              <div className={styles.row}>
                <div className={styles.field}>
                  <label htmlFor="telefono">Teléfono *</label>
                  <input
                    type="tel"
                    id="telefono"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    placeholder="+502 61223698"
                    
                  />
                  {errors.telefono && <span className={styles.error}>{errors.telefono}</span>}
                </div>

                <div className={styles.field}>
                  <label htmlFor="personas">Personas *</label>
                  <select
                    id="personas"
                    name="personas"
                    value={formData.personas}
                    onChange={handleChange}
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 15, 20].map(num => (
                      <option key={num} value={num}>{num} {num === 1 ? 'persona' : 'personas'}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className={styles.row}>
                <div className={styles.field}>
                  <label htmlFor="fecha">Fecha *</label>
                  <input
                    type="date"
                    id="fecha"
                    name="fecha"
                    value={formData.fecha}
                    onChange={handleChange}
                  />
                  {errors.fecha && <span className={styles.error}>{errors.fecha}</span>}
                </div>

                <div className={styles.field}>
                  <label htmlFor="hora">Hora *</label>
                  <input
                    type="time"
                    id="hora"
                    name="hora"
                    value={formData.hora}
                    onChange={handleChange}
                    min="13:00"
                    max="23:30"
                  />
                  {errors.hora && <span className={styles.error}>{errors.hora}</span>}
                </div>
              </div>

              <div className={styles.field}>
                <label htmlFor="notas">Notas adicionales</label>
                <textarea
                  id="notas"
                  name="notas"
                  value={formData.notas}
                  onChange={handleChange}
                  placeholder="Alergias, celebraciones, preferencias de mesa..."
                  rows="3"
                />
              </div>

              <button
                type="submit"
                className={styles.submitBtn}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Enviando...' : 'Confirmar Reserva'}
              </button>

              <div className={styles.divider}>
                <span>o</span>
              </div>

              <a
                href={getWhatsAppUrl(formData)}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.whatsappBtn}
              >
                Reserva por WhatsApp
              </a>
            </form>
          </div>

          <div className={styles.info}>
            <h3>Información</h3>

            <div className={styles.infoItem}>
              <h4>Horarios</h4>
              <p>Lunes a Viernes: {restaurantData.horarios.lunesViernes}</p>
              <p>Sábados: {restaurantData.horarios.sabados}</p>
              <p>Domingos: {restaurantData.horarios.domingos}</p>
            </div>

            <div className={styles.infoItem}>
              <h4>Contacto</h4>
              <p>📞 {restaurantData.telefono}</p>
              <p>📧 {restaurantData.email}</p>
            </div>

            <div className={styles.infoItem}>
              <h4>Política de Cancelación</h4>
              <p>Por favor, cancele con al menos 24 horas de antelación.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reservations;
