/* =========================================================
   MUNDOS: mapas, esquema y cálculo del objetivo.
   Los casos (EQUIPOS y EQUIPOS_EN) ya no están aquí: los entrega
   el servidor (app/Data/casos.json) en datos/casos
   ========================================================= */

const MAPAS = {
  marte: { imagen: "img/mapas/marte.jpg", ancho: 2048, alto: 1024,
    credito: { es: "Mosaico Viking MDIM 2.1: NASA/USGS, vía NASA Solar System Treks", en: "Viking MDIM 2.1 mosaic: NASA/USGS, via NASA Solar System Treks" } },
  luna:  { imagen: "img/mapas/luna.jpg",  ancho: 2048, alto: 1024,
    credito: { es: "Mosaico LRO WAC: NASA/GSFC/Arizona State University, vía NASA Solar System Treks", en: "LRO WAC mosaic: NASA/GSFC/Arizona State University, via NASA Solar System Treks" } }
};

// Esquema del Sistema Solar (dibujado para el juego, distancias no a escala)
const ESQUEMA = {
  imagen: () => `img/esquema/sistema-${typeof idioma !== "undefined" ? idioma : "es"}.png`,
  ancho: 2400, alto: 1400,
  credito: { es: "Esquema dibujado para el juego (no es una foto; distancias no a escala)", en: "Sketch drawn for the game (not a photo; distances not to scale)" }
};

// Calcula el objetivo en el mapa a partir de la ubicación
function objetivoEnMapa(equipo) {
  if (equipo.foto.modo === "esquema") return { x: equipo.posicionEsquema.x, y: equipo.posicionEsquema.y, radio: 40 };
  const m = MAPAS[equipo.lugar];
  return {
    x: ((equipo.ubicacion.lon + 180) / 360) * m.ancho,
    y: ((90 - equipo.ubicacion.lat) / 180) * m.alto,
    radio: 30
  };
}
