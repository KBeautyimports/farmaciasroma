// ══════════════════════════════════════════════════════════════════════
// HOW TO EDIT THIS CATALOG
// ══════════════════════════════════════════════════════════════════════
//  • TURN A PRODUCT ON/OFF → set its "active" field to true or false.
//    Inactive products disappear from the grid, the quiz, brand counts,
//    and ingredient filters — nothing else needs to change.
//
//  • ADD A PRODUCT → copy any block below (from "{" to "}"), paste it
//    before the closing "]", fill in the fields, and give it a unique
//    "image" filename (lowercase-with-hyphens.jpg is the convention).
//
//  • CHANGE WHERE IMAGES ARE HOSTED → edit IMAGE_BASE_URL below.
//    Every product's "image" field is just a filename (e.g.
//    "dr-althea-345-relief-cream.jpg"); it gets that base URL prepended
//    automatically. Upload the matching image to that location with
//    that exact filename and it will show up everywhere in the catalog.
//
//  • REMOVE A PRODUCT FOR GOOD → delete its whole { ... } block
//    (remember to remove the trailing comma of the block before it).
//
//  • ADD TIKTOK / INSTAGRAM REVIEWS → fill in a product's "reviews"
//    array with one entry per video/post, e.g.:
//      reviews: [
//        { platform: "tiktok", url: "https://www.tiktok.com/@user/video/123..." },
//        { platform: "instagram", url: "https://www.instagram.com/p/ABC123/" }
//      ]
//    Leave it as [] for products with no reviews yet. They show up as
//    a "Reseñas y Videos" section in the product's detail popup, and
//    play right there — no one ever leaves the quiz/catalog page.
// ══════════════════════════════════════════════════════════════════════

const IMAGE_BASE_URL = "https://kbeautyimports.com/images/products/";

const RAW_PRODUCTS = [
    {
      active: true,
      brand: "Dr. Althea",
      name: "Crema de alivio 345 Relief Cream",
      image: "dr-althea-crema-de-alivio-345-relief-cream.jpg",  // filename only — IMAGE_BASE_URL is prepended automatically
      description: "Qué es: Clínicamente probado como no comedogénico, 345 Relief Cream (Ver.2) es seguro y suave para la piel propensa al acné, lo que lo hace ideal para el uso diario en su rutina de cuidado del acné.   Es una crema en gel vegana en forma de ungüento regenerador rico en nutrientes, formulada para tratar las imperfecciones, nutrir la piel y brindar un cuidado calmante para una solución completa para el cuidado de la piel.  Beneficios: - Cuidado ligero post-acné - Alivio diario y cuidado calmante - No comedogénico Probado  Efectos: Clínicamente probada para piel sensible, la fórmula contiene niacinamida para aclarar la opacidad y ceramida NP para brindar una hidratación duradera en las capas profundas de la piel.",
      ingredients: "Aqua (Agua), Agua de Hoja de Melaleuca Alternifolia (Árbol de Té), Propanodiol, Glicerina, 1,2-Hexanodiol, Polideceno Hidrogenado, Vinil Dimeticona, Alcoholes C14-22, Niacinamida, Triglicérido Caprílico/Cáprico, Pantenol, Carbonato de Dicaprililo, Butilenglicol, Copolímero de Acriloildimetiltaurato de Amonio/VP, Caprilil Meticona, Polimetilsilsesquioxano, Alquil Glucósido C12-20, Hidroxiacetofenona, Polímero Cruzado de Acrilatos/Acrilato de Alquilo C10-30, Policuaternio-51, Etilhexilglicerina, Trometamina, Hialuronato de Sodio, Estearoil Glutamato de Sodio, Extracto de Raíz de Coptis Japonica, Agua de Hoja de Centella Asiática, Beta-Glucano, Resveratrol, Ácido Hialurónico Hidrolizado. Agua de hoja de Camellia Sinensis, tocoferol, madecasósido, ADN sódico, extracto de Centella asiática, ceramida NP, ácido tánico, EDTA disódico, fitato de sodio",
      types: ["Crema"],
      skinTypes: ["Piel Seca", "Piel Sensible", "Piel con Acné"],
      activeIngredients: ["Niacinamida", "Ácido Hialurónico", "Ceramidas", "Centella Asiática", "Pantenol (B5)", "Resveratrol", "PDRN / ADN Sódico"],
      reviews: []
    },
    {
      active: true,
      brand: "Dr. Althea",
      name: "Crema barrera 147 Barrier Cream",
      image: "dr-althea-crema-barrera-147-barrier-cream.jpg",  // filename only — IMAGE_BASE_URL is prepended automatically
      description: "Qué es: 147 Barrier Cream es un humectante profundamente hidratante diseñado para fortalecer la barrera de la piel y brindar hidratación duradera.  Está formulado con 1 ingrediente que refuerza la barrera, 4 ingredientes nutritivos y 7 tipos de ácido hialurónico.  Beneficios: - Fortalece la barrera cutánea - Hidratación profunda y nutrición para piel seca - Acabado sedoso sin residuos  Efectos: El complejo de ácido hialurónico de siete capas de la crema proporciona una hidratación eficaz en las diferentes capas de la piel, lo que ayuda a rellenarla y favorece el cuidado antienvejecimiento.",
      ingredients: "Agua, glicerina, dipropilenglicol, alcohol cetearílico, triglicérido caprílico/cáprico, polideceno hidrogenado, metil trimeticona, 1,2-hexanodiol, fenil trimeticona, aceite vegetal, polímero cruzado de dimeticona/vinil dimeticona, estearato de glicerilo SE, olivato de cetearilo, ácido palmítico, olivato de sorbitán, alcoholes C12-16, alcohol behenílico, ácido esteárico, lecitina hidrogenada, celulosa microcristalina, glucósido de cetearilo, butilenglicol, etilhexilglicerina, miristato de poliglicerilo-10, copolímero de acriloildimetiltaurato de amonio/VP, polimetacrilato de glicerilo, goma de celulosa, ceramida NP, colesterol, extracto de raíz de Coptis Japonica, EDTA disódico, extracto de hoja de Brassica oleracea acephala, Persea Extracto de fruta de Gratissima (aguacate), extracto de hoja de Artemisia Princeps, estearato de glicerilo, metilpropanodiol, maltodextrina, extracto hidrolizado de Gardenia Florida, ceramida AS, ceramida AP, guaiazuleno, arginina, carbómero, ceramida NG, ceramida NS, tocoferol, hialuronato de sodio hidrolizado, ácido hialurónico hidrolizado, hialuronato de dimetilsilanol, extracto de flor de Paeonia Albiflora, hialuronato de potasio, ácido hialurónico, hialuronato de sodio, polímero cruzado de hialuronato de sodio, hialuronato de hidroxipropiltrimonio, hialuronato de sodio dimetilsilanol, hialuronato de sodio acetilado, ceramida EOP",
      types: ["Crema"],
      skinTypes: ["Piel Seca", "Piel Madura"],
      activeIngredients: ["Ácido Hialurónico", "Ceramidas"],
      reviews: []
    },
    {
      active: true,
      brand: "Dr. Althea",
      name: "345 Crema de alivio en bruma",
      image: "dr-althea-345-crema-de-alivio-en-bruma.jpg",  // filename only — IMAGE_BASE_URL is prepended automatically
      description: "Qué es: Formulada con ácido hialurónico, esta bruma ultrafina repone instantáneamente la piel seca con una hidratación profunda, ayudando a mantener una hidratación duradera con comodidad durante todo el día.  Contiene una exclusiva capa 2 en 1 de crema y esencia de agua para brindar una nutrición rica y una hidratación refrescante para una piel perfectamente equilibrada.  Beneficios: - Aplicación ultrafina y suave - Hidratación profunda con extracto de arroz - Cuidado calmante para pieles sensibles  Efectos: Enriquecida con extracto de hoja de Centella Asiática y Pantenol, esta suave bruma ayuda a calmar y aliviar la irritación de la piel mientras fortalece la barrera natural de la piel.",
      ingredients: "Agua de salvado de Oryza sativa (arroz), 1,2-hexanodiol, trietilhexanoína, glicerina, poli(olefina C6-14) hidrogenada, tocoferol, agua, butilenglicol, metilpropanodiol, pentilenglicol, fermento de Streptococcus thermophilus, zumo de Pyrus malus (manzana), pantenol, ácido hialurónico hidrolizado, policuaternio-51, betaína, fosfato de trilaurato-4, extracto de Cynanchum atratum, extracto de flor de Althaea rosea, extracto de Oryza sativa (arroz), sal marina, fermento de Aspergillus, fitato de sodio, ácido cítrico, madecasósido, hialuronato de hidroxipropiltrimonio, extracto de hoja de Centella asiática, extracto de Houttuynia cordata, agua de hoja de Aloe barbadensis, extracto de fermento de Bifida, ácido hialurónico, silanetriol, grano de Avena sativa (avena). Extracto, fermento de Lactobacillus, proteína de arroz hidrolizada, aminoácidos de arroz",
      types: ["Crema", "Bruma"],
      skinTypes: ["Piel Seca", "Piel Sensible"],
      activeIngredients: ["Ácido Hialurónico", "Centella Asiática", "Pantenol (B5)", "Probióticos/Fermentos"],
      reviews: []
    },
    {
      active: true,
      brand: "Dr. Althea",
      name: "Suero potenciador de vitamina C",
      image: "dr-althea-suero-potenciador-de-vitamina-c.jpg",  // filename only — IMAGE_BASE_URL is prepended automatically
      description: "Qué es: El suero potenciador de vitamina C del Dr. Althea ayuda a disminuir las manchas oscuras del rostro con niacinamida y alfa arbutina.  Formulado sin colorantes ni aromas artificiales, ofrece una experiencia suave y agradable para la piel, libre de aditivos sintéticos.  Beneficios: - Fuerte efecto iluminador - Cuidado de manchas oscuras y tono de piel uniforme - Colorantes y aromas no artificiales  Efectos: Con 63% de agua de Hippophae Rhamnoides, 5% de niacinamida y 2% de ácido tranexámico, ayuda a reducir la opacidad y las manchas oscuras para una tez más luminosa y de tono más uniforme.",
      ingredients: "Agua de Hippophae Rhamnoides, agua de hoja de Centella Asiática, niacinamida, butilenglicol, 1,2-hexanodiol, dipropilenglicol, agua, metil gluceth-20, metilpropanodiol, betaína, ácido tranexámico, glicerina, pentilenglicol, propanodiol, hidroxietil urea, extracto de Laminaria Japonica, extracto de hoja de Eclipta Prostrata, extracto de fruto de Ficus Carica (higo), extracto de Centella Asiática, lecitina hidrogenada, hialuronato de sodio, carbómero, ácido 3-O-etil ascórbico, C12-14 Pareth-12, copolímero de acriloildimetiltaurato de amonio/VP, goma xantana, trometamina, pantenol, etilhexilglicerina, adenosina, EDTA disódico, fructooligosacáridos, beta-glucano, ácido ascórbico hidrolizado. Ácido hialurónico, ceramida NP, alfa-arbutina, tocoferol, lisado de fermento bífido, bisabolol, ubiquinona, hidroxidecil ubiquinona, hialuronato de sodio acetilado.",
      types: ["Sérum/Ampolla"],
      skinTypes: ["Todo Tipo"],
      activeIngredients: ["Niacinamida", "Ácido Hialurónico", "Vitamina C", "Ceramidas", "Ácido Tranexámico", "Alfa-Arbutina", "Centella Asiática", "Pantenol (B5)", "Adenosina", "Probióticos/Fermentos"],
      reviews: []
    },
    {
      active: true,
      brand: "Dr. Althea",
      name: "Bálsamo limpiador \"Pure Grinding\"",
      image: "dr-althea-balsamo-limpiador-pure-grinding.jpg",  // filename only — IMAGE_BASE_URL is prepended automatically
      description: "Qué es:  Formulado con solo 14 ingredientes naturales esenciales, ofrece una experiencia de limpieza suave para pieles sensibles.  Una fórmula enriquecida con Madecassoside y aceites vegetales que limpia dejando la piel suave e hidratada.  Beneficios: - Limpieza profunda con burbujas finas - Espuma limpiadora ligeramente ácida - Clínicamente probado para piel sensible  Efectos: Elimina sin esfuerzo el protector solar, el maquillaje e incluso los productos a prueba de agua con solo una pequeña cantidad.",
      ingredients: "Cetil etilhexanoato, cera sintética, triglicérido caprílico/cáprico, sesquioleato de sorbitán, isoestearato de PEG-10, triisoestearato de glicerilo PEG-20, caprilil glicol, etilhexilglicerina, aceite de semilla de Camellia sinensis, aceite de semilla de Vitis vinifera (uva), madecasósido, extracto de Centella asiática, asiaticósido, agua.",
      types: ["Limpiador"],
      skinTypes: ["Piel Sensible"],
      activeIngredients: ["Centella Asiática"],
      reviews: []
    },
    {
      active: true,
      brand: "AXIS-Y",
      name: "Dark Spot correcting Glow Serum",
      image: "axis-y-dark-spot-correcting-glow-serum.png",  // filename only — IMAGE_BASE_URL is prepended automatically
      description: "Una solución clínicamente formulada para manchas oscuras y piel opaca y desigual.  Esta fórmula multifuncional está clínicamente diseñada para mejorar visiblemente la apariencia de las manchas oscuras y el tono desigual, a la vez que es lo suficientemente suave para el uso diario. Enriquecida con un 5 % de niacinamida , escualano de origen vegetal y una mezcla cuidadosamente seleccionada de extractos botánicos iluminadores, favorece la claridad de la piel a la vez que ayuda a mantener una barrera de hidratación saludable.",
      ingredients: "Agua, glicerina, niacinamida, hialuronato de sodio, propanodiol, eritritol, butilenglicol, escualano, extracto de salvado de Oryza sativa (arroz), extracto de flor de Calendula officinalis, extracto de fruto de Carica papaya (papaya), extracto de fruto de Hippophae rhamnoides, extracto de fruto de Malpighia glabra (acerola), laurato de poligliceril-10, clorfenesina, arginina, etilhexilglicerina, carbómero, glutatión, 1,2-hexanodiol, hidroxipropil ciclodextrina, EDTA disódico, hidroxietilcelulosa, alantoína, aceite de hoja de Rosmarinus officinalis (romero).",
      types: ["Sérum/Ampolla"],
      skinTypes: ["Todo Tipo"],
      activeIngredients: ["Niacinamida", "Ácido Hialurónico", "Escualano", "Glutatión"],
      reviews: []
    },
    {
      active: true,
      brand: "AXIS-Y",
      name: "Suero vegano de colágeno para ojos",
      image: "axis-y-suero-vegano-de-colageno-para-ojos.jpg",  // filename only — IMAGE_BASE_URL is prepended automatically
      description: "El sérum de colágeno vegano para ojos AXIS-Y, formulado con colágeno vegano, combate las arrugas y la pérdida de elasticidad causada por la sequedad. Enriquecido con 5 tipos de péptidos, 3 extractos de frutas ricos en vitamina C y ácido hialurónico, hidrata intensamente la delicada zona de los ojos, nutriendo e iluminando la piel.",
      ingredients: "Agua, metilpropanodiol, glicerina, 1,2-hexanodiol, niacinamida, adenosina, colágeno (450 ppm), hialuronato de sodio, ácido hialurónico hidrolizado, hialuronato de sodio acetilado, tripéptido-1, palmitoil pentapéptido-4, hexapéptido-9, acetil hexapéptido-8, tripéptido de cobre-1, extracto de fruta de Pyrus Malus (manzana), extracto de fruta de Prunus Mume, extracto de fruta de Vitis Vinifera (uva), aceite de semilla de Helianthus Annuus (girasol), aceite de semilla de Simmondsia Chinensis (jojoba), aceite de semilla de Limnanthes Alba (hierba de la pradera), extracto de fruta de Carica Papaya (papaya), extracto de Centella Asiática, extracto de fruta de Ficus Carica (higo), extracto de raíz de Ulmus Davidiana, extracto de semilla de Amaranthus Caudatus, ceramida NP.",
      types: ["Contorno de Ojos"],
      skinTypes: ["Piel Seca", "Piel Sensible", "Piel Madura"],
      activeIngredients: ["Niacinamida", "Ácido Hialurónico", "Ceramidas", "Péptidos", "Centella Asiática", "Adenosina", "Probióticos/Fermentos"],
      reviews: []
    },
    {
      active: true,
      brand: "AXIS-Y",
      name: "Protector solar físico completo sin estrés V.3",
      image: "axis-y-protector-solar-fisico-completo-sin-estres-v-3.png",  // filename only — IMAGE_BASE_URL is prepended automatically
      description: "Un protector solar mineral no graso y sin capa blanca, diseñado para pieles sensibles. Este protector solar de amplio espectro FPS 50 PA++++ utiliza óxido de zinc no nanométrico para proteger tu piel de los rayos UVA y UVB, sin dejar una capa blanca, sin sensación grasosa y con un acabado hidratante.",
      ingredients: "Agua, óxido de zinc, ciclohexasiloxano, dipropilenglicol, salicilato de butiloctilo, propanodiol, isododecano, niacinamida, difenilsiloxifenil trimeticona, caprilil meticona, extracto de flor de Calendula Officinalis, extracto de hoja de Camellia Sinensis, extracto de flor de Artemisia Capillaris, hialuronato de sodio, adenosina, palmitoil tripéptido-5, escualano, tocoferol, alantoína, glicerina.",
      types: ["Protector Solar"],
      skinTypes: ["Piel Sensible"],
      activeIngredients: ["Niacinamida", "Ácido Hialurónico", "Péptidos", "Escualano", "AHA/BHA", "Zinc (Óxido)", "Adenosina"],
      reviews: []
    },
    {
      active: true,
      brand: "AXIS-Y",
      name: "Crema iluminadora intensiva TXA 2.5%",
      image: "axis-y-crema-iluminadora-intensiva-txa-2-5.jpg",  // filename only — IMAGE_BASE_URL is prepended automatically
      description: "Una fórmula suave pero eficaz diseñada para combatir la opacidad y el tono desigual de la piel. Enriquecida con un 2,5 % de ácido tranexámico, un 2,5 % de niacinamida y glutatión, esta crema nutritiva actúa para atenuar visiblemente las manchas oscuras, refinar el tono y restaurar la luminosidad.",
      ingredients: "Agua, glicerina, éter dicaprilílico, polideceno hidrogenado, alcohol estearílico, manteca de Butyrospermum parkii (karité), niacinamida, ácido tranexámico (2,5 %), octildodecanol, pantenol, ceramida NP, etilhexilglicerina, glutatión, tocoferol, extracto de centella asiática, hialuronato de sodio, ácido hialurónico hidrolizado.",
      types: ["Crema"],
      skinTypes: ["Piel Seca", "Piel Sensible"],
      activeIngredients: ["Niacinamida", "Ácido Hialurónico", "Ceramidas", "Ácido Tranexámico", "Centella Asiática", "Pantenol (B5)", "Glutatión"],
      reviews: []
    },
    {
      active: true,
      brand: "AXIS-Y",
      name: "Ampolla de barrera cutánea intensiva de Alcachofa",
      image: "axis-y-ampolla-de-barrera-cutanea-intensiva-de-alcachofa.png",  // filename only — IMAGE_BASE_URL is prepended automatically
      description: "Fortalece tu piel, calma el estrés y restablece el equilibrio. Enriquecida con 10,000 ppm de extracto de alcachofa y una mezcla vegetal de centella asiática, raíz de regaliz y aloe, ayuda a mejorar la capacidad natural de la piel para protegerse y sanar.",
      ingredients: "Agua, agua de hoja de Aloe Barbadensis, butilenglicol, hialuronato de sodio, extracto de Centella Asiatica, glicerina, betaína, propanodiol, extracto de raíz de Glycyrrhiza Uralensis (regaliz), extracto de Hieracium Umbellatum, extracto de hoja de Cynara Scolymus (alcachofa) (10 000 ppm), ácido poliglutámico, beta-glucano, arginina, alantoína, adenosina.",
      types: ["Sérum/Ampolla"],
      skinTypes: ["Piel Seca", "Piel Sensible"],
      activeIngredients: ["Ácido Hialurónico", "Centella Asiática", "Adenosina", "Ácido Poliglutámico"],
      reviews: []
    },
    {
      active: true,
      brand: "AXIS-Y",
      name: "Tónico en gel Triple PDRN",
      image: "axis-y-tonico-en-gel-triple-pdrn.jpg",  // filename only — IMAGE_BASE_URL is prepended automatically
      description: "Qué es: Un tónico de textura gel refrescante formulado con Triple PDRN derivado de plantas (frambuesa, arándano y arándano rojo) — una alternativa vegana al PDRN de salmón — junto con Astaxantina, colágeno y péptidos para calmar, hidratar y fortalecer la barrera cutánea en un solo paso.\n\nBeneficios:\n- Triple PDRN de berries: apoya la vitalidad y recuperación de la piel estresada por factores externos, calor o irritación\n- Astaxantina: antioxidante potente que defiende contra agresores ambientales diarios\n- PHA: exfoliación suave que renueva la textura sin irritar y mejora la absorción de los siguientes pasos\n- Colágeno + Péptidos: mejoran la apariencia de la firmeza y elasticidad\n- Textura gel matrix refrescante: hidratación duradera sin sensación pegajosa\n- Equilibra la producción de sebo para un acabado cómodo y uniforme",
      ingredients: "Agua, Glicerina, Butilenglicol, Complejo Triple Berry PDRN (Extracto de Rubus Idaeus/Frambuesa, Extracto de Vaccinium Corymbosum/Arándano Azul, Extracto de Vaccinium Macrocarpon/Arándano Rojo), Astaxantina, Colágeno Hidrolizado, Hialuronato de Sodio, Gluconolactona (PHA), Pantenol, Palmitoil Tripéptido-1, Palmitoil Tetrapéptido-7, Extracto de Centella Asiática, Ácido Hialurónico, 1,2-Hexanodiol, Carbómero, Etilhexilglicerina, Adenosina",
      types: ["Tónico/Esencia"],
      skinTypes: ["Piel Seca", "Piel Grasa", "Piel Mixta", "Piel Sensible", "Piel Normal", "Todo Tipo"],
      activeIngredients: ["Ácido Hialurónico", "Centella Asiática", "Pantenol (B5)", "Péptidos", "AHA/BHA", "PDRN / ADN Sódico", "Adenosina"],
      reviews: []
    },
    {
      active: true,
      brand: "AXIS-Y",
      name: "Crema protectora suavizante de la piel Pantenol 10 Shield Cream",
      image: "axis-y-crema-protectora-suavizante-de-la-piel-pantenol-10-shield-cream.jpg",  // filename only — IMAGE_BASE_URL is prepended automatically
      description: "Formulada con un 10 % de pantenol (provitamina B5), esta crema ofrece hidratación, fortalece la piel y protege, a la vez que fortalece la barrera cutánea con el tiempo. Clínicamente probado para mejorar la función de barrera de humedad en solo 5 minutos.",
      ingredients: "Agua, pantenol (10 %), metilpropanodiol, escualano, glicerina, cetil etilhexanoato, vinil dimeticona, extracto de centella asiática, ceramida NP, fermento de Saccharomyces.",
      types: ["Crema"],
      skinTypes: ["Piel Seca", "Piel Grasa", "Piel Mixta", "Piel Sensible", "Piel Normal", "Todo Tipo"],
      activeIngredients: ["Ceramidas", "Centella Asiática", "Pantenol (B5)", "Escualano", "Probióticos/Fermentos"],
      reviews: []
    },
    {
      active: true,
      brand: "AXIS-Y",
      name: "Tratamiento para imperfecciones Spot The Difference",
      image: "axis-y-tratamiento-para-imperfecciones-spot-the-difference.jpg",  // filename only — IMAGE_BASE_URL is prepended automatically
      description: "Formulado para pieles con tendencia acneica, grasas y sensibles, el Tratamiento Anti-Imperfecciones Spot The Difference proporciona un alivio eficaz contra brotes e imperfecciones. Este gel ligero también contiene cápsulas hidratantes de ceramida para ayudar a restaurar la barrera cutánea.",
      ingredients: "Agua, glicerina, propanodiol, niacinamida, extracto de hoja de Aloe Barbadensis, extracto de Centella Asiatica, ceramida NP, ácido hialurónico hidrolizado, ácido glicólico, ácido salicílico.",
      types: ["Sérum/Ampolla"],
      skinTypes: ["Piel Seca", "Piel con Acné"],
      activeIngredients: ["Niacinamida", "Ácido Hialurónico", "Ceramidas", "Centella Asiática", "AHA/BHA"],
      reviews: []
    },
    {
      active: true,
      brand: "Herbloom",
      name: "Protector solar \"Daily Tone Up Vegan Sunscreen\"",
      image: "herbloom-protector-solar-daily-tone-up-vegan-sunscreen.jpg",  // filename only — IMAGE_BASE_URL is prepended automatically
      description: "La última tecnología coreana. Súper ligero para la piel, con fórmula y envase ecológicos. Completamente libre de cualquier yeso blanco, irritación ocular y pegajosidad. El factor de protección solar es SPF50+ PA++++. Los ingredientes a base de plantas llenos de vitaminas proporcionan una piel vitalizante.",
      ingredients: "Agua, Propanodiol, Polimetilsilsesquioxano, benzoato de dietilamino hidroxibenzoilo hexilo, etilhexil triazona, niacinamida, Hialuronato de Sodio, Extracto de Centella Asiatica, Tocoferol, Ácido Ascórbico Polipeptídico.",
      types: ["Protector Solar"],
      skinTypes: ["Todo Tipo"],
      activeIngredients: ["Niacinamida", "Ácido Hialurónico", "Vitamina C", "Centella Asiática"],
      reviews: []
    },
    {
      active: true,
      brand: "Herbloom",
      name: "Espuma limpiadora \"H.T Solution Pack Cleansing Foam\"",
      image: "herbloom-espuma-limpiadora-h-t-solution-pack-cleansing-foam.webp",  // filename only — IMAGE_BASE_URL is prepended automatically
      description: "Desintoxica profundamente a la vez que fortalece la barrera cutánea para una piel limpia y suave. Su rica espuma elimina las impurezas, el exceso de sebo y el maquillaje sin sensación de tirantez, para una tez radiante y uniforme.",
      ingredients: "Glicerina, agua purificada, ácido mirístico, ácido palmítico, hidróxido de potasio, calamina (10 000 ppm), ácido salicílico, aceite de hoja de árbol de té, pantenol, extracto de Houttuynia cordata.",
      types: ["Limpiador"],
      skinTypes: ["Piel Grasa"],
      activeIngredients: ["Pantenol (B5)", "AHA/BHA"],
      reviews: []
    },
    {
      active: true,
      brand: "Herbloom",
      name: "Sérum Bioma Kombucha Plant Biome",
      image: "herbloom-serum-bioma-kombucha-plant-biome.jpg",  // filename only — IMAGE_BASE_URL is prepended automatically
      description: "Qué es: Un sérum hidratante y antienvejecimiento formulado con 70.5% de extracto de kombucha orgánica (té verde fermentado) y un complejo de prebióticos y probióticos para nutrir el microbioma de la piel. Fortalece y equilibra la barrera cutánea con acción calmante y antioxidante.\n\nBeneficios:\n- Hidratación profunda con triple ácido hialurónico\n- Refuerza la barrera de la piel con ceramidas derivadas de plantas\n- Efecto antioxidante 4x superior al té verde\n- Textura lechosa ligera de absorción rápida\n- 100% vegano y libre de 20 ingredientes dañinos",
      ingredients: "Agua, Glicerina, Propanodiol, Isoamil Laurato, Pentilenglicol, Fermento de Saccharomyces/Xylinum/Té Negro, Aceite de Semilla de Cannabis Sativa, Betaína, Extracto de Centella Asiática, Butilenglicol, Lecitina Hidrogenada, Citrato de Estearato de Glicerilo, Alcohol Arachidílico, Aceite de Semilla de Ricinus Communis (Ricino), Bisabolol, Escualano, Alcohol Behénico, Glucósido Arachidílico, Glicol Caprililo, Olivato de Sorbitán, Palmitato de Cetilo, Ácido Caprilohidroxámico, Palmitato de Sorbitán, Goma Sclerotium, Madecasósido, Hialuronato de Sodio, Adenosina, Aceite de Fruto de Citrus Aurantium Bergamia (Bergamota), Aceite de Hoja de Melaleuca Alternifolia (Árbol de Té), Dextrina, Limoneno, Asiaticósido, Extracto de Piel de Vitis Vinifera (Uva), Goma Xantana, Extracto de Fruto de Citrus Limon (Limón), Extracto de Lavandula Angustifolia (Lavanda), Filtrado de Lisado de Fermento de Lactobacillus, Linalool, Aceite de Semilla de Simmondsia Chinensis (Jojoba)",
      types: ["Sérum/Ampolla"],
      skinTypes: ["Piel Seca", "Piel Grasa", "Piel Mixta", "Piel Sensible", "Piel Normal", "Todo Tipo"],
      activeIngredients: ["Ácido Hialurónico", "Centella Asiática", "Escualano", "Adenosina", "Probióticos/Fermentos"],
      reviews: []
    },
    {
      active: true,
      brand: "SKIN1004",
      name: "Mascarilla de arcilla Poremizing Quick Clay Stick Mask",
      image: "skin1004-mascarilla-de-arcilla-poremizing-quick-clay-stick-mask.jpg",  // filename only — IMAGE_BASE_URL is prepended automatically
      description: "Una mascarilla suave en barra con 5 tipos de arcillas (18 % de caolín) y polvo fino de judía roja para absorber el exceso de sebo y cerrar los poros dilatados. Ingredientes principales: Extracto de Centella Asiática, Caolín, Bentonita, Illita, Montmorillonita.",
      ingredients: "Agua, caolín, dipropilenglicol, glicerina, butilenglicol, extracto de hoja de Aloe barbadensis, polvo de semilla de Phaseolus angularis, extracto de Centella asiática, bentonita, ilita, montmorillonita, calamina.",
      types: ["Mascarilla"],
      skinTypes: ["Piel Grasa", "Piel Mixta", "Piel Normal"],
      activeIngredients: ["Centella Asiática"],
      reviews: []
    },
    {
      active: true,
      brand: "SKIN1004",
      name: "Poremizing Fresh Ampoule",
      image: "skin1004-poremizing-fresh-ampoule.jpg",  // filename only — IMAGE_BASE_URL is prepended automatically
      description: "Una ampolla funcional que minimiza los poros con sales minerales rosas y 9 péptidos que limpia los poros y mejora la elasticidad de la piel. Ingredientes clave: Extracto de Centella Asiática, sales minerales, extracto de hoja de Aloe Barbadensis.",
      ingredients: "Extracto de Centella Asiática (5150 ppm), sales minerales, extracto de hoja de Aloe Barbadensis (10000 ppm), Complejo de 9 Péptidos (Acetil Hexapéptido-8, Acetil Octapéptido-3, Tripéptido-1 de Cobre, Palmitoil Pentapéptido-4, Palmitoil Tetrapéptido-7).",
      types: ["Sérum/Ampolla"],
      skinTypes: ["Piel Grasa", "Piel Mixta", "Piel Sensible"],
      activeIngredients: ["Péptidos", "Centella Asiática"],
      reviews: []
    },
    {
      active: true,
      brand: "SKIN1004",
      name: "Aceite limpiador ligero de centella",
      image: "skin1004-aceite-limpiador-ligero-de-centella.jpg",  // filename only — IMAGE_BASE_URL is prepended automatically
      description: "La centella asiática y 6 aceites vegetales disuelven suavemente el maquillaje, el protector solar y el exceso de sebo de la piel, dejando un acabado refrescante y sin grasa. Tipo de piel: Normal, seca, sensible.",
      ingredients: "Estearato de etilhexilo, etilhexanoato de cetilo, tetraoleato de Sorbeth-30, triglicérido caprílico/cáprico, aceite de fruto de Citrus aurantium bergamia (bergamota), extracto de Centella asiática, aceite de semilla de Simmondsia chinensis (jojoba), aceite de fruto de Olea europaea (oliva).",
      types: ["Limpiador", "Aceite Limpiador"],
      skinTypes: ["Piel Seca", "Piel Sensible", "Piel Normal"],
      activeIngredients: ["Centella Asiática"],
      reviews: []
    },
    {
      active: true,
      brand: "SKIN1004",
      name: "Ampolla de cápsula iluminadora de tono",
      image: "skin1004-ampolla-de-capsula-iluminadora-de-tono.jpg",  // filename only — IMAGE_BASE_URL is prepended automatically
      description: "Una ampolla para uso diario, formulada con niacinamida, ácido tranexámico y Madewhite™ encapsulado para ayudar a mejorar el aspecto del tono desigual y la opacidad de la piel para una tez de aspecto más radiante.",
      ingredients: "Agua, butilenglicol, niacinamida, glicerina, ácido tranexámico, extracto de centella asiática, pantenol, madecasósido, ácido 3-O-etil ascórbico, fermento de lactobacilos.",
      types: ["Sérum/Ampolla"],
      skinTypes: ["Piel Seca", "Piel Mixta", "Piel Normal"],
      activeIngredients: ["Niacinamida", "Vitamina C", "Ácido Tranexámico", "Centella Asiática", "Pantenol (B5)", "Probióticos/Fermentos"],
      reviews: []
    },
    {
      active: true,
      brand: "SKIN1004",
      name: "Hyalu-cica Sun Stick",
      image: "skin1004-hyalu-cica-sun-stick.jpg",  // filename only — IMAGE_BASE_URL is prepended automatically
      description: "Con FPS 50+ PA++++, este protector solar en barra aprovecha el poder hidratante del extracto de cica y el ácido hialurónico. La combinación única de extracto de Centella Asiática y ácido hialurónico cura e hidrata simultáneamente la piel.",
      ingredients: "Polímero cruzado de metacrilato de metilo, cera sintética, benzoato de dietilamino hidroxibenzoil hexilo, etilhexil triazona, extracto de Centella Asiatica, hialuronato de sodio, ácido hialurónico hidrolizado, ácido hialurónico.",
      types: ["Protector Solar"],
      skinTypes: ["Todo Tipo"],
      activeIngredients: ["Ácido Hialurónico", "Centella Asiática", "AHA/BHA"],
      reviews: []
    },
    {
      active: true,
      brand: "SKIN1004",
      name: "Suero solar Hyalu-Cica Water-Fit UV",
      image: "skin1004-suero-solar-hyalu-cica-water-fit-uv.jpg",  // filename only — IMAGE_BASE_URL is prepended automatically
      description: "Un protector solar ligero tipo sérum que hidrata y suaviza la piel para un acabado fresco y sin manchas blancas. Reformulado con pantenol y extractos de arroz, avena y soja para ayudar a mantener la hidratación.",
      ingredients: "Agua, propanodiol, pantenol, caprilil meticona, extracto de Centella asiática, hialuronato de sodio hidrolizado, hialuronato de sodio, ácido hialurónico, extracto de Oryza Sativa (arroz).",
      types: ["Sérum/Ampolla", "Protector Solar"],
      skinTypes: ["Piel Seca", "Piel Normal"],
      activeIngredients: ["Ácido Hialurónico", "Centella Asiática", "Pantenol (B5)", "AHA/BHA"],
      reviews: []
    },
    {
      active: true,
      brand: "HaruHaru",
      name: "Gel Limpiador Black Rice Moisture 5.5 Soft Cleansing Gel",
      image: "haruharu-gel-limpiador-black-rice-moisture-5-5-soft-cleansing-gel.jpg",  // filename only — IMAGE_BASE_URL is prepended automatically
      description: "Gel limpiador purificante con fórmula ligeramente ácida, enriquecida con agentes limpiadores derivados del coco. Elimina eficazmente la suciedad, las células muertas y las impurezas, mientras que el extracto fermentado de arroz negro ayuda a mantener la piel hidratada.",
      ingredients: "Agua, glicerina, coco-betaína, propanodiol, extracto de Oryza sativa (arroz), filtrado de extracto de fermento de Aspergillus, beta-glucano.",
      types: ["Limpiador"],
      skinTypes: ["Piel Sensible"],
      activeIngredients: ["Probióticos/Fermentos"],
      reviews: []
    },
    {
      active: true,
      brand: "HaruHaru",
      name: "Aceite Limpiador Black Rice Moisture Deep Cleansing Oil",
      image: "haruharu-aceite-limpiador-black-rice-moisture-deep-cleansing-oil.jpg",  // filename only — IMAGE_BASE_URL is prepended automatically
      description: "Simple pero poderoso, aceite limpiador que contiene un 95% de aceites vegetales de origen natural para aportar una limpieza profunda y una hidratación duradera. Incorpora aceite de salvado de arroz negro coreano concentrado al 100%.",
      ingredients: "Aceite de salvado de Oryza sativa (arroz), triglicérido caprílico/cáprico, aceite de semilla de Helianthus annuus (girasol), aceite de fruto de Olea europaea (oliva), aceite de semilla de Simmondsia chinensis (jojoba), tocoferol, etilhexilglicerina.",
      types: ["Limpiador", "Aceite Limpiador"],
      skinTypes: ["Piel Seca"],
      activeIngredients: [],
      reviews: []
    },
    {
      active: true,
      brand: "HaruHaru",
      name: "Protector Solar Black Rice Moisture Airyfit Sunscreen",
      image: "haruharu-protector-solar-black-rice-moisture-airyfit-sunscreen.jpg",  // filename only — IMAGE_BASE_URL is prepended automatically
      description: "Formulado con SPF50+ PA++++ para defenderse de los rayos UV. Una fórmula liviana infundida con extracto de arroz negro para una hidratación adicional. Enriquecido con ceramida NP, adenosina y niacinamida.",
      ingredients: "Agua, niacinamida, extracto de Oryza sativa (arroz), aceite de salvado de Oryza sativa (arroz), ceramida NP, adenosina, tocoferol, aceite de semilla de Moringa oleifera.",
      types: ["Protector Solar"],
      skinTypes: ["Todo Tipo"],
      activeIngredients: ["Niacinamida", "Ceramidas", "AHA/BHA", "Adenosina"],
      reviews: []
    },
    {
      active: true,
      brand: "HaruHaru",
      name: "Tónico Black Rice Hyaluronic Toner Sin Fragrancia",
      image: "haruharu-tonico-black-rice-hyaluronic-toner-sin-fragrancia.jpg",  // filename only — IMAGE_BASE_URL is prepended automatically
      description: "Formulado con un 95% de ingredientes de origen natural, incluyendo 2.000 ppm de extracto de arroz negro coreano, ácido hialurónico y beta-glucano para proporcionar una hidratación intensa mientras promueve la regeneración de las células de la piel.",
      ingredients: "Agua, betaína, glicerina, extracto de Oryza sativa (arroz) (2000 ppm), ácido hialurónico (600 ppm), betaglucano, goma de semilla de Tamarindus indica, extracto de raíz de Panax ginseng.",
      types: ["Tónico/Esencia"],
      skinTypes: ["Piel Seca", "Piel Grasa", "Piel Mixta", "Piel Sensible", "Piel Normal", "Todo Tipo"],
      activeIngredients: ["Ácido Hialurónico", "Probióticos/Fermentos"],
      reviews: []
    },
    {
      active: true,
      brand: "HaruHaru",
      name: "Sérum Calmante Rose PDRN Soothing Serum",
      image: "haruharu-serum-calmante-rose-pdrn-soothing-serum.jpg",  // filename only — IMAGE_BASE_URL is prepended automatically
      description: "Qué es: Un sérum multibeneficios con PDRN vegano de rosa de Damasco y ácido azelaico para regenerar la piel, calmar la sensibilidad y mejorar la textura. Clínicamente probado para mejorar la hidratación en un 88.93%, reducir el enrojecimiento en un 21.84% y mejorar la textura en un 11.02% desde el primer uso.\n\nBeneficios:\n- PDRN vegano de rosa: apoya la regeneración cutánea y síntesis de colágeno\n- Ácido azelaico: calma la irritación, reduce el enrojecimiento, mejora la textura\n- Trío hidratante: Sodium PCA, Pantenol y Escualano para hidratación duradera\n- 9 tipos de ácido hialurónico para hidratación multicapa\n- Sin fragancia, apto para piel sensible",
      ingredients: "Agua, Glicerina, Butilenglicol, Extracto de Flor de Rosa Damascena, ADN Sódico (PDRN), Hialuronato de Sodio, Pantenol, Betaína, Triglicérido Caprílico/Cáprico, Ácido Azelaico, Escualano, PCA Sódico, Ácido Hialurónico Hidrolizado, Hialuronato de Sodio Hidrolizado, Hialuronato de Potasio, Polímero Cruzado de Hialuronato de Sodio, Hialuronato de Hidroxipropiltrimonio, Hialuronato de Sodio Acetilado, Hialuronato de Dimetilsilanol, Niacinamida, Extracto de Centella Asiática, Extracto de Raíz de Dioscorea Japonica (Ñame), Ceramida NP, Adenosina",
      types: ["Sérum/Ampolla"],
      skinTypes: ["Piel Seca", "Piel Grasa", "Piel Mixta", "Piel Sensible", "Piel Normal", "Todo Tipo", "Piel con Acné"],
      activeIngredients: ["Niacinamida", "Ácido Hialurónico", "Ceramidas", "Ácido Azelaico", "Centella Asiática", "Pantenol (B5)", "Escualano", "PDRN / ADN Sódico", "Adenosina"],
      reviews: []
    },
    {
      active: true,
      brand: "SKIN1004",
      name: "Probio-Cica Bakuchiol Eye Cream",
      image: "skin1004-probio-cica-bakuchiol-eye-cream.png",  // filename only — IMAGE_BASE_URL is prepended automatically
      description: "Qué es: Una crema de ojos suave con Centella fermentada y Bakuchiol (retinol vegano) que reduce la apariencia de líneas finas y arrugas para una piel más suave y firme alrededor de los ojos. Clínicamente probado para mejorar la apariencia de líneas finas y la textura de la piel en solo 2 semanas.  Beneficios: - Bakuchiol (5,000 ppm): alternativa vegetal al retinol, suaviza y reafirma la piel - Centella Asiática fermentada: calma la irritación y refuerza la barrera cutánea - Ceramida NP: hidratación profunda y soporte de la barrera - Fórmula rica que se absorbe rápidamente sin residuos pegajosos  Efectos: Formulado con Lactobacillus/Extracto Fermentado de Centella Asiática, Ceramidas y Ácido Hialurónico hidrolizado para hidratar intensamente la delicada zona de los ojos y mejorar su firmeza.",
      ingredients: "Agua, Glicerina, Butilenglicol, Ésteres Dipentaeritritilo Hexa C5-9, 1,2-Hexanodiol, Niacinamida, Escualano, Polglicerilo-3 Diestearato, Alcohol Cetearílico, Triglicérido Caprílico/Cáprico, Betaína, Manteca de Butyrospermum Parkii (Karité), Heptil Undecilenato, Extracto de Centella Asiatica, Pantenol, Bakuchiol, Estearato de Glicerilo, Polímero Cruzado de Acrilatos/Acrilato de Alquilo C10-30, Ácido Palmítico, Trometamina, Ácido Esteárico, Citrato de Estearato de Glicerilo, Carbómero, Etilhexilglicerina, Adenosina, Aceite de Semilla de Macadamia Ternifolia, Fitato de Sodio, Hialuronato de Sodio, Lecitina Hidrogenada, Ceramida NP, Copolímero de Acrilato de Glicerilo/Ácido Acrílico, Dextrina, Extracto de Theobroma Cacao (Cacao), Polglicerilo-10 Miristato, Fitoesfingosina, Fermento de Lactobacillus, Ácido Madecásico, Asiaticósido, Extensina Hidrolizada, Diestearato de Sacarosa, Ácido Asiático, Ácido Láurico, Fitoesteroles, Ácido Hialurónico Hidrolizado, Caprilil Glicol, Acetil Hexapéptido-8.",
      types: ["Contorno de Ojos"],
      skinTypes: ["Piel Seca", "Piel Sensible", "Piel Normal"],
      activeIngredients: ["Niacinamida", "Ácido Hialurónico", "Retinol/Bakuchiol", "Ceramidas", "Centella Asiática", "Pantenol (B5)", "Escualano", "Péptidos", "Adenosina", "Probióticos/Fermentos"],
      reviews: []
    },
    {
      active: true,
      brand: "SKIN1004",
      name: "Madagascar Centella Ampoule Foam",
      image: "skin1004-madagascar-centella-ampoule-foam.jpg",  // filename only — IMAGE_BASE_URL is prepended automatically
      description: "Qué es: Espuma limpiadora enriquecida con 33% de extracto de Centella Asiática de Madagascar para limpiar profundamente sin resecar. Su fórmula con pH 5 elimina maquillaje, sebo e impurezas dejando la piel suave, calmada e hidratada. Los tensioactivos derivados del coco limpian con suavidad manteniendo el equilibrio de humedad natural.  Beneficios: - Elimina hasta el 92.69% del polvo fino - Bicarbonato de sodio ultra-fino absorbe el sebo y desobstruye los poros - Ácido Cítrico para exfoliación suave de células muertas - Hialuronato de Sodio para hidratación post-limpieza - Apta para todo tipo de piel, incluyendo sensible y propensa al acné  Efectos: Su pasta cremosa de tono marrón claro se transforma en una espuma rica y delicada al contacto con el agua, proporcionando una limpieza eficaz sin irritación ni sequedad.",
      ingredients: "Extracto de Centella Asiatica, Isetionato de Cocoílo de Sodio, Glicerina, Agua, Taurato de Metil Cocoílo de Sodio, Coco-Betaína, Glicinato de Cocoílo de Potasio, 1,2-Hexanodiol, Cloruro de Sodio, Cocoato de Potasio, Benzoato de Potasio, Policuaternio-67, Ácido Cítrico, Dextrina, Bicarbonato de Sodio, Extracto de Theobroma Cacao (Cacao), EDTA Disódico, Acetato de Sodio, Butilenglicol, Extracto de Raíz de Coptis Chinensis, Hialuronato de Sodio, Extracto de Fruto de Coccinia Indica, Extracto de Eclipta Prostrata.",
      types: ["Limpiador"],
      skinTypes: ["Piel Seca", "Piel Grasa", "Piel Mixta", "Piel Sensible", "Piel Normal", "Todo Tipo", "Piel con Acné"],
      activeIngredients: ["Ácido Hialurónico", "Centella Asiática", "AHA/BHA"],
      reviews: []
    },
    {
      active: true,
      brand: "SKIN1004",
      name: "Centella TECA Ampoule",
      image: "skin1004-centella-teca-ampoule.png",  // filename only — IMAGE_BASE_URL is prepended automatically
      description: "Qué es: Una ampolla de Centella de alta concentración con TECA purificado (Madecasósido, Asiaticósido, Ácido Madecásico, Ácido Asiático) en nanopartículas ultrafinas de 74 nm — aproximadamente 3,400 veces más pequeñas que un poro — para una distribución precisa y uniforme. Ayuda a aliviar proactivamente la apariencia de líneas finas y la piel con aspecto estresado.\n\nBeneficios:\n- TECA de alta pureza: los 4 activos clave de la Centella en nanopartículas para máxima absorción\n- Alivia la tensión y calma la piel con aspecto estresado por factores ambientales diarios\n- Glicosil Glucósido y Ácido Poliglutámico para hidratación en capas\n- Péptidos (Palmitoil Tripéptido-1, Tetrapéptido-7, Pentapéptido-4) para soporte antiedad\n- Textura ligera que se puede superponer 2-3 veces para cuidado intensivo",
      ingredients: "Agua, Extracto de Centella Asiática, Metilpropanodiol, Glicerina, 1,2-Hexanodiol, Niacinamida, Butilenglicol, Pentilenglicol, Hidroxietilcelulosa, Lecitina Hidrogenada, Goma Xantana, Asiaticósido, Ácido Madecásico, Etilhexilglicerina, Alantoína, Adenosina, Lisado de Fermento de Bifida, EDTA Disódico, Fitato de Sodio, Ácido Asiático, Gluconolactona, ADN Sódico, Citrato de Sodio, Hialuronato de Sodio, Madecasósido, Carbómero, Lactato de Sodio, Glucósido de Glicerilo, Polisorbato 20, Ácido Poliglutámico, Colágeno Soluble, Lecitina, Glicirrizato Dipotásico, PCA Sódico, Tocoferol, Palmitoil Tripéptido-1, Arginina, Ceramida NP, Palmitoil Tetrapéptido-7, Palmitoil Pentapéptido-4",
      types: ["Sérum/Ampolla"],
      skinTypes: ["Piel Seca", "Piel Mixta", "Piel Sensible", "Piel Normal", "Piel con Acné"],
      activeIngredients: ["Niacinamida", "Ácido Hialurónico", "Ceramidas", "Centella Asiática", "Pantenol (B5)", "Péptidos", "Adenosina", "PDRN / ADN Sódico", "Probióticos/Fermentos", "Ácido Poliglutámico"],
      reviews: []
    },
    {
      active: true,
      brand: "SKIN1004",
      name: "Lab in Nature Retinol 0.2 Boosting Shot Ampoule",
      image: "skin1004-lab-in-nature-retinol-0-2-boosting-shot-ampoule.png",  // filename only — IMAGE_BASE_URL is prepended automatically
      description: "Qué es: Una ampolla de retinol de alta eficacia que combina 0.2% de Retinol y Retinal para mejorar la firmeza y textura de la piel, entregados a través del sistema Boosting Shot con microespículas de esponja natural (prom. 13 µm) — más pequeñas que el tamaño medio de un poro — para una absorción optimizada.\n\nCómo funciona el sistema de 3 pasos:\n1. Las microespículas crean microcanales de absorción en la piel\n2. Retinol, Retinal y Escualano se entregan en profundidad\n3. Restaura la elasticidad y refuerza la barrera para una piel firme y resiliente\n\nBeneficios:\n- Retinol 0.2%: mejora la elasticidad, suaviza la textura y reduce la apariencia de arrugas\n- Retinal: derivado de Vitamina A más gentil, mejora el tono y firmeza con menos irritación\n- Escualano: emoliente que mantiene el equilibrio y refuerza la barrera cutánea\n- Centella Asiática de Madagascar + Pantenol: calman y nutren durante el proceso de renovación\n\n⚠️ Precauciones: Iniciar 2-3 veces por semana. No usar en piel irritada. Evitar durante embarazo. Usar protector solar durante el día.",
      ingredients: "Agua, Glicerina, 1,2-Hexanodiol, Olivato de Cetearilo, Escualano, Olivato de Sorbitán, Carbómero, Retinol (0.2%), Triglicérido Caprílico/Cáprico, Extracto de Fruto de Hippophae Rhamnoides, Trometamina, Extracto de Semilla de Phaseolus Radiatus, Lecitina Hidrogenada, Carbamato de Laurilo Inulina, Poliacrilato de Sodio, Retinal, Esponja Hidrolizada (Espículas), Adenosina, Hialuronato de Sodio, EDTA Disódico, Acetato de Tocoferilo, Pentaeritritilo Tetra-di-t-butil Hidroxihidrocinnamato, Etilhexilglicerina, Extracto de Hoja de Rosmarinus Officinalis (Romero), Pantenol, Madecasósido, Extracto de Centella Asiática",
      types: ["Sérum/Ampolla"],
      skinTypes: ["Piel Madura", "Piel Normal", "Piel Mixta"],
      activeIngredients: ["Retinol/Bakuchiol", "Ácido Hialurónico", "Centella Asiática", "Pantenol (B5)", "Escualano", "Adenosina", "Vitamina C"],
      reviews: []
    },
    {
      active: true,
      brand: "Tony Moly",
      name: "I'm Real Mascarilla Facial",
      image: "tony-moly-i-m-real-mascarilla-facial.png",  // filename only — IMAGE_BASE_URL is prepended automatically
      description: "Qué es: La icónica mascarilla coreana de Tony Moly, empapada en una esencia con ingrediente estrella para tratar distintas necesidades de la piel en solo 20-30 minutos. Disponible en diferentes variedades — elige la que mejor se adapte a tu piel.\n\nVariedades disponibles:\n- 🍋 Limón — Vitamina C, ilumina y unifica el tono\n- 🍵 Té Verde — Antioxidante, calma y purifica\n- 🌾 Arroz — Elasticidad y efecto iluminador\n- 🌿 Árbol de Té — Antiinflamatorio, calma la piel propensa al acné\n- 🍷 Vino Rojo — Reduce la apariencia de poros dilatados\n- 🥑 Aguacate — Nutre y revitaliza piel seca\n- 🌊 Aloe — Hidratación máxima\n- 🎃 Calabaza — Suavidad y elasticidad\n\nBeneficios:\n- Hoja de pulpa triple capa para mayor absorción\n- Sin parabenos, benzofenona, trietanolamina ni talco\n- Resultado visible desde el primer uso\n- Perfecta para uso semanal o tratamiento express",
      ingredients: "Agua, Glicerina, Butilenglicol, PEG/PPG-17/6 Copolímero, Gliceret-26, Pantenol, Alantoína, Carbómero, Fenoxietanol, Trometamina, Extracto de Ingrediente Estrella (Limón/Té Verde/Arroz/Árbol de Té/etc.), 1,2-Hexanodiol, Propanodiol, Extracto de Fruto de Malpighia Emarginata (Acerola), Extracto de Raíz de Glycyrrhiza Glabra (Regaliz), Glicol Caprililo, Hialuronato de Sodio, Fragancia",
      types: ["Mascarilla"],
      skinTypes: ["Piel Seca", "Piel Grasa", "Piel Mixta", "Piel Sensible", "Piel Normal", "Todo Tipo"],
      activeIngredients: ["Ácido Hialurónico", "Pantenol (B5)", "Vitamina C"],
      reviews: []
    },
    {
      active: true,
      brand: "Tony Moly",
      name: "Tako Pore Set — Control de Poros",
      image: "tony-moly-tako-pore-set-control-de-poros.png",  // filename only — IMAGE_BASE_URL is prepended automatically
      description: "Qué es: La línea Tako Pore de Tony Moly es un sistema completo de limpieza y control de poros con un toque divertido. Con ingredientes marinos y minerales como Sal del Mar Muerto, Taurina y Agua de Turba Negra, esta línea limpia, exfolia y minimiza la apariencia de los poros.\n\nProductos de la línea:\n- 🐙 Gel Crema Control Sebum (50ml) — Hidratación ligera con acabado en polvo que controla el brillo durante todo el día. Ideal como base bajo el maquillaje.\n- 🐙 Stick Exfoliante Puntos Negros (10g) — Bálsamo de lodo negro con perlas de celulosa biodegradables que extrae puntos negros y blancos suavemente.\n- 🐙 Pack Burbujeante de Poros (30g) — Mascarilla que transforma en espuma para limpiar profundamente los poros con carbón y arcilla.\n\nIngredientes clave en toda la línea:\n- Taurina: hidrata y firma la piel para efecto tensor de poros\n- Sal del Mar Muerto: minerales naturales para cuidado posterior\n- Agua de Turba Negra: purifica absorbiendo desechos y toxinas\n- Carbón activado y arcilla: extraen impurezas de los poros",
      ingredients: "Agua, Butilenglicol, Ciclopentasiloxano, Glicerina, Polivinilo Dimetilcona/Dimetilcona, Dimetilcona, Sílice, Acrilato de Sodio/Acriloyldimetil Taurato de Sodio Copolímero, 1,2-Hexanodiol, Isohexadecano, Carbómero, Trometamina, Glicol Caprililo, Fenil Trimeticona, Polisorbato 80, Oleato de Sorbitán, Etilhexilglicerina, Fragancia, EDTA Disódico, Agua de Mar, Goma de Acacia Senegal, Clorfenesina, Polvo de Coral, Hidroxipropil Metilcelulosa, Ácido Cítrico, Agua de Turba, Taurina, Fenoxietanol, Fermento de Clorellas Vulgaris/Lupinus Albus Proteína, Extracto de Raíz de Acanthopanax Senticosus, Sorbato de Potasio",
      types: ["Mascarilla", "Limpiador"],
      skinTypes: ["Piel Grasa", "Piel Mixta", "Piel Normal"],
      activeIngredients: ["AHA/BHA"],
      reviews: []
    },
    {
      active: true,
      brand: "Tony Moly",
      name: "Magic Food Crema de Manos Banana",
      image: "tony-moly-magic-food-crema-de-manos-banana.jpg",  // filename only — IMAGE_BASE_URL is prepended automatically
      description: "Qué es: La icónica crema de manos de Tony Moly en su adorable packaging con forma de banana. Una fórmula ligera tipo leche que se absorbe rápidamente y deja las manos suaves, hidratadas y con un delicioso aroma a banana.\n\nBeneficios:\n- 10,000 ppm de Extracto de Banana — Rico en potasio y Vitamina A, ideal para piel seca\n- Manteca de Karité, Aceite de Coco y Aceite de Macadamia — Hidratación intensa y nutrición\n- Proteína de Leche — Repone la humedad perdida y restaura la elasticidad\n- Vitamina E — Protección antioxidante\n- Textura leche de absorción rápida, sin sensación grasosa\n- Sin parabenos, SLES ni silicona",
      ingredients: "Agua, Glicerina, Manteca de Butyrospermum Parkii (Karité), Pentaeritritilo Tetraetilhexanoato, Aceite de Cocos Nucifera (Coco), Butilenglicol, Aceite de Semilla de Macadamia Integrifolia, Alcohol Cetearílico, Extracto de Fruto de Musa Sapientum (Banana), Urea, Pentilenglicol, Diestearato de Polimetilglucosa-3, Glucósido de Cetearilo, Fosfato de Hidroxipropil Almidón, Fragancia, Glicol Caprililo, Trometamina, Etilhexilglicerina, Extracto de Proteína de Leche, 1,2-Hexanodiol, EDTA Disódico, Acetato de Tocoferilo, Fenoxietanol",
      types: ["Crema"],
      skinTypes: ["Piel Seca", "Piel Grasa", "Piel Mixta", "Piel Sensible", "Piel Normal", "Todo Tipo"],
      activeIngredients: ["Ácido Hialurónico", "Adenosina"],
      reviews: []
    },
    {
      active: true,
      brand: "Tony Moly",
      name: "Panda's Dream White Magic Cream",
      image: "tony-moly-panda-s-dream-white-magic-cream.png",  // filename only — IMAGE_BASE_URL is prepended automatically
      description: "Qué es: La crema facial iluminadora más icónica de Tony Moly, con packaging de panda adorable. Formulada con Niacinamida, Extracto de Bambú y Miel de Manuka para unificar el tono, hidratar y dejar un acabado luminoso e inmediato al aplicar.\n\nBeneficios:\n- Niacinamida: unifica el tono, reduce manchas, efecto anti-aging\n- Extracto de bambú y savia de bambú (Bambusoides): calma y refina la piel\n- Miel de Manuka: propiedades antibacterianas y antiinflamatorias, sella la hidratación\n- Textura aérea tipo algodón que se extiende y absorbe fácilmente\n- Acabado luminoso e instantáneo que ilumina el tono natural\n- Apto para uso diario como último paso del cuidado facial",
      ingredients: "Agua, Butilenglicol, Ciclopentasiloxano, Glicerina, Ciclohexasiloxano, Dióxido de Titanio (CI 77891), Alcohol Desnaturalizado, Niacinamida, Cetil PEG/PPG-10/1 Dimetilcona, Cloruro de Sodio, Extracto de Miel, Jugo de Phyllostachys Bambusoides, Polivinilo de Dimetilcona/Dimetilcona, EDTA Disódico, Fenoxietanol, Clorfenesina, Glicol Caprililo, Etilhexilglicerina, Fragancia",
      types: ["Crema"],
      skinTypes: ["Piel Seca", "Piel Mixta", "Piel Normal", "Todo Tipo"],
      activeIngredients: ["Niacinamida", "Ácido Hialurónico", "Adenosina"],
      reviews: []
    }
];

// Working list used by the rest of the catalog — inactive products are
// dropped here, and each image filename becomes a full URL. Everything
// below this line reads from PRODUCTS as before; you shouldn't need to
// touch anything past this point.
const PRODUCTS = RAW_PRODUCTS
  .filter(p => p.active !== false)
  .map(p => p.image ? { ...p, image: IMAGE_BASE_URL + p.image } : p);

const BRAND_INFO = {
  'Dr. Althea': { emoji: '🌿', desc: 'Formulaciones clínicas K-Beauty para piel sensible y propensa al acné.' },
  'AXIS-Y': { emoji: '🌱', desc: 'Skincare de comunidad global: vegano, sin fragrancias artificiales, cruelty-free.' },
  'Herbloom': { emoji: '🌸', desc: 'Protección solar y limpieza con tecnología coreana, ingredientes vegetales.' },
  'SKIN1004': { emoji: '💧', desc: 'El poder de la Centella Asiática: calma, repara y fortalece la piel.' },
  'HaruHaru': { emoji: '🍚', desc: 'Arroz negro fermentado para barrera y probióticos naturales.' },
  'Tony Moly': { emoji: '🐼', desc: 'Mascarillas, cremas y esenciales K-Beauty con packaging icónico y activos botánicos.' },
};
