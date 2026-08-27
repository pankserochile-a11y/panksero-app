# Método Panksero — app

Primer esqueleto funcional de la app del libro. Mismo patrón que "El Secreto
del Pan Gocho": motor genérico + un archivo de datos por capítulo, sin
backend, sin build, para publicar directo en GitHub Pages.

## Archivos

- `index.html` — carga fuentes, estilos y scripts en orden.
- `style.css` — toda la identidad visual (paleta Panksero: naranja de marca,
  tueste oscuro, y un azul frío reservado solo para congelación/frío
  positivo, que se vuelve naranja en el horno — la metáfora del método
  hecha color).
- `app.js` — el motor. No contiene ni un solo dato de panadería. Solo sabe
  leer `window.CAPITULOS` y `window.ROADMAP` y dibujar 4 vistas: inicio,
  módulo, ficha (receta) y problema (síntoma), con rutas tipo
  `#modulo/11`, `#ficha/11/pan-canilla` y `#problema/14/se-abrio`.
- `contenido-capitulo-11.js` — el Capítulo 11 completo (las 8 fichas
  técnicas), tal como está en el libro.
- `contenido-capitulo-14.js` — el Capítulo 14 (Errores de producción),
  indexado por síntoma en vez de por índice — el buscador del inicio
  encuentra un problema aunque no se use la palabra exacta de la tabla
  (usa una lista de `keywords` por problema).
- `contenido-roadmap.js` — lista de los capítulos que faltan por migrar,
  para que se vean "próximamente" en el inicio.

## Cómo agregar el Capítulo 4, 5, 6... (o cualquier otro)

1. Crear `contenido-capitulo-4.js` con la misma forma que
   `contenido-capitulo-11.js`: `window.CAPITULOS[4] = { numero, titulo,
   subtitulo, recetas: [...] }`. Si el capítulo no tiene "recetas" sino
   texto corrido (como el Capítulo 4, que es teoría), se puede adaptar el
   motor más adelante para un tipo de vista "artículo" — de momento el
   motor solo sabe dibujar fichas tipo receta.
2. Agregar `<script src="contenido-capitulo-4.js?v=1"></script>` en
   `index.html`, antes de `app.js`.
3. Quitarlo de la lista en `contenido-roadmap.js`.

No hay que tocar `app.js` para nada de esto.

## Publicar en GitHub Pages

1. Subir esta carpeta a un repositorio de GitHub.
2. Activar GitHub Pages apuntando a la rama principal (Settings → Pages).
3. Cada vez que se actualice un archivo, subir el cambio y aumentar el
   número de `?v=` en el `<script>` correspondiente en `index.html`
   (cache-busting manual, igual que en el modelo de referencia).

## Qué falta (siguiente iteración)

- Vista "artículo" para capítulos de puro texto (4, 5, 6, 13, 15, etc.).
- Calculadora de costo embebida (conectar con la lógica de PankseroPoS).
- Campo "Dificultad" en cada ficha del Capítulo 11 — hoy aparece como
  pendiente porque es una calificación subjetiva que falta confirmar.
- El buscador por síntoma ya está funcionando (Capítulo 14); se puede
  ampliar agregando más `keywords` a medida que se note cómo pregunta la
  gente en la práctica.
