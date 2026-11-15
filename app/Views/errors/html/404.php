<?php
/**
 * Página 404 para rutas inexistentes (bilingüe).
 * Sin dependencias externas: si un CSS o un script faltara, esta página
 * igual se ve bien. Las fuentes salen de este mismo dominio.
 */
?>
<!doctype html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="robots" content="noindex">
    <title>404 · Detectives de Otros Mundos</title>
    <style>
        @font-face { font-family: "Bricolage"; src: url("/fuentes/bricolage-grotesque-latin-800-normal.woff2") format("woff2"); font-weight: 800; font-display: swap; }
        @font-face { font-family: "Lexend"; src: url("/fuentes/lexend-latin-400-normal.woff2") format("woff2"); font-weight: 400; font-display: swap; }
        @font-face { font-family: "Pixelify"; src: url("/fuentes/pixelify-sans-latin.woff2") format("woff2"); font-weight: 400 700; font-display: swap; }

        :root { color-scheme: dark; }
        * { box-sizing: border-box; }
        body {
            margin: 0;
            min-height: 100vh;
            display: grid;
            place-items: center;
            padding: 24px;
            background: radial-gradient(circle at 50% 18%, #241f57 0%, #17163a 55%, #100f28 100%);
            color: #f3f0ff;
            font-family: "Lexend", "Verdana", system-ui, sans-serif;
            text-align: center;
        }
        .caja { max-width: 34rem; }
        .codigo {
            margin: 0;
            font-family: "Pixelify", "Trebuchet MS", system-ui, sans-serif;
            font-size: clamp(4rem, 18vw, 7rem);
            line-height: 1;
            color: #f2c14e;
            letter-spacing: 0.04em;
        }
        h1 {
            margin: 0.6rem 0 0;
            font-family: "Bricolage", "Trebuchet MS", system-ui, sans-serif;
            font-weight: 800;
            font-size: 1.35rem;
        }
        p { margin: 0.7rem 0 0; color: #b8b3da; line-height: 1.55; }
        p.en { font-size: 0.95rem; }
        a {
            display: inline-block;
            margin-top: 1.7rem;
            padding: 0.75rem 1.4rem;
            border-radius: 14px;
            background: #f2c14e;
            color: #17163a;
            font-weight: 700;
            text-decoration: none;
        }
        a:hover, a:focus-visible { background: #f6d27c; }
        a:focus-visible { outline: 3px solid #f3f0ff; outline-offset: 3px; }
    </style>
</head>
<body>
    <main class="caja">
        <p class="codigo">404</p>
        <h1>Esta página no existe</h1>
        <p>Puede que el enlace esté mal escrito o que la página ya no esté.</p>
        <p class="en" lang="en">This page does not exist. The link may be mistyped, or the page may be gone.</p>
        <a href="/">Volver al juego · Back to the game</a>
    </main>
</body>
</html>
