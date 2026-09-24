# Task: Newsletter Footer

## Plan de Implementación

### Sub-tareas
1. **Componente Footer.jsx** (2h)
   - Importar `useForm` desde hooks
   - Definir `initialValues` y `validate()` a nivel módulo
   - Implementar `onSubmit` con fetch al backend
   - Agregar checkbox GDPR al formulario
   - Implementar estados: enviando, éxito, error
   - Reemplazar `useState` manual por `useForm`

2. **Estilos CSS** (1h)
   - Agregar `.checkbox` y `.gdprLabel`
   - Agregar `.error` (rojo)
   - Agregar `.loading` (botón deshabilitado)
   - Verificar `.success` existente
   - Responsive mobile

3. **Variables de Entorno** (0.5h)
   - Agregar `VITE_API_URL` a `.env`
   - Agregar `VITE_API_URL` a `.env.example`

4. **Tests** (1.5h)
   - Actualizar test de renderizado del formulario
   - Test de validación email inválido
   - Test de validación GDPR requerido
   - Test de éxito con fetch mock
   - Mock de `global.fetch`

5. **Verificación** (1h)
   - Ejecutar `npm run lint`
   - Ejecutar `npm run test`
   - Probar localmente con backend corriendo
   - Verificar responsividad

### Total Estimado: 6 horas
