/* =========================================================
   IDIOMAS (ES / EN)
   t("clave", { variables })  → texto en el idioma actual
   loc(equipo)                → equipo con sus textos traducidos
   ========================================================= */

const TEXTOS = {
  es: {
    marca: "Detectives de<br>Otros Mundos",
    irInicio: "Ir al inicio",
    sonidoOn: "Sonido activado", sonidoOff: "Sonido desactivado",
    estrellas: "{n} estrellas de {max}",
    cambiarIdioma: "Switch to English",

    lugar_marte: "Marte", lugar_luna: "Luna", lugar_espacio: "Más allá",
    de_marte: "de Marte", de_luna: "de la Luna", de_espacio: "del espacio profundo",
    en_marte: "en Marte", en_luna: "en la Luna", en_espacio: "más allá",
    desde_marte: "Mensaje desde Marte", desde_luna: "Mensaje desde la Luna", desde_espacio: "Mensaje desde el espacio profundo",

    inicioTitulo: "NASA dejó robots en otros mundos. ¿Puedes encontrarlos?",
    inicioIntro: "Gira el planeta, elige un caso y búscalo en fotos y mapas reales de NASA. Después toma sus decisiones más difíciles y escucha su historia.",
    elegirLugar: "Elige dónde investigar",
    casosEn: "Casos {lugar}",
    proximamente: "Próximamente", sinResolver: "Sin resolver", resuelto: "Resuelto",
    misCasos: "Mis casos resueltos: {a} de {b}",
    globo: "Globo {lugar}. Arrastra para girarlo.",
    arrastra: "Arrastra para girar",
    esquemaAria: "Esquema del Sistema Solar con los casos",
    pinResuelto: "caso resuelto", pinAbierto: "sin resolver",

    buscarMapa: "Búsqueda en el mapa {lugar}",
    buscarOrbita: "Foto real desde la órbita {lugar}",
    buscarFotoNave: "Foto real tomada por la nave",
    buscarEsquema: "Búsqueda en el Sistema Solar",
    ubica: "Ubica", encuentra: "Encuentra",
    notaMapa: "Este es el mapa real {lugar}, hecho con miles de fotos de NASA. Aquí cada píxel mide kilómetros y las naves miden pocos metros, así que en la foto original no se ven. Por eso pusimos su dibujo en su lugar exacto: usa las pistas, acércate con el zoom y aparecerá. Las líneas amarillas son el ecuador y el meridiano 0°.",
    msgNaveVisible: "¡Mira bien! Desde aquí ya se ve el dibujo de algo…",
    notaEsquema: "Este es un esquema del Sistema Solar visto desde arriba, dibujado para el juego. Las distancias reales son muchísimo más grandes.",
    tiempo: "Tiempo", intentos: "Intentos", pistasUsadas: "Pistas usadas",
    acercar: "Acercar", alejar: "Alejar", verTodo: "Ver toda la imagen",
    ayudaVisor: "Pellizca o usa ＋ para acercarte. Toca donde creas que está.",
    frio: "Frío", caliente: "Caliente",
    msgInicio: "Explora la imagen. Cada toque te dirá si estás cerca.",
    msgQuemando: "¡Quemándote! Acércate más con el zoom.",
    msgCaliente: "Caliente. Está por esta zona.",
    msgTibio: "Tibio. Vas por buen camino.",
    msgFrio: "Frío. Prueba en otra zona.",
    errorFoto: "No se pudo cargar la imagen {img}. Revisa que el archivo exista en esa carpeta.",
    casoResuelto: "¡Caso resuelto!",
    detalleExito: "Lo encontraste en {t} con {n} {intentos}{pistas}.",
    intento1: "intento", intentoN: "intentos",
    conPistas: " y {n} {pistas}", sinPistas: " y sin pistas",
    pista1: "pista", pistaN: "pistas",
    coordenadas: " Coordenadas: {c}.",
    viveMision: "Vive su misión",
    pedirPista: "💡 Pedir una pista",
    otraPista: "💡 Otra pista (quedan {n})",
    sinMasPistas: "Ya usaste todas las pistas",
    imagen: "Imagen",
    estrellasDe: "{n} de 3 estrellas",

    decisionXdeY: "Decisión {x} de {y}",
    eres: "Eres {nombre}",
    igualNasa: "Elegiste como el equipo de misión.",
    distintoNasa: "El equipo eligió otra opción, y la tuya tenía su lógica.",
    loQuePaso: "Lo que pasó de verdad",
    loQueSeLogro: "Lo que se logró",
    siguienteDecision: "Siguiente decisión",
    recibirMensaje: "Recibir su último mensaje",

    hola: "Hola, soy {nombre}",
    historiasTitulo: "Historias de otros mundos",
    historiasIntro: "Robots, naves y astronautas que vivieron aventuras increíbles. Elige una historia y mírala a tu ritmo.",
    volverHistorias: "← Todas las historias",
    pxReproducir: "▶ Reproducir", pxPausa: "⏸ Pausa", pxAnterior: "◀ Anterior", pxSiguiente: "Siguiente ▶", pxFin: "Terminar ✓",
    pxLeerTodo: "Leer toda la historia", pxEscenas: "{n} escenas", pxListaEscenas: "Escenas de la historia", pxIrEscena: "Ir a la escena {i}",
    historiaFinPregunta: "¿Te gustaría construir algo así?",
    respSi: "¡Sí!", respTalvez: "Tal vez", respNo: "No",
    resp_si: "¡Genial! Las personas que hicieron esto empezaron con la misma curiosidad que tú.",
    resp_talvez: "Está bien no saberlo todavía. Detrás de cada misión hay ingenieras, científicos, programadores y muchas personas más.",
    resp_no: "¡No pasa nada! Igual ya sabes algo que muy poca gente sabe.",
    otraHistoria: "Ver otra historia",
    mostrarTodo: "Mostrar todo",
    quienSoy: "¿Quién soy?", queDescubri: "¿Qué descubrí?", porQueMeQuede: "¿Por qué me quedé?", comoEstoyHoy: "¿Cómo estoy hoy?",
    fuentes: "¿De dónde sale esta información?",
    archivar: "Archivar el caso 🏆",
    fotoReal: "Foto real de {nombre}",

    rango4: "Detective de Otros Mundos", rango3: "Detective de campo", rango2: "Detective novato", rango1: "Cadete espacial",
    placaDatos: "{a} de {b} casos resueltos, {e} de {m} estrellas",
    placaCompleta: "Encontraste todos los equipos. Ya eres parte de su historia.",
    archivo: "Archivo de casos",
    casoSinResolver: "Caso sin resolver",
    buscaloParaAbrir: "Búscalo para abrir su expediente",
    enTiempo: "en {t}",
    buscarMas: "Buscar más casos",
    borrar: "Borrar mi progreso", borrarConfirmar: "Toca otra vez para borrar todo",

    norte: "N", sur: "S", este: "E", oeste: "O"
  },

  en: {
    marca: "Other-World<br>Detectives",
    irInicio: "Go to start",
    sonidoOn: "Sound on", sonidoOff: "Sound off",
    estrellas: "{n} stars out of {max}",
    cambiarIdioma: "Cambiar a español",

    lugar_marte: "Mars", lugar_luna: "Moon", lugar_espacio: "Beyond",
    de_marte: "of Mars", de_luna: "of the Moon", de_espacio: "of deep space",
    en_marte: "on Mars", en_luna: "on the Moon", en_espacio: "beyond",
    desde_marte: "Message from Mars", desde_luna: "Message from the Moon", desde_espacio: "Message from deep space",

    inicioTitulo: "NASA left robots on other worlds. Can you find them?",
    inicioIntro: "Spin the planet, pick a case and search for it in real NASA photos and maps. Then make its toughest decisions and hear its story.",
    elegirLugar: "Choose where to investigate",
    casosEn: "Cases {lugar}",
    proximamente: "Coming soon", sinResolver: "Unsolved", resuelto: "Solved",
    misCasos: "My solved cases: {a} of {b}",
    globo: "Globe {lugar}. Drag to spin it.",
    arrastra: "Drag to spin",
    esquemaAria: "Sketch of the Solar System with the cases",
    pinResuelto: "case solved", pinAbierto: "unsolved",

    buscarMapa: "Search on the map {lugar}",
    buscarOrbita: "Real photo from orbit {lugar}",
    buscarFotoNave: "Real photo taken by the spacecraft",
    buscarEsquema: "Search the Solar System",
    ubica: "Locate", encuentra: "Find",
    notaMapa: "This is the real map {lugar}, made from thousands of NASA photos. Here each pixel is kilometers wide and the spacecraft are only a few meters long, so you can't see them in the original image. That's why we placed a drawing at each one's exact spot: use the clues, zoom in and it will appear. The yellow lines are the equator and the 0° meridian.",
    msgNaveVisible: "Look closely! You can see a drawing of something from here…",
    notaEsquema: "This is a top-down sketch of the Solar System drawn for the game. Real distances are much, much bigger.",
    tiempo: "Time", intentos: "Tries", pistasUsadas: "Clues used",
    acercar: "Zoom in", alejar: "Zoom out", verTodo: "See the whole image",
    ayudaVisor: "Pinch or use ＋ to zoom in. Tap where you think it is.",
    frio: "Cold", caliente: "Hot",
    msgInicio: "Explore the image. Each tap tells you if you're close.",
    msgQuemando: "Burning hot! Zoom in closer.",
    msgCaliente: "Hot. It's around here.",
    msgTibio: "Warm. You're on the right track.",
    msgFrio: "Cold. Try another area.",
    errorFoto: "Couldn't load the image {img}. Check that the file is in that folder.",
    casoResuelto: "Case solved!",
    detalleExito: "You found it in {t} with {n} {intentos}{pistas}.",
    intento1: "try", intentoN: "tries",
    conPistas: " and {n} {pistas}", sinPistas: " and no clues",
    pista1: "clue", pistaN: "clues",
    coordenadas: " Coordinates: {c}.",
    viveMision: "Live its mission",
    pedirPista: "💡 Ask for a clue",
    otraPista: "💡 Another clue ({n} left)",
    sinMasPistas: "You've used all the clues",
    imagen: "Image",
    estrellasDe: "{n} out of 3 stars",

    decisionXdeY: "Decision {x} of {y}",
    eres: "You are {nombre}",
    igualNasa: "You chose like the mission team.",
    distintoNasa: "The team chose another option, and yours had its logic.",
    loQuePaso: "What really happened",
    loQueSeLogro: "What it achieved",
    siguienteDecision: "Next decision",
    recibirMensaje: "Receive its last message",

    hola: "Hi, I'm {nombre}",
   
    historiasTitulo: "Stories from other worlds",
    historiasIntro: "Robots, spacecraft and astronauts that had amazing adventures. Pick a story and watch it at your own pace.",
    volverHistorias: "← All stories",
    pxReproducir: "▶ Play", pxPausa: "⏸ Pause", pxAnterior: "◀ Back", pxSiguiente: "Next ▶", pxFin: "Finish ✓",
    pxLeerTodo: "Read the whole story", pxEscenas: "{n} scenes", pxListaEscenas: "Story scenes", pxIrEscena: "Go to scene {i}",
    historiaFinPregunta: "Would you like to build something like this?",
    respSi: "Yes!", respTalvez: "Maybe", respNo: "No",
    resp_si: "Awesome! The people who made this started with the same curiosity you have.",
    resp_talvez: "It's fine not to know yet. Behind every mission there are engineers, scientists, programmers and many more people.",
    resp_no: "That's okay! You still know something very few people know.",
    otraHistoria: "Watch another story",
    mostrarTodo: "Show all",
    quienSoy: "Who am I?", queDescubri: "What did I discover?", porQueMeQuede: "Why did I stay?", comoEstoyHoy: "How am I today?",
    fuentes: "Where does this information come from?",
    archivar: "File the case 🏆",
    fotoReal: "Real photo of {nombre}",

    rango4: "Other-World Detective", rango3: "Field Detective", rango2: "Rookie Detective", rango1: "Space Cadet",
    placaDatos: "{a} of {b} cases solved, {e} of {m} stars",
    placaCompleta: "You found every explorer. Now you're part of their story.",
    archivo: "Case files",
    casoSinResolver: "Unsolved case",
    buscaloParaAbrir: "Find it to open its file",
    enTiempo: "in {t}",
    buscarMas: "Find more cases",
    borrar: "Erase my progress", borrarConfirmar: "Tap again to erase everything",

    norte: "N", sur: "S", este: "E", oeste: "W"
  }
};

// Decisiones: contexto, apuesta de confianza, tercera opción y temporizador
Object.assign(TEXTOS.es, {
  loQueSabias: "Lo que sabías en ese momento",
  ctx_meta: "Objetivo", ctx_riesgo: "Riesgo", ctx_recursos: "Recursos", ctx_tiempo: "Tiempo", ctx_dato: "Dato",
  queTanSeguro: "¿Qué tan seguro estás?",
  seguro1: "Poco", seguro2: "Bastante", seguro3: "Totalmente",
  verResultado: "Ver lo que pasó",
  elEquipoEligio: "El equipo eligió esto",
  elegisteComoEquipo: "¡Elegiste como el equipo de misión!",
  elegisteDistinto: "El equipo eligió otra cosa, y tu opción tenía su lógica",
  elegisteTercera: "El equipo eligió otra cosa. Tu idea era posible, pero no fue la que usaron",
  tuOpcionTambien: "Por qué la otra opción también tenía sentido",
  puntosConfianza: "+{n} de confianza",
  conf_acierto3: "Instinto de ingeniería: estabas seguro y acertaste.",
  conf_acierto2: "Buen criterio.",
  conf_acierto1: "Dudaste, pero pensaste como el equipo.",
  conf_error3: "Muy seguro y distinto al equipo: por eso las misiones prueban antes de decidir.",
  conf_error2: "Pasa en las misiones reales: se discute mucho antes de elegir.",
  conf_error1: "Dudar también es de ingenieros: te faltaban datos.",
  resumenMision: "Decidiste como el equipo en {a} de {b}. Puntos de confianza: {p}.",
  temporizador: "Control de misión: decide en {s} s",
  quitarTiempo: "Quitar el tiempo",
  tiempoAgotado: "Se acabó el tiempo. En control de misión hay que decidir igual: elige cuando quieras.",
  escenaDecision: "Escena animada del momento de la decisión"
});
Object.assign(TEXTOS.en, {
  loQueSabias: "What you knew at that moment",
  ctx_meta: "Goal", ctx_riesgo: "Risk", ctx_recursos: "Resources", ctx_tiempo: "Time", ctx_dato: "Fact",
  queTanSeguro: "How sure are you?",
  seguro1: "A little", seguro2: "Fairly", seguro3: "Completely",
  verResultado: "See what happened",
  elEquipoEligio: "The team chose this",
  elegisteComoEquipo: "You chose like the mission team!",
  elegisteDistinto: "The team chose something else, and your option had its logic",
  elegisteTercera: "The team chose something else. Your idea was possible, but it wasn't the one they used",
  tuOpcionTambien: "Why the other option also made sense",
  puntosConfianza: "+{n} confidence",
  conf_acierto3: "Engineering instinct: you were sure and you were right.",
  conf_acierto2: "Good judgment.",
  conf_acierto1: "You hesitated, but you thought like the team.",
  conf_error3: "Very sure and different from the team: that's why missions test before deciding.",
  conf_error2: "It happens on real missions: there's a lot of debate before choosing.",
  conf_error1: "Doubting is also what engineers do: you were missing data.",
  resumenMision: "You decided like the team in {a} of {b}. Confidence points: {p}.",
  temporizador: "Mission control: decide in {s} s",
  quitarTiempo: "Remove the timer",
  tiempoAgotado: "Time's up. In mission control you still have to decide: choose whenever you're ready.",
  escenaDecision: "Animated scene of the moment of the decision"
});

// Textos de los pasos del juego, la nueva despedida y el archivo para adultos
Object.assign(TEXTOS.es, {
  pasosAria: "Pasos del caso",
  paso1: "Encuéntralo", paso2: "Decide", paso3: "Su historia",
  pasoActual: "paso actual",
  comoSeJuega: "Cómo se juega",
  guia1: "Elige un caso en el mapa o en la lista.",
  guia2: "Búscalo en una foto o un mapa real. Las pistas te ayudan.",
  guia3: "Toma las decisiones que tuvo que tomar su equipo.",
  guia4: "Escucha su historia y archívala en tu colección.",
  inicioIntroCorta: "Elige un mundo y un caso. Después búscalo en imágenes reales, toma sus decisiones y conoce su historia.",
  ficha: "Ficha", fichaLugar: "Dónde está", fichaPeriodo: "Misión", fichaTipo: "Qué es", fichaCoordenadas: "Coordenadas",
  dondeEspacio: "En el espacio, lejos de cualquier planeta",
  lineaMensajes: "Mensajes recibidos",
  cierreJoven: "Lo que acabas de resolver, lo resolvió un equipo de misión de verdad. ¿Te ves haciéndolo?",
  cierreAdulto: "Cada decisión de este caso la tomó un equipo de personas reales. Compártelo con alguien que podría ser parte del próximo.",
  verHistoria8: "Ver su historia en 8 bits",
  verHistoria8Nota: "Versión animada para menores de 14",
  // Archivo de misiones (18+)
  archivoTitulo: "Archivo de misiones",
  archivoIntro: "16 equipos que NASA dejó en Marte, en la Luna y en el espacio profundo. Cada expediente reúne los datos, las decisiones reales de su equipo, preguntas para conversar en clase y las fuentes.",
  archivoFiltro: "Mostrar",
  todos: "Todos",
  ordenar: "Ordenar", porFecha: "Por fecha", porNombre: "Por nombre",
  archivoJugar: "Jugar a encontrarlos",
  archivoJugarNota: "El mismo contenido como juego de búsqueda",
  verArchivo: "Ver el archivo de misiones",
  abrirExpediente: "Abrir expediente de {nombre}",
  expedientes: "{n} expedientes",
  volverArchivo: "Volver al archivo",
  expHistoria: "Su historia",
  expDecisiones: "Las decisiones de su equipo",
  expDecisionesNota: "Elige lo que habrías hecho y compáralo con lo que pasó.",
  expDecision: "Decisión {n}",
  expQueHarias: "¿Qué habrías decidido?",
  expVerRespuesta: "Ver lo que pasó",
  expAula: "Para conversar en clase",
  aula1: "Elijan una de las decisiones. ¿Qué riesgo aceptó el equipo y qué ganó a cambio?",
  aula2: "¿Qué habría pasado si hubieran elegido la otra opción? Busquen argumentos en las fuentes.",
  aula3: "Este equipo se quedó {lugar}. ¿Debería quedarse ahí, recuperarse algún día o protegerse como patrimonio? Defiendan las dos posturas.",
  aula4: "Ubíquenlo en el mapa con el modo de juego y expliquen por qué está justo ahí.",
  expBuscar: "Buscarlo en el juego",
  expImprimir: "Imprimir expediente",
  expFuentes: "Fuentes",
  expFoto: "Foto",
  expSinFoto: "No hay una foto de este equipo en el espacio: la ilustración es del juego."
});
Object.assign(TEXTOS.en, {
  pasosAria: "Case steps",
  paso1: "Find it", paso2: "Decide", paso3: "Its story",
  pasoActual: "current step",
  comoSeJuega: "How to play",
  guia1: "Pick a case on the map or in the list.",
  guia2: "Find it in a real photo or map. Clues help you.",
  guia3: "Make the decisions its team had to make.",
  guia4: "Hear its story and file it in your collection.",
  inicioIntroCorta: "Pick a world and a case. Then find it in real images, make its decisions and learn its story.",
  ficha: "Fact sheet", fichaLugar: "Where it is", fichaPeriodo: "Mission", fichaTipo: "What it is", fichaCoordenadas: "Coordinates",
  dondeEspacio: "In space, far from any planet",
  lineaMensajes: "Messages received",
  cierreJoven: "What you just solved was solved by a real mission team. Can you see yourself doing it?",
  cierreAdulto: "Every decision in this case was made by a team of real people. Share it with someone who could be part of the next one.",
  verHistoria8: "Watch its 8-bit story",
  verHistoria8Nota: "Animated version for under-14s",
  archivoTitulo: "Mission archive",
  archivoIntro: "16 pieces of hardware NASA left on Mars, on the Moon and in deep space. Each file brings together the facts, the real decisions of its team, classroom discussion questions and the sources.",
  archivoFiltro: "Show",
  todos: "All",
  ordenar: "Sort", porFecha: "By date", porNombre: "By name",
  archivoJugar: "Play the search game",
  archivoJugarNota: "The same content as a search game",
  verArchivo: "View the mission archive",
  abrirExpediente: "Open the file on {nombre}",
  expedientes: "{n} files",
  volverArchivo: "Back to the archive",
  expHistoria: "Its story",
  expDecisiones: "Its team's decisions",
  expDecisionesNota: "Choose what you would have done and compare it with what happened.",
  expDecision: "Decision {n}",
  expQueHarias: "What would you have decided?",
  expVerRespuesta: "See what happened",
  expAula: "For classroom discussion",
  aula1: "Pick one of the decisions. What risk did the team accept, and what did they gain?",
  aula2: "What would have happened if they had chosen the other option? Look for arguments in the sources.",
  aula3: "This hardware stayed {lugar}. Should it stay there, be recovered someday, or be protected as heritage? Argue both sides.",
  aula4: "Locate it on the map with the game mode and explain why it is right there.",
  expBuscar: "Find it in the game",
  expImprimir: "Print file",
  expFuentes: "Sources",
  expFoto: "Photo",
  expSinFoto: "There is no photo of this hardware in space: the drawing is from the game."
});

let idioma = (() => {
  try {
    const guardado = localStorage.getItem("detectives-idioma");
    if (guardado === "es" || guardado === "en") return guardado;
  } catch (e) {}
  return (navigator.language || "es").toLowerCase().startsWith("en") ? "en" : "es";
})();

function t(clave, vars) {
  let texto = (TEXTOS[idioma] && TEXTOS[idioma][clave]) ?? TEXTOS.es[clave] ?? clave;
  if (vars) for (const k in vars) texto = texto.split("{" + k + "}").join(vars[k]);
  return texto;
}

function cambiarIdioma(nuevo) {
  idioma = nuevo;
  try { localStorage.setItem("detectives-idioma", nuevo); } catch (e) {}
  document.documentElement.lang = nuevo;
}

// Devuelve una copia del equipo con los textos del idioma actual
function loc(e) {
  if (idioma === "es" || typeof EQUIPOS_EN === "undefined" || !EQUIPOS_EN[e.id]) return e;
  const tr = EQUIPOS_EN[e.id];
  const c = Object.assign({}, e, {
    nombre: tr.nombre ?? e.nombre,
    nombreCorto: tr.nombreCorto ?? tr.nombre ?? e.nombreCorto,
    etiquetaMapa: tr.etiquetaMapa ?? e.etiquetaMapa,
    buscar: tr.buscar ?? e.buscar,
    tipo: tr.tipo ?? e.tipo,
    anios: tr.anios ?? e.anios,
    despedida: tr.despedida ?? e.despedida
  });
  c.foto = Object.assign({}, e.foto, { pistas: tr.pistas ?? e.foto.pistas, credito: tr.credito ?? e.foto.credito });
  if (e.fotoEquipo) c.fotoEquipo = Object.assign({}, e.fotoEquipo, { credito: tr.fotoCredito ?? e.fotoEquipo.credito });
  c.decisiones = e.decisiones.map((d, i) => {
    const dt = (tr.decisiones || [])[i];
    if (!dt) return d;
    return {
      quien: dt.quien ?? d.quien,
      situacion: dt.situacion,
      opciones: d.opciones.map((o, j) => ({ texto: dt.opciones[j], loHizoNasa: o.loHizoNasa })),
      queHizoNasa: dt.queHizoNasa,
      ciencia: dt.ciencia,
      contexto: (d.contexto || []).map((c, k) => ({ tipo: c.tipo, texto: (dt.contexto || [])[k] ?? c.texto })),
      porQueOtra: dt.porQueOtra ?? d.porQueOtra,
      tercera: dt.tercera ?? d.tercera
    };
  });
  return c;
}


/* ---------- Textos del perfil y los niveles ---------- */
Object.assign(TEXTOS.es, {
  perfilTitulo: "Antes de empezar, cuéntanos de ti",
  perfilTituloEditar: "Tu perfil de detective",
  perfilIntro: "Así ajustamos los casos a tu medida. No pedimos tu nombre ni tu correo.",
  perfilEdad: "¿Cuántos años tienes?",
  edad_nino: "Menos de 14",
  edad_adolescente: "14 a 17",
  edad_adulto: "18 o más (docente o tutor)",
  perfilExperiencia: "¿Cuánto sabes del espacio?",
  experiencia_nada: "Casi nada",
  experiencia_escuela: "Lo que vi en el colegio",
  experiencia_aficionado: "Me encanta y leo sobre esto",
  perfilNivel: "Elige tu nivel de detective",
  nivel_aprendiz: "Aprendiz",
  nivel_investigador: "Investigador",
  nivel_experto: "Experto",
  nivelTexto_aprendiz: "Tres pistas, y la primera es de regalo.",
  nivelTexto_investigador: "Tres pistas y el termómetro de frío y caliente.",
  nivelTexto_experto: "Una sola pista y sin termómetro.",
  sugerido: "Sugerido para ti",
  empezar: "Empezar a investigar",
  guardarPerfil: "Guardar",
  nivelChip: "Nivel: {n}",
  cambiarPerfil: "Cambiar nivel",
  pistaGratis: "Pista de regalo",
  msgNoEsta: "No está ahí. Sigue buscando.",
  sinTermometro: "Nivel experto: sin termómetro. Guíate por las pistas y la imagen."
});

Object.assign(TEXTOS.en, {
  perfilTitulo: "Before you start, tell us about you",
  perfilTituloEditar: "Your detective profile",
  perfilIntro: "This is how we fit the cases to you. We don't ask for your name or email.",
  perfilEdad: "How old are you?",
  edad_nino: "Under 14",
  edad_adolescente: "14 to 17",
  edad_adulto: "18 or older (teacher or guardian)",
  perfilExperiencia: "How much do you know about space?",
  experiencia_nada: "Almost nothing",
  experiencia_escuela: "What I learned at school",
  experiencia_aficionado: "I love it and read about it",
  perfilNivel: "Choose your detective level",
  nivel_aprendiz: "Apprentice",
  nivel_investigador: "Investigator",
  nivel_experto: "Expert",
  nivelTexto_aprendiz: "Three clues, and the first one is free.",
  nivelTexto_investigador: "Three clues and the hot-and-cold thermometer.",
  nivelTexto_experto: "Just one clue and no thermometer.",
  sugerido: "Suggested for you",
  empezar: "Start investigating",
  guardarPerfil: "Save",
  nivelChip: "Level: {n}",
  cambiarPerfil: "Change level",
  pistaGratis: "Free clue",
  msgNoEsta: "It's not there. Keep looking.",
  sinTermometro: "Expert level: no thermometer. Use the clues and the image."
});

document.documentElement.lang = idioma;
