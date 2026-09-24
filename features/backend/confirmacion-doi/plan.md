# Plan: Confirmación DOI

## Enfoque
Crear el endpoint `GET /confirmado` que muestra una página HTML elegante cuando Brevo redirige al usuario tras hacer clic en el link de confirmación del email Double Opt-In.

## Implementación
1. **Endpoint `GET /confirmado` (`routes/newsletter.js`):**
   - Retornar página HTML con estilo del restaurante (negro/dorado)
   - Mensaje: "¡Suscripción confirmada!"
   - Subtítulo: "Gracias por unirte a nuestro newsletter"
   - Link de vuelta al frontend (`CORS_ORIGIN` o URL del sitio)
   - Diseño responsive y elegante

2. **Diseño de la Página:**
   - Colores: fondo negro `#1a1a1a`, acentos dorado `#d4af37`
   - Fuente: serif elegante para títulos
   - Icono/emoji de confirmación (✓ o 🍝)
   - Estilo consistente con la landing page
   - HTML inline (sin archivos estáticos externos)

3. **Flujo de Redirección:**
   - Brevo redirige a `GET {REDIRECT_URL}/confirmado`
   - `REDIRECT_URL` se pasa en `createDoiContact({ redirectionUrl })`
   - El usuario ve la página de confirmación
   - Link para volver al sitio principal
