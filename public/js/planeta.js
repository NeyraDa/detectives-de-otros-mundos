/* =========================================================
   PLANETA — globo de Marte o la Luna con la textura real de
   NASA, que gira solo y se puede arrastrar con el dedo.
   Cada equipo es un alfiler en su latitud/longitud real.
   dibujarPlaneta(lugar, equipos, alElegir) → { elemento, detener }
   ========================================================= */

const PLANETAS = {
  marte: { nombre: "Marte", textura: () => TEXTURA_MARTE, halo: "rgba(255, 130, 90, 0.55)", inclinacion: 0.32, inicio: -40, brillo: 1.15 },
  luna:  { nombre: "la Luna", textura: () => TEXTURA_LUNA, halo: "rgba(210, 220, 255, 0.35)", inclinacion: 0.22, inicio: -5, brillo: 1.6 }
};

const cacheTexturas = {};

function cargarTextura(lugar) {
  if (cacheTexturas[lugar]) return Promise.resolve(cacheTexturas[lugar]);
  return new Promise((resolver) => {
    const img = new Image();
    img.onload = () => {
      const c = document.createElement("canvas");
      c.width = img.width; c.height = img.height;
      const ctx = c.getContext("2d");
      ctx.drawImage(img, 0, 0);
      const datos = { w: img.width, h: img.height, px: ctx.getImageData(0, 0, img.width, img.height).data };
      cacheTexturas[lugar] = datos;
      resolver(datos);
    };
    img.src = PLANETAS[lugar].textura();
  });
}

function dibujarPlaneta(lugar, equipos, alElegir) {
  const p = PLANETAS[lugar];
  const reducirMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const TAM = 360;                 // resolución interna del globo
  const R = TAM / 2 - 2;
  const incl = p.inclinacion;
  let lon0 = p.inicio;             // longitud que mira hacia nosotros
  let activo = true;
  let pausado = false;
  let arrastrando = null;
  let ultimo = performance.now();

  const caja = document.createElement("div");
  caja.className = "planeta planeta-" + lugar;
  caja.style.setProperty("--halo", p.halo);
  caja.innerHTML = `<canvas width="${TAM}" height="${TAM}" role="img" aria-label="${t("globo", { lugar: t("de_" + lugar) })}"></canvas>
    <p class="planeta-ayuda" aria-hidden="true">${t("arrastra")}</p>`;
  const lienzo = caja.querySelector("canvas");
  const ctx = lienzo.getContext("2d");
  const imagen = ctx.createImageData(TAM, TAM);

  // Precalcular, para cada píxel del disco, latitud y desplazamiento de longitud
  const N = TAM * TAM;
  const latFila = new Float32Array(N);
  const dLon = new Float32Array(N);
  const luz = new Float32Array(N);
  const dentro = new Uint8Array(N);
  const L = (() => { const v = [-0.45, 0.5, 0.75]; const m = Math.hypot(...v); return v.map((a) => a / m); })();
  for (let j = 0; j < TAM; j++) {
    for (let i = 0; i < TAM; i++) {
      const x = (i + 0.5 - TAM / 2) / R;
      const y = -(j + 0.5 - TAM / 2) / R;
      const r2 = x * x + y * y;
      const k = j * TAM + i;
      if (r2 > 1) continue;
      dentro[k] = 1;
      const z = Math.sqrt(1 - r2);
      // deshacer la inclinación (giro sobre el eje X)
      const yy = y * Math.cos(incl) + z * Math.sin(incl);
      const zz = -y * Math.sin(incl) + z * Math.cos(incl);
      latFila[k] = Math.asin(Math.max(-1, Math.min(1, yy))) * 180 / Math.PI;
      dLon[k] = Math.atan2(x, zz) * 180 / Math.PI;
      const difusa = Math.max(0, x * L[0] + y * L[1] + z * L[2]);
      const borde = Math.pow(z, 0.35);
      luz[k] = (0.18 + 0.95 * difusa) * borde * p.brillo;
    }
  }

  // Alfileres
  const alfileres = equipos.filter((e) => e.ubicacion).map((e) => {
    const hallado = estaEncontrado(e.id);
    const b = document.createElement("button");
    b.type = "button";
    b.className = "alfiler" + (hallado ? " resuelto" : "") + (e.listo ? "" : " bloqueado");
    b.innerHTML = `<span class="alfiler-punto"></span><span class="alfiler-nombre">${e.etiquetaMapa || e.nombreCorto || e.nombre}</span>`;
    b.setAttribute("aria-label", `${e.nombre}: ${hallado ? t("pinResuelto") : t("pinAbierto")}`);
    if (e.listo) b.addEventListener("click", () => alElegir(e));
    else b.disabled = true;
    caja.appendChild(b);
    return { e, b };
  });

  function posicionar() {
    const rad = Math.PI / 180;
    alfileres.forEach(({ e, b }) => {
      const la = e.ubicacion.lat * rad, lo = (e.ubicacion.lon - lon0) * rad;
      const x = Math.cos(la) * Math.sin(lo);
      const y = Math.sin(la);
      const z = Math.cos(la) * Math.cos(lo);
      const y2 = y * Math.cos(incl) - z * Math.sin(incl);
      const z2 = y * Math.sin(incl) + z * Math.cos(incl);
      const visible = z2 > 0.12;
      b.style.left = (50 + x * (R / TAM) * 100) + "%";
      b.style.top = (50 - y2 * (R / TAM) * 100) + "%";
      b.classList.toggle("oculto", !visible);
      b.tabIndex = visible ? 0 : -1;
      b.classList.toggle("a-la-izquierda", x > 0.35 || Boolean(e.etiquetaIzquierda));   // etiquetaIzquierda: dos casos en el mismo lugar
    });
  }

  let tex = null;
  function pintar() {
    if (!tex) return;
    const px = imagen.data, tp = tex.px, tw = tex.w, th = tex.h;
    for (let k = 0; k < N; k++) {
      const o = k * 4;
      if (!dentro[k]) { px[o + 3] = 0; continue; }
      let lon = dLon[k] + lon0 + 180;
      lon = ((lon % 360) + 360) % 360;
      const u = Math.min(tw - 1, (lon / 360 * tw) | 0);
      const v = Math.min(th - 1, ((90 - latFila[k]) / 180 * th) | 0);
      const ti = (v * tw + u) * 4;
      const f = luz[k];
      px[o] = Math.min(255, tp[ti] * f);
      px[o + 1] = Math.min(255, tp[ti + 1] * f);
      px[o + 2] = Math.min(255, tp[ti + 2] * f);
      px[o + 3] = 255;
    }
    ctx.putImageData(imagen, 0, 0);
    posicionar();
  }

  function bucle(ahora) {
    if (!activo) return;
    const dt = Math.min(0.1, (ahora - ultimo) / 1000);
    ultimo = ahora;
    if (!pausado && !arrastrando && !reducirMovimiento) {
      lon0 += dt * 7;              // grados por segundo
      pintar();
    }
    requestAnimationFrame(bucle);
  }

  // Arrastrar para girar
  lienzo.addEventListener("pointerdown", (ev) => {
    arrastrando = { x: ev.clientX, lon: lon0 };
    lienzo.setPointerCapture(ev.pointerId);
    caja.classList.add("girando");
  });
  lienzo.addEventListener("pointermove", (ev) => {
    if (!arrastrando) return;
    const ancho = lienzo.getBoundingClientRect().width;
    lon0 = arrastrando.lon - (ev.clientX - arrastrando.x) / ancho * 180;
    pintar();
  });
  const soltar = () => { arrastrando = null; caja.classList.remove("girando"); };
  lienzo.addEventListener("pointerup", soltar);
  lienzo.addEventListener("pointercancel", soltar);
  caja.addEventListener("pointerenter", (ev) => { if (ev.pointerType === "mouse") pausado = true; });
  caja.addEventListener("pointerleave", () => { pausado = false; });
  caja.addEventListener("focusin", () => { pausado = true; });
  caja.addEventListener("focusout", () => { pausado = false; });

  cargarTextura(lugar).then((d) => {
    tex = d;
    pintar();
    caja.classList.add("listo");
    requestAnimationFrame((a) => { ultimo = a; bucle(a); });
  });

  return { elemento: caja, detener: () => { activo = false; } };
}


/* =========================================================
   ESQUEMA — mapa del Sistema Solar para el mundo "Más allá".
   Alfileres en la posición de cada equipo dentro del esquema.
   ========================================================= */
function dibujarEsquema(equipos, alElegir) {
  const caja = document.createElement("div");
  caja.className = "esquema";
  caja.innerHTML = `<img src="${ESQUEMA.imagen()}" alt="${t("esquemaAria")}">`;
  equipos.filter((e) => e.posicionEsquema).forEach((e) => {
    const hallado = estaEncontrado(e.id);
    const b = document.createElement("button");
    b.type = "button";
    const lado = ["izq", "der", "arriba", "abajo"].includes(e.etiquetaLado) ? e.etiquetaLado : (e.posicionEsquema.x / ESQUEMA.ancho > 0.6 ? "izq" : "der");
    b.className = "alfiler alfiler-esquema lado-" + lado + (hallado ? " resuelto" : "");
    b.style.left = (e.posicionEsquema.x / ESQUEMA.ancho * 100) + "%";
    b.style.top = (e.posicionEsquema.y / ESQUEMA.alto * 100) + "%";
    b.innerHTML = `<span class="alfiler-punto"></span><span class="alfiler-nombre">${e.etiquetaMapa || e.nombreCorto || e.nombre}</span>`;
    b.setAttribute("aria-label", `${e.nombre}: ${hallado ? t("pinResuelto") : t("pinAbierto")}`);
    b.addEventListener("click", () => alElegir(e));
    caja.appendChild(b);
  });
  return { elemento: caja, detener: () => {} };
}
