# Spec: Despliegue Render

## Qué Hace
- Despliega el backend Express en Render (free tier)
- Configura variables de entorno de forma segura
- Conecta frontend (Vercel) con backend (Render)
- Verifica el flujo completo de suscripción en producción

## Requisitos

### Cuenta Render
- [ ] Crear cuenta en Render
- [ ] Verificar si requiere tarjeta de crédito (información conflicting)
- [ ] Conectar repositorio GitHub

### Configuración del Servicio
- [ ] Root Directory: `backend/`
- [ ] Build Command: `npm install`
- [ ] Start Command: `npm start`
- [ ] Instance Type: Free
- [ ] Puerto asignado por Render (`process.env.PORT`)

### Variables de Entorno (Render Dashboard)
- [ ] `BREVO_API_KEY` - valor real de Brevo
- [ ] `BREVO_LIST_ID` - ID de lista
- [ ] `BREVO_TEMPLATE_ID` - ID de template DOI
- [ ] `CORS_ORIGIN` - URL de Vercel (frontend)
- [ ] `REDIRECT_URL` - URL de Render (backend)
- [ ] `NODE_ENV` - production

### Variables de Entorno (Vercel Dashboard)
- [ ] `VITE_API_URL` - URL de Render (backend)

### Verificación
- [ ] `GET /health` retorna `{ status: 'ok' }`
- [ ] `POST /api/subscribe` funciona desde Vercel
- [ ] Email de confirmación recibido por Brevo
- [ ] Link de confirmación redirige a `/confirmado`
- [ ] Página `/confirmado` se muestra correctamente
- [ ] CORS permite requests desde Vercel
- [ ] Rate limiting funciona en producción

### Seguridad
- [ ] `.env` no incluido en git
- [ ] API key solo en variables de entorno de Render
- [ ] API key no expuesta en respuestas
- [ ] CORS restringido al dominio de Vercel

### Notas
- [ ] Render free tier: 750 hrs/mes, cold start 30-60s
- [ ] Si Render pide tarjeta: evaluar alternativas (Koyeb, SnapDeploy)
