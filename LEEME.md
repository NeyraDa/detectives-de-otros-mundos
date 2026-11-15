# Detectives de Otros Mundos

Juego web educativo, en español e inglés: busca en imágenes reales de NASA las máquinas que se quedaron en la Luna, en Marte y más allá, toma sus decisiones más difíciles y escucha su historia.
Equipo CcapoSpace (Moquegua, Perú), reto *Abandoned but Not Forgotten*, NASA Space Apps Challenge 2026.

Hecho con **CodeIgniter 4.7** (PHP). **Versión local:** sin base de datos, sin cuentas y sin enviar nada al servidor.

---

## Privacidad: qué sale del dispositivo

| Qué | Dónde queda |
|---|---|
| Perfil (rango de edad, conocimientos, nivel) | Solo en el navegador (`localStorage`) |
| Progreso (casos resueltos, estrellas, tiempos) | Solo en el navegador (`localStorage`) |
| Pedidos al servidor | Solo `GET` de la página, imágenes, scripts y `datos/casos` |
| Terceros | Ninguno: sin CDNs, sin Google Fonts, sin analítica. Fuentes, OpenSeadragon, confetti y Three.js se sirven desde este mismo dominio |
| Voz del narrador | **No hay.** Se quitó la voz sintetizada del navegador: según el navegador puede usar servicios en la nube que reciben el texto y la IP. Los textos quedan en pantalla, así que los lectores de pantalla de cada persona los leen con su propia voz |

- "Borrar mi progreso" (en Trofeos) elimina perfil y progreso del navegador.
- `public/.htaccess` agrega cabeceras de seguridad: Content-Security-Policy (solo este dominio), `Referrer-Policy: no-referrer`, `nosniff`, `X-Frame-Options: DENY` y `Permissions-Policy` sin geolocalización, cámara ni micrófono.
- **Pendiente en el hosting:** los registros de acceso del servidor guardan la IP de cada visita. Pide al hosting desactivarlos, rotarlos a diario o anonimizarlos.

## Instalar en el hosting (puntodb.zycros.com)

> **CloudPanel (Nginx):** Nginx ignora los `.htaccess`. En *Sites → puntodb.zycros.com → Settings*, el **Root Directory** debe terminar en `/public`. Las cabeceras de seguridad de `public/.htaccess` se copian al *Vhost* como líneas `add_header`. Los casos se sirven en `datos/casos` (sin `.js`), porque Nginx trata cualquier ruta terminada en `.js` como archivo estático.

1. Sube **toda la carpeta del proyecto** a la raíz del subdominio. El `.htaccess` de la raíz manda todo a `public/`, así que `.env`, `app/` y `system/` no quedan expuestos.
2. La carpeta `writable/` y sus subcarpetas deben poder escribirse (775).
3. Abre `https://puntodb.zycros.com/`. Debe aparecer el test de detective.

No hace falta base de datos ni phpMyAdmin. Requisitos: PHP 8.2 o más, con `intl` y `mbstring`.

### En tu computadora
1. Copia `env.ejemplo` como `.env`, con `app.baseURL = 'http://localhost:8080/'`.
2. Ejecuta `php spark serve` y abre `http://localhost:8080`.

---

## Cómo funciona

```
Navegador (HTML + JavaScript)                    Servidor (CodeIgniter 4)
──────────────────────────────                   ─────────────────────────
Test de detective (perfil.js)                    GET /              → la página del juego
Juego: globo 3D, búsqueda, decisiones  ←──────── GET datos/casos    → casos desde app/Data/casos.json
Perfil y progreso → localStorage (almacen.js, progreso.js). Nada vuelve al servidor.
```

### Una experiencia por edad
| Edad | Qué ve |
|---|---|
| Menos de 14 | Historias animadas en 8 bits (sin juego) |
| 14 a 17 | El juego: encontrar el equipo, tomar sus decisiones y recibir su historia. Una guía de 3 pasos muestra en qué parte del caso está |
| 18 o más (docente o tutor) | Archivo de misiones: línea de tiempo de los 16 casos y un expediente por caso con ficha, foto, historia, decisiones para comparar, preguntas para clase, fuentes e impresión. Puede pasar al juego con un botón |

La elección de "archivo" o "juego" de un adulto no se guarda. Tampoco se guarda lo que responde en un expediente.

### Las decisiones
Cada caso tiene 2 decisiones reales (32 en total). En cada una:
- Una escena corta en 8 bits muestra el momento (`public/js/decisiones-escenas.js`).
- "Lo que sabías" resume el contexto con datos tomados de la misma situación (objetivo, riesgo, recursos, tiempo).
- Las opciones se mezclan cada vez, así la respuesta real no queda siempre en el mismo lugar.
- La persona dice qué tan segura está (poco, bastante, totalmente). Si elige como el equipo, gana esa cantidad de puntos de confianza. Los puntos no se guardan.
- El resultado no dice "acertaste" o "fallaste": muestra lo que eligió el equipo y por qué la otra opción también tenía sentido.
- En nivel experto hay una tercera opción y un temporizador de 30 s que se puede quitar y que nunca obliga a decidir (WCAG 2.2.1).
- Música alegre de aventura (sintetizada en el navegador, sin archivos).

Los textos "por qué la otra opción tenía sentido", las terceras opciones y las opciones A que antes eran "rendirse" son razonamientos y alternativas plausibles escritas por el equipo, no hechos históricos. No afirman que la NASA las haya discutido. Los datos de "Lo que sabías" repiten lo que ya dice cada situación verificada.

### Niveles de detective
La historia y los datos son los mismos para todos. Lo que cambia es la ayuda:

| Nivel | Pistas | Termómetro frío/caliente | Sugerido para |
|---|---|---|---|
| Aprendiz | 3, la primera de regalo | Sí | Quien sabe poco del espacio |
| Investigador | 3 | Sí | Lo que vio en el colegio |
| Experto | 1 | No | Quien investiga por su cuenta |

La sugerencia está en `public/js/niveles.js`. La persona siempre puede elegir otro nivel.

### Historias en 8 bits (menores de 14)
Quien elige "Menos de 14" no ve el juego de búsqueda: ve **8 historias animadas** en pixel art, de 9 a 11 escenas cada una (unos 80–100 segundos):
Opportunity, Spirit, Sojourner, Ingenuity (Marte) · Rover lunar del Apolo 15, ALSEP del Apolo 12, Surveyor 3 (Luna) · NEAR Shoemaker (más allá).
No es un juego: la persona reproduce, pausa, avanza, retrocede o salta a cualquier escena, y al final responde "¿Te gustaría construir algo así?" (la respuesta no se guarda).

- `public/js/pixel-sprites.js`: los dibujos (propios, escritos como texto), con cuadros de animación.
- `public/js/pixel.js`: motor en canvas, sin librerías. Actores anclados al suelo de cada fondo, movimiento por puntos clave, partículas, sonidos sincronizados, subtítulos tipo máquina de escribir.
- `public/js/historias.js`: los guiones (es/en). Cada dato sale de los casos verificados.
- Accesibilidad: nada arranca solo; subtítulos en HTML (el lector de pantalla recibe el texto completo); descripción de cada escena; "Leer toda la historia"; flechas del teclado dentro del reproductor; con "reducir movimiento" se muestran viñetas fijas sin temblores ni destellos.
- Títulos en **Pixelify Sans** (SIL OFL 1.1, `public/fuentes/OFL-PixelifySans.txt`), alojada en el propio servidor.

### Editar los casos
Los 16 casos están en `app/Data/casos.json` (`datos` en español, `datos_en` con los textos en inglés). Un caso con `"activo": false` no se muestra. Un caso mal formado se salta sin romper el juego.

### Archivos principales
| Archivo | Qué hace |
|---|---|
| `app/Config/Routes.php` | Las dos rutas: `/` y `datos/casos` |
| `app/Controllers/Juego.php`, `Datos.php` | La página del juego y los casos |
| `app/Data/casos.json` | Los 16 casos |
| `public/js/almacen.js` | Perfil local (reemplaza al antiguo `servidor.js`) |
| `public/js/progreso.js` | Progreso local |
| `public/.htaccess` | Cabeceras de seguridad y privacidad |
| `fuentes-js/globo3d.js` | Código fuente del globo 3D (Three.js) |

> La versión con base de datos, API y panel quedó en el zip anterior. Se puede retomar si el proyecto pasa de ronda.

### Cambiar el globo 3D
`public/js/globo3d.js` está empaquetado con Three.js adentro. Para modificarlo, edita `fuentes-js/globo3d.js` y vuelve a empaquetar:
```
npm install three esbuild
npx esbuild fuentes-js/globo3d.js --bundle --minify --format=iife --outfile=public/js/globo3d.js
```
Si el navegador no tiene WebGL, el juego usa el globo anterior (`planeta.js`) automáticamente.

---

## Los 16 casos
| Lugar | Equipo | Cómo se busca |
|---|---|---|
| Marte | Opportunity | Mapa global con coordenadas; el dibujo aparece al acercarse |
| Marte | Spirit | Mapa global con coordenadas |
| Marte | Sojourner / Mars Pathfinder | Mapa global con coordenadas |
| Marte | InSight | **Foto real de HiRISE (2022)** |
| Marte | Ingenuity | Mapa global con coordenadas |
| Marte | Viking 1 (y su gemelo Viking 2) | Mapa global con coordenadas |
| Marte | Phoenix | Mapa global con coordenadas |
| Luna | Reflector láser del Apolo 11 | **Foto real de LROC** |
| Luna | Surveyor 3 | Mapa global con coordenadas |
| Luna | Rover lunar del Apolo 15 | Mapa global con coordenadas |
| Luna | Estación científica ALSEP del Apolo 12 | Mapa global con coordenadas |
| Luna | Módulo lunar Challenger (Apolo 17) | Mapa global con coordenadas |
| Más allá | NEAR Shoemaker (asteroide Eros) | Esquema del Sistema Solar (no a escala) |
| Más allá | Dawn (Ceres) | **Foto real de Ceres tomada por Dawn** |
| Más allá | Pioneer 10 (y su gemela Pioneer 11) | Esquema del Sistema Solar (no a escala) |
| Más allá | Telescopio espacial Kepler | Esquema del Sistema Solar (no a escala) |

Cada caso tiene 3 pistas, 2 decisiones reales, una despedida en primera persona, foto real (menos Pioneer 10 y Challenger) y fuentes. Con estos 16 casos se cubren todos los recursos oficiales del reto: NSSDCA, módulos lunares, rovers lunares, ALSEP, Surveyor, Sojourner, Spirit y Opportunity, Viking 1 y 2, Phoenix e InSight, Dawn, NEAR Shoemaker, Pioneer 10 y 11, Ingenuity y Kepler.

## Créditos de imágenes
Todas son imágenes de NASA (dominio público), con su crédito original.
| Imagen | Crédito |
|---|---|
| Globo y mapa de Marte | Mosaico Viking MDIM 2.1 — NASA/USGS, vía NASA Solar System Treks |
| Globo y mapa de la Luna | Mosaico LRO WAC — NASA/GSFC/Arizona State University, vía NASA Solar System Treks |
| Sitio del Apolo 11 (búsqueda) | LROC M175124932R — NASA/GSFC/Arizona State University (se quitaron las etiquetas originales). La versión de la web de LROC permite uso educativo con crédito; para uso comercial, rehacer el recorte desde el archivo PDS (dominio público) |
| InSight desde la órbita (búsqueda) | HiRISE — NASA/JPL-Caltech/UArizona |
| Autorretrato de Opportunity (2014) | NASA/JPL-Caltech/Cornell Univ./Arizona State Univ. |
| Spirit en Troy | NASA/JPL-Caltech |
| Sojourner en Ares Vallis | NASA/JPL |
| Autorretrato de InSight (2022) | NASA/JPL-Caltech |
| Ingenuity visto por Perseverance (cámara Mastcam-Z) | NASA/JPL-Caltech/ASU |
| Reflector del Apolo 11 | NASA |
| Conrad y Surveyor 3 (AS12-48-7133) | NASA (foto de Alan Bean) |
| Rover lunar del Apolo 15 | NASA |
| Asteroide Eros | NASA/JPL/JHUAPL |
| Ceres y sus manchas brillantes (PIA19604) | NASA/JPL-Caltech/UCLA/MPS/DLR/IDA |
| Primera foto a color de Viking 1 (PIA00563) | NASA/JPL |
| Panel solar y brazo de Phoenix (PIA10793) | NASA/JPL-Caltech/University of Arizona/Texas A&M University |
| Pete Conrad instala la antena del ALSEP del Apolo 12; foto de Alan Bean (AS12-47-6919) | NASA |
| Kepler antes del lanzamiento (KSC-2009-1042) | NASA/Kim Shiflett |
| Gene Cernan prueba el rover lunar, Apolo 17 (AS17-147-22526) | NASA |
| Pioneer 10 en preparación para el lanzamiento (ARC-1972-AC72-2135) | NASA Ames Research Center |
| Esquema del Sistema Solar | Dibujado por el equipo (no es una imagen de NASA). Se genera con `herramientas/esquema.py` |

Los datos y créditos de los 16 casos se verificaron contra fuentes oficiales de NASA el 15 de noviembre de 2026. Varias copias se obtuvieron de repositorios públicos de otros equipos del mismo reto, que las tomaron de NASA. Antes de presentar, confirmen cada una en images.nasa.gov o en la página de la misión.

Librerías: CodeIgniter 4 (MIT), Three.js (MIT), OpenSeadragon (BSD-3), canvas-confetti (ISC). Fuentes: Bricolage Grotesque y Lexend (SIL Open Font License).
