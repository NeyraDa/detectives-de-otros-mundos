/* =========================================================
   MISIÓN  —  iniciarMision(contenedor, equipo, alTerminar)
   Las decisiones reales, una por una:
   1. Escena en 8 bits del momento y "lo que sabías" (contexto).
   2. El jugador elige (las opciones se mezclan cada vez; en nivel
      experto hay una tercera opción y un temporizador opcional).
   3. Dice qué tan seguro está (apuesta de confianza).
   4. Ve lo que eligió el equipo, por qué la otra opción también
      tenía sentido y qué se logró.
   No se guarda nada: los puntos de confianza viven solo en esta pantalla.
   ========================================================= */

// Mezcla una lista (Fisher-Yates). Así la respuesta no queda siempre en el mismo lugar.
function mezclar(lista) {
  const a = lista.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function contextoDecision(d) {
  if (!d.contexto || !d.contexto.length) return "";
  return `
    <div class="contexto-decision">
      <h2>${t("loQueSabias")}</h2>
      <ul>
        ${d.contexto.map((c) => `<li class="ctx-${escaparHTML(c.tipo)}"><b>${t("ctx_" + c.tipo)}:</b> ${escaparHTML(c.texto)}</li>`).join("")}
      </ul>
    </div>`;
}

function iniciarMision(contenedor, equipo, alTerminar) {
  const decisiones = equipo.decisiones || [];
  const experto = typeof nivelActual === "function" && nivelActual() === "experto";
  const SEGUNDOS = 30;
  let paso = 0;
  let iguales = 0;
  let puntos = 0;
  let detenerEscena = () => {};
  let reloj = null;

  if (decisiones.length === 0) { alTerminar(); return; }

  function limpiar() {
    detenerEscena();
    clearInterval(reloj);
    reloj = null;
  }

  function mostrarPaso() {
    limpiar();
    const d = decisiones[paso];
    const esUltima = paso === decisiones.length - 1;
    const escena = (typeof ESCENAS_DECISION !== "undefined" && ESCENAS_DECISION[equipo.id] || [])[paso];

    // Opciones: las reales, más la tercera en nivel experto; siempre mezcladas
    let opciones = d.opciones.map((o) => ({ texto: o.texto, real: o.loHizoNasa, tercera: false }));
    if (experto && d.tercera) opciones.push({ texto: d.tercera, real: false, tercera: true });
    opciones = mezclar(opciones);
    const letras = "ABC";

    contenedor.innerHTML = `
      <section class="pantalla mision lugar-${equipo.lugar}">
        ${pasosCaso(2)}
        <div class="mision-progreso" aria-label="${t("decisionXdeY", { x: paso + 1, y: decisiones.length })}">
          ${decisiones.map((_, i) => `<span class="${i < paso ? "hecho" : i === paso ? "actual" : ""}"></span>`).join("")}
        </div>
        <div class="mision-cabeza">
          ${escena ? `<canvas class="pixel-lienzo mision-escena" width="${Pixel.ANCHO}" height="${Pixel.ALTO}" role="img" aria-label="${t("escenaDecision")}"></canvas>` : ""}
          <div>
            <p class="mision-quien">${d.quien || t("eres", { nombre: equipo.nombreCorto || equipo.nombre })}</p>
            <h1 class="situacion">${d.situacion}</h1>
          </div>
        </div>
        ${contextoDecision(d)}
        ${experto ? `
          <div class="temporizador" id="temporizador">
            <div class="temporizador-barra" aria-hidden="true"><span id="temporizador-relleno"></span></div>
            <p><span id="temporizador-texto">${t("temporizador", { s: SEGUNDOS })}</span>
              <button type="button" id="btn-sin-tiempo" class="btn texto">${t("quitarTiempo")}</button></p>
            <p id="temporizador-aviso" class="nota-suave" aria-live="polite"></p>
          </div>` : ""}
        <div class="opciones" role="group" aria-label="${t("expQueHarias")}">
          ${opciones.map((o, i) => `
            <button type="button" class="opcion" data-i="${i}" aria-pressed="false">
              <span class="opcion-letra" aria-hidden="true">${letras[i]}</span>
              <span>${escaparHTML(o.texto)}</span>
            </button>`).join("")}
        </div>
        <fieldset class="confianza" id="confianza" hidden>
          <legend>${t("queTanSeguro")}</legend>
          <div class="confianza-botones">
            ${[1, 2, 3].map((n) => `<button type="button" class="btn secundario" data-n="${n}">${"●".repeat(n)}${"○".repeat(3 - n)} ${t("seguro" + n)}</button>`).join("")}
          </div>
        </fieldset>
        <div id="resultado" class="resultado" hidden></div>
      </section>
    `;

    // Escena animada del momento
    const lienzo = contenedor.querySelector(".mision-escena");
    if (lienzo) detenerEscena = animarDecision(lienzo, escena);

    // Música de aventura (no de suspenso)
    Sonido.musica("aventura");

    // Temporizador opcional (solo experto). Nunca obliga: al acabarse, solo avisa.
    if (experto) {
      let resta = SEGUNDOS;
      const relleno = contenedor.querySelector("#temporizador-relleno");
      const texto = contenedor.querySelector("#temporizador-texto");
      reloj = setInterval(() => {
        resta--;
        relleno.style.width = (resta / SEGUNDOS * 100) + "%";
        texto.textContent = t("temporizador", { s: Math.max(0, resta) });
        if (resta <= 0) {
          clearInterval(reloj); reloj = null;
          contenedor.querySelector("#temporizador-aviso").textContent = t("tiempoAgotado");
        }
      }, 1000);
      contenedor.querySelector("#btn-sin-tiempo").addEventListener("click", () => {
        clearInterval(reloj); reloj = null;
        contenedor.querySelector("#temporizador").hidden = true;
      });
    }

    const botones = contenedor.querySelectorAll(".opcion");
    const confianza = contenedor.querySelector("#confianza");
    const resultado = contenedor.querySelector("#resultado");
    let elegida = null;

    botones.forEach((boton) => {
      boton.addEventListener("click", () => {
        Sonido.sonar("elegir");
        elegida = opciones[Number(boton.dataset.i)];
        botones.forEach((b) => b.setAttribute("aria-pressed", String(b === boton)));
        confianza.hidden = false;
        confianza.scrollIntoView({ behavior: "smooth", block: "nearest" });
      });
    });

    confianza.querySelectorAll("[data-n]").forEach((b) => b.addEventListener("click", () => {
      if (!elegida) return;
      const n = Number(b.dataset.n);
      clearInterval(reloj); reloj = null;
      const tempo = contenedor.querySelector("#temporizador");
      if (tempo) tempo.hidden = true;
      Sonido.detenerMusica();
      Sonido.sonar(elegida.real ? "acierto" : "revelar");

      const ganados = elegida.real ? n : 0;
      if (elegida.real) iguales++;
      puntos += ganados;

      botones.forEach((x) => {
        x.disabled = true;
        const o = opciones[Number(x.dataset.i)];
        if (o.real) x.classList.add("real");
        if (o === elegida) x.classList.add("elegida");
      });
      confianza.hidden = true;

      const veredicto = elegida.real ? t("elegisteComoEquipo") : elegida.tercera ? t("elegisteTercera") : t("elegisteDistinto");
      const real = d.opciones.find((o) => o.loHizoNasa);
      resultado.innerHTML = `
        <p class="veredicto ${elegida.real ? "igual" : "distinto"}">${veredicto}</p>
        <p class="confianza-resultado">
          ${elegida.real ? `<span class="chip-puntos">${t("puntosConfianza", { n: ganados })}</span>` : ""}
          ${t((elegida.real ? "conf_acierto" : "conf_error") + n)}
        </p>
        <div class="resultado-bloque">
          <h2>${t("elEquipoEligio")}: ${escaparHTML(real.texto)}</h2>
          <p>${d.queHizoNasa}</p>
        </div>
        ${d.porQueOtra ? `
          <div class="resultado-bloque otra">
            <h2>${t("tuOpcionTambien")}</h2>
            <p>${escaparHTML(d.porQueOtra)}</p>
          </div>` : ""}
        <div class="resultado-bloque ciencia">
          <h2>${t("loQueSeLogro")}</h2>
          <p>${d.ciencia}</p>
        </div>
        ${esUltima ? `<p class="resumen-mision">${t("resumenMision", { a: iguales, b: decisiones.length, p: puntos })}</p>` : ""}
        <button type="button" id="btn-siguiente" class="btn principal">
          ${esUltima ? t("recibirMensaje") : t("siguienteDecision")}
        </button>
      `;
      resultado.hidden = false;
      resultado.scrollIntoView({ behavior: "smooth", block: "start" });

      contenedor.querySelector("#btn-siguiente").addEventListener("click", () => {
        if (esUltima) { limpiar(); alTerminar(); }
        else { paso++; mostrarPaso(); window.scrollTo(0, 0); }
      });
    }));
  }

  mostrarPaso();

  // Al salir de esta pantalla, apagar música, escena y temporizador
  return () => { limpiar(); Sonido.detenerMusica(); };
}
