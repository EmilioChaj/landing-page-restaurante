import { useState } from 'react';
import styles from './Reservations.module.css';

const Reservations = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    fecha: '',
    hora: '',
    personas: '2',
    notas: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nombre.trim() || formData.nombre.trim().length < 2) {
      newErrors.nombre = 'El nombre debe tener al menos 2 caracteres';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Email no válido';
    }

    const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    if (!phoneRegex.test(formData.telefono)) {
      newErrors.telefono = 'Teléfono no válido';
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (!formData.fecha || new Date(formData.fecha) < today) {
      newErrors.fecha = 'Selecciona una fecha futura';
    }

    if (!formData.hora) {
      newErrors.hora = 'Selecciona una hora';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setSubmitSuccess(true);
    setTimeout(() => setSubmitSuccess(false), 5000);
    setFormData({
      nombre: '', email: '', telefono: '', fecha: '', hora: '', personas: '2', notas: ''
    });
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

            <form onSubmit={handleSubmit} className={styles.form}>
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
                    placeholder="+34 612 345 678"
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
            </form>
          </div>

          <div className={styles.info}>
            <h3>Información</h3>

            <div className={styles.infoItem}>
              <h4>Horarios</h4>
              <p>Lunes a Viernes: 13:00 - 16:00, 19:00 - 23:00</p>
              <p>Sábados: 13:00 - 23:30</p>
              <p>Domingos: 13:00 - 16:00</p>
            </div>

            <div className={styles.infoItem}>
              <h4>Contacto</h4>
              <p>📞 +34 912 345 678</p>
              <p>📧 info@ladolcevita.es</p>
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
