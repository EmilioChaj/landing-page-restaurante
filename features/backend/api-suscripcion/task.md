# Task: API Suscripción

## Plan de Implementación

### Sub-tareas
1. **Middleware de Rate Limiting** (1h)
   - Instalar `express-rate-limit`
   - Crear `middleware/rateLimiter.js`
   - Configurar 5 requests/hora por IP
   - Mensaje de error en español
   - Configurar headers `X-RateLimit-*`

2. **Endpoint POST /api/subscribe** (1.5h)
   - Crear `routes/newsletter.js`
   - Implementar validación de email (regex)
   - Implementar validación de `gdprConsent`
   - Integrar rate limiter
   - Conectar con `subscribeContact()` de Brevo
   - Manejar todas las respuestas (200, 400, 429, 500)

3. **Montar Rutas en Server** (0.5h)
   - Importar rutas en `server.js`
   - Montar bajo `/api`
   - Verificar que CORS permite el endpoint

4. **Pruebas** (1h)
   - Probar con curl: request válido → 200
   - Probar email inválido → 400
   - Probar sin GDPR → 400
   - Probar rate limit (6+ requests) → 429
   - Probar método GET → 405

### Total Estimado: 4 horas
