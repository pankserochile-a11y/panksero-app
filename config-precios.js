/**
 * CONFIGURACIÓN — Precios y niveles de la oferta
 * Método Panksero
 *
 * Editar los precios y textos acá, en un solo lugar. La página de
 * oferta (app.js → renderOferta) lee de este archivo, nunca tiene
 * números escritos directo.
 */
window.PRECIOS = {
  moneda: "CLP",
  niveles: [
    {
      id: "metodo",
      nombre: "El Método",
      precio: 19990,
      tipo: "Pago único",
      destacado: false,
      incluye: [
        "Libro completo (17 capítulos + Prólogo)",
        "Fichas técnicas de las familias de masa disponibles",
        "Buscador de errores por síntoma"
      ]
    },
    {
      id: "sistema",
      nombre: "Método + Sistema",
      precio: 39990,
      tipo: "Pago único",
      destacado: true,
      incluye: [
        "Todo lo de El Método",
        "Calculadora de costos (masa, empaste, margen)",
        "Calculadora de recetas (escalado y porcentaje panadero)",
        "Los 8 Bonos (plantillas y herramientas)",
        "Plan de implementación de 7 días"
      ]
    },
    {
      id: "implementacion",
      nombre: "Implementación guiada",
      precio: 150000,
      tipo: "Desde",
      destacado: false,
      incluye: [
        "Todo lo de Método + Sistema",
        "Revisión de fórmula y cámara de frío conmigo",
        "Acompañamiento por WhatsApp durante 7 días"
      ]
    }
  ]
};
