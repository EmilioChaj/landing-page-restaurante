import { useState } from 'react';
import galleryData from '../../data/gallery.json';
import styles from './Gallery.module.css';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeFilter, setActiveFilter] = useState('Todas');
  const categories = ['Todas', 'Restaurante', 'Comida', 'Eventos'];

  const filteredImages = activeFilter === 'Todas'
    ? galleryData
    : galleryData.filter(img => img.categoria === activeFilter);

  const openLightbox = (image) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  const navigate = (direction) => {
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
    let newIndex;
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % filteredImages.length;
    } else {
      newIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
    }
    setSelectedImage(filteredImages[newIndex]);
  };

  return (
    <section id="galeria" className={`section ${styles.gallery}`}>
      <div className="container">
        <div className="section-title">
          <h2>Galería</h2>
        </div>

        <div className={styles.filters}>
          {categories.map(category => (
            <button
              key={category}
              className={`${styles.filterBtn} ${activeFilter === category ? styles.active : ''}`}
              onClick={() => setActiveFilter(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className={styles.grid}>
          {filteredImages.map(image => (
            <div
              key={image.id}
              className={styles.item}
              onClick={() => openLightbox(image)}
            >
              <img src={image.src} alt={image.titulo} />
              <div className={styles.overlay}>
                <span className={styles.title}>{image.titulo}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedImage && (
        <div className={styles.lightbox} onClick={closeLightbox}>
          <button className={styles.close} onClick={closeLightbox}>×</button>
          <button className={styles.prev} onClick={(e) => { e.stopPropagation(); navigate('prev'); }}>‹</button>
          <button className={styles.next} onClick={(e) => { e.stopPropagation(); navigate('next'); }}>›</button>
          <img
            src={selectedImage.src}
            alt={selectedImage.titulo}
            onClick={(e) => e.stopPropagation()}
          />
          <div className={styles.caption}>{selectedImage.titulo}</div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
