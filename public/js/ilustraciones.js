/* =========================================================
   ILUSTRACIONES — dibujos SVG originales de cada tipo de equipo.
   ilustracion(equipo)  → texto SVG
   Usa el campo  equipo.dibujo : "rover" | "modulo" | "reflector"
   Colores: currentColor (contorno) y var(--acento-dibujo).
   ========================================================= */

const DIBUJOS = {
  rover: `
    <svg viewBox="0 0 160 110" class="dibujo" aria-hidden="true">
      <g fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
        <path d="M72 46 V18" />
        <rect x="62" y="8" width="22" height="12" rx="3" fill="var(--acento-dibujo)" />
        <circle cx="78" cy="14" r="2.5" fill="currentColor" stroke="none" />
        <path d="M20 46 H140 L132 58 H28 Z" fill="var(--acento-dibujo)" />
        <path d="M32 46 l6 -6 h84 l6 6" />
        <path d="M44 40 v6 M60 40 v6 M76 40 v6 M92 40 v6 M108 40 v6" stroke-width="2" />
        <rect x="46" y="58" width="68" height="16" rx="3" />
        <path d="M46 70 L30 84 M114 70 L130 84 M80 74 V84" />
        <circle cx="30" cy="90" r="10" /><circle cx="80" cy="90" r="10" /><circle cx="130" cy="90" r="10" />
        <circle cx="30" cy="90" r="3" fill="currentColor" /><circle cx="80" cy="90" r="3" fill="currentColor" /><circle cx="130" cy="90" r="3" fill="currentColor" />
      </g>
    </svg>`,

  modulo: `
    <svg viewBox="0 0 160 110" class="dibujo" aria-hidden="true">
      <g fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
        <path d="M8 92 Q40 76 60 84 M152 92 Q120 76 100 84" stroke-width="2" stroke-dasharray="4 5" />
        <path d="M60 84 L80 50 L100 84 Z" fill="var(--acento-dibujo)" />
        <path d="M60 84 L28 96 L52 70 Z" />
        <path d="M100 84 L132 96 L108 70 Z" />
        <path d="M80 50 L80 22" />
        <circle cx="80" cy="18" r="6" fill="var(--acento-dibujo)" />
        <path d="M80 50 L80 84" stroke-width="2" />
        <g transform="translate(118 64)">
          <rect x="0" y="0" width="22" height="8" rx="2" fill="var(--acento-dibujo)" />
          <circle cx="3" cy="13" r="3.5" /><circle cx="11" cy="13" r="3.5" /><circle cx="19" cy="13" r="3.5" />
        </g>
      </g>
    </svg>`,

  reflector: `
    <svg viewBox="0 0 160 110" class="dibujo" aria-hidden="true">
      <g fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
        <path d="M30 30 L118 18 L130 62 L42 74 Z" fill="var(--acento-dibujo)" />
        <g stroke-width="1.6">
          <path d="M51 27 L63 71 M73 24 L85 68 M95 21 L107 65" />
          <path d="M34 45 L122 33 M38 60 L126 48" />
        </g>
        <path d="M56 72 L48 98 M110 64 L118 98 M84 68 L84 98" />
        <path d="M30 98 H138" stroke-width="2" />
        <path d="M140 8 l-8 4 M146 22 l-9 1 M142 34 l-8 -3" stroke="var(--oro)" stroke-width="2.5" />
      </g>
    </svg>`,
  "modulo-lunar": `
    <svg viewBox="0 0 160 110" class="dibujo" aria-hidden="true">
      <g fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
        <path d="M14 96 H146" stroke-width="2" stroke-dasharray="4 5" />
        <path d="M46 50 H114 L120 72 H40 Z" fill="var(--acento-dibujo)" />
        <path d="M46 50 L58 38 H102 L114 50" />
        <path d="M44 72 L26 94 M116 72 L134 94 M60 72 L54 94 M100 72 L106 94" />
        <path d="M20 94 H32 M128 94 H140 M48 94 H60 M100 94 H112" />
        <rect x="64" y="56" width="32" height="10" rx="2" stroke-width="2" />
        <path d="M72 38 V30 M88 38 V30" stroke-width="2" />
      </g>
    </svg>`,

  alsep: `
    <svg viewBox="0 0 160 110" class="dibujo" aria-hidden="true">
      <g fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
        <path d="M8 96 H152" stroke-width="2" stroke-dasharray="4 5" />
        <rect x="56" y="58" width="40" height="30" rx="3" fill="var(--acento-dibujo)" />
        <path d="M76 58 V40" /><path d="M64 30 L88 30 L82 40 L70 40 Z" />
        <path d="M96 76 H112" stroke-width="2" />
        <rect x="112" y="62" width="14" height="30" rx="4" />
        <path d="M110 68 H128 M110 76 H128 M110 84 H128" stroke-width="2" />
        <path d="M56 80 H36" stroke-width="2" />
        <path d="M22 92 L30 74 L38 92 Z" fill="var(--acento-dibujo)" />
        <circle cx="30" cy="70" r="5" />
      </g>
    </svg>`,

  viking: `
    <svg viewBox="0 0 160 110" class="dibujo" aria-hidden="true">
      <g fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
        <path d="M10 96 H150" stroke-width="2" stroke-dasharray="4 5" />
        <path d="M40 58 H120 L110 72 H50 Z" fill="var(--acento-dibujo)" />
        <path d="M50 72 L34 92 M110 72 L126 92 M80 72 V92" />
        <path d="M26 92 H42 M118 92 H134 M72 92 H88" />
        <path d="M80 58 V30" /><path d="M66 22 Q80 34 94 22" />
        <path d="M58 58 V46 M58 46 H66 M58 46 L50 40" stroke-width="2" />
        <path d="M104 58 L124 38 L134 44" stroke-width="2" />
        <rect x="96" y="48" width="8" height="10" rx="1" stroke-width="2" />
      </g>
    </svg>`,

  telescopio: `
    <svg viewBox="0 0 160 110" class="dibujo" aria-hidden="true">
      <g fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
        <g transform="rotate(-28 80 58)">
          <rect x="58" y="16" width="44" height="66" rx="6" fill="var(--acento-dibujo)" />
          <path d="M58 26 H102" stroke-width="2" />
          <path d="M58 16 L50 6 H96 L102 16" stroke-width="2" />
          <rect x="62" y="82" width="36" height="12" rx="2" />
          <path d="M102 40 H130 V74 H102 M30 40 H58 M30 40 V74 H58" stroke-width="2" />
          <path d="M116 40 V74 M44 40 V74" stroke-width="1.5" />
        </g>
        <circle cx="22" cy="20" r="2" fill="currentColor" stroke="none" />
        <circle cx="138" cy="16" r="1.6" fill="currentColor" stroke="none" />
        <circle cx="146" cy="94" r="2" fill="currentColor" stroke="none" />
      </g>
    </svg>`,
};

DIBUJOS.insight = `
    <svg viewBox="0 0 160 110" class="dibujo" aria-hidden="true">
      <g fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
        <path d="M30 54 l-12 -10 l-8 10 l4 14 l14 4 l12 -6 Z" fill="var(--acento-dibujo)" />
        <path d="M130 54 l12 -10 l8 10 l-4 14 l-14 4 l-12 -6 Z" fill="var(--acento-dibujo)" />
        <path d="M18 44 L28 72 M10 54 L40 66 M142 44 L132 72 M150 54 L120 66" stroke-width="1.6" />
        <rect x="48" y="50" width="64" height="18" rx="4" fill="var(--acento-dibujo)" />
        <path d="M56 68 L50 92 M104 68 L110 92 M80 68 V92" />
        <path d="M100 50 L112 26 L126 30" />
        <path d="M30 96 a14 12 0 0 1 28 0 Z" fill="var(--acento-dibujo)" />
        <path d="M14 96 H146" stroke-width="2" />
      </g>
    </svg>`;

DIBUJOS.helicoptero = `
    <svg viewBox="0 0 160 110" class="dibujo" aria-hidden="true">
      <g fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
        <path d="M22 16 H138" stroke-width="3.5" />
        <path d="M34 28 H126" stroke-width="3.5" />
        <path d="M80 14 V58" />
        <rect x="64" y="4" width="32" height="8" rx="2" fill="var(--acento-dibujo)" />
        <rect x="64" y="58" width="32" height="20" rx="4" fill="var(--acento-dibujo)" />
        <path d="M68 78 L48 100 M92 78 L112 100 M72 78 L66 100 M88 78 L94 100" />
        <path d="M40 100 H56 M104 100 H120" />
        <path d="M14 104 H146" stroke-width="2" stroke-dasharray="3 6" />
      </g>
    </svg>`;

DIBUJOS.surveyor = `
    <svg viewBox="0 0 160 110" class="dibujo" aria-hidden="true">
      <g fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
        <path d="M80 20 V70" />
        <path d="M80 26 L58 8 L44 22 L66 40 Z" fill="var(--acento-dibujo)" />
        <path d="M60 64 L100 64 L92 76 L68 76 Z" fill="var(--acento-dibujo)" />
        <path d="M80 70 L36 96 M80 70 L124 96 M80 70 L80 100" />
        <ellipse cx="34" cy="98" rx="9" ry="3.5" /><ellipse cx="126" cy="98" rx="9" ry="3.5" /><ellipse cx="80" cy="102" rx="9" ry="3.5" />
        <path d="M100 66 L122 52 L130 62" />
        <rect x="88" y="30" width="16" height="12" rx="2" fill="var(--acento-dibujo)" />
      </g>
    </svg>`;

DIBUJOS["rover-lunar"] = `
    <svg viewBox="0 0 160 110" class="dibujo" aria-hidden="true">
      <g fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
        <path d="M18 66 H142 L136 76 H24 Z" fill="var(--acento-dibujo)" />
        <path d="M118 66 V18" />
        <path d="M100 26 Q118 6 136 26 Z" fill="var(--acento-dibujo)" />
        <path d="M40 66 V48 H64 V66 M74 66 V48 H98 V66" />
        <path d="M18 66 L10 54" />
        <circle cx="36" cy="88" r="13" /><circle cx="124" cy="88" r="13" />
        <circle cx="36" cy="88" r="4" fill="currentColor" /><circle cx="124" cy="88" r="4" fill="currentColor" />
        <path d="M23 76 Q36 66 49 76 M111 76 Q124 66 137 76" stroke-width="2" />
      </g>
    </svg>`;

DIBUJOS.sonda = `
    <svg viewBox="0 0 160 110" class="dibujo" aria-hidden="true">
      <g fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
        <path d="M30 40 Q80 4 130 40 Z" fill="var(--acento-dibujo)" />
        <path d="M80 40 V14" />
        <rect x="64" y="40" width="32" height="20" rx="3" fill="var(--acento-dibujo)" />
        <path d="M64 52 L24 82 M96 52 L136 82" />
        <rect x="14" y="80" width="18" height="12" rx="2" /><rect x="128" y="80" width="18" height="12" rx="2" />
        <path d="M80 60 V100" stroke-dasharray="3 5" />
        <circle cx="146" cy="16" r="3" fill="var(--oro)" stroke="none" /><circle cx="18" cy="24" r="2" fill="currentColor" stroke="none" />
      </g>
    </svg>`;

DIBUJOS.orbitador = `
    <svg viewBox="0 0 160 110" class="dibujo" aria-hidden="true">
      <g fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
        <rect x="64" y="38" width="32" height="32" rx="4" fill="var(--acento-dibujo)" />
        <rect x="8" y="46" width="50" height="16" rx="2" fill="var(--acento-dibujo)" />
        <rect x="102" y="46" width="50" height="16" rx="2" fill="var(--acento-dibujo)" />
        <path d="M20 46 V62 M33 46 V62 M46 46 V62 M114 46 V62 M127 46 V62 M140 46 V62" stroke-width="1.6" />
        <path d="M58 54 H64 M96 54 H102" />
        <path d="M70 38 Q80 22 90 38" />
        <path d="M74 70 L70 84 M86 70 L90 84" />
        <path d="M66 92 Q80 100 94 92" stroke="var(--oro)" stroke-width="2.5" />
      </g>
    </svg>`;

function ilustracion(equipo) {
  return DIBUJOS[equipo && equipo.dibujo] || DIBUJOS.rover;
}
