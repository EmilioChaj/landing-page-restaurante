# Plan: Menú Digital

## Enfoque
Crear una sección de menú visualmente atractiva que muestre los platos del restaurante de forma organizada por categorías.

## Implementación
1. **Menu Component:**
   - Título de sección con decoración dorada
   - Filtro de categorías (Antipasti, Primi, Secondi, Dolci)
   - Grid responsive de platos
   - Cada plato muestra: imagen, nombre, descripción, precio

2. **MenuItem Component:**
   - Card con imagen superior
   - Nombre del plato
   - Descripción breve
   - Precio destacado
   - Badge "Destacado" opcional

3. **Datos:**
   - Archivo JSON en src/data/menu.json
   - Estructura: id, nombre, descripcion, precio, imagen, categoria, destacado
