# Plan: Servidor Express

## Enfoque
Crear la estructura base del servidor Express que servirá como backend para la funcionalidad de newsletter con Brevo, incluyendo CORS, health check y gestión de variables de entorno.

## Implementación
1. **Estructura del Proyecto:**
   - Crear carpeta `backend/` con estructura estándar
   - `server.js` como punto de entrada
   - `routes/` para definir endpoints
   - `services/` para lógica de negocio (integración Brevo)
   - `middleware/` para middlewares transversales (rate limiting)

2. **Servidor Express (`server.js`):**
   - Configurar Express con JSON parsing
   - Configurar CORS restringido al dominio del frontend (Vercel)
   - Puerto desde `process.env.PORT` (asignado por Render)
   - Montar rutas de newsletter bajo `/api`
   - Health check endpoint en `GET /health`
   - Manejo de errores global

3. **Configuración de Dependencias (`package.json`):**
   - `express` - servidor HTTP
   - `@getbrevo/brevo` - SDK oficial de Brevo
   - `express-rate-limit` - rate limiting
   - `cors` - permitir requests del frontend
   - `dotenv` - variables de entorno
   - Scripts: `start`, `dev`

4. **Variables de Entorno:**
   - `.env.example` con todas las variables documentadas
   - `.env` gitignored para valores reales
   - Variables: `BREVO_API_KEY`, `BREVO_LIST_ID`, `BREVO_TEMPLATE_ID`, `CORS_ORIGIN`, `PORT`
