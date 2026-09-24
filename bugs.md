1. El problema de la duplicación de datos
El problema es que la misma información está escrita en múltiples archivos. Si mañana cambias el teléfono, tendrás que buscar y modificar 3 archivos diferentes:
Dato
Teléfono +34 912 345 678
Email info@corteitaliana.es
Dirección Calle Gran Vía, 42
Horarios
Links redes sociales
La solución sería crear un archivo src/data/restaurant.json con toda esta info y que los 3 componentes importen de ahí. Solo modificas un archivo y se actualiza en todo el sitio.

2. Lo que ya existe
- 8 componentes implementados con CSS Modules: Header, Hero, Menu, Reservations, Gallery, Location, Reviews, Footer
- 3 archivos de datos externos: menu.json (12 platos), reviews.json (6 reseñas), gallery.json (8 fotos)
- Build de producción en dist/
- Documentación en constitution/ y features/
- .gitignore ✓ (ya lo implementaste)

3. Scripts lint / test
- npm run lint: Ejecuta ESLint para detectar errores de código (variables no usadas, imports faltantes, malas prácticas). Sin esto, solo sabes que hay errores cuando algo se rompe.
- npm run test: Ejecuta Vitest para correr tests unitarios de tus componentes. Ej: verificar que el formulario de reservas muestre errores de validación, que el menú filtre correctamente, etc.
Útil para: detectar bugs antes de que lleguen a producción y asegurar que los componentes funcionan correctamente.

4. Directorio src/hooks/
Sería para crear hooks personalizados de React que reutilizan lógica común entre componentes. Ejemplos prácticos para este proyecto:
- useMediaQuery → detectar si es mobile/desktop (actualmente Reviews.jsx hace esto mal con window.innerWidth que no se actualiza al redimensionar)
- useForm → manejar formularios con validación (reutilizar en Reservations y Newsletter del Footer)
- useScrollPosition → detectar scroll para el efecto del Header
Sin este directorio, la lógica común se duplica en cada componente o se implementa de forma incorrecta.
