# Método Panksero — app

Primer esqueleto funcional de la app del libro. Mismo patrón que "El Secreto
del Pan Gocho": motor genérico + un archivo de datos por capítulo, sin
backend, sin build, para publicar directo en GitHub Pages.

## Estado

El libro completo está migrado: Prólogo + 17 capítulos + Bonos, todo dentro de
la app. El roadmap (`contenido-roadmap.js`) quedó vacío — no hay nada más
pendiente de migrar del libro actual. Si se agrega un capítulo nuevo al
libro más adelante, ahí es donde vuelve a aparecer como "próximamente"
hasta que se migre.

## Sistema de acceso (contenido pago)

- La app en sí sigue en GitHub Pages, sin cambios de hosting.
- Solo las dos funciones que necesitan servidor viven en un proyecto
  aparte de Netlify (`netlify/functions/`): reciben el webhook de
  Hotmart y verifican códigos. La app les pega por `fetch`.
- Gratis: Prólogo, Capítulo 1, Capítulo 16 (marcados `nivel: "gratis"`
  en su archivo `contenido-*.js`). Todo lo demás — capítulos 2 a 15 y
  17, Bonos, y las herramientas — pide código.
- MVP: un solo código desbloquea todo el contenido pago, sin
  diferenciar niveles de precio. Si más adelante hace falta separar
  por nivel, se agrega un campo `nivel` a cada capítulo (igual que
  `gratis`) y se ajusta el chequeo en `route()`.

### Cómo desplegar el backend (una sola vez)

1. Crear un sitio nuevo en Netlify a partir de esta misma carpeta
   (puede ser un repo aparte solo con `netlify.toml` y
   `netlify/functions/` — no hace falta que sirva la app).
2. En Netlify → Site settings → Environment variables, cargar:
   - `HOTMART_HOTTOK` — el token que Hotmart muestra al crear el webhook.
   - `RESEND_API_KEY` — API key de [resend.com](https://resend.com) (u otro proveedor de email; hay que adaptar `hotmart-webhook.js` si se usa otro).
   - `RESEND_FROM` — remitente verificado, ej. `"Panksero <acceso@tudominio.cl>"`.
   - `SITE_URL` — la URL pública de la app (la de GitHub Pages).
3. En Hotmart, por cada producto: Herramientas → Webhook (Postback) →
   pegar `https://TU-SITIO.netlify.app/.netlify/functions/hotmart-webhook`,
   evento "Compra aprovada/aprobada".
4. En `config-acceso.js` de la app, completar `FUNCTIONS_BASE_URL` con
   la URL del sitio de Netlify, y volver a subir ese archivo a GitHub Pages.
5. Probar con el botón de test de webhook de Hotmart, y revisar los
   logs de la función en Netlify (Functions → hotmart-webhook → logs).

## Archivos

- `index.html` — carga fuentes, estilos y scripts en orden.
- `style.css` — toda la identidad visual (paleta Panksero: naranja de marca,
  tueste oscuro, y un azul frío reservado solo para congelación/frío
  positivo, que se vuelve naranja en el horno — la metáfora del método
  hecha color).
- `app.js` — el motor. No contiene ni un solo dato de panadería. Solo sabe
  leer `window.CAPITULOS`, `window.ROADMAP` y `window.HERRAMIENTAS`, y
  dibujar 6 vistas: inicio, módulo, ficha (receta), problema (síntoma),
  artículo (capítulo de puro texto) y herramienta (calculadora interactiva),
  con rutas tipo `#modulo/11`, `#ficha/11/pan-canilla`,
  `#problema/14/se-abrio`, `#articulo/5` y `#herramienta/calculadora-costos`.
  Las herramientas son distintas al resto: traen su propia lógica de
  cálculo y su propio `render()`, no son solo datos — el motor solo sabe
  que existen y las monta.
- `contenido-capitulo-5.js` — el Capítulo 5 (Frío positivo), primer
  capítulo de tipo "artículo": subtítulos + párrafos, con un índice
  automático y referencias cruzadas a otros capítulos (se muestran como
  link si ya existen, o "próximamente" si no). La parada "Frío /
  Fermentación" de la Línea de horneado en cada ficha del Capítulo 11 ya
  enlaza directo a este capítulo.
- `contenido-capitulo-11.js` — el Capítulo 11 completo (las 4 fichas técnicas,
  una por familia de masa), tal como está en el libro.
- `herramienta-calculadora-costos.js` — Bono 4 hecho herramienta real:
  carga de ingredientes con su costo prorrateado, rendimiento del lote y
  precio de venta → costo por unidad, margen bruto y margen %. Cálculo en
  vivo, sin recargar nada.
- `herramienta-calculadora-recetas.js` — escalado de fórmulas (Capítulo 9):
  carga la fórmula base en gramos, marca qué ingredientes son harina, define
  rendimiento base y deseado → tabla escalada con porcentaje panadero
  (harina = 100%) para verificar la fórmula.
- `contenido-capitulo-14.js` — el Capítulo 14 (Errores de producción),
  indexado por síntoma en vez de por índice — el buscador del inicio
  encuentra un problema aunque no se use la palabra exacta de la tabla
  (usa una lista de `keywords` por problema).
- `contenido-roadmap.js` — lista de los capítulos que faltan por migrar,
  para que se vean "próximamente" en el inicio.
- `herramienta-planificador-semanal.js` — Bono 1 hecho herramienta real:
  planificador semanal de producción por producto (producción, stock
  congelado, enviado a frío positivo, programado, horneado, día por día).
  Se guarda solo en `localStorage` del dispositivo, sin backend. Si un
  producto se vincula a una receta del Capítulo 11 y tiene producción
  cargada, calcula la proyección de ingredientes necesarios para la
  semana. Incluye vista de impresión (`@media print` en `style.css`) para
  imprimir solo la tabla consolidada.

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

- Migrar el resto de los capítulos de puro texto (4, 6, 7, 8, 9, 12, 13, 15,
  16) con el mismo patrón que el Capítulo 5 — ya probado y funcionando.
- Calculadora de costo embebida (conectar con la lógica de PankseroPoS).
- Campo "Dificultad" en cada ficha del Capítulo 11 — hoy aparece como
  pendiente porque es una calificación subjetiva que falta confirmar.
- El buscador por síntoma ya está funcionando (Capítulo 14); se puede
  ampliar agregando más `keywords` a medida que se note cómo pregunta la
  gente en la práctica.
