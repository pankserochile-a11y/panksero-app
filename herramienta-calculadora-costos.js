/**
 * HERRAMIENTA — Calculadora de costos
 * Método Panksero (Bono 4)
 *
 * A diferencia de los contenido-capitulo-N.js, esta herramienta no es
 * solo datos: trae su propia lógica de cálculo y su propio render(),
 * porque es interactiva. El motor (app.js) solo sabe que existe y la
 * monta dentro del contenedor que le pasa.
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
              return { costoTotal: costoTotal, costoPorUnidad: costoPorUnidad, margenBruto: margenBruto, margenPct: margenPct, rendimiento: rendimiento, precioVenta: precioVenta };
      }

      function filaIngrediente(i, idx) {
              var row = document.createElement("div");
              row.className = "calc-row";
              row.innerHTML =
                        '<input type="text" class="calc-input calc-input-nombre" placeholder="Ingrediente" value="' + (i.nombre || "").replace(/"/g, "&quot;") + '">' +
                        '<input type="text" inputmode="decimal" class="calc-input calc-input-num" placeholder="Costo usado ($)" value="' + (i.costo || "") + '">' +
                        '<button type="button" class="calc-remove" aria-label="Quitar ingrediente">✕</button>';

            var nombreInput = row.querySelector(".calc-input-nombre");
              var costoInput = row.querySelector(".calc-input-num");
              nombreInput.addEventListener("input", function () { state.ingredientes[idx].nombre = nombreInput.value; });
              costoInput.addEventListener("input", function () { state.ingredientes[idx].costo = costoInput.value; render(); });
              row.querySelector(".calc-remove").addEventListener("click", function () {
                        state.ingredientes.splice(idx, 1);
                        render();
              });
              return row;
      }

      function render() {
              var r = calcular();
              container.innerHTML = "";

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

            var list = document.createElement("div");
              list.className = "calc-list";
              state.ingredientes.forEach(function (ing, idx) { list.appendChild(filaIngrediente(ing, idx)); });
              wrap.appendChild(list);

            var addBtn = document.createElement("button");
              addBtn.type = "button";
              addBtn.className = "calc-add";
              addBtn.textContent = "+ Agregar ingrediente";
              addBtn.addEventListener("click", function () {
                        state.ingredientes.push({ nombre: "", costo: "" });
                        render();
              });
              wrap.appendChild(addBtn);

            var paramsLabel = document.createElement("p");
              paramsLabel.className = "calc-section-label";
              paramsLabel.textContent = "Rendimiento y precio";
              wrap.appendChild(paramsLabel);

            var params = document.createElement("div");
              params.className = "calc-params";
              params.innerHTML =
                        '<label>Rendimiento (unidades del lote)<input type="text" inputmode="decimal" class="calc-input" id="calc-rendimiento" value="' + state.rendimiento + '"></label>' +
                        '<label>Precio de venta por unidad ($)<input type="text" inputmode="decimal" class="calc-input" id="calc-precio" value="' + state.precioVenta + '"></label>';
              wrap.appendChild(params);

            params.querySelector("#calc-rendimiento").addEventListener("input", function (e) { state.rendimiento = e.target.value; render(); });
              params.querySelector("#calc-precio").addEventListener("input", function (e) { state.precioVenta = e.target.value; render(); });

            var resultLabel = document.createElement("p");
              resultLabel.className = "calc-section-label";
              resultLabel.textContent = "Resultado";
              wrap.appendChild(resultLabel);

            var results = document.createElement("div");
              results.className = "calc-results";
              results.innerHTML =
                        '<div class="calc-result"><span class="k">Costo total del lote</span><span class="v mono">$' + fmt(r.costoTotal) + "</span></div>" +
                        '<div class="calc-result"><span class="k">Costo por unidad (X)</span><span class="v mono">$' + fmt(r.costoPorUnidad) + "</span></div>" +
                        '<div class="calc-result"><span class="k">Precio de venta (Y)</span><span class="v mono">$' + fmt(r.precioVenta) + "</span></div>" +
                        '<div class="calc-result calc-result-highlight"><span class="k">Margen bruto (Y − X)</span><span class="v mono">$' + fmt(r.margenBruto) + "</span></div>" +
                        '<div class="calc-result calc-result-highlight"><span class="k">Margen (%)</span><span class="v mono">' + fmt(r.margenPct) + "%</span></div>";
              wrap.appendChild(results);

            container.innerHTML = "";
              container.appendChild(wrap);
      }

      render();
    }
};
