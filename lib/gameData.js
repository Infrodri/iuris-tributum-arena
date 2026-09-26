export const triviaDatabase = [
  {
    tag: "Retroactividad",
    article: "Art. 150 Ley 2492 / Art. 123 CPE",
    question: "Don Jorge dejó de pagar el IVA en 2020 cuando la sanción por omisión era del 100%. En 2022, la Ley 1448 la redujo al 60%. Si el SIN sanciona hoy a Don Jorge, ¿qué porcentaje debe imponer?",
    options: [
      { text: "El 60%, por aplicación del principio de sanción más benigna (retroactividad favorable).", correct: true, why: "El Art. 150 del Código Tributario y el Art. 123 de la CPE ordenan la retroactividad cuando la norma establece sanciones más benignas o suprime ilícitos." },
      { text: "El 100%, porque la infracción se cometió bajo la vigencia de la norma antigua.", correct: false, why: "En derecho sancionador rige la excepción de favorabilidad; la norma antigua más gravosa queda desplazada por la nueva más benigna." },
      { text: "Un promedio ponderado del 80% entre la norma previa y la posterior.", correct: false, why: "La ley no prevé promedios analógicos; se aplica la norma más favorable en su totalidad." },
      { text: "Queda exento de sanción, pues la reforma deroga automáticamente la infracción.", correct: false, why: "La Ley 1448 no despenalizó ni suprimió la omisión de pago, únicamente redujo la cuantía de la multa del 100% al 60%." }
    ]
  },
  {
    tag: "Retroactividad",
    article: "Art. 150 Ley 2492 (Doctrina)",
    question: "¿Cuál es el alcance doctrinario de la retroactividad favorable según el Título IV del Código Tributario Boliviano?",
    options: [
      { text: "Opera exclusivamente en el ámbito sancionador (multas, prescripción más breve y penas), no para rebajar el tributo mismo ya causado.", correct: true, why: "El Art. 150 está ubicado en el Título IV (Ilícitos Tributarios). La obligación tributaria material nacida no se altera retroactivamente salvo disposición legislativa expresa." },
      { text: "Permite que cualquier nuevo régimen impositivo devuelva impuestos legalmente liquidados.", correct: false, why: "La retroactividad no opera sobre el hecho generador ya acaecido y liquidado." },
      { text: "Aplica de forma general a las tasas y aranceles consulares pero no a los impuestos nacionales.", correct: false, why: "El Código Tributario rige de manera uniforme para todos los tributos." },
      { text: "Solo beneficia al sustituto tributario pero nunca al contribuyente directo.", correct: false, why: "El Art. 150 beneficia explícitamente tanto al sujeto pasivo como al tercero responsable." }
    ]
  },
  {
    tag: "Ilícitos Tributarios",
    article: "Art. 148 Ley 2492",
    question: "¿Cómo clasifica formalmente el Código Tributario Boliviano a los ilícitos tributarios en su Artículo 148?",
    options: [
      { text: "En Contravenciones (vía administrativa) y Delitos (vía penal ordinaria).", correct: true, why: "El Art. 148.I establece: 'Los ilícitos tributarios se clasifican en contravenciones y delitos'." },
      { text: "En Faltas leves, faltas graves y delitos mayores.", correct: false, why: "Esa terminología no corresponde al Art. 148." },
      { text: "En Defraudaciones formales, cuasidelitos e infracciones de tránsito aduanero.", correct: false, why: "La tipificación bipartita formal es contravenciones y delitos." },
      { text: "En Infracciones civiles reparables y delitos de lesa economía.", correct: false, why: "No existe tal categoría dual en el Art. 148." }
    ]
  },
  {
    tag: "Ilícitos Tributarios",
    article: "Art. 149 Ley 2492",
    question: "Una tienda comercial en Sucre vende una prenda y no entrega factura. ¿Quién es competente para sancionarla y qué procedimiento se aplica?",
    options: [
      { text: "El propio Servicio de Impuestos Nacionales (SIN) mediante procedimiento administrativo sancionador (clausura temporal).", correct: true, why: "La no emisión de factura es una contravención (Art. 160); según el Art. 149.I, el procedimiento se rige en sede administrativa." },
      { text: "Un Juez de Sentencia Penal con intervención previa obligatoria de la FELCC.", correct: false, why: "La justicia penal solo interviene en delitos tributarios con dolo (Art. 149.II)." },
      { text: "El Viceministerio de Política Tributaria mediante memorial de alzada sumaria.", correct: false, why: "La función sancionadora radica en el SIN, Aduana o Municipios." },
      { text: "La Policía Boliviana de forma inmediata con decomiso total de mercadería.", correct: false, why: "La Policía no tiene competencia determinativa ni sancionadora tributaria." }
    ]
  },
  {
    tag: "Contrabando & TCP",
    article: "SCP 1663/2013 / Art. 148.III",
    question: "¿Por qué el Tribunal Constitucional Plurinacional declaró inconstitucional el parágrafo III del Art. 148 que prohibía medidas sustitutivas en contrabando?",
    options: [
      { text: "Porque obligaba al juez a elegir solo entre detención preventiva o libertad pura, violando la presunción de inocencia y la excepcionalidad cautelar.", correct: true, why: "La SCP 1663/2013 expulsó dicha restricción al vulnerar el debido proceso y la facultad judicial de valorar medidas cautelares menos lesivas." },
      { text: "Porque despenalizó el contrabando convirtiéndolo en simple falta administrativa.", correct: false, why: "El contrabando que supera el límite legal sigue siendo delito penal con privación de libertad." },
      { text: "Porque la Aduana Nacional asumió facultades exclusivas de juzgamiento penal militar.", correct: false, why: "No existe competencia militar ni privativa en juzgamiento aduanero." },
      { text: "Porque el Estado firmó un tratado de amnistía arancelaria absoluta.", correct: false, why: "No existe tratado de amnistía que derogue los tipos penales aduaneros." }
    ]
  },
  {
    tag: "La Consulta",
    article: "Art. 115 CTB y Art. 14 DS 27310",
    question: "¿Cuál de los siguientes supuestos invalida la procedencia de una Consulta Tributaria formulada por un contribuyente?",
    options: [
      { text: "Plantear una hipótesis teórica o futurista sin existencia de un hecho u operación real y concreta.", correct: true, why: "El Art. 115 y el Art. 14 del DS 27310 exigen un 'interés personal y directo' sobre una situación real, concreta y controvertible." },
      { text: "Que el consultante actúe a través de un apoderado con poder notariado suficiente.", correct: false, why: "La representación legal acreditada es un requisito expreso de procedencia." },
      { text: "Que la consulta señale la norma legal tributaria cuya interpretación genera controversia.", correct: false, why: "Identificar la norma confusa es una obligación formal del consultante." },
      { text: "Que se presente ante la Máxima Autoridad Ejecutiva (MAE) de la Administración Tributaria.", correct: false, why: "Esa es exactamente la autoridad competente ante la cual se debe radicar la consulta." }
    ]
  },
  {
    tag: "La Consulta",
    article: "Art. 116.II Ley 2492",
    question: "Mientras el SIN evalúa y responde una consulta tributaria formal, ¿cuál es el estado de las obligaciones y vencimientos del consultante?",
    options: [
      { text: "Los plazos no se suspenden ni se justifica el incumplimiento de deberes fiscales.", correct: true, why: "El Art. 116.II es terminante: la presentación de la Consulta no suspende plazos ni justifica el incumplimiento." },
      { text: "Se suspenden automáticamente todas las fiscalizaciones y pagos hasta que se emita la resolución.", correct: false, why: "La consulta no paraliza el calendario tributario general." },
      { text: "El contribuyente queda exento del pago de intereses moratorios durante el trámite.", correct: false, why: "La ley no concede exenciones ni paralización accesoria por la sola consulta." },
      { text: "Se interrumpe de pleno derecho la prescripción a favor del contribuyente.", correct: false, why: "No surte efecto interruptivo genérico a favor del administrado." }
    ]
  },
  {
    tag: "La Consulta",
    article: "Art. 117 y 118 Ley 2492",
    question: "Si la Cámara Nacional de Comercio formula una consulta general sobre un tema tributario para sus miembros, ¿qué valor tiene la respuesta del Fisco?",
    options: [
      { text: "Criterio meramente orientador o informativo, sin ningún efecto vinculante para el Fisco.", correct: true, why: "El Art. 118 establece que las respuestas a consultas de gremios no son vinculantes, pues no juzgan un caso individual concreto." },
      { text: "Efecto de ley obligatoria erga omnes para todas las empresas de Bolivia.", correct: false, why: "La absolución de consultas no crea leyes generales ni decretos reglamentarios." },
      { text: "Efecto vinculante irrevocable que impide fiscalizaciones futuras a cualquier afiliado.", correct: false, why: "Solo la consulta individual sobre un caso real genera vinculación (Art. 117)." },
      { text: "Nulidad absoluta de pleno derecho por estar prohibidas las consultas institucionales.", correct: false, why: "Las consultas institucionales sí están permitidas, pero con rango no vinculante." }
    ]
  },
  {
    tag: "Acción de Repetición",
    article: "Art. 124 Ley 2492",
    question: "¿Cuál es el plazo perentorio de prescripción que tiene el sujeto pasivo para interponer la Acción de Repetición?",
    options: [
      { text: "Tres (3) años, computables desde el momento en que se realizó el pago indebido o en exceso.", correct: true, why: "El Art. 124.I y II fija taxativamente 3 años desde el pago para solicitar la restitución." },
      { text: "Ocho (8) años, coincidiendo con el término de fiscalización de la Administración.", correct: false, why: "El término de repetición tiene plazo autónomo propio de 3 años." },
      { text: "Cinco (5) años conforme a la regla del Código Civil sobre enriquecimiento sin causa.", correct: false, why: "El Código Tributario prima como norma especial sobre el Código Civil." },
      { text: "No prescribe jamás por tratarse de dinero privado retenido indebidamente por el Estado.", correct: false, why: "Por seguridad jurídica, la acción prescribe a los 3 años." }
    ]
  },
  {
    tag: "Acción de Repetición",
    article: "Arts. 122.III y 16 DS 27310",
    question: "Doña Martha pagó por desconocimiento una deuda impositiva de hace 12 años que ya estaba prescrita. ¿Puede iniciar repetición para recuperar su dinero?",
    options: [
      { text: "No. Lo pagado para satisfacer una obligación prescrita no puede repetirse, aunque se ignorase la prescripción.", correct: true, why: "El Art. 122.III prohíbe taxativamente la repetición de deudas prescritas; el pago se reconoce como cumplimiento válido de una obligación natural." },
      { text: "Sí, porque el enriquecimiento sin causa del Fisco prima sobre cualquier disposición temporal.", correct: false, why: "La prescripción extingue la facultad de cobro coactivo, pero el pago voluntario subsiste y no se devuelve." },
      { text: "Sí, pero únicamente mediante bono del Tesoro General de la Nación.", correct: false, why: "No procede la devolución en ninguna modalidad de pago." },
      { text: "Puede repetirlo únicamente si denuncia por dolo al funcionario receptor de la ventanilla.", correct: false, why: "El funcionario actúa legítimamente al recibir la satisfacción del tributo." }
    ]
  }
];

export const legalCases = [
  {
    title: "Caso Ferretería 'El Rayo' (Cochabamba)",
    badge: "Acción de Repetición & Compensación",
    facts: "En marzo de 2025, Doña María pagó por error bancario duplicado su IVA de febrero: Bs 10.000 dos veces (debiendo solo 10.000). En agosto de 2025 presenta Acción de Repetición. El SIN detecta que Doña María adeuda Bs 2.000 por una sanción contravencional firme e impaga.",
    dilemma: "¿Cuál es el dictamen legal y la liquidación que debe emitir la Administración Tributaria?",
    options: [
      { label: "Compensar de oficio los Bs 2.000 exigibles y emitir Resolución en 45 días autorizando Nota de Crédito Fiscal por el saldo (Bs 8.000) actualizado en UFV.", correct: true, dictamen: "El Art. 122.I ordena la compensación de oficio. El Art. 122.II manda actualizar según UFV y el Art. 16 del DS 27310 ordena resolver en máx. 45 días." },
      { label: "Rechazar in límine la repetición ordenando extinguir primero la deuda en efectivo.", correct: false, dictamen: "La compensación de oficio es un mandato legal, no una causal de rechazo." },
      { label: "Entregar los Bs 10.000 en efectivo por ventanilla en un plazo de 10 días.", correct: false, dictamen: "La restitución se hace mediante valores fiscales (Notas de Crédito Fiscal), plazo máximo 45 días." }
    ]
  },
  {
    title: "Caso 'Constructora Illimani SRL' y el Anticipo",
    badge: "Procedencia y Efecto de la Consulta",
    facts: "La empresa recibe un anticipo financiero antes de iniciar obras y presenta consulta escrita ante el SIN sobre cuándo facturar el IVA, cumpliendo los requisitos del DS 27310.",
    dilemma: "Mientras el SIN tarda 28 días en responder, llega el fin de mes. ¿Qué debe hacer la empresa y qué efecto tendrá la respuesta?",
    options: [
      { label: "Debe declarar y pagar oportunamente sin suspender plazos (Art. 116.II); la respuesta vinculará al SIN para este caso concreto (Art. 117).", correct: true, dictamen: "El Art. 116.II señala que la consulta no suspende vencimientos; la respuesta vincula al SIN mientras no cambien los hechos consultados." },
      { label: "Puede congelar la presentación de formularios sin multas hasta la notificación.", correct: false, dictamen: "La consulta jamás tiene efectos suspensivos sobre el calendario impositivo." },
      { label: "Si disiente de la respuesta, puede interponer inmediatamente Recurso de Alzada contra la consulta absuelta.", correct: false, dictamen: "El Art. 119 dispone la improcedencia de recursos contra la respuesta a la consulta." }
    ]
  },
  {
    title: "Caso Fraude con Facturas Clones de 15.000 UFV",
    badge: "Defraudación vs. Omisión",
    facts: "Una empresa registra intencionalmente facturas falsas de proveedores inexistentes para incrementar fraudulentamente su Crédito Fiscal IVA, dejando de pagar 15.000 UFV en una gestión fiscal.",
    dilemma: "¿Qué calificación jurídica corresponde y qué vía procedimental debe activarse?",
    options: [
      { label: "Delito tributario de Defraudación Tributaria (Art. 177 CTB), investigado por el Ministerio Público y juzgado en vía penal.", correct: true, dictamen: "Al existir dolo y superar la cuantía de 10.000 UFV, se tipifica como delito penal de defraudación (Art. 177 y 149.II)." },
      { label: "Simple contravención de Incumplimiento de Deberes Formales sancionada con 100 UFV.", correct: false, dictamen: "Hay dolo manifiesto y cuantía penal superior al umbral legal." },
      { label: "Infracción contravencional aduanera sujeta a comiso directo de libros contables.", correct: false, dictamen: "Se trata de un impuesto interno (IVA), no de tributos al comercio exterior." }
    ]
  },
  {
    title: "Caso Sanción Tributaria Benigna de Don Jorge",
    badge: "Principio de Favorabilidad",
    facts: "Un comerciante incurrió en omisión de pago del IT en 2021 con sanción del 100%. En julio de 2022 la Ley 1448 fijó la multa en 60%. El SIN notifica la Resolución Sancionatoria en 2024.",
    dilemma: "El funcionario liquida la multa al 100% alegando 'tempus regit actum'. ¿Es legal?",
    options: [
      { label: "Es ilegal: el Art. 150 del CTB y el Art. 123 de la CPE obligan a liquidar al 60% por ser sanción sobreviniente más benigna.", correct: true, dictamen: "La garantía de favorabilidad desplaza al principio de irretroactividad cuando la nueva ley establece sanciones más benignas." },
      { label: "Es plenamente legal: las leyes tributarias jamás pueden aplicarse retroactivamente.", correct: false, dictamen: "El Art. 150 consagra excepciones explícitas a la irretroactividad en favor del contribuyente." },
      { label: "Corresponde declarar la prescripción extintiva automática del tributo.", correct: false, dictamen: "La modificación de la multa no extingue la acción fiscal de cobro de la deuda principal." }
    ]
  }
];

export const classifierItems = [
  { behavior: "No emisión de factura o nota fiscal en una venta minorista de Bs 150.", type: "contravencion", article: "Art. 160 num. 2 y Art. 164 CTB", sanction: "Clausura del establecimiento de 6 a 48 días en reincidencia." },
  { behavior: "Defraudación tributaria dolosa superior a 10.000 UFV mediante simulación contable.", type: "delito", article: "Art. 177 Ley 2492", sanction: "Privación de libertad de 3 a 6 años más multas penales." },
  { behavior: "Omisión de pago culposa del IVA al no declarar en el formulario correspondiente.", type: "contravencion", article: "Art. 165 Ley 2492", sanction: "Multa administrativa del 60% del tributo omitido actualizado." },
  { behavior: "Contrabando de mercadería extranjera por paso no habilitado que supera 200.000 UFV.", type: "delito", article: "Art. 181 Ley 2492", sanction: "Privación de libertad de 8 a 12 años y comiso definitivo." },
  { behavior: "No inscribirse en el Registro de Contribuyentes (NIT) estando obligado a hacerlo.", type: "contravencion", article: "Art. 160 num. 1 y Art. 163 CTB", sanction: "Clausura inmediata hasta que regularice su inscripción." },
  { behavior: "Instigación pública a no pagar tributos legalmente establecidos.", type: "delito", article: "Art. 179 Ley 2492", sanction: "Privación de libertad de 1 a 3 años y multa de 5.000 a 10.000 UFV." },
  { behavior: "Incumplimiento de deberes formales (no llevar libros contables en formato oficial).", type: "contravencion", article: "Art. 160 num. 5 y Art. 162 CTB", sanction: "Multa graduada entre 50 UFV y 5.000 UFV." },
  { behavior: "Defraudación aduanera con falsificación material de pólizas de importación.", type: "delito", article: "Art. 178 Ley 2492", sanction: "Privación de libertad de 5 a 10 años y pago del 100% de la deuda aduanera." }
];

export const flashcardsData = [
  { category: "Retroactividad", question: "¿En qué casos exactos la ley tributaria boliviana sí se aplica hacia el pasado?", answer: "Aplica retroactivamente si: 1) Suprime ilícitos, 2) Establece sanciones más benignas, 3) Acorta plazos de prescripción, o 4) Beneficia de cualquier forma al sujeto pasivo o tercero responsable.", article: "Art. 150 CTB y Art. 123 CPE" },
  { category: "Ilícitos", question: "¿Cuáles son los 4 elementos que configuran un ilícito tributario?", answer: "1) Conducta humana, 2) Violación de norma material o formal, 3) Tipicidad estricta y 4) Sanción previa establecida en ley formal.", article: "Art. 148 Ley 2492" },
  { category: "La Consulta", question: "¿Qué efecto jurídico genera la respuesta de una consulta tributaria para el Fisco?", answer: "Efecto vinculante unilateral: obliga a la Administración solo sobre ese caso concreto y mientras no se alteren los hechos.", article: "Art. 117 Ley 2492" },
  { category: "La Consulta", question: "¿Por qué causales es nula de pleno derecho una respuesta de Consulta?", answer: "1) Absuelta con datos falsos, 2) Por manifiesta infracción de la Ley, o 3) Dictada por autoridad incompetente.", article: "Art. 120 Ley 2492" },
  { category: "Acción de Repetición", question: "¿Cuál es el fundamento de la repetición y en qué plazo prescribe?", answer: "Se fundamenta en la prohibición de enriquecimiento sin causa del Estado. Prescribe a los 3 años desde el pago indebido.", article: "Arts. 121 y 124 Ley 2492" },
  { category: "Acción de Repetición", question: "¿Cómo se reintegra el pago si el contribuyente tiene deudas pendientes?", answer: "El Fisco compensa de oficio y por el saldo emite Nota de Crédito Fiscal en máx. 45 días actualizada con UFV.", article: "Art. 122 CTB / Art. 16 DS 27310" },
  { category: "Contrabando Flagrante", question: "¿Qué procedimiento especial se aplica en delitos aduaneros flagrantes?", answer: "El Procedimiento Inmediato para Delitos Flagrantes de la Ley 007, acelerando plazos de imputación y juicio.", article: "Art. 149.III Ley 2492" },
  { category: "Pagos de Deudas Prescritas", question: "¿Por qué no se puede repetir lo pagado por una obligación ya prescrita?", answer: "La prescripción extingue la acción coactiva de cobro pero subsiste la obligación natural. El pago recibido es legítimo.", article: "Art. 122.III Ley 2492" }
];

export const GAME_MODES = [
  { id: "trivia", label: "Trivia Master", icon: "ph-target", points: "100 pts + bono rapidez" },
  { id: "casos", label: "Casos Prácticos", icon: "ph-briefcase", points: "150 pts / caso" },
  { id: "clasificador", label: "Contravención vs Delito", icon: "ph-shuffle", points: "75 pts / acierto" },
  { id: "flashcards", label: "Flashcards 3D", icon: "ph-cards", points: "10 pts / tarjeta" }
];

export const courseCredits = {
  course: "Curso 5-5 · Carrera de Derecho",
  columns: [
    ["Rony Quenta", "Flora Valeriano", "Carlos Eduardo", "Sirley Montoya", "Freddy Toro"],
    ["Mario Saavedra", "Deysi Araca", "Laura Cárdenas", "José Rodrigo"],
    ["Jhaneth Calizaya", "Nahuel Chávez", "Araceli Gutiérrez", "Ruth Medina", "Juan Gabriel Meneses"],
    ["José Luis Nina", "Dennis Arancibia", "Herland Bravo", "Ricardo Gambarte"]
  ]
};
