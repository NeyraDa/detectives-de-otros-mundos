/* =========================================================
   ORQUESTADOR
   Decide qué pantalla se muestra y en qué orden:
   Perfil (primera vez) → Inicio → Buscador → Misión → Despedida → Archivo de casos
   ========================================================= */

const contenedorApp = document.getElementById("app");
let limpiarPantalla = null;
let pantallaActual = null;   // para redibujar al cambiar de idioma

// Equipos con los textos del idioma actual
function equiposLocales() {
  return EQUIPOS.map(loc);
}

// Cambia de pantalla limpiando la anterior.
// "dibujar" recibe el contenedor; si devuelve una función, se usa para limpiar.
function cambiarPantalla(dibujar) {
  if (typeof limpiarPantalla === "function") limpiarPantalla();
  limpiarPantalla = null;
  contenedorApp.innerHTML = "";
  window.scrollTo(0, 0);
  const resultado = dibujar(contenedorApp);
  if (typeof resultado === "function") limpiarPantalla = resultado;
  actualizarBarra();
  const titulo = contenedorApp.querySelector("h1");
  if (titulo) { titulo.tabIndex = -1; titulo.focus({ preventScroll: true }); }
}

function actualizarContador() {
  const p = contarProgreso(EQUIPOS);
  const el = document.getElementById("contador");
  el.textContent = `★ ${p.estrellas}`;
  el.setAttribute("aria-label", t("estrellas", { n: p.estrellas, max: p.maxEstrellas }));
}

function actualizarBarra() {
  actualizarContador();
  document.getElementById("marca-texto").innerHTML = t("marca");
  document.getElementById("btn-inicio").setAttribute("aria-label", t("irInicio"));
  const bi = document.getElementById("btn-idioma");
  bi.textContent = idioma === "es" ? "EN" : "ES";
  bi.setAttribute("aria-label", t("cambiarIdioma"));
  pintarSonido();
}

// Menores de 14: historias animadas en 8 bits (sin juego). Resto: el juego de búsqueda.
function esMenor() {
  const j = Local.jugador();
  return !!j && j.edad === "nino";
}

// 18 o más (docentes, tutores): archivo de misiones. Pueden pasar al juego cuando quieran.
function esAdulto() {
  const j = Local.jugador();
  return !!j && j.edad === "adulto";
}
let adultoJugando = false;   // solo en memoria: no se guarda

function irAlInicio() {
  pantallaActual = irAlInicio;
  if (esMenor()) cambiarPantalla((c) => mostrarHistorias(c, irAHistoria));
  else if (esAdulto() && !adultoJugando) cambiarPantalla((c) => mostrarArchivo(c, equiposLocales(), irAExpediente, () => { adultoJugando = true; irAlInicio(); }));
  else cambiarPantalla((c) => mostrarInicio(c, equiposLocales(), empezarRecorrido, irATrofeos));
}

function irAlArchivo() {
  adultoJugando = false;
  irAlInicio();
}

function irAExpediente(id) {
  pantallaActual = () => irAExpediente(id);
  const local = loc(EQUIPOS.find((e) => e.id === id));
  cambiarPantalla((c) => verExpediente(c, local, irAlArchivo, (eq) => { adultoJugando = true; empezarRecorrido(eq); }));
}

function irAHistoria(id) {
  pantallaActual = () => irAHistoria(id);
  cambiarPantalla((c) => verHistoria(c, id, irAlInicio));
}

function irAlPerfil() {
  pantallaActual = irAlPerfil;
  cambiarPantalla((c) => mostrarPerfil(c, () => { adultoJugando = false; irAlInicio(); }));
}

function irATrofeos() {
  pantallaActual = irATrofeos;
  cambiarPantalla((c) => mostrarTrofeos(c, equiposLocales(), irAlInicio));
}

function empezarRecorrido(equipo) {
  const id = equipo.id;
  const local = () => loc(EQUIPOS.find((e) => e.id === id));
  pantallaActual = () => empezarRecorrido(local());
  cambiarPantalla((c) => iniciarBusqueda(c, local(), () => {
    marcarEncontrado(id);
    pantallaActual = null;
    cambiarPantalla((c2) => iniciarMision(c2, local(), () => {
      cambiarPantalla((c3) => mostrarDespedida(c3, local(), irATrofeos));
    }));
  }));
}

document.getElementById("btn-inicio").addEventListener("click", irAlInicio);

document.getElementById("btn-idioma").addEventListener("click", () => {
  cambiarIdioma(idioma === "es" ? "en" : "es");
  if (typeof pantallaActual === "function") pantallaActual();
  else irAlInicio();
});

const btnSonido = document.getElementById("btn-sonido");
function pintarSonido() {
  const activo = Sonido.estaActivo();
  btnSonido.textContent = activo ? "🔊" : "🔇";
  btnSonido.setAttribute("aria-pressed", String(activo));
  btnSonido.setAttribute("aria-label", activo ? t("sonidoOn") : t("sonidoOff"));
}
btnSonido.addEventListener("click", () => {
  const activo = Sonido.alternar();
  pintarSonido();
  // Si se vuelve a activar en medio de una decisión, regresa la música
  if (activo && document.querySelector(".mision .opcion:not([disabled])")) Sonido.musica("tension");
});

// Primera visita: test de detective. Si ya tiene perfil, directo al inicio.
if (Local.jugador()) irAlInicio();
else irAlPerfil();

actualizarContador();
