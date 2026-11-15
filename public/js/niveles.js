/* =========================================================
   NIVELES DE DETECTIVE
   La historia y los datos son los mismos para todos;
   lo que cambia es cuánta ayuda recibe cada persona.
   ========================================================= */

const NIVELES = {
  // Más ayuda: la primera pista aparece gratis al empezar
  aprendiz:     { pistas: 3, pistaGratis: true,  termometro: true },
  // El juego clásico
  investigador: { pistas: 3, pistaGratis: false, termometro: true },
  // Una sola pista y sin termómetro: hay que razonar con las coordenadas y la imagen
  experto:      { pistas: 1, pistaGratis: false, termometro: false }
};

const ORDEN_NIVELES = ["aprendiz", "investigador", "experto"];

function nivelActual() {
  const j = Local.jugador();
  return j && NIVELES[j.nivel] ? j.nivel : "investigador";
}

function reglasNivel() {
  return NIVELES[nivelActual()];
}

// Sugiere un nivel según la edad y lo que la persona sabe
function nivelSugerido(edad, experiencia) {
  if (experiencia === "aficionado") return "experto";
  if (experiencia === "nada") return edad === "adulto" ? "investigador" : "aprendiz";
  return "investigador";
}
