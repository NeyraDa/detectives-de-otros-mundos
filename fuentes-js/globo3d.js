/* =========================================================
   GLOBO 3D (Three.js) para la pantalla de inicio
   dibujarPlaneta3D(lugar, equipos, alElegir) → { elemento, detener }
   Misma firma que dibujarPlaneta() de planeta.js. Si el navegador
   no tiene WebGL, usa el globo de planeta.js automáticamente.

   Este archivo es el código fuente. Se empaqueta (con Three.js
   adentro) en public/js/globo3d.js con:
     npx esbuild fuentes-js/globo3d.js --bundle --minify --format=iife --outfile=public/js/globo3d.js
   ========================================================= */
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const CONFIG = {
  marte: { textura: () => TEXTURA_MARTE, brillo: 1.1, relieve: 0.75, atmosfera: 0xff8a5c, inicio: -40 },
  luna:  { textura: () => TEXTURA_LUNA,  brillo: 1.35, relieve: 1.05, atmosfera: null,     inicio: -5 }
};

/* Latitud/longitud → punto en la esfera (como SphereGeometry envuelve un mapa equirectangular) */
function aPunto(lat, lon, r) {
  const la = THREE.MathUtils.degToRad(lat);
  const fi = THREE.MathUtils.degToRad(lon + 180);
  return new THREE.Vector3(-Math.cos(fi) * Math.cos(la) * r, Math.sin(la) * r, Math.sin(fi) * Math.cos(la) * r);
}

/* Un solo renderizador para toda la visita: los navegadores limitan cuántos contextos WebGL hay a la vez */
let motor = null;
function crearMotor() {
  if (motor) return motor;
  const render = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  render.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  render.outputColorSpace = THREE.SRGBColorSpace;
  const escena = new THREE.Scene();
  const camara = new THREE.PerspectiveCamera(36, 1, 0.1, 100);
  const sol = new THREE.DirectionalLight(0xffffff, 2.8);   // acompaña a la cámara: siempre vemos el lado de día
  sol.position.set(-3, 2.5, 2);
  sol.target.position.set(0, 0, -3);
  camara.add(sol, sol.target);
  escena.add(camara, new THREE.AmbientLight(0xffffff, 0.22));
  motor = { render, escena, camara, texturas: {} };
  return motor;
}

function textura(lugar) {
  const m = motor;
  if (!m.texturas[lugar]) {
    const tx = new THREE.TextureLoader().load(CONFIG[lugar].textura());
    tx.colorSpace = THREE.SRGBColorSpace;
    tx.anisotropy = m.render.capabilities.getMaxAnisotropy();
    m.texturas[lugar] = tx;
  }
  return m.texturas[lugar];
}

function hayWebGL() {
  try {
    const c = document.createElement("canvas");
    return Boolean(window.WebGLRenderingContext && (c.getContext("webgl2") || c.getContext("webgl")));
  } catch (e) {
    return false;
  }
}

function dibujarPlaneta3D(lugar, equipos, alElegir) {
  if (!hayWebGL() || !CONFIG[lugar]) return dibujarPlaneta(lugar, equipos, alElegir);
  let m;
  try { m = crearMotor(); } catch (e) { return dibujarPlaneta(lugar, equipos, alElegir); }

  const p = CONFIG[lugar];
  const reducirMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const { render, escena, camara } = m;

  const caja = document.createElement("div");
  caja.className = "planeta planeta-3d planeta-" + lugar;
  caja.innerHTML = `<p class="planeta-ayuda" aria-hidden="true">${t("arrastra")}</p>`;
  render.domElement.setAttribute("role", "img");
  render.domElement.setAttribute("aria-label", t("globo", { lugar: t("de_" + lugar) }));
  caja.prepend(render.domElement);

  // El planeta
  const grupo = new THREE.Group();
  const tx = textura(lugar);
  grupo.add(new THREE.Mesh(
    new THREE.SphereGeometry(1, 128, 64),
    new THREE.MeshStandardMaterial({ map: tx, bumpMap: tx, bumpScale: p.relieve, roughness: 1, metalness: 0, color: new THREE.Color().setScalar(p.brillo) })
  ));
  if (p.atmosfera) {
    grupo.add(new THREE.Mesh(
      new THREE.SphereGeometry(1.025, 64, 32),
      new THREE.ShaderMaterial({
        uniforms: { color: { value: new THREE.Color(p.atmosfera) } },
        vertexShader: "varying vec3 vN; varying vec3 vV; void main() { vN = normalize(normalMatrix * normal); vec4 mv = modelViewMatrix * vec4(position, 1.0); vV = normalize(-mv.xyz); gl_Position = projectionMatrix * mv; }",
        fragmentShader: "uniform vec3 color; varying vec3 vN; varying vec3 vV; void main() { float f = pow(1.0 - abs(dot(vN, vV)), 4.0); gl_FragColor = vec4(color, f * 0.55); }",
        side: THREE.BackSide, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false
      })
    ));
  }
  escena.add(grupo);

  // Alfileres: los mismos botones que el globo de planeta.js
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
    return { b, izquierda: Boolean(e.etiquetaIzquierda), punto: aPunto(e.ubicacion.lat, e.ubicacion.lon, 1.005) };
  });

  // Cámara: empieza mirando la longitud de inicio de cada planeta
  camara.position.copy(aPunto(15, p.inicio, 3.6));
  const controles = new OrbitControls(camara, render.domElement);
  controles.enableDamping = true;
  controles.enablePan = false;
  controles.enableZoom = false;          // la rueda del mouse sigue bajando la página
  controles.autoRotate = !reducirMovimiento;
  controles.autoRotateSpeed = 0.7;
  render.domElement.style.touchAction = "pan-y";   // en el celular, deslizar vertical sigue bajando la página
  const parar = () => { controles.autoRotate = false; caja.classList.add("girando"); };
  const soltar = () => caja.classList.remove("girando");
  render.domElement.addEventListener("pointerdown", parar);
  render.domElement.addEventListener("pointerup", soltar);
  caja.addEventListener("pointerenter", (ev) => { if (ev.pointerType === "mouse") controles.autoRotate = false; });
  caja.addEventListener("pointerleave", () => { if (!reducirMovimiento) controles.autoRotate = true; soltar(); });

  function ajustar() {
    const w = caja.clientWidth || 1;
    render.setSize(w, w, false);
    camara.aspect = 1;
    camara.updateProjectionMatrix();
  }
  const observador = new ResizeObserver(ajustar);
  observador.observe(caja);

  const v = new THREE.Vector3();
  const haciaCamara = new THREE.Vector3();
  render.setAnimationLoop(() => {
    controles.update();
    render.render(escena, camara);
    const w = caja.clientWidth;
    alfileres.forEach(({ b, punto, izquierda }) => {
      haciaCamara.copy(camara.position).sub(punto).normalize();
      const visible = punto.clone().normalize().dot(haciaCamara) > 0.15;
      v.copy(punto).project(camara);
      const x = (v.x + 1) / 2 * w, y = (1 - v.y) / 2 * w;
      b.style.left = x + "px";
      b.style.top = y + "px";
      b.classList.toggle("oculto", !visible);
      b.classList.toggle("a-la-izquierda", x > w * 0.68 || izquierda);   // izquierda: dos casos en el mismo lugar
      b.tabIndex = visible ? 0 : -1;
    });
  });

  requestAnimationFrame(() => caja.classList.add("listo"));

  return {
    elemento: caja,
    detener: () => {
      render.setAnimationLoop(null);
      observador.disconnect();
      controles.dispose();
      escena.remove(grupo);
      grupo.traverse((o) => { if (o.geometry) o.geometry.dispose(); if (o.material) o.material.dispose(); });
    }
  };
}

window.dibujarPlaneta3D = dibujarPlaneta3D;
