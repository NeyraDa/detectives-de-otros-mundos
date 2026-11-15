/* =========================================================
   ARCHIVO DE MISIONES (18 o más: docentes, tutores, adultos)
   mostrarArchivo(contenedor, equipos, alAbrir, alJugar)
   verExpediente(contenedor, equipo, alVolver, alBuscar)

   En vez del juego de búsqueda, una línea de tiempo con los
   16 casos. Cada expediente reúne la ficha, la foto, la
   historia, las decisiones (para elegir y comparar),
   preguntas para clase y las fuentes. Se puede imprimir.
   No guarda nada: ni lo que se abre ni lo que se responde.
   ========================================================= */

let archivoFiltro = "todos";
let archivoOrden = "fecha";

function anioInicio(e) {
  const m = String(e.anios || "").match(/\d{4}/);
  return m ? Number(m[0]) : 9999;
}

function mostrarArchivo(contenedor, equipos, alAbrir, alJugar) {
  const lugares = ["todos", "marte", "luna", "espacio"];

  function lista() {
    let l = equipos.filter((e) => e.listo && (archivoFiltro === "todos" || e.lugar === archivoFiltro));
    l = l.slice().sort((a, b) => archivoOrden === "fecha"
      ? anioInicio(a) - anioInicio(b) || a.nombre.localeCompare(b.nombre)
      : a.nombre.localeCompare(b.nombre, idioma));
    return l;
  }

  function pintarLista() {
    const l = lista();
    contenedor.querySelector("#archivo-cuenta").textContent = t("expedientes", { n: l.length });
    contenedor.querySelector(".archivo-lista").innerHTML = l.map((e) => `
      <li class="lugar-${e.lugar}">
        <button type="button" class="archivo-fila" data-id="${e.id}" aria-label="${escaparHTML(t("abrirExpediente", { nombre: e.nombre }))}">
          <span class="archivo-anio">${escaparHTML(e.anios)}</span>
          <span class="archivo-dibujo" aria-hidden="true">${ilustracion(e)}</span>
          <span class="archivo-info">
            <span class="archivo-nombre">${escaparHTML(e.nombre)}</span>
            <span class="archivo-tipo">${escaparHTML(e.tipo)}</span>
          </span>
          <span class="archivo-lugar">${t("lugar_" + e.lugar)}</span>
        </button>
      </li>`).join("");
    contenedor.querySelectorAll(".archivo-fila").forEach((b) => b.addEventListener("click", () => {
      Sonido.sonar("elegir");
      alAbrir(b.dataset.id);
    }));
  }

  contenedor.innerHTML = `
    <section class="pantalla archivo-misiones">
      <header class="archivo-cabecera">
        <h1>${t("archivoTitulo")}</h1>
        <p class="intro">${t("archivoIntro")}</p>
        <p class="perfil-chip">
          <button type="button" id="btn-jugar" class="btn secundario">${t("archivoJugar")}</button>
          <span class="nota-suave">${t("archivoJugarNota")}</span>
          <button type="button" id="btn-perfil" class="btn texto">${t("cambiarPerfil")}</button>
        </p>
      </header>

      <div class="archivo-controles">
        <div class="selector-lugar" role="group" aria-label="${t("archivoFiltro")}">
          ${lugares.map((l) => `<button type="button" data-filtro="${l}" aria-pressed="${archivoFiltro === l}">${l === "todos" ? t("todos") : t("lugar_" + l)}</button>`).join("")}
        </div>
        <label class="archivo-orden">${t("ordenar")}
          <select id="archivo-orden">
            <option value="fecha" ${archivoOrden === "fecha" ? "selected" : ""}>${t("porFecha")}</option>
            <option value="nombre" ${archivoOrden === "nombre" ? "selected" : ""}>${t("porNombre")}</option>
          </select>
        </label>
        <p id="archivo-cuenta" class="nota-suave" aria-live="polite"></p>
      </div>

      <ol class="archivo-lista"></ol>
    </section>
  `;

  pintarLista();

  contenedor.querySelectorAll("[data-filtro]").forEach((b) => b.addEventListener("click", () => {
    archivoFiltro = b.dataset.filtro;
    contenedor.querySelectorAll("[data-filtro]").forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
    Sonido.sonar("elegir");
    pintarLista();
  }));
  contenedor.querySelector("#archivo-orden").addEventListener("change", (ev) => {
    archivoOrden = ev.target.value === "nombre" ? "nombre" : "fecha";
    pintarLista();
  });
  contenedor.querySelector("#btn-jugar").addEventListener("click", () => alJugar());
  contenedor.querySelector("#btn-perfil").addEventListener("click", () => irAlPerfil());
}


function verExpediente(contenedor, equipo, alVolver, alBuscar) {
  const d = equipo.despedida;
  const partes = [
    [t("quienSoy"), d.quienSoy],
    [t("queDescubri"), d.queDescubri],
    [t("porQueMeQuede"), d.porQueMeQuede],
    [t("comoEstoyHoy"), d.comoEstoyHoy]
  ];
  const decisiones = equipo.decisiones || [];

  contenedor.innerHTML = `
    <article class="pantalla ficha-mision lugar-${equipo.lugar}">
      <p class="expediente-volver"><button type="button" id="btn-volver" class="btn texto">← ${t("volverArchivo")}</button></p>

      <header class="expediente-cabecera">
        <div class="transmision-dibujo" aria-hidden="true">${ilustracion(equipo)}</div>
        <div>
          <p class="transmision-origen">${escaparHTML(equipo.tipo)} · ${escaparHTML(equipo.anios)}</p>
          <h1>${escaparHTML(equipo.nombre)}</h1>
        </div>
      </header>

      <div class="expediente-cuerpo">
        <aside class="despedida-lado">
          ${equipo.fotoEquipo ? `
            <figure class="foto-equipo">
              <img src="${equipo.fotoEquipo.imagen}" alt="${t("fotoReal", { nombre: equipo.nombre })}" loading="lazy">
              <figcaption>${equipo.fotoEquipo.credito}</figcaption>
            </figure>` : `<p class="nota-suave">${t("expSinFoto")}</p>`}
          <h2 class="ficha-titulo">${t("ficha")}</h2>
          ${fichaCaso(equipo)}
          <div class="expediente-acciones">
            <button type="button" id="btn-buscar" class="btn principal">${t("expBuscar")}</button>
            ${tieneHistoria8(equipo.id) ? `<button type="button" id="btn-historia8" class="btn secundario">${t("verHistoria8")}</button>` : ""}
            <button type="button" id="btn-imprimir" class="btn texto">${t("expImprimir")}</button>
          </div>
        </aside>

        <div class="expediente-principal">
          <section aria-labelledby="exp-historia">
            <h2 id="exp-historia">${t("expHistoria")}</h2>
            <div class="expediente-historia">
              ${partes.map(([titulo, texto]) => `<div><h3>${titulo}</h3><p>${escaparHTML(texto)}</p></div>`).join("")}
            </div>
          </section>

          ${decisiones.length ? `
          <section aria-labelledby="exp-decisiones">
            <h2 id="exp-decisiones">${t("expDecisiones")}</h2>
            <p class="nota-suave">${t("expDecisionesNota")}</p>
            ${decisiones.map((dec, i) => `
              <div class="exp-decision" data-i="${i}">
                <h3>${t("expDecision", { n: i + 1 })}</h3>
                <p>${dec.situacion}</p>
                ${contextoDecision(dec)}
                <fieldset>
                  <legend>${t("expQueHarias")}</legend>
                  ${mezclar(dec.opciones.map((o, j) => ({ o, j }))).map(({ o, j }, k) => `
                    <button type="button" class="exp-opcion" data-j="${j}">
                      <span class="opcion-letra" aria-hidden="true">${"ABC"[k]}</span>
                      <span>${o.texto}</span>
                    </button>`).join("")}
                </fieldset>
                <button type="button" class="btn texto exp-ver">${t("expVerRespuesta")}</button>
                <div class="exp-respuesta" hidden aria-live="polite">
                  <p class="veredicto"></p>
                  <div class="resultado-bloque"><h4>${t("loQuePaso")}</h4><p>${dec.queHizoNasa}</p></div>
                  ${dec.porQueOtra ? `<div class="resultado-bloque otra"><h4>${t("tuOpcionTambien")}</h4><p>${escaparHTML(dec.porQueOtra)}</p></div>` : ""}
                  ${dec.ciencia ? `<div class="resultado-bloque ciencia"><h4>${t("loQueSeLogro")}</h4><p>${dec.ciencia}</p></div>` : ""}
                </div>
              </div>`).join("")}
          </section>` : ""}

          <section aria-labelledby="exp-aula" class="exp-aula">
            <h2 id="exp-aula">${t("expAula")}</h2>
            <ol>
              <li>${t("aula1")}</li>
              <li>${t("aula2")}</li>
              <li>${t("aula3", { lugar: t("en_" + equipo.lugar) })}</li>
              <li>${t("aula4")}</li>
            </ol>
          </section>

          ${(equipo.fuentes || []).length ? `
          <section aria-labelledby="exp-fuentes">
            <h2 id="exp-fuentes">${t("expFuentes")}</h2>
            ${fuentesCaso(equipo)}
          </section>` : ""}

          <p class="cierre">${t("cierreAdulto")}</p>
        </div>
      </div>
    </article>
  `;

  // Decisiones: elegir una opción (o pedir la respuesta) muestra lo que pasó
  contenedor.querySelectorAll(".exp-decision").forEach((caja) => {
    const dec = decisiones[Number(caja.dataset.i)];
    const resp = caja.querySelector(".exp-respuesta");
    const veredicto = caja.querySelector(".veredicto");
    const botones = caja.querySelectorAll(".exp-opcion");
    function revelar(j) {
      botones.forEach((b) => {
        b.disabled = true;
        if (dec.opciones[Number(b.dataset.j)].loHizoNasa) b.classList.add("real");
        if (Number(b.dataset.j) === j) b.classList.add("elegida");
      });
      if (j === null) veredicto.hidden = true;
      else {
        const igual = dec.opciones[j].loHizoNasa;
        veredicto.textContent = igual ? t("igualNasa") : t("distintoNasa");
        veredicto.className = "veredicto " + (igual ? "igual" : "distinto");
        Sonido.sonar(igual ? "acierto" : "revelar");
      }
      caja.querySelector(".exp-ver").hidden = true;
      resp.hidden = false;
    }
    botones.forEach((b) => b.addEventListener("click", () => revelar(Number(b.dataset.j))));
    caja.querySelector(".exp-ver").addEventListener("click", () => revelar(null));
  });

  contenedor.querySelector("#btn-volver").addEventListener("click", () => alVolver());
  contenedor.querySelector("#btn-buscar").addEventListener("click", () => alBuscar(equipo));
  contenedor.querySelector("#btn-imprimir").addEventListener("click", () => window.print());
  const b8 = contenedor.querySelector("#btn-historia8");
  if (b8) b8.addEventListener("click", () => irAHistoria(equipo.id));
}
