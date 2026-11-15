/* =========================================================
   PROGRESO  (Contrato 3)
   Guarda en el navegador qué casos se resolvieron y con
   cuántas estrellas. Si el jugador tiene código, servidor.js
   también lo guarda en la base de datos.
   ========================================================= */

const CLAVE_PROGRESO = "detectives-progreso";

function leerProgreso() {
  try {
    const guardado = JSON.parse(localStorage.getItem(CLAVE_PROGRESO) || "null");
    if (Array.isArray(guardado)) return { encontrados: guardado, resultados: {} }; // formato viejo
    if (guardado && guardado.encontrados) return guardado;
  } catch (e) {}
  return { encontrados: [], resultados: {} };
}

function escribirProgreso(datos) {
  try { localStorage.setItem(CLAVE_PROGRESO, JSON.stringify(datos)); } catch (e) {}
}

function obtenerEncontrados() {
  return leerProgreso().encontrados;
}

function estaEncontrado(id) {
  return obtenerEncontrados().includes(id);
}

function marcarEncontrado(id) {
  const datos = leerProgreso();
  if (!datos.encontrados.includes(id)) {
    datos.encontrados.push(id);
    escribirProgreso(datos);
  }
}

// resultado: { estrellas: 1-3, segundos, intentos, pistas }
// Se guarda el mejor resultado (más estrellas).
function guardarResultado(id, resultado) {
  const datos = leerProgreso();
  const previo = datos.resultados[id];
  if (!previo || resultado.estrellas > previo.estrellas) {
    datos.resultados[id] = resultado;
  }
  if (!datos.encontrados.includes(id)) datos.encontrados.push(id);
  escribirProgreso(datos);
}

function obtenerResultado(id) {
  return leerProgreso().resultados[id] || null;
}

function reiniciarProgreso() {
  try { localStorage.removeItem(CLAVE_PROGRESO); } catch (e) {}
}
