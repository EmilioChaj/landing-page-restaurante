# Plan: Newsletter Footer

## Enfoque
Reemplazar el formulario de newsletter simulado del Footer por uno real que se conecte al backend Express, con validación de email, checkbox GDPR y estados de carga/éxito/error, reutilizando el hook `useForm` del proyecto.

## Implementación
1. **Footer Component (`Footer.jsx`):**
   - Reemplazar `useState` manual por hook `useForm`
   - Definir `initialValues = { email: '', gdprConsent: false }`
   - Definir `validate()` a nivel módulo (regex email + GDPR)
   - Implementar `onSubmit` con `fetch` a `${VITE_API_URL}/api/subscribe`
   - Estados: formulario → enviando → éxito → error

2. **Formulario:**
   - Campo email con `type="email"` y placeholder
   - Checkbox GDPR: "Acepto recibir emails y la política de privacidad"
   - Botón de envío con estado de carga ("Enviando...")
   - Mensaje de éxito: "¡Revisa tu email para confirmar!"
   - Mensaje de error debajo del formulario

3. **Validación:**
   - Email: regex `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
   - GDPR: `gdprConsent` debe ser `true`
   - Mensajes de error en español
   - Validación en cliente (el servidor también valida)

4. **Estilos (`Footer.module.css`):**
   - `.checkbox` - checkbox GDPR con label
   - `.error` - texto de error (rojo)
   - `.loading` - botón deshabilitado
   - `.gdprLabel` - texto pequeño para checkbox
   - Responsive para mobile

5. **Tests (`Footer.test.jsx`):**
   - Renderiza formulario con checkbox GDPR
   - Muestra error si email inválido
   - Muestra error si no acepta GDPR
   - Muestra mensaje de éxito tras submit exitoso
   - Mock de `global.fetch`
