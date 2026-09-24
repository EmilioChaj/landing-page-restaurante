# Spec: API Suscripción

## Qué Hace
- Recibe solicitudes de suscripción al newsletter desde el frontend
- Valida email y consentimiento GDPR antes de procesar
- Aplica rate limiting para prevenir abuso
- Inicia el proceso Double Opt-In de Brevo
- Retorna respuestas claras de éxito o error

## Requisitos

### Endpoint
- [ ] `POST /api/subscribe`
- [ ] Content-Type: `application/json`
- [ ] Body: `{ email: string, gdprConsent: boolean }`

### Validaciones
- [ ] Email requerido y formato válido (regex)
- [ ] `gdprConsent` debe ser `true` (obligatorio)
- [ ] Respuesta 400 con mensaje claro si validación falla
- [ ] Validación en servidor (no solo en cliente)

### Rate Limiting
- [ ] 5 requests por IP por hora
- [ ] Aplicado con `express-rate-limit`
- [ ] Respuesta 429 con mensaje en español
- [ ] Headers `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`
- [ ] Solo en `POST /api/subscribe` (no en health check)

### Integración Brevo
- [ ] Llamar `subscribeContact()` con datos validados
- [ ] Pasar `redirectionUrl` apuntando a `/confirmado`
- [ ] Manejar errores de Brevo (no exponer detalles internos)

### Respuestas
- [ ] Éxito (200): `{ success: true, message: '...' }`
- [ ] Validación (400): `{ error: '...' }`
- [ ] Rate limit (429): `{ error: '...' }`
- [ ] Error servidor (500): `{ error: '...' }`
- [ ] Método no permitido (405): `{ error: '...' }`

### Seguridad
- [ ] API key nunca en respuestas
- [ ] Validación server-side completa
- [ ] Rate limiting efectivo por IP
