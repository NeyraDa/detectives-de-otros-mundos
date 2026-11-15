/* =========================================================
   PERFIL — "test de detective" al entrar por primera vez
   mostrarPerfil(contenedor, alTerminar)
   Pregunta la edad y cuánto sabe la persona del espacio,
   sugiere un nivel y deja cambiarlo. Todo queda en este navegador.
   ========================================================= */

function mostrarPerfil(contenedor, alTerminar) {
  const previo = Local.jugador();
  const elegido = {
    edad: previo ? previo.edad : null,
    experiencia: previo ? previo.experiencia : null,
    nivel: previo ? previo.nivel : null
  };
  // Si la persona eligió el nivel a mano, no se lo cambiamos. Al editar el perfil,
  // se respeta el nivel guardado hasta que cambie la edad o la experiencia.
  let nivelTocado = Boolean(previo);

  const opciones = (grupo, valores) => valores.map((v) => `
    <button type="button" class="opcion-perfil" data-grupo="${grupo}" data-valor="${v}" aria-pressed="${elegido[grupo] === v}">
      ${t(grupo + "_" + v)}
    </button>`).join("");

  contenedor.innerHTML = `
    <section class="pantalla perfil">
      <h1>${previo ? t("perfilTituloEditar") : t("perfilTitulo")}</h1>
      <p class="intro">${t("perfilIntro")}</p>

      <fieldset class="pregunta-perfil">
        <legend>${t("perfilEdad")}</legend>
        <div class="opciones-perfil">${opciones("edad", ["nino", "adolescente", "adulto"])}</div>
      </fieldset>

      <fieldset class="pregunta-perfil">
        <legend>${t("perfilExperiencia")}</legend>
        <div class="opciones-perfil">${opciones("experiencia", ["nada", "escuela", "aficionado"])}</div>
      </fieldset>

      <fieldset class="pregunta-perfil niveles" ${elegido.edad && elegido.experiencia ? "" : "hidden"}>
        <legend>${t("perfilNivel")}</legend>
        <div class="tarjetas-nivel">
          ${ORDEN_NIVELES.map((n) => `
            <button type="button" class="tarjeta-nivel" data-nivel="${n}" aria-pressed="${elegido.nivel === n}">
              <span class="tarjeta-nivel-nombre">${t("nivel_" + n)}</span>
              <span class="tarjeta-nivel-texto">${t("nivelTexto_" + n)}</span>
              <span class="tarjeta-nivel-sugerido" hidden>${t("sugerido")}</span>
            </button>`).join("")}
        </div>
      </fieldset>

      <div class="acciones">
        <button type="button" id="btn-empezar" class="btn principal" disabled>${previo ? t("guardarPerfil") : t("empezar")}</button>
      </div>

    </section>
  `;

  const $ = (s) => contenedor.querySelector(s);
  const btnEmpezar = $("#btn-empezar");

  function pintar() {
    contenedor.querySelectorAll(".opcion-perfil").forEach((b) => b.setAttribute("aria-pressed", String(elegido[b.dataset.grupo] === b.dataset.valor)));
    const listos = elegido.edad && elegido.experiencia;
    $(".niveles").hidden = !listos;
    if (listos && !nivelTocado) elegido.nivel = nivelSugerido(elegido.edad, elegido.experiencia);
    const sugerido = listos ? nivelSugerido(elegido.edad, elegido.experiencia) : null;
    contenedor.querySelectorAll(".tarjeta-nivel").forEach((b) => {
      b.setAttribute("aria-pressed", String(elegido.nivel === b.dataset.nivel));
      b.querySelector(".tarjeta-nivel-sugerido").hidden = b.dataset.nivel !== sugerido;
    });
    btnEmpezar.disabled = !(listos && elegido.nivel);
  }

  contenedor.querySelectorAll(".opcion-perfil").forEach((b) => b.addEventListener("click", () => {
    Sonido.sonar("elegir");
    if (elegido[b.dataset.grupo] !== b.dataset.valor) nivelTocado = false;
    elegido[b.dataset.grupo] = b.dataset.valor;
    pintar();
  }));

  contenedor.querySelectorAll(".tarjeta-nivel").forEach((b) => b.addEventListener("click", () => {
    Sonido.sonar("elegir");
    elegido.nivel = b.dataset.nivel;
    nivelTocado = true;
    pintar();
  }));

  btnEmpezar.addEventListener("click", () => {
    btnEmpezar.disabled = true;
    // Se guarda el perfil completo (edad, experiencia y nivel). El progreso
    // se guarda aparte, así que cambiar el perfil no lo borra.
    Local.crearJugador({ edad: elegido.edad, experiencia: elegido.experiencia, nivel: elegido.nivel });
    alTerminar();
  });


  pintar();
}
