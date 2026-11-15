/* =========================================================
   PIXEL v2 — motor de historias animadas en 8 bits (sin librerías)

   Cómo se escribe una escena (ver historias.js):
   {
     fondo: "marte",            // decorado; cada uno tiene su línea de suelo
     pan: [0, 120],             // la cámara se desplaza por el paisaje (px)
     dur: 6000,                 // lo que dura la animación (ms)
     actores: [ ... ],          // ver abajo
     fx: [ ... ],               // polvo, señales, tormenta, destellos, etc.
     ev: [[0.3, "golpe"]],      // sonidos en un momento de la escena (0 a 1)
     temblor: [[0.2, 0.5, 2]],  // la imagen tiembla entre 0.2 y 0.5, fuerza 2
     es: [subtítulo, descripción para lector de pantalla],
     en: [subtitle, description],
   }

   Actor: x es el CENTRO y y son los PIES (la base del dibujo).
   Si no se da y, el actor queda parado sobre el suelo del fondo.
   { sp, x, y, desde, hasta, k: [[t, x, y], ...], aparece, desaparece,
     cambia: [[t, "otroSprite"]], salta: {n, alto}, anim (cuadros/s),
     flota, vibra, espejo, escala, parpadea }

   Reglas de accesibilidad:
   - nada arranca solo; pausa, anterior, siguiente y salto a cada escena;
   - el texto nunca va dentro del dibujo: subtítulos en HTML;
   - con "reducir movimiento" se ven viñetas fijas, sin temblores ni destellos.
   ========================================================= */

const Pixel = (() => {
  const ANCHO = 192;
  const ALTO = 108;
  const ESCALA = 2;                         // los sprites se ven al doble
  const P = PALETA_8BITS;
  const S = SPRITES_8BITS;

  // Línea del suelo de cada fondo (donde se apoyan los pies)
  const SUELO = {
    marte: 90, marteAtardecer: 90, marteNoche: 90, duna: 90, crater: 90,
    luna: 90, lunaTierra: 90, lunaNoche: 90, lunaMontes: 90,
    laboratorio: 94, control: 96, sala: 96, antena: 96, plataforma: 96,
    espacio: 104, espacioSol: 104,
  };

  /* ---------- Sprites en caché ---------- */
  const cache = {};
  function cuadros(nombre) {
    const sp = S[nombre];
    if (!sp) return null;
    return Array.isArray(sp[0]) ? sp : [sp];
  }
  function lienzo(nombre, cuadro, espejo) {
    const lista = cuadros(nombre);
    if (!lista) return null;
    const i = cuadro % lista.length;
    const clave = nombre + "#" + i + (espejo ? "<" : "");
    if (cache[clave]) return cache[clave];
    const filas = lista[i];
    const ancho = Math.max(...filas.map((f) => f.length));
    const c = document.createElement("canvas");
    c.width = ancho;
    c.height = filas.length;
    const x = c.getContext("2d");
    filas.forEach((fila, j) => {
      [...fila].forEach((letra, k) => {
        const color = P[letra];
        if (!color) return;
        x.fillStyle = color;
        x.fillRect(espejo ? ancho - 1 - k : k, j, 1, 1);
      });
    });
    cache[clave] = c;
    return c;
  }

  /* ---------- Utilidades ---------- */
  function azar(semilla) {
    let s = semilla >>> 0;
    return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
  }
  const suave = (p) => p * p * (3 - 2 * p);
  const limitar = (v, a, b) => Math.min(b, Math.max(a, v));
  const rect = (ctx, color, x, y, w, h) => { ctx.fillStyle = color; ctx.fillRect(Math.round(x), Math.round(y), w, h); };

  function estrellas(ctx, cantidad, alto, t, semilla, pan = 0) {
    const r = azar(semilla);
    for (let i = 0; i < cantidad; i++) {
      const x = Math.floor((r() * ANCHO * 2 - pan * 0.1) % ANCHO + ANCHO) % ANCHO;
      const y = Math.floor(r() * alto);
      const fase = r() * 6;
      const brillo = t == null ? 1 : 0.5 + 0.5 * Math.sin(t / 450 + fase);
      rect(ctx, brillo > 0.65 ? P.w : P.g, x, y, 1, 1);
    }
  }

  // Colinas que se mueven más lento que el suelo (paralaje)
  function colinas(ctx, base, color, alto, pan, factor, semilla) {
    ctx.fillStyle = color;
    const f = (semilla % 7) + 9;
    for (let x = 0; x < ANCHO; x++) {
      const u = x + pan * factor;
      const h = alto + Math.round(4 * Math.sin(u / f) + 2 * Math.sin(u / 4.3 + semilla));
      ctx.fillRect(x, base - h, 1, h);
    }
  }

  function terreno(ctx, y, base, sombra, puntos, semilla, pan) {
    rect(ctx, base, 0, y, ANCHO, ALTO - y);
    const r = azar(semilla);
    ctx.fillStyle = sombra;
    const largo = ANCHO * 3;
    for (let i = 0; i < puntos * 3; i++) {
      const px = Math.floor((r() * largo - pan) % largo + largo) % largo;
      const py = y + 2 + Math.floor(r() * (ALTO - y - 2));
      const w = 1 + Math.floor(r() * 4);
      if (px < ANCHO) ctx.fillRect(px, py, w, 1);
    }
  }

  function crater(ctx, x, y, w, borde, fondo) {
    rect(ctx, borde, x, y, w, 1);
    rect(ctx, fondo, x + 1, y + 1, w - 2, 1);
    rect(ctx, borde, x + 2, y + 2, w - 4, 1);
  }

  /* ---------- Fondos ---------- */
  const FONDOS = {
    marte(ctx, t, pan, escena) {
      rect(ctx, "#c98a6b", 0, 0, ANCHO, ALTO);
      rect(ctx, "#d39878", 0, 26, ANCHO, 18);
      rect(ctx, "#ddab88", 0, 44, ANCHO, 16);
      rect(ctx, "#e6bb98", 0, 60, ANCHO, 10);
      if (!escena.sinSol) { rect(ctx, "#fff1d6", 150, 12, 4, 4); rect(ctx, "#ffe8bd", 149, 13, 6, 2); }
      colinas(ctx, 74, "#b8714f", 8, pan, 0.15, 3);
      colinas(ctx, 82, "#a65a3c", 6, pan, 0.4, 5);
      terreno(ctx, 82, P.o, P.r, 60, 7, pan);
      const r = azar(17);
      for (let i = 0; i < 9; i++) {
        const x = Math.floor((r() * ANCHO * 3 - pan) % (ANCHO * 3) + ANCHO * 3) % (ANCHO * 3);
        const y = 86 + Math.floor(r() * 18);
        if (x < ANCHO) { rect(ctx, P.r, x, y, 4, 2); rect(ctx, P.p, x + 1, y, 2, 1); }
      }
    },
    marteAtardecer(ctx, t, pan, escena) {
      // En Marte los atardeceres se ven azulados cerca del Sol
      rect(ctx, "#6b4a5c", 0, 0, ANCHO, ALTO);
      rect(ctx, "#8c6a72", 0, 30, ANCHO, 20);
      rect(ctx, "#a9b7cf", 110, 50, 70, 22);
      rect(ctx, "#cfe0f2", 128, 58, 34, 14);
      rect(ctx, "#ffffff", 143, 64, 4, 4);
      colinas(ctx, 78, "#5a3346", 8, pan, 0.15, 3);
      colinas(ctx, 84, "#4a2a3a", 5, pan, 0.4, 5);
      terreno(ctx, 84, "#7a3a2a", "#5a2a1e", 50, 7, pan);
    },
    marteNoche(ctx, t, pan) {
      rect(ctx, "#1b1530", 0, 0, ANCHO, ALTO);
      estrellas(ctx, 55, 70, t, 3, pan);
      // Fobos y Deimos, las dos lunitas de Marte
      rect(ctx, "#b8b0a0", 34, 16, 3, 2);
      rect(ctx, "#9c9488", 118, 10, 1, 1);
      colinas(ctx, 78, "#3a2030", 8, pan, 0.15, 3);
      colinas(ctx, 84, "#4a2a2a", 5, pan, 0.4, 5);
      terreno(ctx, 84, "#6e3322", "#4a2216", 50, 7, pan);
    },
    duna(ctx, t, pan, escena) {
      FONDOS.marte(ctx, t, pan, escena);
      const cx = escena.dunaX ?? 96;
      ctx.fillStyle = P.t;
      for (let x = cx - 50; x < cx + 50; x++) {
        const h = Math.round(10 * Math.sin(((x - (cx - 50)) / 100) * Math.PI));
        ctx.fillRect(x, 92 - h, 1, h + 3);
      }
      ctx.fillStyle = "#d39c66";
      for (let x = cx - 40; x < cx + 40; x += 6) ctx.fillRect(x, 90 - Math.round(7 * Math.sin(((x - (cx - 50)) / 100) * Math.PI)), 3, 1);
    },
    crater(ctx, t, pan, escena) {
      FONDOS.marte(ctx, t, pan, escena);
      // El cráter Endeavour: una hondonada enorme a la izquierda
      ctx.fillStyle = "#9c4730";
      for (let x = 0; x < 124; x++) {
        const prof = Math.round(20 * Math.sin((x / 124) * Math.PI));
        ctx.fillRect(x, 82, 1, prof);
      }
      ctx.fillStyle = "#7a3422";
      for (let x = 20; x < 104; x++) ctx.fillRect(x, 82 + Math.round(20 * Math.sin((x / 124) * Math.PI)) - 1, 1, 1);
      ctx.fillStyle = "#8e3a25";
      for (let x = 10; x < 110; x += 9) ctx.fillRect(x, 84 + Math.round(10 * Math.sin((x / 120) * Math.PI)), 4, 1);
      rect(ctx, "#f3e9d8", 132, 88, 14, 1);   // la veta blanca de yeso
      rect(ctx, "#f3e9d8", 140, 89, 10, 1);
    },
    luna(ctx, t, pan) {
      rect(ctx, P.k, 0, 0, ANCHO, ALTO);
      estrellas(ctx, 60, 70, t, 11, pan);
      colinas(ctx, 82, "#6d7189", 5, pan, 0.25, 4);
      terreno(ctx, 82, P.g, P.d, 50, 5, pan);
      const r = azar(23);
      for (let i = 0; i < 6; i++) {
        const x = Math.floor((r() * ANCHO * 3 - pan) % (ANCHO * 3) + ANCHO * 3) % (ANCHO * 3);
        const w = 8 + Math.floor(r() * 14);
        if (x < ANCHO) crater(ctx, x, 92 + Math.floor(r() * 10), w, P.l, P.d);
      }
    },
    lunaTierra(ctx, t, pan) {
      FONDOS.luna(ctx, t, pan);
      ctx.drawImage(lienzo("tierra", 0), 156, 12);
    },
    lunaNoche(ctx, t, pan) {
      rect(ctx, P.k, 0, 0, ANCHO, ALTO);
      estrellas(ctx, 70, 80, t, 13, pan);
      colinas(ctx, 82, "#2a2c3d", 5, pan, 0.25, 4);
      terreno(ctx, 82, "#3d4052", "#2b2d3c", 50, 5, pan);
      ctx.drawImage(lienzo("tierra", 0), 156, 12);
    },
    lunaMontes(ctx, t, pan) {
      rect(ctx, P.k, 0, 0, ANCHO, ALTO);
      estrellas(ctx, 50, 50, t, 19, pan);
      // Montes Apeninos al fondo
      ctx.fillStyle = "#7b7f96";
      for (let x = 0; x < ANCHO; x++) {
        const u = x + pan * 0.2;
        const h = 22 + Math.round(10 * Math.abs(Math.sin(u / 23)) + 4 * Math.sin(u / 7));
        ctx.fillRect(x, 82 - h, 1, h);
      }
      // La grieta Hadley: un surco oscuro que serpentea
      terreno(ctx, 82, P.g, P.d, 50, 5, pan);
      ctx.fillStyle = P.h;
      for (let x = 0; x < ANCHO; x++) {
        const u = x + pan;
        ctx.fillRect(x, 100 + Math.round(3 * Math.sin(u / 17)), 1, 3);
      }
    },
    espacio(ctx, t, pan) {
      rect(ctx, P.k, 0, 0, ANCHO, ALTO);
      estrellas(ctx, 110, ALTO, t, 21, pan);
    },
    espacioSol(ctx, t, pan) {
      FONDOS.espacio(ctx, t, pan);
      const sol = lienzo("sol", t == null ? 0 : Math.floor(t / 400), false);
      ctx.drawImage(sol, 96 - sol.width, 54 - sol.height, sol.width * 2, sol.height * 2);
      // La órbita como una línea punteada
      ctx.fillStyle = P.d;
      for (let a = 0; a < Math.PI * 2; a += 0.12) ctx.fillRect(Math.round(96 + Math.cos(a) * 60), Math.round(54 + Math.sin(a) * 34), 1, 1);
    },
    laboratorio(ctx) {
      rect(ctx, P.n, 0, 0, ANCHO, ALTO);
      rect(ctx, "#3a3575", 0, 0, ANCHO, 10);
      for (let x = 10; x < ANCHO; x += 40) rect(ctx, "#4a4590", x, 0, 20, 4);   // luces del techo
      rect(ctx, P.d, 0, 94, ANCHO, ALTO - 94);
      // Arenero de pruebas con arena parecida a la de Marte
      rect(ctx, P.m, 30, 86, 132, 10);
      rect(ctx, P.t, 32, 86, 128, 8);
      ctx.fillStyle = "#d39c66";
      for (let x = 36; x < 158; x += 7) ctx.fillRect(x, 88 + (x % 3), 3, 1);
    },
    control(ctx, t, pan, escena) {
      // Sala de control: una gran pantalla y consolas
      rect(ctx, "#15133a", 0, 0, ANCHO, ALTO);
      rect(ctx, "#221f4d", 0, 0, ANCHO, 8);
      rect(ctx, P.h, 36, 12, 120, 44);
      rect(ctx, "#0e1a2c", 38, 14, 116, 40);
      const pantalla = escena.pantalla;
      if (pantalla === "marte" || pantalla === "luna" || pantalla === "eros") {
        const sp = pantalla === "marte" ? "marte" : pantalla === "luna" ? "tierra" : "mathilde";
        const img = lienzo(sp, 0);
        ctx.drawImage(img, 96 - img.width, 34 - img.height, img.width * 2, img.height * 2);
      }
      // Líneas de datos que corren en la pantalla
      ctx.fillStyle = P.e;
      for (let i = 0; i < 6; i++) {
        const largo = 6 + ((i * 7 + Math.floor((t || 0) / 300)) % 14);
        ctx.fillRect(42, 18 + i * 5, largo, 1);
        ctx.fillRect(150 - largo, 18 + i * 5, largo, 1);
      }
      rect(ctx, "#2a2760", 0, 96, ANCHO, ALTO - 96);
    },
    sala(ctx) {
      // Una sala de una casa en 1971
      rect(ctx, "#5a3d2e", 0, 0, ANCHO, ALTO);
      for (let x = 0; x < ANCHO; x += 12) rect(ctx, "#6a4a38", x, 0, 6, 96);
      rect(ctx, "#3a5fb0", 140, 14, 30, 22);
      rect(ctx, "#14123a", 142, 16, 26, 18);
      estrellas(ctx, 6, 14, null, 41);
      rect(ctx, "#7a4a2a", 0, 96, ANCHO, ALTO - 96);
    },
    antena(ctx, t, pan) {
      rect(ctx, "#14123a", 0, 0, ANCHO, ALTO);
      estrellas(ctx, 60, 70, t, 31, pan);
      colinas(ctx, 92, "#1d3328", 6, pan, 0.2, 2);
      terreno(ctx, 92, "#2b4a3a", "#1f3a2c", 30, 9, pan);
    },
    plataforma(ctx, t) {
      rect(ctx, "#8fc3ea", 0, 0, ANCHO, ALTO);
      rect(ctx, "#a7d1f0", 0, 40, ANCHO, 30);
      rect(ctx, "#2f6f9a", 0, 80, ANCHO, 8);     // el mar en Cabo Cañaveral
      rect(ctx, "#cbb88a", 0, 88, ANCHO, ALTO - 88);
      rect(ctx, P.d, 0, 96, ANCHO, ALTO - 96);
    },
  };

  /* ---------- Movimiento de un actor ---------- */
  function posicion(a, p, suelo) {
    let x, y;
    if (a.k) {
      const k = a.k;
      let i = 0;
      while (i < k.length - 1 && p > k[i + 1][0]) i++;
      const [t0, x0, y0] = k[i];
      const [t1, x1, y1] = k[Math.min(i + 1, k.length - 1)];
      const u = t1 === t0 ? 1 : suave(limitar((p - t0) / (t1 - t0), 0, 1));
      x = x0 + (x1 - x0) * u;
      y = (y0 ?? suelo) + ((y1 ?? suelo) - (y0 ?? suelo)) * u;
    } else {
      const desde = a.desde ?? 0, hasta = a.hasta ?? 1;
      const u = suave(limitar((p - desde) / Math.max(0.0001, hasta - desde), 0, 1));
      const ent = (v, d) => (v == null ? d : Array.isArray(v) ? v[0] + (v[1] - v[0]) * u : v);
      x = ent(a.x, ANCHO / 2);
      y = ent(a.y, suelo);
    }
    return { x, y };
  }

  function seMueve(a, p) {
    if (a.k) return a.k.some((f, i) => i > 0 && p >= a.k[i - 1][0] && p <= f[0] && (f[1] !== a.k[i - 1][1]));
    if (!Array.isArray(a.x)) return false;
    return p >= (a.desde ?? 0) && p <= (a.hasta ?? 1);
  }

  /* ---------- Efectos (sin estado: dependen solo del tiempo) ---------- */
  function particulas(ctx, fx, p, colorA, colorB, sube) {
    const n = fx.n || 10, desde = fx.desde ?? 0, hasta = fx.hasta ?? 1, vida = fx.vida || 0.25;
    const r = azar(fx.semilla || 5);
    for (let i = 0; i < n; i++) {
      const nace = desde + (hasta - desde) * (i / n);
      const edad = (p - nace) / vida;
      const vx = (r() - 0.5) * (fx.ancho || 30);
      const vy = -(r() * (fx.alto || 12)) * (sube ? 1 : 0.6);
      if (edad < 0 || edad > 1) continue;
      const x = fx.x + vx * edad;
      const y = fx.y + vy * edad + (sube ? 0 : 6 * edad * edad);
      rect(ctx, edad < 0.5 ? colorA : colorB, x, y, edad < 0.6 ? 2 : 1, edad < 0.6 ? 2 : 1);
    }
  }

  const DIGITOS = ["111101101101111", "010110010010111", "111001111100111", "111001111001111", "101101111001001",
    "111100111001111", "111100111101111", "111001010010010", "111101111101111", "111101111001111"];
  function numero(ctx, valor, x, y, color, tam) {
    const txt = String(valor);
    txt.split("").forEach((c, i) => {
      const patron = DIGITOS[+c];
      for (let j = 0; j < 15; j++) if (patron[j] === "1") rect(ctx, color, x + i * 4 * tam + (j % 3) * tam, y + Math.floor(j / 3) * tam, tam, tam);
    });
  }

  function efecto(ctx, fx, p, t, mov) {
    const dentro = p >= (fx.desde ?? 0) && p <= (fx.hasta ?? 1);
    const u = limitar((p - (fx.desde ?? 0)) / Math.max(0.0001, (fx.hasta ?? 1) - (fx.desde ?? 0)), 0, 1);
    switch (fx.tipo) {
      case "polvo": particulas(ctx, fx, p, P.p, P.t, false); break;
      case "polvoLuna": particulas(ctx, fx, p, P.l, P.g, false); break;
      case "humo": particulas(ctx, { ...fx, ancho: fx.ancho || 40, alto: fx.alto || 4 }, p, P.l, P.g, false); break;
      case "chispas": if (dentro) particulas(ctx, { ...fx, vida: 0.15 }, p, P.F, P.y, true); break;
      case "tormenta": {
        const fuerza = limitar(fx.fuerza ?? u, 0, 1);
        ctx.globalAlpha = 0.15 + fuerza * 0.7;
        rect(ctx, "#b5714f", 0, 0, ANCHO, ALTO);
        ctx.globalAlpha = 1;
        if (mov) {
          const r = azar(Math.floor(t / 80));
          for (let i = 0; i < 40 + fuerza * 80; i++) rect(ctx, P.t, r() * ANCHO, r() * ALTO, 3, 1);
        }
        break;
      }
      case "oscurecer":
        ctx.globalAlpha = (fx.max ?? 0.7) * u;
        rect(ctx, "#0d0b1f", 0, 0, ANCHO, ALTO);
        ctx.globalAlpha = 1;
        break;
      case "destello":
        if (mov && dentro) {
          ctx.globalAlpha = Math.max(0, 1 - u * 1.5);
          rect(ctx, P.w, 0, 0, ANCHO, ALTO);
          ctx.globalAlpha = 1;
        }
        break;
      case "senal": {
        // Ondas de radio que viajan de (x1, y1) a (x2, y2)
        if (!dentro) break;
        const [x1, y1, x2, y2] = fx.de;
        for (let i = 0; i < 3; i++) {
          const fase = mov ? (u * 3 + i / 3) % 1 : (i + 1) / 4;
          const x = x1 + (x2 - x1) * fase, y = y1 + (y2 - y1) * fase;
          rect(ctx, fx.color || P.e, x, y - 4, 2, 9);
          rect(ctx, fx.color || P.e, x - 2, y - 6, 2, 2);
          rect(ctx, fx.color || P.e, x - 2, y + 5, 2, 2);
        }
        break;
      }
      case "ondas": {
        // Temblor de la Luna: arcos que se abren sobre el suelo
        if (!dentro) break;
        for (let i = 0; i < 3; i++) {
          const fase = mov ? (u * 2 + i / 3) % 1 : (i + 1) / 4;
          const rad = 6 + fase * 70;
          for (let a = Math.PI; a <= Math.PI * 2; a += 0.08) rect(ctx, P.y, fx.x + Math.cos(a) * rad, fx.y + Math.sin(a) * rad * 0.35, 1, 1);
        }
        break;
      }
      case "laser":
        if (!dentro) break;
        for (let i = 0; i < 5; i++) {
          const largo = mov ? ((t / 40 + i * 5) % 30) : 20;
          rect(ctx, P.x, fx.x + i * 6 + (fx.espejo ? -largo : 0), fx.y + i, Math.max(2, largo / 4), 1);
        }
        break;
      case "surco": {
        // Huella brillante que deja una rueda arrastrada
        const x2 = fx.x1 + (fx.x2 - fx.x1) * u;
        if (p < (fx.desde ?? 0)) break;
        rect(ctx, fx.color || P.w, Math.min(fx.x1, x2), fx.y, Math.abs(x2 - fx.x1), 2);
        break;
      }
      case "contador": {
        const v = Math.round(fx.a + (fx.b - fx.a) * u);
        numero(ctx, v, fx.x, fx.y, fx.color || P.w, fx.tam || 2);
        break;
      }
      case "estrellaFugaz":
        if (mov && dentro) {
          const x = 20 + u * 150;
          for (let i = 0; i < 8; i++) rect(ctx, P.w, x - i, 10 + i * 0.5 + u * 20, 1, 1);
        }
        break;
    }
  }

  /* ---------- Un cuadro completo ---------- */
  function dibujar(ctx, e, p, t, mov) {
    ctx.save();
    const pan = Array.isArray(e.pan) ? e.pan[0] + (e.pan[1] - e.pan[0]) * suave(p) : (e.pan || 0);
    if (mov && e.temblor) {
      for (const [a, b, f] of e.temblor) if (p >= a && p <= b) ctx.translate(Math.round(Math.sin(t / 22) * (f || 2)), Math.round(Math.cos(t / 31) * (f || 2) * 0.5));
    }
    (FONDOS[e.fondo] || FONDOS.espacio)(ctx, mov ? t : null, pan, e);
    const suelo = SUELO[e.fondo] ?? 90;

    for (const fx of e.fxAtras || []) efecto(ctx, fx, p, t, mov);

    for (const a of e.actores || []) {
      if (a.aparece != null && p < a.aparece) continue;
      if (a.desaparece != null && p > a.desaparece) continue;
      let nombre = a.sp;
      if (a.cambia) for (const [tc, sp] of a.cambia) if (p >= tc) nombre = sp;
      let { x, y } = posicion(a, p, suelo);
      if (mov && a.salta) {
        const desde = a.salta.desde ?? (a.desde ?? 0), hasta = a.salta.hasta ?? (a.hasta ?? 1);
        const u = limitar((p - desde) / Math.max(0.0001, hasta - desde), 0, 1);
        if (u > 0 && u < 1) {
          // Rebotes que van perdiendo altura
          y -= Math.abs(Math.sin(u * Math.PI * a.salta.n)) * a.salta.alto * (1 - u * (a.salta.amortigua ?? 0.6));
        }
      } else if (!mov && a.salta && a.saltaFijo) y -= a.saltaFijo;
      if (mov && a.flota) y += Math.round(Math.sin(t / 320) * 1.5);
      if (mov && a.vibra && (a.vibraDesde == null || p >= a.vibraDesde)) x += Math.round(Math.sin(t / 35));
      if (a.parpadea && mov && Math.floor(t / 250) % 2) continue;
      const moviendo = mov && (a.anim || seMueve(a, p));
      const fps = a.anim || 8;
      const cuadro = moviendo ? Math.floor(t / (1000 / fps)) : 0;
      const img = lienzo(nombre, cuadro, a.espejo);
      if (!img) continue;
      const esc = (a.escala || 1) * ESCALA;
      const w = Math.round(img.width * esc), h = Math.round(img.height * esc);
      ctx.drawImage(img, Math.round(x - w / 2), Math.round(y - h), w, h);
    }

    for (const fx of e.fx || []) efecto(ctx, fx, p, t, mov);
    ctx.restore();
  }

  /* ---------- Reproductor ---------- */
  function reproductor(contenedor, historia, txt) {
    const mov = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const escenas = historia.escenas;
    let indice = 0, reproduciendo = false, inicio = 0, pausaEn = 0, cuadro = null, ultimoP = 0;

    contenedor.innerHTML = `
      <figure class="pixel-figura">
        <canvas class="pixel-lienzo" width="${ANCHO}" height="${ALTO}" role="img"></canvas>
        <figcaption class="pixel-subtitulo">
          <span class="pixel-texto" aria-hidden="true"></span>
          <span class="solo-lector" aria-live="polite"></span>
        </figcaption>
      </figure>
      <div class="pixel-controles">
        <button type="button" class="btn secundario" data-accion="anterior">${txt.anterior}</button>
        <button type="button" class="btn principal" data-accion="play" aria-pressed="false">${txt.reproducir}</button>
        <button type="button" class="btn secundario" data-accion="siguiente">${txt.siguiente}</button>
      </div>
      <ol class="pixel-puntos" aria-label="${txt.escenas}">
        ${escenas.map((_, i) => `<li><button type="button" data-i="${i}" aria-label="${txt.irEscena(i + 1)}"></button></li>`).join("")}
      </ol>
      <details class="pixel-leer">
        <summary>${txt.leerTodo}</summary>
        <ol>${escenas.map((e) => `<li>${e.texto}</li>`).join("")}</ol>
      </details>`;

    const canvas = contenedor.querySelector("canvas");
    const ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;
    const visible = contenedor.querySelector(".pixel-texto");
    const lector = contenedor.querySelector(".solo-lector");
    const btnPlay = contenedor.querySelector('[data-accion="play"]');
    const btnAnt = contenedor.querySelector('[data-accion="anterior"]');
    const btnSig = contenedor.querySelector('[data-accion="siguiente"]');
    const puntos = [...contenedor.querySelectorAll(".pixel-puntos button")];

    // Cada escena dura lo que su animación o lo que toma leer el texto
    const duracion = (e) => Math.max(e.dur || 5000, 2200 + e.texto.length * 58);

    function escribir(e, pasado) {
      // Efecto "máquina de escribir" solo visual; el lector recibe el texto entero
      if (!mov || !reproduciendo) { visible.textContent = e.texto; return; }
      const letras = Math.min(e.texto.length, Math.floor(pasado / 28));
      visible.textContent = e.texto.slice(0, letras);
    }

    function mostrarEscena(i, completa) {
      indice = i;
      const e = escenas[i];
      lector.textContent = e.texto;
      visible.textContent = completa || !mov ? e.texto : "";
      canvas.setAttribute("aria-label", e.alt);
      btnAnt.disabled = i === 0;
      btnSig.textContent = i === escenas.length - 1 ? txt.fin : txt.siguiente;
      puntos.forEach((b, j) => b.setAttribute("aria-current", j === i ? "step" : "false"));
      ultimoP = 0;
      dibujar(ctx, e, completa || !mov ? 1 : 0, performance.now(), false);
      inicio = performance.now();
      pausaEn = 0;
    }

    function sonidos(e, p) {
      if (typeof Sonido === "undefined" || !e.ev) return;
      for (const [te, nombre] of e.ev) if (ultimoP < te && p >= te) Sonido.sonar(nombre);
    }

    function bucle(ahora) {
      const e = escenas[indice];
      const total = duracion(e);
      const pasado = ahora - inicio;
      const p = Math.min(1, pasado / (e.dur || 5000));
      sonidos(e, p);
      ultimoP = p;
      dibujar(ctx, e, p, ahora, true);
      // Entrada suave desde negro
      if (pasado < 260) { ctx.globalAlpha = 1 - pasado / 260; rect(ctx, P.k, 0, 0, ANCHO, ALTO); ctx.globalAlpha = 1; }
      escribir(e, pasado);
      if (pasado >= total) {
        if (indice < escenas.length - 1) mostrarEscena(indice + 1, false);
        else { detener(); visible.textContent = e.texto; return; }
      }
      cuadro = requestAnimationFrame(bucle);
    }

    function reproducir() {
      if (!mov) return;
      reproduciendo = true;
      inicio = performance.now() - pausaEn;
      btnPlay.textContent = txt.pausa;
      btnPlay.setAttribute("aria-pressed", "true");
      cuadro = requestAnimationFrame(bucle);
    }

    function detener() {
      reproduciendo = false;
      if (cuadro) cancelAnimationFrame(cuadro);
      cuadro = null;
      pausaEn = performance.now() - inicio;
      btnPlay.textContent = txt.reproducir;
      btnPlay.setAttribute("aria-pressed", "false");
      visible.textContent = escenas[indice].texto;
    }

    function ir(i) {
      const sigue = reproduciendo;
      detener();
      mostrarEscena(i, !sigue);
      if (sigue) reproducir();
    }

    btnPlay.addEventListener("click", () => (reproduciendo ? detener() : reproducir()));
    btnAnt.addEventListener("click", () => ir(Math.max(0, indice - 1)));
    btnSig.addEventListener("click", () => {
      if (indice === escenas.length - 1) { detener(); txt.alTerminar(); return; }
      ir(indice + 1);
    });
    puntos.forEach((b) => b.addEventListener("click", () => ir(+b.dataset.i)));
    // Atajos de teclado solo dentro del reproductor
    contenedor.addEventListener("keydown", (ev) => {
      if (ev.target.closest("summary")) return;
      if (ev.key === "ArrowRight") { ev.preventDefault(); btnSig.click(); }
      if (ev.key === "ArrowLeft" && indice > 0) { ev.preventDefault(); btnAnt.click(); }
    });

    if (!mov) {
      btnPlay.hidden = true;
      contenedor.querySelector(".pixel-controles").classList.add("sin-play");
    }

    mostrarEscena(0, true);
    return () => { if (cuadro) cancelAnimationFrame(cuadro); };
  }

  // Miniatura: el último cuadro de una escena
  function miniatura(escena, p = 1) {
    const c = document.createElement("canvas");
    c.width = ANCHO; c.height = ALTO;
    c.className = "pixel-mini";
    c.setAttribute("aria-hidden", "true");
    const ctx = c.getContext("2d");
    ctx.imageSmoothingEnabled = false;
    dibujar(ctx, escena, p, 0, false);
    return c;
  }

  // Para revisar escenas a mano: Pixel.cuadro(canvas, escena, p, t)
  function cuadroEn(canvas, escena, p, t = 1000) {
    const ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;
    dibujar(ctx, escena, p, t, true);
  }

  return { reproductor, miniatura, cuadroEn, ANCHO, ALTO, ESCALA, SUELO };
})();
