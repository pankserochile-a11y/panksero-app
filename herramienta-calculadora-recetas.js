/**
 * HERRAMIENTA — Calculadora de recetas (escalado + fórmula panadera)
 * Método Panksero (Capítulo 9 / Bono original de escalado)
 *
 * Escala cualquier receta manteniendo las proporciones, y muestra
 * el porcentaje panadero (harina = 100%) para verificar la fórmula.
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
              return { filas: filas, harinaTotal: harinaTotal, factor: factor, totalBase: totalBase, totalEscalado: totalBase * factor };
      }

      function filaIngrediente(i, idx) {
              var row = document.createElement("div");
              row.className = "calc-row calc-row-receta";
              row.innerHTML =
                        '<input type="text" class="calc-input calc-input-nombre" placeholder="Ingrediente" value="' + (i.nombre || "").replace(/"/g, "&quot;") + '">' +
                        '<input type="text" inputmode="decimal" class="calc-input calc-input-num" placeholder="Peso (g)" value="' + (i.peso || "") + '">' +
                        '<label class="calc-checkbox"><input type="checkbox" class="calc-harina-check"' + (i.esHarina ? " checked" : "") + '> harina</label>' +
                        '<button type="button" class="calc-remove" aria-label="Quitar ingrediente">✕</button>';

            var nombreInput = row.querySelector(".calc-input-nombre");
              var pesoInput = row.querySelector(".calc-input-num");
              var harinaCheck = row.querySelector(".calc-harina-check");
              nombreInput.addEventListener("input", function () { state.ingredientes[idx].nombre = nombreInput.value; });
              pesoInput.addEventListener("input", function () { state.ingredientes[idx].peso = pesoInput.value; render(); });
              harinaCheck.addEventListener("change", function () { state.ingredientes[idx].esHarina = harinaCheck.checked; render(); });
              row.querySelector(".calc-remove").addEventListener("click", function () {
                        state.ingredientes.splice(idx, 1);
                        render();
              });
              return row;
      }

      function render() {
              var r = calcular();
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

            var list = document.createElement("div");
              list.className = "calc-list";
              state.ingredientes.forEach(function (ing, idx) { list.appendChild(filaIngrediente(ing, idx)); });
              wrap.appendChild(list);

            var addBtn = document.createElement("button");
              addBtn.type = "button";
              addBtn.className = "calc-add";
              addBtn.textContent = "+ Agregar ingrediente";
              addBtn.addEventListener("click", function () {
                        state.ingredientes.push({ nombre: "", peso: "", esHarina: false });
                        render();
              });
              wrap.appendChild(addBtn);

            var paramsLabel = document.createElement("p");
              paramsLabel.className = "calc-section-label";
              paramsLabel.textContent = "Escalado";
              wrap.appendChild(paramsLabel);

            var params = document.createElement("div");
              params.className = "calc-params";
              params.innerHTML =
                        '<label>Rendimiento base (unidades que da esta fórmula tal cual)<input type="text" inputmode="decimal" class="calc-input" id="calc-rbase" value="' + state.rendimientoBase + '"></label>' +
                        '<label>Rendimiento deseado (unidades que querés obtener)<input type="text" inputmode="decimal" class="calc-input" id="calc-rdeseado" value="' + state.rendimientoDeseado + '"></label>';
              wrap.appendChild(params);

            params.querySelector("#calc-rbase").addEventListener("input", function (e) { state.rendimientoBase = e.target.value; render(); });
              params.querySelector("#calc-rdeseado").addEventListener("input", function (e) { state.rendimientoDeseado = e.target.value; render(); });

            var resultLabel = document.createElement("p");
              resultLabel.className = "calc-section-label";
              resultLabel.textContent = "Fórmula escalada (factor ×" + fmt(r.factor) + ")";
              wrap.appendChild(resultLabel);

            var table = document.createElement("table");
              table.className = "formula calc-formula-table";
              var thead = "<thead><tr><th>Ingrediente</th><th>% s/harina</th><th>Peso base</th><th>Peso escalado</th></tr></thead>";
              var tbody = "<tbody>" + r.filas.map(function (f) {
                        return "<tr><td>" + (f.nombre || "—") + "</td><td>" + (f.pct ? fmt(f.pct) + "%" : "—") + "</td><td>" + fmt(f.pesoBase) + " g</td><td>" + fmt(f.pesoEscalado) + " g</td></tr>";
              }).join("") +
                        "<tr><td><strong>Total</strong></td><td>—</td><td><strong>" + fmt(r.totalBase) + " g</strong></td><td><strong>" + fmt(r.totalEscalado) + " g</strong></td></tr>" +
                        "</tbody>";
              table.innerHTML = thead + tbody;
              wrap.appendChild(table);

            var nota = document.createElement("p");
              nota.className = "calc-nota-verificacion";
              nota.textContent = "Verificación: la suma de los % sobre harina de los ingredientes marcados como harina debe dar 100%. Si sumás otros ingredientes de harina, el resto de los % se calculan sobre ese total.";
              wrap.appendChild(nota);

            container.innerHTML = "";
              container.appendChild(wrap);
      }

      render();
    }
};
