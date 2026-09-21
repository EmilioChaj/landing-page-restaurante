import { useState } from 'react';
import reviewsData from '../../data/reviews.json';
import useMediaQuery from '../../hooks/useMediaQuery';
import styles from './Reviews.module.css';

const Reviews = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const reviewsPerPage = isMobile ? 1 : 3;
  const totalPages = Math.ceil(reviewsData.length / reviewsPerPage);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const visibleReviews = reviewsData.slice(
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
      </div>
    </section>
  );
};

export default Reviews;
