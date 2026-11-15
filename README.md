# Detectives de Otros Mundos

**De una pregunta al universo.**

Una web educativa para que niños y jóvenes se interesen por las carreras STEM. Siguen la historia de las máquinas que dejamos en la Luna, en Marte y en el espacio profundo, y resuelven los mismos problemas que enfrentaron sus equipos.

Proyecto del equipo **CCapo Space** (sede virtual de Moquegua, Perú) para el reto *Abandoned but Not Forgotten* del **NASA Space Apps Challenge 2026**.

> 🇬🇧 **English summary.** *Other-World Detectives* is an educational web app that sparks kids' and teens' interest in STEM through the stories of the machines left on the Moon, on Mars and in deep space. It offers one experience per age group, needs no sign-up, and keeps all progress on the user's device. Spanish and English. Built by team CCapo Space (Moquegua, Peru) for the NASA Space Apps Challenge 2026.

---

## ¿Qué hace?

16 casos reales, de Surveyor 3 (1967) a Ingenuity (2024). Cada caso tiene tres pasos:

1. **Encuéntralo:** busca la máquina en un mapa o una foto, con pistas y un termómetro de frío y caliente.
2. **Decide:** toma las mismas decisiones que su equipo de misión y compara con lo que pasó de verdad.
3. **Su historia:** la máquina cuenta qué descubrió, por qué se quedó y cómo está hoy.

### Una experiencia para cada edad

| Edad | Experiencia |
|---|---|
| Menos de 14 | Historias animadas en 8 bits de los casos más curiosos |
| 14 a 17 | El juego de búsqueda y decisiones, con tres niveles de dificultad |
| 18 o más | Archivo de misiones para docentes: expedientes con preguntas para clase, listos para imprimir |

## Privacidad

- **Sin registro ni cuentas.** No se pide nombre, correo ni ningún dato personal.
- **El perfil y el progreso quedan en el navegador** (`localStorage`). Nada se envía al servidor.
- **Sin terceros:** sin analítica, sin CDN y sin Google Fonts. Las fuentes y librerías se sirven desde el mismo sitio.
- El único dato que ve el servidor es la IP de la visita, como en cualquier página web.

Un docente puede instalarlo en su propia computadora o en la red del colegio y usarlo con su clase sin conexión a servicios externos.

## Tecnologías

- **CodeIgniter 4.7** (PHP 8.2+), sin base de datos. Los casos están en `app/Data/casos.json`.
- **JavaScript** sin frameworks.
- **Three.js** para los globos 3D y **OpenSeadragon** para el zoom en imágenes grandes.
- **Motor de animación 8 bits propio** (Canvas) y música generada en el navegador (Web Audio).
- Español e inglés, lector de pantalla y modo "reducir movimiento".

## Probarlo en tu computadora

Requisitos: PHP 8.2 o más, con las extensiones `intl` y `mbstring`.

```bash
cp env.ejemplo .env          # luego pon app.baseURL = 'http://localhost:8080/'
php spark serve
```

Abre `http://localhost:8080`.

## Publicarlo en un servidor

1. Sube el proyecto completo. La raíz del sitio debe apuntar a la carpeta `public/`.
2. Da permisos de escritura a `writable/` (775).
3. En Apache, `public/.htaccess` agrega las cabeceras de seguridad (CSP, `no-referrer`, etc.). En **Nginx**, copia esas cabeceras al vhost como líneas `add_header`.

Más detalles, incluidas las notas para CloudPanel, en [`LEEME.md`](LEEME.md).

## Estructura

```
app/Data/casos.json        Los 16 casos (español e inglés)
app/Controllers/           Página del juego y entrega de los casos
public/js/                 Juego, decisiones, historias 8 bits y archivo para docentes
public/img/                Mapas, fotos de las misiones y esquema del Sistema Solar
herramientas/esquema.py    Genera el esquema del Sistema Solar
```

## Créditos y licencias

- **Código:** licencia MIT (ver [`LICENSE`](LICENSE)).
- **Imágenes:** son de NASA y de las misiones correspondientes. Cada una muestra su crédito en pantalla y la lista completa está en [`LEEME.md`](LEEME.md). La licencia MIT **no** se aplica a las imágenes.
  - Una imagen del sitio del Apolo 11 viene de la web de LROC (Arizona State University), que permite uso educativo con crédito. Para un uso comercial hay que reemplazarla por la versión del archivo público.
- **Fuente Pixelify Sans:** SIL Open Font License (ver `public/fuentes/`).
- Los datos de los 16 casos se verificaron contra fuentes de NASA en noviembre de 2026.

Proyecto independiente, sin afiliación ni respaldo de NASA.

## Equipo CCapo Space

Johana Sotomayor, David Neyra, Sharmelym Delgado y Jairo Escobedo.

*Ccapo: la leña que enciende la fogata. Nosotros encendemos la curiosidad.*
