# Spec: API Reseñas

## Qué Hace
- Almacena reseñas publicadas por visitantes en el servidor
- Permite obtener todas las reseñas (semillas + nuevas)
- Valida datos y aplica rate limiting para prevenir abuso

## Requisitos

### Endpoints
- [ ] `GET /api/reviews` → `{ reviews: [...] }`
- [ ] `POST /api/reviews` → `{ success: true, review }` (201)

### Validaciones (POST)
- [ ] `nombre`: string, 2-50 caracteres (trim)
- [ ] `comentario`: string, 10-500 caracteres (trim)
- [ ] `estrellas`: entero 1-5
- [ ] Respuesta 400 con mensaje en español si falla

### Rate Limiting
- [ ] 10 requests por IP por hora en `POST /api/reviews`
- [ ] Middleware `reviewLimiter` en `middleware/rateLimiter.js`
- [ ] Respuesta 429 con mensaje en español

### Almacenamiento
- [ ] Archivo `backend/data/reviews.json`
- [ ] Semilla con 6 reseñas iniciales
- [ ] `id` autoincremental (max+1)
- [ ] `fecha` en formato ISO `YYYY-MM-DD`
- [ ] `foto` generada con ui-avatars (colores de marca: fondo #b8960b, texto #1a1a1a)

### Respuestas
- [ ] Éxito GET (200): `{ reviews: [...] }`
- [ ] Éxito POST (201): `{ success: true, review: {...} }`
- [ ] Validación (400): `{ error: '...' }`
- [ ] Rate limit (429): `{ error: '...' }`
- [ ] Error servidor (500): `{ error: '...' }`
