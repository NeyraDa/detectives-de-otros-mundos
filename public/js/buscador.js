/* =========================================================
   BUSCADOR  —  iniciarBusqueda(contenedor, equipo, alTerminar)
   Tres modos de búsqueda:
   - "orbita":  foto real (desde órbita o tomada por la nave)
   - "mapa":    mapa global real con latitud y longitud
   - "esquema": esquema del Sistema Solar dibujado para el juego
   Cada toque deja una marca de color según la cercanía.
   Devuelve una función de limpieza (la usa app.js).
   ========================================================= */

function calcularEstrellas(intentos, pistas) {
  if (pistas === 0 && intentos <= 3) return 3;
  if (pistas <= 1 && intentos <= 8) return 2;
  return 1;
}

function estrellasTexto(n) {
  return "★".repeat(n) + "☆".repeat(3 - n);
}

function formatoTiempo(segundos) {
  const m = Math.floor(segundos / 60);
  const s = segundos % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

function formatoCoordenadas(u) {
  const n = (v) => {
    const r = String(Math.round(Math.abs(v) * 10) / 10);
    return idioma === "es" ? r.replace(".", ",") : r;
  };
  return `${n(u.lat)}° ${u.lat >= 0 ? t("norte") : t("sur")}, ${n(u.lon)}° ${u.lon >= 0 ? t("este") : t("oeste")}`;
}

function iniciarBusqueda(contenedor, equipo, alTerminar) {
  const foto = equipo.foto;
  const modo = foto.modo;
  // El nivel de detective decide cuánta ayuda hay (ver niveles.js)
  const reglas = reglasNivel();
  const pistas = foto.pistas.slice(0, reglas.pistas);
  const pistasGratis = reglas.pistaGratis && pistas.length > 0 ? 1 : 0;
  let imagen, credito, obj, etiqueta, nota = "";
  if (modo === "mapa") {
    const m = MAPAS[equipo.lugar];
    imagen = m.imagen; credito = m.credito[idioma]; obj = objetivoEnMapa(equipo);
    etiqueta = t("buscarMapa", { lugar: t("de_" + equipo.lugar) });
    nota = t("notaMapa", { lugar: t("de_" + equipo.lugar) });
  } else if (modo === "esquema") {
    imagen = ESQUEMA.imagen(); credito = ESQUEMA.credito[idioma]; obj = objetivoEnMapa(equipo);
    etiqueta = t("buscarEsquema");
    nota = t("notaEsquema");
  } else {
    imagen = foto.imagen; credito = foto.credito; obj = foto.objetivo;
    etiqueta = foto.fotoNave ? t("buscarFotoNave") : t("buscarOrbita", { lugar: t("de_" + equipo.lugar) });
  }
  const verbo = modo === "orbita" ? t("encuentra") : t("ubica");
  const queBuscar = equipo.buscar || equipo.nombre;
  const reducirMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let pistasMostradas = 0;
  let intentos = 0;
  let encontrado = false;
  let segundos = 0;
  const marcas = [];

  contenedor.innerHTML = `
    <section class="pantalla buscador lugar-${equipo.lugar}">
        ${pasosCaso(1)}
      <div class="caso-cabecera">
        <p class="caso-numero">${etiqueta}</p>
        <h1>${verbo} ${queBuscar}</h1>
        ${nota ? `<p class="caso-nota">${nota}</p>` : ""}
        <div class="marcador" aria-live="off">
          <span title="${t("tiempo")}">⏱ <b id="tiempo">0:00</b></span>
          <span title="${t("intentos")}">🎯 <b id="intentos">0</b></span>
          <span title="${t("pistasUsadas")}">💡 <b id="usadas">0</b>/${pistas.length}</span>
        </div>
        <p class="nivel-chip">${t("nivelChip", { n: t("nivel_" + nivelActual()) })}</p>
      </div>

      <div class="visor-caja">
        <div id="visor" class="visor"></div>
        <div class="zoom-botones">
          <button type="button" data-zoom="1.6" aria-label="${t("acercar")}">＋</button>
          <button type="button" data-zoom="0.6" aria-label="${t("alejar")}">－</button>
          <button type="button" data-zoom="inicio" aria-label="${t("verTodo")}">⤢</button>
        </div>
        <p class="visor-ayuda">${t("ayudaVisor")}</p>
      </div>

      ${reglas.termometro ? `
      <div class="termometro" aria-hidden="true">
        <span class="termometro-frio">${t("frio")}</span>
        <div class="termometro-barra"><div id="termometro-aguja" class="termometro-aguja"></div></div>
        <span class="termometro-caliente">${t("caliente")}</span>
      </div>` : `<p class="caso-nota sin-termometro">${t("sinTermometro")}</p>`}
      <p id="mensaje" class="mensaje" aria-live="polite">${t("msgInicio")}</p>

      <div id="exito" class="exito" hidden>
        <p class="exito-titulo">${t("casoResuelto")}</p>
        <p id="exito-estrellas" class="exito-estrellas"></p>
        <p id="exito-detalle" class="exito-detalle"></p>
        <button type="button" id="btn-seguir" class="btn principal">${t("viveMision")}</button>
      </div>

      <div class="pistas-caja">
        <button type="button" id="btn-pista" class="btn secundario">${t("pedirPista")}</button>
        <ol id="pistas" class="pistas"></ol>
      </div>

      <p class="credito">${t("imagen")}: ${credito}</p>
    </section>
  `;

  const $ = (sel) => contenedor.querySelector(sel);
  const mensaje = $("#mensaje");
  const aguja = $("#termometro-aguja");

  const visor = OpenSeadragon({
    element: $("#visor"),
    tileSources: { type: "image", url: imagen },
    showNavigationControl: false,
    gestureSettingsMouse: { clickToZoom: false },
    gestureSettingsTouch: { clickToZoom: false },
    visibilityRatio: 1,
    constrainDuringPan: true,
    maxZoomPixelRatio: 4,
    animationTime: reducirMovimiento ? 0 : 0.9
  });

  // Modo mapa: la nave real no se ve (cada píxel mide km), así que su dibujo
  // queda en el lugar exacto y solo aparece al acercarse con el zoom.
  let nave = null;
  let avisoNave = false;
  if (modo === "mapa") {
    nave = document.createElement("div");
    nave.className = "nave-en-mapa";
    nave.style.opacity = "0";
    nave.innerHTML = ilustracion(equipo);
    const ancho = obj.radio * 1.9, alto = ancho * 110 / 160;
    visor.addHandler("open", () => {
      visor.addOverlay({ element: nave, location: visor.viewport.imageToViewportRectangle(obj.x - ancho / 2, obj.y - alto / 2, ancho, alto) });
      actualizarNave();
    });
    visor.addHandler("animation", actualizarNave);
    visor.addHandler("resize", actualizarNave);
  }

  function actualizarNave() {
    if (!nave) return;
    if (encontrado) { nave.style.opacity = "1"; return; }
    const vp = visor.viewport;
    const a = vp.imageToViewerElementCoordinates(new OpenSeadragon.Point(0, 0));
    const b = vp.imageToViewerElementCoordinates(new OpenSeadragon.Point(100, 0));
    const escala = (b.x - a.x) / 100;          // píxeles de pantalla por píxel del mapa
    const opacidad = Math.min(1, Math.max(0, (escala - 1.2) / 0.8));
    nave.style.opacity = opacidad.toFixed(2);
    if (opacidad > 0.6 && !avisoNave) {
      const c = vp.imageToViewerElementCoordinates(new OpenSeadragon.Point(obj.x, obj.y));
      const caja = visor.container.getBoundingClientRect();
      if (c.x > 0 && c.y > 0 && c.x < caja.width && c.y < caja.height) {
        avisoNave = true;
        decir(t("msgNaveVisible"), "caliente");
      }
    }
  }

  visor.addHandler("open-failed", () => decir(t("errorFoto", { img: imagen }), "frio"));

  const reloj = setInterval(() => {
    if (encontrado) return;
    segundos++;
    $("#tiempo").textContent = formatoTiempo(segundos);
  }, 1000);

  function decir(texto, tipo) {
    mensaje.textContent = texto;
    mensaje.className = "mensaje " + (tipo || "");
  }

  // 0 = lejísimos, 1 = encima
  function cercania(distancia, radio) {
    if (distancia <= radio) return 1;
    return Math.max(0, 1 - Math.log(distancia / radio) / Math.log(60));
  }

  function ponerMarca(punto, calor) {
    const el = document.createElement("div");
    el.className = "marca-intento";
    el.style.setProperty("--calor", calor.toFixed(2));
    visor.addOverlay({ element: el, location: visor.viewport.imageToViewportCoordinates(punto.x, punto.y), placement: OpenSeadragon.Placement.CENTER });
    marcas.push(el);
    if (marcas.length > 10) visor.removeOverlay(marcas.shift());
  }

  visor.addHandler("canvas-click", (evento) => {
    if (!evento.quick || encontrado) return;   // si fue arrastre, no cuenta
    const p = visor.viewport.viewportToImageCoordinates(visor.viewport.pointFromPixel(evento.position));
    const distancia = Math.hypot(p.x - obj.x, p.y - obj.y);
    const calor = cercania(distancia, obj.radio);

    intentos++;
    $("#intentos").textContent = intentos;
    if (aguja) aguja.style.setProperty("--calor", calor.toFixed(2));

    if (distancia <= obj.radio) return acertar();

    if (!reglas.termometro) {
      // Nivel experto: sin pistas de calor, solo "no está ahí"
      ponerMarca(p, 0);
      Sonido.sonar("calor", 0);
      return decir(t("msgNoEsta"), "frio");
    }
    ponerMarca(p, calor);
    Sonido.sonar("calor", calor);
    if (calor > 0.75) decir(t("msgQuemando"), "caliente");
    else if (calor > 0.5) decir(t("msgCaliente"), "caliente");
    else if (calor > 0.25) decir(t("msgTibio"), "tibio");
    else decir(t("msgFrio"), "frio");
  });

  function acertar() {
    encontrado = true;
    clearInterval(reloj);
    const pagadas = pistasMostradas - pistasGratis;   // la pista de regalo no quita estrellas
    const estrellas = calcularEstrellas(intentos, pagadas);
    guardarResultado(equipo.id, { estrellas, segundos, intentos, pistas: pagadas });

    marcas.forEach((m) => visor.removeOverlay(m));
    const marca = document.createElement("div");
    marca.className = "marca-encontrado";
    const lado = obj.radio * 3;
    const rect = visor.viewport.imageToViewportRectangle(obj.x - lado / 2, obj.y - lado / 2, lado, lado);
    visor.addOverlay({ element: marca, location: rect });
    if (nave) {
      nave.classList.add("encontrada");
      nave.style.opacity = "1";
      visor.viewport.fitBounds(visor.viewport.imageToViewportRectangle(obj.x - lado * 2.5, obj.y - lado * 1.5, lado * 5, lado * 3));
    } else {
      visor.viewport.panTo(rect.getCenter());
    }

    Sonido.sonar("acierto");
    if (!reducirMovimiento && typeof confetti === "function") {
      const colores = { marte: ["#D2603F", "#F2C14E", "#ffffff"], luna: ["#C7CBD8", "#F2C14E", "#ffffff"], espacio: ["#8FA2FF", "#F2C14E", "#ffffff"] }[equipo.lugar];
      confetti({ particleCount: 140, spread: 80, origin: { y: 0.55 }, colors: colores, disableForReducedMotion: true });
    }

    decir("", "");
    $("#btn-pista").hidden = true;
    $("#exito-estrellas").textContent = estrellasTexto(estrellas);
    $("#exito-estrellas").setAttribute("aria-label", t("estrellasDe", { n: estrellas }));
    const textoPistas = pagadas
      ? t("conPistas", { n: pagadas, pistas: pagadas === 1 ? t("pista1") : t("pistaN") })
      : t("sinPistas");
    $("#exito-detalle").textContent =
      t("detalleExito", { t: formatoTiempo(segundos), n: intentos, intentos: intentos === 1 ? t("intento1") : t("intentoN"), pistas: textoPistas }) +
      (equipo.ubicacion ? t("coordenadas", { c: formatoCoordenadas(equipo.ubicacion) }) : "");
    $("#exito").hidden = false;
    $("#btn-seguir").focus({ preventScroll: true });
    $("#exito").scrollIntoView({ behavior: reducirMovimiento ? "auto" : "smooth", block: "nearest" });
  }

  function mostrarPista(deRegalo) {
    if (pistasMostradas >= pistas.length) return;
    const li = document.createElement("li");
    li.textContent = pistas[pistasMostradas];
    if (deRegalo) {
      const etiquetaRegalo = document.createElement("span");
      etiquetaRegalo.className = "pista-regalo";
      etiquetaRegalo.textContent = t("pistaGratis");
      li.prepend(etiquetaRegalo, " ");
    }
    $("#pistas").appendChild(li);
    pistasMostradas++;
    $("#usadas").textContent = pistasMostradas;
    const quedan = pistas.length - pistasMostradas;
    $("#btn-pista").textContent = quedan > 0 ? t("otraPista", { n: quedan }) : t("sinMasPistas");
    $("#btn-pista").disabled = quedan === 0;
  }

  $("#btn-pista").addEventListener("click", () => {
    if (pistasMostradas >= pistas.length) return;
    Sonido.sonar("elegir");
    mostrarPista(false);
  });

  if (pistasGratis) mostrarPista(true);
  if (pistas.length === 0) $("#btn-pista").hidden = true;

  contenedor.querySelectorAll("[data-zoom]").forEach((boton) => {
    boton.addEventListener("click", () => {
      const valor = boton.dataset.zoom;
      if (valor === "inicio") visor.viewport.goHome();
      else visor.viewport.zoomBy(parseFloat(valor));
    });
  });

  $("#btn-seguir").addEventListener("click", () => alTerminar());

  return () => {
    clearInterval(reloj);
    visor.destroy();
  };
}
