/* =========================================================
   ESCENAS DE LAS DECISIONES (8 bits)
   Una animación corta y en bucle del momento de cada decisión.
   Usa el motor de pixel.js y los ayudantes de historias.js
   (ac, icono, equipoControl). Es decorativa: el texto de la
   situación está siempre en HTML. Con "reducir movimiento"
   se ve un solo cuadro fijo.
   ========================================================= */

const ESCENAS_DECISION = {
  opportunity: [
    { fondo: "duna", dur: 3000, actores: [ac("rover", 96, { y: 94, anim: 16, vibra: true }), icono("signo", 96, 52, 0)],
      fx: [{ tipo: "polvo", x: 84, y: 90, n: 14, ancho: 24 }, { tipo: "polvo", x: 110, y: 90, n: 14, ancho: 24, semilla: 4 }] },
    { fondo: "marte", pan: [0, 60], dur: 4000, actores: [ac("rover", 70, { anim: 8 }), icono("signo", 70, 56, 0)] },
  ],
  spirit: [
    { fondo: "marte", dur: 3000, actores: [ac("roverRueda", 96, { vibra: true }), icono("exclamacion", 124, 60, 0, { parpadea: true })] },
    { fondo: "duna", dur: 3000, actores: [ac("roverRueda", 96, { y: 94, anim: 16, vibra: true }), icono("signo", 96, 52, 0)],
      fx: [{ tipo: "polvo", x: 84, y: 90, n: 14, ancho: 24 }] },
  ],
  sojourner: [
    { fondo: "control", pantalla: "marte", dur: 4000, actores: [...equipoControl("marte"), icono("signo", 74, 58, 0), icono("signo", 118, 58, 0.3)] },
    { fondo: "marte", dur: 4000, actores: [ac("roca", 130), ac("sojourner", [60, 110], {}), icono("signo", 150, 60, 0)],
      fx: [{ tipo: "senal", de: [10, 20, 60, 70], desde: 0, hasta: 1 }] },
  ],
  insight: [
    { fondo: "marte", dur: 3500, actores: [ac("estacion", 96, { vibra: true }), icono("signo", 96, 56, 0)] },
    { fondo: "marteAtardecer", dur: 4000, actores: [ac("estacion", 96), icono("signo", 96, 56, 0)],
      fx: [{ tipo: "tormenta", fuerza: 0.25 }] },
  ],
  ingenuity: [
    { fondo: "control", pantalla: "marte", dur: 4000, actores: [...equipoControl("marte"), icono("signo", 96, 58, 0)] },
    { fondo: "marte", dur: 4000, actores: [ac("perseverance", 60), ac("helicoptero", 130, { y: 70, anim: 12, flota: true }), icono("signo", 130, 44, 0)] },
  ],
  viking1: [
    { fondo: "espacio", dur: 4000, actores: [ac("marte", 130, { y: 90 }), ac("near", 60, { y: 50, flota: true }), icono("signo", 60, 30, 0)] },
    { fondo: "control", pantalla: "marte", dur: 4000, actores: [...equipoControl("marte"), icono("exclamacion", 74, 58, 0), icono("signo", 118, 58, 0.3)] },
  ],
  phoenix: [
    { fondo: "laboratorio", dur: 4000, actores: [ac("ingeniera", 70, { y: 96 }), ac("estacion", 130, { y: 94 }), icono("signo", 70, 56, 0)] },
    { fondo: "marte", dur: 4000, actores: [ac("estacion", 80), icono("brillo", 130, 84, 0, { anim: 6, flota: false }), icono("signo", 130, 64, 0)] },
  ],
  apolo11: [
    { fondo: "lunaTierra", dur: 4000, actores: [ac("moduloLunar", 96, { k: [[0, 96, 40], [1, 96, 70]], vibra: true }), icono("exclamacion", 126, 40, 0, { parpadea: true })] },
    { fondo: "luna", dur: 4000, actores: [ac("roca", 60), ac("roca", 78), ac("roca", 70, { escala: 2 }),
      ac("moduloLunar", 96, { k: [[0, 60, 50], [1, 140, 60]] }), icono("signo", 150, 40, 0)] },
  ],
  surveyor3: [
    { fondo: "luna", dur: 4000, actores: [ac("surveyor", 96), icono("signo", 96, 56, 0)], fx: [{ tipo: "polvoLuna", x: 112, y: 90, n: 8, ancho: 12 }] },
    { fondo: "control", pantalla: "luna", dur: 4000, actores: [...equipoControl("luna"), icono("signo", 96, 58, 0)] },
  ],
  "rover-lunar": [
    { fondo: "control", pantalla: "luna", dur: 4000, actores: [...equipoControl("luna"), icono("signo", 96, 58, 0)] },
    { fondo: "lunaMontes", dur: 4000, actores: [ac("moduloBase", 140), ac("lrv", 70), icono("signo", 70, 60, 0)] },
  ],
  alsep12: [
    { fondo: "luna", dur: 3000, actores: [ac("moduloLunar", 28), ac("contenedor", 66), ac("astronautaTira", 88, { espejo: true, vibra: true }), icono("signo", 88, 52, 0)] },
    { fondo: "luna", dur: 4000, actores: [ac("sismometro", 60), ac("moduloAscenso", 140, { y: 40, flota: true }), icono("signo", 140, 20, 0)] },
  ],
  apolo17: [
    { fondo: "control", pantalla: "luna", dur: 4000, actores: [...equipoControl("luna"), icono("signo", 74, 58, 0), icono("signo", 118, 58, 0.4)] },
    { fondo: "lunaTierra", dur: 4000, actores: [ac("moduloLunar", 70), ac("astronauta", 120, { anim: 4 }), icono("signo", 120, 56, 0)] },
  ],
  near: [
    { fondo: "espacio", dur: 4000, actores: [ac("eros", 150, { y: 70 }), ac("near", [40, 90], { y: 50, flota: true }), icono("exclamacion", 90, 30, 0, { parpadea: true })] },
    { fondo: "espacio", dur: 4000, actores: [ac("eros", 110, { y: 90 }), ac("near", 70, { y: 46, flota: true }), icono("signo", 70, 26, 0)] },
  ],
  dawn: [
    { fondo: "control", pantalla: "eros", dur: 4000, actores: [...equipoControl("eros"), icono("signo", 96, 58, 0)] },
    { fondo: "espacio", dur: 4000, actores: [ac("mathilde", 130, { y: 90 }), ac("near", 60, { y: 50, flota: true }), icono("signo", 60, 30, 0)] },
  ],
  pioneer10: [
    { fondo: "espacio", dur: 4000, actores: [ac("mathilde", 40, { y: 40 }), ac("mathilde", 150, { y: 70 }), ac("mathilde", 110, { y: 98 }), ac("mathilde", 70, { y: 92 }),
      ac("near", [20, 170], { y: 64 }), icono("signo", 96, 30, 0)] },
    { fondo: "laboratorio", dur: 4000, actores: [ac("ingeniero", 70, { y: 96 }), ac("ingeniera", 120, { y: 96 }), icono("signo", 96, 56, 0)] },
  ],
  kepler: [
    { fondo: "espacioSol", dur: 4000, actores: [ac("tierra", 140, { y: 80 }), ac("near", 44, { y: 44, flota: true }), icono("signo", 44, 24, 0)] },
    { fondo: "espacioSol", dur: 3000, actores: [ac("near", 50, { y: 46, vibra: true }), icono("exclamacion", 76, 28, 0, { parpadea: true })] },
  ],
};

// Dibuja la escena en bucle dentro de un <canvas>. Devuelve una función para detenerla.
function animarDecision(canvas, escena) {
  if (!escena || typeof Pixel === "undefined") return () => {};
  const reducir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reducir) { Pixel.cuadroEn(canvas, escena, 0.6, 1000); return () => {}; }
  const dur = escena.dur || 4000;
  const inicio = performance.now();
  let id = null;
  function cuadro(ahora) {
    const t = ahora - inicio;
    Pixel.cuadroEn(canvas, escena, (t % dur) / dur, t);
    id = requestAnimationFrame(cuadro);
  }
  id = requestAnimationFrame(cuadro);
  return () => cancelAnimationFrame(id);
}
