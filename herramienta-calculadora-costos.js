/**
 * HERRAMIENTA — Calculadora de costos
 * Método Panksero
 *
 * Formato real de Panksero (tomado de la planilla de costeo del
 * obrador): masa y empaste separados, costo por ingrediente calculado
 * solo (peso × precio por kilo), costos operativos por unidad, y
 * margen + food cost al final.
 *
 * Mismo principio de las otras herramientas: el formulario se
 * construye una sola vez. Escribir en un campo nunca reconstruye
 * inputs — solo actualiza el costo calculado de esa fila y el bloque
 * de resultados, que no tienen ningún campo de texto adentro.
 */
window.HERRAMIENTAS = window.HERRAMIENTAS || {};

window.HERRAMIENTAS["calculadora-costos"] = {
  id: "calculadora-costos",
  titulo: "Calculadora de costos",
  subtitulo: "Formato Panksero — masa, empaste, costos operativos y margen.",
  eyebrow: "Herramienta",

  render: function (container) {
    var state = {
      masa: [
        { nombre: "", peso: "", precioKg: "" },
        { nombre: "", peso: "", precioKg: "" },
        { nombre: "", peso: "", precioKg: "" }
      ],
      empaste: [
        { nombre: "", peso: "", precioKg: "" }
      ],
      unidades: "",
      manoObra: "",
      energia: "",
      empaque: "",
      amortizacion: "",
      otros: "",
      precioVenta: ""
    };

    var masaListEl, empasteListEl, resultsEl;

    function num(v) {
      var n = parseFloat(String(v).replace(",", "."));
      return isNaN(n) ? 0 : n;
    }

    function fmt(n, dec) {
      if (!isFinite(n)) return "—";
      return n.toLocaleString("es-CL", { minimumFractionDigits: 0, maximumFractionDigits: dec == null ? 0 : dec });
    }

    function costoFila(f) {
      return (num(f.peso) / 1000) * num(f.precioKg);
    }

    function subtotal(lista) {
      return lista.reduce(function (acc, f) {
        acc.peso += num(f.peso);
        acc.costo += costoFila(f);
        return acc;
      }, { peso: 0, costo: 0 });
    }

    function calcular() {
      var subMasa = subtotal(state.masa);
      var subEmpaste = subtotal(state.empaste);
      var totalFinal = { peso: subMasa.peso + subEmpaste.peso, costo: subMasa.costo + subEmpaste.costo };
      var unidades = num(state.unidades);
      var costoMasaPorUnidad = unidades > 0 ? totalFinal.costo / unidades : 0;
      var subtotalOperativo = num(state.manoObra) + num(state.energia) + num(state.empaque) + num(state.amortizacion) + num(state.otros);
      var costoTotalPorUnidad = costoMasaPorUnidad + subtotalOperativo;
      var precioVenta = num(state.precioVenta);
      var margenBruto = precioVenta - costoTotalPorUnidad;
      var margenPct = precioVenta > 0 ? (margenBruto / precioVenta) * 100 : 0;
      var foodCostPct = precioVenta > 0 ? (costoTotalPorUnidad / precioVenta) * 100 : 0;
      return {
        subMasa: subMasa, subEmpaste: subEmpaste, totalFinal: totalFinal,
        costoMasaPorUnidad: costoMasaPorUnidad, subtotalOperativo: subtotalOperativo,
        costoTotalPorUnidad: costoTotalPorUnidad, margenBruto: margenBruto,
        margenPct: margenPct, foodCostPct: foodCostPct
      };
    }

    function actualizarCostoFila(rowEl, f) {
      rowEl.querySelector(".calc-costo-auto").textContent = "$" + fmt(costoFila(f), 1);
    }

    function updateResults() {
      var r = calcular();
      resultsEl.innerHTML =
        '<div class="calc-result"><span class="k">Subtotal masa</span><span class="v mono">' + fmt(r.subMasa.peso) + " g · $" + fmt(r.subMasa.costo, 1) + "</span></div>" +
        '<div class="calc-result"><span class="k">Subtotal empaste</span><span class="v mono">' + fmt(r.subEmpaste.peso) + " g · $" + fmt(r.subEmpaste.costo, 1) + "</span></div>" +
        '<div class="calc-result"><span class="k">Total masa final</span><span class="v mono">' + fmt(r.totalFinal.peso) + " g · $" + fmt(r.totalFinal.costo, 1) + "</span></div>" +
        '<div class="calc-result"><span class="k">Costo de masa por unidad</span><span class="v mono">$' + fmt(r.costoMasaPorUnidad, 1) + "</span></div>" +
        '<div class="calc-result"><span class="k">Subtotal costos operativos/unidad</span><span class="v mono">$' + fmt(r.subtotalOperativo, 1) + "</span></div>" +
        '<div class="calc-result calc-result-highlight"><span class="k">Costo total por unidad</span><span class="v mono">$' + fmt(r.costoTotalPorUnidad, 1) + "</span></div>" +
        '<div class="calc-result calc-result-highlight"><span class="k">Margen bruto ($)</span><span class="v mono">$' + fmt(r.margenBruto, 1) + "</span></div>" +
        '<div class="calc-result calc-result-highlight"><span class="k">Margen bruto (%)</span><span class="v mono">' + fmt(r.margenPct, 1) + "%</span></div>" +
        '<div class="calc-result calc-result-highlight"><span class="k">Food cost (%)</span><span class="v mono">' + fmt(r.foodCostPct, 1) + "%</span></div>";
    }

    function filaIngrediente(lista, idx, listEl) {
      var f = lista[idx];
      var row = document.createElement("div");
      row.className = "calc-row calc-row-costeo";
      row.innerHTML =
        '<input type="text" class="calc-input calc-input-nombre" placeholder="Ingrediente">' +
        '<input type="text" inputmode="decimal" class="calc-input calc-input-num calc-peso" placeholder="Peso (g)">' +
        '<input type="text" inputmode="decimal" class="calc-input calc-input-num calc-precio" placeholder="$/kg">' +
        '<span class="calc-costo-auto mono">$0</span>' +
        '<button type="button" class="calc-remove" aria-label="Quitar ingrediente">✕</button>';

      var nombreInput = row.querySelector(".calc-input-nombre");
      var pesoInput = row.querySelector(".calc-peso");
      var precioInput = row.querySelector(".calc-precio");
      nombreInput.value = f.nombre || "";
      pesoInput.value = f.peso || "";
      precioInput.value = f.precioKg || "";

      nombreInput.addEventListener("input", function () { f.nombre = nombreInput.value; });
      pesoInput.addEventListener("input", function () {
        f.peso = pesoInput.value;
        actualizarCostoFila(row, f);
        updateResults();
      });
      precioInput.addEventListener("input", function () {
        f.precioKg = precioInput.value;
        actualizarCostoFila(row, f);
        updateResults();
      });
      row.querySelector(".calc-remove").addEventListener("click", function () {
        lista.splice(idx, 1);
        buildLista(lista, listEl, lista === state.masa ? "masa" : "empaste");
      });
      return row;
    }

    function buildLista(lista, listEl, tipo) {
      listEl.innerHTML = "";
      lista.forEach(function (f, idx) { listEl.appendChild(filaIngrediente(lista, idx, listEl)); });
      updateResults();
    }

    function seccionIngredientes(titulo, lista, tipo) {
      var section = document.createElement("div");

      var label = document.createElement("p");
      label.className = "calc-section-label";
      label.textContent = titulo;
      section.appendChild(label);

      var header = document.createElement("div");
      header.className = "calc-row calc-row-costeo calc-row-header";
      header.innerHTML = "<span>Ingrediente</span><span>Peso (g)</span><span>$/kg</span><span>Costo</span><span></span>";
      section.appendChild(header);

      var listEl = document.createElement("div");
      listEl.className = "calc-list";
      section.appendChild(listEl);

      var addBtn = document.createElement("button");
      addBtn.type = "button";
      addBtn.className = "calc-add";
      addBtn.textContent = "+ Agregar ingrediente";
      addBtn.addEventListener("click", function () {
        lista.push({ nombre: "", peso: "", precioKg: "" });
        buildLista(lista, listEl, tipo);
      });
      section.appendChild(addBtn);

      if (tipo === "masa") { masaListEl = listEl; } else { empasteListEl = listEl; }
      buildLista(lista, listEl, tipo);
      return section;
    }

    // --- Construcción inicial (una sola vez) ---
    var wrap = document.createElement("div");
    wrap.className = "calc-tool";

    resultsEl = document.createElement("div");
    resultsEl.className = "calc-results";

    var introDiv = document.createElement("p");
    introDiv.className = "calc-intro";
    introDiv.textContent = "Cargá el peso y el precio por kilo de cada ingrediente — el costo de cada uno se calcula solo. Separá masa y empaste como en la planilla del obrador.";
    wrap.appendChild(introDiv);

    wrap.appendChild(seccionIngredientes("Masa", state.masa, "masa"));
    wrap.appendChild(seccionIngredientes("Empaste (dejá vacío si el producto no es laminado)", state.empaste, "empaste"));

    var rendLabel = document.createElement("p");
    rendLabel.className = "calc-section-label";
    rendLabel.textContent = "Rendimiento";
    wrap.appendChild(rendLabel);

    var rendParams = document.createElement("div");
    rendParams.className = "calc-params";
    rendParams.innerHTML = '<label>N° de unidades reales del batch<input type="text" inputmode="decimal" class="calc-input" id="calc-unidades"></label>';
    wrap.appendChild(rendParams);
    var unidadesInput = rendParams.querySelector("#calc-unidades");
    unidadesInput.addEventListener("input", function () { state.unidades = unidadesInput.value; updateResults(); });

    var opLabel = document.createElement("p");
    opLabel.className = "calc-section-label";
    opLabel.textContent = "Costos operativos adicionales por unidad";
    wrap.appendChild(opLabel);

    var opParams = document.createElement("div");
    opParams.className = "calc-params calc-params-grid";
    opParams.innerHTML =
      '<label>Mano de obra ($)<input type="text" inputmode="decimal" class="calc-input" id="calc-mano-obra"></label>' +
      '<label>Energía / horno / frío ($)<input type="text" inputmode="decimal" class="calc-input" id="calc-energia"></label>' +
      '<label>Empaque ($)<input type="text" inputmode="decimal" class="calc-input" id="calc-empaque"></label>' +
      '<label>Amortización equipos ($)<input type="text" inputmode="decimal" class="calc-input" id="calc-amortizacion"></label>' +
      '<label>Otros / merma adicional ($)<input type="text" inputmode="decimal" class="calc-input" id="calc-otros"></label>';
    wrap.appendChild(opParams);

    [["calc-mano-obra", "manoObra"], ["calc-energia", "energia"], ["calc-empaque", "empaque"], ["calc-amortizacion", "amortizacion"], ["calc-otros", "otros"]].forEach(function (pair) {
      var el = opParams.querySelector("#" + pair[0]);
      el.addEventListener("input", function () { state[pair[1]] = el.value; updateResults(); });
    });

    var precioLabel = document.createElement("p");
    precioLabel.className = "calc-section-label";
    precioLabel.textContent = "Precio de venta";
    wrap.appendChild(precioLabel);

    var precioParams = document.createElement("div");
    precioParams.className = "calc-params";
    precioParams.innerHTML = '<label>Precio de venta sugerido / real ($)<input type="text" inputmode="decimal" class="calc-input" id="calc-precio-venta"></label>';
    wrap.appendChild(precioParams);
    var precioVentaInput = precioParams.querySelector("#calc-precio-venta");
    precioVentaInput.addEventListener("input", function () { state.precioVenta = precioVentaInput.value; updateResults(); });

    var resultLabel = document.createElement("p");
    resultLabel.className = "calc-section-label";
    resultLabel.textContent = "Costo total y margen";
    wrap.appendChild(resultLabel);

    wrap.appendChild(resultsEl);

    container.innerHTML = "";
    container.appendChild(wrap);

    updateResults();
  }
};
