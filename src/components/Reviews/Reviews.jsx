import { useEffect, useState } from 'react';
import reviewsData from '../../data/reviews.json';
import useForm from '../../hooks/useForm';
import useMediaQuery from '../../hooks/useMediaQuery';
import styles from './Reviews.module.css';

const initialValues = {
  nombre: '',
  estrellas: 0,
  comentario: '',
};

const validate = (data) => {
  const errors = {};

  if (!data.nombre.trim() || data.nombre.trim().length < 2) {
    errors.nombre = 'El nombre debe tener al menos 2 caracteres';
  }

  if (!Number.isInteger(data.estrellas) || data.estrellas < 1 || data.estrellas > 5) {
    errors.estrellas = 'Selecciona una calificación de 1 a 5 estrellas';
  }

  if (!data.comentario.trim() || data.comentario.trim().length < 10) {
    errors.comentario = 'El comentario debe tener al menos 10 caracteres';
  }

  return errors;
};

const Reviews = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [reviews, setReviews] = useState(reviewsData);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const reviewsPerPage = isMobile ? 1 : 3;
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

  const {
    formData,
    errors,
    isSubmitting,
    submitSuccess,
    submitError,
    handleChange,
    handleSubmit,
    setFormData,
    setErrors,
  } = useForm(initialValues, validate);

  useEffect(() => {
    const controller = new AbortController();

    const fetchReviews = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/reviews`, {
          signal: controller.signal,
        });
        if (!res.ok) return;
        const data = await res.json();
        if (Array.isArray(data.reviews) && data.reviews.length > 0) {
          setReviews(data.reviews);
        }
      } catch {
        // Backend no disponible: se mantienen las reseñas estáticas
      }
    };

    fetchReviews();
    return () => controller.abort();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const handleStarClick = (value) => {
    setFormData((prev) => ({ ...prev, estrellas: value }));
    setErrors((prev) => ({ ...prev, estrellas: '' }));
  };

  const onSubmit = async (data) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nombre: data.nombre.trim(),
        comentario: data.comentario.trim(),
        estrellas: data.estrellas,
      }),
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.error || 'Error al publicar la reseña');
    }

    const { review } = await res.json();
    setReviews((prev) => [review, ...prev]);
    setCurrentIndex(0);
  };

  const visibleReviews = reviews.slice(
    currentIndex * reviewsPerPage,
    (currentIndex * reviewsPerPage) + reviewsPerPage
  );

  return (
    <section id="resenas" className={`section ${styles.reviews}`}>
      <div className="container">
        <div className="section-title">
          <h2>Lo Que Dicen Nuestros Clientes</h2>
        </div>

        <div className={styles.carousel}>
          <button className={styles.navBtn} onClick={prevSlide}>‹</button>

          <div className={styles.grid}>
            {visibleReviews.map(review => (
              <article key={review.id} className={styles.card}>
                <div className={styles.header}>
                  <img src={review.foto} alt={review.nombre} className={styles.avatar} />
                  <div>
                    <p className={styles.name}>{review.nombre}</p>
                    <div className={styles.stars}>
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={i < review.estrellas ? styles.filled : styles.empty}>
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <p className={styles.comment}>&ldquo;{review.comentario}&rdquo;</p>
                <span className={styles.date}>{review.fecha}</span>
              </article>
            ))}
          </div>

          <button className={styles.navBtn} onClick={nextSlide}>›</button>
        </div>

        <div className={styles.dots} role="group" aria-label="Paginación de reseñas">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              className={`${styles.dot} ${i === currentIndex ? styles.active : ''}`}
              onClick={() => setCurrentIndex(i)}
              aria-label={`Mostrar reseña ${i + 1}`}
              aria-current={i === currentIndex ? 'true' : undefined}
            />
          ))}
        </div>

        <div className={styles.formSection}>
          <h3 className={styles.formTitle}>Publica Tu Reseña</h3>

          {submitSuccess && (
            <p className={styles.success} role="status">
              ¡Gracias! Tu reseña se publicó correctamente.
            </p>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className={styles.form} noValidate>
            <div className={styles.formRow}>
              <div className={styles.field}>
                <label htmlFor="review-nombre">Nombre *</label>
                <input
                  type="text"
                  id="review-nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  placeholder="Tu nombre"
                />
                {errors.nombre && <span className={styles.error}>{errors.nombre}</span>}
              </div>

              <div className={styles.field}>
                <span className={styles.starsLabel} id="stars-label">Calificación *</span>
                <div
                  className={styles.starPicker}
                  role="radiogroup"
                  aria-labelledby="stars-label"
                >
                  {[1, 2, 3, 4, 5].map((value) => (
                    <button
                      key={value}
                      type="button"
                      className={`${styles.starBtn} ${value <= formData.estrellas ? styles.starActive : ''}`}
                      onClick={() => handleStarClick(value)}
                      aria-label={`${value} ${value === 1 ? 'estrella' : 'estrellas'}`}
                      aria-pressed={value <= formData.estrellas}
                    >
                      ★
                    </button>
                  ))}
                </div>
                {errors.estrellas && <span className={styles.error}>{errors.estrellas}</span>}
              </div>
            </div>

            <div className={styles.field}>
              <label htmlFor="review-comentario">Comentario *</label>
              <textarea
                id="review-comentario"
                name="comentario"
                value={formData.comentario}
                onChange={handleChange}
                placeholder="Cuéntanos sobre tu experiencia..."
                rows="4"
              />
              {errors.comentario && <span className={styles.error}>{errors.comentario}</span>}
            </div>

            {submitError && <span className={styles.error}>{submitError}</span>}

            <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
              {isSubmitting ? 'Publicando...' : 'Publicar Reseña'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
