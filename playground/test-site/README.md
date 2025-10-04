# Playground de prueba

Página estática para validar la extensión Show Password Toggle sin depender de sitios externos.

## Uso

1. Ejecuta `npm run build` para generar `dist/` con los scripts.
2. Carga la extensión en modo desarrollador desde `dist/` (Chrome/Edge: `chrome://extensions`, Firefox: `about:debugging`).
3. Abre `playground/test-site/index.html` en el navegador (puedes usar `file://` o servirlo con `npx http-server playground/test-site`).
4. Revisa los tres bloques:
   - **Formulario sin toggle**: la extensión debe añadir su icono.
   - **Formulario con toggle nativo**: no debe duplicarse el control.
   - **Campos dinámicos**: usa los botones para crear inputs durante la sesión y confirmar que el `MutationObserver` funciona.

## Notas

- El CSS inline simula estilos comunes de formularios.
- El segundo ejemplo usa un botón con texto/`aria-label` que contiene la palabra “Mostrar”, útil para comprobar las heurísticas de detección.
- Puedes modificar el HTML para añadir casos límite (inputs deshabilitados, formularios embebidos, etc.).
