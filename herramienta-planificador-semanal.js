/**
 * HERRAMIENTA — Planificador semanal de producción
 * Método Panksero (Bono 1)
 *
 * A diferencia de las calculadoras, esta herramienta no calcula un
 * resultado — guarda un registro que se usa semana a semana. Por eso
 * el estado se persiste solo en localStorage en cada cambio, y no
 * hay nada que "recalcular": escribir en un campo solo actualiza ese
 * campo y lo guarda, nunca reconstruye el formulario (mismo cuidado
 * de foco que en las calculadoras).
 *
 * Incluye un botón "Imprimir consolidado" — usa la vista de impresión
 * del navegador con una hoja de estilos propia (@media print en
 * style.css) para dejar solo la tabla, sin la interfaz de la app.
 */
window.HERRAMIENTAS = window.HERRAMIENTAS || {};

window.HERRAMIENTAS["planificador-semanal"] = {
  id: "planificador-semanal",
  titulo: "Planificador semanal",
  subtitulo: "Bono 1 — producción, stock, frío positivo y horneado por producto, día a día.",
  eyebrow: "Herramienta",

  render: function (container) {
    var STORAGE_KEY = "panksero_planificador_semanal";
    var DIAS = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];
    var FILAS = [
      { key: "produccion", label: "Producción" },
      { key: "stockCongelado", label: "Stock congelado" },
      { key: "enviadoFrio", label: "Enviado a frío positivo" },
      { key: "programado", label: "Programado" },
      { key: "horneado", label: "Horneado" }
    ];

    function diasVacios() { return ["", "", "", "", "", "", ""]; }
    function productoVacio() {
      var p = { nombre: "", recetaId: "" };
      FILAS.forEach(function (f) { p[f.key] = diasVacios(); });
      return p;
    }

    function getRecetas() {
      var cap11 = window.CAPITULOS && window.CAPITULOS[11];
      return (cap11 && cap11.recetas) || [];
    }

    function getRecetaPorId(id) {
      return getRecetas().filter(function (r) { return r.id === id; })[0];
    }

    // Extrae el peso en gramos de un texto de fórmula. Maneja "9.050 g",
    // "1.200 g (50 g/pieza)", "3 unidades (~150 g)". Si no encuentra un
    // número seguido de "g", devuelve null (no se suma a la proyección).
    function parsearGramos(texto) {
      if (!texto) return null;
      var m = String(texto).match(/([\d.,]+)\s*g\b/);
      if (!m) return null;
      var n = m[1].replace(/\./g, "").replace(",", ".");
      var v = parseFloat(n);
      return isNaN(v) ? null : v;
    }

    function sumaSemana(arr) {
      return (arr || []).reduce(function (s, v) {
        var n = parseFloat(String(v).replace(",", "."));
        return s + (isNaN(n) ? 0 : n);
      }, 0);
    }

    function cargar() {
      try {
        var raw = localStorage.getItem(STORAGE_KEY);
        if (raw) return JSON.parse(raw);
      } catch (e) {}
      return { productos: [productoVacio()] };
    }

    var state = cargar();
    if (!state.productos || !state.productos.length) state.productos = [productoVacio()];

    var guardadoEl, listEl;

    function guardar() {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        if (guardadoEl) {
          guardadoEl.textContent = "Guardado ✓";
          clearTimeout(guardar._t);
          guardar._t = setTimeout(function () { if (guardadoEl) guardadoEl.textContent = ""; }, 1200);
        }
      } catch (e) {}
    }

    function tablaProducto(producto, idx) {
      var card = document.createElement("div");
      card.className = "plan-card";

      var header = document.createElement("div");
      header.className = "plan-card-header";
      var nombreInput = document.createElement("input");
      nombreInput.type = "text";
      nombreInput.className = "calc-input plan-nombre";
      nombreInput.placeholder = "Nombre del producto";
      nombreInput.value = producto.nombre || "";
      nombreInput.addEventListener("input", function () { producto.nombre = nombreInput.value; guardar(); });

      var removeBtn = document.createElement("button");
      removeBtn.type = "button";
      removeBtn.className = "calc-remove no-print";
      removeBtn.setAttribute("aria-label", "Quitar producto");
      removeBtn.textContent = "✕";
      removeBtn.addEventListener("click", function () {
        state.productos.splice(idx, 1);
        if (!state.productos.length) state.productos.push(productoVacio());
        guardar();
        renderLista();
      });

      header.appendChild(nombreInput);

      var recetas = getRecetas();
      if (recetas.length) {
        var select = document.createElement("select");
        select.className = "calc-input plan-receta-select";
        select.innerHTML = '<option value="">Sin vincular a receta</option>' +
          recetas.map(function (r) {
            return '<option value="' + r.id + '"' + (producto.recetaId === r.id ? " selected" : "") + ">" + r.nombre + "</option>";
          }).join("");
        select.addEventListener("change", function () {
          producto.recetaId = select.value;
          guardar();
          actualizarProyeccion();
        });
        header.appendChild(select);
      }

      header.appendChild(removeBtn);
      card.appendChild(header);

      var table = document.createElement("table");
      table.className = "formula plan-tabla";
      var thead = document.createElement("thead");
      thead.innerHTML = "<tr><th></th>" + DIAS.map(function (d) { return "<th>" + d + "</th>"; }).join("") + "</tr>";
      table.appendChild(thead);

      var tbody = document.createElement("tbody");
      FILAS.forEach(function (fila) {
        var tr = document.createElement("tr");
        var th = document.createElement("td");
        th.className = "plan-fila-label";
        th.textContent = fila.label;
        tr.appendChild(th);
        DIAS.forEach(function (_, diaIdx) {
          var td = document.createElement("td");
          var input = document.createElement("input");
          input.type = "text";
          input.inputMode = "decimal";
          input.className = "calc-input plan-celda";
          input.value = producto[fila.key][diaIdx] || "";
          input.addEventListener("input", function () {
            producto[fila.key][diaIdx] = input.value;
            guardar();
            if (fila.key === "produccion") actualizarProyeccion();
          });
          td.appendChild(input);
          tr.appendChild(td);
        });
        tbody.appendChild(tr);
      });
      table.appendChild(tbody);
      card.appendChild(table);

      return card;
    }

    function renderLista() {
      listEl.innerHTML = "";
      state.productos.forEach(function (p, idx) { listEl.appendChild(tablaProducto(p, idx)); });
      actualizarProyeccion();
    }

    function actualizarProyeccion() {
      if (!proyeccionEl) return;
      var totalesIngredientes = {}; // nombre -> gramos
      var sinVincular = [];
      var recetasUsadas = 0;

      state.productos.forEach(function (p) {
        var totalSemana = sumaSemana(p.produccion);
        if (totalSemana <= 0) return;
        if (!p.recetaId) {
          if (p.nombre) sinVincular.push(p.nombre);
          return;
        }
        var receta = getRecetaPorId(p.recetaId);
        if (!receta || !receta.rendimientoUnidades || !receta.formula) return;
        recetasUsadas++;
        var batches = totalSemana / receta.rendimientoUnidades;
        receta.formula.forEach(function (ing) {
          var gramos = parsearGramos(ing.peso);
          if (gramos == null) return;
          var clave = ing.ingrediente;
          totalesIngredientes[clave] = (totalesIngredientes[clave] || 0) + gramos * batches;
        });
      });

      if (!recetasUsadas) {
        proyeccionEl.innerHTML = '<p class="calc-intro">Vinculá al menos un producto a una receta del Capítulo 11 y cargá su producción semanal para ver la proyección acá.</p>';
        return;
      }

      var filas = Object.keys(totalesIngredientes).sort().map(function (nombre) {
        var g = totalesIngredientes[nombre];
        var texto = g >= 1000 ? (g / 1000).toLocaleString("es-CL", { maximumFractionDigits: 2 }) + " kg" : Math.round(g) + " g";
        return "<tr><td>" + nombre + "</td><td>" + texto + "</td></tr>";
      }).join("");

      proyeccionEl.innerHTML =
        '<table class="formula plan-tabla-proyeccion"><thead><tr><th>Ingrediente</th><th>Cantidad necesaria (semana)</th></tr></thead><tbody>' + filas + "</tbody></table>" +
        (sinVincular.length ? '<p class="calc-nota-verificacion">Sin vincular a receta (no entran en la proyección): ' + sinVincular.join(", ") + "</p>" : "");
    }

    // --- Construcción inicial (una sola vez) ---
    var wrap = document.createElement("div");
    wrap.className = "calc-tool";

    var introDiv = document.createElement("p");
    introDiv.className = "calc-intro no-print";
    introDiv.textContent = "Un producto por tarjeta, cinco filas fijas, siete días. Se guarda solo en este dispositivo a medida que escribís — no hace falta ningún botón de guardar.";
    wrap.appendChild(introDiv);

    var topRow = document.createElement("div");
    topRow.className = "plan-toolbar no-print";
    var addBtn = document.createElement("button");
    addBtn.type = "button";
    addBtn.className = "calc-add";
    addBtn.style.width = "auto";
    addBtn.textContent = "+ Agregar producto";
    addBtn.addEventListener("click", function () {
      state.productos.push(productoVacio());
      guardar();
      renderLista();
    });
    var printBtn = document.createElement("button");
    printBtn.type = "button";
    printBtn.className = "oferta-cta";
    printBtn.textContent = "🖶 Imprimir consolidado";
    printBtn.addEventListener("click", function () { window.print(); });

    guardadoEl = document.createElement("span");
    guardadoEl.className = "plan-guardado mono";

    topRow.appendChild(addBtn);
    topRow.appendChild(printBtn);
    topRow.appendChild(guardadoEl);
    wrap.appendChild(topRow);

    listEl = document.createElement("div");
    listEl.className = "plan-lista";
    wrap.appendChild(listEl);

    var proyeccionLabel = document.createElement("p");
    proyeccionLabel.className = "calc-section-label";
    proyeccionLabel.textContent = "Proyección de ingredientes de la semana";
    wrap.appendChild(proyeccionLabel);

    var proyeccionEl = document.createElement("div");
    proyeccionEl.className = "plan-proyeccion";
    wrap.appendChild(proyeccionEl);

    container.innerHTML = "";
    container.appendChild(wrap);

    renderLista();
  }
};
