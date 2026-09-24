# Task: Reseñas

## Plan de Implementación

### Sub-tareas
1. **Datos** (1h)
   - Crear src/data/reviews.json
   - 6+ reseñas de ejemplo

2. **Stars Component** (1h)
   - Componente reutilizable
   - Renderizar estrellas llenas/vacías

3. **ReviewItem Component** (1h)
   - Avatar, nombre, estrellas, texto
   - Estilos de tarjeta

4. **Reviews Component** (2h)
   - Carrusel o grid de reseñas
   - Navegación
   - Responsive

5. **Estilos** (2h)
   - Estilos de tarjetas
   - Carrusel/grid
   - Responsive

6. **Integración** (1h)
   - Integrar en App.jsx

7. **Publicar Reseña (fetch + formulario)** (2h)
   - GET /api/reviews en useEffect con fallback a JSON estático
   - Formulario debajo del carrusel (nombre, estrellas 1-5, comentario)
   - Validación con hook useForm
   - POST /api/reviews → prepend inmediato + mensaje éxito
   - Estilos del formulario en modo oscuro

8. **Tests** (1h)
   - Mock de fetch (GET fallido → datos estáticos, POST exitoso → prepend)
   - Validaciones de formulario
   - Mensajes de éxito/error

### Total Estimado: 11 horas
