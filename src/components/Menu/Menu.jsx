import { useState } from 'react';
import menuData from '../../data/menu.json';
import styles from './Menu.module.css';

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState('Todos');
  const categories = ['Todos', 'Entradas', 'Primeros Platos', 'Platos Fuertes', 'Postres'];

  const filteredItems = activeCategory === 'Todos'
    ? menuData
    : menuData.filter(item => item.categoria === activeCategory);

  return (
    <section id="menu" className={`section ${styles.menu}`}>
      <div className="container">
        <div className="section-title">
          <h2>Nuestro Menú</h2>
        </div>

        <div className={styles.filters}>
          {categories.map(category => (
            <button
              key={category}
              className={`${styles.filterBtn} ${activeCategory === category ? styles.active : ''}`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className={styles.grid}>
          {filteredItems.map(item => (
            <article key={item.id} className={styles.card}>
              <div className={styles.imageWrapper}>
                <img src={item.imagen} alt={item.nombre} className={styles.image} />
                {item.destacado && (
                  <span className={styles.badge}>Destacado</span>
                )}
              </div>
              <div className={styles.content}>
                <h3 className={styles.name}>{item.nombre}</h3>
                <p className={styles.description}>{item.descripcion}</p>
                <div className={styles.footer}>
                  <span className={styles.price}>Q{item.precio.toFixed(2)}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Menu;
