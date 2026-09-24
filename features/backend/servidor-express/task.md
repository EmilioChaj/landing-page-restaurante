# Task: Servidor Express

## Plan de Implementación

### Sub-tareas
1. **Estructura del Proyecto** (0.5h)
   - Crear carpeta `backend/`
   - Crear subcarpetas: `routes/`, `services/`, `middleware/`
   - Crear `package.json` con dependencias

2. **Servidor Principal** (1h)
   - Implementar `server.js` con Express
   - Configurar CORS con `CORS_ORIGIN`
   - Configurar JSON parsing
   - Agregar health check en `GET /health`
   - Agregar manejo de errores y 404

3. **Variables de Entorno** (0.5h)
   - Crear `.env.example` con variables documentadas
   - Crear `.env` con valores placeholder
   - Verificar `.gitignore` incluye `.env`

4. **Pruebas Locales** (1h)
   - Instalar dependencias (`npm install`)
   - Levantar servidor localmente
   - Probar health check con curl
   - Verificar CORS con requests desde otro origen

### Total Estimado: 3 horas
