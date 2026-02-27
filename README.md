# Parcial1Progra
# Sistema de Registro de Quejas Ciudadanas - Mario Antonio Salamanca Romero (SMSS085424)

## Descripción del Proyecto
Aplicación web para el registro de quejas ciudadanas dirigidas a la municipalidad. Permite a los ciudadanos reportar problemas en su comunidad (baches, alumbrado, basura, parques, seguridad) y visualizar los reportes realizados sin necesidad de recargar la página.

**Sector:** Gobierno municipal / Comunidad en general

---

## Preguntas del Parcial

### ¿Qué valor agregado tiene el uso de webcomponents a su proyecto?
Los WebComponents (`<queja-card>`) aportan:
- **Reutilización**: El mismo componente se usa para cada queja
- **Encapsulación**: Cada tarjeta tiene su propio estilo sin afectar al resto
- **Mantenibilidad**: Si quiero cambiar el diseño de las tarjetas, solo modifico la clase QuejaCard
- **Código limpio**: Separa la lógica de presentación de cada queja

### ¿De qué forma manipularon los datos sin recargar la página?
Utilizamos:
1. localStorage para guardar las quejas en el navegador
2. Manipulación del DOM con createElement() y appendChild()
3. e.preventDefault() en el evento submit del formulario
4. Actualización dinámica del contenedor de quejas

### ¿De qué forma validaron las entradas de datos? Expliquen brevemente
Implementamos validaciones simples:
- **Nombre**: Mínimo 3 caracteres
- **Tipo de queja**: No puede estar vacío
- **Ubicación**: Mínimo 5 caracteres
- **Descripción**: Mínimo 10 caracteres

Las validaciones ocurren al enviar el formulario y los errores se muestran en rojo debajo de cada campo.

### ¿Cómo manejaría la escalabilidad futura en su página?
Para escalar en el futuro:
1. **Base de datos real** (MySQL, MongoDB) en lugar de localStorage
2. **Backend con API REST** para manejar las quejas
3. **Autenticación de usuarios** para seguimiento de quejas
4. **Paginación** cuando hayan muchas quejas
5. **Filtros** por tipo de queja o fecha
6. **Estadísticas** visuales de quejas por categoría

---

## Tecnologías Utilizadas
- HTML5
- CSS3 (diseño simple con grid)
- JavaScript (ES6+)
- WebComponents
- LocalStorage API
