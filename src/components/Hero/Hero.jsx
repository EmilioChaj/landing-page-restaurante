import { useEffect, useRef } from 'react';
import styles from './Hero.module.css';

const Hero = () => {
  const scrollIndicatorRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollIndicatorRef.current) {
        const opacity = 1 - (window.scrollY / 300);
        scrollIndicatorRef.current.style.opacity = Math.max(0, opacity);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToMenu = (e) => {
    e.preventDefault();
    const element = document.querySelector('#menu');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="inicio" className={styles.hero}>
      <div className={styles.overlay}></div>
      <div className={styles.content}>
        <h1 className={styles.title}>La Dolce Vita</h1>
        <p className={styles.subtitle}>
          Auténtica cocina italiana en el corazón de la ciudad
        </p>
        <a href="#reservar" className={styles.ctaButton} onClick={(e) => {
          e.preventDefault();
          document.querySelector('#reservar')?.scrollIntoView({ behavior: 'smooth' });
        }}>
          Reserva Tu Mesa
        </a>
      </div>
      <div ref={scrollIndicatorRef} className={styles.scrollIndicator}>
        <span className={styles.scrollText}>Scroll</span>
        <div className={styles.scrollLine}></div>
      </div>
    </section>
  );
};

export default Hero;
