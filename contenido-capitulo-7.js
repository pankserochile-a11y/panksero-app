window.CAPITULOS = window.CAPITULOS || {};
window.CAPITULOS[7] = {
  numero: 7, titulo: "Programar la producción", tipo: "articulo", estado: "disponible",
  subtitulo: "Planificación semanal y producción por lotes.",
  secciones: [
    { titulo: "De la decisión nocturna a un sistema semanal", parrafos: [
      "En lugar de decidir cada noche desde cero, se trata de tener ya una planificación semanal como punto de partida, que luego se ajusta día a día."
    ]},
    { titulo: "Plantilla de planificación semanal", parrafos: [
      "Se completa una tabla como esta por cada producto que se trabaja bajo el método."
      ],
      tabla: { headers: ["", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"], filas: [
        ["Producción", "", "", "", "", "", "", ""],
        ["Stock congelado", "", "", "", "", "", "", ""],
        ["Enviado a frío positivo", "", "", "", "", "", "", ""],
        ["Programado (cantidad)", "", "", "", "", "", "", ""],
        ["Horneado", "", "", "", "", "", "", ""]
      ]}
    },
    { titulo: "Por qué esta estructura funciona", parrafos: [
      "Repetir la misma tabla por producto, semana a semana, convierte la planificación en un hábito. Con unas semanas de registro, empiezan a verse patrones."
    ], referencias: [8] },
    { titulo: "Producción por lotes", parrafos: [
      "Un lote no es solo 'cuánto se produjo hoy' — es una cantidad que, desde el momento en que se decide producirla, ya tiene un destino pensado para cada parte de sí misma.",
      "Ejemplo conceptual (no es un número real de Panksero): una producción de 30 unidades podría pensarse repartida en 10 para venta inmediata, 10 disponibles para próximos días, 10 conservadas según el sistema correspondiente.",
      "Lote → conservación → demanda → regeneración → venta."
    ]}
  ]
};
