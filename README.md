# La Dolce Vita - Landing Page Restaurante Italiano

Landing page moderna, elegante y responsiva para un restaurante italiano.

## Características

- **Header:** Navbar fija con logo, navegación y botón CTA
- **Hero:** Sección principal con imagen de fondo y animaciones
- **Menú Digital:** Catálogo de platos con filtrado por categoría
- **Reservaciones:** Formulario con validación cliente
- **Galería:** Grid de fotos con lightbox
- **Ubicación:** Información de contacto + mapa embebido
- **Reseñas:** Carrusel de testimonios de clientes
- **Footer:** Links, contacto y newsletter

## Stack Tecnológico

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| React | ^18.2.0 | UI Library |
| Vite | ^5.0.8 | Build tool & dev server |
| CSS Modules | - | Estilos encapsulados |

## Estructura del Proyecto

```
src/
├── assets/           # Imágenes estáticas
├── components/       # Componentes React
│   ├── Header/
│   ├── Hero/
│   ├── Menu/
│   ├── Reservations/
│   ├── Gallery/
│   ├── Location/
│   ├── Reviews/
│   └── Footer/
├── data/             # Datos JSON (menú, reseñas, galería)
├── styles/           # Estilos globales
├── App.jsx
└── main.jsx
```

## Instalación

```bash
npm install
```

## Desarrollo

```bash
npm run dev
```

## Build para Producción

```bash
npm run build
```

## Preview del Build

```bash
npm run preview
```

## Datos

- `src/data/menu.json` - 12 platos (Antipasti, Primi, Secondi, Dolci)
- `src/data/reviews.json` - 6 reseñas de clientes
- `src/data/gallery.json` - 8 imágenes de galería

## Diseño

- **Paleta:** Negro (#1a1a1a) + Dorado (#d4af37)
- **Tipografía:** Playfair Display (títulos), Lato (cuerpo)
- **Responsive:** Mobile-first con breakpoints en 768px
