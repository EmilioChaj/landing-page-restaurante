# Spec: Confirmación DOI

## Qué Hace
- Muestra página de confirmación tras Double Opt-In exitoso
- Proporciona feedback visual al usuario de que la suscripción se completó
- Ofrece link para volver al sitio principal
- Mantiene identidad visual del restaurante (negro/dorado)

## Requisitos

### Endpoint
- [ ] `GET /confirmado`
- [ ] Retorna HTML (Content-Type: text/html)
- [ ] Status 200

### Contenido
- [ ] Mensaje principal: "¡Suscripción confirmada!"
- [ ] Mensaje secundario: "Gracias por unirte a nuestro newsletter"
- [ ] Icono visual de éxito (✓ o similar)
- [ ] Link "Volver al inicio" apuntando al frontend
- [ ] Nombre del restaurante visible

### Diseño
- [ ] Fondo negro `#1a1a1a` o variante oscura
- [ ] Acentos dorados `#d4af37`
- [ ] Tipografía serif elegante para títulos
- [ ] HTML inline (sin archivos externos)
- [ ] Responsive (mobile-first)
- [ ] Centrado vertical y horizontal
- [ ] Estilo consistente con la landing

### Funcionalidad
- [ ] Link de retorno usa variable de entorno (frontend URL)
- [ ] No requiere autenticación
- [ ] Accesible públicamente (Brevo redirige aquí)
- [ ] No expone información sensible
