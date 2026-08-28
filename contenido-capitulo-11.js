/**
 * CONTENIDO — Capítulo 11: Recetas
 * Método Panksero
 *
 * Sincronizado con el libro: una receta por familia de masa, en vez
 * de documentar las diez individualmente. El resto del catálogo
 * (Pan Canilla, Pan Campesino, Palmeras, Lengua de suegra, Roles de
 * Canela) sigue el mismo proceso que el representante de su familia
 * — ver la nota de cierre más abajo.
 */
window.CAPITULOS = window.CAPITULOS || {};

window.CAPITULOS[11] = {
  numero: 11,
  titulo: "Recetas",
  subtitulo: "Una receta por familia de masa, con fórmula, frío y horneado reales.",
  estado: "disponible",
  recetas: [
    {
      id: "pan-frances",
      nombre: "Pan Francés",
      rol: "Masa panadera salada — alta rotación",
      identidad: "Pan de tipo francés, formato pack 5 y pack 10 unidades.",
      rendimiento: "Batch de 14 kg → 140 panes (~100 g c/u).",
      datosRapidos: { pesoUnidad: "~100 g", proceso: "Retardo en cuarto frío", hidratacion: "44,2%", grasa: "3,3%", dificultad: null },
      tiempos: { congelacion: "12–14 h", frioPositivo: "Toda la noche (16 °C / 22 °C)", horneado: "~25 min (180 °C ref.)" },
      formula: [
        { ingrediente: "Harina Fortaleza Plus", peso: "9.050 g" },
        { ingrediente: "Agua", peso: "4.000 g" },
        { ingrediente: "Sal", peso: "140 g" },
        { ingrediente: "Azúcar", peso: "300 g" },
        { ingrediente: "Manteca panadera", peso: "300 g" },
        { ingrediente: "Levadura seca", peso: "35 g" },
        { ingrediente: "Mejorador Vulkan", peso: "80 g" }
      ],
      produccion: "Masa con hielo y agua → sobado → picado → porcionado → formado → directo a bandejas para congelación.",
      congelacion: "12–14 horas.",
      frioPositivo: "Cuarto frío, 16 °C en verano / 22 °C en invierno; traslado una hora antes del cierre (≈20:00), toda la noche.",
      fermentacion: "Se desarrolla dentro del cuarto frío (sin fermentadora aparte); al abrir (7:00–8:00) queda 1–2 horas antes de entrar al horno.",
      horneado: "~180 °C, gas 25 min de referencia — ajustar según color y textura.",
      vidaUtil: "7 días, como regla general del método.",
      presentacion: "Empacado — vida útil en vitrina: 3 días.",
      notaExtra: "Pan Canilla y Pan Campesino siguen exactamente este mismo proceso — misma familia de masa panadera salada."
    },
    {
      id: "pan-dulce",
      nombre: "Pan Dulce",
      rol: "Masa panadera dulce — producción nocturna",
      identidad: "Única receta de la familia de masa panadera dulce: comparte circuito de frío con las masas panaderas saladas, pero es una familia de masa aparte.",
      rendimiento: "Lote de 6.800 g de masa → 16 piezas (~425 g c/u).",
      datosRapidos: { pesoUnidad: "~425 g", proceso: "Retardo en cuarto frío", hidratacion: "34,6%", grasa: "8,0%", dificultad: null },
      tiempos: { congelacion: "12–14 h", frioPositivo: "Toda la noche (16 °C / 22 °C)", horneado: "~20 min (180 °C ref.)" },
      formula: [
        { ingrediente: "Harina Fortaleza Plus", peso: "4.050 g" },
        { ingrediente: "Agua", peso: "1.400 g" },
        { ingrediente: "Huevo", peso: "3 unidades (~150 g)" },
        { ingrediente: "Azúcar granulada", peso: "446 g" },
        { ingrediente: "Edulcorante", peso: "16 g" },
        { ingrediente: "Sal", peso: "80 g" },
        { ingrediente: "Levadura seca", peso: "60 g" },
        { ingrediente: "Manteca panadera", peso: "324 g" },
        { ingrediente: "Esencia de vainilla", peso: "30 g" }
      ],
      produccion: "Masa con hielo y agua → sobado → picado → porcionado → formado → directo a bandejas para congelación.",
      congelacion: "12–14 horas.",
      frioPositivo: "Cuarto frío, 16 °C en verano / 22 °C en invierno; traslado una hora antes del cierre (≈20:00), toda la noche.",
      fermentacion: "Se desarrolla dentro del cuarto frío; al abrir (7:00–8:00) queda 1–2 horas antes de entrar al horno.",
      horneado: "~180 °C, gas 20 min de referencia — ajustar según color y textura.",
      vidaUtil: "7 días, como regla general del método.",
      presentacion: "Empacado — vida útil en vitrina: 3 días."
    },
    {
      id: "empanada-queso",
      nombre: "Empanada Queso",
      rol: "Masa hojaldrada salada — producto relleno",
      identidad: "Hojaldre salado relleno con queso palmita; usa la misma masa que Empanada JQC.",
      rendimiento: "24 unidades por batch.",
      datosRapidos: { pesoUnidad: "~215 g (calculado, incluye relleno)", proceso: "Frío positivo + fermentadora", hidratacion: "50,0%", grasa: "46,3% (incluye empaste)", dificultad: null },
      tiempos: { congelacion: "Después del formado (12–14 h general)", frioPositivo: "Nevera 7–8 °C toda la noche + 1 h fermentadora (27 °C / 80% humedad)", horneado: "~40 min (180 °C ref.)" },
      formula: [
        { ingrediente: "Harina fortaleza", peso: "1.400 g" },
        { ingrediente: "Harina débil", peso: "600 g" },
        { ingrediente: "Agua", peso: "1.000 g" },
        { ingrediente: "Sal", peso: "40 g" },
        { ingrediente: "Manteca panadera", peso: "125 g" },
        { ingrediente: "Maestra Horneo (empaste)", peso: "800 g" },
        { ingrediente: "Queso Palmita (relleno)", peso: "1.200 g (50 g/pieza)" }
      ],
      produccion: "Sigue el proceso de la familia de masa hojaldrada (ver Croissant / Media Luna).",
      congelacion: "Después del formado; duración general del obrador: 12–14 horas.",
      frioPositivo: "Nevera, 7–8 °C, toda la noche.",
      fermentacion: "1 hora en fermentadora a 27 °C y 80% de humedad, a la mañana siguiente. Lista alrededor de las 11:00.",
      horneado: "~180 °C, gas 40 min de referencia — ajustar según color y textura.",
      vidaUtil: "7 días como referencia general (hasta 15 si se comporta igual que Croissant/Media Luna); puede variar según la calidad de la harina.",
      presentacion: "En bandeja (vitrina) — vida útil en vitrina: 2 días.",
      notaExtra: "Palmeras y Lengua de suegra siguen exactamente este mismo proceso — misma familia de masa hojaldrada salada."
    },
    {
      id: "croissant-media-luna",
      nombre: "Croissant / Media Luna",
      rol: "Masa hojaldrada dulce — fermentación controlada",
      identidad: "Masa laminada mix 80% Fortaleza Plus + 20% Regular; pastón 73,25% + empaste 26,75% de la masa total. Margen real confirmado (Media Luna): 48,3%.",
      rendimiento: "50 unidades por batch, ~85 g pieza cruda (masa total 4.250 g).",
      datosRapidos: { pesoUnidad: "~85 g", proceso: "Frío positivo + fermentadora", hidratacion: "42,4%", grasa: "84,1% (incluye empaste, típico de laminados)", dificultad: null },
      tiempos: { congelacion: "Después del formado (12–14 h general)", frioPositivo: "Nevera 7–8 °C toda la noche + 1 h fermentadora (27 °C / 80% humedad)", horneado: "180 °C — sin tiempo de referencia registrado" },
      formula: [
        { ingrediente: "Harina Fortaleza Plus (80% del mix)", peso: "1.377 g", nota: "pastón" },
        { ingrediente: "Harina Fortaleza Regular (20% del mix)", peso: "344 g", nota: "pastón" },
        { ingrediente: "Sal", peso: "34 g", nota: "pastón" },
        { ingrediente: "Agua", peso: "442 g", nota: "pastón" },
        { ingrediente: "Levadura seca", peso: "34 g", nota: "pastón" },
        { ingrediente: "Azúcar blanca", peso: "172 g", nota: "pastón" },
        { ingrediente: "Huevo entero (líquido)", peso: "86 g", nota: "pastón" },
        { ingrediente: "Leche entera", peso: "287 g", nota: "pastón" },
        { ingrediente: "Margarina Maestra Horneo", peso: "310 g", nota: "pastón" },
        { ingrediente: "Margarina Maestra Horneo", peso: "1.137 g", nota: "empaste" }
      ],
      produccion: "Formado con vueltas de laminado → congelación → frío positivo → fermentadora.",
      congelacion: "Después del formado; duración exacta para laminados pendiente de confirmar (general del obrador: 12–14 horas).",
      frioPositivo: "Nevera, 7–8 °C, toda la noche.",
      fermentacion: "1 hora en fermentadora a 27 °C y 80% de humedad, a la mañana siguiente. Lista alrededor de las 11:00.",
      horneado: "~180 °C — ajustar según color y textura.",
      vidaUtil: "7 días es la referencia general del método, pero en Croissant y Media Luna se ha probado hasta 15 días de congelación con buen resultado.",
      presentacion: "En bandeja (vitrina) — vida útil en vitrina: 2 días.",
      notaExtra: "Roles de Canela sigue exactamente este mismo proceso — misma familia de masa hojaldrada dulce. Facturas es un producto nuevo del catálogo, todavía sin datos reales."
    }
  ]
};
