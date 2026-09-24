# Spec: Servidor Express

## Qué Hace
- Expone una API REST para el procesamiento de suscripciones al newsletter
- Configura CORS para permitir requests solo desde el frontend autorizado
- Proporciona health check para monitoreo en Render
- Gestiona variables de entorno de forma segura

## Requisitos

### Servidor
- [ ] Express configurado con `express.json()`
- [ ] Puerto desde `process.env.PORT` (fallback: 3001)
- [ ] CORS configurado con `origin` desde `CORS_ORIGIN`
- [ ] Health check en `GET /health` retorna `{ status: 'ok' }`
- [ ] Manejo de errores global (middleware de error)
- [ ] 404 para rutas no encontradas

### Estructura
- [ ] `server.js` - punto de entrada
- [ ] `routes/newsletter.js` - endpoints de newsletter
- [ ] `services/brevo.js` - integración con Brevo
- [ ] `middleware/rateLimiter.js` - rate limiting
- [ ] `package.json` con dependencias y scripts

### Variables de Entorno
- [ ] `BREVO_API_KEY` - API key de Brevo
- [ ] `BREVO_LIST_ID` - ID de lista de contactos
- [ ] `BREVO_TEMPLATE_ID` - ID de template DOI
- [ ] `CORS_ORIGIN` - URL del frontend (Vercel)
- [ ] `PORT` - puerto del servidor (Render asigna)
- [ ] `.env.example` documentado
- [ ] `.env` en `.gitignore`

### Scripts
- [ ] `npm start` - producción (node server.js)
- [ ] `npm run dev` - desarrollo con watch (node --watch)
