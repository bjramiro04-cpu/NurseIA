/**
 * nurseIA — src/data/nanda.js
 * Base de datos NANDA completa — 52 diagnósticos
 *
 * Palabras clave expandidas con jerga argentina de enfermería:
 * abreviaturas clínicas (TA, FC, Sat, GCS, EVA), términos coloquiales
 * del piso, formas sin acento y variaciones de escritura rápida.
 *
 * Actualizado: 2026
 */

(function (root, factory) {
  const api = factory();
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  }
  root.NANDA = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  return [

  // ══════════════════════════════════════════════════════════════
  //  DOMINIO A-B — VÍA AÉREA / VENTILACIÓN
  // ══════════════════════════════════════════════════════════════

  {
    diagnostico: "Patrón respiratorio ineficaz",
    codigo: "00032",
    dominio: "Dominio 4: Actividad/Reposo",
    prioridad: "Alta",
    abcde: "A-B",
    palabras_clave: [
      "disnea","taquipnea","bradipnea","apnea","respiracion superficial",
      "uso de musculos accesorios","musculos accesorios","tiraje intercostal",
      "tiraje subcostal","aleteo nasal","respiracion paradojica",
      "patron respiratorio alterado","frecuencia respiratoria elevada",
      "FR alta","FR elevada","FR 24","FR 26","FR 28","FR 30","FR mayor a 20",
      "sat baja","sat 90","sat 88","sat 85","sat menor a 92",
      "Sat 88%","Sat 90%","Sat caida",
      "falta de aire","le falta el aire","no puede respirar","ahogo",
      "ahogado","se ahoga","cuesta respirar","le cuesta respirar",
      "respira rapido","respira con dificultad","agitado","muy agitado",
      "no agarra bien el aire","se pone morado","labios morados",
      "punta de los dedos morada","cianosis","cianosis distal","cianosis peribucal",
      "tos ineficaz","tos que no saca nada","tos seca","no puede toser",
      "trabajando para respirar","trabajo respiratorio aumentado"
    ],
    rc: "Obstrucción de vías aéreas, fatiga muscular, ansiedad, secreciones",
    mp: "Disnea, taquipnea, uso de músculos accesorios, cianosis, respiración superficial, saturación baja, tos ineficaz",
    evolucion_es: "Paciente presenta alteración del patrón respiratorio evidenciado por disnea y taquipnea. Se observa uso de musculatura accesoria y respiración superficial, acompañado de descenso en la saturación de oxígeno y cianosis distal. Se procede a monitorización continua y optimización de la oxigenoterapia.",
    evolucion_en: "Patient presents altered respiratory pattern evidenced by dyspnea and tachypnea. Accessory muscle use and shallow breathing observed, with decreased oxygen saturation and distal cyanosis. Continuous monitoring and oxygen therapy optimization initiated."
  },

  {
    diagnostico: "Limpieza ineficaz de las vías aéreas",
    codigo: "00031",
    dominio: "Dominio 3: Eliminación/Intercambio",
    prioridad: "Alta",
    abcde: "A-B",
    palabras_clave: [
      "secreciones","secreciones abundantes","secreciones espesas","flemas",
      "moco","mucho moco","catarro","broncoespasmo",
      "tos ineficaz","tos que no limpia","no puede sacar el moco",
      "ruidos respiratorios","roncus","estertores","sibilancias","crepitantes",
      "rales","ruidos adventicios","se escuchan ruidos","ausculta mal",
      "aspiracion de secreciones","necesita aspirar","hay que aspirarlo",
      "nebulizacion","kinesio","kinesioterapia respiratoria",
      "expectoracion dificil","no expectora","flema pegada"
    ],
    rc: "Acumulación de moco, debilidad muscular, tabaquismo, infección",
    mp: "Secreciones traqueobronquiales abundantes, tos ineficaz, ruidos adventicios",
    evolucion_es: "Paciente presenta compromiso en la permeabilidad de la vía aérea. Se auscultan ruidos respiratorios patológicos por secreciones retenidas y reflejo de tos ineficaz. Se realizan hidratación y aspiración de secreciones según necesidad.",
    evolucion_en: "Patient presents airway patency compromise. Pathological breath sounds due to retained secretions and ineffective cough. Hydration and suctioning performed as needed."
  },

  {
    diagnostico: "Intercambio gaseoso deteriorado",
    codigo: "00030",
    dominio: "Dominio 3: Eliminación/Intercambio",
    prioridad: "Alta",
    abcde: "A-B",
    palabras_clave: [
      "hipoxia","hipoxemia","hipercapnia","cianosis central","cianosis peribucal",
      "saturacion critica","sat critica","sat menor a 88","sat 85","sat 80",
      "Sat 88%","Sat menor 90","gases en sangre alterados","gasometria alterada",
      "GSA alterada","pCO2 elevada","pO2 baja","acidosis respiratoria",
      "somnolencia por hipercapnia","embotado","adormecido","no reacciona bien",
      "con O2 no mejora","no responde al oxigeno","requiere ARM",
      "riesgo de intubacion","necesita respirador","ATI urgente","UCI urgente"
    ],
    rc: "Alteración de la ventilación/perfusión, cambios en membrana alveolocapilar",
    mp: "Hipoxia, cianosis mucocutánea, saturación críticamente baja, somnolencia por hipercapnia",
    evolucion_es: "Se evidencia deterioro crítico del intercambio gaseoso. Paciente cursa con hipoxia severa y saturación persistentemente baja a pesar de oxigenoterapia, con cianosis peribucal. Se requiere intervención médica urgente.",
    evolucion_en: "Critical gas exchange impairment evident. Patient presents severe hypoxia with persistent low saturation despite oxygen therapy and perioral cyanosis. Urgent medical intervention required."
  },

  {
    diagnostico: "Riesgo de aspiración",
    codigo: "00039",
    dominio: "Dominio 11: Seguridad/Protección",
    prioridad: "Alta",
    abcde: "A-B",
    palabras_clave: [
      "disfagia","no puede tragar","dificultad para tragar","se atraganta",
      "se atora","tos al comer","tos con la ingesta","tose cuando come",
      "reflejo de deglucion deprimido","deglucion alterada","no deglute bien",
      "nivel de conciencia disminuido","GCS bajo","GCS 10","GCS 9","GCS 8",
      "somnoliento al comer","vomitos profusos","nauseas con vomitos",
      "sonda nasogastrica","SNG","alimentacion enteral","gavage",
      "cabecera baja","posicion incorrecta","no tolera la VO","VO suspendida",
      "broncoaspiracion","aspiracion pulmonar","aspirar","aspirado"
    ],
    rc: "Alteración de la deglución, disminución del nivel de conciencia, alimentación enteral",
    mp: "Tos o arcadas durante la ingesta, reflejo de deglución deprimido",
    evolucion_es: "Se valora alto riesgo de aspiración por episodios de disfagia y tos refleja durante la alimentación oral. Se eleva la cabecera a 45° (Fowler) durante las comidas y se adaptan texturas.",
    evolucion_en: "High aspiration risk assessed due to dysphagia and reflex cough during oral feeding. Head elevated to 45° during meals and texture modification implemented."
  },

  {
    diagnostico: "Deterioro de la deglución",
    codigo: "00103",
    dominio: "Dominio 2: Nutrición",
    prioridad: "Alta",
    abcde: "A-B",
    palabras_clave: [
      "no puede tragar","disfagia","se atraganta","se atora con los liquidos",
      "se atora con solidos","tos al tragar","regurgitacion","le sube la comida",
      "se le va por el lado malo","voz mojada","voz gatillante post deglucion",
      "residuo en faringe","deglución en varias fases","traga varias veces",
      "test de deglucion fallido","test del agua fallido",
      "dieta modificada en textura","nectar","pure","semisólido",
      "post ACV con disfagia","post intubacion con disfagia",
      "fonoaudiologia","evaluacion fonoaudiológica","video deglucion"
    ],
    rc: "ACV, esclerosis lateral amiotrófica, Parkinson, traumatismo",
    mp: "Tos o regurgitación durante la deglución, voz gatillante, residuo faríngeo",
    evolucion_es: "Paciente presenta deterioro de la deglución con tos frecuente al tragar y voz gatillante. Se suspende VO, se coordina evaluación fonoaudiológica y se inicia nutrición alternativa.",
    evolucion_en: "Patient presents swallowing impairment with frequent coughing and wet voice. Oral intake suspended, speech therapy evaluation coordinated and alternative nutrition initiated."
  },

  {
    diagnostico: "Deterioro de la ventilación espontánea",
    codigo: "00033",
    dominio: "Dominio 4: Actividad/Reposo",
    prioridad: "Alta",
    abcde: "A-B",
    palabras_clave: [
      "no puede sostener la respiracion","no puede mantener la respiracion espontanea",
      "fatiga respiratoria","musculos respiratorios cansados","apnea",
      "apneas frecuentes","pausa respiratoria","deja de respirar",
      "requiere ventilacion mecanica","necesita respirador","necesita ARM",
      "weaning dificultoso","destete dificil","no se puede desconectar del respirador",
      "fracaso del destete","extubacion fallida","reintubacion",
      "FR que cae","FR menor a 10","bradipnea severa",
      "sat que cae rapidamente","desaturacion rapida",
      "esfuerzo respiratorio excesivo","paradoja abdominal"
    ],
    rc: "Fatiga de músculos respiratorios, enfermedad pulmonar grave, sepsis",
    mp: "Incapacidad de mantener ventilación adecuada, apneas, fatiga respiratoria progresiva",
    evolucion_es: "Paciente presenta deterioro de la ventilación espontánea con fatiga de músculos respiratorios y apneas. Se prepara para asistencia ventilatoria y se notifica urgente al médico.",
    evolucion_en: "Patient presents spontaneous ventilation impairment with respiratory muscle fatigue and apneas. Prepared for ventilatory assistance and urgent medical notification made."
  },

  // ══════════════════════════════════════════════════════════════
  //  DOMINIO C — CIRCULACIÓN / HEMODINÁMICA
  // ══════════════════════════════════════════════════════════════

  {
    diagnostico: "Hipertensión (Perfusión)",
    codigo: "00078",
    dominio: "Dominio 1: Promoción de la salud",
    prioridad: "Alta",
    abcde: "C",
    palabras_clave: [
      "TA alta","TA elevada","TA 160/100","TA 180/100","TA 180/110",
      "TA 200/100","TA 190/110","tension alta","presion alta","presion elevada",
      "hipertenso","hipertensa","hiper","se disparo la presion",
      "PAM elevada","PAD alta","PAS alta",
      "cefalea","dolor de cabeza","jaqueca","cabeza que explota",
      "vision borrosa","ve mal","ve doble","fosfenos","ve destellos",
      "palpitaciones","corazon acelerado","zumbido en oidos","tinnitus",
      "nauseas con cefalea","congestion facial","cara roja","rubicundo",
      "riesgo cardiovascular","ACV","accidente cerebrovascular","riesgo de stroke",
      "HTA","hipertension arterial","emergencia hipertensiva","urgencia hipertensiva",
      "crisis hipertensiva","presion que no baja","no cede la presion"
    ],
    rc: "Estrés, dieta alta en sodio, sedentarismo, suspensión de medicación",
    mp: "TA por encima de rangos normales, cefalea, visión borrosa, palpitaciones",
    evolucion_es: "Se registran cifras tensionales elevadas. Paciente refiere cefalea pulsátil y visión borrosa. Se mantiene en reposo, se restringen estímulos y se administra antihipertensivo según indicación.",
    evolucion_en: "Elevated blood pressure recorded. Patient reports pulsatile headache and blurred vision. Rest maintained, stimuli restricted, antihypertensive administered per medical order."
  },

  {
    diagnostico: "Hipotensión (Perfusión tisular ineficaz)",
    codigo: "00201",
    dominio: "Dominio 4: Actividad/Reposo",
    prioridad: "Alta",
    abcde: "C",
    palabras_clave: [
      "TA baja","TA 80/50","TA 70/40","TA 90/60","tension baja","presion baja",
      "hipotenso","hipotensa","se fue la presion","se cayo la presion",
      "no tiene presion","PA indetectable","PAM baja","PAM menor a 65",
      "mareo","mareado","se marea","se desmaya","lipotimia","sincope","desmayo",
      "debilidad extrema","sin fuerzas","no puede levantarse","palido","muy palido",
      "palidez mucocutanea","frialdad","manos frias","pies frios","piel fria",
      "taquicardia compensatoria","FC alta con TA baja","pulso filiforme",
      "pulso debil","pulso no se toma","shock","pre-shock","shock hipovolemico",
      "perdida de sangre","hemorragia","sangrado","deshidratado","muy deshidratado",
      "Trendelenburg","posicion de Trendelenburg","plan de hidratacion","hidratacion IV"
    ],
    rc: "Hemorragia, deshidratación, shock, efectos farmacológicos",
    mp: "TA por debajo de rangos normales, mareo, palidez, taquicardia compensatoria, debilidad",
    evolucion_es: "Paciente hipotenso con registros de TA marcadamente bajos. Presenta palidez mucocutánea, mareos y debilidad extrema. Se coloca en Trendelenburg e inicia reposición de volumen.",
    evolucion_en: "Patient hypotensive with markedly low BP readings. Mucocutaneous pallor, dizziness and extreme weakness present. Trendelenburg position and volume replacement initiated."
  },

  {
    diagnostico: "Hipotermia",
    codigo: "00006",
    dominio: "Dominio 11: Seguridad/Protección",
    prioridad: "Alta",
    abcde: "C",
    palabras_clave: [
      "temperatura baja","T baja","T 35","T 34","Tª 35","hipotermia",
      "temp menor a 36","termometro bajo","frio","mucho frio","tiene frio",
      "tirita","escalofrios","escalofrio","temblores de frio","tiene escalofrios",
      "piel fria","extremidades frias","frialdad en piel","piel marmolada",
      "palidez con frio","bradicardia con frio","FC baja con frio",
      "somnoliento por frio","confuso con hipotermia","manta termica",
      "recalentamiento","colcha electrica","post quirurgico con frio",
      "post cirugia frio","sala fria","exposicion al frio"
    ],
    rc: "Exposición al frío, shock, cirugía, metabolismo alterado",
    mp: "Temperatura < 36°C, escalofríos, piel fría y marmolada, palidez, somnolencia, bradicardia",
    evolucion_es: "Se constata hipotermia clínica por control termométrico. Paciente presenta piel fría, palidez, escalofríos y somnolencia. Se aplican medidas de recalentamiento pasivo y activo.",
    evolucion_en: "Clinical hypothermia confirmed by thermometry. Patient presents cold skin, pallor, chills and drowsiness. Passive and active rewarming measures applied."
  },

  {
    diagnostico: "Hipertermia",
    codigo: "00007",
    dominio: "Dominio 11: Seguridad/Protección",
    prioridad: "Alta",
    abcde: "C",
    palabras_clave: [
      "fiebre alta","temperatura muy alta","T 39","T 40","T 41","Tª 40",
      "hipertermia","hipertérmico","pico de fiebre alto","golpe de calor",
      "hipertermia maligna","no le baja la fiebre","fiebre que no cede",
      "febricula","temperatura subfebril","T 37.5","T 38",
      "rubicundo","enrojecido","piel caliente","turgente","transpirado",
      "sudoracion profusa","empapado en sudor","sabanas mojadas de sudor",
      "convulsion febril","convulsiono con fiebre","FC alta por fiebre",
      "taquicardia por fiebre","antitermico","ibuprofeno","paracetamol para fiebre",
      "metamizol","dipirona","compresas frias","baño de esponja"
    ],
    rc: "Infección, golpe de calor, medicamentos, hipertiroidismo",
    mp: "Temperatura > 38°C, piel caliente y enrojecida, taquicardia, diaforesis",
    evolucion_es: "Se constata hipertermia. Paciente febril, taquicárdico y diaforético. Se administra antipirético, medidas físicas de enfriamiento y se monitoriza respuesta.",
    evolucion_en: "Hyperthermia confirmed. Patient febrile, tachycardic and diaphoretic. Antipyretic administered, physical cooling measures applied and response monitored."
  },

  {
    diagnostico: "Perfusión tisular periférica ineficaz",
    codigo: "00204",
    dominio: "Dominio 4: Actividad/Reposo",
    prioridad: "Alta",
    abcde: "C",
    palabras_clave: [
      "piel fria en pies","pies frios","manos frias","extremidades frias",
      "frialdad distal","llenado capilar lento","llenado capilar mayor a 3 segundos",
      "relleno capilar lento","uñas frias","lechos ungueales palidos",
      "pulsos debiles","pulsos pedios debiles","pulso pedio no se palpa",
      "pulso tibial posterior ausente","pulso filiforme","sin pulso distal",
      "mala circulacion","mala perfusion","mala irrigacion","pierna marmolada",
      "pie diabetico","claudicacion","calambres en piernas","hormigueo en pies",
      "adormecimiento de extremidades","parestesias","piel brillante en piernas",
      "varices","edema con fovea","edema en MMII"
    ],
    rc: "Enfermedad vascular periférica, diabetes, hipotensión, tabaquismo",
    mp: "Extremidades con piel fría, pulsos periféricos débiles, llenado capilar > 3 segundos",
    evolucion_es: "A la exploración de miembros inferiores se constata perfusión tisular periférica ineficaz con llenado capilar enlentecido y pulsos pedios disminuidos. Se mantiene abrigo y protección de extremidades.",
    evolucion_en: "Ineffective peripheral tissue perfusion noted: slow capillary refill, decreased pedal pulses. Warmth and limb protection maintained."
  },

  {
    diagnostico: "Retención urinaria",
    codigo: "00023",
    dominio: "Dominio 3: Eliminación/Intercambio",
    prioridad: "Alta",
    abcde: "C",
    palabras_clave: [
      "globo vesical","globo","tiene globo","vejiga distendida","vejiga llena",
      "no puede orinar","no orina","sin diuresis","anuria","no hace pis",
      "no pepa","no va al baño","no meo","retencion urinaria",
      "dolor suprapubico","molestia pubica","presion en la vejiga",
      "tenesmo vesical","quiere orinar y no puede","sondaje","sonda vesical",
      "SV","SVA","sonda foley","cateterismo","cateter vesical",
      "post operatorio sin diuresis","post cirugia no orina",
      "diuresis 0","balance negativo","balance hidrico negativo"
    ],
    rc: "Obstrucción de la salida, efectos farmacológicos, postoperatorio",
    mp: "Globo vesical palpable, dolor suprapúbico, incapacidad para emitir orina",
    evolucion_es: "Paciente presenta retención urinaria aguda con distensión suprapúbica dolorosa. Se procede al sondaje vesical evacuador según indicación médica.",
    evolucion_en: "Patient presents acute urinary retention with painful suprapubic distension. Evacuating urinary catheterization performed per medical order."
  },

  {
    diagnostico: "Infección",
    codigo: "00004-I",
    dominio: "Dominio 11: Seguridad/Protección",
    prioridad: "Alta",
    abcde: "C-E",
    palabras_clave: [
      "fiebre","temperatura alta","T 38","T 38.5","T 39","T 40","Tª alta",
      "febril","con fiebre","pico febril","pico de fiebre","fiebre que no baja",
      "hipertermia","hipertermico","escalofrios con fiebre","tiritera con fiebre",
      "secrecion purulenta","pus","supuracion","herida supurada","herida infectada",
      "olor feo en herida","olor putrefacto","cambio de curación con pus",
      "eritema localizado","enrojecimiento","zona roja","calor local",
      "rubor","tumor","dolor localizado","signos de infeccion",
      "sospecha de sepsis","sepsis","SIRS","leucocitosis","PCR alta",
      "cultivo positivo","hemocultivo positivo","urocultivo positivo",
      "antibiotico","ATB","plan antibiotico","inicio de ATB"
    ],
    rc: "Defensas bajas, colonización bacteriana/viral, heridas contaminadas",
    mp: "Hipertermia, secreciones purulentas, eritema, calor, rubor y edema localizados",
    evolucion_es: "Paciente cursa cuadro infeccioso con picos de hipertermia, taquicardia y signos inflamatorios locales. Se toman muestras para cultivo y se administra antibioterapia.",
    evolucion_en: "Patient presents infectious picture with hyperthermia spikes, tachycardia and local inflammatory signs. Culture samples taken and antibiotic therapy administered."
  },

  {
    diagnostico: "Riesgo de shock",
    codigo: "00205",
    dominio: "Dominio 11: Seguridad/Protección",
    prioridad: "Alta",
    abcde: "C",
    palabras_clave: [
      "riesgo de shock","pre-shock","signos de shock","inestable hemodinámicamente",
      "inestabilidad hemodinamica","TA que cae","TA que baja rapido",
      "hipotension severa","TA 70/40","TA 60/30",
      "shock septico","sepsis con hipotension","sepsis grave",
      "shock hipovolemico","sangrado masivo con hipotension",
      "shock anafilactico","reaccion alergica grave","anafilaxia",
      "shock cardiogenico","infarto con hipotension","edema agudo de pulmon",
      "FC 130 con TA baja","taquicardia con hipotension","MAP baja",
      "PAM menor a 65","noradrenalina","dopamina","vasopresores",
      "lactato elevado","acidosis lactica","perfusion comprometida"
    ],
    rc: "Sepsis, hemorragia, anafilaxia, infarto, deshidratación severa",
    mp: "Hipotensión, taquicardia compensatoria, signos de mala perfusión tisular",
    evolucion_es: "Se identifica riesgo de shock con signos de inestabilidad hemodinámica. Se monitoriza TA/FC cada 15 minutos, se asegura acceso venoso y se notifica urgente al equipo médico.",
    evolucion_en: "Shock risk identified with hemodynamic instability signs. BP/HR monitored every 15 minutes, venous access secured and urgent medical team notification made."
  },

  {
    diagnostico: "Riesgo de sangrado",
    codigo: "00206",
    dominio: "Dominio 11: Seguridad/Protección",
    prioridad: "Alta",
    abcde: "C",
    palabras_clave: [
      "anticoagulado","toma anticoagulantes","heparina","enoxaparina","clexane",
      "warfarina","acenocumarol","sintrom","ACOD","rivaroxaban","apixaban",
      "RIN elevado","RIN mayor a 3","tiempo de protrombina elevado","TP elevado",
      "plaquetas bajas","trombocitopenia","plaquetopenia","plaquetas menores a 50000",
      "sangrado activo","sangra","hematoma","moretones","equimosis",
      "petequias","purpura","sangrado de encias","epistaxis","sangrado de nariz",
      "hemoptisis","hematemesis","melena","rectorragia","hematuria",
      "post cirugia con riesgo de sangrado","post puncion con hematoma",
      "fragil","muy fragil","se lastima facil"
    ],
    rc: "Anticoagulación, trombocitopenia, coagulopatía, trauma, cirugía",
    mp: "Factores de riesgo hemorrágico: anticoagulación, plaquetas bajas, coagulopatía",
    evolucion_es: "Se valora riesgo de sangrado incrementado. Se extreman precauciones, se evitan procedimientos innecesarios y se monitoriza aparición de signos hemorrágicos.",
    evolucion_en: "Increased bleeding risk assessed. Precautions maximized, unnecessary procedures avoided and hemorrhagic signs monitored."
  },

  {
    diagnostico: "Déficit de volumen de líquidos",
    codigo: "00027",
    dominio: "Dominio 2: Nutrición",
    prioridad: "Alta",
    abcde: "C",
    palabras_clave: [
      "deshidratacion","deshidratado","deshidratada","muy deshidratado",
      "sin liquidos","no toma liquidos","no bebe","no ingiere liquidos",
      "mucosas secas","boca seca","labios secos","sed intensa","mucha sed",
      "ojos hundidos","signo del pliegue","piel con poco turgor","turgencia baja",
      "diuresis escasa","orina concentrada","orina oscura","orina poca",
      "balance negativo","perdidas aumentadas","vomitos con deshidratacion",
      "diarrea con deshidratacion","TA baja por deshidratacion",
      "hematocrito elevado","hemoconcentracion","sodio alto","hipernatremia",
      "plan de hidratacion","hidratacion IV","suero","goteo de suero",
      "SF","ClNa","dextrosa","SG","rehidratacion oral"
    ],
    rc: "Vómitos, diarrea, fiebre, ingesta insuficiente, hemorragia",
    mp: "Mucosas secas, sed intensa, diuresis concentrada y escasa, pliegue positivo",
    evolucion_es: "Paciente presenta déficit de volumen de líquidos con mucosas secas, sed intensa y diuresis concentrada. Se inicia plan de hidratación IV y se monitoriza balance hídrico.",
    evolucion_en: "Patient presents fluid volume deficit with dry mucous membranes, intense thirst and concentrated urine. IV hydration initiated and fluid balance monitored."
  },

  {
    diagnostico: "Exceso de volumen de líquidos",
    codigo: "00026",
    dominio: "Dominio 2: Nutrición",
    prioridad: "Alta",
    abcde: "C",
    palabras_clave: [
      "edema","edema generalizado","anasarca","edema en pies","edema en piernas",
      "edema en MMII","fovea positiva","deja fovea","queda el hoyo",
      "edema facial","cara hinchada","ojos hinchados","parpados edematosos",
      "sobrecarga de volumen","hipervolemia","retencion de liquidos",
      "aumento de peso por liquido","subio de peso en liquido",
      "disnea por liquido","edema pulmonar","estertores por liquido",
      "derrame pleural","ascitis","panza de agua","abdomen con liquido",
      "diureticos","furosemida","espironolactona","balance positivo",
      "restriccion hidrica","restriccion de liquidos",
      "insuficiencia cardiaca descompensada","ICC","insuficiencia renal con edema"
    ],
    rc: "Insuficiencia cardíaca, insuficiencia renal, cirrosis, excesiva administración de líquidos IV",
    mp: "Edema, aumento de peso, disnea, crepitantes pulmonares, balance positivo",
    evolucion_es: "Paciente presenta exceso de volumen de líquidos con edema y disnea. Se administran diuréticos y se monitoriza balance hídrico y peso diario.",
    evolucion_en: "Patient presents fluid volume excess with edema and dyspnea. Diuretics administered and fluid balance and daily weight monitored."
  },

  {
    diagnostico: "Náuseas",
    codigo: "00134",
    dominio: "Dominio 12: Confort",
    prioridad: "Media",
    abcde: "C",
    palabras_clave: [
      "nauseas","nausea","ganas de vomitar","quiere vomitar","arcadas",
      "vomitos","vomito","vomita","esta vomitando","vomito varias veces",
      "nauseas y vomitos","NyV","N y V","intolerancia digestiva",
      "malestar gastrico","revuelto del estomago","mal del estomago",
      "no tolera la ingesta","no retiene nada","todo lo vomita",
      "vomitos biliosos","vomito verde","vomito en proyectil",
      "sialorrea","saliva abundante","babea","palidez con nauseas",
      "sudoracion fria con nauseas","mareo con nauseas",
      "antieméticos","metoclopramida","ondansetron","primer VH",
      "nauseas por quimio","vomitos por quimioterapia","NyV post quimio"
    ],
    rc: "Efectos secundarios de medicación, trastornos digestivos, ansiedad, quimioterapia",
    mp: "Malestar gástrico, arcadas, episodios de vómitos, palidez, sialorrea",
    evolucion_es: "Paciente refiere náuseas intensas con episodios de vómitos. Se coloca en posición lateral de seguridad y se administra antiemético según indicación.",
    evolucion_en: "Patient reports intense nausea with vomiting episodes. Placed in lateral security position and antiemetic administered per order."
  },

  {
    diagnostico: "Estreñimiento",
    codigo: "00011",
    dominio: "Dominio 3: Eliminación/Intercambio",
    prioridad: "Media",
    abcde: "C",
    palabras_clave: [
      "estrenimiento","constipacion","constipado","estreñido","estreñida",
      "no va de cuerpo","no defeca","no evacua","dias sin ir al baño",
      "hace dias que no caga","no puede hacer cuerpo","no pudo defecar",
      "heces duras","materia fecal dura","cuerpo duro","barro duro",
      "distension abdominal","abdomen distendido","panza hinchada",
      "abdomen timpanico","dolor abdominal bajo","retorcijones bajos",
      "gases retenidos","flatos","no larga gases","no ventila",
      "ruidos hidroaereos disminuidos","abdomen silencioso",
      "laxante","enema","supositorios","tacto rectal","ampolla llena",
      "fecaloma","impactacion fecal"
    ],
    rc: "Baja ingesta de fibra, inmovilidad, deshidratación, opioides",
    mp: "Heces duras, disminución de frecuencia evacuatoria, distensión y dolor abdominal",
    evolucion_es: "Se registra estreñimiento prolongado. Paciente refiere ausencia de evacuación por varios días con distensión abdominal. Se promueve hidratación, fibra y se administran laxantes prescritos.",
    evolucion_en: "Prolonged constipation recorded. Patient reports no bowel movement for several days with abdominal distension. Hydration, fiber and prescribed laxatives promoted."
  },

  {
    diagnostico: "Diarrea",
    codigo: "00013",
    dominio: "Dominio 3: Eliminación/Intercambio",
    prioridad: "Media",
    abcde: "C-D",
    palabras_clave: [
      "diarrea","diarreico","deposiciones liquidas","evacuaciones liquidas",
      "cuerpo liquido","materia fecal liquida","liquido por el ano",
      "muchas deposiciones","va muchas veces al baño","va cada rato",
      "urgencia fecal","no aguanta las ganas","llegó justo al baño",
      "no llegó al baño","se ensució","defecó encima",
      "dolor abdominal tipo colico","retorcijones","dolor de panza",
      "deshidratacion por diarrea","perdida de liquidos",
      "diarrea con sangre","melena","rectorragia","heces con sangre",
      "gastroenteritis","turista","diarrea infecciosa","clostridium","cdiff"
    ],
    rc: "Infección gastrointestinal, intolerancia alimentaria, medicación, ansiedad",
    mp: "Evacuaciones líquidas frecuentes, urgencia fecal, dolor abdominal cólico, deshidratación",
    evolucion_es: "Paciente presenta diarrea con múltiples evacuaciones líquidas, urgencia fecal y dolor abdominal. Se monitorizan signos de deshidratación y se protege zona perianal.",
    evolucion_en: "Patient presents diarrhea with multiple loose stools, fecal urgency and abdominal pain. Dehydration signs monitored and perianal area protected."
  },

  {
    diagnostico: "Riesgo de glucemia inestable",
    codigo: "00179",
    dominio: "Dominio 2: Nutrición",
    prioridad: "Media",
    abcde: "C-D",
    palabras_clave: [
      "hipoglucemia","hipo","azucar baja","glucosa baja","glucemia baja",
      "gluc menor a 70","gluc 60","gluc 50","se desmaya por azucar",
      "sudoracion fria","temblores por azucar","hambre repentina",
      "palpitaciones por azucar","confusion por azucar","palidez con azucar baja",
      "hiperglucemia","hiper","azucar alta","glucosa alta","glucemia alta",
      "gluc mayor a 200","gluc 300","gluc 400","gluc 500",
      "poliuria","toma mucha agua","mucha sed","polidipsia",
      "orina mucho","orina frecuente","orina abundante","se levanta a orinar",
      "vision borrosa por azucar","cefalea por azucar",
      "diabetes","diabetico","diabetica","DBT","DBTII","DBT2","DBT1",
      "insulina","glucometria","glucometro","control capilar","tira reactiva"
    ],
    rc: "Diabetes mellitus, insulinoterapia, alimentación irregular, estrés",
    mp: "Variaciones significativas en glucometrías, sudoración, mareos, poliuria, polidipsia",
    evolucion_es: "Se identifica riesgo de inestabilidad glucémica. Controles de glucometría capilar muestran fluctuaciones. Se monitorizan signos de hipo/hiperglucemia y se ajusta esquema.",
    evolucion_en: "Risk of unstable blood glucose identified. Capillary glucose checks show fluctuations. Hypo/hyperglycemia signs monitored and regimen adjusted."
  },

  {
    diagnostico: "Dolor agudo",
    codigo: "00132",
    dominio: "Dominio 12: Confort",
    prioridad: "Media",
    abcde: "C-D",
    palabras_clave: [
      "EVA alta","EVA 7","EVA 8","EVA 9","EVA 10","escala de dolor alta",
      "dolor 7/10","dolor 8/10","dolor 9/10","dolor 10/10",
      "NRS alto","escala numerica alta",
      "dolor agudo","dolor intenso","dolor fuerte","mucho dolor",
      "le duele un monton","le duele mucho","dolor insoportable","no aguanta el dolor",
      "dolor punzante","puntada","ardor","quemazon","dolor tipo puntada",
      "dolor localizado","dolor en punto fijo",
      "facies de dolor","cara de dolor","mueca de dolor","gesto de dolor",
      "quejido","se queja","gemido","llanto por dolor","llora de dolor",
      "posicion antalgica","protege la zona","no se mueve por el dolor",
      "irritable por dolor","agitado por dolor",
      "post operatorio con dolor","post cirugia con dolor",
      "analgesia","analgésico","necesita calmante","pide calmante",
      "ketorolac","ibuprofeno","paracetamol","tramadol","morfina"
    ],
    rc: "Lesión tisular, cirugía, inflamación, traumatismo",
    mp: "Expresión verbal y gestual de dolor, quejidos, EVA severa, posturas antiálgicas",
    evolucion_es: "Paciente manifiesta dolor agudo intenso con facies de sufrimiento y quejidos. EVA elevado. Se administra analgesia prescrita y se revalúa eficacia a los 30 minutos.",
    evolucion_en: "Patient manifests intense acute pain with suffering facies and moaning. High VAS score. Prescribed analgesia administered and efficacy re-evaluated at 30 minutes."
  },

  {
    diagnostico: "Desequilibrio nutricional: inferior a las necesidades",
    codigo: "00002",
    dominio: "Dominio 2: Nutrición",
    prioridad: "Media",
    abcde: "C-D",
    palabras_clave: [
      "perdida de peso","bajo peso","bajó de peso","flaco","muy flaco",
      "caquexia","desnutricion","desnutrido","desnutrida","mal nutrido",
      "no come nada","come muy poco","no tiene apetito","sin apetito",
      "anorexia","inapetencia","rechazo al alimento","no quiere comer",
      "IMC bajo","IMC menor a 18","peso insuficiente",
      "albumina baja","prealbumina baja","proteinas bajas",
      "debilidad por no comer","sin energia por dieta","decaido por no comer",
      "perdida de masa muscular","sarcopenia","atrofia muscular",
      "dieta insuficiente","ingesta menor al 50%","no termina la dieta",
      "nutricion parenteral","NPT","nutricion enteral","SNG","yeyunostomia"
    ],
    rc: "Ingesta insuficiente, incapacidad de absorber nutrientes, enfermedad crónica",
    mp: "Pérdida de peso involuntaria, signos de desnutrición, ingesta calórica deficiente",
    evolucion_es: "Se registra desequilibrio nutricional con pérdida de peso progresiva e ingesta muy por debajo de necesidades basales. Se solicita valoración nutricional.",
    evolucion_en: "Nutritional imbalance recorded with progressive weight loss and caloric intake far below baseline needs. Nutritional assessment requested."
  },

  {
    diagnostico: "Déficit de autocuidado: alimentación",
    codigo: "00102",
    dominio: "Dominio 4: Actividad/Reposo",
    prioridad: "Media",
    abcde: "C-D",
    palabras_clave: [
      "no puede comer solo","no come solo","dependiente para comer",
      "necesita que lo alimenten","hay que darle de comer",
      "no lleva la cuchara a la boca","no puede usar cubiertos",
      "dificultad para tragar","disfagia","come con ayuda total",
      "ayuda para comer","parcialmente dependiente para comer",
      "temblores al comer","parkinson al comer","espasticidad al comer",
      "dieta picada","dieta licuada","dieta modificada en textura",
      "no retiene alimento","todo se le cae","no cierra bien la boca"
    ],
    rc: "Alteración neuromuscular, debilidad extrema, deterioro cognitivo",
    mp: "Incapacidad de llevar alimentos a la boca o usar utensilios de forma independiente",
    evolucion_es: "Paciente requiere asistencia total para alimentación por alteración neuromuscular y fatiga. Se asiste en preparación e ingesta vigilando tolerancia.",
    evolucion_en: "Patient requires total feeding assistance due to neuromuscular alteration and fatigue. Assistance provided in preparation and intake while monitoring tolerance."
  },

  // ══════════════════════════════════════════════════════════════
  //  DOMINIO B-C — ACTIVIDAD / ESFUERZO
  // ══════════════════════════════════════════════════════════════

  {
    diagnostico: "Intolerancia a la actividad",
    codigo: "00092",
    dominio: "Dominio 4: Actividad/Reposo",
    prioridad: "Media",
    abcde: "B-C",
    palabras_clave: [
      "disnea al esfuerzo","se ahoga al caminar","se cansa al caminar",
      "taquicardia al esfuerzo","FC sube al moverse","pulso se dispara al caminar",
      "cansancio inmediato","agotamiento rapido","no aguanta ni 5 metros",
      "no puede subir escaleras","no llega al baño","se sienta a mitad de camino",
      "se agita al moverse","agitado con el esfuerzo","fatiga de esfuerzo",
      "disnea de pequeños esfuerzos","disnea de medianos esfuerzos",
      "desacondicionado","desacondicionamiento fisico","mucho tiempo en cama",
      "sedentarismo post internacion","baja tolerancia al ejercicio"
    ],
    rc: "Desequilibrio entre aporte y demanda de oxígeno, decondicionamiento físico",
    mp: "Disnea, taquicardia o fatiga extrema ante esfuerzos leves o moderados",
    evolucion_es: "Se evidencia intolerancia clínica a la actividad. Al menor esfuerzo el paciente desarrolla disnea notable y elevación de FC. Se pautan movilizaciones progresivas supervisadas.",
    evolucion_en: "Clinical intolerance to physical activity evident. At minimal effort patient develops notable dyspnea and elevated heart rate. Supervised progressive mobilizations scheduled."
  },

  // ══════════════════════════════════════════════════════════════
  //  DOMINIO C-D-E — MOVILIDAD / SEGURIDAD
  // ══════════════════════════════════════════════════════════════

  {
    diagnostico: "Deterioro de la movilidad física",
    codigo: "00085",
    dominio: "Dominio 4: Actividad/Reposo",
    prioridad: "Media",
    abcde: "C-D-E",
    palabras_clave: [
      "debilidad muscular","fuerza disminuida","sin fuerza en piernas",
      "limitacion de movimientos","rango de movimiento disminuido",
      "rigidez articular","contractura","espasticidad","hipertonia",
      "no puede caminar","no deambula","postrado","postrada en cama",
      "inmovil","no se mueve","depende para movilizarse",
      "necesita ayuda para moverse","transferencia asistida","giro asistido",
      "dolor al moverse","duele cuando se mueve","se queja al girar",
      "barandas","cama con barandas","contencion mecanica",
      "muletas","andador","silla de ruedas","sin deambulacion",
      "hemiplegia","hemiplejia","paraplegia","cuadriplegia",
      "ACV con secuelas","post ACV","post fractura","yeso","inmovilizacion"
    ],
    rc: "Debilidad muscular, dolor, inmovilidad, lesión neurológica",
    mp: "Debilidad muscular, limitación de movimientos, dolor al moverse, dependencia",
    evolucion_es: "Paciente presenta limitación significativa para la deambulación con debilidad muscular y dolor al transferirse. Requiere asistencia parcial/total para movilización.",
    evolucion_en: "Patient presents significant ambulation limitation with muscle weakness and pain during transfers. Requires partial/total mobilization assistance."
  },

  {
    diagnostico: "Riesgo de caída",
    codigo: "00155",
    dominio: "Dominio 11: Seguridad/Protección",
    prioridad: "Media",
    abcde: "C-D-E",
    palabras_clave: [
      "riesgo de caida","se puede caer","peligro de caida","propenso a caerse",
      "inestabilidad","inestable al caminar","tambalea","no tiene equilibrio",
      "mareo al caminar","vertigo","vertigo postural","se marea al pararse",
      "hipotension ortostatica","se marea al levantarse",
      "debilidad en piernas","flojo de piernas","no sostiene bien",
      "historial de caidas","ya se cayó","tuvo una caida","se cayó antes",
      "Downton alto","Morse alto","escala de caidas alto","riesgo alto caidas",
      "medicacion sedante","benzo","benzodiacepinas","sedado","somnoliento",
      "vision reducida","no ve bien","cieguito","cataratas",
      "barreras ambientales","piso mojado","sin barandas","sin llamador",
      "confuso deambulando","deambula solo de noche","sale de la cama solo",
      "demencia con deambulacion","agitado que deambula",
      "anciano con riesgo de caida","abuelo que se cae","abuela que se cae",
      "adulto mayor inestable","se cayó de la cama","se cayo al ir al baño"
    ],
    rc: "Mareos, debilidad, alteración de la marcha, medicación sedante, entorno inseguro",
    mp: "Riesgo aumentado por factores fisiológicos y/o ambientales concurrentes",
    evolucion_es: "Se identifica elevado riesgo de caídas por inestabilidad, debilidad y efectos de medicación sedante. Se activan barandillas, se coloca llamador al alcance y se educa al paciente y familia.",
    evolucion_en: "High fall risk identified due to instability, weakness and sedative medication effects. Safety rails activated, call bell placed within reach, patient and family educated."
  },

  {
    diagnostico: "Ansiedad",
    codigo: "00146",
    dominio: "Dominio 9: Afrontamiento/Tolerancia al estrés",
    prioridad: "Media",
    abcde: "C-D-E",
    palabras_clave: [
      "ansioso","ansiosa","nervioso","nerviosa","muy nervioso","muy nerviosa",
      "angustiado","angustiada","angustia","ansiedad","crisis de ansiedad",
      "ataque de panico","panico","se pone muy mal","llora de los nervios",
      "preocupacion excesiva","no puede dejar de pensar","catastrofiza",
      "miedo al diagnostico","miedo a la cirugia","miedo al hospital",
      "tension muscular","aprieta los dientes","contracturado de nervios",
      "insomnio por nervios","no puede dormir de nervios","inquieto",
      "se mueve mucho en la cama","no para quieto","inquietud motora",
      "taquicardia de nervios","FC alta por ansiedad","sudoracion por nervios",
      "manos sudadas","temblor por nervios","tiembla de nervios",
      "lloroso","llanto facil","llora seguido","se larga a llorar"
    ],
    rc: "Estrés, hospitalización, miedo, incertidumbre, diagnóstico grave",
    mp: "Preocupación excesiva, inquietud motora, tensión muscular, taquicardia, sudoración",
    evolucion_es: "Paciente con signos evidentes de ansiedad, manifestando preocupación excesiva y miedo. Se brinda contención emocional y entorno tranquilo.",
    evolucion_en: "Patient with evident anxiety signs expressing excessive worry and fear. Emotional support and calm environment provided."
  },

  // ══════════════════════════════════════════════════════════════
  //  DOMINIO D — NEUROLÓGICO / COGNITIVO
  // ══════════════════════════════════════════════════════════════

  {
    diagnostico: "Confusión aguda",
    codigo: "00128",
    dominio: "Dominio 5: Percepción/Cognición",
    prioridad: "Alta",
    abcde: "D",
    palabras_clave: [
      "desorientado","desorientada","confuso","confusa","no orienta",
      "no sabe donde esta","no sabe que dia es","no reconoce a la familia",
      "no me reconoce","no sabe quien es","desorientacion en tiempo y espacio",
      "delirium","delirio","sindrome confusional agudo","SCA",
      "agitado","muy agitado","agitacion psicomotriz","no para quieto",
      "se quiere sacar todo","se saca la via","se saca el oxigeno",
      "se quiere ir","quiere escapar","forcejea","resistencia",
      "habla incoherente","dice cosas sin sentido","habla solo","alucina",
      "ve cosas que no estan","escucha cosas","oye cosas",
      "GCS bajo","GCS 13","GCS 12","GCS 11","alteracion de conciencia",
      "lucidez fluctuante","a veces esta bien y a veces no",
      "empeora de noche","agitacion nocturna","se pone peor de noche",
      "sundowning","deambula de noche","se levanta de noche"
    ],
    rc: "Hipoxia, infección, fiebre, deshidratación, polifarmacia, privación de sueño",
    mp: "Desorientación temporo-espacial de inicio abrupto, agitación o hipoactividad, fluctuaciones cognitivas",
    evolucion_es: "Paciente presenta cuadro de confusión aguda (delirium) de inicio súbito. Se muestra desorientado, agitado e incoherente. Se reevalúan constantes vitales, hidratación y medicación.",
    evolucion_en: "Patient presents acute confusion (delirium) of sudden onset. Appears disoriented, agitated and incoherent. Vital signs, hydration and medication re-evaluated."
  },

  {
    diagnostico: "Deterioro de la memoria",
    codigo: "00131",
    dominio: "Dominio 5: Percepción/Cognición",
    prioridad: "Media",
    abcde: "D",
    palabras_clave: [
      "no recuerda","no se acuerda","olvidos frecuentes","muy olvidadizo",
      "olvida lo que le dicen","no retiene informacion","no recuerda instrucciones",
      "deterioro cognitivo","demencia","alzheimer","deterioro mnesico",
      "memoria corta plazo afectada","no recuerda lo de hace un rato",
      "repite lo mismo","pregunta lo mismo varias veces",
      "se pierde en la casa","se pierde en el piso","no encuentra su cuarto",
      "no recuerda haber comido","no recuerda haber tomado la medicacion",
      "mini mental bajo","MMSE bajo","MoCA bajo","test cognitivo bajo",
      "confunde a las personas","confunde nombres","no reconoce familiares"
    ],
    rc: "Demencia, ACV, traumatismo craneal, privación de sueño, depresión",
    mp: "Incapacidad de recordar información reciente, repetición de preguntas, desorientación",
    evolucion_es: "Paciente presenta deterioro mnésico con olvidos frecuentes e incapacidad de retener información nueva. Se orientan actividades y se involucra a la familia.",
    evolucion_en: "Patient presents memory impairment with frequent forgetting and inability to retain new information. Activities oriented and family involved."
  },

  {
    diagnostico: "Disminución de la capacidad adaptativa intracraneal",
    codigo: "00049",
    dominio: "Dominio 5: Percepción/Cognición",
    prioridad: "Alta",
    abcde: "D",
    palabras_clave: [
      "hipertension endocraneana","HEC","presion intracraneal elevada","PIC alta",
      "cefalea en casco","cefalea muy intensa","el peor dolor de cabeza de la vida",
      "vomitos en chorro","vomitos sin nauseas","vomito en proyectil",
      "papilodema","vision borrosa con cefalea","diplopia",
      "bradipsiquia","lentitud para responder","respuesta lenta","bradilalia",
      "GCS que cae","GCS que baja","empeora neurologicamente",
      "anisocoria","pupilas desiguales","pupila que no reacciona",
      "reflejo de Cushing","bradicardia con HTA","triada de Cushing",
      "TCE","traumatismo de craneo","golpe en la cabeza","post TCE"
    ],
    rc: "TCE, tumores, hemorragia intracraneal, hidrocefalia",
    mp: "Cefalea intensa, vómitos en proyectil, alteración del nivel de conciencia, anisocoria",
    evolucion_es: "Se evidencian signos de hipertensión endocraneana. Paciente con cefalea intensa, vómitos y deterioro del nivel de conciencia. Se posiciona a 30° y se avisa urgente al médico.",
    evolucion_en: "Intracranial hypertension signs evident. Patient with intense headache, vomiting and consciousness deterioration. Positioned at 30° and urgent medical notification made."
  },

  {
    diagnostico: "Deterioro de la comunicación verbal",
    codigo: "00051",
    dominio: "Dominio 5: Percepción/Cognición",
    prioridad: "Media",
    abcde: "D",
    palabras_clave: [
      "no puede hablar","no habla","perdio el habla","afasia","disartria",
      "habla pastosa","habla arrastrando las palabras","no se le entiende",
      "expresion dificultosa","no puede expresarse","no comunica bien",
      "afasia de broca","afasia de wernicke","afasia global","afasia mixta",
      "post ACV sin habla","ACV con afasia","no articula bien",
      "monotono","voz debil","voz que no se escucha","voz afonica",
      "traqueostomia","traqueostomizado","no puede hablar por traqueostomia",
      "tubo endotraqueal","ARM sin voz","intubado","comunicacion alternativa",
      "pizarron","tabla de comunicacion","señas"
    ],
    rc: "ACV, traumatismo craneal, intubación endotraqueal, afecciones laríngeas",
    mp: "Incapacidad o dificultad para articular palabras, afasia, voz inaudible",
    evolucion_es: "Paciente presenta deterioro de comunicación verbal con afasia expresiva. Se implementan estrategias de comunicación alternativa y se involucra fonoaudiología.",
    evolucion_en: "Patient presents verbal communication impairment with expressive aphasia. Alternative communication strategies implemented and speech therapy involved."
  },

  // ══════════════════════════════════════════════════════════════
  //  DOMINIO D-E — CONFORT / REPOSO / AUTOCUIDADO
  // ══════════════════════════════════════════════════════════════

  {
    diagnostico: "Dolor crónico",
    codigo: "00133",
    dominio: "Dominio 12: Confort",
    prioridad: "Baja",
    abcde: "D-E",
    palabras_clave: [
      "dolor cronico","dolor de hace meses","dolor de hace años","dolor persistente",
      "dolor que no cede","dolor constante","dolor continuo","dolor que nunca para",
      "hace mucho que le duele","viene con dolor de antes",
      "fibromialgia","artritis","artrosis","lumbalgia cronica","lumbago cronico",
      "cervicalgia cronica","dolor oncologico","dolor por cancer",
      "neuropatia","dolor neuropatico","quemazón crónica","hormigueo cronico",
      "EVA cronico","dolor tolerable pero constante",
      "frustrado por el dolor","cansado del dolor","harto del dolor",
      "insomnio por dolor cronico","no puede dormir por el dolor",
      "dependiente de analgesicos","toma muchos calmantes","analgesia cronica"
    ],
    rc: "Enfermedad crónica, daño nervioso, fibromialgia, cáncer",
    mp: "Dolor persistente de larga evolución, fatiga, insomnio, frustración verbalizada",
    evolucion_es: "Paciente refiere dolor crónico que interfiere con AVD y sueño. Manifiesta frustración. Se promueven medidas de confort y se valora ajuste analgésico.",
    evolucion_en: "Patient reports chronic pain interfering with ADLs and sleep. Frustration manifested. Comfort measures promoted and analgesia adjustment evaluated."
  },

  {
    diagnostico: "Deterioro de la integridad cutánea",
    codigo: "00046",
    dominio: "Dominio 11: Seguridad/Protección",
    prioridad: "Media",
    abcde: "D-E",
    palabras_clave: [
      "ulcera por presion","UPP","escara","escaras","escara sacra","escara en talon",
      "estadio 1","estadio 2","estadio 3","estadio 4",
      "eritema que no blanquea","zona roja que no blanquea","zona enrojecida",
      "herida","heridas","herida abierta","herida cronica","ulcera venosa",
      "ulcera arterial","ulcera diabetica","pie diabetico con herida",
      "piel fragil","piel quebradiza","se rompe la piel","skin tears",
      "excoriacion","raspadura","peladura","abrasion cutanea",
      "edema con piel comprometida","piel tensa por edema","ampollas",
      "curacion","cambio de apósito","apósito hidrocoloide","algivato",
      "herida con secrecion","herida que supura","herida mal oliente",
      "presion prolongada","mismo decubito","no cambia de posicion",
      "ulceras","eritema","excoriacion","secrecion","piel fragil"
    ],
    rc: "Presión prolongada, inmovilidad, humedad, desnutrición, edema",
    mp: "Eritema que no blanquea, úlceras, excoriaciones, piel frágil",
    evolucion_es: "Se evidencia deterioro de integridad cutánea con eritema sin blanqueo y úlceras en zonas de declive. Se realizan curaciones según protocolo y cambios posturales cada 2 horas.",
    evolucion_en: "Impaired skin integrity evidenced by non-blanchable erythema and pressure ulcers in dependent areas. Wound care performed per protocol and postural changes every 2 hours."
  },

  {
    diagnostico: "Deterioro de la integridad tisular",
    codigo: "00044",
    dominio: "Dominio 11: Seguridad/Protección",
    prioridad: "Media",
    abcde: "D-E",
    palabras_clave: [
      "herida profunda","herida con tejido expuesto","herida con tendón visible",
      "herida con hueso expuesto","herida quirurgica dehiscente","dehiscencia",
      "herida que se abrió","puntos que cedieron","puntos abiertos",
      "necrotizante","tejido necrotico","necrosis","tejido negro","escara negra",
      "desvitalizacion tisular","tejido esfacelado","esfacelo",
      "fistula","fistula enterocutanea","VAC","presion negativa en herida",
      "herida infectada profunda","celulitis","fascitis","gangrena"
    ],
    rc: "Lesión, cirugía, infección, isquemia, presión severa",
    mp: "Destrucción de tejidos más allá de la dermis, necrosis, dehiscencia",
    evolucion_es: "Se evidencia deterioro tisular con compromiso de planos profundos. Se realiza curación avanzada y se coordina manejo interdisciplinario.",
    evolucion_en: "Tissue integrity impairment with deep plane involvement evident. Advanced wound care performed and interdisciplinary management coordinated."
  },

  {
    diagnostico: "Descanso ineficaz",
    codigo: "00095",
    dominio: "Dominio 4: Actividad/Reposo",
    prioridad: "Baja",
    abcde: "D-E",
    palabras_clave: [
      "insomnio","no puede dormir","dificultad para dormir","duerme mal",
      "no concilia el sueño","se desvela","se queda dormido tarde",
      "sueno interrumpido","se despierta seguido","se despierta varias veces",
      "no descanso bien","no descanse nada","pase mala noche","mala noche",
      "somnolencia diurna","se duerme de dia","cabecea de dia",
      "sensacion de no descansar","duermo pero no descanso",
      "pesadillas","terrores nocturnos","habla dormido","sonambulo",
      "apnea del sueño","ronca mucho","deja de respirar al dormir",
      "irritable por falta de sueño","mal humor por no dormir"
    ],
    rc: "Dolor, ansiedad, ruido hospitalario, luz intensa, estrés",
    mp: "Insomnio, despertares frecuentes, somnolencia diurna, sueño no reparador",
    evolucion_es: "Paciente refiere descanso ineficaz con insomnio y despertares frecuentes. Se promueven medidas de higiene del sueño y se minimizan interrupciones nocturnas.",
    evolucion_en: "Patient reports ineffective rest with insomnia and frequent awakenings. Sleep hygiene measures promoted and nighttime interruptions minimized."
  },

  {
    diagnostico: "Deterioro del patrón del sueño",
    codigo: "00198",
    dominio: "Dominio 4: Actividad/Reposo",
    prioridad: "Baja",
    abcde: "D-E",
    palabras_clave: [
      "no puede dormir en el hospital","ruido que no lo deja dormir",
      "luz que no lo deja dormir","interrupciones que no lo dejan dormir",
      "cambio del patron de sueño","duerme en horarios distintos",
      "duerme de dia y no duerme de noche","ritmo circadiano alterado",
      "jet lag hospitalario","entraba a dormir a las 2 y ahora no puede",
      "apnea del sueño diagnosticada","CPAP","usa CPAP","ronca fuerte",
      "somnoliento de dia por mala noche","sueño fragmentado en internacion",
      "hipnoticos","lorazepam para dormir","zolpidem","clonazepam para dormir"
    ],
    rc: "Ruido, luz, interrupciones frecuentes, ansiedad, dolor, cambio de entorno",
    mp: "Dificultad para conciliar o mantener el sueño hospitalario, somnolencia diurna",
    evolucion_es: "Paciente refiere deterioro del patrón de sueño por factores ambientales. Se promueven medidas de higiene del sueño y se coordinan cuidados para minimizar interrupciones.",
    evolucion_en: "Patient reports sleep pattern deterioration due to environmental factors. Sleep hygiene measures promoted and care coordinated to minimize interruptions."
  },

  {
    diagnostico: "Fatiga",
    codigo: "00093",
    dominio: "Dominio 4: Actividad/Reposo",
    prioridad: "Baja",
    abcde: "D-E",
    palabras_clave: [
      "cansancio","muy cansado","muy cansada","agotamiento","agotado","agotada",
      "sin fuerzas","no tiene fuerzas","sin energia","sin ganas de nada",
      "postrado por cansancio","no puede ni levantarse","solo quiere dormir",
      "re cansado","re cansada","hecho mierda de cansancio",
      "cansancio que no cede","no mejora con el descanso",
      "debilidad generalizada","decaido","decaida","apagado","apagada",
      "no quiere hacer nada","abulia","anergia","astenia","asténico",
      "cansancio por quimio","cansancio por radioterapia","cansancio oncologico",
      "fatiga cronica","sindrome de fatiga"
    ],
    rc: "Enfermedad crónica, anemia, depresión, estrés, tratamiento oncológico",
    mp: "Cansancio abrumador y sostenido, incapacidad para actividades mínimas",
    evolucion_es: "Paciente describe fatiga constante que no cede con el reposo. Marcada debilidad al realizar actividades mínimas. Se planifican períodos de descanso intercalados.",
    evolucion_en: "Patient describes constant fatigue not relieved by rest. Marked weakness performing minimal activities. Rest periods planned between care activities."
  },

  {
    diagnostico: "Déficit de autocuidado: baño/higiene",
    codigo: "00108",
    dominio: "Dominio 4: Actividad/Reposo",
    prioridad: "Baja",
    abcde: "D-E",
    palabras_clave: [
      "no puede bañarse","no puede higienizarse","no se puede lavar",
      "dependiente para el baño","baño asistido","aseo en cama",
      "baño total en cama","no llega al baño","higiene a cargo del enfermero",
      "mala higiene","sucio","sucia","mal olor corporal","olor a sudor",
      "no se lava solo","necesita ayuda total para higiene",
      "ayuda parcial para higiene","se puede higienizar con ayuda",
      "higiene bucal asistida","no puede cepillarse los dientes",
      "higiene genital asistida","higiene de zona perianal",
      "dependencia","mala higiene","dificultad motora","no se puede banar"
    ],
    rc: "Debilidad, deterioro físico, limitación funcional, dolor",
    mp: "Incapacidad de lavar el cuerpo autónomamente, requiere asistencia para higiene",
    evolucion_es: "Se evidencia déficit de autocuidado en higiene por limitación motora. Se asiste en aseo completo preservando intimidad y favoreciendo la participación del paciente.",
    evolucion_en: "Self-care deficit in hygiene due to motor limitation evidenced. Complete hygiene assistance provided while preserving privacy and encouraging participation."
  },

  {
    diagnostico: "Déficit de autocuidado: vestido",
    codigo: "00109",
    dominio: "Dominio 4: Actividad/Reposo",
    prioridad: "Baja",
    abcde: "D-E",
    palabras_clave: [
      "no puede vestirse","no puede desvestirse","no puede ponerse la ropa",
      "dependiente para vestirse","ayuda para vestirse",
      "no puede abrocharse","no puede subirse el cierre","no puede ponerse zapatos",
      "dificultad para vestirse","tarda mucho en vestirse",
      "ropa mal colocada","se pone la ropa al reves","ropa desordenada",
      "limitacion motora para vestirse","dolor al vestirse","dependencia"
    ],
    rc: "Limitación motora, debilidad muscular, deterioro cognitivo",
    mp: "Dificultad o incapacidad para ponerse/quitarse prendas de manera autónoma",
    evolucion_es: "Paciente presenta déficit para vestido y desvestido por pérdida de fuerza. Se proporciona ropa adaptada y asistencia preservando autonomía posible.",
    evolucion_en: "Patient presents dressing/undressing deficit due to strength loss. Adapted clothing and assistance provided preserving possible autonomy."
  },

  {
    diagnostico: "Déficit de autocuidado: uso del inodoro",
    codigo: "00110",
    dominio: "Dominio 4: Actividad/Reposo",
    prioridad: "Baja",
    abcde: "D-E",
    palabras_clave: [
      "no llega al baño","no puede ir al baño solo","dependiente para ir al baño",
      "necesita ayuda para ir al baño","necesita chata","chata","orinal",
      "bacinilla","pato","cuña","pañal","usa pañal","le ponemos pañal",
      "incontinencia","se orina antes de llegar","no controla esfínteres",
      "no puede subirse la ropa en el baño","no puede limpiarse",
      "higiene post evacuacion asistida","ayuda para limpiarse",
      "incontinencia","ayuda para ir al bano"
    ],
    rc: "Deterioro de la movilidad, debilidad, deterioro cognitivo, entorno no adaptado",
    mp: "Incapacidad de trasladarse al inodoro o realizar higiene de excretas autónomamente",
    evolucion_es: "Paciente no puede acceder al baño de forma independiente. Se provee chata/orinal y se asiste en higiene post-evacuatoria.",
    evolucion_en: "Patient unable to access bathroom independently. Bedpan/urinal provided and post-evacuation hygiene assistance given."
  },

  // ══════════════════════════════════════════════════════════════
  //  DOMINIO E — SEGURIDAD / PROTECCIÓN
  // ══════════════════════════════════════════════════════════════

  {
    diagnostico: "Riesgo de infección",
    codigo: "00004",
    dominio: "Dominio 11: Seguridad/Protección",
    prioridad: "Media",
    abcde: "E",
    palabras_clave: [
      "via periferica","VP","cateter periferico","cateter venoso","cateter central",
      "VVC","vía central","PICC","port-a-cath","acceso venoso",
      "sonda vesical","SV","sonda foley","sonda urinaria",
      "dren","drenaje","tubo de torax","TT","ostomia","colostomia","ileostomia",
      "herida quirurgica","post operatorio","post cirugia",
      "inmunosupresion","inmunosuprimido","corticoides a largo plazo",
      "defensas bajas","leucopenia","neutropenia","neutropenico",
      "desnutricion con riesgo infeccioso","albumina baja con herida",
      "tecnica aseptica","asepsia","lavado de manos","higiene de manos",
      "cambio de via","recambio de cateter","curación de via",
      "fiebre","heridas","invasivos","inmunosupresion"
    ],
    rc: "Procedimientos invasivos, defensas comprometidas, desnutrición, heridas",
    mp: "Presencia de dispositivos invasivos activos, soluciones de continuidad en piel",
    evolucion_es: "Se valora riesgo de infección incrementado por dispositivos invasivos activos. Se mantiene técnica aséptica estricta y se monitoriza sitio de inserción.",
    evolucion_en: "Increased infection risk assessed due to active invasive devices. Strict aseptic technique maintained and insertion site monitored."
  },

  {
    diagnostico: "Incontinencia urinaria funcional",
    codigo: "00020",
    dominio: "Dominio 3: Eliminación/Intercambio",
    prioridad: "Baja",
    abcde: "D-E",
    palabras_clave: [
      "se orina encima","se le escapa la orina","perdidas de orina",
      "urgencia miccional","no aguanta las ganas de orinar",
      "no llega al baño a tiempo","llegó tarde al baño",
      "incontinencia urinaria","incontinencia de urgencia","incontinencia mixta",
      "incontinencia de esfuerzo","se le escapa con la tos","con la risa se le va",
      "pañal mojado","pañal con orina","cambio de pañal por orina",
      "sabanas mojadas","ropa de cama húmeda","piel húmeda por orina",
      "dermatitis por humedad","piel irritada por orina","perdidas de orina","urgencia"
    ],
    rc: "Deterioro cognitivo, limitación física o motora, urgencia miccional",
    mp: "Pérdidas involuntarias de orina por imposibilidad de llegar al baño a tiempo",
    evolucion_es: "Se observa incontinencia urinaria funcional. Paciente no logra acceder al baño a tiempo. Se pautan horarios de micción asistida y se mantiene piel seca.",
    evolucion_en: "Functional urinary incontinence observed. Patient unable to reach bathroom in time. Assisted voiding schedules established and skin kept dry."
  },

  {
    diagnostico: "Incontinencia fecal",
    codigo: "00014",
    dominio: "Dominio 3: Eliminación/Intercambio",
    prioridad: "Media",
    abcde: "D-E",
    palabras_clave: [
      "incontinencia fecal","se caga encima","se ensució de materia fecal",
      "deposicion involuntaria","no controla el esfinter anal",
      "pierde materia fecal","escapa materia fecal","se le va sin querer",
      "pañal con materia fecal","sabanas con materia fecal",
      "ropa interior sucia","ropa de cama manchada",
      "esfinter incompetente","tono esfinteriano reducido",
      "post cirugia anorrectal","post parto con incontinencia",
      "incontinencia por diarrea","diarrea con pérdida de control"
    ],
    rc: "Alteración del esfínter anal, deterioro cognitivo, diarrea severa, lesión medular",
    mp: "Emisión involuntaria de heces, incapacidad de controlar el esfínter anal",
    evolucion_es: "Se observa episodio de incontinencia fecal. Se realiza higiene perineal exhaustiva y se protege la piel con barrera.",
    evolucion_en: "Fecal incontinence episode observed. Thorough perineal hygiene performed and skin protected with barrier."
  },

  {
    diagnostico: "Riesgo de úlcera por presión",
    codigo: "00249",
    dominio: "Dominio 11: Seguridad/Protección",
    prioridad: "Media",
    abcde: "D-E",
    palabras_clave: [
      "riesgo de escara","riesgo de UPP","riesgo de ulcera por presion",
      "Braden bajo","Norton bajo","escala de riesgo alta","riesgo alto de UPP",
      "inmovilidad prolongada","postrado","no cambia de posicion","mismo decúbito",
      "humedad en piel","pañal con humedad","incontinente con riesgo cutaneo",
      "desnutricion con riesgo cutaneo","albumina baja con riesgo de escara",
      "protuberancias oseas expuestas","sacro prominente","calcañeos en contacto",
      "talones en cama","trocanter prominente","maleolos expuestos",
      "colchon antiescaras","colchon de aire","colchon de presion alterna",
      "cambios posturales","giro cada 2 horas","cambio de decúbito",
      "parche preventivo","apósito protector","taloneras"
    ],
    rc: "Inmovilidad, desnutrición, humedad, perfusión tisular disminuida",
    mp: "Factores de riesgo presentes sin lesión actual (Braden/Norton alterado)",
    evolucion_es: "Se identifica alto riesgo de UPP. Se implementan cambios posturales cada 2 horas, colchón antiescaras y protección de prominencias óseas.",
    evolucion_en: "High pressure ulcer risk identified. Postural changes every 2 hours, pressure-relieving mattress and bony prominence protection implemented."
  },

  {
    diagnostico: "Riesgo de estreñimiento",
    codigo: "00015",
    dominio: "Dominio 3: Eliminación/Intercambio",
    prioridad: "Baja",
    abcde: "D-E",
    palabras_clave: [
      "riesgo de constipacion","propenso a estrenirse","antecedente de constipacion",
      "toma opioides","morfina con riesgo de constipacion","tramadol con constipacion",
      "toma hierro","hierro con constipacion","calcio con constipacion",
      "poca fibra en la dieta","come poca verdura","come poco",
      "toma poca agua","toma pocos liquidos","poco hidratado",
      "inmovilidad con riesgo de constipacion","postrado con riesgo de constipacion",
      "colon lento","colon perezoso","antecedente de fecaloma"
    ],
    rc: "Opioides, deshidratación, inmovilidad, baja ingesta de fibra",
    mp: "Factores de riesgo presentes para desarrollo de estreñimiento",
    evolucion_es: "Se identifica riesgo de estreñimiento por factores múltiples. Se promueve hidratación, movilidad y dieta con fibra. Se evalúa necesidad de laxante preventivo.",
    evolucion_en: "Constipation risk identified. Hydration, mobility and fiber diet promoted. Preventive laxative need evaluated."
  },

  {
    diagnostico: "Riesgo de síndrome de desuso",
    codigo: "00040",
    dominio: "Dominio 4: Actividad/Reposo",
    prioridad: "Media",
    abcde: "C-D-E",
    palabras_clave: [
      "inmovilidad prolongada","reposo absoluto","reposo en cama",
      "postrado en cama","mucho tiempo en cama","no se levanta",
      "atrofia muscular por reposo","debilidad por estar en cama",
      "contractura en cama","acortamiento muscular","equino",
      "pie en equino","pie caido","caida de pie","tobillo contracturado",
      "rigidez articular por inmovilidad","articulas rigidas",
      "trombosis por reposo","TVP","embolia por inmovilidad",
      "escaras por reposo","UPP por inmovilidad",
      "deterioro funcional por internacion","funcional antes de internar"
    ],
    rc: "Reposo prolongado, parálisis, enfermedad grave, inmovilización",
    mp: "Factores de riesgo para deterioro sistémico por inmovilidad prolongada",
    evolucion_es: "Se identifica riesgo de síndrome de desuso. Se implementa plan de movilización precoz con kinesioterapia y cambios posturales frecuentes.",
    evolucion_en: "Disuse syndrome risk identified. Early mobilization plan implemented with physical therapy and frequent postural changes."
  },

  {
    diagnostico: "Protección ineficaz",
    codigo: "00043",
    dominio: "Dominio 11: Seguridad/Protección",
    prioridad: "Alta",
    abcde: "C-E",
    palabras_clave: [
      "inmunocomprometido","inmunosuprimido","trasplantado","en quimioterapia",
      "neutropenia severa","neutrofilos bajos","sin defensas","sin sistema inmune",
      "CD4 bajo","VIH con CD4 bajo","SIDA","infeccion oportunista",
      "corticoides a altas dosis","terapia biologica",
      "rituximab","ciclosporina","tacrolimus","micofenolato",
      "aislamiento de proteccion","aislamiento inverso","habitacion con filtro HEPA",
      "mascarilla para entrar","se prohibe visitas con gripe",
      "pancitopenia","aplasia medular","CID","coagulopatia severa"
    ],
    rc: "Inmunosupresión, quimioterapia, trasplante, tratamiento esteroideo prolongado",
    mp: "Sistema inmune gravemente comprometido, incapacidad de responder a infecciones",
    evolucion_es: "Paciente presenta protección ineficaz por inmunosupresión severa. Se implementan medidas de aislamiento protector estricto y se extrema la higiene de manos.",
    evolucion_en: "Patient presents ineffective protection due to severe immunosuppression. Strict protective isolation implemented and hand hygiene maximized."
  },

  {
    diagnostico: "Riesgo de deterioro de la integridad cutánea",
    codigo: "00047",
    dominio: "Dominio 11: Seguridad/Protección",
    prioridad: "Media",
    abcde: "D-E",
    palabras_clave: [
      "piel en riesgo","piel friable","piel fragil","piel muy seca",
      "xerosis","piel escamosa","piel que se pela","descamacion",
      "piel con edema en riesgo","edema que puede romperse",
      "piel brillante tensa","riesgo de skin tear","piel que se rasga facil",
      "dermatitis de pañal","eritema de pañal","zona perianal en riesgo",
      "humedad constante en piel","pañal siempre mojado",
      "incontinente con piel en riesgo","diaper rash","dermatitis incontinencia",
      "Braden moderado","riesgo moderado segun escala",
      "radioterapia con piel en riesgo","piel post radioterapia"
    ],
    rc: "Edad avanzada, humedad, inmovilidad, desnutrición, fragilidad cutánea",
    mp: "Factores de riesgo para deterioro cutáneo sin lesión actual",
    evolucion_es: "Se identifica riesgo de deterioro cutáneo. Se aplica crema hidratante, se protegen prominencias y se mantiene piel seca y limpia.",
    evolucion_en: "Skin integrity deterioration risk identified. Moisturizer applied, prominences protected and skin kept dry and clean."
  },

  // ══════════════════════════════════════════════════════════════
  //  PSICOSOCIAL / AFRONTAMIENTO
  // ══════════════════════════════════════════════════════════════

  {
    diagnostico: "Afrontamiento ineficaz",
    codigo: "00069",
    dominio: "Dominio 9: Afrontamiento/Tolerancia al estrés",
    prioridad: "Media",
    abcde: "D-E",
    palabras_clave: [
      "no acepta el diagnostico","rechaza el diagnostico","en negacion",
      "no quiere saber nada","no quiere que le digan","no acepta la enfermedad",
      "no adhiere al tratamiento","no toma la medicacion","se niega al tratamiento",
      "deprimido","muy bajoneado","bajoneado por la enfermedad",
      "no ve salida","sin esperanza","desesperanzado","sin ganas de luchar",
      "llanto excesivo","llora todo el tiempo","muy emocionalmente labil",
      "agresivo por su situacion","enojado con el diagnostico",
      "actitud defensiva","agresivo con el personal","irritable todo el tiempo",
      "no colabora","no coopera","no acepta los cuidados"
    ],
    rc: "Diagnóstico grave, pérdida, cambio de rol, hospitalizaciones frecuentes",
    mp: "Negación, falta de adherencia, llanto, desesperanza, agresividad",
    evolucion_es: "Paciente presenta afrontamiento ineficaz con negación e incumplimiento del tratamiento. Se brinda contención, se involucra salud mental y se notifica a la familia.",
    evolucion_en: "Patient presents ineffective coping with denial and treatment non-compliance. Support provided, mental health team involved and family notified."
  },

  {
    diagnostico: "Duelo",
    codigo: "00136",
    dominio: "Dominio 9: Afrontamiento/Tolerancia al estrés",
    prioridad: "Media",
    abcde: "D-E",
    palabras_clave: [
      "duelo","en duelo","perdio a alguien","murio un familiar","fallecio su pareja",
      "muerte de un ser querido","perdida reciente","perdida significativa",
      "llora por la perdida","llanto por duelo","tristeza profunda",
      "no acepta la muerte","no cree que murio","negacion del duelo",
      "rabia por la perdida","enojado por la muerte","culpa por la perdida",
      "duelo patologico","duelo complicado","duelo prolongado",
      "perdida de un organo","perdida funcional significativa","amputacion con duelo"
    ],
    rc: "Muerte de un ser querido, pérdida de función, pérdida de rol, diagnóstico terminal",
    mp: "Llanto, tristeza, negación, ira, culpa, dificultad para aceptar la pérdida",
    evolucion_es: "Paciente en proceso de duelo tras pérdida significativa. Refiere tristeza y llanto frecuente. Se brinda contención y se deriva a psicología.",
    evolucion_en: "Patient in grief process after significant loss. Reports sadness and frequent crying. Support provided and psychology referral made."
  },

  {
    diagnostico: "Aislamiento social",
    codigo: "00053",
    dominio: "Dominio 12: Confort",
    prioridad: "Baja",
    abcde: "D-E",
    palabras_clave: [
      "solo","soledad","esta solo","no tiene visitas","nadie lo visita",
      "sin familia","sin red de apoyo","abandono familiar","abandonado",
      "aislado","se aisla","no quiere ver a nadie","no quiere compañia",
      "se cierra","no habla","no interactua","no socializa",
      "internacion prolongada sin visitas","mucho tiempo solo en la habitacion",
      "depresion con aislamiento","tristeza con aislamiento",
      "alto riesgo de vulnerabilidad social","situacion de calle","en situacion de calle"
    ],
    rc: "Falta de redes de apoyo, hospitalización prolongada, depresión, limitaciones físicas",
    mp: "Ausencia de visitas, conducta de aislamiento, tristeza, falta de interacción",
    evolucion_es: "Paciente presenta aislamiento social sin red de apoyo. Se potencia la interacción terapéutica y se notifica a trabajo social.",
    evolucion_en: "Patient presents social isolation without support network. Therapeutic interaction promoted and social work notified."
  },

  {
    diagnostico: "Baja autoestima situacional",
    codigo: "00120",
    dominio: "Dominio 6: Autopercepción",
    prioridad: "Baja",
    abcde: "D-E",
    palabras_clave: [
      "baja autoestima","se siente inutil","se siente una carga",
      "no quiere molestar","da vergüenza pedir ayuda","le da verguenza depender",
      "se siente mal de estar en cama","se avergüenza de su situacion",
      "no acepta la dependencia","no acepta que lo cuiden",
      "perdida de rol","ya no puede hacer lo que hacia","ya no sirvo",
      "perdida de funcion","perdio una funcion importante",
      "colostomizado con baja autoestima","mastectomia con imagen corporal afectada",
      "cambio en imagen corporal","imagen corporal alterada","no se reconoce",
      "no quiere mirarse al espejo","oculta la herida","oculta la ostomia"
    ],
    rc: "Pérdida de independencia, cambio de rol, enfermedad crónica, imagen corporal alterada",
    mp: "Verbalización de inutilidad, vergüenza, rechazo a pedir ayuda, evitación del espejo",
    evolucion_es: "Paciente presenta baja autoestima situacional por pérdida de independencia. Se validan sus emociones y se potencian sus capacidades residuales.",
    evolucion_en: "Patient presents situational low self-esteem due to loss of independence. Emotions validated and residual capabilities reinforced."
  },

  {
    diagnostico: "Riesgo de automutilación",
    codigo: "00139",
    dominio: "Dominio 11: Seguridad/Protección",
    prioridad: "Alta",
    abcde: "D-E",
    palabras_clave: [
      "se autolesiona","se hace daño","se corta","heridas autoinfligidas",
      "cicatrices de cortes","marca de cortes","historia de autolesiones",
      "ideacion suicida","pensamiento suicida","quiere hacerse daño",
      "dice que se quiere matar","amenaza con hacerse daño",
      "impulsivo","muy impulsivo","reactividad emocional alta",
      "trastorno limite de personalidad","TLP","borderline",
      "crisis de angustia con riesgo","crisis de llanto con riesgo"
    ],
    rc: "Trastornos de personalidad, abuso de sustancias, historia de trauma, crisis emocional",
    mp: "Conductas de autolesión, cicatrices, ideación suicida, impulsividad elevada",
    evolucion_es: "Se identifica riesgo de automutilación. Se mantiene entorno seguro, se retiran objetos peligrosos y se activa urgente salud mental.",
    evolucion_en: "Self-mutilation risk identified. Safe environment maintained, dangerous objects removed and mental health urgently activated."
  },

  // ══════════════════════════════════════════════════════════════
  //  GERIATRÍA / POBLACIONES ESPECIALES
  // ══════════════════════════════════════════════════════════════

  {
    diagnostico: "Síndrome de fragilidad del anciano",
    codigo: "00257",
    dominio: "Dominio 1: Promoción de la salud",
    prioridad: "Media",
    abcde: "C-D-E",
    palabras_clave: [
      "fragilidad","paciente fragil","anciano fragil","adulto mayor fragil",
      "sarcopenia","perdida de masa muscular","muy delgado para su edad",
      "caidas repetidas","muchas caidas en el ultimo año",
      "velocidad de marcha lenta","camina muy lento","marcha lentificada",
      "agotamiento en adulto mayor","cansancio en el anciano",
      "perdida de peso involuntaria en anciano","bajo peso en adulto mayor",
      "actividad fisica escasa","sedentario anciano","nunca sale",
      "dependencia funcional","dependiente","muchos medicamentos","polifarmacia",
      "mas de 5 pastillas","mas de 5 medicamentos","multimedicado",
      "Barthel bajo","Katz bajo","escala funcional baja",
      "no vive solo","requiere cuidador","necesita asistencia continua"
    ],
    rc: "Envejecimiento, desnutrición, inactividad, polifarmacia, pluripatología",
    mp: "Pérdida de peso, agotamiento, debilidad, lentitud, baja actividad física",
    evolucion_es: "Paciente anciano presenta síndrome de fragilidad con pérdida de peso, debilidad y lentitud de marcha. Se planifica abordaje interdisciplinario geriátrico.",
    evolucion_en: "Elderly patient presents frailty syndrome with weight loss, weakness and slow gait. Interdisciplinary geriatric approach planned."
  },

  {
    diagnostico: "Mantenimiento ineficaz de la salud",
    codigo: "00099",
    dominio: "Dominio 1: Promoción de la salud",
    prioridad: "Baja",
    abcde: "D-E",
    palabras_clave: [
      "no cuida su salud","descuida su salud","no sigue la dieta","no hace dieta",
      "no toma la medicacion","se olvida los remedios","abandona el tratamiento",
      "no va al medico","no controla la presion","no controla el azucar",
      "habitos poco saludables","fuma mucho","toma mucho alcohol","sedentario",
      "sobrepeso sin control","obesidad sin seguimiento",
      "no sabe como cuidarse","falta de conocimiento sobre su enfermedad",
      "no entiende su tratamiento","no entiende para que son los remedios",
      "alta sin seguimiento","sin obra social","sin acceso al sistema de salud",
      "vulnerabilidad social","condicion social desfavorable"
    ],
    rc: "Falta de recursos, conocimientos deficientes, desmotivación, barreras de acceso",
    mp: "Incapacidad de buscar ayuda, falta de adhesión a conductas de salud",
    evolucion_es: "Paciente presenta mantenimiento ineficaz de la salud con abandono del tratamiento. Se realiza educación para la salud y se coordina con trabajo social.",
    evolucion_en: "Patient presents ineffective health maintenance with treatment abandonment. Health education provided and social work coordinated."
  },

  {
    diagnostico: "Conocimientos deficientes",
    codigo: "00126",
    dominio: "Dominio 5: Percepción/Cognición",
    prioridad: "Baja",
    abcde: "D-E",
    palabras_clave: [
      "no sabe sobre su enfermedad","no entiende su diagnostico",
      "no entiende el tratamiento","no sabe para que son los remedios",
      "no sabe como tomar la medicacion","no sabe la dosis",
      "no sabe que puede comer","no sabe la dieta que tiene que hacer",
      "no sabe como cuidar la herida","no sabe como curar",
      "no sabe los signos de alarma","no sabe cuando llamar al medico",
      "educacion para la alta","educacion al egreso","instrucciones de alta",
      "analfabeto","no sabe leer","no entiende las instrucciones escritas",
      "barrera idiomatica","no habla español","educacion en otro idioma",
      "primera vez con esta enfermedad","diagnostico nuevo"
    ],
    rc: "Diagnóstico nuevo, alfabetización limitada, barreras idiomáticas, deterioro cognitivo",
    mp: "Incapacidad de explicar la enfermedad, preguntas inadecuadas, seguimiento incorrecto",
    evolucion_es: "Paciente presenta conocimientos deficientes sobre su enfermedad. Se realiza educación sanitaria adaptada y se verifica comprensión mediante reformulación.",
    evolucion_en: "Patient presents deficient health knowledge. Adapted health education provided and understanding verified through teach-back."
  },

  {
    diagnostico: "Disconfort",
    codigo: "00214",
    dominio: "Dominio 12: Confort",
    prioridad: "Baja",
    abcde: "D-E",
    palabras_clave: [
      "incomodo","incomoda","no esta comodo","no se siente bien",
      "disconfort","malestar general","sensacion de malestar","se siente mal",
      "no esta a gusto","no le gusta el hospital","quiere irse",
      "frio en la habitacion","calor en la habitacion","mucho ruido",
      "mucha luz","no puede descansar por el ambiente",
      "incomodo con el pañal","incomodo con la sonda","molestia por dispositivos",
      "molesta la via","duele donde tiene la via","incomodo con el suero",
      "sensacion de incomodidad general","bienestar comprometido"
    ],
    rc: "Entorno no terapéutico, dispositivos invasivos, temperatura inadecuada, dolor leve",
    mp: "Verbalización de malestar, conductas de incomodidad, expresión facial de disconfort",
    evolucion_es: "Paciente refiere disconfort general en el entorno hospitalario. Se realizan ajustes de temperatura, iluminación y posición. Se minimizan dispositivos innecesarios.",
    evolucion_en: "Patient reports general discomfort in hospital environment. Temperature, lighting and position adjustments made. Unnecessary devices minimized."
  },

];
});