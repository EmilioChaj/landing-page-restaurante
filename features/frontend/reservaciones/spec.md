# Spec: Reservaciones

## Qué Hace
- Permite a los clientes hacer reservaciones online
- Valida la información ingresada
- Proporciona información de contacto alternativa

## Requisitos
### Formulario
- [ ] Campo Nombre (requerido, mín 2 caracteres)
- [ ] Campo Email (requerido, formato válido)
- [ ] Campo Teléfono (requerido, formato válido)
- [ ] Campo Fecha (requerido, fecha futura)
- [ ] Campo Hora (requerido, horario del restaurante)
- [ ] Campo Número de personas (requerido, 1-20)
- [ ] Campo Notas (opcional, máx 200 caracteres)
- [ ] Validación en tiempo real
- [ ] Mensajes de error claros

### UI/UX
- [ ] Diseño elegante consistente
- [ ] Estados de carga y éxito
- [ ] Responsive design
- [ ] Accesibilidad completa

### Info Panel
- [ ] Horarios de apertura
- [ ] Dirección y mapa
- [ ] Teléfono directo
- [ ] Política de cancelación (24h anticipación)

### Datos
- [ ] Horarios hardcodeados o en config
- [ ] Envío a backend (simulado por ahora)
