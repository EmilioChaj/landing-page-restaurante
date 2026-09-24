# Plan: Reseñas

## Enfoque
Mostrar testimonios de clientes para generar confianza y credibilidad, y permitir publicar nuevas reseñas inmediatamente vía backend.

## Implementación
1. **Reviews Component:**
   - Título de sección
   - Carrusel o grid de reseñas
   - Navegación entre reseñas
   - Fetch de reseñas desde `GET /api/reviews` (fallback a JSON estático)

2. **ReviewItem Component:**
   - Foto del cliente (avatar)
   - Nombre del cliente
   - Estrellas de calificación
   - Texto de la reseña
   - Fecha (opcional)

3. **Estrellas:**
   - Componente reutilizable de estrellas
   - Llenas, medias, vacías
   - Selector interactivo 1-5 en el formulario

4. **Datos:**
   - Array de reseñas en JSON (fallback del frontend)
   - Persistencia en `backend/data/reviews.json` vía API
   - Mínimo 6 reseñas semilla

5. **Formulario Publicar Reseña:**
   - Debajo del carrusel, siempre visible
   - Hook `useForm` con validación (nombre, estrellas, comentario)
   - `POST /api/reviews` → prepend inmediato al estado + mensaje de éxito
   - Estilos oscuros consistentes con la sección (negro/dorado)
