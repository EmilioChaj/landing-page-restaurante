# Spec: Integración Brevo

## Qué Hace
- Conecta con la API de Brevo usando el SDK oficial
- Inicia el proceso de Double Opt-In para nuevos suscriptores
- Mantiene la API key segura en el servidor (nunca en el frontend)
- Maneja errores de la API de Brevo

## Requisitos

### Cliente
- [ ] Inicializar `BrevoClient` con `process.env.BREVO_API_KEY`
- [ ] SDK: `@getbrevo/brevo` (versión actual)
- [ ] Inicialización perezosa (lazy) o al cargar el módulo

### Función subscribeContact
- [ ] Parámetros: `email`, `listId`, `templateId`, `redirectUrl`
- [ ] Llamar `brevo.contacts.createDoiContact()` con:
  - [ ] `email` - email del suscriptor
  - [ ] `includeListIds: [listId]` - array con ID de lista
  - [ ] `templateId` - ID del template DOI
  - [ ] `redirectionUrl` - URL post-confirmación
- [ ] Retornar `{ success: true }` en éxito
- [ ] Propagar errores con mensaje claro

### Manejo de Errores
- [ ] Capturar `BadRequestError` de Brevo (email inválido, lista no existe, etc.)
- [ ] Capturar `BrevoTimeoutError` (timeout de API)
- [ ] Capturar errores genéricos de red
- [ ] Nunca exponer API key en mensajes de error
- [ ] Loggear errores para debugging (console.error sin API key)

### Seguridad
- [ ] API key solo en variables de entorno del servidor
- [ ] API key nunca se envía al frontend
- [ ] `.env` incluido en `.gitignore`
