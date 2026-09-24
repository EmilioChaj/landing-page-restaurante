# Spec: Reseñas

## Qué Hace
- Muestra testimonios de clientes satisfechos
- Genera confianza en potenciales clientes
- Muestra la calidad del servicio
- Permite a los visitantes publicar reseñas inmediatamente

## Requisitos
### Sección Reseñas
- [x] Título "Lo Que Dicen Nuestros Clientes"
- [x] Carrusel o grid (3 visibles desktop, 1 móvil)
- [x] Navegación (flechas o dots)

### Tarjeta de Reseña
- [x] Avatar del cliente (circular)
- [x] Nombre del cliente
- [x] Estrellas (1-5)
- [x] Texto de la reseña
- [x] Fecha (opcional)

### Estrellas
- [x] Componente reutilizable
- [x] Estrellas llenas doradas
- [x] Estrellas vacías grises

### Datos
- [x] Mínimo 6 reseñas
- [x] Datos en src/data/reviews.json (fallback) y backend/data/reviews.json (persistente)
- [x] Fotos de avatar placeholder

### Publicar Reseña
- [x] Formulario debajo del carrusel (siempre visible)
- [x] Campos: Nombre*, Calificación (1-5 estrellas)*, Comentario*
- [x] Validación cliente (nombre ≥ 2, comentario ≥ 10, estrellas 1-5)
- [x] Envío a `POST /api/reviews` (backend Express)
- [x] Al éxito: prepend inmediato al carrusel + mensaje de confirmación + reset form
- [x] Fallback: si el backend no responde, se muestran las reseñas estáticas
- [x] Rate limit server-side: 10/hora por IP
