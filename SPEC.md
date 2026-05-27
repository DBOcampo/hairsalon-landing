# Spec: Landing Demo Peluqueria/Barberia

## Objective
Crear una landing page estatica en espanol para mostrar como podria verse un sitio demo para peluquerias y barberias. Debe servir para vender una propuesta simple: presencia online, servicios visibles, reserva rapida y confianza.

## Tech Stack
HTML, CSS y JavaScript vanilla. Sin backend, sin dependencias y sin build step.

## Commands
Dev: abrir `index.html` en el navegador.

## Project Structure
`index.html` contiene el contenido principal.
`styles.css` contiene el layout responsive y sistema visual.
`script.js` contiene interacciones livianas.
`assets/` contiene imagenes del proyecto.

## Code Style
Usar clases descriptivas y secciones claras:

```html
<section class="services" id="servicios">
  <div class="section-heading">
    <p class="eyebrow">Servicios</p>
    <h2>Cortes, color y grooming sin vueltas</h2>
  </div>
</section>
```

## Testing Strategy
Verificacion manual en navegador y chequeo de estructura de archivos. Probar responsive en 320px, 768px, 1024px y 1440px cuando haya navegador disponible.

## Boundaries
- Always: mantener la demo estatica, responsive y facil de adaptar.
- Ask first: agregar dependencias, backend, integraciones reales de reserva o pagos.
- Never: incluir datos reales de clientes o marcas comerciales sin permiso.

## Success Criteria
- La primera pantalla comunica claramente peluqueria/barberia y muestra CTA de reserva.
- La pagina incluye servicios, beneficios, precios, testimonio, horarios y formulario.
- Funciona sin instalar dependencias.
- Tiene un recurso visual local, no depende de imagenes externas.

## Open Questions
- Nombre/marca final del negocio.
- Colores exactos de marca si el demo se adapta a un cliente real.

