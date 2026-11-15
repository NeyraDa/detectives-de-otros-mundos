/* =========================================================
   PANTALLAS
   mostrarInicio(contenedor, equipos, alElegirEquipo, alVerTrofeos)
   mostrarTrofeos(contenedor, equipos, alVolver)
   ========================================================= */

let lugarElegido = "marte";
const LUGARES = ["marte", "luna", "espacio"];

function contarProgreso(equipos) {
  const jugables = equipos.filter((e) => e.listo);
  const encontrados = jugables.filter((e) => estaEncontrado(e.id));
  const estrellas = jugables.reduce((suma, e) => suma + ((obtenerResultado(e.id) || {}).estrellas || 0), 0);
  return { total: jugables.length, encontrados: encontrados.length, estrellas, maxEstrellas: jugables.length * 3 };
}

function rangoDetective(p) {
  if (p.total > 0 && p.encontrados === p.total) return t("rango4");
  if (p.encontrados >= 4) return t("rango3");
  if (p.encontrados >= 1) return t("rango2");
  return t("rango1");
}

function estadoCaso(e) {
  if (!e.listo) return { clase: "bloqueado", texto: t("proximamente") };
  const r = obtenerResultado(e.id);
  if (estaEncontrado(e.id)) return { clase: "resuelto", texto: r ? estrellasTexto(r.estrellas) : t("resuelto") };
  return { clase: "abierto", texto: t("sinResolver") };
}

function mostrarInicio(contenedor, equipos, alElegirEquipo, alVerTrofeos) {
  const p = contarProgreso(equipos);
  const delLugar = equipos.filter((e) => e.lugar === lugarElegido);

  contenedor.innerHTML = `
    <section class="pantalla inicio lugar-${lugarElegido}">
      <div class="inicio-texto">
        <h1>${t("inicioTitulo")}</h1>
        <p class="intro">${t("inicioIntroCorta")}</p>
        <p class="perfil-chip">
          <span>${t("nivelChip", { n: t("nivel_" + nivelActual()) })}</span>
          <button type="button" id="btn-perfil" class="btn texto">${t("cambiarPerfil")}</button>
          ${typeof esAdulto === "function" && esAdulto() ? `<button type="button" id="btn-archivo" class="btn texto">${t("verArchivo")}</button>` : ""}
        </p>
        <details class="guia-juego" ${contarProgreso(equipos).encontrados === 0 ? "open" : ""}>
          <summary>${t("comoSeJuega")}</summary>
          <ol>${[1, 2, 3, 4].map((n) => `<li>${t("guia" + n)}</li>`).join("")}</ol>
        </details>

        <div class="selector-lugar" role="tablist" aria-label="${t("elegirLugar")}">
          ${LUGARES.map((l) => `<button type="button" role="tab" data-lugar="${l}" aria-selected="${lugarElegido === l}">${t("lugar_" + l)}</button>`).join("")}
        </div>
      </div>

      <div id="mapa" class="inicio-mapa"></div>

      <div class="casos">
        <h2>${t("casosEn", { lugar: t("en_" + lugarElegido) })}</h2>
        <ul class="casos-lista">
          ${delLugar.map((e) => {
            const est = estadoCaso(e);
            return `
              <li>
                <button type="button" class="caso ${est.clase}" data-id="${e.id}" ${e.listo ? "" : "disabled"}>
                  <span class="caso-dibujo">${ilustracion(e)}</span>
                  <span class="caso-info">
                    <span class="caso-nombre">${e.nombre}</span>
                    <span class="caso-tipo">${e.tipo}, ${e.anios}</span>
                  </span>
                  <span class="caso-estado">${est.texto}</span>
                </button>
              </li>`;
          }).join("")}
        </ul>
        <button type="button" id="btn-trofeos" class="btn secundario">
          ${t("misCasos", { a: p.encontrados, b: p.total })}
        </button>
      </div>
    </section>
  `;

  const vista = lugarElegido === "espacio"
    ? dibujarEsquema(delLugar, alElegirEquipo)
    : (window.dibujarPlaneta3D || dibujarPlaneta)(lugarElegido, delLugar, alElegirEquipo);   // 3D si hay WebGL
  contenedor.querySelector("#mapa").appendChild(vista.elemento);

  contenedor.querySelectorAll("[data-lugar]").forEach((b) => {
    b.addEventListener("click", () => {
      if (b.dataset.lugar === lugarElegido) return;
      Sonido.sonar("elegir");
      lugarElegido = b.dataset.lugar;
      irAlInicio();
      const tab = document.querySelector(`[data-lugar="${lugarElegido}"]`);
      if (tab) tab.focus();
    });
  });

  contenedor.querySelectorAll(".caso[data-id]").forEach((b) => {
    b.addEventListener("click", () => {
      Sonido.sonar("elegir");
      alElegirEquipo(equipos.find((e) => e.id === b.dataset.id));
    });
  });

  contenedor.querySelector("#btn-trofeos").addEventListener("click", () => alVerTrofeos());
  contenedor.querySelector("#btn-perfil").addEventListener("click", () => irAlPerfil());
  const bArchivo = contenedor.querySelector("#btn-archivo");
  if (bArchivo) bArchivo.addEventListener("click", () => irAlArchivo());

  return () => vista.detener();
}

function mostrarTrofeos(contenedor, equipos, alVolver) {
  const jugables = equipos.filter((e) => e.listo);
  const p = contarProgreso(equipos);
  const completo = p.total > 0 && p.encontrados === p.total;

  contenedor.innerHTML = `
    <section class="pantalla trofeos">
      <div class="placa ${completo ? "completa" : ""}">
        <p class="placa-rango">${rangoDetective(p)}</p>
        <p class="placa-datos">${t("placaDatos", { a: p.encontrados, b: p.total, e: p.estrellas, m: p.maxEstrellas })}</p>
        ${completo ? `<p class="placa-mensaje">${t("placaCompleta")}</p>` : ""}
      </div>

      <h1>${t("archivo")}</h1>
      <ul class="archivo">
        ${jugables.map((e) => {
          const hallado = estaEncontrado(e.id);
          const r = obtenerResultado(e.id);
          return `
            <li class="expediente lugar-${e.lugar} ${hallado ? "resuelto" : "oculto"}">
              ${hallado && e.fotoEquipo
                ? `<img class="expediente-foto" src="${e.fotoEquipo.imagen}" alt="${t("fotoReal", { nombre: e.nombre })}" loading="lazy">`
                : `<div class="expediente-dibujo">${ilustracion(e)}</div>`}
              <p class="expediente-nombre">${hallado ? e.nombre : t("casoSinResolver")}</p>
              <p class="expediente-datos">${hallado
                ? `${t("lugar_" + e.lugar)}, ${e.anios}${r ? `<br><span class="expediente-estrellas">${estrellasTexto(r.estrellas)}</span> ${t("enTiempo", { t: formatoTiempo(r.segundos) })}` : ""}`
                : t("buscaloParaAbrir")}</p>
              ${hallado ? `<span class="sello" aria-hidden="true">${t("resuelto")}</span>` : ""}
            </li>`;
        }).join("")}
      </ul>

      <div class="acciones">
        <button type="button" id="btn-volver" class="btn principal">${t("buscarMas")}</button>
        <button type="button" id="btn-reiniciar" class="btn texto">${t("borrar")}</button>
      </div>
    </section>
  `;

  if (completo && typeof confetti === "function" && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    confetti({ particleCount: 90, spread: 100, origin: { y: 0.25 }, colors: ["#F2C14E", "#ffffff", "#D2603F"] });
  }

  contenedor.querySelector("#btn-volver").addEventListener("click", () => alVolver());

  // Borrar pide un segundo toque para confirmar
  const btnReiniciar = contenedor.querySelector("#btn-reiniciar");
  btnReiniciar.addEventListener("click", () => {
    if (btnReiniciar.dataset.confirmar) {
      reiniciarProgreso();
      Local.olvidarJugador();   // empezar de cero también vuelve a hacer el test
      irAlPerfil();
    } else {
      btnReiniciar.dataset.confirmar = "1";
      btnReiniciar.textContent = t("borrarConfirmar");
    }
  });
}
