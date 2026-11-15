/* =========================================================
   ALMACÉN LOCAL — el perfil de la persona vive SOLO en este navegador.
   No hay servidor, cuentas, códigos ni métricas: nada sale del dispositivo.

   Local.jugador()            → perfil guardado { edad, experiencia, nivel } o null
   Local.crearJugador(datos)  → guarda el perfil en este navegador
   Local.cambiarNivel(nivel)
   Local.olvidarJugador()     → borra el perfil (el progreso se borra aparte)
   ========================================================= */

const Local = (() => {
  const CLAVE_JUGADOR = "detectives-jugador";
  const CAMPOS = ["edad", "experiencia", "nivel"];

  // Solo se aceptan valores conocidos: lo guardado puede venir alterado
  function limpio(j) {
    if (!j || typeof j !== "object") return null;
    const r = {};
    for (const c of CAMPOS) {
      if (typeof j[c] !== "string" || !/^[a-z0-9-]{1,20}$/.test(j[c])) return null;
      r[c] = j[c];
    }
    return r;
  }

  function jugador() {
    try { return limpio(JSON.parse(localStorage.getItem(CLAVE_JUGADOR) || "null")); } catch (e) { return null; }
  }

  function guardarJugador(j) {
    try { localStorage.setItem(CLAVE_JUGADOR, JSON.stringify(limpio(j))); } catch (e) { /* sin almacenamiento: el juego sigue */ }
  }

  function olvidarJugador() {
    try { localStorage.removeItem(CLAVE_JUGADOR); } catch (e) {}
  }

  function crearJugador(datos) {
    const j = { edad: datos.edad, experiencia: datos.experiencia, nivel: datos.nivel };
    guardarJugador(j);
    return j;
  }

  function cambiarNivel(nivel) {
    const j = jugador();
    if (!j) return;
    j.nivel = nivel;
    guardarJugador(j);
  }

  return { jugador, crearJugador, cambiarNivel, olvidarJugador };
})();
