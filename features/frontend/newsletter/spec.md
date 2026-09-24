# Spec: Newsletter Footer

## Qué Hace
- Permite a los usuarios suscribirse al newsletter ingresando su email
- Valida el formato del email y el consentimiento GDPR
- Envía la solicitud al backend Express que procesa con Brevo
- Muestra estados claros: carga, éxito y error
- Cumple con GDPR mediante checkbox de consentimiento

## Requisitos

### Formulario
- [ ] Campo email (requerido, formato válido)
- [ ] Checkbox GDPR (requerido): "Acepto recibir emails..."
- [ ] Botón de envío con estado de carga
- [ ] Reutilizar hook `useForm` del proyecto
- [ ] Validación con `validate()` a nivel módulo

### Validación
- [ ] Email: regex `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
- [ ] GDPR: `gdprConsent` debe ser `true`
- [ ] Mensajes de error en español
- [ ] Errores mostrados debajo de cada campo

### API
- [ ] `POST ${VITE_API_URL}/api/subscribe`
- [ ] Body: `{ email, gdprConsent }`
- [ ] Content-Type: application/json
- [ ] Manejar éxito (200), validación (400), rate limit (429), error (500)
- [ ] No exponer detalles internos de error al usuario

### UI/UX
- [ ] Estado inicial: formulario visible
- [ ] Estado enviando: botón deshabilitado, texto "Enviando..."
- [ ] Estado éxito: "¡Revisa tu email para confirmar!"
- [ ] Estado error: mensaje de error visible
- [ ] Checkbox GDPR visible y accesible
- [ ] Diseño consistente con Footer (negro/dorado)
- [ ] Responsive (mobile-first)

### CSS (Footer.module.css)
- [ ] `.checkbox` - estilo checkbox
- [ ] `.gdprLabel` - texto label del checkbox
- [ ] `.error` - texto de error (rojo)
- [ ] `.loading` - botón deshabilitado
- [ ] `.success` - mensaje de éxito (existente, verificar)
- [ ] Responsive en `@media (max-width: 768px)`

### Tests (Footer.test.jsx)
- [ ] Renderiza formulario con input email y checkbox
- [ ] Muestra error si email inválido al submit
- [ ] Muestra error si no acepta GDPR
- [ ] Muestra mensaje de éxito tras submit exitoso
- [ ] Mock de `global.fetch` con `vi.spyOn`
- [ ] Verificar que fetch llama a `/api/subscribe`
