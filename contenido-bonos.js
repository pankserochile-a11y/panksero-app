window.CAPITULOS = window.CAPITULOS || {};
window.CAPITULOS["bonos"] = {
  numero: null, eyebrow: "Bonos", titulo: "Herramientas de trabajo", tipo: "articulo", estado: "disponible",
  subtitulo: "Los 8 bonos del libro: objetivo, instrucciones, plantilla y ejemplo de uso.",
  intro: "Los ejemplos usan números ilustrativos para mostrar cómo se usa cada herramienta — no son registros reales de Panksero, salvo donde se indica que sí lo son (fórmulas y tiempos del Capítulo 11).",
  secciones: [
    { titulo: "Bono 1 — Planificador semanal de producción", parrafos: [
      "Objetivo: tener, semana a semana, una hoja clara de cuánto se produjo, cuánto quedó en stock, cuánto se envió a frío positivo y cuánto se horneó de cada producto.",
      "Instrucciones: duplicar esta tabla una vez por producto activo. Completar cada fila al cierre del día."
      ],
      tabla: { headers: ["", "Lunes", "Martes"], filas: [
        ["Producción (ejemplo: Pan Francés)", "140 u", "—"],
        ["Stock congelado", "130 u", "90 u"],
        ["Enviado a frío positivo", "40 u", "40 u"],
        ["Programado", "40 u", "40 u"],
        ["Horneado", "38 u", "41 u"]
      ]}
    },
    { titulo: "Bono 2 — Control de stock", parrafos: [
      "Objetivo: saber, producto por producto, cuánto entra, cuánto se pierde, cuánto se vende y cuánto queda.",
      "Instrucciones: completar al cierre de cada período. El stock mínimo y máximo se completan solo después de varias semanas de registro real.",
      "Ejemplo (ilustrativo): Pan Campesino — Stock inicial 12, Producción 13, Merma 1, Salida 15, Stock final 9, Cantidad a producir en la próxima tanda: 13."
      ],
      tabla: { headers: ["Concepto", "Valor"], filas: [
        ["Stock inicial", ""], ["Producción", ""], ["Merma", ""], ["Salida (venta)", ""],
        ["Stock final", ""], ["Stock mínimo", ""], ["Stock máximo", ""], ["Cantidad a producir", ""]
      ]}
    },
    { titulo: "Bono 3 — Ficha técnica Panksero", parrafos: [
      "Objetivo: documentar cualquier producto nuevo, o uno del catálogo actual que todavía no tenga ficha, con la misma estructura que ya usan las 4 recetas del Capítulo 11.",
      "Instrucciones: completar sección por sección. Cuando un dato no esté validado, escribir 'pendiente de validación' — nunca un valor supuesto.",
      "Ejemplo de uso: las 4 fichas del Capítulo 11 son, literalmente, ejemplos reales de esta plantilla ya completa."
    ], referencias: [10, 11] },
    { titulo: "Bono 4 — Calculadora de costos", parrafos: [
      "Objetivo: saber, con números propios, cuánto cuesta producir una unidad y qué margen deja a un precio de venta dado.",
      "Instrucciones: completar el costo real de cada ingrediente de la fórmula, prorrateado a una unidad; sumar; comparar contra el precio de venta.",
      "Ejemplo (con variables, no precios reales): Costo = X = $400, Precio = Y = $600, Margen = Y − X = $200 → 33% sobre el precio de venta.",
      "Esta misma lógica, con datos reales y automatizada, ya existe como herramienta interactiva en esta app — sección Herramientas, en el inicio."
    ]},
    { titulo: "Bono 5 — Control de mermas", parrafos: [
      "Objetivo: saber cuánto se pierde, de qué producto y por qué motivo, para actuar sobre la causa.",
      "Instrucciones: registrar cada pérdida el mismo día que ocurre, con su causa clasificada según las categorías del Capítulo 14.",
      "Ejemplo (ilustrativo): 12/08 · Croissant · 6 u · Fermentación · 'sobrefermentó un fin de semana caluroso, sin ajustar el horario de traslado.'"
    ], referencias: [14] },
    { titulo: "Bono 6 — Planificador de fermentación", parrafos: [
      "Objetivo: decidir con anticipación qué producto se traslada a frío positivo y a qué hora, según el circuito que le corresponde.",
      "Instrucciones: una fila por producto que se vaya a trasladar esa noche."
      ],
      tabla: { headers: ["Producto", "Familia", "Traslado", "Circuito", "Horneado estimado"], filas: [
        ["Pan Francés", "Masa dura", "20:00", "Cuarto frío, toda la noche", "07:00–08:00"],
        ["Croissant", "Laminado", "20:00", "Nevera + 1h fermentadora", "~11:00"]
      ]},
      referencias: [5]
    },
    { titulo: "Bono 7 — Control de congelación y conservación", parrafos: [
      "Objetivo: aplicar en la práctica la rotación FIFO y el etiquetado, para que el stock congelado sea información confiable.",
      "Instrucciones: etiquetar cada lote al momento de congelarlo. Revisar semanalmente que el lote más viejo sea el primero en salir.",
      "Ejemplo (con vida útil real confirmada): Croissant · congelado 10/08 · 200 u · vence 25/08 (15 días, caso confirmado)."
    ], referencias: [4] },
    { titulo: "Bono 8 — Checklist de producción diaria", parrafos: [
      "Objetivo: una lista corta y accionable para no depender de la memoria en el momento de más presión del día.",
      "Instrucciones: revisar en orden, marcando cada punto antes de pasar al siguiente."
    ], lista: [
      "Revisé stock actual", "Revisé ventas esperadas de mañana", "Determiné cantidades a producir",
      "Saqué el producto congelado necesario", "Trasladé a frío positivo", "Organicé bandejas",
      "Dejé todo programado antes del cierre", "(mañana) Revisé el punto de fermentación",
      "(mañana) Horneé", "(mañana) Repuse vitrina según ventas reales"
    ]}
  ]
};
