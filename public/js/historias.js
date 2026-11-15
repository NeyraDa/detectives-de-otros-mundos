/* =========================================================
   HISTORIAS EN 8 BITS — para menores de 14 años
   No es un juego: son historias animadas que la persona controla.
   Cada dato sale de los casos verificados (app/Data/casos.json y los
   informes de verificación). Formato de las escenas: ver pixel.js.
   ========================================================= */

// Atajos para escribir escenas más corto
const ac = (sp, x, extra = {}) => ({ sp, x, ...extra });
const icono = (sp, x, y, aparece, extra = {}) => ({ sp, x, y, aparece, flota: true, ...extra });
const equipoControl = (pantalla, festejo) => [
  ac("consola", 46, { y: 96, anim: 2 }),
  ac("consola", 146, { y: 96, anim: 2 }),
  ac("ingeniero", 74, { y: 98, anim: festejo ? 4 : 0, desde: 0 }),
  ac("ingeniera", 118, { y: 98, anim: festejo ? 4 : 0 }),
];

const HISTORIAS = [
  /* =================== OPPORTUNITY =================== */
  {
    id: "opportunity", portada: 5, lugar: "marte",
    titulo: { es: "El rover que iba a durar 90 días", en: "The rover that was supposed to last 90 days" },
    escenas: [
      { fondo: "marte", pan: [0, 70], dur: 6000,
        actores: [ac("bolsas", [-10, 150], { salta: { n: 5, alto: 34 }, anim: 10 })],
        ev: [[0.08, "rebote"], [0.28, "rebote"], [0.48, "rebote"], [0.68, "rebote"], [0.86, "rebote"]],
        es: ["Enero de 2004. Una pelota gigante de bolsas de aire rebota en Marte. Adentro viene un robot: ¡soy yo, Opportunity!", "Una pelota blanca de bolsas de aire rebota varias veces sobre el suelo rojo de Marte."],
        en: ["January 2004. A giant ball of airbags bounces across Mars. Inside is a robot: me, Opportunity!", "A white ball of airbags bounces several times across the red ground of Mars."] },
      { fondo: "marte", dur: 6000,
        actores: [ac("pathfinderAbierto", 56), ac("rover", [60, 132], { desde: 0.2, hasta: 0.85 })],
        ev: [[0.2, "bip"]],
        es: ["Soy del tamaño de un carrito de golf. Me diseñaron para trabajar 90 días. Mi gemelo, Spirit, aterrizó al otro lado del planeta.", "El rover baja de la nave abierta y avanza por Marte."],
        en: ["I'm the size of a golf cart. I was designed to work for 90 days. My twin, Spirit, landed on the other side of the planet.", "The rover rolls off the open lander and drives across Mars."] },
      { fondo: "marte", pan: 40, dur: 5500,
        actores: [ac("rover", [70, 96], { hasta: 0.5 }), ac("rocaMarte", 132), icono("brillo", 132, 72, 0.55, { anim: 6, flota: false })],
        ev: [[0.55, "acierto"]],
        es: ["Justo donde aterricé encontré hematita, un mineral que se forma con agua. ¡Una pista de que Marte tuvo agua hace mucho tiempo!", "El rover se acerca a una roca que empieza a brillar."],
        en: ["Right where I landed, I found hematite, a mineral that forms in water. A clue that Mars had water long ago!", "The rover drives up to a rock that starts to sparkle."] },
      { fondo: "duna", dur: 5500,
        actores: [ac("rover", 96, { y: 93, anim: 16, vibra: true }), icono("exclamacion", 96, 58, 0.45, { parpadea: true })],
        fx: [{ tipo: "polvo", x: 84, y: 90, n: 18, ancho: 26, alto: 12 }, { tipo: "polvo", x: 110, y: 90, n: 18, ancho: 26, alto: 12, semilla: 9 }],
        ev: [[0.45, "fallo"]],
        es: ["Abril de 2005. Mis seis ruedas se hundieron en una duna de arena blanda. Si aceleraba, podía quedar atrapado para siempre.", "El rover está hundido en una duna; sus ruedas giran y levantan polvo. Aparece un signo de alerta."],
        en: ["April 2005. My six wheels sank into a soft sand dune. If I hit the gas, I could be stuck forever.", "The rover is stuck in a dune; its wheels spin and kick up dust. An alert sign appears."] },
      { fondo: "laboratorio", dur: 6000,
        actores: [ac("rover", [80, 108], { y: 93, desde: 0.2 }), ac("ingeniero", 24, { y: 98 }), ac("ingeniera", 172, { y: 98, anim: 2, espejo: true }), icono("signo", 172, 64, 0.1)],
        es: ["En la Tierra, mi equipo del Laboratorio de Propulsión a Chorro armó una duna falsa y probó con un rover gemelo cómo sacarme.", "En un laboratorio, dos ingenieros miran cómo un rover de prueba avanza despacio en un arenero."],
        en: ["On Earth, my team at the Jet Propulsion Laboratory built a fake dune and used a twin rover to test how to get me out.", "In a lab, two engineers watch a test rover inch forward in a sandbox."] },
      { fondo: "duna", dur: 6500,
        actores: [ac("rover", 0, { k: [[0, 96, 93], [0.75, 118, 92], [1, 150, 90]] }), icono("corazon", 150, 60, 0.85)],
        fx: [{ tipo: "polvo", x: 104, y: 90, n: 10, desde: 0, hasta: 0.7, semilla: 3 }],
        ev: [[0.85, "fiesta"]],
        es: ["Durante semanas me movieron poquito a poco. Después de más de cinco semanas, ¡salí libre! A esa duna la llamaron «Purgatorio».", "El rover sale despacio de la duna. Aparece un corazón."],
        en: ["For weeks they moved me a tiny bit at a time. After more than five weeks, I was free! They named that dune \"Purgatory.\"", "The rover slowly climbs out of the dune. A heart appears."] },
      { fondo: "marte", pan: [0, 420], dur: 7000,
        actores: [ac("rover", 96, { anim: 8 })],
        fx: [{ tipo: "contador", a: 0, b: 21, x: 10, y: 8, tam: 2 }],
        es: ["En 2008 decidimos ir a un cráter gigante llamado Endeavour. Manejé unos 21 kilómetros durante casi tres años.", "El rover maneja por un largo camino mientras un contador sube de 0 a 21 kilómetros."],
        en: ["In 2008 we decided to head for a giant crater called Endeavour. I drove about 21 kilometers over almost three years.", "The rover drives a long way while a counter climbs from 0 to 21 kilometers."] },
      { fondo: "crater", dur: 6000,
        actores: [ac("rover", [200, 172], { hasta: 0.5 }), icono("brillo", 140, 84, 0.55, { anim: 6, flota: false })],
        ev: [[0.55, "acierto"]],
        es: ["En 2011 llegué al borde de Endeavour y encontré una veta de yeso: agua corrió por grietas del suelo hace muchísimo tiempo.", "El rover llega al borde de un cráter enorme y encuentra una línea blanca que brilla."],
        en: ["In 2011 I reached the rim of Endeavour and found a vein of gypsum: water flowed through cracks in the ground a very long time ago.", "The rover reaches the rim of a huge crater and finds a sparkling white line."] },
      { fondo: "marte", dur: 7000,
        actores: [ac("rover", 96, { cambia: [[0.7, "roverPolvo"]] })],
        fx: [{ tipo: "tormenta", desde: 0, hasta: 1 }],
        es: ["Junio de 2018. Una tormenta de polvo cubrió casi todo Marte. Sin Sol, mis paneles solares ya no podían cargar mis baterías.", "Una tormenta de polvo se vuelve cada vez más espesa y cubre al rover."],
        en: ["June 2018. A dust storm covered almost all of Mars. Without sunlight, my solar panels couldn't charge my batteries anymore.", "A dust storm grows thicker and thicker and covers the rover."] },
      { fondo: "antena", dur: 6500,
        actores: [ac("antena", 44, { y: 96, escala: 1.5 }), icono("signo", 160, 40, 0.75)],
        fx: [{ tipo: "senal", de: [62, 40, 176, 30] }],
        ev: [[0.1, "transmision"]],
        es: ["Mi último mensaje llegó el 10 de junio de 2018. NASA me envió más de mil mensajes para despertarme, pero ya no pude responder.", "De noche, una antena en la Tierra envía mensajes al espacio. Nadie responde."],
        en: ["My last message arrived on June 10, 2018. NASA sent me more than a thousand messages to wake me up, but I couldn't answer anymore.", "At night, an antenna on Earth sends messages into space. No one answers."] },
      { fondo: "marteNoche", dur: 6500,
        actores: [ac("roverPolvo", 96)],
        fx: [{ tipo: "estrellaFugaz", desde: 0.3, hasta: 0.6 }],
        es: ["Iba a durar 90 días y trabajé casi 15 años. Recorrí más de 45 kilómetros: ¡más que una maratón! Sigo en Marte, en el borde de Endeavour.", "De noche, el rover cubierto de polvo descansa bajo las estrellas."],
        en: ["I was supposed to last 90 days and I worked almost 15 years. I drove more than 45 kilometers: farther than a marathon! I'm still on Mars, on the rim of Endeavour.", "At night, the dust-covered rover rests under the stars."] },
    ],
  },

  /* =================== SPIRIT =================== */
  {
    id: "spirit", portada: 4, lugar: "marte",
    titulo: { es: "El rover que manejaba de reversa", en: "The rover that drove backward" },
    escenas: [
      { fondo: "marte", pan: [0, 60], dur: 6000,
        actores: [ac("bolsas", [-10, 150], { salta: { n: 4, alto: 30 }, anim: 10 })],
        ev: [[0.1, "rebote"], [0.35, "rebote"], [0.6, "rebote"], [0.85, "rebote"]],
        es: ["Enero de 2004. Soy Spirit, el gemelo de Opportunity. Rebotando dentro de mis bolsas de aire, llegué al cráter Gusev, al otro lado de Marte.", "Una pelota de bolsas de aire rebota sobre Marte."],
        en: ["January 2004. I'm Spirit, Opportunity's twin. Bouncing inside my airbags, I arrived at Gusev crater, on the other side of Mars.", "A ball of airbags bounces across Mars."] },
      { fondo: "marte", pan: [0, 200], dur: 6000,
        actores: [ac("rover", 96, { anim: 8 })],
        es: ["Me prometieron 90 días marcianos de vida. Subí colinas y estudié rocas buscando señales de agua.", "El rover avanza por las colinas de Marte."],
        en: ["They promised me 90 Martian days of life. I climbed hills and studied rocks, looking for signs of water.", "The rover drives across the hills of Mars."] },
      { fondo: "marte", pan: 200, dur: 5500,
        actores: [ac("roverRueda", 96, { vibra: true, vibraDesde: 0.3 }), icono("exclamacion", 126, 60, 0.35, { parpadea: true })],
        ev: [[0.35, "fallo"]],
        es: ["Marzo de 2006. Mi rueda delantera derecha dejó de girar. Con cinco ruedas no podía manejar normal.", "El rover se detiene; una de sus ruedas está marcada en rojo. Aparece un signo de alerta."],
        en: ["March 2006. My front right wheel stopped turning. With five wheels, I couldn't drive normally.", "The rover stops; one of its wheels is marked in red. An alert sign appears."] },
      { fondo: "control", pantalla: "marte", dur: 5500,
        actores: [...equipoControl("marte"), icono("signo", 74, 58, 0.05, { desaparece: 0.5 }), icono("brillo", 118, 58, 0.55, { anim: 6 })],
        ev: [[0.55, "acierto"]],
        es: ["Mi equipo tuvo una idea: ¡manejar de reversa, arrastrando la rueda rota como un ancla!", "En la sala de control, una ingeniera tiene una idea."],
        en: ["My team had an idea: drive backward, dragging the broken wheel like an anchor!", "In the control room, an engineer has an idea."] },
      { fondo: "marte", pan: [0, -160], dur: 6500,
        actores: [ac("roverRueda", 96, { espejo: true, anim: 8 })],
        fx: [{ tipo: "surco", x1: 116, x2: 192, y: 89, color: "#6e2a18" }],
        es: ["Era incómodo, como empujar un carrito de supermercado con una rueda trabada... ¡pero seguí explorando!", "El rover avanza de reversa y deja un surco en el suelo."],
        en: ["It was awkward, like pushing a shopping cart with a stuck wheel... but I kept exploring!", "The rover drives backward and leaves a groove in the ground."] },
      { fondo: "marte", pan: -160, dur: 6000,
        actores: [ac("roverRueda", [150, 70], { espejo: true, hasta: 0.8 })],
        fx: [{ tipo: "surco", x1: 160, x2: 80, y: 89, color: "#f3f0ff", hasta: 0.8 }],
        es: ["En 2007, cerca de una meseta llamada Home Plate, la rueda arrastrada abrió una zanja... y apareció suelo muy blanco y brillante.", "La rueda arrastrada deja una línea blanca brillante en el suelo."],
        en: ["In 2007, near a plateau called Home Plate, the dragging wheel dug a trench... and very white, bright soil appeared.", "The dragging wheel leaves a bright white line in the ground."] },
      { fondo: "marte", pan: -160, dur: 5500,
        actores: [ac("roverRueda", 70, { espejo: true }), icono("brillo", 120, 80, 0.1, { anim: 6, flota: false }), icono("exclamacion", 70, 58, 0.3)],
        fx: [{ tipo: "surco", x1: 160, x2: 80, y: 89, color: "#f3f0ff", desde: 0, hasta: 0 }, { tipo: "chispas", x: 120, y: 88, n: 12, desde: 0.1, hasta: 0.9 }],
        ev: [[0.3, "acierto"]],
        es: ["¡Era sílice casi pura! Para formarse necesita agua muy caliente o vapor, como en las aguas termales. Fue uno de mis hallazgos más importantes.", "La línea blanca brilla y el rover se sorprende."],
        en: ["It was almost pure silica! It needs very hot water or steam to form, like in hot springs. It was one of my most important discoveries.", "The white line sparkles and the rover is amazed."] },
      { fondo: "duna", dur: 6000,
        actores: [ac("roverRueda", 96, { y: 94, anim: 16, vibra: true })],
        fx: [{ tipo: "polvo", x: 84, y: 90, n: 16, ancho: 26 }, { tipo: "polvo", x: 110, y: 90, n: 16, ancho: 26, semilla: 4 }],
        es: ["Abril de 2009. Rompí una costra del suelo y me hundí en arena blanda. Durante meses intentaron sacarme.", "El rover se hunde en arena blanda; sus ruedas giran sin avanzar."],
        en: ["April 2009. I broke through a crust in the ground and sank into soft sand. For months they tried to get me out.", "The rover sinks into soft sand; its wheels spin without moving."] },
      { fondo: "marteAtardecer", dur: 6000,
        actores: [ac("roverRueda", 96, { y: 93 })],
        fx: [{ tipo: "senal", de: [100, 50, 186, 14], desde: 0, hasta: 0.6 }],
        es: ["En 2010 me convertí en una estación de investigación fija. Mi último mensaje llegó el 22 de marzo de 2010.", "Al atardecer, el rover quieto envía una última señal al cielo."],
        en: ["In 2010 I became a stationary research station. My last message arrived on March 22, 2010.", "At sunset, the motionless rover sends one last signal into the sky."] },
      { fondo: "marteNoche", dur: 6500,
        actores: [ac("roverRueda", 96, { y: 93 })],
        es: ["Me prometieron 90 días y trabajé más de 2 200. Sigo en un lugar llamado Troy, junto a la meseta Home Plate.", "De noche, el rover descansa bajo las estrellas y las dos lunitas de Marte."],
        en: ["They promised me 90 days and I worked more than 2,200. I'm still at a place called Troy, next to the Home Plate plateau.", "At night, the rover rests under the stars and the two little moons of Mars."] },
    ],
  },

  /* =================== SOJOURNER =================== */
  {
    id: "sojourner", portada: 3, lugar: "marte",
    titulo: { es: "El aterrizaje pelota de playa", en: "The beach-ball landing" },
    escenas: [
      { fondo: "control", pantalla: "marte", dur: 5500,
        actores: [...equipoControl("marte"), icono("signo", 74, 58, 0.1), icono("signo", 118, 58, 0.4)],
        es: ["1996. Había que llevar un robot a Marte gastando poco dinero. Pero aterrizar con cohetes necesita mucho combustible. ¿Qué hacemos?", "En la sala de control, dos ingenieros piensan con signos de pregunta."],
        en: ["1996. We had to get a robot to Mars on a small budget. But landing with rockets takes a lot of fuel. What do we do?", "In the control room, two engineers think, with question marks above them."] },
      { fondo: "control", dur: 5000,
        actores: [...equipoControl("marte", true), ac("bolsas", 96, { y: 50, anim: 4, aparece: 0.3 })],
        ev: [[0.3, "acierto"]],
        es: ["La idea: ¡envolver la nave en bolsas de aire gigantes, como una pelota de playa!", "En la pantalla aparece una pelota de bolsas de aire y los ingenieros celebran."],
        en: ["The idea: wrap the spacecraft in giant airbags, like a beach ball!", "A ball of airbags appears on the screen and the engineers cheer."] },
      { fondo: "marte", dur: 6000,
        actores: [ac("paracaidas", 96, { y: [6, 44], hasta: 0.6, desaparece: 0.62 }), ac("pathfinderCerrado", 96, { y: [22, 60], hasta: 0.6, cambia: [[0.6, "bolsas"]] })],
        ev: [[0.6, "clac"]],
        es: ["4 de julio de 1997. Bajo con un paracaídas. A unos 100 metros del suelo... ¡las bolsas de aire se inflan!", "La nave baja colgando de un paracaídas y de pronto se infla como una pelota."],
        en: ["July 4, 1997. I come down on a parachute. About 100 meters above the ground... the airbags inflate!", "The lander comes down hanging from a parachute and suddenly puffs up like a ball."] },
      { fondo: "marte", pan: [0, 160], dur: 7000,
        actores: [ac("bolsas", [-10, 170], { salta: { n: 7, alto: 40, amortigua: 0.7 }, anim: 10 })],
        ev: [[0.07, "rebote"], [0.21, "rebote"], [0.35, "rebote"], [0.5, "rebote"], [0.64, "rebote"], [0.78, "rebote"], [0.92, "rebote"]],
        es: ["¡Reboté más de 15 veces! Algunos rebotes fueron de 15 metros de alto, como un edificio de cinco pisos.", "La pelota de bolsas de aire rebota muy alto, una y otra vez."],
        en: ["I bounced more than 15 times! Some bounces were 15 meters high, like a five-story building.", "The airbag ball bounces very high, again and again."] },
      { fondo: "marte", pan: 160, dur: 5500,
        actores: [ac("bolsas", [40, 96], { hasta: 0.5, anim: 6, cambia: [[0.6, "bolsasDesinfladas"]] })],
        ev: [[0.6, "clac"]],
        es: ["Rodé hasta detenerme a un kilómetro del primer golpe. Entonces, las bolsas se desinflaron...", "La pelota rueda, se detiene y se desinfla."],
        en: ["I rolled to a stop a kilometer from the first bounce. Then the airbags deflated...", "The ball rolls, stops and deflates."] },
      { fondo: "marte", pan: 160, dur: 6500,
        actores: [ac("pathfinderCerrado", 76, { cambia: [[0.25, "pathfinderAbierto"]] }), ac("sojourner", [86, 132], { desde: 0.45, aparece: 0.45 })],
        ev: [[0.25, "clac"], [0.45, "bip"]],
        es: ["...la nave se abrió como una flor y bajé por una rampa. Soy Sojourner: peso 10,6 kilos, ¡como un horno microondas!", "La nave abre sus pétalos y un rover chiquito baja y se aleja."],
        en: ["...the lander opened like a flower and I rolled down a ramp. I'm Sojourner: I weigh 10.6 kilograms, like a microwave oven!", "The lander opens its petals and a tiny rover rolls down and away."] },
      { fondo: "marte", pan: [160, 210], dur: 6000,
        actores: [ac("sojourner", [60, 100], { hasta: 0.8 }), ac("rocaMarte", [180, 136], { hasta: 0.8 })],
        fx: [{ tipo: "laser", x: 74, y: 82, desde: 0, hasta: 0.8 }],
        es: ["Desde la Tierra elegían mi camino del día, y yo esquivaba los obstáculos solo, con láseres y cámaras.", "El rover avanza lanzando rayos láser rojos para ver los obstáculos."],
        en: ["People on Earth picked my route for the day, and I dodged obstacles on my own, using lasers and cameras.", "The rover moves forward, shooting red laser beams to spot obstacles."] },
      { fondo: "marte", pan: 210, dur: 6000,
        actores: [ac("sojourner", 104), ac("rocaMarte", 130), icono("brillo", 130, 70, 0.3, { anim: 6, flota: false })],
        ev: [[0.3, "acierto"]],
        es: ["Estudié rocas con nombres divertidos, como «Barnacle Bill». También vimos piedras redondeadas: en Marte corrió agua hace mucho.", "El rover estudia una roca que brilla."],
        en: ["I studied rocks with funny names, like \"Barnacle Bill.\" We also saw rounded pebbles: water flowed on Mars long ago.", "The rover studies a sparkling rock."] },
      { fondo: "marteAtardecer", dur: 6000,
        actores: [ac("pathfinderAbierto", 64), ac("sojourner", 136)],
        es: ["Me diseñaron para una semana... ¡y trabajé casi tres meses! Entre la nave y yo enviamos más de 17 000 fotos.", "Al atardecer azul de Marte, la nave y el rover descansan."],
        en: ["I was designed for one week... and I worked almost three months! Together, the lander and I sent more than 17,000 photos.", "In the blue Martian sunset, the lander and the rover rest."] },
      { fondo: "marteNoche", dur: 7500,
        actores: [ac("pathfinderAbierto", 64), ac("sojourner", [146, 104], { desde: 0.3, hasta: 0.85, espejo: true }), icono("signo", 104, 64, 0.88)],
        es: ["Yo hablaba con la Tierra a través de la nave. El 27 de septiembre de 1997 la nave se quedó en silencio. ¿Me acerqué a ella buscando cómo llamar a casa? Nadie lo sabe.", "De noche, el rover chiquito vuelve hacia la nave apagada. Aparece un signo de pregunta."],
        en: ["I talked to Earth through the lander. On September 27, 1997, the lander went silent. Did I drive back to it looking for a way to call home? Nobody knows.", "At night, the tiny rover heads back toward the silent lander. A question mark appears."] },
    ],
  },

  /* =================== INGENUITY =================== */
  {
    id: "ingenuity", portada: 4, lugar: "marte",
    titulo: { es: "El helicóptero que voló 72 veces", en: "The helicopter that flew 72 times" },
    escenas: [
      { fondo: "marte", pan: [0, 120], dur: 6000,
        actores: [ac("helicoptero", 96, { y: 86, escala: 0.4 }), ac("perseverance", 96, { anim: 8 })],
        es: ["Febrero de 2021. Llego a Marte escondido bajo la panza del rover Perseverance. Soy Ingenuity, un helicóptero de apenas 1,8 kilos.", "Un rover grande avanza con un helicóptero chiquito enganchado debajo."],
        en: ["February 2021. I arrive on Mars tucked under the belly of the Perseverance rover. I'm Ingenuity, a helicopter that weighs just 1.8 kilograms.", "A big rover drives along with a tiny helicopter tucked underneath."] },
      { fondo: "control", pantalla: "marte", dur: 6000,
        actores: [...equipoControl("marte"), icono("signo", 96, 66, 0.2)],
        es: ["El problema: el aire de Marte tiene apenas un 1 % de la densidad del aire de la Tierra. ¡Casi no hay aire para empujar y volar!", "En la sala de control aparece un gran signo de pregunta."],
        en: ["The problem: the air on Mars is only about 1% as dense as Earth's. There's almost no air to push against to fly!", "A big question mark appears in the control room."] },
      { fondo: "marte", dur: 6000,
        actores: [ac("perseverance", [124, 176], { desde: 0.1, hasta: 0.6 }), ac("helicoptero", 60, { anim: 20 })],
        ev: [[0.6, "bip"]],
        es: ["Por eso soy muy liviano, y mis aspas giran unas 2 400 veces por minuto. ¡Varias veces más rápido que un helicóptero de pasajeros en la Tierra!", "El rover se aleja y el helicóptero empieza a girar sus aspas muy rápido."],
        en: ["That's why I'm so light, and my blades spin about 2,400 times per minute. Several times faster than a passenger helicopter on Earth!", "The rover drives away and the helicopter starts spinning its blades very fast."] },
      { fondo: "marte", dur: 6000,
        actores: [ac("helicoptero", 80), ac("tela", 120, { y: [74, 68], flota: true, aparece: 0.15 }), icono("corazon", 120, 54, 0.6)],
        es: ["Llevo un secreto: un trocito de tela del Flyer de los hermanos Wright, el primer avión con motor de la Tierra.", "Junto al helicóptero flota un trocito de tela antigua."],
        en: ["I carry a secret: a tiny piece of fabric from the Wright brothers' Flyer, the first powered airplane on Earth.", "A tiny piece of old fabric floats next to the helicopter."] },
      { fondo: "marte", dur: 6500,
        actores: [ac("helicoptero", 96, { y: [90, 40], desde: 0.2, hasta: 0.75, anim: 24 })],
        fx: [{ tipo: "polvo", x: 96, y: 90, n: 20, ancho: 50, alto: 6, desde: 0.1, hasta: 0.5 }],
        ev: [[0.2, "despegue"]],
        es: ["19 de abril de 2021. ¡Despegué! Fue el primer vuelo con motor y controlado en otro planeta.", "El helicóptero levanta polvo y sube al cielo de Marte."],
        en: ["April 19, 2021. I took off! It was the first powered, controlled flight on another planet.", "The helicopter kicks up dust and rises into the Martian sky."] },
      { fondo: "control", pantalla: "marte", dur: 5000,
        actores: equipoControl("marte", true),
        ev: [[0.15, "fiesta"]],
        es: ["En la Tierra lo celebraron. Al lugar del despegue lo llamaron «Campo de los hermanos Wright».", "En la sala de control, los ingenieros celebran con los brazos arriba."],
        en: ["On Earth, everyone celebrated. They named the takeoff spot \"Wright Brothers Field.\"", "In the control room, the engineers cheer with their arms up."] },
      { fondo: "marte", pan: [0, 360], dur: 7500,
        actores: [ac("helicoptero", 120, { y: 46, anim: 24, flota: true }), ac("perseverance", 52, { anim: 8 })],
        fx: [{ tipo: "contador", a: 5, b: 72, x: 10, y: 8, tam: 2, desde: 0.1, hasta: 0.9 }],
        es: ["Me planearon para 5 vuelos en 30 días. Pero todo salió tan bien que me volví el explorador de Perseverance: volé 72 veces en casi tres años.", "El helicóptero vuela adelante del rover mientras un contador sube de 5 a 72 vuelos."],
        en: ["I was planned for 5 flights in 30 days. But it went so well that I became Perseverance's scout: I flew 72 times in almost three years.", "The helicopter flies ahead of the rover while a counter climbs from 5 to 72 flights."] },
      { fondo: "duna", dur: 6000,
        actores: [ac("helicoptero", 96, { y: [40, 89], desde: 0.1, hasta: 0.55, anim: 24, cambia: [[0.55, "helicopteroRoto"]] })],
        fx: [{ tipo: "polvo", x: 96, y: 88, n: 24, ancho: 44, desde: 0.55, hasta: 0.7 }],
        temblor: [[0.55, 0.7, 3]],
        ev: [[0.55, "golpe"]],
        es: ["18 de enero de 2024. En mi vuelo 72 aterricé de golpe sobre una duna... y mis cuatro aspas se rompieron.", "El helicóptero cae sobre una duna, levanta polvo y sus aspas quedan rotas."],
        en: ["January 18, 2024. On my 72nd flight I landed hard on a dune... and all four of my blades broke.", "The helicopter drops onto a dune, kicks up dust, and its blades end up broken."] },
      { fondo: "marteAtardecer", dur: 6500,
        actores: [ac("helicopteroRoto", 96, { y: 89 })],
        es: ["Ya no puedo volar, pero sigo de pie en el cráter Jezero. Demostré que se puede volar en otros mundos.", "Al atardecer, el helicóptero con las aspas rotas sigue de pie."],
        en: ["I can't fly anymore, but I'm still standing in Jezero crater. I proved that flying on other worlds is possible.", "At sunset, the helicopter with broken blades is still standing."] },
    ],
  },

  /* =================== ROVER LUNAR =================== */
  {
    id: "rover-lunar", portada: 2, lugar: "luna",
    titulo: { es: "El auto que viajó plegado", en: "The car that traveled folded up" },
    escenas: [
      { fondo: "lunaTierra", dur: 6000,
        actores: [ac("moduloConRover", 70, { escala: 1.2 })],
        es: ["Julio de 1971, misión Apolo 15. Viajo plegado al costado del módulo lunar Falcon, como una silla de playa.", "En la Luna, un módulo lunar dorado lleva algo plegado en su costado."],
        en: ["July 1971, the Apollo 15 mission. I'm traveling folded up on the side of the lunar module Falcon, like a beach chair.", "On the Moon, a gold lunar module carries something folded on its side."] },
      { fondo: "lunaTierra", dur: 6500,
        actores: [ac("moduloLunar", 44, { escala: 1.2 }), ac("lrv", 110, { aparece: 0.3 }), ac("astronautaTira", [150, 160], { espejo: true, desde: 0.3, hasta: 0.8 })],
        ev: [[0.3, "clac"], [0.5, "clac"], [0.7, "clac"]],
        es: ["Un astronauta tira de unas cintas... ¡y me despliego solo! Clac, clac, clac.", "Un astronauta tira de unas cintas y el rover lunar se despliega."],
        en: ["An astronaut pulls on some straps... and I unfold all by myself! Clack, clack, clack.", "An astronaut pulls on some straps and the lunar rover unfolds."] },
      { fondo: "luna", pan: [0, 200], dur: 6000,
        actores: [ac("lrvTripulado", 96, { anim: 8 })],
        fx: [{ tipo: "polvoLuna", x: 78, y: 90, n: 30, ancho: 30, alto: 10 }],
        es: ["Soy el primer rover lunar. Funciono con baterías y puedo ir a unos 13 kilómetros por hora.", "El rover lunar avanza con dos astronautas y levanta polvo gris."],
        en: ["I'm the first lunar rover. I run on batteries and can go about 13 kilometers per hour.", "The lunar rover drives with two astronauts aboard, kicking up gray dust."] },
      { fondo: "lunaMontes", pan: [0, 300], dur: 7000,
        actores: [ac("lrvTripulado", 96, { anim: 8 })],
        fx: [{ tipo: "polvoLuna", x: 78, y: 90, n: 30, ancho: 30, alto: 10 }],
        es: ["Llevé a David Scott y James Irwin por la orilla de la grieta Hadley y al pie de los montes Apeninos.", "El rover pasa junto a montañas altas y una grieta en el suelo."],
        en: ["I carried David Scott and James Irwin along the edge of Hadley Rille and to the foot of the Apennine Mountains.", "The rover drives past tall mountains and a long groove in the ground."] },
      { fondo: "luna", pan: 500, dur: 6000,
        actores: [ac("moduloLunar", 20, { escala: 0.4 }), ac("lrvTripulado", [60, 160], { hasta: 0.8 })],
        fx: [{ tipo: "contador", a: 0, b: 5, x: 10, y: 8, tam: 2, hasta: 0.8 }],
        es: ["¡Llegamos a alejarnos unos 5 kilómetros del módulo lunar, mucho más que caminando!", "El módulo lunar se ve chiquito a lo lejos; un contador marca 5 kilómetros."],
        en: ["We got about 5 kilometers away from the lunar module, much farther than on foot!", "The lunar module looks tiny in the distance; a counter shows 5 kilometers."] },
      { fondo: "lunaMontes", pan: 300, dur: 6500,
        actores: [ac("lrv", 56), ac("astronauta", [100, 120], { hasta: 0.5 }), ac("astronauta", 150, { espejo: true }), ac("bolsaRocas", 136, { y: 80, aparece: 0.5 }), ac("roca", 166)],
        ev: [[0.5, "bip"]],
        es: ["En tres paseos recorrimos 27,9 kilómetros. Ellos juntaron unos 77 kilos de rocas para estudiar en la Tierra.", "Dos astronautas recogen rocas junto al rover."],
        en: ["In three drives we covered 27.9 kilometers. They collected about 77 kilograms of rocks to study on Earth.", "Two astronauts collect rocks next to the rover."] },
      { fondo: "lunaTierra", dur: 7000,
        actores: [ac("moduloBase", 120, { escala: 1.2 }), ac("moduloAscenso", 120, { k: [[0, 120, 72], [0.25, 120, 72], [1, 120, -30]], escala: 1.2 }), ac("llama", 120, { k: [[0, 120, 80], [0.25, 120, 80], [1, 120, -22]], aparece: 0.25, anim: 10 }), ac("lrv", 40)],
        fx: [{ tipo: "polvoLuna", x: 120, y: 88, n: 30, ancho: 70, desde: 0.25, hasta: 0.45 }],
        ev: [[0.25, "despegue"]],
        es: ["No estaba pensado para volver a la Tierra. Mi último gran trabajo: transmitir en vivo, con mi cámara, el despegue de mis astronautas.", "El rover mira cómo la parte de arriba del módulo despega con fuego hacia el cielo."],
        en: ["I was never meant to return to Earth. My big last job: broadcasting my astronauts' liftoff live with my camera.", "The rover watches the top of the module blast off into the sky with fire."] },
      { fondo: "sala", dur: 6000,
        actores: [ac("tele", 96, { y: 96, escala: 1.5 }), ac("ingeniero", 40, { y: 98, anim: 3 }), ac("ingeniera", 156, { y: 98, anim: 3, espejo: true })],
        ev: [[0.2, "fiesta"]],
        es: ["Por primera vez, la gente en la Tierra pudo ver en televisión un despegue desde la Luna.", "En una sala, una familia mira el despegue en un televisor antiguo y celebra."],
        en: ["For the first time, people on Earth could watch a liftoff from the Moon on TV.", "In a living room, a family watches the liftoff on an old TV and cheers."] },
      { fondo: "lunaNoche", dur: 7000,
        actores: [ac("moduloBase", 130, { escala: 1.2 }), ac("lrv", 60), icono("brillo", 60, 50, 0.3, { desaparece: 0.6, anim: 6 }), icono("zzz", 76, 52, 0.7)],
        es: ["Casi dos días después, mi cámara despertó 13 minutos... y se apagó para siempre. Sigo estacionado en Hadley.", "En la oscuridad, la cámara del rover brilla un momento y luego se duerme."],
        en: ["Almost two days later, my camera woke up for 13 minutes... and then went dark for good. I'm still parked at Hadley.", "In the dark, the rover's camera glows for a moment and then falls asleep."] },
    ],
  },

  /* =================== ALSEP (APOLO 12) =================== */
  {
    id: "alsep12", portada: 3, lugar: "luna",
    titulo: { es: "Nunca vengas a la Luna sin un martillo", en: "Never come to the Moon without a hammer" },
    escenas: [
      { fondo: "lunaTierra", dur: 6500,
        actores: [ac("moduloLunar", 70, { y: [10, 90], hasta: 0.85, escala: 1.2 }), ac("llama", 70, { y: [18, 98], hasta: 0.85, anim: 10, desaparece: 0.85 })],
        fx: [{ tipo: "polvoLuna", x: 70, y: 88, n: 30, ancho: 80, desde: 0.6, hasta: 0.9 }],
        ev: [[0.85, "golpe"]],
        es: ["19 de noviembre de 1969. El módulo lunar Intrepid, del Apolo 12, aterriza en el Océano de las Tormentas.", "Un módulo lunar baja con fuego y aterriza levantando polvo gris."],
        en: ["November 19, 1969. Apollo 12's lunar module Intrepid lands in the Ocean of Storms.", "A lunar module comes down on a flame and lands, kicking up gray dust."] },
      { fondo: "lunaTierra", dur: 6000,
        actores: [ac("moduloLunar", 40, { escala: 1.2 }), ac("astronauta", [82, 112], { hasta: 0.6 }), ac("astronauta", [94, 136], { hasta: 0.7 }), ac("estacion", 166, { aparece: 0.6 })],
        es: ["Pete Conrad y Alan Bean traen una estación científica para dejarla en la Luna: ¡yo! Tengo seis instrumentos.", "Dos astronautas caminan desde el módulo hasta donde aparece una estación científica."],
        en: ["Pete Conrad and Alan Bean bring a science station to leave on the Moon: me! I have six instruments.", "Two astronauts walk from the module to where a science station appears."] },
      { fondo: "luna", dur: 6000,
        actores: [ac("moduloLunar", 30, { escala: 1.2 }), ac("contenedor", 66, { y: 80 }), ac("astronautaTira", 88, { espejo: true, vibra: true }), icono("signo", 88, 52, 0.4)],
        ev: [[0.4, "fallo"]],
        es: ["Para encenderme, Alan debe sacar mi combustible de un contenedor al costado del módulo... ¡pero está atascado!", "Un astronauta tira del contenedor del costado del módulo, pero no sale. Aparece un signo de pregunta."],
        en: ["To power me up, Alan has to pull my fuel out of a cask on the side of the module... but it's stuck!", "An astronaut pulls on the cask on the side of the module, but it won't budge. A question mark appears."] },
      { fondo: "luna", dur: 6000,
        actores: [ac("moduloLunar", 22, { escala: 1.2 }), ac("contenedor", 66, { y: 80 }), ac("astronautaTira", 88, { espejo: true }), ac("astronautaMartillo", 52, { anim: 5 })],
        temblor: [[0.1, 0.9, 1]],
        ev: [[0.15, "golpe"], [0.35, "golpe"], [0.55, "golpe"]],
        es: ["Pete agarra el martillo de geología y golpea el contenedor mientras Alan tira: ¡pum, pum, pum!", "Un astronauta golpea con un martillo mientras el otro tira. Todo tiembla un poco."],
        en: ["Pete grabs the geology hammer and bangs on the cask while Alan pulls: bang, bang, bang!", "One astronaut hammers while the other pulls. Everything shakes a little."] },
      { fondo: "luna", dur: 6000,
        actores: [ac("moduloLunar", 30, { escala: 1.2 }), ac("generador", 84, { y: 90, anim: 3, aparece: 0.15 }), ac("astronauta", 124), ac("astronauta", 146, { espejo: true }), icono("corazon", 135, 52, 0.4)],
        fx: [{ tipo: "chispas", x: 84, y: 76, n: 14, desde: 0.1, hasta: 0.4 }],
        ev: [[0.15, "acierto"]],
        es: ["¡Salió! Alan Bean bromeó: «No vengas a la Luna sin un martillo».", "El combustible sale con chispitas y los astronautas celebran."],
        en: ["It came out! Alan Bean joked: \"Don't come to the Moon without a hammer.\"", "The fuel comes out with little sparks and the astronauts celebrate."] },
      { fondo: "lunaTierra", dur: 6500,
        actores: [ac("estacion", 96), ac("generador", 140, { y: 90, anim: 3 }), ac("sismometro", 56)],
        fx: [{ tipo: "senal", de: [100, 60, 158, 22], desde: 0.3, hasta: 1 }],
        ev: [[0.3, "transmision"]],
        es: ["Mi generador nuclear da unos 70 vatios: suficiente para mis instrumentos. Uno es un sismómetro, para sentir los temblores de la Luna.", "La estación científica funciona y envía señales hacia la Tierra."],
        en: ["My nuclear generator makes about 70 watts: enough for my instruments. One of them is a seismometer, to feel the Moon shake.", "The science station is working and sends signals toward Earth."] },
      { fondo: "luna", dur: 6000,
        actores: [ac("moduloAscenso", 0, { k: [[0, -20, 20], [0.7, 150, 82]] }), ac("roca", 172)],
        fx: [{ tipo: "destello", desde: 0.7, hasta: 0.85 }, { tipo: "polvoLuna", x: 150, y: 86, n: 30, ancho: 80, alto: 20, desde: 0.7, hasta: 0.8 }],
        temblor: [[0.7, 0.9, 3]],
        ev: [[0.7, "golpe"]],
        es: ["Al día siguiente, la parte de arriba del módulo, ya vacía, se estrelló a propósito contra la Luna, a unos 60 kilómetros de mí.", "La parte de arriba del módulo cae y choca contra la Luna con un destello."],
        en: ["The next day, the empty top part of the module was crashed into the Moon on purpose, about 60 kilometers from me.", "The top part of the module falls and crashes into the Moon in a flash."] },
      { fondo: "luna", dur: 6500,
        actores: [ac("sismometro", 96, { vibra: true }), icono("exclamacion", 96, 64, 0.2)],
        fx: [{ tipo: "ondas", x: 96, y: 92, desde: 0, hasta: 1 }],
        temblor: [[0, 1, 1]],
        ev: [[0.2, "bip"]],
        es: ["¡Mi sismómetro lo sintió! Fue el primer temblor lunar hecho por humanos, y la Luna vibró casi una hora.", "El sismómetro vibra y ondas amarillas se abren en el suelo."],
        en: ["My seismometer felt it! It was the first human-made moonquake, and the Moon kept vibrating for almost an hour.", "The seismometer shakes and yellow waves spread across the ground."] },
      { fondo: "lunaTierra", dur: 6000,
        actores: [ac("estacion", 96), ac("sismometro", 56), ac("generador", 140, { y: 90, anim: 3 })],
        fx: [{ tipo: "senal", de: [100, 60, 158, 22] }],
        es: ["Comparando ese golpe con los temblores naturales, los científicos aprendieron cómo es la Luna por dentro. Funcioné casi ocho años.", "La estación sigue enviando datos a la Tierra."],
        en: ["By comparing that crash with natural moonquakes, scientists learned what the Moon is like inside. I worked for almost eight years.", "The station keeps sending data to Earth."] },
      { fondo: "lunaNoche", dur: 6500,
        actores: [ac("estacion", 96), ac("sismometro", 56), ac("generador", 140, { y: 90 }), icono("zzz", 110, 58, 0.5)],
        es: ["El 30 de septiembre de 1977, NASA apagó todas las estaciones. Sigo en el Océano de las Tormentas, cerca de mi vecino, Surveyor 3.", "De noche, la estación apagada descansa."],
        en: ["On September 30, 1977, NASA switched off all the stations. I'm still in the Ocean of Storms, near my neighbor, Surveyor 3.", "At night, the switched-off station rests."] },
    ],
  },

  /* =================== SURVEYOR 3 =================== */
  {
    id: "surveyor3", portada: 7, lugar: "luna",
    titulo: { es: "El robot que recibió visitas", en: "The robot that got visitors" },
    escenas: [
      { fondo: "control", pantalla: "luna", dur: 6000,
        actores: [...equipoControl("luna"), icono("signo", 96, 66, 0.2)],
        es: ["1967. Antes de enviar astronautas, nadie sabe si el suelo de la Luna es firme o si una nave se hundiría en el polvo.", "En la sala de control aparece un gran signo de pregunta."],
        en: ["1967. Before sending astronauts, nobody knows if the Moon's ground is solid or if a spacecraft would sink into the dust.", "A big question mark appears in the control room."] },
      { fondo: "lunaTierra", dur: 6500,
        actores: [ac("surveyor", 96, { y: [20, 90], hasta: 0.6, salta: { n: 2, alto: 10, desde: 0.6, hasta: 1, amortigua: 0.5 } }), ac("llama", 96, { y: [26, 96], hasta: 0.6, anim: 10, desaparece: 0.6 })],
        ev: [[0.6, "rebote"], [0.8, "rebote"]],
        es: ["20 de abril de 1967. Soy Surveyor 3, un robot de tres patas. Al tocar la Luna reboté dos veces y resbalé: ¡boing, boing!", "Un robot de tres patas baja con fuego y rebota dos veces al tocar la Luna."],
        en: ["April 20, 1967. I'm Surveyor 3, a three-legged robot. When I touched the Moon, I bounced twice and slid: boing, boing!", "A three-legged robot comes down on a flame and bounces twice as it touches the Moon."] },
      { fondo: "luna", dur: 6000,
        actores: [ac("surveyor", 96, { anim: 3 })],
        fx: [{ tipo: "polvoLuna", x: 124, y: 90, n: 16, ancho: 20, alto: 8 }],
        es: ["Con mi pala cavé zanjas, y mi cámara de televisión mostró a la Tierra cómo era el suelo lunar.", "El robot cava con su pala y levanta polvo gris."],
        en: ["With my scoop I dug trenches, and my TV camera showed Earth what the lunar ground was like.", "The robot digs with its scoop and kicks up gray dust."] },
      { fondo: "control", pantalla: "luna", dur: 5500,
        actores: equipoControl("luna", true),
        ev: [[0.15, "fiesta"]],
        es: ["Así supieron que el suelo aguantaba una nave. ¡Ayudé a preparar el camino para los astronautas!", "En la sala de control, los ingenieros celebran."],
        en: ["That's how they learned the ground could hold a spacecraft. I helped pave the way for the astronauts!", "In the control room, the engineers cheer."] },
      { fondo: "lunaNoche", dur: 6500,
        actores: [ac("surveyor", 96, { cambia: [[0.5, "surveyorDormido"]] }), icono("zzz", 116, 54, 0.6)],
        fx: [{ tipo: "oscurecer", desde: 0, hasta: 0.5, max: 0.4 }],
        es: ["Funcionaba con energía solar. Cuando llegó la noche lunar me quedé a oscuras. Mi último contacto fue el 4 de mayo de 1967.", "Oscurece y el robot se apaga y se duerme."],
        en: ["I ran on solar power. When the lunar night came, I went dark. My last contact was on May 4, 1967.", "It gets dark and the robot switches off and falls asleep."] },
      { fondo: "lunaTierra", dur: 5500,
        actores: [ac("surveyorDormido", 96), icono("zzz", 116, 54, 0)],
        fx: [{ tipo: "estrellaFugaz", desde: 0.2, hasta: 0.5 }],
        es: ["Después esperé en silencio... dos años y medio.", "El robot sigue dormido, solo, con la Tierra en el cielo."],
        en: ["Then I waited in silence... for two and a half years.", "The robot sleeps on, alone, with Earth in the sky."] },
      { fondo: "lunaTierra", dur: 6500,
        actores: [ac("surveyorDormido", 50), ac("moduloLunar", 150, { y: [10, 90], hasta: 0.8, escala: 1.2 }), ac("llama", 150, { y: [18, 98], hasta: 0.8, anim: 10, desaparece: 0.8 })],
        fx: [{ tipo: "polvoLuna", x: 150, y: 88, n: 30, ancho: 70, desde: 0.6, hasta: 0.9 }],
        ev: [[0.8, "golpe"]],
        es: ["19 de noviembre de 1969. El Apolo 12 aterriza a menos de 200 metros de mí. ¡Los astronautas pueden llegar caminando!", "Un módulo lunar aterriza cerca del robot dormido."],
        en: ["November 19, 1969. Apollo 12 lands less than 200 meters from me. The astronauts can walk over!", "A lunar module lands near the sleeping robot."] },
      { fondo: "lunaTierra", dur: 6500,
        actores: [ac("surveyorDormido", 50), ac("astronauta", [170, 84], { espejo: true }), ac("astronauta", [186, 104], { espejo: true, desde: 0.1 }), icono("signo", 96, 50, 0.75)],
        es: ["Pete Conrad y Alan Bean caminaron hasta mí. Desde la Tierra les preguntaron en broma: «¿No estarán en el Surveyor equivocado?».", "Dos astronautas caminan hasta el robot. Aparece un signo de pregunta."],
        en: ["Pete Conrad and Alan Bean walked over to me. From Earth, someone joked: \"Are you sure you're at the right Surveyor?\"", "Two astronauts walk over to the robot. A question mark appears."] },
      { fondo: "luna", dur: 6500,
        actores: [ac("surveyorDormido", 70), ac("astronauta", [96, 150], { desde: 0.4, espejo: false }), ac("camara", [92, 146], { y: 62, desde: 0.4 }), ac("astronauta", 120)],
        ev: [[0.35, "clac"]],
        es: ["Se llevaron mi cámara y mi pala a la Tierra. Los científicos estudiaron cómo me cambiaron la radiación y el polvo.", "Un astronauta se lleva la cámara del robot."],
        en: ["They took my camera and my scoop back to Earth. Scientists studied how radiation and dust had changed me.", "An astronaut carries away the robot's camera."] },
      { fondo: "lunaTierra", dur: 7000,
        actores: [ac("surveyorDormido", 96), ac("moduloBase", 166, { escala: 0.7 })],
        es: ["Fue la primera y única vez que personas visitaron a un robot en otro mundo. Mi cámara está en un museo en Washington. El resto de mí sigue en la Luna.", "El robot sigue en la Luna, con la base del módulo lunar a lo lejos y la Tierra en el cielo."],
        en: ["It was the first and only time people visited a robot on another world. My camera is in a museum in Washington. The rest of me is still on the Moon.", "The robot is still on the Moon, with the base of the lunar module in the distance and Earth in the sky."] },
    ],
  },

  /* =================== NEAR SHOEMAKER =================== */
  {
    id: "near", portada: 5, lugar: "espacio",
    titulo: { es: "La nave sin patas que aterrizó en un maní espacial", en: "The legless spacecraft that landed on a space peanut" },
    escenas: [
      { fondo: "plataforma", dur: 6500,
        actores: [ac("plataforma", 96, { y: 98 }), ac("cohete", 96, { y: [94, -40], desde: 0.3, escala: 1.4 }), ac("llama", 96, { y: [104, -30], desde: 0.3, aparece: 0.25, anim: 10 })],
        fx: [{ tipo: "humo", x: 96, y: 94, n: 40, ancho: 120, alto: 6, desde: 0.25, hasta: 0.7 }],
        ev: [[0.25, "despegue"]],
        es: ["17 de febrero de 1996. Despego hacia un asteroide llamado Eros. Soy NEAR Shoemaker, y llevo el nombre de un geólogo que estudió los asteroides.", "Un cohete despega de la plataforma entre nubes de humo."],
        en: ["February 17, 1996. I lift off toward an asteroid called Eros. I'm NEAR Shoemaker, named after a geologist who studied asteroids.", "A rocket lifts off from the launch pad in clouds of smoke."] },
      { fondo: "espacio", pan: [0, 80], dur: 6000,
        actores: [ac("mathilde", 140, { y: 66, escala: 1.5 }), ac("near", [-10, 210], { y: 50 })],
        ev: [[0.5, "bip"]],
        es: ["En el camino visité otro asteroide, Mathilde, y le tomé fotos al pasar.", "La nave pasa junto a un asteroide oscuro."],
        en: ["On the way I visited another asteroid, Mathilde, and took pictures as I flew by.", "The spacecraft flies past a dark asteroid."] },
      { fondo: "espacio", dur: 6500,
        actores: [ac("eros", 120, { y: 74 }), ac("near", 0, { k: [[0, -10, 30], [0.45, 70, 34], [1, 210, 30]] }), icono("exclamacion", 70, 14, 0.45, { desaparece: 0.75, parpadea: true })],
        ev: [[0.45, "fallo"]],
        es: ["Diciembre de 1998. Estaba por llegar a Eros, pero el encendido de mi motor se cortó... ¡y pasé de largo!", "La nave se acerca al asteroide, aparece un signo de alerta y sigue de largo."],
        en: ["December 1998. I was about to reach Eros, but my engine burn cut off... and I flew right past!", "The spacecraft approaches the asteroid, an alert sign appears, and it keeps going."] },
      { fondo: "control", pantalla: "eros", dur: 5500,
        actores: [...equipoControl("eros"), icono("signo", 74, 58, 0.05, { desaparece: 0.5 }), icono("brillo", 118, 58, 0.55, { anim: 6 })],
        ev: [[0.55, "acierto"]],
        es: ["Los ingenieros calcularon un camino de respaldo: tendría que dar una vuelta más alrededor del Sol.", "En la sala de control, los ingenieros encuentran una solución."],
        en: ["The engineers worked out a backup path: I'd have to go around the Sun one more time.", "In the control room, the engineers find a solution."] },
      { fondo: "espacioSol", dur: 7000,
        actores: [ac("near", 0, { k: [[0, 156, 54], [0.25, 96, 20], [0.5, 36, 54], [0.75, 96, 88], [1, 156, 54]], escala: 0.6 })],
        es: ["Así que volví a intentarlo... un año después de lo planeado.", "La nave da una vuelta completa alrededor del Sol."],
        en: ["So I tried again... a year later than planned.", "The spacecraft makes a full loop around the Sun."] },
      { fondo: "espacio", dur: 7000,
        actores: [ac("eros", 96, { y: 70 }), ac("near", 0, { k: [[0, 30, 30], [0.5, 166, 34], [1, 60, 92]] }), icono("corazon", 96, 30, 0.6)],
        ev: [[0.6, "fiesta"]],
        es: ["Y el 14 de febrero de 2000, Día de San Valentín, me convertí en el primer objeto hecho por humanos en dar vueltas alrededor de un asteroide.", "La nave da vueltas alrededor del asteroide. Aparece un corazón."],
        en: ["And on February 14, 2000, Valentine's Day, I became the first human-made object to orbit an asteroid.", "The spacecraft circles the asteroid. A heart appears."] },
      { fondo: "espacio", dur: 7000,
        actores: [ac("eros", 96, { y: 70 }), ac("near", [30, 160], { y: 26 })],
        fx: [{ tipo: "destello", desde: 0.2, hasta: 0.25 }, { tipo: "destello", desde: 0.5, hasta: 0.55 }, { tipo: "destello", desde: 0.8, hasta: 0.85 }, { tipo: "contador", a: 0, b: 160000, x: 8, y: 8, tam: 1 }],
        ev: [[0.2, "bip"], [0.5, "bip"], [0.8, "bip"]],
        es: ["Fotografié todo Eros: unas 160 000 fotos, ¡diez veces más de lo planeado! Mide unos 34 kilómetros y tiene forma de maní.", "La nave toma fotos con destellos mientras un contador llega a 160 000."],
        en: ["I photographed all of Eros: about 160,000 pictures, ten times more than planned! It's about 34 kilometers long and shaped like a peanut.", "The spacecraft takes pictures with flashes while a counter reaches 160,000."] },
      { fondo: "espacio", dur: 6500,
        actores: [ac("eros", 96, { y: 108, escala: 2 }), ac("near", 96, { y: 40 }), icono("signo", 96, 22, 0.3)],
        es: ["Febrero de 2001. Casi sin combustible. Yo no tenía patas ni bolsas de aire: no me diseñaron para aterrizar. ¿Y si lo intentamos igual?", "La nave flota sobre el asteroide gigante. Aparece un signo de pregunta."],
        en: ["February 2001. Almost out of fuel. I had no legs and no airbags: I wasn't built to land. What if we tried anyway?", "The spacecraft floats above the giant asteroid. A question mark appears."] },
      { fondo: "espacio", dur: 7500,
        actores: [ac("eros", 96, { y: 108, escala: 2 }), ac("near", 96, { y: [40, 76] }), ac("llama", 96, { y: [48, 84], parpadea: true, desaparece: 0.95, anim: 10 })],
        fx: [{ tipo: "polvoLuna", x: 96, y: 74, n: 20, ancho: 40, desde: 0.92, hasta: 1 }],
        ev: [[0.05, "bip"], [0.3, "bip"], [0.5, "bip"], [0.7, "bip"], [0.9, "bip"]],
        es: ["12 de febrero de 2001. Encendí mis cohetes una vez para bajar y cuatro veces para frenar...", "La nave baja despacio encendiendo sus cohetes una y otra vez."],
        en: ["February 12, 2001. I fired my rockets once to start down and four times to slow down...", "The spacecraft comes down slowly, firing its rockets again and again."] },
      { fondo: "espacio", dur: 6500,
        actores: [ac("eros", 96, { y: 108, escala: 2 }), ac("near", 96, { y: 76 }), icono("corazon", 96, 50, 0.3)],
        fx: [{ tipo: "polvoLuna", x: 96, y: 74, n: 16, ancho: 36, desde: 0, hasta: 0.3 }],
        ev: [[0.3, "fiesta"]],
        es: ["...y toqué el suelo a unos 6 kilómetros por hora, más lento que una bicicleta. ¡Sobreviví! Fue el primer aterrizaje en un asteroide.", "La nave se posa sobre el asteroide. Aparece un corazón."],
        en: ["...and touched down at about 6 kilometers per hour, slower than a bicycle. I survived! It was the first landing on an asteroid.", "The spacecraft settles on the asteroid. A heart appears."] },
      { fondo: "antena", dur: 7000,
        actores: [ac("antena", 150, { y: 96, escala: 1.5 })],
        fx: [{ tipo: "senal", de: [20, 20, 140, 40] }],
        ev: [[0.1, "transmision"]],
        es: ["Desde la superficie seguí hablando con la Tierra dos semanas, midiendo de qué está hecho Eros. Allí hace unos −173 °C. Sigo posado sobre Eros.", "Una antena en la Tierra recibe señales que llegan desde el espacio."],
        en: ["From the surface I kept talking to Earth for two weeks, measuring what Eros is made of. It's about −173 °C there. I'm still sitting on Eros.", "An antenna on Earth receives signals coming in from space."] },
    ],
  },
];

/* ---------- Pantallas ---------- */

function historiaLocal(h) {
  const L = idioma === "en" ? "en" : "es";
  return {
    id: h.id,
    titulo: h.titulo[L],
    escenas: h.escenas.map((e) => ({ ...e, texto: e[L][0], alt: e[L][1] })),
  };
}

function mostrarHistorias(contenedor, alElegir) {
  contenedor.innerHTML = `
    <section class="pantalla historias">
      <h1 class="pixel-titulo">${t("historiasTitulo")}</h1>
      <p class="intro">${t("historiasIntro")}</p>
      <p class="perfil-chip">
        <button type="button" id="btn-perfil" class="btn texto">${t("cambiarPerfil")}</button>
      </p>
      <ul class="historias-lista"></ul>
    </section>`;
  const lista = contenedor.querySelector(".historias-lista");
  for (const h of HISTORIAS) {
    const hl = historiaLocal(h);
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "historia-tarjeta";
    // La miniatura muestra la escena más representativa
    btn.appendChild(Pixel.miniatura(hl.escenas[h.portada ?? 0], 0.7));
    const nombre = document.createElement("span");
    nombre.className = "historia-nombre";
    nombre.textContent = hl.titulo;
    const lugar = document.createElement("span");
    lugar.className = "historia-lugar";
    lugar.textContent = `${t("lugar_" + h.lugar)} · ${t("pxEscenas", { n: hl.escenas.length })}`;
    btn.append(nombre, lugar);
    btn.addEventListener("click", () => alElegir(h.id));
    li.appendChild(btn);
    lista.appendChild(li);
  }
  contenedor.querySelector("#btn-perfil").addEventListener("click", irAlPerfil);
}

function verHistoria(contenedor, id, alVolver) {
  const h = HISTORIAS.find((x) => x.id === id);
  const hl = historiaLocal(h);
  contenedor.innerHTML = `
    <section class="pantalla historia">
      <button type="button" class="btn texto volver">${t("volverHistorias")}</button>
      <h1 class="pixel-titulo">${hl.titulo}</h1>
      <div class="pixel-reproductor"></div>
      <div class="historia-final" hidden>
        <h2>${t("historiaFinPregunta")}</h2>
        <div class="historia-final-opciones">
          <button type="button" class="btn principal" data-r="si">${t("respSi")}</button>
          <button type="button" class="btn secundario" data-r="talvez">${t("respTalvez")}</button>
          <button type="button" class="btn secundario" data-r="no">${t("respNo")}</button>
        </div>
        <p class="historia-final-respuesta" aria-live="polite"></p>
        <button type="button" class="btn texto otra">${t("otraHistoria")}</button>
      </div>
    </section>`;

  contenedor.querySelector(".volver").addEventListener("click", alVolver);
  const final = contenedor.querySelector(".historia-final");
  const limpiar = Pixel.reproductor(contenedor.querySelector(".pixel-reproductor"), hl, {
    reproducir: t("pxReproducir"), pausa: t("pxPausa"), anterior: t("pxAnterior"),
    siguiente: t("pxSiguiente"), fin: t("pxFin"), leerTodo: t("pxLeerTodo"),
    escenas: t("pxListaEscenas"), irEscena: (i) => t("pxIrEscena", { i }),
    alTerminar: () => {
      final.hidden = false;
      final.querySelector("h2").tabIndex = -1;
      final.querySelector("h2").focus();
      if (typeof Sonido !== "undefined") Sonido.sonar("acierto");
    },
  });
  // La respuesta no se guarda ni se envía: solo cambia el mensaje en pantalla
  final.querySelectorAll("[data-r]").forEach((b) => b.addEventListener("click", () => {
    final.querySelector(".historia-final-respuesta").textContent = t("resp_" + b.dataset.r);
  }));
  final.querySelector(".otra").addEventListener("click", alVolver);
  return limpiar;
}
