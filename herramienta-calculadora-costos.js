/**
 * HERRAMIENTA — Calculadora de costos
 * Método Panksero (Bono 4)
 *
 * A diferencia de los contenido-capitulo-N.js, esta herramienta no es
 * solo datos: trae su propia lógica de cálculo y su propio render(),
 * porque es interactiva. El motor (app.js) solo sabe que existe y la
 * monta dentro del contenedor que le pasa.
 *
 * Importante: el formulario (filas de ingredientes, inputs de
 * rendimiento/precio) se construye UNA SOLA VEZ. Escribir en un campo
 * nunca reconstruye esos inputs — si lo hiciera, el campo perdería el
 * foco en cada tecla. Solo se reconstruye el bloque de resultados,
 * que no tiene ningún campo de texto adentro.
 */
window.HERRAMIENTAS = window.HERRAMIENTAS || {};

window.HERRAMIENTAS["calculadora-costos"] = {
  id: "calculadora-costos",
  titulo: "Calculadora de costos",
  subtitulo: "Bono 4 — costo por unidad y margen sobre el precio de venta.",
  eyebrow: "Herramienta",

  render: function (container) {
    var state = {
      ingredientes: [
        { nombre: "", costo: "" },
        { nombre: "", costo: "" },
        { nombre: "", costo: "" }
      ],
      rendimiento: "",
      precioVenta: ""
    };

    var resultsEl, listEl;

    function fmt(n) {
      if (!isFinite(n)) return "—";
      return n.toLocaleString("es-CL", { minimumFractionDigits: 0, maximumFractionDigits: 2 });
    }

    function calcular() {
      var costoTotal = state.ingredientes.reduce(function (sum, i) {
        var v = parseFloat(String(i.costo).replace(",", "."));
        return sum + (isNaN(v) ? 0 : v);
      }, 0);
      var rendimiento = parseFloat(String(state.rendimiento).replace(",", ".")) || 0;
      var precioVenta = parseFloat(String(state.precioVenta).replace(",", ".")) || 0;
      var costoPorUnidad = rendimiento > 0 ? costoTotal / rendimiento : 0;
      var margenBruto = precioVenta - costoPorUnidad;
      var margenPct = precioVenta > 0 ? (margenBruto / precioVenta) * 100 : 0;
      return { costoTotal: costoTotal, costoPorUnidad: costoPorUnidad, margenBruto: margenBruto, margenPct: margenPct };
    }

    // Solo actualiza los resultados. Nunca toca los inputs del formulario.
    function updateResults() {
      var r = calcular();
      resultsEl.innerHTML =
        '<div class="calc-result"><span class="k">Costo total del lote</span><span class="v mono">$' + fmt(r.costoTotal) + "</span></div>" +
        '<div class="calc-result"><span class="k">Costo por unidad (X)</span><span class="v mono">$' + fmt(r.costoPorUnidad) + "</span></div>" +
        '<div class="calc-result"><span class="k">Precio de venta (Y)</span><span class="v mono">$' + fmt(parseFloat(String(state.precioVenta).replace(",", ".")) || 0) + "</span></div>" +
        '<div class="calc-result calc-result-highlight"><span class="k">Margen bruto (Y − X)</span><span class="v mono">$' + fmt(r.margenBruto) + "</span></div>" +
        '<div class="calc-result calc-result-highlight"><span class="k">Margen (%)</span><span class="v mono">' + fmt(r.margenPct) + "%</span></div>";
    }

    function filaIngrediente(i, idx) {
      var row = document.createElement("div");
      row.className = "calc-row";
      row.innerHTML =
        '<input type="text" class="calc-input calc-input-nombre" placeholder="Ingrediente">' +
        '<input type="text" inputmode="decimal" class="calc-input calc-input-num" placeholder="Costo usado ($)">' +
        '<button type="button" class="calc-remove" aria-label="Quitar ingrediente">✕</button>';

      var nombreInput = row.querySelector(".calc-input-nombre");
      var costoInput = row.querySelector(".calc-input-num");
      nombreInput.value = i.nombre || "";
      costoInput.value = i.costo || "";

      nombreInput.addEventListener("input", function () { state.ingredientes[idx].nombre = nombreInput.value; });
      costoInput.addEventListener("input", function () { state.ingredientes[idx].costo = costoInput.value; updateResults(); });
      row.querySelector(".calc-remove").addEventListener("click", function () {
        state.ingredientes.splice(idx, 1);
        buildForm();
      });
      return row;
    }

    // Reconstruye el formulario completo. Solo se llama al agregar o
    // quitar un ingrediente — nunca en respuesta a lo que se escribe.
    function buildForm() {
      listEl.innerHTML = "";
      state.ingredientes.forEach(function (ing, idx) { listEl.appendChild(filaIngrediente(ing, idx)); });
      updateResults();
    }

    // --- Construcción inicial (una sola vez) ---
    var wrap = document.createElement("div");
    wrap.className = "calc-tool";

    var introDiv = document.createElement("p");
    introDiv.className = "calc-intro";
    introDiv.textContent = "Cargá el costo prorrateado de cada ingrediente para el lote completo. La calculadora hace el resto: costo por unidad y margen sobre el precio de venta.";
    wrap.appendChild(introDiv);

    var listLabel = document.createElement("p");
    listLabel.className = "calc-section-label";
    listLabel.textContent = "Ingredientes del lote";
    wrap.appendChild(listLabel);

    listEl = document.createElement("div");
    listEl.className = "calc-list";
    wrap.appendChild(listEl);

    var addBtn = document.createElement("button");
    addBtn.type = "button";
    addBtn.className = "calc-add";
    addBtn.textContent = "+ Agregar ingrediente";
    addBtn.addEventListener("click", function () {
      state.ingredientes.push({ nombre: "", costo: "" });
      buildForm();
    });
    wrap.appendChild(addBtn);

    var paramsLabel = document.createElement("p");
    paramsLabel.className = "calc-section-label";
    paramsLabel.textContent = "Rendimiento y precio";
    wrap.appendChild(paramsLabel);

    var params = document.createElement("div");
    params.className = "calc-params";
    params.innerHTML =
      '<label>Rendimiento (unidades del lote)<input type="text" inputmode="decimal" class="calc-input" id="calc-rendimiento"></label>' +
      '<label>Precio de venta por unidad ($)<input type="text" inputmode="decimal" class="calc-input" id="calc-precio"></label>';
    wrap.appendChild(params);

    var rendInput = params.querySelector("#calc-rendimiento");
    var precioInput = params.querySelector("#calc-precio");
    rendInput.addEventListener("input", function () { state.rendimiento = rendInput.value; updateResults(); });
    precioInput.addEventListener("input", function () { state.precioVenta = precioInput.value; updateResults(); });

    var resultLabel = document.createElement("p");
    resultLabel.className = "calc-section-label";
    resultLabel.textContent = "Resultado";
    wrap.appendChild(resultLabel);

    resultsEl = document.createElement("div");
    resultsEl.className = "calc-results";
    wrap.appendChild(resultsEl);

    container.innerHTML = "";
    container.appendChild(wrap);

    buildForm();
  }
};
