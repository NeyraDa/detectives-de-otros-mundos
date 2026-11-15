/* =========================================================
   SONIDO — todo generado con Web Audio (sin archivos, sin derechos de autor).
   sonar("calor", 0..1 | "acierto" | "elegir" | "tecla" | "revelar" | "transmision")
   musica("tension")  → música de suspenso en bucle (decisiones)
   detenerMusica()    → la apaga con un desvanecido
   ========================================================= */

const Sonido = (() => {
  let ctx = null;
  let salida = null;          // todo pasa por aquí, para poder silenciar de golpe
  let activo = true;
  try { activo = localStorage.getItem("detectives-sonido") !== "no"; } catch (e) {}

  function contexto() {
    if (!ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      ctx = new AC();
      salida = ctx.createGain();
      salida.gain.value = 1;
      salida.connect(ctx.destination);
    }
    if (ctx.state === "suspended") ctx.resume();
    return ctx;
  }

  function tono(frecuencia, inicio, duracion, tipo = "sine", volumen = 0.08, destino) {
    const c = contexto();
    if (!c) return;
    const t = c.currentTime + inicio;
    const osc = c.createOscillator();
    const gan = c.createGain();
    osc.type = tipo;
    osc.frequency.setValueAtTime(frecuencia, t);
    gan.gain.setValueAtTime(0.0001, t);
    gan.gain.exponentialRampToValueAtTime(volumen, t + 0.01);
    gan.gain.exponentialRampToValueAtTime(0.0001, t + duracion);
    osc.connect(gan).connect(destino || salida);
    osc.start(t);
    osc.stop(t + duracion + 0.02);
  }

  // Ruido blanco filtrado: estática de radio
  function estatica(inicio, duracion, volumen = 0.05) {
    const c = contexto();
    if (!c) return;
    const t = c.currentTime + inicio;
    const largo = Math.floor(c.sampleRate * duracion);
    const buffer = c.createBuffer(1, largo, c.sampleRate);
    const datos = buffer.getChannelData(0);
    for (let i = 0; i < largo; i++) datos[i] = (Math.random() * 2 - 1) * (0.6 + 0.4 * Math.sin(i / 900));
    const fuente = c.createBufferSource();
    fuente.buffer = buffer;
    const filtro = c.createBiquadFilter();
    filtro.type = "bandpass";
    filtro.frequency.value = 1800;
    filtro.Q.value = 0.8;
    const gan = c.createGain();
    gan.gain.setValueAtTime(0.0001, t);
    gan.gain.exponentialRampToValueAtTime(volumen, t + 0.05);
    gan.gain.exponentialRampToValueAtTime(0.0001, t + duracion);
    fuente.connect(filtro).connect(gan).connect(salida);
    fuente.start(t);
    fuente.stop(t + duracion + 0.02);
  }

  function sonar(nombre, valor = 0) {
    if (!activo) return;
    switch (nombre) {
      case "calor":   // más agudo cuanto más cerca
        tono(220 + valor * 660, 0, 0.18, "triangle");
        break;
      case "acierto":
        [523, 659, 784, 1046].forEach((f, i) => tono(f, i * 0.09, 0.35, "triangle", 0.1));
        break;
      case "elegir":
        tono(440, 0, 0.08, "square", 0.04);
        tono(660, 0.07, 0.12, "square", 0.04);
        break;
      case "tecla":
        tono(1200 + Math.random() * 300, 0, 0.025, "square", 0.012);
        break;
      case "revelar":  // "¿y qué pasó de verdad?": barrido que sube y acorde abierto
        [196, 247, 294, 392].forEach((f, i) => tono(f, 0.05 + i * 0.06, 1.4, "sine", 0.05));
        tono(784, 0.3, 1.2, "triangle", 0.03);
        break;
      case "transmision":  // estática + pitidos de radio
        estatica(0, 0.7, 0.05);
        tono(1320, 0.75, 0.08, "sine", 0.05);
        tono(1320, 0.9, 0.08, "sine", 0.05);
        tono(1760, 1.05, 0.14, "sine", 0.05);
        break;
      /* Sonidos de las historias en 8 bits */
      case "rebote":
        tono(180, 0, 0.12, "square", 0.05);
        tono(120, 0.05, 0.14, "square", 0.04);
        break;
      case "golpe":
        tono(140, 0, 0.08, "square", 0.07);
        estatica(0, 0.06, 0.05);
        break;
      case "clac":
        tono(900, 0, 0.03, "square", 0.04);
        tono(600, 0.06, 0.04, "square", 0.04);
        break;
      case "bip":
        tono(1046, 0, 0.07, "square", 0.03);
        break;
      case "fallo":
        tono(330, 0, 0.18, "square", 0.05);
        tono(220, 0.18, 0.3, "square", 0.05);
        break;
      case "despegue":
        estatica(0, 1.2, 0.06);
        tono(90, 0, 1.2, "sawtooth", 0.03);
        break;
      case "fiesta":
        [523, 659, 784, 659, 1046].forEach((f, i) => tono(f, i * 0.08, 0.16, "square", 0.04));
        break;
      default:
        tono(520, 0, 0.06, "sine", 0.05);
    }
  }

  /* ---------- Música de tensión ----------
     Un zumbido grave que respira, un latido de corazón y unas notas
     agudas que aparecen de vez en cuando. Se programa por compases. */
  let musicaActual = null;

  function musica(nombre) {
    if (!activo || musicaActual) return;
    const c = contexto();
    if (!c || nombre !== "tension") return;

    const bus = c.createGain();
    bus.gain.setValueAtTime(0.0001, c.currentTime);
    bus.gain.exponentialRampToValueAtTime(1, c.currentTime + 1.5);
    bus.connect(salida);

    // Zumbido: dos ondas casi iguales que "laten" entre sí, con filtro que se abre y cierra
    const filtro = c.createBiquadFilter();
    filtro.type = "lowpass";
    filtro.frequency.value = 220;
    filtro.Q.value = 6;
    const lfo = c.createOscillator();
    const lfoGan = c.createGain();
    lfo.frequency.value = 0.12;
    lfoGan.gain.value = 140;
    lfo.connect(lfoGan).connect(filtro.frequency);
    const zumbidoGan = c.createGain();
    zumbidoGan.gain.value = 0.05;
    const osciladores = [55, 55.6, 82.4].map((f) => {
      const o = c.createOscillator();
      o.type = "sawtooth";
      o.frequency.value = f;
      o.connect(filtro);
      o.start();
      return o;
    });
    filtro.connect(zumbidoGan).connect(bus);
    lfo.start();

    const compas = 1.6;                       // segundos por compás
    const notas = [659, 622, 587, 554];       // bajan de a medio tono: suspenso
    let siguiente = c.currentTime + 0.4;
    let n = 0;
    function programar() {
      while (siguiente < c.currentTime + 1.2) {
        // latido: pum-pum
        tono(62, siguiente, 0.22, "sine", 0.22, bus);
        tono(58, siguiente + 0.28, 0.2, "sine", 0.16, bus);
        // tic de reloj en el tiempo débil
        tono(2400, siguiente + 0.8, 0.02, "square", 0.008, bus);
        // cada 2 compases, una nota aguda y fría
        if (n % 2 === 1) tono(notas[(n >> 1) % notas.length], siguiente + 0.4, 1.3, "sine", 0.025, bus);
        siguiente += compas;
        n++;
      }
    }
    programar();
    const reloj = setInterval(programar, 300);

    musicaActual = { bus, osciladores, lfo, reloj };
  }

  function detenerMusica() {
    if (!musicaActual || !ctx) return;
    const { bus, osciladores, lfo, reloj } = musicaActual;
    musicaActual = null;
    clearInterval(reloj);
    const t = ctx.currentTime;
    bus.gain.cancelScheduledValues(t);
    bus.gain.setValueAtTime(Math.max(bus.gain.value, 0.0001), t);
    bus.gain.exponentialRampToValueAtTime(0.0001, t + 0.6);
    setTimeout(() => {
      osciladores.forEach((o) => o.stop());
      lfo.stop();
      bus.disconnect();
    }, 700);
  }

  function alternar() {
    activo = !activo;
    try { localStorage.setItem("detectives-sonido", activo ? "si" : "no"); } catch (e) {}
    if (!activo) detenerMusica();
    return activo;
  }

  return { sonar, musica, detenerMusica, alternar, estaActivo: () => activo, sonandoMusica: () => !!musicaActual };
})();
