/* =========================================================
   DESPEDIDA  —  mostrarDespedida(contenedor, equipo, alTerminar)
   El equipo cuenta su historia como mensajes que llegan uno
   por uno. A la izquierda, su foto real y su ficha.
   Sin voz sintetizada: la voz del navegador puede depender de
   servicios en la nube (envía texto e IP), así que se quitó por
   privacidad. El texto queda en pantalla para lectores de
   pantalla, que usan la voz del propio sistema de la persona.
   Devuelve una función de limpieza (detiene la escritura).
   ========================================================= */

// Texto de los casos → HTML seguro (los casos se escriben a mano en un JSON)
function escaparHTML(x) {
  return String(x).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

// Los tres pasos de un caso: 1 encuéntralo, 2 decide, 3 su historia
function pasosCaso(actual) {
  return `
    <ol class="pasos-caso" aria-label="${t("pasosAria")}">
      ${[1, 2, 3].map((n) => `
        <li class="${n < actual ? "hecho" : n === actual ? "actual" : ""}" ${n === actual ? 'aria-current="step"' : ""}>
          <span class="pasos-num" aria-hidden="true">${n < actual ? "✓" : n}</span>
          <span>${t("paso" + n)}</span>
        </li>`).join("")}
    </ol>`;
}

// Ficha con los datos que ya trae el caso (nada inventado)
function fichaCaso(equipo) {
  const filas = [
    [t("fichaTipo"), equipo.tipo],
    [t("fichaPeriodo"), equipo.anios],
    [t("fichaLugar"), equipo.lugar === "espacio" ? t("dondeEspacio") : t("lugar_" + equipo.lugar)]
  ];
  if (equipo.ubicacion && typeof formatoCoordenadas === "function") filas.push([t("fichaCoordenadas"), formatoCoordenadas(equipo.ubicacion)]);
  return `<dl class="ficha">${filas.map(([k, v]) => `<div><dt>${k}</dt><dd>${escaparHTML(v)}</dd></div>`).join("")}</dl>`;
}

function fuentesCaso(equipo) {
  const lista = (equipo.fuentes || []).filter((f) => /^https:\/\/[^\s"'<>]+$/.test(f.url));
  if (!lista.length) return "";
  return `<ul class="fuentes-lista">${lista.map((f) => `<li><a href="${escaparHTML(f.url)}" target="_blank" rel="noopener noreferrer">${escaparHTML(f.titulo)}</a></li>`).join("")}</ul>`;
}

function tieneHistoria8(id) {
  return typeof HISTORIAS !== "undefined" && HISTORIAS.some((h) => h.id === id);
}

function mostrarDespedida(contenedor, equipo, alTerminar) {
  const d = equipo.despedida;
  const reducirMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const adulto = typeof esAdulto === "function" && esAdulto();
  let temporizador = null;
  let terminada = false;

  const partes = [
    ["quien", t("quienSoy"), d.quienSoy],
    ["descubri", t("queDescubri"), d.queDescubri],
    ["quede", t("porQueMeQuede"), d.porQueMeQuede],
    ["hoy", t("comoEstoyHoy"), d.comoEstoyHoy]
  ];

  contenedor.innerHTML = `
    <section class="pantalla despedida lugar-${equipo.lugar}">
      ${pasosCaso(3)}
      <div class="transmision-cabecera">
        <div class="transmision-dibujo">${ilustracion(equipo)}</div>
        <div>
          <p class="transmision-origen">${t("desde_" + equipo.lugar)}, ${equipo.anios}</p>
          <h1>${t("hola", { nombre: equipo.nombreCorto || equipo.nombre })}</h1>
        </div>
      </div>

      <div class="despedida-cuerpo">
        <aside class="despedida-lado">
          ${equipo.fotoEquipo ? `
            <figure class="foto-equipo">
              <img src="${equipo.fotoEquipo.imagen}" alt="${t("fotoReal", { nombre: equipo.nombre })}" loading="lazy">
              <figcaption>${equipo.fotoEquipo.credito}</figcaption>
            </figure>` : ""}
          <h2 class="ficha-titulo">${t("ficha")}</h2>
          ${fichaCaso(equipo)}
        </aside>

        <div class="despedida-mensajes">
          <div class="transmision-controles">
            <h2 class="mensajes-titulo">${t("lineaMensajes")}</h2>
            <button type="button" id="btn-saltar" class="btn texto">${t("mostrarTodo")}</button>
          </div>
          <ol class="transmision">
            ${partes.map(([clase, titulo, texto], i) => `
              <li class="parte parte-${clase}" data-i="${i}" hidden>
                <h3>${titulo}</h3>
                <p data-texto="${escaparHTML(texto)}"></p>
              </li>`).join("")}
          </ol>
        </div>
      </div>

      <div id="final" class="despedida-final" hidden>
        <p class="cierre">${adulto ? t("cierreAdulto") : t("cierreJoven")}</p>
        ${tieneHistoria8(equipo.id) ? `
          <p class="historia8">
            <button type="button" id="btn-historia8" class="btn secundario">${t("verHistoria8")}</button>
            <span>${t("verHistoria8Nota")}</span>
          </p>` : ""}
        ${(equipo.fuentes || []).length ? `
          <details class="fuentes">
            <summary>${t("fuentes")}</summary>
            ${fuentesCaso(equipo)}
          </details>` : ""}
        <div class="acciones">
          <button type="button" id="btn-trofeos" class="btn principal">${t("archivar")}</button>
        </div>
      </div>
    </section>
  `;

  const articulos = [...contenedor.querySelectorAll(".parte")];
  const final = contenedor.querySelector("#final");

  function mostrarTodo() {
    clearTimeout(temporizador);
    terminada = true;
    articulos.forEach((a) => {
      a.hidden = false;
      const p = a.querySelector("p");
      p.textContent = p.dataset.texto;
      p.classList.remove("escribiendo");
    });
    contenedor.querySelector("#btn-saltar").hidden = true;
    final.hidden = false;
  }

  // Escribe cada mensaje letra por letra (rápido: es para leer, no para esperar)
  function escribir(iParte, iLetra) {
    if (terminada) return;
    if (iParte >= articulos.length) return mostrarTodo();
    const art = articulos[iParte];
    const p = art.querySelector("p");
    const texto = p.dataset.texto;
    art.hidden = false;
    p.classList.add("escribiendo");
    p.textContent = texto.slice(0, iLetra);
    if (iLetra % 4 === 0) Sonido.sonar("tecla");
    if (iLetra >= texto.length) {
      p.classList.remove("escribiendo");
      temporizador = setTimeout(() => escribir(iParte + 1, 0), 500);
    } else {
      const letra = texto[iLetra];
      const pausa = ".!?".includes(letra) ? 160 : ",;:".includes(letra) ? 60 : 12;
      temporizador = setTimeout(() => escribir(iParte, iLetra + 1), pausa);
    }
  }

  // Llega la transmisión: estática de radio y pitidos, luego empieza a escribirse
  Sonido.sonar("transmision");
  if (reducirMovimiento) mostrarTodo();
  else temporizador = setTimeout(() => escribir(0, 0), 900);

  contenedor.querySelector("#btn-saltar").addEventListener("click", mostrarTodo);
  contenedor.querySelector("#btn-trofeos").addEventListener("click", () => alTerminar());
  const b8 = contenedor.querySelector("#btn-historia8");
  if (b8) b8.addEventListener("click", () => irAHistoria(equipo.id));

  return () => {
    terminada = true;
    clearTimeout(temporizador);
  };
}
