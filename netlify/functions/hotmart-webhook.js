/**
 * FUNCIÓN — Recibe el webhook de Hotmart, genera un código de acceso
 * y lo manda por email al comprador.
 *
 * URL una vez desplegado: https://TU-SITIO.netlify.app/.netlify/functions/hotmart-webhook
 * Esa es la URL que se configura en Hotmart: Producto → Webhook (Postback).
 *
 * Variables de entorno necesarias (Netlify → Site settings → Environment variables):
 *   HOTMART_HOTTOK   → el token que Hotmart muestra al crear el webhook
 *   RESEND_API_KEY   → API key de resend.com (o cambiar por el proveedor de email que uses)
 *   RESEND_FROM      → remitente verificado, ej. "Panksero <acceso@tudominio.cl>"
 *   SITE_URL         → URL pública de la app, ej. "https://usuario.github.io/panksero-app"
 *
 * Guarda cada código válido en Netlify Blobs (incluido en Netlify, sin
 * base de datos aparte) para que verificar-codigo.js pueda chequearlo.
 */
const { getStore } = require("@netlify/blobs");

function generarCodigo() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // sin caracteres confusos (0/O, 1/I)
  let codigo = "";
  for (let i = 0; i < 8; i++) {
    codigo += chars[Math.floor(Math.random() * chars.length)];
  }
  return codigo.slice(0, 4) + "-" + codigo.slice(4);
}

async function enviarEmail(destinatario, codigo) {
  const siteUrl = process.env.SITE_URL || "";
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + process.env.RESEND_API_KEY,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: process.env.RESEND_FROM,
      to: destinatario,
      subject: "Tu acceso a Método Panksero",
      html:
        "<p>¡Gracias por tu compra!</p>" +
        "<p>Tu código de acceso a Método Panksero es:</p>" +
        "<p style='font-size:24px;font-weight:bold;letter-spacing:2px'>" + codigo + "</p>" +
        (siteUrl ? "<p>Ingresalo acá: <a href='" + siteUrl + "'>" + siteUrl + "</a></p>" : "") +
        "<p>Guardalo — lo vas a necesitar cada vez que entres desde un dispositivo nuevo.</p>"
    })
  });
  if (!res.ok) {
    const texto = await res.text();
    throw new Error("Error enviando email: " + texto);
  }
}

exports.handler = async function (event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method not allowed" };
  }

  // Hotmart manda el token en este header — hay que validarlo siempre.
  const hottokRecibido = event.headers["x-hotmart-hottok"] || event.headers["X-HOTMART-HOTTOK"];
  if (!hottokRecibido || hottokRecibido !== process.env.HOTMART_HOTTOK) {
    return { statusCode: 401, body: "Token inválido" };
  }

  let payload;
  try {
    payload = JSON.parse(event.body);
  } catch (e) {
    return { statusCode: 400, body: "Payload inválido" };
  }

  // Solo procesamos compras aprobadas. El nombre exacto del evento puede
  // variar según versión del webhook (1.0.0 vs 2.0.0) — revisar el
  // payload real la primera vez (Hotmart deja ver un log de pruebas)
  // y ajustar esta condición si hace falta.
  const evento = payload.event || "";
  if (evento !== "PURCHASE_APPROVED" && evento !== "PURCHASE_COMPLETE") {
    return { statusCode: 200, body: "Evento ignorado: " + evento };
  }

  const email =
    (payload.data && payload.data.buyer && payload.data.buyer.email) ||
    (payload.data && payload.data.subscriber && payload.data.subscriber.email);

  if (!email) {
    return { statusCode: 400, body: "No se encontró email del comprador en el payload" };
  }

  const codigo = generarCodigo();

  const store = getStore("codigos-acceso");
  await store.setJSON(codigo, {
    email: email,
    producto: (payload.data && payload.data.product && payload.data.product.name) || "desconocido",
    fecha: new Date().toISOString()
  });

  try {
    await enviarEmail(email, codigo);
  } catch (err) {
    // El código ya quedó guardado igual; si falla el email, se puede
    // reenviar manualmente desde el panel de Hotmart (reintento de webhook)
    // o buscando el código en Netlify Blobs.
    console.error(err);
    return { statusCode: 500, body: "Código generado pero falló el envío de email" };
  }

  return { statusCode: 200, body: "OK" };
};
