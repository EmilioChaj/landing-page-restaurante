# AGENTS.md

## Objetivo
Desarrollar una landing page moderna, elegante y responsiva para un restaurante italiano. La página debe mostrar el menú, permitir reservaciones, mostrar una galería de fotos, proporcionar información de contacto/ubicación y presentar reseñas de clientes. El diseño será "Elegante (negro/dorado)".

## Stack
- **Framework:** React (con Vite)
- **Lenguaje:** JavaScript (o TypeScript si se prefiere tipado estricto)
- **Estilos:** CSS Modules o Styled Components (para encapsulamiento)
- **Herramientas:** npm/yarn/pnpm
- **Testing:** Vitest + React Testing Library (recomendado)

## Comandos
- `npm create vite@latest . -- --template react`: Inicializar proyecto Vite en directorio actual.
- `npm install`: Instalar dependencias.
- `npm run dev`: Ej servidor de desarrollo.
- `npm run build`: Build para producción.
- `npm run preview`: Previsualizar build.
- `npm run lint`: Ejecutar linter (ESLint).
- `npm run test`: Ejecutar tests.

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
│   ├── navigation-hero/
│   │   ├── plan.md
│   │   ├── spec.md
│   │   └── task.md
│   ├── menu-digital/
│   │   ├── plan.md
│   │   ├── spec.md
│   │   └── task.md
│   ├── reservaciones/
│   │   ├── plan.md
│   │   ├── spec.md
│   │   └── task.md
│   ├── galeria-fotos/
│   │   ├── plan.md
│   │   ├── spec.md
│   │   └── task.md
│   ├── ubicacion-contacto/
│   │   ├── plan.md
│   │   ├── spec.md
│   │   └── task.md
│   └── resenas/
│       ├── plan.md
│       ├── spec.md
│       └── task.md
├── public/
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
│   ├── hooks/
│   ├── styles/
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```

## Arquitectura
- **Componentes:** Cada sección de la landing será un componente React independiente.
- **Estilos:** Estilos encapsulados por componente (CSS Modules).
- **Datos:** Datos estáticos (menú, reseñas) pueden estar en archivos JSON dentro de `src/data/`.
- **Responsivo:** Diseño mobile-first usando media queries.

## Wireframe (de funcionalidad)
1. **Header/Navbar:** Logo, enlaces de navegación (Menú, Reservar, Galería, Contacto, Reseñas).
2. **Hero:** Imagen de fondo atractiva, título principal ("Corte Italiana"), subtítulo, botón CTA ("Reserva Ahora").
3. **Menú Digital:** Categorías (Entradas, Primeros Platos, Platos Fuertes, Postres), grid de platos con imagen, nombre, descripción, precio.
4. **Reservaciones:** Formulario con campos: Nombre, Email, Teléfono, Fecha, Hora, Número de personas.
5. **Galería de Fotos:** Grid de imágenes (masonry o carrusel) del restaurante y platos.
6. **Ubicación/Contacto:** Mapa embebido (Google Maps/Leaflet), dirección, teléfono, email, horarios, iconos de redes sociales.
7. **Reseñas:** Carrusel o grid de testimonios con foto, nombre, estrellas, comentario.
8. **Footer:** Logo, copyright, links rápidos, newsletter signup.

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
|  |                                   |     |  +34 912 345 678                  |                 |
|  |  HORA *                          |     |  info@corteitaliana.es              |                 |
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
| | 📞 +34 912 345 678    | |
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
|  |  Calle Gran Vía, 42               |     |         [MAPA EMbebido]           |                 |
|  |  28013 Madrid, España             |     |         Google Maps / OSM         |                 |
|  |                                   |     |                                   |                 |
|  |  📞 Teléfono                      |     |         [Marcador 📍]             |                 |
|  |  +34 912 345 678                  |     |                                   |                 |
|  |                                   |     +-----------------------------------+                 |
|  |  ✉️ Email                         |                                                           |
|  |  info@corteitaliana.es              |                                                           |
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
| Calle Gran Vía, 42        |
| 28013 Madrid              |
|                           |
| 📞 Teléfono               |
| +34 912 345 678           |
|                           |
| ✉️ Email                  |
| info@corteitaliana.es       |
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
+---------------------------+
```

---

#### 8. Footer

**Desktop:**
```
+--------------------------------------------------------------------------------------------------+
|  🍝 Corte Italiana        ENLACES RÁPIDOS      CONTACTO              NEWSLETTER                   |
|  Auténtica cocina        ───────────────       ────────              ──────────                   |
|  italiana desde 1985     Inicio                📍 Gran Vía, 42       Suscríbete para             |
|                          Menú                  📞 +34 912 345 678    ofertas exclusivas          |
|                          Reservar              ✉️ info@corteitaliana.es [Tu email] [→]             |
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
|  📍 Gran Vía, 42          |
|  📞 +34 912 345 678       |
|  ✉️ info@corteitaliana.es   |
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
| Reseñas | Carrusel cards | 3 visibles | 1 visible |
| Footer | Links, Newsletter | 4 columnas | 1 columna |

## Convenciones
- **Componentes:** Functional components con hooks.
- **Nomenclatura:** PascalCase para componentes, camelCase para variables/funciones.
- **Archivos:** Componente = `NombreComponente.jsx` + `NombreComponente.module.css`.
- **Imports:** Orden: 1) React, 2) Librerías externas, 3) Componentes, 4) Hooks, 5) Utilidades, 6) Estilos.
- **Propiedades:** Usar destructuring en parámetros de componentes.

## Estilo Visual
- **Paleta de Colores:**
  - Principal: Negro (#1a1a1a) y Dorado (#d4af37).
  - Secundario: Blanco (#ffffff), Gris claro (#f5f5f5), Dorado oscuro (#b8860b).
- **Tipografía:**
  - Títulos: Fuente serif elegante (ej. Playfair Display, Georgia).
  - Cuerpo: Fuente sans-serif limpia (ej. Lato, Open Sans).
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
2. **Documentación:** Crear carpeta en `features/` con `plan.md`, `spec.md`, `task.md`.
3. **Implementación:** Crear componentes en `src/components/`.
4. **Estilización:** Crear estilos en CSS Modules.
5. **Testing:** Escribir tests unitarios para componentes.
6. **Revisión:** Verificar lint, responsividad, accesibilidad.
7. **Integración:** Merge a main (o rama de desarrollo).
8. **Actualización:** Mover tarea a "hecho" en `constitution/roadmap.md`.

## Documentación
- Mantener `README.md` actualizado con specs y estructura.
- Actualizar `constitution/roadmap.md` al completar features.
- Documentar decisiones técnicas en `constitution/tech-stack.md`.
- Cada feature debe tener su documentación en `features/`.
