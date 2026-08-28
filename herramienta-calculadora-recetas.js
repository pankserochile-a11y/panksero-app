/**
 * HERRAMIENTA — Calculadora de recetas (escalado + fórmula panadera)
 * Método Panksero (Capítulo 9)
 *
 * Mismo principio que la calculadora de costos: el formulario (filas
 * de ingredientes con nombre, peso y checkbox de harina) se construye
 * una sola vez. Escribir en un campo nunca reconstruye esos inputs —
 * solo se recalcula y redibuja la tabla de resultados, que no tiene
 * ningún campo de texto adentro.
 */
window.HERRAMIENTAS = window.HERRAMIENTAS || {};

window.HERRAMIENTAS["calculadora-recetas"] = {
  id: "calculadora-recetas",
  titulo: "Calculadora de recetas",
  subtitulo: "Escalado de fórmulas y porcentaje panadero (Capítulo 9).",
  eyebrow: "Herramienta",

  render: function (container) {
    var state = {
      ingredientes: [
        { nombre: "", peso: "", esHarina: true },
        { nombre: "", peso: "", esHarina: false },
        { nombre: "", peso: "", esHarina: false }
      ],
      rendimientoBase: "",
      rendimientoDeseado: ""
    };

    var resultsEl, listEl;

    function num(v) {
      var n = parseFloat(String(v).replace(",", "."));
      return isNaN(n) ? 0 : n;
    }

    function fmt(n) {
      if (!isFinite(n)) return "—";
      return n.toLocaleString("es-CL", { minimumFractionDigits: 0, maximumFractionDigits: 1 });
    }

    function calcular() {
      var harinaTotal = state.ingredientes.reduce(function (sum, i) {
        return sum + (i.esHarina ? num(i.peso) : 0);
      }, 0);
      var rB = num(state.rendimientoBase);
      var rD = num(state.rendimientoDeseado);
      var factor = rB > 0 ? rD / rB : 1;
      var filas = state.ingredientes.map(function (i) {
        var peso = num(i.peso);
        return {
          nombre: i.nombre,
          pesoBase: peso,
          pesoEscalado: peso * factor,
          pct: harinaTotal > 0 ? (peso / harinaTotal) * 100 : 0
        };
      });
      var totalBase = state.ingredientes.reduce(function (s, i) { return s + num(i.peso); }, 0);
      return { filas: filas, factor: factor, totalBase: totalBase, totalEscalado: totalBase * factor };
    }

    // Solo actualiza la tabla de resultados. Nunca toca los inputs del formulario.
    function updateResults() {
      var r = calcular();
      labelEl.textContent = "Fórmula escalada (factor ×" + fmt(r.factor) + ")";

      var table = resultsEl.querySelector("table");
      var tbody = "<tbody>" + r.filas.map(function (f) {
        return "<tr><td>" + (f.nombre || "—") + "</td><td>" + (f.pct ? fmt(f.pct) + "%" : "—") + "</td><td>" + fmt(f.pesoBase) + " g</td><td>" + fmt(f.pesoEscalado) + " g</td></tr>";
      }).join("") +
        "<tr><td><strong>Total</strong></td><td>—</td><td><strong>" + fmt(r.totalBase) + " g</strong></td><td><strong>" + fmt(r.totalEscalado) + " g</strong></td></tr>" +
        "</tbody>";
      table.querySelector("tbody").outerHTML = tbody;
    }

    function filaIngrediente(i, idx) {
      var row = document.createElement("div");
      row.className = "calc-row calc-row-receta";
      row.innerHTML =
        '<input type="text" class="calc-input calc-input-nombre" placeholder="Ingrediente">' +
        '<input type="text" inputmode="decimal" class="calc-input calc-input-num" placeholder="Peso (g)">' +
        '<label class="calc-checkbox"><input type="checkbox" class="calc-harina-check"> harina</label>' +
        '<button type="button" class="calc-remove" aria-label="Quitar ingrediente">✕</button>';

      var nombreInput = row.querySelector(".calc-input-nombre");
      var pesoInput = row.querySelector(".calc-input-num");
      var harinaCheck = row.querySelector(".calc-harina-check");
      nombreInput.value = i.nombre || "";
      pesoInput.value = i.peso || "";
      harinaCheck.checked = !!i.esHarina;

      nombreInput.addEventListener("input", function () { state.ingredientes[idx].nombre = nombreInput.value; });
      pesoInput.addEventListener("input", function () { state.ingredientes[idx].peso = pesoInput.value; updateResults(); });
      harinaCheck.addEventListener("change", function () { state.ingredientes[idx].esHarina = harinaCheck.checked; updateResults(); });
      row.querySelector(".calc-remove").addEventListener("click", function () {
        state.ingredientes.splice(idx, 1);
        buildForm();
      });
      return row;
    }

    // Reconstruye las filas del formulario. Solo se llama al agregar
    // o quitar un ingrediente — nunca en respuesta a lo que se escribe.
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
    introDiv.textContent = "Cargá tu fórmula base en gramos, marcá qué ingredientes son harina, y definí a qué rendimiento querés escalarla. La proporción se mantiene igual, tal como explica el Capítulo 9.";
    wrap.appendChild(introDiv);

    var listLabel = document.createElement("p");
    listLabel.className = "calc-section-label";
    listLabel.textContent = "Fórmula base";
    wrap.appendChild(listLabel);

    listEl = document.createElement("div");
    listEl.className = "calc-list";
    wrap.appendChild(listEl);

    var addBtn = document.createElement("button");
    addBtn.type = "button";
    addBtn.className = "calc-add";
    addBtn.textContent = "+ Agregar ingrediente";
    addBtn.addEventListener("click", function () {
      state.ingredientes.push({ nombre: "", peso: "", esHarina: false });
      buildForm();
    });
    wrap.appendChild(addBtn);

    var paramsLabel = document.createElement("p");
    paramsLabel.className = "calc-section-label";
    paramsLabel.textContent = "Escalado";
    wrap.appendChild(paramsLabel);

    var params = document.createElement("div");
    params.className = "calc-params";
    params.innerHTML =
      '<label>Rendimiento base (unidades que da esta fórmula tal cual)<input type="text" inputmode="decimal" class="calc-input" id="calc-rbase"></label>' +
      '<label>Rendimiento deseado (unidades que querés obtener)<input type="text" inputmode="decimal" class="calc-input" id="calc-rdeseado"></label>';
    wrap.appendChild(params);

    var rbaseInput = params.querySelector("#calc-rbase");
    var rdeseadoInput = params.querySelector("#calc-rdeseado");
    rbaseInput.addEventListener("input", function () { state.rendimientoBase = rbaseInput.value; updateResults(); });
    rdeseadoInput.addEventListener("input", function () { state.rendimientoDeseado = rdeseadoInput.value; updateResults(); });

    var resultLabel = document.createElement("p");
    resultLabel.className = "calc-section-label calc-result-label";
    resultLabel.textContent = "Fórmula escalada (factor ×1)";
    wrap.appendChild(resultLabel);
    var labelEl = resultLabel;

    resultsEl = document.createElement("div");
    var table = document.createElement("table");
    table.className = "formula calc-formula-table";
    table.innerHTML = "<thead><tr><th>Ingrediente</th><th>% s/harina</th><th>Peso base</th><th>Peso escalado</th></tr></thead><tbody></tbody>";
    resultsEl.appendChild(table);
    wrap.appendChild(resultsEl);

    var nota = document.createElement("p");
    nota.className = "calc-nota-verificacion";
    nota.textContent = "Verificación: la suma de los % sobre harina de los ingredientes marcados como harina debe dar 100%. Si sumás otros ingredientes de harina, el resto de los % se calculan sobre ese total.";
    wrap.appendChild(nota);

    container.innerHTML = "";
    container.appendChild(wrap);

    buildForm();
  }
};
