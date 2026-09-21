import useScrollPosition from '../../hooks/useScrollPosition';
import styles from './Hero.module.css';

const Hero = () => {
  const scrollY = useScrollPosition();
  const scrollOpacity = Math.max(0, 1 - (scrollY / 300));

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
      <div className={styles.scrollIndicator} style={{ opacity: scrollOpacity }}>
        <span className={styles.scrollText}>Scroll</span>
        <div className={styles.scrollLine}></div>
      </div>
    </section>
  );
};

export default Hero;
