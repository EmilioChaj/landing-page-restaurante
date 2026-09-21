# Tech Stack

## Tecnologías
| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| React | 18.x | UI Library |
| Vite | 5.x | Build tool y dev server |
| JavaScript | ES6+ | Lenguaje principal |
| CSS Modules | - | Estilos encapsulados |
| Vitest | - | Testing framework |
| React Testing Library | - | Testing de componentes |
| ESLint | - | Linting |

## Archivos Clave
- `src/App.jsx`: Componente raíz
- `src/main.jsx`: Punto de entrada
- `src/components/`: Componentes React
- `src/data/`: Datos estáticos (menú.json, reseñas.json)
- `src/styles/`: Estilos globales y variables CSS
- `vite.config.js`: Configuración de Vite

## Comandos
```bash
# Desarrollo
npm run dev          # Servidor en localhost:5173

# Build
npm run build        # Genera dist/
npm run preview      # Preview del build

# Calidad
npm run lint         # Verificar linting
npm run test         # Ejecutar tests
```

## Modelos de Datos

### Plato (Menu Item)
```json
{
  "id": 1,
  "nombre": "Bruschetta Classica",
  "descripcion": "Pan tostado con tomate, albahaca y ajo",
  "precio": 8.50,
  "imagen": "/images/bruschetta.jpg",
  "categoria": "Antipasti",
  "destacado": false
}
```

### Reseña (Review)
```json
{
  "id": 1,
  "nombre": "María García",
  "foto": "/images/avatar1.jpg",
  "estrellas": 5,
  "comentario": "Excelente comida y servicio. Volveré pronto!",
  "fecha": "2024-01-15"
}
```

### Reservación (Reservation)
```json
{
  "nombre": "Juan López",
  "email": "juan@email.com",
  "telefono": "+34 612 345 678",
  "fecha": "2024-02-14",
  "hora": "21:00",
  "personas": 4,
  "notas": "Mesa cerca de la ventana por favor"
}
```
