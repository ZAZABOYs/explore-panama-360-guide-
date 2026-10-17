import miraflores from "@/assets/miraflores.jpg";
import casco from "@/assets/casco.jpg";
import sanblas from "@/assets/sanblas.jpg";
import bocas from "@/assets/bocas.jpg";
import boquete from "@/assets/boquete.jpg";
import panamaviejo from "@/assets/panamaviejo.jpg";

export type Categoria = "Historia" | "Ciudad" | "Naturaleza" | "Playa";

export interface Destino {
  id: string;
  nombre: string;
  provincia: string;
  categoria: Categoria;
  imagen: string;
  resumen: string;
  historia: string;
  horario: string;
  entrada: string;
  tours: { nombre: string; precio: string }[];
  recomendaciones: string[];
  fotos: string[];
  comoLlegar: string;
  mapa: string;
}

export const destinos: Destino[] = [
  {
    id: "miraflores",
    nombre: "Canal de Panamá – Esclusas de Miraflores",
    provincia: "Panamá",
    categoria: "Historia",
    imagen: miraflores,
    resumen: "Mira de cerca cómo los barcos pasan entre dos océanos.",
    historia:
      "Inaugurado en 1914 tras décadas de intentos franceses y la obra estadounidense, el Canal fue transferido a Panamá el 31 de diciembre de 1999. Miraflores es el juego de esclusas más cercano a la ciudad y cuenta con centro de visitantes, museo y terrazas de observación.",
    horario: "Todos los días, 8:00 a.m. – 6:00 p.m. (aprox.)",
    entrada: "Extranjeros ~US$17–20 · nacionales con tarifa reducida",
    tours: [
      { nombre: "Tour Canal + Casco Antiguo (medio día)", precio: "desde US$45" },
      { nombre: "Tránsito parcial en barco por el Canal", precio: "desde US$150" },
    ],
    recomendaciones: [
      "Llega temprano en la mañana o después de las 2 p.m., cuando suelen pasar más barcos.",
      "Consulta el horario de tránsitos del día en la web oficial.",
      "Lleva gorra y protector solar para la terraza.",
    ],
    fotos: [
      "Barco dentro de la esclusa con las 'mulas' (locomotoras) a los lados.",
      "Panorámica desde la terraza superior al atardecer.",
      "Detalle de las compuertas abriéndose.",
    ],
    comoLlegar: "A 20 min en taxi o Uber desde el centro. También hay buses desde la Terminal de Albrook.",
    mapa: "Miraflores Locks Visitor Center, Panamá",
  },
  {
    id: "casco",
    nombre: "Casco Antiguo",
    provincia: "Panamá",
    categoria: "Ciudad",
    imagen: casco,
    resumen: "Calles coloniales, plazas, cafés y vida nocturna. Patrimonio UNESCO.",
    historia:
      "Fundado en 1673 tras la destrucción de Panamá Viejo por el pirata Henry Morgan. Su mezcla de arquitectura colonial española, francesa y art déco le valió ser Patrimonio de la Humanidad por la UNESCO en 1997.",
    horario: "Abierto 24 h · museos aprox. 9:00 a.m. – 5:00 p.m.",
    entrada: "Gratis · museos US$2–15",
    tours: [
      { nombre: "Recorrido a pie guiado (2 h)", precio: "desde US$25" },
      { nombre: "Tour gastronómico nocturno", precio: "desde US$65" },
    ],
    recomendaciones: [
      "Visítalo a pie y con calzado cómodo.",
      "Prueba un café de geisha panameño en alguna cafetería local.",
      "Al anochecer, sube a una terraza con vista a la bahía.",
    ],
    fotos: [
      "Balcones con buganvillas y fachadas de colores.",
      "Plaza de la Catedral con sus torres blancas.",
      "Skyline moderno desde el Paseo Esteban Huertas.",
    ],
    comoLlegar: "Taxi desde cualquier punto de la ciudad o Metro Línea 1 hasta 5 de Mayo y caminar 15 min.",
    mapa: "Casco Antiguo, Panamá",
  },
  {
    id: "panamaviejo",
    nombre: "Panamá Viejo",
    provincia: "Panamá",
    categoria: "Historia",
    imagen: panamaviejo,
    resumen: "Ruinas de la primera ciudad europea en la costa del Pacífico.",
    historia:
      "Fundada en 1519 por Pedro Arias Dávila, fue punto clave del comercio del oro peruano hacia España. En 1671 fue saqueada e incendiada por Henry Morgan. Su torre de la catedral es un símbolo nacional.",
    horario: "Martes a domingo, 8:30 a.m. – 4:30 p.m. (aprox.)",
    entrada: "Extranjeros ~US$15 · incluye museo",
    tours: [
      { nombre: "Tour histórico Panamá Viejo + Casco", precio: "desde US$40" },
    ],
    recomendaciones: [
      "Sube a la torre de la catedral para ver la ciudad.",
      "Empieza por el museo para entender el recorrido.",
      "Lleva agua: hay mucho sol y pocas zonas de sombra.",
    ],
    fotos: [
      "La torre con los rascacielos al fondo al atardecer.",
      "Arcos de piedra en primer plano.",
      "Vista del manglar desde lo alto de la torre.",
    ],
    comoLlegar: "15 min en taxi desde el centro por la Vía Cincuentenario.",
    mapa: "Panamá Viejo, Panamá",
  },
  {
    id: "sanblas",
    nombre: "San Blas – Guna Yala",
    provincia: "Comarca Guna Yala",
    categoria: "Playa",
    imagen: sanblas,
    resumen: "Más de 360 islas de arena blanca administradas por el pueblo Guna.",
    historia:
      "Territorio autónomo del pueblo Guna desde la Revolución Dule de 1925. Los Guna conservan su idioma, sus molas (textiles tradicionales) y su forma de gobierno comunitario.",
    horario: "Tours de día: salida 5:00 a.m., regreso 6:00 p.m.",
    entrada: "Tasa comarcal ~US$20–22 + tasas por isla",
    tours: [
      { nombre: "Excursión de un día (transporte + lancha + almuerzo)", precio: "desde US$105" },
      { nombre: "2 días / 1 noche en cabaña", precio: "desde US$180" },
    ],
    recomendaciones: [
      "Lleva pasaporte o cédula: hay control en la entrada.",
      "Lleva efectivo, no hay cajeros.",
      "Respeta las normas Guna: pide permiso antes de fotografiar personas.",
    ],
    fotos: [
      "Isla pequeña con palmeras desde la lancha.",
      "Estrellas de mar en aguas poco profundas (sin sacarlas del agua).",
      "Molas Guna de colores en primer plano.",
    ],
    comoLlegar: "4x4 desde Ciudad de Panamá (≈2.5 h) hasta el puerto de Cartí y luego lancha.",
    mapa: "Cartí, Guna Yala, Panamá",
  },
  {
    id: "bocas",
    nombre: "Bocas del Toro",
    provincia: "Bocas del Toro",
    categoria: "Playa",
    imagen: bocas,
    resumen: "Archipiélago caribeño con casas sobre el agua, delfines y snorkel.",
    historia:
      "Recorrido por Cristóbal Colón en 1502, la región creció con la industria bananera a inicios del siglo XX. Hoy mezcla cultura afrocaribeña, indígena Ngäbe y viajeros de todo el mundo.",
    horario: "Tours de islas: 9:00 a.m. – 4:00 p.m.",
    entrada: "Gratis · algunas playas cobran US$3–5",
    tours: [
      { nombre: "Tour de islas: Bahía de los Delfines, Cayo Coral, Playa Estrella", precio: "desde US$35" },
      { nombre: "Snorkel en Cayos Zapatilla", precio: "desde US$55" },
    ],
    recomendaciones: [
      "Usa protector solar biodegradable para cuidar los arrecifes.",
      "Alquila bicicleta para llegar a Playa Bluff.",
      "Ten en cuenta que llueve casi todo el año: lleva impermeable.",
    ],
    fotos: [
      "Casas de colores sobre pilotes en Isla Colón.",
      "Estrellas de mar en Playa Estrella.",
      "Atardecer desde un muelle con hamaca.",
    ],
    comoLlegar: "Vuelo de 1 h desde Albrook o bus nocturno a Almirante (≈10 h) + lancha de 30 min.",
    mapa: "Bocas del Toro, Panamá",
  },
  {
    id: "boquete",
    nombre: "Boquete y Volcán Barú",
    provincia: "Chiriquí",
    categoria: "Naturaleza",
    imagen: boquete,
    resumen: "Montañas, café de altura, senderos y el punto más alto de Panamá.",
    historia:
      "Pueblo de montaña fundado por colonos a fines del siglo XIX, famoso por el café geisha, uno de los más caros del mundo. El Volcán Barú (3,474 m) permite ver ambos océanos en días despejados.",
    horario: "Fincas de café: 8:00 a.m. – 3:00 p.m. · Parque Barú abierto 24 h",
    entrada: "Parque Nacional Volcán Barú ~US$5–10",
    tours: [
      { nombre: "Tour de finca de café con cata", precio: "desde US$35" },
      { nombre: "Ascenso nocturno al Volcán Barú con guía", precio: "desde US$100" },
      { nombre: "Puentes colgantes / canopy", precio: "desde US$60" },
    ],
    recomendaciones: [
      "Lleva abrigo: en la cima puede hacer 0–5 °C.",
      "Para ver el amanecer en el volcán, sal a medianoche con guía.",
      "Visita el Sendero Los Quetzales en temporada seca.",
    ],
    fotos: [
      "Granos rojos de café con el volcán al fondo.",
      "Nubes sobre el valle al amanecer.",
      "Quetzal en el sendero (con lente zoom y paciencia).",
    ],
    comoLlegar: "Vuelo a David (1 h) o bus desde Albrook (≈7 h) y luego bus local a Boquete (40 min).",
    mapa: "Boquete, Chiriquí, Panamá",
  },
];

export const categorias: ("Todos" | Categoria)[] = ["Todos", "Historia", "Ciudad", "Naturaleza", "Playa"];
