# Corte Italiana - Landing Page Restaurante Italiano

Landing page moderna, elegante y responsiva para un restaurante italiano, con backend Express para newsletter (Brevo) y publicación de reseñas.

## Características

- **Header:** Navbar fija con logo, navegación y botón CTA
- **Hero:** Sección principal con imagen de fondo y animaciones
- **Menú Digital:** Catálogo de platos con filtrado por categoría y badge "Destacado"
- **Reservaciones:** Formulario con validación cliente + envío por Formspree/WhatsApp
- **Galería:** Grid de fotos con lightbox y filtros
- **Ubicación:** Información de contacto + mapa embebido
- **Reseñas:** Carrusel de testimonios + **formulario para publicar reseñas inmediatamente** (API)
- **Footer:** Links, contacto y **newsletter con doble opt-in (Brevo)**
- **Favicon:** Icono personalizado 🍝 con paleta negro/dorado

## Stack Tecnológico

### Frontend
| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| React | ^18.2.0 | UI Library |
| Vite | ^5.0.8 | Build tool & dev server |
| CSS Modules | - | Estilos encapsulados |
| Vitest | ^2.1.9 | Testing framework |
| React Testing Library | ^16.3.3 | Testing de componentes |
| ESLint | ^10.11.0 | Linting |

### Backend
| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| Express | ^4.21.0 | Servidor API |
| express-rate-limit | ^7.4.0 | Rate limiting |
| CORS | ^2.8.5 | Cross-origin |
| dotenv | ^16.4.5 | Variables de entorno |
| Brevo | ^2.0.0 | Newsletter (double opt-in) |

## Estructura del Proyecto

```
/
├── src/
│   ├── assets/           # Imágenes estáticas
│   ├── components/       # Componentes React
│   │   ├── Header/
│   │   ├── Hero/
│   │   ├── Menu/
│   │   ├── Reservations/
│   │   ├── Gallery/
│   │   ├── Location/
│   │   ├── Reviews/
│   │   └── Footer/
│   ├── data/             # Datos JSON (menú, reseñas, galería, restaurante)
│   ├── hooks/            # useForm, useMediaQuery, useScrollPosition
│   ├── styles/           # Estilos globales y variables CSS
│   ├── App.jsx
│   └── main.jsx
├── backend/
│   ├── server.js         # Servidor Express
│   ├── routes/           # newsletter.js, reviews.js
│   ├── middleware/       # rateLimiter.js
│   ├── services/         # brevo.js
│   ├── data/             # reviews.json (reseñas persistidas)
│   └── .env.example
├── features/             # Documentación por feature (frontend/ y backend/)
├── constitution/         # Mission, roadmap, tech-stack
├── public/
├── index.html
├── package.json
└── vite.config.js
```

## Requisitos Previos

- Node.js 18+
- Cuenta en [Brevo](https://www.brevo.com) (para newsletter)
- (Opcional) Cuenta en [Formspree](https://formspree.io) (para reservas)

## Variables de Entorno

### Frontend (`.env` en la raíz)

```bash
cp .env.example .env
```

| Variable | Descripción |
|----------|-------------|
| `VITE_API_URL` | URL del backend (ej: `http://localhost:3001`) |
| `VITE_FORMSPREE_ID` | ID de Formspree para reservas |
| `VITE_WHATSAPP_NUMBER` | Número WhatsApp (formato internacional) |
| `VITE_MAPS_KEY` | API key de Google Maps (opcional) |

### Backend (`backend/.env`)

```bash
cp backend/.env.example backend/.env
```

| Variable | Descripción |
|----------|-------------|
| `BREVO_API_KEY` | API key de Brevo |
| `BREVO_LIST_ID` | ID de la lista de contactos |
| `BREVO_TEMPLATE_ID` | ID del template de double opt-in |
| `CORS_ORIGIN` | URL del frontend permitida |
| `REDIRECT_URL` | URL del backend para redirección post-confirmación |
| `PORT` | Puerto del servidor (default: 3001) |

## Instalación

```bash
# Frontend
npm install

# Backend
cd backend && npm install
```

## Desarrollo

```bash
# Terminal 1 — Backend (puerto 3001)
cd backend && npm run dev

# Terminal 2 — Frontend (puerto 5173)
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

## Comandos de Calidad

```bash
npm run lint        # ESLint
npm run test        # Vitest (76 tests)
npm run test:watch  # Vitest en watch mode
```

## API Endpoints

| Método | Ruta | Descripción |
|--------|------|-------------|
| `GET` | `/health` | Health check |
| `GET` | `/confirmado` | Página de confirmación newsletter |
| `POST` | `/api/subscribe` | Suscripción newsletter (rate limit 10/h) |
| `GET` | `/api/reviews` | Obtener todas las reseñas |
| `POST` | `/api/reviews` | Publicar reseña (rate limit 10/h) |

### Ejemplo: publicar reseña

```bash
curl -X POST http://localhost:3001/api/reviews \
  -H 'Content-Type: application/json' \
  -d '{"nombre":"María","comentario":"Excelente experiencia!","estrellas":5}'
```

## Datos

- `src/data/menu.json` — 12 platos (Entradas, Primeros Platos, Platos Fuertes, Postres)
- `src/data/reviews.json` — 6 reseñas de ejemplo (fallback si el backend no responde)
- `src/data/gallery.json` — 8 imágenes de galería
- `src/data/restaurant.json` — Datos del restaurante (nombre, contacto, horarios, redes)
- `backend/data/reviews.json` — Reseñas persistidas (semilla + publicadas vía API)

## Diseño

- **Paleta:** Negro (#1a1a1a) + Dorado (#b8960b)
- **Tipografía:** Playfair Display (títulos), Lato (cuerpo)
- **Responsive:** Mobile-first con breakpoints en 768px

## Documentación

- `features/` — Specs, planes y tareas por feature (frontend/ y backend/)
- `constitution/` — Mission, roadmap y tech-stack del proyecto
- `AGENTS.md` — Convenciones y wireframes
