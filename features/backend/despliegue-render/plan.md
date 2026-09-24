# Plan: Despliegue Render

## Enfoque
Desplegar el backend Express en Render utilizando el free tier, configurar variables de entorno de forma segura y verificar que la API funciona correctamente en producción junto con el frontend en Vercel.

## Implementación
1. **Preparación del Repositorio:**
   - Asegurar que `backend/.env` está en `.gitignore`
   - Verificar que `backend/package.json` tiene `start` script
   - Verificar que `server.js` usa `process.env.PORT`
   - Subir código a GitHub

2. **Configuración en Render:**
   - Crear cuenta en Render (verificar si pide tarjeta)
   - New → Web Service → conectar repositorio GitHub
   - Configuración:
     - Name: nombre del servicio
     - Root Directory: `backend/`
     - Runtime: Node
     - Build Command: `npm install`
     - Start Command: `npm start`
     - Instance Type: Free

3. **Variables de Entorno en Render:**
   - `BREVO_API_KEY` - API key de Brevo
   - `BREVO_LIST_ID` - ID de lista
   - `BREVO_TEMPLATE_ID` - ID de template DOI
   - `CORS_ORIGIN` - URL del frontend Vercel
   - `REDIRECT_URL` - URL del backend (para Brevo)
   - `NODE_ENV` - production

4. **Configuración en Vercel (Frontend):**
   - Variable `VITE_API_URL` = URL de Render
   - Redeploy del frontend

5. **Verificación Post-Deploy:**
   - Probar `GET /health` en Render
   - Probar `POST /api/subscribe` con email real
   - Verificar email de confirmación recibido
   - Probar link de confirmación → `/confirmado`
   - Probar suscripción desde frontend en Vercel

6. **Configuración Final en Brevo:**
   - `redirectionUrl` apunta a `https://backend.onrender.com/confirmado`
   - Verificar template DOI configurado correctamente
