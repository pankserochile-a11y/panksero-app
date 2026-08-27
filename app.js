/**
 * MOTOR — Método Panksero
 *
 * Este archivo no sabe nada de panes, fórmulas ni congelación.
 * Solo sabe leer window.CAPITULOS (llenado por los archivos
 * contenido-capitulo-N.js) y window.ROADMAP, y dibujar 3 vistas:
 * inicio, módulo y ficha. Agregar un capítulo nuevo nunca requiere
 * tocar este archivo.
 */
(function () {
  "use strict";

  var appEl = document.getElementById("app");
  var backBtn = document.getElementById("backBtn");

  function esc(str) {
    return String(str == null ? "" : str).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function getCapitulos() {
    return window.CAPITULOS || {};
  }

  function getRoadmap() {
    return window.ROADMAP || [];
  }

  function showBack(visible) {
    backBtn.hidden = !visible;
  }

  function attachRoutes(root) {
    root.querySelectorAll("[data-route]").forEach(function (el) {
      el.addEventListener("click", function () {
        location.hash = "#" + el.getAttribute("data-route");
      });
    });
  }

  /* ---------------- Vista: Inicio ---------------- */

  function renderInicio() {
    var capitulos = getCapitulos();
    var ids = Object.keys(capitulos).sort(function (a, b) { return +a - +b; });

    var cardsHtml = ids.map(function (id) {
      var c = capitulos[id];
      var count = ((c.recetas && c.recetas.length) || (c.problemas && c.problemas.length) || 0);
      var etiqueta = c.recetas ? " fichas disponibles" : " problemas indexados";
      return (
        '<button class="module-card" data-route="modulo/' + esc(id) + '">' +
          '<span class="module-num">Capítulo ' + esc(c.numero) + '</span>' +
          '<span class="module-title">' + esc(c.titulo) + "</span>" +
          '<span class="module-sub">' + esc(c.subtitulo || "") + "</span>" +
          (count ? '<span class="module-sub">' + count + etiqueta + "</span>" : "") +
        "</button>"
      );
    }).join("");

    var lockedHtml = getRoadmap().map(function (r) {
      return (
        '<button class="module-card" disabled aria-disabled="true">' +
          '<span class="module-num">Capítulo ' + esc(r.numero) + '</span>' +
          '<span class="module-title">' + esc(r.titulo) + "</span>" +
          '<span class="lock-tag">Próximamente</span>' +
        "</button>"
      );
    }).join("");

    appEl.innerHTML =
      '<section class="hero">' +
        '<span class="eyebrow">Sistema de producción</span>' +
        "<h1>Método <em>Panksero</em></h1>" +
        '<p class="lead">Cómo producir hoy lo que vas a vender mañana.</p>' +
        '<div class="search-row">' +
          '<input type="search" id="buscador" placeholder="Buscar un pan, o describe qué pasó (ej. &quot;no creció&quot;)" aria-label="Buscar receta o problema">' +
        "</div>" +
      "</section>" +
      '<div id="resultadosBuscador"></div>' +
      '<p class="section-label">Capítulos disponibles</p>' +
      '<div class="shelf">' + (cardsHtml || '<p class="empty-state">Todavía no hay capítulos cargados.</p>') + "</div>" +
      '<p class="section-label">En construcción</p>' +
      '<div class="shelf">' + lockedHtml + "</div>" +
      '<footer class="credito">Método Panksero — libro digital interno</footer>';

    attachRoutes(appEl);

    var buscador = document.getElementById("buscador");
    buscador.addEventListener("input", function () {
      renderBusqueda(buscador.value.trim().toLowerCase());
    });
  }

  function renderBusqueda(term) {
    var contenedor = document.getElementById("resultadosBuscador");
    if (!term) {
      contenedor.innerHTML = "";
      return;
    }
    var capitulos = getCapitulos();
    var recetaHits = [];
    var problemaHits = [];

    Object.keys(capitulos).forEach(function (id) {
      var c = capitulos[id];
      (c.recetas || []).forEach(function (r) {
        if (r.nombre.toLowerCase().indexOf(term) !== -1) {
          recetaHits.push({ capituloId: id, receta: r });
        }
      });
      (c.problemas || []).forEach(function (p) {
        var texto = [p.sintoma].concat(p.keywords || []).join(" | ").toLowerCase();
        if (texto.indexOf(term) !== -1) {
          problemaHits.push({ capituloId: id, problema: p });
        }
      });
    });

    if (!recetaHits.length && !problemaHits.length) {
      contenedor.innerHTML = '<p class="empty-state">Sin resultados para "' + esc(term) + '". Prueba con el nombre de un pan o describe qué pasó (ej. "no creció", "se abrió").</p>';
      return;
    }

    var html = "";

    if (problemaHits.length) {
      html +=
        '<p class="section-label">¿Esto es lo que te está pasando?</p>' +
        '<div class="recipe-grid">' +
        problemaHits.map(function (h) {
          return (
            '<button class="recipe-card" data-route="problema/' + esc(h.capituloId) + "/" + esc(h.problema.id) + '">' +
              '<span class="recipe-num">⚑</span>' +
              '<span><span class="recipe-name">"' + esc(h.problema.sintoma) + '"</span><br>' +
              '<span class="recipe-rol">' + esc(h.problema.categoria) + "</span></span>" +
            "</button>"
          );
        }).join("") +
        "</div>";
    }

    if (recetaHits.length) {
      html +=
        '<p class="section-label">Recetas</p>' +
        '<div class="recipe-grid">' +
        recetaHits.map(function (h) {
          return (
            '<button class="recipe-card" data-route="ficha/' + esc(h.capituloId) + "/" + esc(h.receta.id) + '">' +
              '<span class="recipe-num">→</span>' +
              '<span><span class="recipe-name">' + esc(h.receta.nombre) + '</span><br>' +
              '<span class="recipe-rol">' + esc(h.receta.rol || "") + "</span></span>" +
            "</button>"
          );
        }).join("") +
        "</div>";
    }

    contenedor.innerHTML = html;
    attachRoutes(contenedor);
  }

  /* ---------------- Vista: Módulo ---------------- */

  function renderModulo(id) {
    var c = getCapitulos()[id];
    if (!c) { renderNoEncontrado(); return; }

    var items;
    if (c.recetas) {
      items = c.recetas.map(function (r, i) {
        return (
          '<button class="recipe-card" data-route="ficha/' + esc(id) + "/" + esc(r.id) + '">' +
            '<span class="recipe-num">' + (i + 1) + "</span>" +
            '<span><span class="recipe-name">' + esc(r.nombre) + '</span><br>' +
            '<span class="recipe-rol">' + esc(r.rol || "") + "</span></span>" +
          "</button>"
        );
      }).join("");
    } else if (c.problemas) {
      items = c.problemas.map(function (p) {
        return (
          '<button class="recipe-card" data-route="problema/' + esc(id) + "/" + esc(p.id) + '">' +
            '<span class="recipe-num">⚑</span>' +
            '<span><span class="recipe-name">"' + esc(p.sintoma) + '"</span><br>' +
            '<span class="recipe-rol">' + esc(p.categoria) + "</span></span>" +
          "</button>"
        );
      }).join("");
    } else {
      items = '<p class="empty-state">Este capítulo todavía no tiene contenido cargado.</p>';
    }

    appEl.innerHTML =
      '<div class="modulo-header">' +
        '<span class="eyebrow">Capítulo ' + esc(c.numero) + '</span>' +
        "<h1>" + esc(c.titulo) + "</h1>" +
        "<p>" + esc(c.subtitulo || "") + "</p>" +
        (c.nota ? '<p class="identidad" style="margin-top:0.8rem;font-size:0.85rem;">' + esc(c.nota) + "</p>" : "") +
      "</div>" +
      '<div class="recipe-grid">' + items + "</div>";

    attachRoutes(appEl);
    showBack(true);
  }

  /* ---------------- Vista: Ficha ---------------- */

  function dato(label, value) {
    var isPending = !value;
    return (
      '<div class="dato"><span class="k">' + esc(label) + '</span>' +
      '<span class="v' + (isPending ? " pendiente" : "") + '">' +
      esc(value || "Sin calificar") + "</span></div>"
    );
  }

  function ribbonStop(label, value, color) {
    return (
      '<div class="stop" style="--stop-color:' + color + '">' +
        '<span class="dot"></span>' +
        '<div class="lbl">' + esc(label) + "</div>" +
        '<div class="val">' + esc(value || "—") + "</div>" +
      "</div>"
    );
  }

  function renderFormula(formula) {
    if (!formula || !formula.length) return "";
    var tieneNota = formula.some(function (f) { return f.nota; });
    var tienePct = formula.some(function (f) { return f.porcentaje; });
    return (
      '<h2>Fórmula panadera</h2>' +
      '<table class="formula"><thead><tr>' +
      "<th>Ingrediente</th>" +
      (tienePct ? "<th>%</th>" : "") +
      "<th>Peso</th>" +
      (tieneNota ? "<th>Parte</th>" : "") +
      "</tr></thead><tbody>" +
      formula.map(function (f) {
        return (
          "<tr><td>" + esc(f.ingrediente) + "</td>" +
          (tienePct ? "<td>" + esc(f.porcentaje || "—") + "</td>" : "") +
          "<td>" + esc(f.peso) + "</td>" +
          (tieneNota ? "<td>" + esc(f.nota || "—") + "</td>" : "") +
          "</tr>"
        );
      }).join("") +
      "</tbody></table>"
    );
  }

  function renderFicha(capituloId, recetaId) {
    var c = getCapitulos()[capituloId];
    var r = c && (c.recetas || []).find(function (x) { return x.id === recetaId; });
    if (!r) { renderNoEncontrado(); return; }

    var dr = r.datosRapidos || {};
    var t = r.tiempos || {};

    appEl.innerHTML =
      '<div class="ficha-header">' +
        '<span class="eyebrow">' + esc(c.titulo) + " · " + esc(r.rol || "") + '</span>' +
        "<h1>" + esc(r.nombre) + "</h1>" +
        (r.identidad ? '<p class="identidad">' + esc(r.identidad) + "</p>" : "") +
        (r.rendimiento ? '<p class="identidad"><strong>Rendimiento:</strong> ' + esc(r.rendimiento) + "</p>" : "") +
      "</div>" +

      '<div class="datos-rapidos">' +
        dato("Peso x unidad", dr.pesoUnidad) +
        dato("Proceso", dr.proceso) +
        dato("Hidratación", dr.hidratacion) +
        dato("Grasa", dr.grasa) +
        dato("Dificultad", dr.dificultad) +
      "</div>" +

      '<div class="linea-horneado">' +
        "<h2>Línea de horneado</h2>" +
        '<div class="ribbon">' +
          ribbonStop("Congelación", t.congelacion, "var(--hielo)") +
          ribbonStop("Frío / Fermentación", t.frioPositivo, "var(--hielo)") +
          ribbonStop("Horneado", t.horneado, "var(--brasa)") +
        "</div>" +
      "</div>" +

      '<div class="ficha-body">' +
        renderFormula(r.formula) +
        (r.produccion ? "<h2>Producción</h2><p>" + esc(r.produccion) + "</p>" : "") +
        (r.congelacion ? "<h2>Congelación</h2><p>" + esc(r.congelacion) + "</p>" : "") +
        (r.frioPositivo ? "<h2>Frío positivo</h2><p>" + esc(r.frioPositivo) + "</p>" : "") +
        (r.fermentacion ? "<h2>Fermentación</h2><p>" + esc(r.fermentacion) + "</p>" : "") +
        (r.horneado ? "<h2>Horneado</h2><p>" + esc(r.horneado) + "</p>" : "") +
        (r.vidaUtil ? "<h2>Vida útil (congelado)</h2><p>" + esc(r.vidaUtil) + "</p>" : "") +
        (r.presentacion ? "<h2>Presentación de venta</h2><p>" + esc(r.presentacion) + "</p>" : "") +
        (r.notaExtra ? '<div class="nota">' + esc(r.notaExtra) + "</div>" : "") +
      "</div>";

    attachRoutes(appEl);
    showBack(true);
  }

  function renderProblema(capituloId, problemaId) {
    var c = getCapitulos()[capituloId];
    var p = c && (c.problemas || []).find(function (x) { return x.id === problemaId; });
    if (!p) { renderNoEncontrado(); return; }

    appEl.innerHTML =
      '<div class="ficha-header">' +
        '<span class="eyebrow">' + esc(c.titulo) + '</span>' +
        '<h1>"' + esc(p.sintoma) + '"</h1>' +
        '<span class="badge-venta">' + esc(p.categoria) + "</span>" +
      "</div>" +
      '<div class="ficha-body">' +
        "<h2>Posibles causas</h2>" +
        "<ul>" + (p.causas || []).map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul>" +
        "<h2>Qué revisar</h2><p>" + esc(p.revisar) + "</p>" +
        (c.nota ? '<div class="nota">' + esc(c.nota) + "</div>" : "") +
      "</div>";

    attachRoutes(appEl);
    showBack(true);
  }

  function renderNoEncontrado() {
    appEl.innerHTML = '<p class="empty-state">No encontramos esa página. <button data-route="" class="back-btn" style="display:inline">Volver al inicio</button></p>';
    attachRoutes(appEl);
    showBack(true);
  }

  /* ---------------- Ruteo ---------------- */

  function route() {
    var hash = location.hash.replace(/^#/, "");
    if (!hash) { renderInicio(); showBack(false); return; }
    var parts = hash.split("/");
    if (parts[0] === "modulo" && parts[1]) { renderModulo(parts[1]); return; }
    if (parts[0] === "ficha" && parts[1] && parts[2]) { renderFicha(parts[1], parts[2]); return; }
    if (parts[0] === "problema" && parts[1] && parts[2]) { renderProblema(parts[1], parts[2]); return; }
    renderInicio();
    showBack(false);
  }

  backBtn.addEventListener("click", function () { history.back(); });
  window.addEventListener("hashchange", route);
  route();
})();
