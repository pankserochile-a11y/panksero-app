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
      precio: 29990,
      tipo: "Pago único",
      destacado: true,
      incluye: [
        "Libro completo (17 capítulos + Prólogo)",
        "Fichas técnicas de las familias de masa",
        "Buscador de errores por síntoma"
      ],
      cta: {
        texto: "Comprar ahora →",
        url: "PENDIENTE_LINK_HOTMART"
      }
    },
    {
      id: "asesoria",
      nombre: "Asesoría Guiada Online",
      precio: 550000,
      tipo: "Pago único",
      duracion: "Acompañamiento personalizado de 7 días",
      destacado: false,
      incluye: [
        "Todo lo de El Método",
        "Revisión de tu fórmula y tu cámara de frío conmigo",
        "Acompañamiento directo por WhatsApp durante 7 días"
      ],
      cta: {
        texto: "Coordinar por WhatsApp →",
        url: "https://wa.me/56972930305?text=Hola%20Panka%2C%20quiero%20informaci%C3%B3n%20sobre%20la%20Asesor%C3%ADa%20Guiada%20Online%20de%207%20d%C3%ADas"
      }
    }
  ]
};
