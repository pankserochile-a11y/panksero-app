/**
 * CONTENIDO — Capítulo 5: Frío positivo
 * Método Panksero
 *
 * Primer capítulo de tipo "articulo" (texto corrido con subtítulos),
 * a diferencia de los capítulos 11 y 14 que son listas (recetas / problemas).
 * "referencias" en una sección son números de otros capítulos mencionados
 * en el texto — el motor los muestra como link si ese capítulo ya existe
 * en window.CAPITULOS, o como "próximamente" si todavía no se migró.
 */
window.CAPITULOS = window.CAPITULOS || {};

window.CAPITULOS[5] = {
    numero: 5,
    titulo: "Frío positivo",
    subtitulo: "Uno de los capítulos centrales del método.",
    tipo: "articulo",
    estado: "disponible",
    intro: 'Si el Capítulo 4 mostró cómo el congelador detiene el proceso de un producto, este capítulo muestra cómo el frío positivo lo retoma de forma controlada.',
    secciones: [
      {
              titulo: "Qué función cumple el frío positivo dentro del método",
              parrafos: [
                        'El frío positivo es el paso intermedio entre "producto congelado, en pausa" y "producto listo para hornear". No es solo un lugar más templado que el congelador: es la herramienta que permite decidir, con horas de anticipación, exactamente cuándo un producto va a estar en su punto para el horno de la mañana.'
                      ]
      },
      {
              titulo: "Cómo permite programar producción",
              parrafos: [
                        'Sin frío positivo, la única forma de tener producto fresco en la mañana sería empezar a producir de madrugada. Con frío positivo, ese trabajo se traslada la noche anterior: se saca el producto necesario del stock congelado, se traslada a frío positivo, y el negocio puede "dormir" mientras la masa avanza su fermentación de forma controlada. Esto es lo que hace posible programar en vez de improvisar cada mañana.'
                      ]
      },
      {
              titulo: "Cómo se utiliza para preparar el producto para la fermentación",
              parrafos: [
                        "El frío positivo no fermenta el producto de forma acelerada: lo mantiene en una temperatura que permite una fermentación lenta y controlada, en lugar de dejarlo a temperatura ambiente, donde el proceso avanzaría demasiado rápido y de forma menos predecible."
                      ]
      },
      {
              titulo: "Cómo controlar el proceso",
              parrafos: [
                        "Controlar el proceso en frío positivo significa poder anticipar en qué estado va a estar el producto a una hora determinada, y ajustar cuándo se traslada cada lote según cuándo se necesite hornearlo. Esto depende de variables específicas de tu operación (temperatura del equipo, tiempo de traslado, tipo de producto) que se documentan por receta en las fichas técnicas.",
                        "Familia de masas duras (Pan Canilla, Pan Dulce, Pan Francés, Pan Campesino): se trasladan del congelador al cuarto frío una hora antes del cierre de la tienda. Temperatura del cuarto frío: 16 °C en verano, 22 °C en invierno. Pasan ahí toda la noche. Al abrir por la mañana, la producción ya está adelantada — puede faltarle entre una y dos horas antes de entrar al horno, pero está lista para esa etapa final.",
                        "Familia de laminados (Croissant, Media Luna, Facturas): se trasladan del congelador a la nevera (frío positivo) por la noche, a una temperatura de 7 a 8 °C. Por la mañana pasan una hora adicional en la fermentadora, a 27 °C y 80% de humedad. Con este proceso, la producción del día está lista alrededor de las 11:00."
                      ],
              referencias: [11]
      },
      {
              titulo: "Qué señales observar en la masa",
              parrafos: [
                        "Independientemente del tiempo transcurrido, hay señales que indican si el producto está avanzando como se espera: cambios de volumen, firmeza, y apariencia superficial. Observar estas señales es lo que permite ajustar el proceso cuando algo se desvía de lo esperado, en lugar de confiar ciegamente en un cronómetro. Este criterio se retoma con más profundidad en el Capítulo 13."
                      ],
              referencias: [13]
      },
      {
              titulo: "Qué variables pueden modificar el resultado",
              parrafos: [
                        "Varios factores pueden alterar cómo se comporta un producto en frío positivo: la temperatura real del equipo (que puede variar según carga y apertura de puerta), el punto en el que se congeló el producto, el tiempo que pasó en el congelador antes de trasladarse, y la cantidad de producto cargada de una vez. Reconocer estas variables evita atribuir un resultado inesperado a una sola causa cuando puede haber varias interactuando."
                      ]
      },
      {
              titulo: "Conservación vs. control de proceso",
              parrafos: [
                        "Es importante no confundir dos funciones distintas que el frío positivo puede cumplir:",
                        "Conservación: mantener un producto en buen estado por un período, sin que eso forme parte de un proceso planificado hacia el horno.",
                        "Control de proceso: usar el frío positivo de forma activa para llevar un producto, paso a paso, hacia el punto exacto de fermentación que se necesita para una hora determinada.",
                        "El método Panksero usa el frío positivo principalmente de la segunda forma. Es una herramienta de planificación, no solo un lugar para guardar producto a media temperatura."
                      ]
      }
        ]
};
