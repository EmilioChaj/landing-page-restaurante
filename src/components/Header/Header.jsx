import { useState } from 'react';
import useScrollPosition from '../../hooks/useScrollPosition';
import styles from './Header.module.css';

const Header = () => {
  const scrollY = useScrollPosition();
  const isScrolled = scrollY > 50;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '#inicio', label: 'Inicio' },
    { href: '#menu', label: 'Menú' },
    { href: '#reservar', label: 'Reservar' },
    { href: '#galeria', label: 'Galería' },
    { href: '#contacto', label: 'Contacto' },
    { href: '#resenas', label: 'Reseñas' },
  ];

  const scrollToSection = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <a href="#inicio" className={styles.logo}>
          <span className={styles.logoIcon}>🍝</span>
          <span className={styles.logoText}>La Dolce Vita</span>
        </a>

        <nav className={`${styles.nav} ${isMobileMenuOpen ? styles.navOpen : ''}`}>
          <ul className={styles.navList}>
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={styles.navLink}
                  onClick={(e) => scrollToSection(e, link.href)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a href="#reservar" className={styles.ctaButton} onClick={(e) => scrollToSection(e, '#reservar')}>
            Reservar Mesa
          </a>
        </nav>

        <button
          className={`${styles.menuToggle} ${isMobileMenuOpen ? styles.menuOpen : ''}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
};

export default Header;
