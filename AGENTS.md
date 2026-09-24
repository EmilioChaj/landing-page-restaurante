# AGENTS.md

## Objetivo
Desarrollar una landing page moderna, elegante y responsiva para un restaurante italiano ("Corte Italiana"). La página muestra el menú, permite reservaciones, muestra una galería de fotos, proporciona información de contacto/ubicación, presenta reseñas de clientes con publicación inmediata y suscripción a newsletter. El diseño es "Elegante (negro/dorado)".

## Stack
- **Frontend:** React 18 + Vite 5, JavaScript, CSS Modules
- **Backend:** Express 4 (`backend/`), express-rate-limit, CORS, dotenv
- **Newsletter:** Brevo (double opt-in)
- **Testing:** Vitest + React Testing Library (76 tests)
- **Linting:** ESLint
- **Herramientas:** npm

## Comandos

### Frontend
- `npm install`: Instalar dependencias.
- `npm run dev`: Servidor de desarrollo (puerto 5173).
- `npm run build`: Build para producción.
- `npm run preview`: Previsualizar build.
- `npm run lint`: Ejecutar linter (ESLint).
- `npm run test`: Ejecutar tests (Vitest).
- `npm run test:watch`: Tests en watch mode.

### Backend
- `cd backend && npm install`: Instalar dependencias del backend.
- `npm run dev`: Servidor con `--watch` (puerto 3001).
- `npm start`: Servidor en producción.

## Estructura del Proyecto
```
/
├── AGENTS.md
├── README.md
├── constitution/
│   ├── mission.md
│   ├── roadmap.md
│   └── tech-stack.md
├── features/
│   ├── frontend/
│   │   ├── navigation-hero/
│   │   ├── menu-digital/
│   │   ├── reservaciones/
│   │   ├── galeria-fotos/
│   │   ├── ubicacion-contacto/
│   │   ├── resenas/
│   │   └── newsletter/
│   └── backend/
│       ├── servidor-express/
│       ├── api-suscripcion/
│       ├── integracion-brevo/
│       ├── confirmacion-doi/
│       ├── api-reseñas/
│       └── despliegue-render/
├── backend/
│   ├── server.js
│   ├── routes/
│   │   ├── newsletter.js
│   │   └── reviews.js
│   ├── middleware/
│   │   └── rateLimiter.js
│   ├── services/
│   │   └── brevo.js
│   ├── data/
│   │   └── reviews.json
│   ├── .env.example
│   └── package.json
├── public/
│   └── favicon.svg          # 🍝 negro/dorado
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Header/
│   │   ├── Hero/
│   │   ├── Menu/
│   │   ├── Reservations/
│   │   ├── Gallery/
│   │   ├── Location/
│   │   ├── Reviews/
│   │   └── Footer/
│   ├── data/
│   │   ├── restaurant.json  # Datos canónicos del restaurante
│   │   ├── menu.json
│   │   ├── reviews.json     # Fallback si el backend no responde
│   │   └── gallery.json
│   ├── hooks/
│   │   ├── useForm.js
│   │   ├── useMediaQuery.js
│   │   └── useScrollPosition.js
│   ├── styles/
│   ├── App.jsx
│   └── main.jsx
├── .env.example
├── index.html
├── package.json
└── vite.config.js
```

## Arquitectura
- **Frontend:** Cada sección de la landing es un componente React independiente con CSS Modules.
- **Backend:** Express en `backend/` (puerto 3001) con CORS, rate limiting y JSON.
- **API:**
  - `GET /health` — health check
  - `GET /confirmado` — confirmación double opt-in
  - `POST /api/subscribe` — newsletter (Brevo, rate limit 10/h)
  - `GET /api/reviews` — obtener reseñas
  - `POST /api/reviews` — publicar reseña (rate limit 10/h)
- **Datos:** Datos estáticos en `src/data/`; reseñas publicadas persisten en `backend/data/reviews.json`.
- **Env:** Frontend usa `VITE_API_URL` (ver `.env.example`); backend usa `BREVO_*`, `CORS_ORIGIN`, etc. (ver `backend/.env.example`).
- **Responsivo:** Diseño mobile-first usando media queries (breakpoint 768px).

## Wireframe (de funcionalidad)
1. **Header/Navbar:** Logo, enlaces de navegación (Menú, Reservar, Galería, Contacto, Reseñas).
2. **Hero:** Imagen de fondo atractiva, título principal ("Corte Italiana"), subtítulo, botón CTA ("Reserva Ahora").
3. **Menú Digital:** Categorías (Entradas, Primeros Platos, Platos Fuertes, Postres), grid de platos con imagen, nombre, descripción, precio.
4. **Reservaciones:** Formulario con campos: Nombre, Email, Teléfono, Fecha, Hora, Número de personas.
5. **Galería de Fotos:** Grid de imágenes (masonry o carrusel) del restaurante y platos.
6. **Ubicación/Contacto:** Mapa embebido (Google Maps/Leaflet), dirección, teléfono, email, horarios, iconos de redes sociales.
7. **Reseñas:** Carrusel de testimonios + formulario "Publica Tu Reseña" (nombre, estrellas 1-5, comentario) con publicación inmediata vía API.
8. **Footer:** Logo, copyright, links rápidos, newsletter signup (double opt-in Brevo).

### Wireframes Detallados (ASCII Art)

#### 1. Header / Navbar

**Desktop:**
```
+--------------------------------------------------------------------------------------------------+
|  [Logo: 🍝 Corte Italiana]     Inicio | Menú | Reservar | Galería | Contacto | Reseñas    [CTA]  |
+--------------------------------------------------------------------------------------------------+
```

**Mobile:**
```
+---------------------------+
|  [Logo] 🍝    [☰ Menu]   |
+---------------------------+

Menu abierto:
+---------------------------+
|  [Logo] 🍝    [✕ Close]  |
|                           |
|       Inicio              |
|       Menú                |
|       Reservar            |
|       Galería             |
|       Contacto            |
|       Reseñas             |
|                           |
|    [ Reservar Mesa ]      |
+---------------------------+
```

---

#### 2. Hero Section

**Desktop:**
```
+--------------------------------------------------------------------------------------------------+
|                                                                                                  |
|                              [Imagen de fondo: Restaurante italiano elegante]                    |
|                              [Overlay oscuro semi-transparente]                                   |
|                                                                                                  |
|                                   CORTE ITALIANA                                                 |
|                     Auténtica cocina italiana en el corazón de la ciudad                          |
|                                                                                                  |
|                            [  RESERVA TU MESA  ]                                                 |
|                                                                                                  |
|                                  ↓ Scroll                                                        |
+--------------------------------------------------------------------------------------------------+
```

**Mobile:**
```
+---------------------------+
|                           |
|   [Imagen de fondo]       |
|   [Overlay oscuro]        |
|                           |
|    CORTE ITALIANA         |
|                           |
|   Auténtica cocina        |
|   italiana en el          |
|   corazón de la ciudad    |
|                           |
|  [ RESERVA TU MESA ]      |
|                           |
|       ↓ Scroll            |
+---------------------------+
```

---

#### 3. Menú Digital

**Desktop:**
```
+--------------------------------------------------------------------------------------------------+
|                                  NUESTRO MENÚ                                                    |
|                                  ───────────                                                     |
|                                                                                                  |
|     [Todos]  [Entradas]  [Primeros Platos]  [Platos Fuertes]  [Postres]                          |
|                                                                                                  |
|  +------------------+  +------------------+  +------------------+  +------------------+           |
|  | [Imagen Plato]   |  | [Imagen Plato]   |  | [Imagen Plato]   |  | [Imagen Plato]   |           |
|  |                  |  |                  |  |                  |  |                  |           |
|  | Nombre Plato     |  | Nombre Plato     |  | Nombre Plato     |  | Nombre Plato     |           |
|  | Descripción...   |  | Descripción...   |  | Descripción...   |  | Descripción...   |           |
|  |           €XX.XX |  |      €XX.XX [★]  |  |           €XX.XX |  |           €XX.XX |           |
|  +------------------+  +------------------+  +------------------+  +------------------+           |
|                                                                                                  |
|  +------------------+  +------------------+  +------------------+  +------------------+           |
|  | [Imagen Plato]   |  | [Imagen Plato]   |  | [Imagen Plato]   |  | [Imagen Plato]   |           |
|  | ...              |  | ...              |  | ...              |  | ...              |           |
|  +------------------+  +------------------+  +------------------+  +------------------+           |
+--------------------------------------------------------------------------------------------------+
```

**Mobile:**
```
+---------------------------+
|     NUESTRO MENÚ          |
|     ───────────           |
|                           |
| [Todos] [Entradas]        |
| [Primeros Platos]         |
| [Platos Fuertes]          |
| [Postres]                 |
|                           |
| +-----------------------+ |
| | [Imagen Plato]        | |
| |                       | |
| | Nombre Plato          | |
| | Descripción del...    | |
| |              €XX.XX   | |
| +-----------------------+ |
|                           |
| +-----------------------+ |
| | [Imagen Plato]        | |
| | ...                   | |
| +-----------------------+ |
+---------------------------+
```

---

#### 4. Reservaciones

**Desktop:**
```
+--------------------------------------------------------------------------------------------------+
|                                RESERVA TU MESA                                                   |
|                                ────────────                                                      |
|                                                                                                  |
|  +-----------------------------------+     +-----------------------------------+                 |
|  |  NOMBRE *                         |     |  INFORMACIÓN                      |                 |
|  |  [________________________]       |     |                                   |                 |
|  |                                   |     |  🕐 Horarios                      |                 |
|  |  EMAIL *              PERSONAS *  |     |  L-V: 13:00-16:00, 19:00-23:00    |                 |
|  |  [________________] [▼ 2 pers]   |     |  Sáb: 13:00-23:30                 |                 |
|  |                                   |     |  Dom: 13:00-16:00                 |                 |
|  |  TELÉFONO *           FECHA *     |     |                                   |                 |
|  |  [________________] [📅 Fecha]   |     |  📞 Contacto                      |                 |
|  |                                   |     |  +502 58621717                    |                 |
|  |  HORA *                          |     |  emichg5862@gmail.com             |                 |
|  |  [⏰ Hora]                       |     |                                   |                 |
|  |                                   |     |  📋 Política                      |                 |
|  |  NOTAS ADICIONALES               |     |  Cancela con 24h antelación       |                 |
|  |  [________________________]       |     +-----------------------------------+                 |
|  |  [________________________]       |                                                           |
|  |                                   |                                                           |
|  |      [ CONFIRMAR RESERVA ]        |                                                           |
|  +-----------------------------------+                                                           |
+--------------------------------------------------------------------------------------------------+
```

**Mobile:**
```
+---------------------------+
|    RESERVA TU MESA        |
|    ────────────           |
|                           |
| +-----------------------+ |
| | INFORMACIÓN           | |
| |                       | |
| | 🕐 L-V: 13-16, 19-23 | |
| | Sáb: 13:00-23:30      | |
| | Dom: 13:00-16:00      | |
| |                       | |
| | 📞 +502 58621717     | |
| +-----------------------+ |
|                           |
| NOMBRE *                  |
| [___________________]     |
|                           |
| EMAIL *        PERSONAS * |
| [______________] [▼ 2]    |
|                           |
| TELÉFONO *       FECHA *  |
| [______________] [📅 ]    |
|                           |
| HORA *                    |
| [⏰ ___________]          |
|                           |
| NOTAS                     |
| [___________________]     |
| [___________________]     |
|                           |
| [ CONFIRMAR RESERVA ]     |
+---------------------------+
```

---

#### 5. Galería de Fotos

**Desktop:**
```
+--------------------------------------------------------------------------------------------------+
|                                   GALERÍA                                                        |
|                                   ───────                                                        |
|                                                                                                  |
|      [Todas]  [Restaurante]  [Comida]  [Eventos]                                                |
|                                                                                                  |
|  +------------------+  +------------------+  +------------------+  +------------------+           |
|  |                  |  |                  |  |                  |  |                  |           |
|  |   [Foto 1]       |  |   [Foto 2]       |  |   [Foto 3]       |  |   [Foto 4]       |           |
|  |                  |  |                  |  |                  |  |                  |           |
|  +------------------+  +------------------+  +------------------+  +------------------+           |
|                                                                                                  |
|  +------------------+  +------------------+  +------------------+  +------------------+           |
|  |                  |  |                  |  |                  |  |                  |           |
|  |   [Foto 5]       |  |   [Foto 6]       |  |   [Foto 7]       |  |   [Foto 8]       |           |
|  |                  |  |                  |  |                  |  |                  |           |
|  +------------------+  +------------------+  +------------------+  +------------------+           |
+--------------------------------------------------------------------------------------------------+

Lightbox (al hacer click):
+--------------------------------------------------------------------------------------------------+
|  [✕ Close]                                                               [‹] [›]                |
|                                                                                                  |
|                                                                                                  |
|                            [Imagen a pantalla completa]                                           |
|                                                                                                  |
|                                                                                                  |
|                                    Título de la foto                                              |
+--------------------------------------------------------------------------------------------------+
```

**Mobile:**
```
+---------------------------+
|       GALERÍA             |
|       ───────             |
|                           |
| [Todas] [Restaurante]     |
| [Comida] [Eventos]        |
|                           |
| +---------+ +-----------+ |
| |         | |           | |
| | [Foto]  | |  [Foto]   | |
| |         | |           | |
| +---------+ +-----------+ |
|                           |
| +---------+ +-----------+ |
| |         | |           | |
| | [Foto]  | |  [Foto]   | |
| |         | |           | |
| +---------+ +-----------+ |
+---------------------------+
```

---

#### 6. Ubicación / Contacto

**Desktop:**
```
+--------------------------------------------------------------------------------------------------+
|                                ENCUÉNTRANOS                                                      |
|                                ───────────                                                       |
|                                                                                                  |
|  +-----------------------------------+     +-----------------------------------+                 |
|  |  📍 Dirección                     |     |                                   |                 |
|  |  Gasolinera San Miguel, 12        |     |         [MAPA EMbebido]           |                 |
|  |  Cantel, Quetzaltenango           |     |         Google Maps / OSM         |                 |
|  |  Guatemala                         |     |                                   |                 |
|  |                                   |     |                                   |                 |
|  |  📞 Teléfono                      |     |         [Marcador 📍]             |                 |
|  |  +502 58621717                    |     |                                   |                 |
|  |                                   |     +-----------------------------------+                 |
|  |  ✉️ Email                         |                                                           |
|  |  emichg5862@gmail.com             |                                                           |
|  |                                   |                                                           |
|  |  🕐 Horarios                      |                                                           |
|  |  L-V: 13:00-16:00, 19:00-23:00    |                                                           |
|  |  Sáb: 13:00-23:30                 |                                                           |
|  |  Dom: 13:00-16:00                 |                                                           |
|  |                                   |                                                           |
|  |  🌐 Síguenos                      |                                                           |
|  |  [📷] [👥] [⭐]                  |                                                           |
|  +-----------------------------------+                                                           |
+--------------------------------------------------------------------------------------------------+
```

**Mobile:**
```
+---------------------------+
|     ENCUÉNTRANOS         |
|     ───────────          |
|                           |
| +-----------------------+ |
| |                       | |
| |    [MAPA EMbebido]    | |
| |                       | |
| +-----------------------+ |
|                           |
| 📍 Dirección              |
| Gasolinera San Miguel, 12 |
| Cantel, Quetzaltenango    |
| Guatemala                  |
|                           |
| 📞 Teléfono               |
| +502 58621717             |
|                           |
| ✉️ Email                  |
| emichg5862@gmail.com      |
|                           |
| 🕐 Horarios               |
| L-V: 13-16, 19-23         |
| Sáb: 13:00-23:30          |
| Dom: 13:00-16:00          |
|                           |
| 🌐 Síguenos               |
| [📷] [👥] [⭐]           |
+---------------------------+
```

---

#### 7. Reseñas

**Desktop:**
```
+--------------------------------------------------------------------------------------------------+
|                          LO QUE DICEN NUESTROS CLIENTES                                           |
|                          ────────────────────────────────                                         |
|                                                                                                  |
|  [‹]  +------------------+  +------------------+  +------------------+  [›]                      |
|       | [Avatar] María   |  | [Avatar] Carlos  |  | [Avatar] Ana     |                           |
|       | ★★★★★             |  | ★★★★★             |  | ★★★★☆             |                           |
|       | "Excelente..."   |  | "Celebré mi..."  |  | "Excelente..."   |                           |
|       | 2024-01-15       |  | 2024-01-10       |  | 2024-01-05       |                           |
|       +------------------+  +------------------+  +------------------+                           |
|                                                                                                  |
|                    [●] [○] [○]  (paginación)                                                     |
|                                                                                                  |
|                          PUBLICA TU RESEÑA                                                       |
|                          ─────────────────                                                       |
|  NOMBRE *                  CALIFICACIÓN *                                                        |
|  [________________]        ★ ★ ★ ★ ★                                                             |
|                                                                                                  |
|  COMENTARIO *                                                                   [PUBLICAR]      |
|  [________________________________________________________________]                               |
|  [________________________________________________________________]                               |
|  [________________________________________________________________]                               |
|  [________________________________________________________________]                               |
|                                                                                                  |
|  (si todo ok) ¡Gracias! Tu reseña se publicó correctamente.                                      |
+--------------------------------------------------------------------------------------------------+
```

**Mobile:**
```
+---------------------------+
| LO QUE DICEN NUESTROS    |
| CLIENTES                  |
| ──────────────────────    |
|                           |
| [‹]  +---------------+  [›]|
|      | [Avatar]      |     |
|      | María García  |     |
|      | ★★★★★         |     |
|      | "Excelente    |     |
|      |  comida..."   |     |
|      | 2024-01-15    |     |
|      +---------------+     |
|                           |
|        [●] [○] [○]        |
|                           |
|  PUBLICA TU RESEÑA        |
|  ─────────────────        |
|  NOMBRE *                 |
|  [___________________]    |
|                           |
|  CALIFICACIÓN *           |
|  ★ ★ ★ ★ ★                |
|                           |
|  COMENTARIO *             |
|  [___________________]    |
|  [___________________]    |
|  [___________________]    |
|                           |
|  [  PUBLICAR RESEÑA  ]    |
+---------------------------+
```

---

#### 8. Footer

**Desktop:**
```
+--------------------------------------------------------------------------------------------------+
|  🍝 Corte Italiana        ENLACES RÁPIDOS      CONTACTO              NEWSLETTER                   |
|  Auténtica cocina        ───────────────       ────────              ──────────                   |
|  italiana desde 1985     Inicio                📍 Gasolinera San Miguel, 12  Suscríbete para     |
|                          Menú                  📞 +502 58621717       ofertas exclusivas          |
|                          Reservar              ✉️ emichg5862@gmail.com [Tu email] [→]             |
|                          Galería                                                             |
|                          Contacto                                                             |
|                          Reseñas                                                              |
|                                                                                                  |
|  ──────────────────────────────────────────────────────────────────────────────────────────────── |
|                    © 2024 Corte Italiana. Todos los derechos reservados.                        |
+--------------------------------------------------------------------------------------------------+
```

**Mobile:**
```
+---------------------------+
|                           |
|  🍝 Corte Italiana        |
|  Auténtica cocina         |
|  italiana desde 1985      |
|                           |
|  ENLACES RÁPIDOS          |
|  ───────────────          |
|  Inicio                   |
|  Menú                     |
|  Reservar                 |
|  Galería                  |
|  Contacto                 |
|  Reseñas                  |
|                           |
|  CONTACTO                 |
|  ────────                 |
|  📍 Gasolinera San Miguel, 12 |
|  📞 +502 58621717         |
|  ✉️ emichg5862@gmail.com  |
|                           |
|  NEWSLETTER               |
|  ──────────               |
|  [Tu email    ] [→]       |
|                           |
|  ─────────────────────    |
|  © 2024 Corte Italiana.   |
|  Todos los derechos       |
|  reservados.              |
+---------------------------+
```

---

#### Resumen de Wireframes

| Sección | Componentes | Desktop | Mobile |
|---------|-------------|---------|--------|
| Header | Logo, Nav, CTA | Navbar horizontal | Hamburguesa |
| Hero | Imagen, Título, CTA | Fullscreen | Fullscreen |
| Menú | Filtros, Grid cards | 4 columnas | 1 columna |
| Reservaciones | Formulario, Info | 2 columnas | 1 columna |
| Galería | Grid, Lightbox | 4 columnas | 2 columnas |
| Ubicación | Info, Mapa | 2 columnas | 1 columna |
| Reseñas | Carrusel + Form publicar | 3 visibles + form | 1 visible + form |
| Footer | Links, Newsletter | 4 columnas | 1 columna |

## Convenciones
- **Componentes:** Functional components con hooks.
- **Nomenclatura:** PascalCase para componentes, camelCase para variables/funciones.
- **Archivos:** Componente = `NombreComponente.jsx` + `NombreComponente.module.css`.
- **Imports:** Orden: 1) React, 2) Librerías externas, 3) Componentes, 4) Hooks, 5) Utilidades, 6) Estilos.
- **Propiedades:** Usar destructuring en parámetros de componentes.

## Estilo Visual
- **Paleta de Colores (CSS variables en `src/styles/index.css`):**
  - `--color-primary`: Negro (#1a1a1a).
  - `--color-secondary`: Dorado (#b8960b).
  - `--color-dark-gold`: Dorado oscuro (#8b6914).
  - `--color-white`: Blanco (#ffffff).
  - `--color-gray-light`: Gris claro (#f5f5f5).
- **Tipografía:**
  - Títulos: `--font-heading` Playfair Display, Georgia, serif.
  - Cuerpo: `--font-body` Lato, Open Sans, sans-serif.
- **Diseño:**
  - Líneas limpias, espacios generosos.
  - Elementos dorados como acentos (bordes, iconos, hover effects).
  - Imágenes de alta calidad con filtros sutiles.
  - Sombras suaves para profundidad.
  - Transiciones suaves en hover/active states.

## Lo que no hagas
- **No** uses class components.
- **No** manipules el DOM directamente (usa state de React).
- **No** uses estilos inline (excepto para estilos dinámicos simples).
- **No** crees componentes monolíticos (divide en componentes pequeños).
- **No** hardcodees datos de menú/reseñas en componentes (usa archivos de datos).
- **No** ignores la responsividad (mobile-first).
- **No** uses librerías de UI externas (construye UI custom para mantener control del estilo).
- **No** hagas commit sin pasar lint/tests.

## Flujo de Trabajo
1. **Planificación:** Revisar `constitution/roadmap.md` para la siguiente tarea.
2. **Documentación:** Crear carpeta en `features/frontend/` o `features/backend/` con `plan.md`, `spec.md`, `task.md`.
3. **Implementación:** Crear componentes en `src/components/` (o rutas/servicios en `backend/`).
4. **Estilización:** Crear estilos en CSS Modules.
5. **Testing:** Escribir tests unitarios para componentes.
6. **Revisión:** Verificar lint, tests, responsividad, accesibilidad.
7. **Integración:** Merge a main (o rama de desarrollo).
8. **Actualización:** Mover tarea a "hecho" en `constitution/roadmap.md`.

## Documentación
- Mantener `README.md` actualizado con specs y estructura.
- Actualizar `constitution/roadmap.md` al completar features.
- Documentar decisiones técnicas en `constitution/tech-stack.md`.
- Cada feature debe tener su documentación en `features/frontend/` o `features/backend/`.
