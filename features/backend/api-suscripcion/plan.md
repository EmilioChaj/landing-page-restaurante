# Plan: API Suscripción

## Enfoque
Crear el endpoint `POST /api/subscribe` que recibe solicitudes de suscripción del frontend, valida los datos (email y consentimiento GDPR), aplica rate limiting y delega a Brevo el registro con Double Opt-In.

## Implementación
1. **Endpoint `POST /api/subscribe` (`routes/newsletter.js`):**
   - Recibir JSON: `{ email, gdprConsent }`
   - Validar formato de email con regex
   - Validar que `gdprConsent === true` (obligatorio GDPR)
   - Aplicar rate limiting (5 requests/hora por IP)
   - Llamar a `subscribeContact()` del servicio Brevo
   - Retornar `{ success: true }` en éxito
   - Retornar error apropiado en fallo

2. **Validaciones:**
   - Email: regex `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
   - GDPR: `gdprConsent` debe ser `true`
   - Respuestas: 400 (validación), 429 (rate limit), 500 (error Brevo)

3. **Rate Limiting (`middleware/rateLimiter.js`):**
   - `express-rate-limit` con 5 requests por IP por hora
   - Mensaje de error en español
   - Aplicado solo a `POST /api/subscribe`
   - Headers `X-RateLimit-*` en respuestas

4. **Respuestas:**
   - Éxito: `{ success: true, message: 'Revisa tu email para confirmar' }`
   - Validación: `{ error: 'mensaje de error' }` con status 400
   - Rate limit: `{ error: 'Demasiados intentos...' }` con status 429
   - Error Brevo: `{ error: 'Error al procesar...' }` con status 500
