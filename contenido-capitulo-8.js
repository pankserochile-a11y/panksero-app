window.CAPITULOS = window.CAPITULOS || {};
window.CAPITULOS[8] = {
  numero: 8, titulo: "Control de stock", tipo: "articulo", estado: "disponible",
  subtitulo: "De la planificación al control real, y la matriz de conservación.",
  secciones: [
    { titulo: "De la planificación al control real", parrafos: [
      "Planificar dice qué se espera que pase. Controlar el stock dice qué pasó realmente. Ambos son necesarios."
    ]},
    { titulo: "Plantilla de control por producto", tabla: { headers: ["Concepto", "Valor"], filas: [
        ["Stock inicial", ""], ["Producción", ""], ["Merma", ""], ["Salida (venta)", ""],
        ["Stock final", ""], ["Stock mínimo", ""], ["Stock máximo", ""], ["Cantidad a producir", ""]
      ]}
    },
    { titulo: "Usar el histórico de ventas para decidir", parrafos: [
      "El stock mínimo y máximo no se define una sola vez: se ajusta con el tiempo, a medida que el histórico muestra qué tan rápido rota cada producto.",
      "Dato pendiente de validación Panksero: valores reales de stock mínimo/máximo por producto, una vez que haya suficiente histórico registrado."
    ]},
    { titulo: "Matriz de conservación", parrafos: [
      "Una receta por familia — la que cada capítulo del libro usa como ejemplo (Capítulo 11) — para ver de un vistazo cómo se comporta cada familia de masa dentro del sistema."
      ],
      tabla: { headers: ["Producto", "Familia", "Congelado", "Frío / Fermentación", "Horneado", "Vida útil"], filas: [
        ["Pan Francés", "Masa panadera salada", "12–14 h", "Cuarto frío 16°C/22°C, toda la noche", "~180°C, 25 min", "7 días"],
        ["Pan Dulce", "Masa panadera dulce", "12–14 h", "Cuarto frío 16°C/22°C, toda la noche", "~180°C, 20 min", "7 días"],
        ["Empanada Queso", "Masa hojaldrada salada", "12–14 h (general)", "Nevera 7–8°C + 1h fermentadora", "~180°C, 40 min", "7–15 días (harina)"],
        ["Croissant / Media Luna", "Masa hojaldrada dulce", "12–14 h (general)", "Nevera 7–8°C + 1h fermentadora", "~180°C", "7–15 días (confirmado)"]
      ]},
      referencias: [11]
    },
    { titulo: "El patrón detrás de la matriz", parrafos: [
      "Las dos masas panaderas comparten exactamente el mismo circuito de frío — cuarto frío directo. Las dos masas hojaldradas comparten el otro — nevera más fermentadora. Esto no es casualidad.",
      "El resto del catálogo (Pan Canilla, Pan Campesino, Palmeras, Lengua de suegra, Roles de Canela) sigue el mismo circuito que el representante de su familia."
    ]}
  ]
};
