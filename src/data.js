export const LEVELS = ["A1.1", "A1.2", "A2.1", "A2.2", "B1.1", "B1.2", "B2.1", "B2.2"];

export const TOPICS = [
  { name: "Saludos, despedidas y cortesía", grammar: "Saludos, despedidas, fórmulas y cortesía" },
  { name: "El tiempo cronológico", grammar: "Días, meses, estaciones y expresiones temporales" },
  { name: "El cuerpo humano y la salud", grammar: "Partes del cuerpo, síntomas y vocabulario médico" },
  { name: "La casa y el mobiliario", grammar: "Estancias, muebles, electrodomésticos y vivienda" },
  { name: "La ciudad y las direcciones", grammar: "Lugares, orientaciones, calles y urbanismo" },
  { name: "Transporte y viajes", grammar: "Medios de transporte, viajes y circulación" },
  { name: "Ropa y calzado", grammar: "Prendas, complementos, verbos de vestir y tejidos" },
  { name: "Profesiones y trabajo", grammar: "Oficios, empleo, entorno laboral y derechos" },
  { name: "El clima y la naturaleza", grammar: "Tiempo atmosférico, paisaje y ecología" },
  { name: "Estados de ánimo y adjetivos cotidianos", grammar: "Sentimientos, cualidades y carácter" },
  { name: "Rutinas diarias y verbos de acción", grammar: "Verbos esenciales, hábitos y acciones" },
  { name: "Ocio, deportes y aficiones", grammar: "Deportes, cultura, espectáculos y tiempo libre" },
  { name: "Dinero y compras", grammar: "Precios, pagos, comercio y finanzas" },
  { name: "Tecnología y comunicación", grammar: "Dispositivos, redes, acciones y seguridad digital" },
  { name: "Animales", grammar: "Animales domésticos, salvajes y zoología" }
];

const RAW_QUESTIONS = [
  // TEMA 1: SALUDOS, DESPEDIDAS Y CORTESÍA
  { topicIndex: 0, level: "A1", type: "choice", question: "¿Cómo se dice «buenos días»?", options: ["Gabon", "Egun on", "Agur", "Mesedez"], answer: "Egun on" },
  { topicIndex: 0, level: "A1", type: "order", question: "Ordena las palabras para decir «Muchas gracias, perdón»:", words: ["barkatu", "Eskerrik asko,"], answer: "Eskerrik asko, barkatu" },
  { topicIndex: 0, level: "A1", type: "match", question: "Empareja cada palabra en euskera con su significado en español:", pairs: [["Kaixo", "Hola"], ["Agur", "Adiós"], ["Mesedez", "Por favor"], ["Bai", "Sí"], ["Ez", "No"]] },
  { topicIndex: 0, level: "A2", type: "choice", question: "¿Qué significa «Zorionak»?", options: ["De nada", "Hasta luego", "Felicidades", "Bienvenido"], answer: "Felicidades" },
  { topicIndex: 0, level: "A2", type: "order", question: "Ordena las palabras para decir «Bienvenido, ¿qué tal?»:", words: ["zer", "Ongi etorri,", "moduz?"], answer: "Ongi etorri, zer moduz?" },
  { topicIndex: 0, level: "A2", type: "match", question: "Empareja cada expresión en euskera con su traducción:", pairs: [["Gero arte", "Hasta luego"], ["Bihar arte", "Hasta mañana"], ["Ez horregatik", "De nada"], ["Ondo pasa", "Pásalo bien"], ["Urte askotarako", "Mucho gusto"]] },
  { topicIndex: 0, level: "B1", type: "choice", question: "¿Cuál es el significado de «barkamena eskatu»?", options: ["Dar las gracias", "Pedir perdón", "Desear suerte", "Presentarse"], answer: "Pedir perdón" },
  { topicIndex: 0, level: "B1", type: "order", question: "Ordena las palabras para decir «Buen viaje y buen provecho»:", words: ["egin", "eta", "Bidaia on", "on"], answer: "Bidaia on eta on egin" },
  { topicIndex: 0, level: "B2", type: "choice", question: "¿Cómo se dice «atentamente» al despedirse en una carta formal?", options: ["Begirunea", "Adeitasunez", "Abegikorra", "Goraintziak"], answer: "Adeitasunez" },
  { topicIndex: 0, level: "B2", type: "match", question: "Empareja los términos avanzados de cortesía:", pairs: [["Begirunea", "Respeto / consideración"], ["Abegikorra", "Acogedor / hospitalario"], ["Goraintziak", "Recuerdos / saludos"], ["Zoriondu", "Felicitar"], ["Gortesia", "Cortesía"]] },

  // TEMA 2: EL TIEMPO CRONOLÓGICO
  { topicIndex: 1, level: "A1", type: "choice", question: "¿Cómo se dice «ayer»?", options: ["Gaur", "Bihar", "Atzo", "Orain"], answer: "Atzo" },
  { topicIndex: 1, level: "A1", type: "order", question: "Ordena las palabras para decir «Hoy es buen día»:", words: ["egun ona", "Gaur", "da"], answer: "Gaur egun ona da" },
  { topicIndex: 1, level: "A1", type: "match", question: "Empareja cada unidad de tiempo:", pairs: [["Eguna", "Día"], ["Astea", "Semana"], ["Hilabetea", "Mes"], ["Urtea", "Año"], ["Gaua", "Noche"]] },
  { topicIndex: 1, level: "A2", type: "choice", question: "¿Qué estación del año es «Udazkena»?", options: ["Primavera", "Verano", "Otoño", "Invierno"], answer: "Otoño" },
  { topicIndex: 1, level: "A2", type: "order", question: "Ordena las palabras para decir «El lunes llego temprano»:", words: ["iristen naiz", "goiz", "Astelehenean"], answer: "Astelehenean goiz iristen naiz" },
  { topicIndex: 1, level: "A2", type: "match", question: "Empareja cada palabra temporal:", pairs: [["Igandea", "Domingo"], ["Udaberria", "Primavera"], ["Ordua", "Hora"], ["Minutua", "Minuto"], ["Berandu", "Tarde (adv.)"]] },
  { topicIndex: 1, level: "B1", type: "choice", question: "¿Qué significa «Etzi»?", options: ["Anteayer", "Pasado mañana", "Fin de semana", "A menudo"], answer: "Pasado mañana" },
  { topicIndex: 1, level: "B1", type: "order", question: "Ordena las palabras para decir «Nunca llego a tiempo»:", words: ["garaiz", "Ez naiz", "inoiz", "iristen"], answer: "Ez naiz inoiz garaiz iristen" },
  { topicIndex: 1, level: "B2", type: "choice", question: "¿Cómo se dice «siglo» en euskera?", options: ["Hamarkada", "Belaunaldia", "Mendea", "Iraupena"], answer: "Mendea" },
  { topicIndex: 1, level: "B2", type: "match", question: "Empareja los conceptos temporales complejos:", pairs: [["Etorkizuna", "Futuro"], ["Iragana", "Pasado"], ["Atzerapena", "Retraso"], ["Iraupena", "Duración"], ["Aldi berean", "Al mismo tiempo"]] },

  // TEMA 3: EL CUERPO HUMANO Y LA SALUD
  { topicIndex: 2, level: "A1", type: "choice", question: "¿Cómo se dice «mano»?", options: ["Burua", "Eskua", "Hanka", "Begia"], answer: "Eskua" },
  { topicIndex: 2, level: "A1", type: "order", question: "Ordena las palabras para decir «Me duele la cabeza»:", words: ["daukat", "Buruko", "mina"], answer: "Buruko mina daukat" },
  { topicIndex: 2, level: "A1", type: "match", question: "Empareja las partes del cuerpo y salud:", pairs: [["Ahoa", "Boca"], ["Belarria", "Oreja"], ["Sudurra", "Nariz"], ["Sabela", "Barriga"], ["Sendagilea", "Médico"]] },
  { topicIndex: 2, level: "A2", type: "choice", question: "¿Qué significa «Sukarra»?", options: ["Diente", "Fiebre", "Pelo", "Espalda"], answer: "Fiebre" },
  { topicIndex: 2, level: "A2", type: "order", question: "Ordena las palabras para decir «Estoy enfermo y tengo fiebre»:", words: ["daukat", "eta sukarra", "Gaixo nago"], answer: "Gaixo nago eta sukarra daukat" },
  { topicIndex: 2, level: "A2", type: "match", question: "Empareja cada término de salud:", pairs: [["Bihotza", "Corazón"], ["Bizkarra", "Espalda"], ["Hatza", "Dedo"], ["Hortza", "Diente"], ["Botika", "Medicina / farmacia"]] },
  { topicIndex: 2, level: "B1", type: "choice", question: "¿Qué son «Birikak»?", options: ["Los huesos", "Los músculos", "Los pulmones", "Las heridas"], answer: "Los pulmones" },
  { topicIndex: 2, level: "B1", type: "order", question: "Ordena las palabras para decir «La enfermera me ha curado la herida»:", words: ["sendatu dit", "zauria", "Erizainak"], answer: "Erizainak zauria sendatu dit" },
  { topicIndex: 2, level: "B2", type: "choice", question: "¿Cómo se dice «vacuna» en euskera?", options: ["Ebakuntza", "Txertoa", "Sendagaia", "Sintoma"], answer: "Txertoa" },
  { topicIndex: 2, level: "B2", type: "match", question: "Empareja el vocabulario médico avanzado:", pairs: [["Gaixotasuna", "Enfermedad"], ["Ebakuntza", "Operación quirúrgica"], ["Prebentzioa", "Prevención"], ["Sendagaia", "Fármaco"], ["Arnasketa", "Respiración"]] },

  // TEMA 4: LA CASA Y EL MOBILIARIO
  { topicIndex: 3, level: "A1", type: "choice", question: "¿Cómo se dice «llave»?", options: ["Atea", "Leihoa", "Giltza", "Ohea"], answer: "Giltza" },
  { topicIndex: 3, level: "A1", type: "order", question: "Ordena las palabras para decir «La silla está en la cocina»:", words: ["dago", "sukaldean", "Aulkia"], answer: "Aulkia sukaldean dago" },
  { topicIndex: 3, level: "A1", type: "match", question: "Empareja cada estancia u objeto de la casa:", pairs: [["Etxea", "Casa"], ["Mahaia", "Mesa"], ["Komuna", "Baño"], ["Logela", "Dormitorio"], ["Leihoa", "Ventana"]] },
  { topicIndex: 3, level: "A2", type: "choice", question: "¿Qué electrodoméstico es «Hozkailua»?", options: ["Lavadora", "Nevera", "Espejo", "Armario"], answer: "Nevera" },
  { topicIndex: 3, level: "A2", type: "order", question: "Ordena las palabras para decir «Enciende la luz del salón»:", words: ["argia", "Egongelako", "piztu"], answer: "Egongelako argia piztu" },
  { topicIndex: 3, level: "A2", type: "match", question: "Empareja cada elemento de la vivienda:", pairs: [["Armairua", "Armario"], ["Ispilua", "Espejo"], ["Garbigailua", "Lavadora"], ["Eskailerak", "Escaleras"], ["Teilatua", "Tejado"]] },
  { topicIndex: 3, level: "B1", type: "choice", question: "¿Qué significa «Ganbara»?", options: ["Sótano", "Balcón", "Desván", "Ascensor"], answer: "Desván" },
  { topicIndex: 3, level: "B1", type: "order", question: "Ordena las palabras para decir «El vecino limpia las escaleras»:", words: ["garbitzen ditu", "eskailerak", "Bizilagunak"], answer: "Bizilagunak eskailerak garbitzen ditu" },
  { topicIndex: 3, level: "B2", type: "choice", question: "¿Cómo se dice «reformar / renovar» una vivienda?", options: ["Apaindu", "Berriztatu", "Isolatu", "Alokatu"], answer: "Berriztatu" },
  { topicIndex: 3, level: "B2", type: "match", question: "Empareja los términos inmobiliarios y del hogar:", pairs: [["Etxebizitza", "Vivienda"], ["Isolamendua", "Aislamiento"], ["Argiztapena", "Iluminación"], ["Erosotasuna", "Comodidad"], ["Jabetza", "Propiedad"]] },

  // TEMA 5: LA CIUDAD Y LAS DIRECCIONES
  { topicIndex: 4, level: "A1", type: "choice", question: "¿Cómo se dice «izquierda»?", options: ["Eskuina", "Ezkerra", "Hurbil", "Urruti"], answer: "Ezkerra" },
  { topicIndex: 4, level: "A1", type: "order", question: "Ordena las palabras para decir «El hospital está lejos»:", words: ["dago", "urruti", "Ospitalea"], answer: "Ospitalea urruti dago" },
  { topicIndex: 4, level: "A1", type: "match", question: "Empareja cada lugar de la ciudad:", pairs: [["Kalea", "Calle"], ["Plaza", "Plaza"], ["Denda", "Tienda"], ["Eskola", "Escuela"], ["Geltokia", "Estación"]] },
  { topicIndex: 4, level: "A2", type: "choice", question: "¿Qué edificio es «Udaletxea»?", options: ["Biblioteca", "Ayuntamiento", "Puente", "Parque"], answer: "Ayuntamiento" },
  { topicIndex: 4, level: "A2", type: "order", question: "Ordena las palabras para decir «Ve recto hasta el semáforo»:", words: ["semafororaino", "zuzen", "Joan"], answer: "Joan zuzen semafororaino" },
  { topicIndex: 4, level: "A2", type: "match", question: "Empareja cada referencia espacial:", pairs: [["Zubia", "Puente"], ["Bidegurutzea", "Cruce"], ["Aurrean", "Delante"], ["Atzean", "Detrás"], ["Erdian", "En el centro"]] },
  { topicIndex: 4, level: "B1", type: "choice", question: "¿Qué es «Biribilgunea»?", options: ["Acera", "Rotonda", "Peatón", "Barrio"], answer: "Rotonda" },
  { topicIndex: 4, level: "B1", type: "order", question: "Ordena las palabras para decir «Los peatones caminan por la acera»:", words: ["ibiltzen dira", "espaloitik", "Oinezkoak"], answer: "Oinezkoak espaloitik ibiltzen dira" },
  { topicIndex: 4, level: "B2", type: "choice", question: "¿Cómo se dice «accesibilidad» en urbanismo?", options: ["Azpiegitura", "Irisgarritasuna", "Zabalgunea", "Biztanleria"], answer: "Irisgarritasuna" },
  { topicIndex: 4, level: "B2", type: "match", question: "Empareja los conceptos urbanos avanzados:", pairs: [["Hirigintza", "Urbanismo"], ["Azpiegitura", "Infraestructura"], ["Ingurunea", "Entorno"], ["Biztanleria", "Población"], ["Zabalgunea", "Ensanche"]] },

  // TEMA 6: TRANSPORTE Y VIAJES
  { topicIndex: 5, level: "A1", type: "choice", question: "¿Cómo se dice «avión»?", options: ["Trena", "Hegazkina", "Itsasontzia", "Autobusa"], answer: "Hegazkina" },
  { topicIndex: 5, level: "A1", type: "order", question: "Ordena las palabras para decir «Voy en tren a Bilbao»:", words: ["noa", "trenez", "Bilbora"], answer: "Bilbora trenez noa" },
  { topicIndex: 5, level: "A1", type: "match", question: "Empareja cada medio de transporte y viaje:", pairs: [["Autoa", "Coche"], ["Bizikleta", "Bicicleta"], ["Txartela", "Billete"], ["Geltokia", "Parada"], ["Mapa", "Mapa"]] },
  { topicIndex: 5, level: "A2", type: "choice", question: "¿Qué significa «Maleta / Ekipajea»?", options: ["Pasaporte", "Equipaje", "Aduana", "Retraso"], answer: "Equipaje" },
  { topicIndex: 5, level: "A2", type: "order", question: "Ordena las palabras para decir «¿A qué hora sale el autobús?»:", words: ["ateratzen da", "autobusa?", "Zer ordutan"], answer: "Zer ordutan ateratzen da autobusa?" },
  { topicIndex: 5, level: "A2", type: "match", question: "Empareja el vocabulario de viajes:", pairs: [["Pasaportea", "Pasaporte"], ["Irteera", "Salida"], ["Helmuga", "Llegada"], ["Bidaiaria", "Viajero"], ["Ibilbidea", "Recorrido / ruta"]] },
  { topicIndex: 5, level: "B1", type: "choice", question: "¿Qué significa «Txartela baliogabetu»?", options: ["Perder el billete", "Validar / picar el billete", "Comprar un abono", "Cancelar un vuelo"], answer: "Validar / picar el billete" },
  { topicIndex: 5, level: "B1", type: "order", question: "Ordena las palabras para decir «El tráfico está muy lento hoy»:", words: ["dago gaur", "oso motel", "Trafikoa"], answer: "Trafikoa oso motel dago gaur" },
  { topicIndex: 5, level: "B2", type: "choice", question: "¿Cómo se dice «aduana» en euskera?", options: ["Muga", "Aduana", "Garraioa", "Bidesaria"], answer: "Aduana" },
  { topicIndex: 5, level: "B2", type: "match", question: "Empareja los términos avanzados de transporte:", pairs: [["Garraio publikoa", "Transporte público"], ["Bidesaria", "Peaje"], ["Aldaketa", "Transbordo"], ["Ainguralekua", "Puerto / fondeadero"], ["Auto-ilara", "Embotellamiento"]] },

  // TEMA 7: ROPA Y CALZADO
  { topicIndex: 6, level: "A1", type: "choice", question: "¿Cómo se dice «abrigo»?", options: ["Alkandora", "Berokia", "Gona", "Soinekoa"], answer: "Berokia" },
  { topicIndex: 6, level: "A1", type: "order", question: "Ordena las palabras para decir «Llevo zapatos negros»:", words: ["dauzkat", "beltzak", "Zapatak"], answer: "Zapatak beltzak dauzkat" },
  { topicIndex: 6, level: "A1", type: "match", question: "Empareja cada prenda básica:", pairs: [["Prakak", "Pantalones"], ["Kamiseta", "Camiseta"], ["Soinekoa", "Vestido"], ["Zapatak", "Zapatos"], ["Galtzerdiak", "Calcetines"]] },
  { topicIndex: 6, level: "A2", type: "choice", question: "¿Qué prenda es «Txapela»?", options: ["Bufanda", "Guantes", "Boina / gorra", "Cinturón"], answer: "Boina / gorra" },
  { topicIndex: 6, level: "A2", type: "order", question: "Ordena las palabras para decir «Me queda grande esta camisa»:", words: ["geratzen zait", "hau", "handi", "Alkandora"], answer: "Alkandora hau handi geratzen zait" },
  { topicIndex: 6, level: "A2", type: "match", question: "Empareja cada complemento de vestir:", pairs: [["Bufanda", "Bufanda"], ["Eskularruak", "Guantes"], ["Gerrikoa", "Cinturón"], ["Poltsa", "Bolso"], ["Betaurrekoak", "Gafas"]] },
  { topicIndex: 6, level: "B1", type: "choice", question: "¿Qué significa «Jantzi» como verbo?", options: ["Desnudarse", "Vestirse / ponerse ropa", "Planchar", "Coser"], answer: "Vestirse / ponerse ropa" },
  { topicIndex: 6, level: "B1", type: "order", question: "Ordena las palabras para decir «Voy a probarme estos pantalones en el probador»:", words: ["probatuko ditut", "probalekuan", "praka hauek"], answer: "Praka hauek probalekuan probatuko ditut" },
  { topicIndex: 6, level: "B2", type: "choice", question: "¿Cómo se dice «algodón» (tejido)?", options: ["Artilea", "Kotoia", "Zeta", "Larrua"], answer: "Kotoia" },
  { topicIndex: 6, level: "B2", type: "match", question: "Empareja los materiales y términos textiles:", pairs: [["Artilea", "Lana"], ["Larrua", "Cuero / piel"], ["Zeta", "Seda"], ["Ehuna", "Tejido / tela"], ["Moda", "Moda"]] },

  // TEMA 8: PROFESIONES Y TRABAJO
  { topicIndex: 7, level: "A1", type: "choice", question: "¿Cómo se dice «estudiante»?", options: ["Irakaslea", "Ikaslea", "Langilea", "Nagusia"], answer: "Ikaslea" },
  { topicIndex: 7, level: "A1", type: "order", question: "Ordena las palabras para decir «Mi madre es médica»:", words: ["da", "sendagilea", "Nire ama"], answer: "Nire ama sendagilea da" },
  { topicIndex: 7, level: "A1", type: "match", question: "Empareja cada profesión básica:", pairs: [["Irakaslea", "Profesor/a"], ["Sukaldaria", "Cocinero/a"], ["Polizia", "Policía"], ["Idazkaria", "Secretario/a"], ["Bulegoa", "Oficina"]] },
  { topicIndex: 7, level: "A2", type: "choice", question: "¿Qué profesión es «Suhiltzailea»?", options: ["Carpintero", "Bombero", "Mecánico", "Periodista"], answer: "Bombero" },
  { topicIndex: 7, level: "A2", type: "order", question: "Ordena las palabras para decir «Busco trabajo en una fábrica»:", words: ["bilatzen dut", "lantegi batean", "Lana"], answer: "Lana bilatzen dut lantegi batean" },
  { topicIndex: 7, level: "A2", type: "match", question: "Empareja cada oficio:", pairs: [["Kazetaria", "Periodista"], ["Abokatua", "Abogado/a"], ["Igeltseroa", "Albañil"], ["Nekazaria", "Agricultor/a"], ["Ile-apaintzailea", "Peluquero/a"]] },
  { topicIndex: 7, level: "B1", type: "choice", question: "¿Qué significa «Langabezia»?", options: ["Jubilación", "Huelga", "Desempleo / paro", "Sueldo"], answer: "Desempleo / paro" },
  { topicIndex: 7, level: "B1", type: "order", question: "Ordena las palabras para decir «Mañana tengo una entrevista de trabajo»:", words: ["daukat", "lan-elkarrizketa bat", "Bihar"], answer: "Bihar lan-elkarrizketa bat daukat" },
  { topicIndex: 7, level: "B2", type: "choice", question: "¿Cómo se dice «sindicalismo / sindicato»?", options: ["Enpresaburua", "Sindikatua", "Hitzarmena", "Kaleratzea"], answer: "Sindikatua" },
  { topicIndex: 7, level: "B2", type: "match", question: "Empareja el vocabulario laboral avanzado:", pairs: [["Soldata", "Sueldo"], ["Greba", "Huelga"], ["Kaleratzea", "Despido"], ["Hitzarmena", "Convenio"], ["Erretiroa", "Jubilación"]] },

  // TEMA 9: EL CLIMA Y LA NATURALEZA
  { topicIndex: 8, level: "A1", type: "choice", question: "¿Cómo se dice «frío»?", options: ["Beroa", "Hotza", "Haizea", "Elurra"], answer: "Hotza" },
  { topicIndex: 8, level: "A1", type: "order", question: "Ordena las palabras para decir «Hoy hace mucho sol»:", words: ["egiten du", "eguzki asko", "Gaur"], answer: "Gaur eguzki asko egiten du" },
  { topicIndex: 8, level: "A1", type: "match", question: "Empareja los elementos naturales:", pairs: [["Eguzkia", "Sol"], ["Euria", "Lluvia"], ["Zuhaitza", "Árbol"], ["Itsasoa", "Mar"], ["Lorea", "Flor"]] },
  { topicIndex: 8, level: "A2", type: "choice", question: "¿Qué fenómeno meteorológico es «Ekaitza»?", options: ["Niebla", "Tormenta", "Nieve", "Arcoiris"], answer: "Tormenta" },
  { topicIndex: 8, level: "A2", type: "order", question: "Ordena las palabras para decir «En invierno nieva en la montaña»:", words: ["egiten du", "mendian", "elurra", "Neguan"], answer: "Neguan elurra egiten du mendian" },
  { topicIndex: 8, level: "A2", type: "match", question: "Empareja cada elemento del paisaje y clima:", pairs: [["Lainoa", "Nube / niebla"], ["Basoa", "Bosque"], ["Ibaia", "Río"], ["Hodeia", "Nube"], ["Lurra", "Tierra / suelo"]] },
  { topicIndex: 8, level: "B1", type: "choice", question: "¿Qué significa «Lehortea»?", options: ["Inundación", "Sequía", "Terremoto", "Humedad"], answer: "Sequía" },
  { topicIndex: 8, level: "B1", type: "order", question: "Ordena las palabras para decir «Debemos proteger el medio ambiente»:", words: ["babestu behar dugu", "Ingurumena"], answer: "Ingurumena babestu behar dugu" },
  { topicIndex: 8, level: "B2", type: "choice", question: "¿Cómo se dice «cambio climático»?", options: ["Berotegi-efektua", "Klima-aldaketa", "Kutsadura", "Birziklapena"], answer: "Klima-aldaketa" },
  { topicIndex: 8, level: "B2", type: "match", question: "Empareja los términos ecológicos y climáticos:", pairs: [["Kutsadura", "Contaminación"], ["Bioaniztasuna", "Biodiversidad"], ["Jasangarria", "Sostenible"], ["Uholdea", "Inundación"], ["Energia berriztagarria", "Energía renovable"]] },

  // TEMA 10: ESTADOS DE ÁNIMO Y ADJETIVOS COTIDIANOS
  { topicIndex: 9, level: "A1", type: "choice", question: "¿Cómo se dice «triste»?", options: ["Pozik", "Triste", "Haserre", "Nekatuta"], answer: "Triste" },
  { topicIndex: 9, level: "A1", type: "order", question: "Ordena las palabras para decir «El perro es muy grande»:", words: ["da", "oso handia", "Txakurra"], answer: "Txakurra oso handia da" },
  { topicIndex: 9, level: "A1", type: "match", question: "Empareja los adjetivos básicos:", pairs: [["Ona", "Bueno"], ["Txarra", "Malo"], ["Handia", "Grande"], ["Txikia", "Pequeño"], ["Berria", "Nuevo"]] },
  { topicIndex: 9, level: "A2", type: "choice", question: "¿Qué significa «Beldurtuta»?", options: ["Aburrido", "Asustado / con miedo", "Sorprendido", "Tranquilo"], answer: "Asustado / con miedo" },
  { topicIndex: 9, level: "A2", type: "order", question: "Ordena las palabras para decir «Estoy muy cansado después de trabajar»:", words: ["nago", "lan egin ondoren", "Oso nekatuta"], answer: "Oso nekatuta nago lan egin ondoren" },
  { topicIndex: 9, level: "A2", type: "match", question: "Empareja los estados y cualidades:", pairs: [["Haserre", "Enfadado"], ["Lasai", "Tranquilo"], ["Garbia", "Limpio"], ["Zikina", "Sucio"], ["Erraza", "Fácil"]] },
  { topicIndex: 9, level: "B1", type: "choice", question: "¿Qué significa «Lotsatia»?", options: ["Valiente", "Tímido/a", "Generoso/a", "Egoísta"], answer: "Tímido/a" },
  { topicIndex: 9, level: "B1", type: "order", question: "Ordena las palabras para decir «Es un ejercicio bastante difícil»:", words: ["da", "nahiko zaila", "Ariketa"], answer: "Ariketa nahiko zaila da" },
  { topicIndex: 9, level: "B2", type: "choice", question: "¿Cómo se dice «empático/a» o «comprensivo/a»?", options: ["Harroa", "Ulerkorra", "Burugogorra", "Etsikorra"], answer: "Ulerkorra" },
  { topicIndex: 9, level: "B2", type: "match", question: "Empareja los adjetivos complejos de carácter:", pairs: [["Burugogorra", "Terco / cabezota"], ["Harroa", "Orgulloso / arrogante"], ["Etsikorra", "Pesimista"], ["Eskuzabala", "Generoso"], ["Arduratsua", "Responsable"]] },

  // TEMA 11: RUTINAS DIARIAS Y VERBOS DE ACCIÓN
  { topicIndex: 10, level: "A1", type: "choice", question: "¿Qué verbo significa «comer»?", options: ["Edan", "Jan", "Lo egin", "Joan"], answer: "Jan" },
  { topicIndex: 10, level: "A1", type: "order", question: "Ordena las palabras para decir «Me despierto a las siete»:", words: ["esnatzen naiz", "Zazpietan"], answer: "Zazpietan esnatzen naiz" },
  { topicIndex: 10, level: "A1", type: "match", question: "Empareja los verbos esenciales:", pairs: [["Edan", "Beber"], ["Etorri", "Venir"], ["Egin", "Hacer"], ["Eduki", "Tener"], ["Nahi izan", "Querer"]] },
  { topicIndex: 10, level: "A2", type: "choice", question: "¿Qué acción es «Hortzak garbitu»?", options: ["Ducharse", "Lavarse los dientes", "Peinarse", "Desayunar"], answer: "Lavarse los dientes" },
  { topicIndex: 10, level: "A2", type: "order", question: "Ordena las palabras para decir «Desayuno café con leche todas las mañanas»:", words: ["gosaltzen dut", "kafesnea", "Goizero"], answer: "Goizero kafesnea gosaltzen dut" },
  { topicIndex: 10, level: "A2", type: "match", question: "Empareja las rutinas diarias:", pairs: [["Dutxatu", "Ducharse"], ["Bazkaldu", "Comer (al mediodía)"], ["Afaldu", "Cenar"], ["Oheratu", "Acostarse"], ["Atseden hartu", "Descansar"]] },
  { topicIndex: 10, level: "B1", type: "choice", question: "¿Qué significa «Gogoratu»?", options: ["Olvidar", "Recordar", "Explicar", "Decidir"], answer: "Recordar" },
  { topicIndex: 10, level: "B1", type: "order", question: "Ordena las palabras para decir «Se me ha olvidado comprar el pan»:", words: ["ahaztu zait", "erostea", "Ogia"], answer: "Ogia erostea ahaztu zait" },
  { topicIndex: 10, level: "B2", type: "choice", question: "¿Cómo se dice «acostumbrarse»?", options: ["Ohitu", "Damutu", "Harritu", "Aspertu"], answer: "Ohitu" },
  { topicIndex: 10, level: "B2", type: "match", question: "Empareja los verbos de acción avanzados:", pairs: [["Erabaki", "Decidir"], ["Damutu", "Arrepentirse"], ["Lortu", "Conseguir / lograr"], ["Saiatu", "Intentar"], ["Proposatu", "Proponer"]] },

  // TEMA 12: OCIO, DEPORTES Y AFICIONES
  { topicIndex: 11, level: "A1", type: "choice", question: "¿Cómo se dice «leer»?", options: ["Idatzi", "Irakurri", "Abestu", "Dantzatu"], answer: "Irakurri" },
  { topicIndex: 11, level: "A1", type: "order", question: "Ordena las palabras para decir «Me gusta mucho la música»:", words: ["zait", "musika", "Asko gustatzen"], answer: "Asko gustatzen zait musika" },
  { topicIndex: 11, level: "A1", type: "match", question: "Empareja las actividades de ocio:", pairs: [["Kirola", "Deporte"], ["Dantzatu", "Bailar"], ["Abestu", "Cantar"], ["Margotu", "Pintar / dibujar"], ["Jolastu", "Jugar"]] },
  { topicIndex: 11, level: "A2", type: "choice", question: "¿Qué deporte es «Igeriketa»?", options: ["Ciclismo", "Natación", "Pelota vasca", "Atletismo"], answer: "Natación" },
  { topicIndex: 11, level: "A2", type: "order", question: "Ordena las palabras para decir «Los sábados jugamos al fútbol»:", words: ["jokatzen dugu", "futbolean", "Larunbatetan"], answer: "Larunbatetan futbolean jokatzen dugu" },
  { topicIndex: 11, level: "A2", type: "match", question: "Empareja cada afición o lugar cultural:", pairs: [["Zinema", "Cine"], ["Antzerkia", "Teatro"], ["Kontzertua", "Concierto"], ["Txangoa", "Excursión"], ["Museoa", "Museo"]] },
  { topicIndex: 11, level: "B1", type: "choice", question: "¿Qué significa «Txapelketa»?", options: ["Entrenamiento", "Campeonato / torneo", "Árbitro", "Empate"], answer: "Campeonato / torneo" },
  { topicIndex: 11, level: "B1", type: "order", question: "Ordena las palabras para decir «Nuestro equipo ganó el partido ayer»:", words: ["irabazi zuen", "partida atzo", "Gure taldeak"], answer: "Gure taldeak partida atzo irabazi zuen" },
  { topicIndex: 11, level: "B2", type: "choice", question: "¿Cómo se dice «aficionado/a» o «hincha»?", options: ["Aurkaria", "Zalea", "Epailea", "Ikuslea"], answer: "Zalea" },
  { topicIndex: 11, level: "B2", type: "match", question: "Empareja el vocabulario cultural y deportivo avanzado:", pairs: [["Ikuskizuna", "Espectáculo"], ["Aurkaria", "Rival / oponente"], ["Ikuslea", "Espectador"], ["Sorkuntza", "Creación artística"], ["Aisialdia", "Ocio / tiempo libre"]] },

  // TEMA 13: DINERO Y COMPRAS
  { topicIndex: 12, level: "A1", type: "choice", question: "¿Cómo se dice «pagar»?", options: ["Erosi", "Saldu", "Ordaindu", "Eskatu"], answer: "Ordaindu" },
  { topicIndex: 12, level: "A1", type: "order", question: "Ordena las palabras para decir «¿Cuánto cuesta esto?»:", words: ["balio du", "honek?", "Zenbat"], answer: "Zenbat balio du honek?" },
  { topicIndex: 12, level: "A1", type: "match", question: "Empareja los términos básicos de compra:", pairs: [["Dirua", "Dinero"], ["Prezioa", "Precio"], ["Merkea", "Barato"], ["Garestia", "Caro"], ["Txartela", "Tarjeta"]] },
  { topicIndex: 12, level: "A2", type: "choice", question: "¿Qué significa «Beherapenak»?", options: ["Impuestos", "Rebajas / descuentos", "Recibo", "Cambio (vuelta)"], answer: "Rebajas / descuentos" },
  { topicIndex: 12, level: "A2", type: "order", question: "Ordena las palabras para decir «Quiero pagar en efectivo, por favor»:", words: ["ordaindu nahi dut,", "Eskudirutan", "mesedez"], answer: "Eskudirutan ordaindu nahi dut, mesedez" },
  { topicIndex: 12, level: "A2", type: "match", question: "Empareja el vocabulario comercial:", pairs: [["Ordainagiria", "Recibo / ticket"], ["Bezeroa", "Cliente"], ["Kutxa", "Caja (cobro)"], ["Eskudirua", "Dinero en efectivo"], ["Eskaintza", "Oferta"]] },
  { topicIndex: 12, level: "B1", type: "choice", question: "¿Qué significa «Itzuli» en una tienda?", options: ["Probar", "Devolver (un artículo o dinero)", "Envolver", "Reservar"], answer: "Devolver (un artículo o dinero)" },
  { topicIndex: 12, level: "B1", type: "order", question: "Ordena las palabras para decir «He ahorrado dinero para comprar un coche»:", words: ["aurreztu dut", "auto bat erosteko", "Dirua"], answer: "Dirua aurreztu dut auto bat erosteko" },
  { topicIndex: 12, level: "B2", type: "choice", question: "¿Cómo se dice «factura» en euskera?", options: ["Aurrekontua", "Faktura", "Mailegua", "Zerga"], answer: "Faktura" },
  { topicIndex: 12, level: "B2", type: "match", question: "Empareja los términos financieros y de consumo:", pairs: [["Aurrekontua", "Presupuesto"], ["Mailegua", "Préstamo"], ["Zerga", "Impuesto"], ["Kontsumitzailea", "Consumidor"], ["Bermea", "Garantía"]] },

  // TEMA 14: TECNOLOGÍA Y COMUNICACIÓN
  { topicIndex: 13, level: "A1", type: "choice", question: "¿Cómo se dice «ordenador»?", options: ["Telefonoa", "Ordenagailua", "Telebista", "Pantaila"], answer: "Ordenagailua" },
  { topicIndex: 13, level: "A1", type: "order", question: "Ordena las palabras para decir «Te llamo por teléfono»:", words: ["deitzen dizut", "Telefonoz"], answer: "Telefonoz deitzen dizut" },
  { topicIndex: 13, level: "A1", type: "match", question: "Empareja los términos tecnológicos básicos:", pairs: [["Mezua", "Mensaje"], ["Pantaila", "Pantalla"], ["Argazkia", "Foto"], ["Bideoa", "Vídeo"], ["Sarea", "Internet"]] },
  { topicIndex: 13, level: "A2", type: "choice", question: "¿Qué es «Pasahitza»?", options: ["Teclado", "Contraseña", "Ratón", "Archivo"], answer: "Contraseña" },
  { topicIndex: 13, level: "A2", type: "order", question: "Ordena las palabras para decir «Envíame un correo electrónico hoy»:", words: ["mezu elektroniko bat", "Bidali iezadazu", "gaur"], answer: "Bidali iezadazu mezu elektroniko bat gaur" },
  { topicIndex: 13, level: "A2", type: "match", question: "Empareja los componentes y acciones digitales:", pairs: [["Teklatua", "Teclado"], ["Sagua", "Ratón"], ["Artxiboa", "Archivo"], ["Deskargatu", "Descargar"], ["Gorde", "Guardar"]] },
  { topicIndex: 13, level: "B1", type: "choice", question: "¿Qué significa «Sare sozialak»?", options: ["Correo postal", "Redes sociales", "Cbertura móvil", "Base de datos"], answer: "Redes sociales" },
  { topicIndex: 13, level: "B1", type: "order", question: "Ordena las palabras para decir «No tengo cobertura en este pueblo»:", words: ["herri honetan", "Ez daukat", "estaldurarik"], answer: "Ez daukat estaldurarik herri honetan" },
  { topicIndex: 13, level: "B2", type: "choice", question: "¿Cómo se dice «inteligencia artificial»?", options: ["Errealitate birtuala", "Adimen artifiziala", "Datu-basea", "Pribatutasuna"], answer: "Adimen artifiziala" },
  { topicIndex: 13, level: "B2", type: "match", question: "Empareja el vocabulario tecnológico avanzado:", pairs: [["Pribatutasuna", "Privacidad"], ["Eguneratu", "Actualizar"], ["Zibersegurtasuna", "Ciberseguridad"], ["Gailua", "Dispositivo"], ["Esteka", "Enlace (link)"]] },

  // TEMA 15: ANIMALES
  { topicIndex: 14, level: "A1", type: "choice", question: "¿Cómo se dice «pájaro»?", options: ["Arraina", "Txoria", "Zaldia", "Ardia"], answer: "Txoria" },
  { topicIndex: 14, level: "A1", type: "order", question: "Ordena las palabras para decir «El gato bebe leche»:", words: ["edaten du", "esnea", "Katuak"], answer: "Katuak esnea edaten du" },
  { topicIndex: 14, level: "A1", type: "match", question: "Empareja los animales básicos:", pairs: [["Txakurra", "Perro"], ["Behia", "Vaca"], ["Zaldia", "Caballo"], ["Arraina", "Pez"], ["Ardia", "Oveja"]] },
  { topicIndex: 14, level: "A2", type: "choice", question: "¿Qué animal es «Otsoa»?", options: ["Zorro", "Lobo", "Conejo", "Cerdo"], answer: "Lobo" },
  { topicIndex: 14, level: "A2", type: "order", question: "Ordena las palabras para decir «En el bosque viven muchos zorros»:", words: ["bizi dira", "azeri asko", "Basoan"], answer: "Basoan azeri asko bizi dira" },
  { topicIndex: 14, level: "A2", type: "match", question: "Empareja cada animal con su traducción:", pairs: [["Txerria", "Cerdo"], ["Untxia", "Conejo"], ["Erlea", "Abeja"], ["Sugea", "Serpiente"], ["Igela", "Rana"]] },
  { topicIndex: 14, level: "B1", type: "choice", question: "¿Qué ave es «Arranoa»?", options: ["Búho", "Águila", "Paloma", "Gaviota"], answer: "Águila" },
  { topicIndex: 14, level: "B1", type: "order", question: "Ordena las palabras para decir «La ballena es el animal más grande del mar»:", words: ["animaliarik handiena da", "itsasoko", "Balea"], answer: "Balea itsasoko animaliarik handiena da" },
  { topicIndex: 14, level: "B2", type: "choice", question: "¿Cómo se dice «especie en peligro de extinción»?", options: ["Etxeko animalia", "Desagertzeko arriskuan dagoen espeziea", "Ugaztuna", "Narrastia"], answer: "Desagertzeko arriskuan dagoen espeziea" },
  { topicIndex: 14, level: "B2", type: "match", question: "Empareja la clasificación zoológica:", pairs: [["Ugaztuna", "Mamífero"], ["Narrastia", "Reptil"], ["Intsektua", "Insecto"], ["Hegaztia", "Ave"], ["Harraparia", "Depredador"]] }
];

const LEVEL_MAP = {
  "A1.1": "A1",
  "A1.2": "A1",
  "A2.1": "A2",
  "A2.2": "A2",
  "B1.1": "B1",
  "B1.2": "B1",
  "B2.1": "B2",
  "B2.2": "B2"
};

export const QUESTION_BANK = {};
LEVELS.forEach((lvl) => {
  const baseLvl = LEVEL_MAP[lvl];
  TOPICS.forEach((_, tIdx) => {
    const matching = RAW_QUESTIONS.filter(
      (q) => q.topicIndex === tIdx && q.level === baseLvl
    );
    QUESTION_BANK[`${lvl}-${tIdx}`] = matching.length > 0
      ? matching
      : RAW_QUESTIONS.filter((q) => q.topicIndex === tIdx);
  });
});

export const FLASHCARDS = Object.fromEntries(
  TOPICS.map((t, idx) => {
    const cards = RAW_QUESTIONS
      .filter((q) => q.topicIndex === idx && q.type === "match")
      .flatMap((q) => q.pairs);
    return [t.name, cards];
  })
);

export const GRAMMAR = [
  ["Pronombres personales", "ni (yo), zu (tú), hura (él/ella), gu (nosotros/as), zuek (vosotros/as), haiek (ellos/as)."],
  ["Izan: presente", "Ni naiz (yo soy), zu zara (tú eres), hura da (él/ella es), gu gara (somos), zuek zarete (sois), haiek dira (son)."],
  ["Ukan: presente", "El auxiliar ukan expresa «tener» y participa en formas verbales transitivas según sujeto y objeto."],
  ["Negación e interrogación", "La negación suele construirse con «ez» delante del verbo conjugado y las preguntas con entonación o partículas como «al»."],
  ["Declinación", "El euskera añade sufijos al nombre según caso y contexto (por ejemplo, ubicación en -n o -ean)."]
];

export const SPELLING = [
  ["b y v", "El euskera estándar utiliza b; la v aparece principalmente en nombres propios o préstamos no adaptados."],
  ["k y c", "El sonido /k/ se escribe normalmente k; la c suele reservarse para préstamos o nombres propios."],
  ["Sibilantes: z, tz, s, ts, x", "z y s representan sibilantes distintas; tz y ts son africadas; x suele sonar como «sh»."],
  ["La h", "La h es muda en euskera estándar y debe respetarse en palabras que la llevan."]
];

export const PRONUNCIATION = [
  ["Vocales", "Las cinco vocales a, e, i, o, u mantienen una pronunciación estable y clara."],
  ["Dígrafos", "«tx» suena parecido a ch; «ts» y «tz» son africadas distintas según la palabra."],
  ["Acentuación", "No se marca normalmente con tilde y varía según dialecto, palabra y entonación."]
];
