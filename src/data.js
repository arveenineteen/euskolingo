export const LEVELS = ["A1.1","A1.2","A2.1","A2.2","B1.1","B1.2","B2.1","B2.2"];

export const TOPICS = [
  {name:"Saludos", grammar:"Saludos, presentaciones y pronombres personales"},
  {name:"Tiempo", grammar:"Días, horas y expresiones temporales"},
  {name:"Cuerpo y salud", grammar:"Adjetivos descriptivos; izan y ukan"},
  {name:"Casa", grammar:"Lugares, objetos y declinación -n"},
  {name:"Ciudad", grammar:"Direcciones y casos locativos"},
  {name:"Transporte", grammar:"Desplazamientos y verbos de movimiento"},
  {name:"Ropa", grammar:"Colores, demostrativos y adjetivos"},
  {name:"Profesiones", grammar:"Ocupaciones, oficios y presente"},
  {name:"Clima y naturaleza", grammar:"Tiempo atmosférico y cuantificadores"},
  {name:"Estados de ánimo", grammar:"Sentimientos, izan y construcciones habituales"}
];

// Banco semilla ilustrativo. Añade preguntas revisadas por nivel y unidad.
export const QUESTION_BANK = {
  "A1.1-0": [
    {type:"choice", question:"¿Qué significa «kaixo»?", options:["Hola","Gracias","Adiós","Por favor"], answer:"Hola", explanation:"Kaixo significa «hola»."},
    {type:"match", question:"Relaciona «eskerrik asko»", pairs:[["eskerrik asko","muchas gracias"],["agur","adiós"]]},
    {type:"order", question:"Ordena la frase: «Yo soy Ane»", words:["Ni","Ane","naiz"], answer:"Ni Ane naiz", explanation:"«Ni» es yo y «naiz» es la forma de izan para «yo soy»."},
    {type:"choice", question:"¿Cómo se dice «adiós»?", options:["Egun on","Agur","Mesedez","Bai"], answer:"Agur"},
    {type:"choice", question:"¿Qué significa «mesedez»?", options:["Por favor","Buenos días","No","Hasta luego"], answer:"Por favor"}
  ],
  "A1.1-1": [
    {type:"choice", question:"¿Qué significa «gaur»?", options:["Ayer","Hoy","Mañana","Semana"], answer:"Hoy"},
    {type:"order", question:"Ordena: «Hoy es lunes»", words:["Gaur","astelehena","da"], answer:"Gaur astelehena da"},
    {type:"match", question:"Relaciona las palabras", pairs:[["gaur","hoy"],["bihar","mañana"]]}
  ],
  "A1.1-2": [
    {type:"choice", question:"¿Qué significa «burua»?", options:["Cabeza","Mano","Pie","Ojo"], answer:"Cabeza"},
    {type:"choice", question:"Completa: «Ni ____» (yo soy)", options:["naiz","da","gara","dira"], answer:"naiz", explanation:"«Naiz» es la forma de izan para la primera persona singular."}
  ]
};

export const FLASHCARDS = {
  "Saludos":[["kaixo","hola"],["agur","adiós"],["eskerrik asko","muchas gracias"],["mesedez","por favor"],["egun on","buenos días"]],
  "Tiempo":[["gaur","hoy"],["atzo","ayer"],["bihar","mañana"],["astea","semana"],["eguna","día"]],
  "Cuerpo y salud":[["burua","cabeza"],["eskua","mano"],["hanka","pierna"],["begia","ojo"],["osasuna","salud"]],
  "Casa":[["etxea","casa"],["sukaldea","cocina"],["logela","dormitorio"],["atea","puerta"]],
  "Ciudad":[["hiria","ciudad"],["kalea","calle"],["denda","tienda"],["plaza","plaza"]],
  "Transporte":[["autobusa","autobús"],["trena","tren"],["bizikleta","bicicleta"],["geltokia","estación"]],
  "Ropa":[["arropa","ropa"],["alkandora","camisa"],["oinetakoak","zapatos"],["praka(k)","pantalones"]],
  "Profesiones":[["irakaslea","profesor/a"],["medikua","médico/a"],["ikaslea","estudiante"],["sukaldaria","cocinero/a"]],
  "Clima y naturaleza":[["euria","lluvia"],["eguzkia","sol"],["elurra","nieve"],["haizea","viento"]],
  "Estados de ánimo":[["pozik","contento/a"],["triste","triste"],["nekatuta","cansado/a"],["lasai","tranquilo/a"]]
};

export const GRAMMAR = [
  ["Pronombres personales","ni (yo), zu (tú), hura (él/ella), gu (nosotros/as), zuek (vosotros/as), haiek (ellos/as)."],
  ["Izan: presente","Ni naiz (yo soy), zu zara (tú eres), hura da (él/ella es), gu gara (somos), zuek zarete (sois), haiek dira (son)."],
  ["Ukan: presente","El auxiliar ukan expresa «tener» y participa en formas verbales transitivas. Sus formas dependen del sujeto y del objeto; estudia cada paradigma con ejemplos contextualizados."],
  ["Negación e interrogación","La negación suele construirse con «ez» delante del verbo conjugado. Las preguntas pueden marcarse mediante entonación y partículas como «al» en determinados registros."],
  ["Declinación","El euskera añade marcas al nombre: -n puede indicar ubicación («etxean», en casa). La forma depende del caso y del contexto."],
  ["Pasado y futuro","El pasado y el futuro se forman con auxiliares y participios. Las formas concretas dependen del tipo de verbo y de la concordancia."]
];

export const SPELLING = [
  ["b y v","El euskera estándar utiliza b; la v no forma parte del inventario patrimonial habitual. En nombres propios y préstamos pueden aparecer grafías ajenas."],
  ["k y c","El sonido /k/ se escribe normalmente k. La c aparece principalmente en préstamos, nombres propios y ciertas grafías no adaptadas."],
  ["Sibilantes: z, tz, s, ts, x","Son contrastes importantes: z y s representan sibilantes distintas; tz y ts son africadas; x suele sonar como «sh»."],
  ["La h","La h es muda en euskera estándar. Debe respetarse en palabras que la llevan: hiri, hau, ahal."]
];

export const PRONUNCIATION = [
  ["Vocales","Las cinco vocales a, e, i, o, u tienen una pronunciación bastante estable, similar a la del español."],
  ["Dígrafos","«tx» suena aproximadamente como ch; «ts» y «tz» son africadas distintas; «in» y «il» pueden tener realizaciones palatales según la palabra."],
  ["Acentuación","El acento no se representa normalmente con tilde y puede variar por dialecto, palabra y frase. Evita aplicar una regla única a todas las palabras."]
];