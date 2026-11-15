<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <base href="<?= esc(base_url(), 'attr') ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="referrer" content="no-referrer">
  <title>Detectives de Otros Mundos</title>
  <meta name="description" content="Busca en imágenes reales de NASA las máquinas que se quedaron en Marte, en la Luna y más allá, y descubre su historia.">
  <meta name="theme-color" content="#17163A">
  <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Ccircle cx='13' cy='13' r='9' fill='%23D2603F' stroke='%23F3F0FF' stroke-width='3'/%3E%3Cpath d='M20 20l8 8' stroke='%23F3F0FF' stroke-width='4' stroke-linecap='round'/%3E%3C/svg%3E">
  <link rel="stylesheet" href="css/estilos.css">
</head>
<body>
  <header class="barra">
    <button id="btn-inicio" class="marca" type="button" aria-label="Ir al inicio">
      <svg class="marca-logo" viewBox="0 0 32 32" aria-hidden="true"><circle cx="13" cy="13" r="9" fill="var(--marte)" stroke="currentColor" stroke-width="3"/><path d="M20 20l8 8" stroke="currentColor" stroke-width="4" stroke-linecap="round"/></svg>
      <span id="marca-texto">Detectives de<br>Otros Mundos</span>
    </button>
    <div class="barra-derecha">
      <span id="contador" class="contador"></span>
      <button id="btn-idioma" class="btn-icono btn-idioma" type="button">EN</button>
      <button id="btn-sonido" class="btn-icono" type="button" aria-pressed="true" aria-label="Sonido activado">🔊</button>
    </div>
  </header>

  <main id="app"></main>

  <!-- El orden importa: primero librerías y datos, al final app.js -->
  <script src="js/lib/openseadragon.min.js"></script>
  <script src="js/lib/confetti.browser.js"></script>
  <script src="js/i18n.js"></script>
  <script src="js/mundos.js"></script>
  <script src="datos/casos"></script>  <!-- los casos vienen de app/Data/casos.json -->
  <script src="js/almacen.js"></script>
  <script src="js/niveles.js"></script>
  <script src="js/progreso.js"></script>
  <script src="js/sonido.js"></script>
  <script src="js/ilustraciones.js"></script>
  <script src="js/texturas.js"></script>
  <script src="js/planeta.js"></script>
  <script src="js/globo3d.js"></script>   <!-- Three.js; si no hay WebGL se usa planeta.js -->
  <script src="js/buscador.js"></script>
  <script src="js/mision.js"></script>
  <script src="js/despedida.js"></script>
  <script src="js/pixel-sprites.js"></script> <!-- dibujos 8 bits (propios) -->
  <script src="js/pixel.js"></script>      <!-- motor de animaciones 8 bits (propio) -->
  <script src="js/historias.js"></script>  <!-- historias para menores de 14 -->
  <script src="js/decisiones-escenas.js"></script> <!-- escenas 8 bits de las decisiones -->
  <script src="js/expedientes.js"></script> <!-- archivo de misiones para 18 o más -->
  <script src="js/perfil.js"></script>
  <script src="js/pantallas.js"></script>
  <script src="js/app.js"></script>
</body>
</html>
