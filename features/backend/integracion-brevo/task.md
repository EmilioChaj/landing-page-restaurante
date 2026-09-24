# Task: Integración Brevo

## Plan de Implementación

### Sub-tareas
1. **Instalación del SDK** (0.5h)
   - Instalar `@getbrevo/brevo` en `backend/`
   - Verificar compatibilidad con Node.js

2. **Servicio Brevo** (1.5h)
   - Crear `services/brevo.js`
   - Inicializar `BrevoClient` con `BREVO_API_KEY`
   - Implementar `subscribeContact(email, listId, templateId, redirectUrl)`
   - Configurar `createDoiContact()` con parámetros correctos
   - Implementar manejo de errores (BadRequest, Timeout, genéricos)

3. **Validación con Datos Reales** (1h)
   - Configurar `.env` con API key, List ID, Template ID reales
   - Probar `subscribeContact()` con un email de prueba
   - Verificar que Brevo envía email de confirmación
   - Verificar que contacto se agrega tras confirmación
   - Probar casos de error (email inválido, API key incorrecta)

### Total Estimado: 3 horas
