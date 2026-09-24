# Plan: API Reseñas

## Enfoque
Crear los endpoints `GET /api/reviews` y `POST /api/reviews` para que los visitantes puedan publicar reseñas que persistan en el servidor y sean visibles para todos.

## Implementación
1. **Almacenamiento (`backend/data/reviews.json`):**
   - Archivo JSON con las reseñas (semilla de 6 + nuevas publicadas)
   - Lectura/escritura con `fs/promises`

2. **Endpoint `GET /api/reviews` (`routes/reviews.js`):**
   - Retorna `{ reviews: [...] }`
   - 500 si falla la lectura del archivo

3. **Endpoint `POST /api/reviews` (`routes/reviews.js`):**
   - Recibe `{ nombre, comentario, estrellas }`
   - Valida: nombre 2-50 chars, comentario 10-500 chars, estrellas entero 1-5
   - Genera `id` (max+1), `fecha` (hoy ISO), `foto` (ui-avatars con colores de marca)
   - Rate limit: 10/hora por IP (`reviewLimiter`)
   - Responde 201 con `{ success: true, review }`

4. **Montaje en `server.js`:**
   - `app.use('/api', reviewsRoutes)` junto al de newsletter
   - CORS ya permite GET/POST

5. **Frontend (`Reviews.jsx`):**
   - Fetch GET en mount con fallback a JSON estático
   - Formulario debajo del carrusel → POST → prepend inmediato al estado
