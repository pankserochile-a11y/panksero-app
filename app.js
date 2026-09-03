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

  function getHerramientas() {
    return window.HERRAMIENTAS || {};
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

    function tarjetaCapitulo(id) {
      var c = capitulos[id];
      var ruta = c.tipo === "articulo" ? "articulo/" + esc(id) : "modulo/" + esc(id);
      var count = ((c.recetas && c.recetas.length) || (c.problemas && c.problemas.length) || 0);
      var etiqueta = c.recetas ? " fichas disponibles" : " problemas indexados";
      var rotulo = c.eyebrow || ("Capítulo " + c.numero);
      var esPago = !esGratis(c.nivel);
      return (
        '<button class="module-card" data-route="' + ruta + '">' +
          (esPago ? '<span class="lock-tag lock-tag-pago">🔒 Pago</span>' : "") +
          '<span class="module-num">' + esc(rotulo) + '</span>' +
          '<span class="module-title">' + esc(c.titulo) + "</span>" +
          '<span class="module-sub">' + esc(c.subtitulo || "") + "</span>" +
          (count ? '<span class="module-sub">' + count + etiqueta + "</span>" : "") +
        "</button>"
      );
    }

    // Capítulos 1-5 (prólogo + frío/congelación) van antes de la banda "Frío positivo";
    // el resto va después. Si alguno de los dos grupos queda vacío, se muestra
    // todo en un único estante sin banda de por medio.
    var idsFrio = ids.filter(function (id) { return +id <= 5; });
    var idsCalor = ids.filter(function (id) { return +id > 5; });
    var cardsFrioHtml = idsFrio.map(tarjetaCapitulo).join("");
    var cardsCalorHtml = idsCalor.map(tarjetaCapitulo).join("");
    var cardsHtml = ids.map(tarjetaCapitulo).join("");

    var bandaFrio =
      '<div class="foto-banda foto-banda-frio">' +
        '<span class="foto-banda-eyebrow">Frío positivo</span>' +
        '<p class="foto-banda-quote">Uno de los capítulos centrales del método.</p>' +
      "</div>";

    var bandaHorno =
      '<div class="foto-banda foto-banda-horno">' +
        '<span class="foto-banda-eyebrow">La masa manda</span>' +
        '<p class="foto-banda-quote">El reloj es una herramienta, no la autoridad final.</p>' +
      "</div>";

    var seccionCapitulosHtml;
    if (cardsFrioHtml && cardsCalorHtml) {
      seccionCapitulosHtml =
        '<p class="section-label">Capítulos disponibles</p>' +
        '<div class="shelf">' + cardsFrioHtml + "</div>" +
        bandaFrio +
        '<div class="shelf">' + cardsCalorHtml + "</div>";
    } else {
      seccionCapitulosHtml =
        '<p class="section-label">Capítulos disponibles</p>' +
        '<div class="shelf">' + (cardsHtml || '<p class="empty-state">Todavía no hay capítulos cargados.</p>') + "</div>";
    }

    var lockedHtml = getRoadmap().map(function (r) {
      return (
        '<button class="module-card" disabled aria-disabled="true">' +
          '<span class="module-num">Capítulo ' + esc(r.numero) + '</span>' +
          '<span class="module-title">' + esc(r.titulo) + "</span>" +
          '<span class="lock-tag">Próximamente</span>' +
        "</button>"
      );
    }).join("");

    var herramientas = getHerramientas();
    var herramientasHtml = Object.keys(herramientas).map(function (hid) {
      var h = herramientas[hid];
      return (
        '<button class="module-card" data-route="herramienta/' + esc(hid) + '">' +
          '<span class="lock-tag lock-tag-pago">🔒 Pago</span>' +
          '<span class="module-num">' + esc(h.eyebrow || "Herramienta") + '</span>' +
          '<span class="module-title">' + esc(h.titulo) + "</span>" +
          '<span class="module-sub">' + esc(h.subtitulo || "") + "</span>" +
        "</button>"
      );
    }).join("") || '<p class="empty-state">Todavía no hay herramientas cargadas.</p>';

    appEl.innerHTML =
      '<section class="hero">' +
        '<img src="logo-panksero.webp" class="hero-logo" alt="Panksero — Sabor de casa">' +
        '<span class="eyebrow">Sistema de producción</span>' +
        "<h1>Método <em>Panksero</em></h1>" +
        '<p class="lead">Cómo producir hoy lo que vas a vender mañana.</p>' +
        '<div class="search-row">' +
          '<input type="search" id="buscador" placeholder="Buscar un pan, o describe qué pasó (ej. &quot;no creció&quot;)" aria-label="Buscar receta o problema">' +
        "</div>" +
        '<button class="oferta-cta" data-route="oferta">Ver planes y precios →</button>' +
      "</section>" +
      '<div id="resultadosBuscador"></div>' +
      seccionCapitulosHtml +
      '<p class="section-label">Herramientas</p>' +
      '<div class="shelf">' + herramientasHtml + "</div>" +
      bandaHorno +
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

  function ribbonStop(label, value, color, route) {
    var lbl = route
      ? '<button class="lbl lbl-link" data-route="' + esc(route) + '">' + esc(label) + " ↗</button>"
      : '<div class="lbl">' + esc(label) + "</div>";
    return (
      '<div class="stop" style="--stop-color:' + color + '">' +
        '<span class="dot"></span>' +
        lbl +
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

  function renderProceso(pasos) {
    if (!pasos || !pasos.length) return "";
    return (
      "<h2>Proceso</h2>" +
      '<ol class="proceso-list">' +
      pasos.map(function (p) {
        return "<li><strong>" + esc(p.titulo) + "</strong> — " + esc(p.detalle) + "</li>";
      }).join("") +
      "</ol>"
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
          ribbonStop("Congelación", t.congelacion, "var(--escarcha)") +
          ribbonStop("Frío / Fermentación", t.frioPositivo, "var(--escarcha)", getCapitulos()[5] ? "articulo/5" : null) +
          ribbonStop("Horneado", t.horneado, "var(--brasa)") +
        "</div>" +
      "</div>" +

      '<div class="ficha-body">' +
        renderFormula(r.formula) +
        (r.proceso ? renderProceso(r.proceso) : (r.produccion ? "<h2>Producción</h2><p>" + esc(r.produccion) + "</p>" : "")) +
        (!r.proceso && r.congelacion ? "<h2>Congelación</h2><p>" + esc(r.congelacion) + "</p>" : "") +
        (!r.proceso && r.frioPositivo ? "<h2>Frío positivo</h2><p>" + esc(r.frioPositivo) + "</p>" : "") +
        (!r.proceso && r.fermentacion ? "<h2>Fermentación</h2><p>" + esc(r.fermentacion) + "</p>" : "") +
        (!r.proceso && r.horneado ? "<h2>Horneado</h2><p>" + esc(r.horneado) + "</p>" : "") +
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

  function refLink(numeroCapitulo) {
    var existe = !!getCapitulos()[numeroCapitulo];
    if (existe) {
      var destino = getCapitulos()[numeroCapitulo];
      var ruta = destino.tipo === "articulo" ? "articulo/" + numeroCapitulo : "modulo/" + numeroCapitulo;
      return '<button class="ref-link" data-route="' + esc(ruta) + '">Ver Capítulo ' + esc(numeroCapitulo) + ": " + esc(destino.titulo) + "</button>";
    }
    return '<span class="ref-link ref-pendiente">Capítulo ' + esc(numeroCapitulo) + " — próximamente</span>";
  }

  function renderTabla(t) {
    if (!t || !t.filas) return "";
    var thead = t.headers ? "<thead><tr>" + t.headers.map(function (h) { return "<th>" + esc(h) + "</th>"; }).join("") + "</tr></thead>" : "";
    var tbody = "<tbody>" + t.filas.map(function (fila) {
      return "<tr>" + fila.map(function (c) { return "<td>" + esc(c) + "</td>"; }).join("") + "</tr>";
    }).join("") + "</tbody>";
    return '<table class="formula articulo-tabla">' + thead + tbody + "</table>";
  }

  function renderArticulo(id) {
    var c = getCapitulos()[id];
    if (!c) { renderNoEncontrado(); return; }

    var indice = (c.secciones || []).map(function (s, i) {
      return '<li><a href="#sec-' + i + '" class="toc-link">' + esc(s.titulo) + "</a></li>";
    }).join("");

    var cuerpo = (c.secciones || []).map(function (s, i) {
      var parrafos = (s.parrafos || []).map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("");
      var lista = s.lista ? "<ul>" + s.lista.map(function (li) { return "<li>" + esc(li) + "</li>"; }).join("") + "</ul>" : "";
      var tabla = renderTabla(s.tabla);
      var refs = (s.referencias || []).map(refLink).join("");
      return (
        '<section id="sec-' + i + '">' +
          "<h2>" + esc(s.titulo) + "</h2>" +
          parrafos + lista + tabla +
          (refs ? '<div class="refs">' + refs + "</div>" : "") +
        "</section>"
      );
    }).join("");

    appEl.innerHTML =
      '<div class="ficha-header">' +
        '<span class="eyebrow">' + esc(c.eyebrow || ("Capítulo " + c.numero)) + '</span>' +
        "<h1>" + esc(c.titulo) + "</h1>" +
        (c.intro ? '<p class="identidad">' + esc(c.intro) + "</p>" : "") +
      "</div>" +
      (indice ? '<nav class="toc"><ul>' + indice + "</ul></nav>" : "") +
      '<div class="ficha-body articulo-body">' + cuerpo + "</div>";

    attachRoutes(appEl);
    document.querySelectorAll(".toc-link").forEach(function (a) {
      a.addEventListener("click", function (e) {
        e.preventDefault();
        var target = document.querySelector(a.getAttribute("href"));
        if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
    showBack(true);
  }

  function renderHerramienta(id) {
    var h = getHerramientas()[id];
    if (!h || typeof h.render !== "function") { renderNoEncontrado(); return; }

    appEl.innerHTML =
      '<div class="ficha-header">' +
        '<span class="eyebrow">' + esc(h.eyebrow || "Herramienta") + '</span>' +
        "<h1>" + esc(h.titulo) + "</h1>" +
        (h.subtitulo ? '<p class="identidad">' + esc(h.subtitulo) + "</p>" : "") +
      "</div>" +
      '<div id="herramienta-container"></div>';

    showBack(true);
    h.render(document.getElementById("herramienta-container"));
  }

  function fmtCLP(n) {
    return "$" + n.toLocaleString("es-CL");
  }

  function renderOferta() {
    var cfg = window.PRECIOS;
    if (!cfg) { renderNoEncontrado(); return; }

    var cardsHtml = cfg.niveles.map(function (nivel) {
      var itemsHtml = nivel.incluye.map(function (i) { return "<li>" + esc(i) + "</li>"; }).join("");
      return (
        '<div class="oferta-card' + (nivel.destacado ? " oferta-card-destacada" : "") + '">' +
          (nivel.destacado ? '<span class="oferta-badge">Más elegido</span>' : "") +
          '<h3 class="oferta-nombre">' + esc(nivel.nombre) + "</h3>" +
          '<div class="oferta-precio"><span class="oferta-tipo">' + esc(nivel.tipo) + '</span><span class="oferta-monto mono">' + fmtCLP(nivel.precio) + " " + esc(cfg.moneda) + "</span></div>" +
          '<ul class="oferta-incluye">' + itemsHtml + "</ul>" +
        "</div>"
      );
    }).join("");

    appEl.innerHTML =
      '<div class="ficha-header">' +
        '<span class="eyebrow">Método Panksero</span>' +
        "<h1>Elegí tu nivel</h1>" +
        '<p class="identidad">Tres formas de acceder al sistema completo, según cuánto acompañamiento necesitás.</p>' +
      "</div>" +
      '<div class="oferta-grid">' + cardsHtml + "</div>" +
      '<p class="oferta-nota">Precios en pesos chilenos. El acceso se entrega automáticamente después de la compra.</p>';

    attachRoutes(appEl);
    showBack(true);
  }

  function renderNoEncontrado() {
    appEl.innerHTML = '<p class="empty-state">No encontramos esa página. <button data-route="" class="back-btn" style="display:inline">Volver al inicio</button></p>';
    attachRoutes(appEl);
    showBack(true);
  }

  /* ---------------- Acceso (contenido pago) ---------------- */

  function tieneAcceso() {
    try {
      return localStorage.getItem(window.CONFIG_ACCESO.STORAGE_KEY) === "1";
    } catch (e) { return false; }
  }

  function guardarAcceso() {
    try { localStorage.setItem(window.CONFIG_ACCESO.STORAGE_KEY, "1"); } catch (e) {}
  }

  function esGratis(nivel) { return nivel === "gratis"; }

  function renderMuro(rutaIntentada) {
    appEl.innerHTML =
      '<div class="ficha-header">' +
        '<span class="eyebrow">Contenido exclusivo</span>' +
        "<h1>Necesitás tu código de acceso</h1>" +
        '<p class="identidad">Esta parte del Método Panksero es de pago. Si ya compraste, ingresá el código que te llegó por email. Si todavía no, podés verlo en <a href="#oferta" class="muro-link" data-route="oferta">planes y precios</a>.</p>' +
      "</div>" +
      '<div class="muro-form">' +
        '<input type="text" id="muro-codigo" class="calc-input" placeholder="Tu código de acceso" autocomplete="off">' +
        '<button type="button" id="muro-btn" class="oferta-cta">Desbloquear</button>' +
        '<p id="muro-error" class="muro-error" hidden>Ese código no es válido. Revisá mayúsculas/espacios, o escribinos si el problema sigue.</p>' +
      "</div>";

    attachRoutes(appEl);
    showBack(true);

    var input = document.getElementById("muro-codigo");
    var btn = document.getElementById("muro-btn");
    var errorEl = document.getElementById("muro-error");

    function intentar() {
      var codigo = input.value.trim();
      if (!codigo) return;
      btn.disabled = true;
      btn.textContent = "Verificando…";
      verificarCodigo(codigo).then(function (valido) {
        btn.disabled = false;
        btn.textContent = "Desbloquear";
        if (valido) {
          guardarAcceso();
          location.hash = rutaIntentada;
          route();
        } else {
          errorEl.hidden = false;
        }
      });
    }

    btn.addEventListener("click", intentar);
    input.addEventListener("keydown", function (e) { if (e.key === "Enter") intentar(); });
  }

  function verificarCodigo(codigo) {
    var base = window.CONFIG_ACCESO.FUNCTIONS_BASE_URL;
    if (!base) {
      console.warn("CONFIG_ACCESO.FUNCTIONS_BASE_URL no está configurado todavía.");
      return Promise.resolve(false);
    }
    return fetch(base + "/.netlify/functions/verificar-codigo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ codigo: codigo })
    })
      .then(function (res) { return res.ok ? res.json() : { valido: false }; })
      .then(function (data) { return !!data.valido; })
      .catch(function () { return false; });
  }

  /* ---------------- Ruteo ---------------- */

  function route() {
    var hash = location.hash.replace(/^#/, "");
    if (!hash) { renderInicio(); showBack(false); return; }
    var parts = hash.split("/");

    // Chequeo de acceso: todo lo que no sea explícitamente "gratis" queda
    // detrás del muro, salvo el inicio y la oferta (siempre públicos).
    if (parts[0] !== "oferta" && !tieneAcceso()) {
      var capId = (parts[0] === "modulo" || parts[0] === "articulo") ? parts[1]
        : (parts[0] === "ficha" || parts[0] === "problema") ? parts[1]
        : null;
      var esHerramienta = parts[0] === "herramienta";
      var capitulo = capId != null ? getCapitulos()[capId] : null;
      var requiereAcceso = esHerramienta || (capitulo && !esGratis(capitulo.nivel));
      if (requiereAcceso) { renderMuro(hash); return; }
    }

    if (parts[0] === "modulo" && parts[1]) { renderModulo(parts[1]); return; }
    if (parts[0] === "ficha" && parts[1] && parts[2]) { renderFicha(parts[1], parts[2]); return; }
    if (parts[0] === "problema" && parts[1] && parts[2]) { renderProblema(parts[1], parts[2]); return; }
    if (parts[0] === "articulo" && parts[1]) { renderArticulo(parts[1]); return; }
    if (parts[0] === "herramienta" && parts[1]) { renderHerramienta(parts[1]); return; }
    if (parts[0] === "oferta") { renderOferta(); return; }
    renderInicio();
    showBack(false);
  }

  backBtn.addEventListener("click", function () { history.back(); });
  window.addEventListener("hashchange", route);
  route();
})();
