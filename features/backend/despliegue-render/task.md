# Task: Despliegue Render

## Plan de Implementación

### Sub-tareas
1. **Preparación** (0.5h)
   - Verificar `.gitignore` incluye `backend/.env`
   - Verificar `package.json` tiene script `start`
   - Verificar `server.js` usa `process.env.PORT`
   - Subir código a GitHub

2. **Cuenta y Servicio en Render** (1h)
   - Crear cuenta en Render
   - Verificar requisito de tarjeta de crédito
   - Crear Web Service desde GitHub
   - Configurar Root Directory, Build, Start commands
   - Seleccionar Instance Type Free

3. **Variables de Entorno** (0.5h)
   - Configurar `BREVO_API_KEY` en Render
   - Configurar `BREVO_LIST_ID` en Render
   - Configurar `BREVO_TEMPLATE_ID` en Render
   - Configurar `CORS_ORIGIN` con URL de Vercel
   - Configurar `REDIRECT_URL` con URL de Render
   - Configurar `NODE_ENV=production`

4. **Frontend en Vercel** (0.5h)
   - Crear cuenta en Vercel
   - Importar repositorio
   - Configurar `VITE_API_URL` con URL de Render
   - Deploy del frontend

5. **Verificación End-to-End** (1h)
   - Probar health check en Render
   - Probar suscripción desde Vercel
   - Verificar email de confirmación
   - Probar link de confirmación
   - Verificar página `/confirmado`
   - Probar rate limiting

6. **Configuración Brevo** (0.5h)
   - Verificar `redirectionUrl` en `subscribeContact()` apunta a Render
   - Verificar template DOI activo
   - Probar flujo completo con email real

### Total Estimado: 4 horas
