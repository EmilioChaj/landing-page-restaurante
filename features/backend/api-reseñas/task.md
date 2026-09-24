# Task: API Reseñas

## Plan de Implementación

### Sub-tareas
1. **Almacenamiento** (0.5h)
   - Crear `backend/data/reviews.json` con 6 reseñas semilla

2. **Rate Limiter dedicado** (0.5h)
   - Exportar `reviewLimiter` en `middleware/rateLimiter.js`
   - 10 requests/hora por IP, mensaje en español

3. **Endpoint GET /api/reviews** (1h)
   - Leer archivo JSON con `fs/promises`
   - Responder `{ reviews }` o 500

4. **Endpoint POST /api/reviews** (1.5h)
   - Validar nombre, comentario, estrellas
   - Generar id, fecha, foto (ui-avatars)
   - Escribir archivo y responder 201
   - Aplicar `reviewLimiter`

5. **Montar rutas en server.js** (0.5h)
   - Importar y montar bajo `/api`
   - Verificar CORS (ya permite GET/POST)

6. **Pruebas con curl** (1h)
   - GET → 200 con reseñas
   - POST válido → 201
   - POST inválido → 400
   - Verificar persistencia en el archivo

### Total Estimado: 5 horas
