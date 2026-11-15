/* =========================================================
   MISIÓN  —  iniciarMision(contenedor, equipo, alTerminar)
   Las decisiones reales, una por una. El jugador elige
   y luego ve qué hizo NASA de verdad.
   ========================================================= */

function iniciarMision(contenedor, equipo, alTerminar) {
  const decisiones = equipo.decisiones || [];
  let paso = 0;

  if (decisiones.length === 0) { alTerminar(); return; }

  function mostrarPaso() {
    const d = decisiones[paso];
    const esUltima = paso === decisiones.length - 1;

    contenedor.innerHTML = `
      <section class="pantalla mision lugar-${equipo.lugar}">
        ${pasosCaso(2)}
        <div class="mision-progreso" aria-label="${t("decisionXdeY", { x: paso + 1, y: decisiones.length })}">
          ${decisiones.map((_, i) => `<span class="${i < paso ? "hecho" : i === paso ? "actual" : ""}"></span>`).join("")}
        </div>
        <p class="mision-quien">${d.quien || t("eres", { nombre: equipo.nombreCorto || equipo.nombre })}</p>
        <h1 class="situacion">${d.situacion}</h1>
        <div class="opciones">
          ${d.opciones.map((o, i) => `
            <button type="button" class="opcion" data-i="${i}">
              <span class="opcion-letra" aria-hidden="true">${"AB"[i] || i + 1}</span>
              <span>${o.texto}</span>
            </button>`).join("")}
        </div>
        <div id="resultado" class="resultado" hidden></div>
      </section>
    `;

    // Mientras el jugador piensa, suena la música de suspenso
    Sonido.musica("tension");

    const botones = contenedor.querySelectorAll(".opcion");
    const resultado = contenedor.querySelector("#resultado");

    botones.forEach((boton) => {
      boton.addEventListener("click", () => {
        const elegida = d.opciones[Number(boton.dataset.i)];
        Sonido.detenerMusica();
        Sonido.sonar("elegir");
        setTimeout(() => Sonido.sonar(elegida.loHizoNasa ? "acierto" : "revelar"), 250);

        botones.forEach((b) => {
          b.disabled = true;
          if (d.opciones[Number(b.dataset.i)].loHizoNasa) b.classList.add("real");
        });
        boton.classList.add("elegida");

        resultado.innerHTML = `
          <p class="veredicto ${elegida.loHizoNasa ? "igual" : "distinto"}">
            ${elegida.loHizoNasa ? t("igualNasa") : t("distintoNasa")}
          </p>
          <div class="resultado-bloque">
            <h2>${t("loQuePaso")}</h2>
            <p>${d.queHizoNasa}</p>
          </div>
          <div class="resultado-bloque ciencia">
            <h2>${t("loQueSeLogro")}</h2>
            <p>${d.ciencia}</p>
          </div>
          <button type="button" id="btn-siguiente" class="btn principal">
            ${esUltima ? t("recibirMensaje") : t("siguienteDecision")}
          </button>
        `;
        resultado.hidden = false;
        resultado.scrollIntoView({ behavior: "smooth", block: "start" });

        contenedor.querySelector("#btn-siguiente").addEventListener("click", () => {
          if (esUltima) alTerminar();
          else { paso++; mostrarPaso(); window.scrollTo(0, 0); }
        });
      });
    });
  }

  mostrarPaso();

  // Al salir de esta pantalla, apagar la música
  return () => Sonido.detenerMusica();
}
