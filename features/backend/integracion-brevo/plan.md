# Plan: Integración Brevo

## Enfoque
Crear el servicio que conecta con la API de Brevo para registrar nuevos suscriptores mediante el proceso de Double Opt-In (DOI), manteniendo la API key segura en el servidor.

## Implementación
1. **Cliente Brevo (`services/brevo.js`):**
   - Inicializar `BrevoClient` con `BREVO_API_KEY` desde variables de entorno
   - Exportar función `subscribeContact(email, listId, templateId, redirectUrl)`
   - La función llama a `brevo.contacts.createDoiContact()` con:
     - `email` - email del suscriptor
     - `includeListIds` - array con ID de la lista
     - `templateId` - ID del template de confirmación DOI
     - `redirectionUrl` - URL a donde redirigir tras confirmar

2. **Manejo de Errores:**
   - Capturar errores de la API de Brevo (BadRequestError, TimeoutError, etc.)
   - Retornar errores estandarizados al endpoint
   - Loggear errores para debugging (sin exponer API key)

3. **Flujo Double Opt-In:**
   - `subscribeContact()` inicia el proceso DOI
   - Brevo envía email de confirmación al usuario
   - Usuario hace clic en el link de confirmación
   - Brevo redirige a `redirectionUrl` (endpoint `/confirmado`)
   - Contacto agregado a la lista solo tras confirmación
