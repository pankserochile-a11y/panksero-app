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
 *
 * Calendario: cada semana calendario (lunes a domingo) guarda su propia
 * planificación por separado, con flechas para moverse entre semanas.
 * Así queda historial real — no se pisa lo de la semana pasada — y las
 * columnas de la tabla muestran la fecha real, no un "Lun/Mar" genérico
 * que no dice a qué semana pertenece.
 */
window.HERRAMIENTAS = window.HERRAMIENTAS || {};

window.HERRAMIENTAS["planificador-semanal"] = {
  id: "planificador-semanal",
  titulo: "Planificador semanal",
  subtitulo: "Bono 1 — producción, stock, frío positivo y horneado por producto, semana a semana con calendario real. Incluye la lista de insumos necesarios en volumen e inversión.",
  eyebrow: "Herramienta",

  render: function (container) {
    // STORAGE_KEY: formato viejo (antes del calendario), solo se lee una
    // vez para migrar esos datos a la semana actual la primera vez que
    // se carga esta versión — nunca más se escribe ahí.
    var STORAGE_KEY = "panksero_planificador_semanal";
    // Formato nuevo: un objeto { "AAAA-MM-DD" (lunes de la semana): { productos: [...] } }
    var STORAGE_KEY_SEMANAS = "panksero_planificador_semanas";
    // Catálogo de precios de insumos: se comparte entre semanas y entre
    // todos los productos — un insumo (ej. "Harina panadera") se carga
    // una sola vez y de ahí en adelante cualquier receta que lo use ya
    // sale con precio en la proyección de inversión.
    var STORAGE_KEY_PRECIOS = "panksero_precios_insumos";
    var DIA_ABREV = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];
    var MESES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
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

    // --- Calendario: helpers de fecha (sin dependencias externas) ---

    function lunesDe(fecha) {
      var d = new Date(fecha);
      d.setHours(0, 0, 0, 0);
      var dia = d.getDay(); // 0 = domingo ... 6 = sábado
      var diff = dia === 0 ? -6 : 1 - dia;
      d.setDate(d.getDate() + diff);
      return d;
    }

    function sumarDias(fecha, n) {
      var d = new Date(fecha);
      d.setDate(d.getDate() + n);
      return d;
    }

    function isoDeFecha(d) {
      var m = String(d.getMonth() + 1);
      var day = String(d.getDate());
      return d.getFullYear() + "-" + (m.length < 2 ? "0" + m : m) + "-" + (day.length < 2 ? "0" + day : day);
    }

    function diasDeSemana(lunes) {
      var arr = [];
      for (var i = 0; i < 7; i++) {
        var d = sumarDias(lunes, i);
        arr.push({ abrev: DIA_ABREV[i], numero: d.getDate(), iso: isoDeFecha(d) });
      }
      return arr;
    }

    function formatearRangoSemana(lunes) {
      var domingo = sumarDias(lunes, 6);
      var mismoMes = lunes.getMonth() === domingo.getMonth();
      var anioActual = new Date().getFullYear();
      var sufijoAnio = domingo.getFullYear() === anioActual ? "" : " de " + domingo.getFullYear();
      if (mismoMes) {
        return "Semana del " + lunes.getDate() + " al " + domingo.getDate() + " de " + MESES[domingo.getMonth()] + sufijoAnio;
      }
      return "Semana del " + lunes.getDate() + " de " + MESES[lunes.getMonth()] + " al " + domingo.getDate() + " de " + MESES[domingo.getMonth()] + sufijoAnio;
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

    function cargarPrecios() {
      try {
        var raw = localStorage.getItem(STORAGE_KEY_PRECIOS);
        if (raw) return JSON.parse(raw);
      } catch (e) {}
      return {};
    }

    function guardarPrecio(nombre, precioPorKg) {
      try {
        var precios = cargarPrecios();
        if (precioPorKg > 0) precios[nombre] = precioPorKg;
        else delete precios[nombre];
        localStorage.setItem(STORAGE_KEY_PRECIOS, JSON.stringify(precios));
      } catch (e) {}
    }

    function fmtCLP(n) {
      return "$" + Math.round(n).toLocaleString("es-CL");
    }

    function cargarTodasLasSemanas() {
      try {
        var raw = localStorage.getItem(STORAGE_KEY_SEMANAS);
        if (raw) return JSON.parse(raw);
      } catch (e) {}
      return {};
    }

    function guardarTodasLasSemanas(semanas) {
      try { localStorage.setItem(STORAGE_KEY_SEMANAS, JSON.stringify(semanas)); } catch (e) {}
    }

    // La primera vez que se abre esta versión (con calendario), si nunca
    // se guardó nada en el formato nuevo pero sí existe el registro viejo
    // (de antes de tener semanas separadas), lo migramos a la semana
    // actual para no perder lo que ya estaba cargado.
    function migrarSiHaceFalta(semanas, claveHoy) {
      if (Object.keys(semanas).length) return semanas;
      try {
        var raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
          var viejo = JSON.parse(raw);
          if (viejo && viejo.productos && viejo.productos.length) {
            semanas[claveHoy] = viejo;
          }
        }
      } catch (e) {}
      return semanas;
    }

    var hoy = new Date();
    var lunesActual = lunesDe(hoy);
    var claveSemanaActual = isoDeFecha(lunesActual);
    var todasLasSemanas = migrarSiHaceFalta(cargarTodasLasSemanas(), claveSemanaActual);

    var lunesVisible = lunesActual;

    function claveDe(lunes) { return isoDeFecha(lunes); }

    function cargarSemana(lunes) {
      var datos = todasLasSemanas[claveDe(lunes)];
      if (!datos || !datos.productos || !datos.productos.length) {
        datos = { productos: [productoVacio()] };
      }
      return datos;
    }

    var state = cargarSemana(lunesVisible);

    var guardadoEl, listEl, semanaLabelEl, volverHoyBtn;

    function guardar() {
      try {
        todasLasSemanas[claveDe(lunesVisible)] = state;
        guardarTodasLasSemanas(todasLasSemanas);
        if (guardadoEl) {
          guardadoEl.textContent = "Guardado ✓";
          clearTimeout(guardar._t);
          guardar._t = setTimeout(function () { if (guardadoEl) guardadoEl.textContent = ""; }, 1200);
        }
      } catch (e) {}
    }

    function irASemana(nuevoLunes) {
      lunesVisible = nuevoLunes;
      state = cargarSemana(lunesVisible);
      actualizarEncabezadoSemana();
      renderLista();
    }

    function actualizarEncabezadoSemana() {
      if (!semanaLabelEl) return;
      semanaLabelEl.textContent = formatearRangoSemana(lunesVisible);
      if (volverHoyBtn) volverHoyBtn.hidden = claveDe(lunesVisible) === claveSemanaActual;
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
      var hoyIso = isoDeFecha(hoy);
      thead.innerHTML = "<tr><th></th>" + diasDeSemana(lunesVisible).map(function (d) {
        var esHoy = d.iso === hoyIso;
        return "<th>" + d.abrev + " " + d.numero + (esHoy ? ' <span class="plan-dia-hoy no-print">hoy</span>' : "") + "</th>";
      }).join("") + "</tr>";
      table.appendChild(thead);

      var tbody = document.createElement("tbody");
      FILAS.forEach(function (fila) {
        var tr = document.createElement("tr");
        var th = document.createElement("td");
        th.className = "plan-fila-label";
        th.textContent = fila.label;
        tr.appendChild(th);
        DIA_ABREV.forEach(function (_, diaIdx) {
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

      proyeccionEl.innerHTML = "";

      if (!recetasUsadas) {
        var vacio = document.createElement("p");
        vacio.className = "calc-intro";
        vacio.textContent = "Vinculá al menos un producto a una receta del Capítulo 11 y cargá su producción semanal para ver acá la lista de insumos, en volumen y en inversión.";
        proyeccionEl.appendChild(vacio);
        return;
      }

      // La tabla se arma una sola vez con DOM (no con innerHTML) para que
      // escribir un precio nunca reconstruya los inputs de precio — mismo
      // cuidado de foco que en el resto de la herramienta. Cada fila
      // guarda su propia referencia (kg, input, celda de subtotal) y
      // "refrescarFilaYTotal" solo actualiza texto, nunca recrea nada.
      var precios = cargarPrecios();
      var nombresOrdenados = Object.keys(totalesIngredientes).sort();
      var filasInfo = [];

      var table = document.createElement("table");
      table.className = "formula plan-tabla-proyeccion";
      var thead = document.createElement("thead");
      thead.innerHTML = "<tr><th>Insumo</th><th>Cantidad necesaria (semana)</th><th>Precio / kg</th><th>Inversión</th></tr>";
      table.appendChild(thead);

      var tbody = document.createElement("tbody");
      nombresOrdenados.forEach(function (nombre) {
        var gramos = totalesIngredientes[nombre];
        var kg = gramos / 1000;
        var textoCantidad = gramos >= 1000 ? kg.toLocaleString("es-CL", { maximumFractionDigits: 2 }) + " kg" : Math.round(gramos) + " g";

        var tr = document.createElement("tr");

        var tdNombre = document.createElement("td");
        tdNombre.textContent = nombre;
        tr.appendChild(tdNombre);

        var tdCantidad = document.createElement("td");
        tdCantidad.textContent = textoCantidad;
        tr.appendChild(tdCantidad);

        var tdPrecio = document.createElement("td");
        var precioInput = document.createElement("input");
        precioInput.type = "number";
        precioInput.inputMode = "decimal";
        precioInput.min = "0";
        precioInput.className = "calc-input calc-input-num plan-precio-insumo";
        precioInput.placeholder = "0";
        precioInput.setAttribute("aria-label", "Precio por kilo de " + nombre);
        if (precios[nombre] != null) precioInput.value = precios[nombre];
        tdPrecio.appendChild(precioInput);
        tr.appendChild(tdPrecio);

        var tdSubtotal = document.createElement("td");
        tdSubtotal.className = "mono";
        tr.appendChild(tdSubtotal);

        tbody.appendChild(tr);
        filasInfo.push({ kg: kg, input: precioInput, tdSubtotal: tdSubtotal });

        precioInput.addEventListener("input", function () {
          var valor = parseFloat(String(precioInput.value).replace(",", "."));
          guardarPrecio(nombre, valor > 0 ? valor : null);
          refrescarFilaYTotal();
        });
      });
      table.appendChild(tbody);
      proyeccionEl.appendChild(table);

      var totalDiv = document.createElement("div");
      totalDiv.className = "calc-results plan-inversion-resumen";
      var totalRow = document.createElement("div");
      totalRow.className = "calc-result calc-result-highlight";
      var totalLabel = document.createElement("span");
      totalLabel.className = "k";
      totalLabel.textContent = "Inversión total estimada en insumos (semana)";
      var totalValor = document.createElement("span");
      totalValor.className = "v mono";
      totalRow.appendChild(totalLabel);
      totalRow.appendChild(totalValor);
      totalDiv.appendChild(totalRow);
      proyeccionEl.appendChild(totalDiv);

      var notaPrecios = document.createElement("p");
      notaPrecios.className = "calc-nota-verificacion";
      proyeccionEl.appendChild(notaPrecios);

      function refrescarFilaYTotal() {
        var total = 0;
        var faltan = 0;
        filasInfo.forEach(function (f) {
          var precio = parseFloat(String(f.input.value).replace(",", "."));
          if (precio > 0) {
            var subtotal = f.kg * precio;
            f.tdSubtotal.textContent = fmtCLP(subtotal);
            total += subtotal;
          } else {
            f.tdSubtotal.textContent = "—";
            faltan++;
          }
        });
        totalValor.textContent = fmtCLP(total);
        notaPrecios.textContent = faltan
          ? "Cargá el precio por kilo de " + faltan + " insumo" + (faltan > 1 ? "s" : "") + " más para que entre" + (faltan > 1 ? "n" : "") + " en la inversión total. Los precios quedan guardados en este dispositivo y se reusan la próxima vez que aparezca el mismo insumo."
          : "Los precios quedan guardados en este dispositivo — la próxima vez que uses estos insumos ya van a salir con precio cargado.";
      }

      refrescarFilaYTotal();

      if (sinVincular.length) {
        var notaSin = document.createElement("p");
        notaSin.className = "calc-nota-verificacion";
        notaSin.textContent = "Sin vincular a receta (no entran en la lista de insumos): " + sinVincular.join(", ");
        proyeccionEl.appendChild(notaSin);
      }
    }

    // --- Construcción inicial (una sola vez) ---
    var wrap = document.createElement("div");
    wrap.className = "calc-tool";

    var semanaNav = document.createElement("div");
    semanaNav.className = "plan-semana-nav";

    var prevBtn = document.createElement("button");
    prevBtn.type = "button";
    prevBtn.className = "plan-semana-flecha no-print";
    prevBtn.setAttribute("aria-label", "Semana anterior");
    prevBtn.textContent = "←";
    prevBtn.addEventListener("click", function () { irASemana(sumarDias(lunesVisible, -7)); });

    semanaLabelEl = document.createElement("span");
    semanaLabelEl.className = "plan-semana-label";

    var nextBtn = document.createElement("button");
    nextBtn.type = "button";
    nextBtn.className = "plan-semana-flecha no-print";
    nextBtn.setAttribute("aria-label", "Semana siguiente");
    nextBtn.textContent = "→";
    nextBtn.addEventListener("click", function () { irASemana(sumarDias(lunesVisible, 7)); });

    volverHoyBtn = document.createElement("button");
    volverHoyBtn.type = "button";
    volverHoyBtn.className = "plan-semana-hoy no-print";
    volverHoyBtn.textContent = "Volver a esta semana";
    volverHoyBtn.addEventListener("click", function () { irASemana(lunesActual); });

    semanaNav.appendChild(prevBtn);
    semanaNav.appendChild(semanaLabelEl);
    semanaNav.appendChild(nextBtn);
    semanaNav.appendChild(volverHoyBtn);
    wrap.appendChild(semanaNav);

    var introDiv = document.createElement("p");
    introDiv.className = "calc-intro no-print";
    introDiv.textContent = "Un producto por tarjeta, cinco filas fijas, siete días. Cada semana calendario guarda su propia planificación — usá las flechas para moverte entre semanas. Se guarda solo en este dispositivo a medida que escribís, no hace falta ningún botón de guardar.";
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
    proyeccionLabel.textContent = "Lista de insumos de la semana: volumen e inversión";
    wrap.appendChild(proyeccionLabel);

    var proyeccionEl = document.createElement("div");
    proyeccionEl.className = "plan-proyeccion";
    wrap.appendChild(proyeccionEl);

    container.innerHTML = "";
    container.appendChild(wrap);

    actualizarEncabezadoSemana();
    renderLista();
  }
};
