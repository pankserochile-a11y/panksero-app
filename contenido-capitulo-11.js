/**
 * CONTENIDO — Capítulo 11: Recetas
 * Método Panksero
 *
 * Este archivo NO contiene lógica de la aplicación. Solo datos.
 * Para agregar un capítulo nuevo, se crea un archivo como este
 * (contenido-capitulo-N.js) y se registra abajo en window.CAPITULOS.
 * El motor (app.js) no necesita tocarse.
 */
window.CAPITULOS = window.CAPITULOS || {};

window.CAPITULOS[11] = {
  numero: 11,
  titulo: "Recetas",
  subtitulo: "Las ocho fichas base del catálogo, con fórmula, frío y horneado reales.",
  estado: "disponible",
  recetas: [
    {
      id: "pan-frances",
      nombre: "Pan Francés",
      rol: "Alta rotación",
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
      presentacion: "Empacado — vida útil en vitrina: 3 días."
    },
    {
      id: "pan-canilla",
      nombre: "Pan Canilla",
      rol: "Producción en volumen",
      identidad: "Demuestra la producción en tandas grandes. Merma confirmada: 300 g por unidad horneada.",
      rendimiento: "Lote de 600 g de masa → 2 unidades.",
      datosRapidos: { pesoUnidad: "300 g", proceso: "Retardo en cuarto frío", hidratacion: "54,9%", grasa: "5,0%", dificultad: null },
      tiempos: { congelacion: "12–14 h", frioPositivo: "Toda la noche (16 °C / 22 °C)", horneado: "180 °C — sin tiempo de referencia registrado" },
      formula: [
        { ingrediente: "Harina Fortaleza (genérica)", peso: "250 g" },
        { ingrediente: "Harina Pastelería (débil)", peso: "107 g" },
        { ingrediente: "Agua", peso: "196 g" },
        { ingrediente: "Levadura seca", peso: "4 g" },
        { ingrediente: "Sal", peso: "7 g" },
        { ingrediente: "Azúcar", peso: "18 g" },
        { ingrediente: "Margarina masas y batidos", peso: "18 g" }
      ],
      produccion: "Masa con hielo y agua → sobado → picado → porcionado → formado → directo a bandejas para congelación.",
      congelacion: "12–14 horas.",
      frioPositivo: "Cuarto frío, 16 °C en verano / 22 °C en invierno; traslado una hora antes del cierre (≈20:00), toda la noche.",
      fermentacion: "Se desarrolla dentro del cuarto frío; al abrir (7:00–8:00) queda 1–2 horas antes de entrar al horno.",
      horneado: "~180 °C — ajustar según color y textura.",
      vidaUtil: "7 días, como regla general del método.",
      presentacion: "En bandeja (vitrina) — vida útil en vitrina: 2 días."
    },
    {
      id: "empanada-queso",
      nombre: "Empanada Queso",
      rol: "Producto relleno",
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
      produccion: "Sigue el proceso de la familia de laminados (ver Croissant / Media Luna).",
      congelacion: "Después del formado; duración general del obrador: 12–14 horas.",
      frioPositivo: "Nevera, 7–8 °C, toda la noche.",
      fermentacion: "1 hora en fermentadora a 27 °C y 80% de humedad, a la mañana siguiente. Lista alrededor de las 11:00.",
      horneado: "~180 °C, gas 40 min de referencia — ajustar según color y textura.",
      vidaUtil: "7 días como referencia general (hasta 15 si se comporta igual que Croissant/Media Luna); puede variar según la calidad de la harina.",
      presentacion: "En bandeja (vitrina) — vida útil en vitrina: 2 días."
    },
    {
      id: "roles-canela",
      nombre: "Roles de Canela",
      rol: "Dulce, alto margen",
      identidad: "Producto de mejor margen real (50,6%) dentro del catálogo.",
      rendimiento: "160 unidades por batch.",
      datosRapidos: { pesoUnidad: "~112 g (calculado)", proceso: "Frío positivo + fermentadora", hidratacion: "48,5% (agua + leche)", grasa: "46,3% (incluye empaste)", dificultad: null },
      tiempos: { congelacion: "Después del formado (12–14 h general)", frioPositivo: "Nevera 7–8 °C toda la noche + 1 h fermentadora (27 °C / 80% humedad)", horneado: "180 °C — sin tiempo de referencia registrado" },
      formula: [
        { ingrediente: "Harina Fortaleza Plus", porcentaje: "70%", peso: "5.600 g" },
        { ingrediente: "Harina Regular (débil)", porcentaje: "30%", peso: "2.400 g" },
        { ingrediente: "Leche líquida", porcentaje: "11%", peso: "880 g" },
        { ingrediente: "Agua", porcentaje: "37,5%", peso: "3.000 g" },
        { ingrediente: "Huevo", porcentaje: "3,8%", peso: "6 unidades" },
        { ingrediente: "Azúcar granulada", porcentaje: "10%", peso: "800 g" },
        { ingrediente: "Sal", porcentaje: "1%", peso: "80 g" },
        { ingrediente: "Levadura seca", porcentaje: "1%", peso: "80 g" },
        { ingrediente: "Manteca panadera", porcentaje: "6,3%", peso: "500 g" },
        { ingrediente: "Maestra Horneo (empaste)", porcentaje: "40%", peso: "3.200 g" },
        { ingrediente: "Crema pastelera en polvo (relleno)", porcentaje: "12,5%", peso: "1.000 g" },
        { ingrediente: "Canela en polvo", porcentaje: "0,8%", peso: "60 g" }
      ],
      produccion: "Sigue el proceso de la familia de laminados (ver Croissant / Media Luna).",
      congelacion: "Después del formado; duración general del obrador: 12–14 horas.",
      frioPositivo: "Nevera, 7–8 °C, toda la noche.",
      fermentacion: "1 hora en fermentadora a 27 °C y 80% de humedad, a la mañana siguiente.",
      horneado: "~180 °C — ajustar según color y textura.",
      vidaUtil: "7 días como referencia general (hasta 15 si se comporta igual que Croissant/Media Luna); puede variar según la calidad de la harina.",
      presentacion: "En bandeja (vitrina) — vida útil en vitrina: 2 días."
    },
    {
      id: "croissant-media-luna",
      nombre: "Croissant / Media Luna",
      rol: "Fermentación controlada",
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
      presentacion: "En bandeja (vitrina) — vida útil en vitrina: 2 días."
    },
    {
      id: "pan-dulce",
      nombre: "Pan Dulce",
      rol: "Producción nocturna",
      identidad: "Elegido para demostrar la producción nocturna dentro de la familia de masas duras.",
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
      presentacion: "Empacado — vida útil en vitrina: 3 días.",
      notaExtra: "Palmeras (referencia, no oficial): batch ~3.800 g, 60 unidades; laminado clásico con Maestra Horneo de empaste (800 g); horneado ~180 °C, gas 35 min de referencia. Seguiría el proceso de laminados."
    },
    {
      id: "pan-campesino",
      nombre: "Pan Campesino",
      rol: "Salado, volumen",
      identidad: "Mix 70/30, pastón de 3.900 g. Margen real confirmado: 42,8% (43,5% según ficha de costeo más reciente).",
      rendimiento: "13 panes de 300 g c/u por batch.",
      datosRapidos: { pesoUnidad: "300 g", proceso: "Retardo en cuarto frío", hidratacion: "50,0%", grasa: "2,0%", dificultad: null },
      tiempos: { congelacion: "12–14 h", frioPositivo: "Toda la noche (16 °C / 22 °C)", horneado: "~15 min (180 °C ref.)" },
      formula: [
        { ingrediente: "Harina Fortaleza Plus", porcentaje: "70%", peso: "1.765 g" },
        { ingrediente: "Harina débil (Repostería)", porcentaje: "30%", peso: "757 g" },
        { ingrediente: "Agua", peso: "1.261 g" },
        { ingrediente: "Sal", peso: "50 g" },
        { ingrediente: "Manteca panadera", peso: "50 g" },
        { ingrediente: "Levadura seca", peso: "17 g" }
      ],
      produccion: "Masa con hielo y agua → sobado → picado → porcionado → formado → directo a bandejas para congelación.",
      congelacion: "12–14 horas.",
      frioPositivo: "Cuarto frío, 16 °C en verano / 22 °C en invierno; traslado una hora antes del cierre (≈20:00), toda la noche.",
      fermentacion: "Se desarrolla dentro del cuarto frío; al abrir (7:00–8:00) queda 1–2 horas antes de entrar al horno.",
      horneado: "~180 °C, gas 15 min de referencia — ajustar según color y textura.",
      vidaUtil: "7 días, como regla general del método.",
      presentacion: "En bandeja (vitrina) — vida útil en vitrina: 2 días."
    },
    {
      id: "lengua-de-suegra",
      nombre: "Lengua de Suegra",
      rol: "Baja rotación",
      identidad: "Hojaldre rectangular relleno con manjar y baño de chocolate; usa la misma masa que los Pastelitos JQC.",
      rendimiento: "36 piezas por batch.",
      datosRapidos: { pesoUnidad: "~167 g (calculado, incluye relleno)", proceso: "Frío positivo + fermentadora", hidratacion: "50,0%", grasa: "46,3% (incluye empaste)", dificultad: null },
      tiempos: { congelacion: "Después del formado (12–14 h general)", frioPositivo: "Nevera 7–8 °C toda la noche + 1 h fermentadora (27 °C / 80% humedad)", horneado: "~40 min (180 °C ref.)" },
      formula: [
        { ingrediente: "Harina fortaleza", porcentaje: "70%", peso: "1.400 g" },
        { ingrediente: "Harina débil", porcentaje: "30%", peso: "600 g" },
        { ingrediente: "Agua", porcentaje: "50%", peso: "1.000 g" },
        { ingrediente: "Sal", porcentaje: "2%", peso: "40 g" },
        { ingrediente: "Azúcar (detrempe)", porcentaje: "5%", peso: "100 g" },
        { ingrediente: "Manteca panadera", porcentaje: "6,25%", peso: "125 g" },
        { ingrediente: "Maestra Horneo (empaste)", porcentaje: "40%", peso: "800 g" },
        { ingrediente: "Manjar (relleno)", peso: "30 g/pieza" },
        { ingrediente: "Baño de chocolate (cobertura)", peso: "10 g/pieza" },
        { ingrediente: "Azúcar (decorado)", peso: "500 g" }
      ],
      produccion: "Sigue el proceso de la familia de laminados (ver Croissant / Media Luna).",
      congelacion: "Después del formado; duración general del obrador: 12–14 horas.",
      frioPositivo: "Nevera, 7–8 °C, toda la noche.",
      fermentacion: "1 hora en fermentadora a 27 °C y 80% de humedad.",
      horneado: "~180 °C, gas 40 min de referencia — ajustar según color y textura.",
      vidaUtil: "7 días como referencia general (hasta 15 si se comporta igual que Croissant/Media Luna); puede variar según la calidad de la harina.",
      presentacion: "En bandeja (vitrina) — vida útil en vitrina: 2 días."
    }
  ]
};
