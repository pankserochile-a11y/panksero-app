/**
 * FUNCIÓN — Verifica si un código de acceso es válido.
 * La app le pega acá (fetch) cuando alguien ingresa un código
 * en el muro de acceso.
 *
 * Devuelve { valido: true } o { valido: false }.
 * CORS abierto porque la app vive en otro dominio (GitHub Pages).
 */
const { getStore } = require("@netlify/blobs");

const HEADERS_CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type"
};

exports.handler = async function (event) {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers: HEADERS_CORS, body: "" };
  }
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers: HEADERS_CORS, body: "Method not allowed" };
  }

  let body;
  try {
    body = JSON.parse(event.body);
  } catch (e) {
    return { statusCode: 400, headers: HEADERS_CORS, body: JSON.stringify({ valido: false }) };
  }

  const codigo = (body.codigo || "").trim().toUpperCase();
  if (!codigo) {
    return { statusCode: 200, headers: HEADERS_CORS, body: JSON.stringify({ valido: false }) };
  }

  const store = getStore("codigos-acceso");
  const registro = await store.get(codigo, { type: "json" });

  return {
    statusCode: 200,
    headers: HEADERS_CORS,
    body: JSON.stringify({ valido: !!registro })
  };
};
