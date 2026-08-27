/**
 * CONTENIDO — Capítulo 14: Errores de producción
 * Método Panksero
 *
 * A diferencia del Capítulo 11 (fichas de receta), este capítulo se
 * indexa por SÍNTOMA, no por índice — así resuelve la ansiedad real
 * del momento en que algo sale mal en el obrador, no organiza por
 * tema académico.
 *
 * "keywords" son variantes de cómo alguien escribiría el problema
 * en caliente, para que el buscador del inicio los encuentre aunque
 * no usen la palabra exacta de la tabla.
 */
window.CAPITULOS = window.CAPITULOS || {};

window.CAPITULOS[14] = {
  numero: 14,
  titulo: "Errores de producción",
  subtitulo: '"Mi producto…" — buscador por síntoma, no por índice.',
  estado: "disponible",
  nota: "Recomendación técnica general de panificación, no parámetros validados específicamente por Panksero. Sirve como guía de diagnóstico; los valores exactos de cada receta están en su ficha técnica (Capítulo 11).",
  problemas: [
    {
      id: "no-crecio",
      sintoma: "No creció",
      keywords: ["no creció", "no subió", "no sube", "quedó plano", "no infló"],
      causas: ["Levadura débil o vencida", "Fermentación insuficiente", "Masa muy fría"],
      revisar: "Actividad de la levadura, tiempo y temperatura de fermentación.",
      categoria: "Fórmula / Fermentación"
    },
    {
      id: "sobrefermento",
      sintoma: "Sobrefermentó",
      keywords: ["sobrefermentó", "se pasó de fermentación", "se pasó", "olor ácido", "se desinfló"],
      causas: ["Demasiado tiempo en fermentación", "Temperatura muy alta en fermentación"],
      revisar: "Tiempo real vs. planificado, temperatura del ambiente o del frío positivo.",
      categoria: "Fermentación"
    },
    {
      id: "quedo-pequeno",
      sintoma: "Quedó pequeño",
      keywords: ["quedó pequeño", "quedó chico", "no creció lo suficiente en el horno"],
      causas: ["Fermentación corta", "Formado con demasiada tensión", "Horno muy caliente al inicio"],
      revisar: "Punto de fermentación antes de hornear, técnica de formado.",
      categoria: "Formado / Fermentación / Horneado"
    },
    {
      id: "se-abrio",
      sintoma: "Se abrió",
      keywords: ["se abrió", "se rajó", "se rompió por un lado", "se reventó"],
      causas: ["Tensión de formado insuficiente", "Corte mal ejecutado", "Sobrefermentación"],
      revisar: "Formado, greñado, punto de fermentación.",
      categoria: "Formado / Fermentación"
    },
    {
      id: "se-desarmo",
      sintoma: "Se desarmó",
      keywords: ["se desarmó", "se deshizo", "perdió forma al manipular", "se rompió al formar"],
      causas: ["Amasado insuficiente (poco desarrollo de gluten)", "Manejo brusco al formar"],
      revisar: "Desarrollo de la masa durante el amasado, técnica de manipulación.",
      categoria: "Amasado / Formado"
    },
    {
      id: "quedo-seco",
      sintoma: "Quedó seco",
      keywords: ["quedó seco", "se secó", "reseco", "duro"],
      causas: ["Exceso de horneado", "Hidratación baja en la fórmula", "Tiempo de horno excesivo"],
      revisar: "Tiempo y temperatura de horno, hidratación de la fórmula.",
      categoria: "Fórmula / Horneado"
    },
    {
      id: "quedo-pesado",
      sintoma: "Quedó pesado",
      keywords: ["quedó pesado", "quedó denso", "quedó apretado", "no quedó esponjoso"],
      causas: ["Fermentación insuficiente", "Exceso de harina al formar"],
      revisar: "Punto de fermentación, técnica de formado.",
      categoria: "Fórmula / Fermentación"
    },
    {
      id: "perdio-volumen",
      sintoma: "Perdió volumen",
      keywords: ["perdió volumen", "se bajó", "se desinfló al hornear", "se cayó"],
      causas: ["Golpe o manipulación brusca después de fermentar", "Choque térmico"],
      revisar: "Manejo entre fermentación y horno, transición de temperaturas.",
      categoria: "Formado / Frío positivo"
    },
    {
      id: "sin-buena-miga",
      sintoma: "No desarrolló buena miga",
      keywords: ["miga mala", "miga apretada", "no tiene alveolos", "miga compacta"],
      causas: ["Amasado insuficiente", "Fermentación desequilibrada"],
      revisar: "Desarrollo del gluten, tiempo de fermentación.",
      categoria: "Amasado / Fermentación"
    },
    {
      id: "se-deformo-congelar",
      sintoma: "Se deformó después de congelar",
      keywords: ["se deformó al congelar", "se aplastó en el congelador", "salió mal del congelador"],
      causas: ["Congelado en el momento equivocado", "Mal empaque o carga excesiva"],
      revisar: "Punto de congelación de esa receta, técnica de almacenamiento.",
      categoria: "Congelación"
    },
    {
      id: "no-fermento-bien",
      sintoma: "No fermentó correctamente",
      keywords: ["no fermentó", "se quedó frío", "no reaccionó en frío positivo"],
      causas: ["Temperatura del frío positivo fuera de rango", "Levadura afectada por el frío"],
      revisar: "Temperatura real del equipo, tiempo de traslado.",
      categoria: "Frío positivo / Fermentación"
    },
    {
      id: "fermento-muy-rapido",
      sintoma: "Fermentó demasiado rápido",
      keywords: ["fermentó muy rápido", "se pasó rápido", "se adelantó la fermentación"],
      causas: ["Temperatura del entorno más alta de lo esperado"],
      revisar: "Temperatura del ambiente o del frío positivo, carga del equipo.",
      categoria: "Fermentación / Frío positivo"
    }
  ]
};
