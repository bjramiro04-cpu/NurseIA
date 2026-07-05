// ────────────────────────────────────────────────────────────────
// 1. BASE DE DATOS CLÍNICA NANDA
// ────────────────────────────────────────────────────────────────
const baseDeDatosClinica = [
  { diagnostico:"Patrón respiratorio ineficaz",codigo:"00032",dominio:"Dominio 4: Actividad/Reposo",prioridad:"Alta",abcde:"A-B",palabras_clave:["disnea","taquipnea","musculos accesorios","cianosis","respiracion superficial","saturacion baja","tos ineficaz","satura bajo","falta de aire","agitado"],rc:"Obstrucción de vías aéreas, fatiga muscular, ansiedad, secreciones",mp:"Disnea, taquipnea, uso de músculos accesorios, cianosis, respiración superficial, saturación baja, tos ineficaz",evolucion_es:"Paciente presenta alteración del patrón respiratorio evidenciado por disnea y taquipnea. Se observa uso de musculatura accesoria y respiración superficial, acompañado de descenso en la saturación de oxígeno basal y cianosis distal. Se procede a la monitorización continua y optimización de la oxigenoterapia.",evolucion_en:"Patient presents alteration of the respiratory pattern evidenced by dyspnea and tachypnea. Use of accessory muscles and shallow breathing are observed, accompanied by a decrease in baseline oxygen saturation and distal cyanosis. Continuous monitoring and optimization of oxygen therapy are initiated."},
  { diagnostico:"Ansiedad",codigo:"00146",dominio:"Dominio 9: Afrontamiento/Tolerancia al estrés",prioridad:"Media",abcde:"C-D-E",palabras_clave:["preocupacion excesiva","inquietud","tension muscular","insomnio","irritabilidad","miedo","taquicardia","sudoracion","ansioso","nervioso","ansiedad"],rc:"Estrés, hospitalización, miedo, incertidumbre, dolor",mp:"Preocupación excesiva, inquietud, tensión muscular, insomnio, irritabilidad, miedo, taquicardia, sudoración",evolucion_es:"Se observa al paciente con signos evidentes de ansiedad, manifestando verbalmente preocupación excesiva y miedo respecto a su estado de salud. Presenta inquietud motora, tensión muscular difusa, sudoración y taquicardia reactiva. Se brinda contención emocional y entorno seguro.",evolucion_en:"The patient is observed with clear signs of anxiety, verbally expressing excessive concern and fear regarding their health status. Motor restlessness, diffuse muscle tension, sweating, and reactive tachycardia are present. Emotional support and a safe environment are provided."},
  { diagnostico:"Deterioro de la integridad cutánea",codigo:"00046",dominio:"Dominio 11: Seguridad/Protección",prioridad:"Media",abcde:"D-E",palabras_clave:["ulceras","heridas","eritema","excoriacion","secrecion","piel fragil","presion prolongada","edema","escoriacion","ulcera","llaga","escara","herida"],rc:"Presión prolongada, inmovilidad, humedad, mala nutrición",mp:"Úlceras, heridas, eritema, excoriación, secreción, piel frágil, presión prolongada, edema",evolucion_es:"A la valoración física se evidencia deterioro de la integridad cutánea con presencia de eritema que no blanquea a la presión, excoriaciones y úlceras por presión en zonas de declive asociadas a inmovilidad prolongada. Se realizan curaciones según protocolo y cambios posturales.",evolucion_en:"Physical assessment reveals impaired skin integrity with erythema that does not blanch under pressure, excoriations, and pressure ulcers in dependency areas associated with prolonged immobility. Wound dressings are performed according to protocol along with postural changes."},
  { diagnostico:"Descanso ineficaz",codigo:"00095",dominio:"Dominio 4: Actividad/Reposo",prioridad:"Baja",abcde:"D-E",palabras_clave:["insomnio","sueno interrumpido","fatiga","somnolencia diurna","dificultad para conciliar","irritabilidad","sensacion de no descansar","no duerme","desvelado","no descanso"],rc:"Dolor, ansiedad, ambiente hospitalario, estrés",mp:"Insomnio, sueño interrupted, fatiga, somnolencia diurna, dificultad para conciliar, irritabilidad, sensación de no descansar",evolucion_es:"El paciente refiere un patrón de descanso ineficaz, manifestando insomnio, despertares frecuentes y dificultad para conciliar el sueño debido al entorno. Refiere sensación de sueño no reparador y se observa somnolencia diurna acompañada de irritabilidad.",evolucion_en:"The patient reports an ineffective sleep pattern, manifesting insomnia, frequent awakenings, and difficulty falling asleep due to the environment. Reports a feeling of non-restorative sleep, and daytime drowsiness accompanied by irritability is observed."},
  { diagnostico:"Deterioro de la movilidad física",codigo:"00085",dominio:"Dominio 4: Actividad/Reposo",prioridad:"Media",abcde:"C-D-E",palabras_clave:["debilidad muscular","limitacion de movimientos","dolor al moverse","dependencia","riesgo de caidas","postura incorrecta","no se mueve","postrada","postrado","inmovil"],rc:"Debilidad muscular, dolor, lesión, inmovilidad",mp:"Debilidad muscular, limitación de movimientos, dolor al moverse, dependencia, riesgo de caídas, postura incorrecta",evolucion_es:"Paciente presenta limitación significativa para la deambulación y movimientos coordinados, manifestando debilidad muscular generalizada y dolor al realizar transferencias. Requiere asistencia parcial/total para la movilización en cama y sedestación.",evolucion_en:"Patient presents significant limitation for ambulation and coordinated movements, manifesting generalized muscle weakness and pain during transfers. Requires partial/total assistance for mobilization in bed and sitting up."},
  { diagnostico:"Riesgo de caída",codigo:"00155",dominio:"Dominio 11: Seguridad/Protección",prioridad:"Media",abcde:"C-D-E",palabras_clave:["inestabilidad","mareos","debilidad","desequilibrio","historial de caidas","medicacion sedante","entorno inseguro","mareado","inestable","se cae"],rc:"Mareos, debilidad, alteración de la marcha, medicación",mp:"Riesgo aumentado evidenciado por factores de riesgo concurrentes (fisiológicos/ambientales)",evolucion_es:"Se identifica un elevado riesgo de caídas debido a inestabilidad en la marcha, desequilibrio y debilidad generalizada, sumado a efectos de medicación sedante. Se activan barandillas de seguridad, sujeción si procede y timbre de llamada al alcance.",evolucion_en:"A high risk of falls is identified due to gait instability, imbalance, and generalized weakness, combined with the effects of sedative medication. Safety rails, restraints if appropriate, and call bell within reach are activated."},
  { diagnostico:"Hipotermia",codigo:"00006",dominio:"Dominio 11: Seguridad/Protección",prioridad:"Alta",abcde:"C",palabras_clave:["temperatura corporal baja","escalofrios","piel fria","palidez","somnolencia","bradicardia","confusion","frio","con frio","baja temperatura"],rc:"Exposición al frío, shock, cirugía, metabolismo alterado",mp:"Temperatura corporal por debajo del rango normal, escalofríos, piel fría, palidez, somnolencia, bradicardia, confusión",evolucion_es:"Se constata hipotermia clínica mediante control termométrico por debajo de los valores normales. El paciente presenta piel fría, palidez cutáneo-mucosa, escalofríos generalizados y tendencia a la somnolencia. Se aplican medidas de recalentamiento pasivo y activo.",evolucion_en:"Clinical hypothermia is confirmed by thermometric monitoring below normal values. The patient presents cold skin, mucocutaneous pallor, generalized chills, and a tendency toward drowsiness. Passive and active rewarming measures are applied."},
  { diagnostico:"Hipotensión (Perfusión tisular ineficaz)",codigo:"00201",dominio:"Dominio 4: Actividad/Reposo",prioridad:"Alta",abcde:"C",palabras_clave:["presion arterial baja","mareo","debilidad","palidez","desmayo","taquicardia compensatoria","fatiga","presion baja","hipotenso","hipotensa"],rc:"Hemorragia, deshidratación, shock, fármacos",mp:"Presión arterial por debajo de rangos normales, mareo, debilidad, palidez, desmayo, taquicardia compensatoria, fatiga",evolucion_es:"El paciente se encuentra hipotenso con registros de presión arterial marcadamente bajos. Acompañado de palidez mucocutánea, mareos al cambio de posición y debilidad extrema. Se adopta posición de Trendelenburg y se inicia reposición de volumen según indicación médica.",evolucion_en:"The patient is hypotensive with markedly low blood pressure records. Accompanied by mucocutaneous pallor, dizziness upon position change, and extreme weakness. Trendelenburg position is adopted and volume replacement is initiated per medical indication."},
  { diagnostico:"Hipertensión (Perfusión)",codigo:"00078",dominio:"Dominio 1: Promoción de la salud",prioridad:"Alta",abcde:"C",palabras_clave:["presion arterial elevada","cefalea","vision borrosa","palpitaciones","riesgo cardiovascular","estres","retencion de liquidos","presion alta","hipertenso","hipertensa"],rc:"Estrés, dieta alta en sodio, sedentarismo",mp:"Presión arterial por sobre los rangos normales, cefalea, visión borrosa, palpitaciones",evolucion_es:"Se registran cifras tensionales elevadas fuera de los límites de normalidad. Paciente refiere cefalea holocraneal pulsátil y visión borrosa. Se mantiene en reposo absoluto, se restringen estímulos ambientales y se administra antihipertensivo de urgencia.",evolucion_en:"Elevated blood pressure numbers outside normal limits are recorded. Patient reports pulsatile holocranial headache and blurred vision. Absolute rest is maintained, environmental stimuli are restricted, and emergency antihypertensive treatment is administered."},
  { diagnostico:"Diarrea",codigo:"00013",dominio:"Dominio 3: Eliminación/Intercambio",prioridad:"Media",abcde:"C-D",palabras_clave:["evacuaciones liquidas","aumento de frecuencia","deshidratacion","dolor abdominal","urgencia fecal","malabsorcion","irritacion perianal","de cuerpo liquido","retorcijones","diarrea"],rc:"Infección, intolerancia alimentaria, medicación",mp:"Evacuaciones líquidas, aumento de frecuencia, deshidratación, dolor abdominal, urgencia fecal, malabsorción, irritación perianal",evolucion_es:"Paciente presenta cuadro de diarrea caracterizado por múltiples evacuaciones de consistencia líquida en períodos cortos. Refiere dolor abdominal tipo cólico y urgencia fecal. Se vigilan signos de deshidratación y se realiza protección de la zona perianal.",evolucion_en:"Patient presents a picture of diarrhea characterized by multiple loose stools in short periods. Reports crampy abdominal pain and fecal urgency. Signs of dehydration are monitored and protection of the perianal area is performed."},
  { diagnostico:"Riesgo de glucemia inestable",codigo:"00179",dominio:"Dominio 2: Nutrición",prioridad:"Media",abcde:"C-D",palabras_clave:["hipoglucemia","hiperglucemia","sudoracion","mareos","poliuria","polidipsia","azucar alta","azucar baja","diabetes","diabetico"],rc:"Diabetes, tratamiento con insulina, alimentación inadecuada",mp:"Variaciones significativas en los controles capilares de glucosa, sudoración, mareos, poliuria, polidipsia",evolucion_es:"Se identifica riesgo de inestabilidad glucémica en paciente diagnosticado con diabetes. Se realizan controles de glucometría capilar evidenciando fluctuaciones asociadas a ingesta alimentaria irregular. Se monitorizan signos de hipo/hiperglucemia aguda.",evolucion_en:"Risk of unstable blood glucose is identified in a patient diagnosed with diabetes. Capillary blood glucose checks are performed showing fluctuations associated with irregular food intake. Signs of acute hypo/hyperglycemia are monitored."},
  { diagnostico:"Dolor agudo",codigo:"00132",dominio:"Dominio 12: Confort",prioridad:"Media",abcde:"C-D",palabras_clave:["dolor","quejido","irritabilidad","eva alta","proteccion corporal","duele","puntada","dolor agudo"],rc:"Lesión tisular, cirugía, inflamación",mp:"Expresión verbal y gestual de dolor, quejidos, irritabilidad, puntuación elevada en escala EVA, adopción de posturas antiálgicas",evolucion_es:"Paciente manifiesta dolor agudo localizado, de inicio súbito, evidenciado gestualmente por facies de sufrimiento, quejidos y conductas de protección. Puntuación en escala EVA severa. Se administra analgesia prescrita y se revalúa eficacia al cabo de 30 minutos.",evolucion_en:"Patient reports localized acute pain of sudden onset, gesturally evidenced by suffering facies, moaning, and protective behaviors. Severe score on the VAS scale. Prescribed analgesia is administered and efficacy is re-evaluated after 30 minutes."},
  { diagnostico:"Dolor crónico",codigo:"00133",dominio:"Dominio 12: Confort",prioridad:"Baja",abcde:"D-E",palabras_clave:["dolor persistente","dolor continuo","frustracion","dolor cronico","hace meses que me duele"],rc:"Enfermedad crónica, daño nervioso",mp:"Dolor persistente de larga evolución, fatiga generalizada, insomnio de conciliación, manifestaciones de frustración",evolucion_es:"Paciente refiere persistencia de dolor crónico que interfiere de forma negativa con sus actividades básicas de la vida diaria y patrón de sueño. Manifiesta fatiga y frustración verbalizada. Se promueven medidas de confort físico y distracciones.",evolucion_en:"Patient reports persistence of chronic pain that negatively interferes with their basic activities of daily living and sleep pattern. Manifests fatigue and verbalized frustration. Physical comfort measures and distractions are promoted."},
  { diagnostico:"Déficit de autocuidado: baño/higiene",codigo:"00108",dominio:"Dominio 4: Actividad/Reposo",prioridad:"Baja",abcde:"D-E",palabras_clave:["dependencia","mala higiene","dificultad motora","no se puede banar","sucio","higienizar","limpieza corporal"],rc:"Debilidad, deterioro físico, limitación funcional",mp:"Incapacidad para lavar el cuerpo por sí mismo de forma autónoma, requerimiento de asistencia externa",evolucion_es:"Se evidencia déficit en el autocuidado relacionado con la higiene corporal y el baño, condicionado por limitación motora y debilidad física. Se asiste al paciente en la realización del aseo completo en cama/ducha preservando su intimidad.",evolucion_en:"A deficit in self-care related to body hygiene and bathing is evident, conditioned by motor limitation and physical weakness. The patient is assisted in completing a full bed/shower bath while preserving privacy."},
  { diagnostico:"Déficit de autocuidado: alimentación",codigo:"00102",dominio:"Dominio 4: Actividad/Reposo",prioridad:"Media",abcde:"C-D",palabras_clave:["incapacidad para comer","dependencia para comer","no come solo","dificultad para tragar","ayuda para comer"],rc:"Alteración neuromuscular, debilidad extrema, deterioro cognitivo",mp:"Incapacidad manifiesta para llevar los alimentos a la boca, cortar la comida o utilizar utensilios de manera independiente",evolucion_es:"El paciente presenta imposibilidad para alimentarse de forma independiente a causa de alteración neuromuscular y fatiga extrema. Requiere ayuda total para la preparación, troceado e ingesta de la dieta asignada. Se vigila tolerancia.",evolucion_en:"The patient presents an inability to feed themselves independently due to neuromuscular alteration and extreme fatigue. Requires full help for preparation, cutting, and intake of the assigned diet. Tolerance is monitored."},
  { diagnostico:"Fatiga",codigo:"00093",dominio:"Dominio 4: Actividad/Reposo",prioridad:"Baja",abcde:"D-E",palabras_clave:["cansancio","debilidad generalizada","agotamiento","sin fuerzas","cansado"],rc:"Enfermedad crónica, estrés, anemia, desnutrición",mp:"Manifestación verbal de un cansancio abrumador y sostenido, disminución de la capacidad para el trabajo físico y mental",evolucion_es:"El paciente describe un estado de fatiga constante y agotamiento que no cede con el reposo habitual. Se aprecia marcada debilidad en la realización de actividades mínimas. Se planifican periodos de descanso intercalados con sus cuidados.",evolucion_en:"The patient describes a state of constant fatigue and exhaustion that does not resolve with regular rest. Marked weakness in performing minimal activities is noted. Rest periods are planned between care."},
  { diagnostico:"Limpieza ineficaz de las vías aéreas",codigo:"00031",dominio:"Dominio 3: Eliminación/Intercambio",prioridad:"Alta",abcde:"A-B",palabras_clave:["secreciones","tos ineficaz","ruidos respiratorios","flemas","roncus","estertores","moquillo","catarro"],rc:"Acumulación de moco, debilidad muscular, tabaquismo, infección",mp:"Presencia de secreciones traqueobronquiales abundantes, tos ineficaz para la expectoración, ruidos adventicios (roncus/estertores)",evolucion_es:"Paciente presenta compromiso en la permeabilidad de la vía aérea debido a limpieza ineficaz de las mismas. Se auscultan ruidos respiratorios patológicos (roncus) debido a secreciones retenidas acumuladas y reflejo de tos ineficaz. Se realiza hidratación y aspiración si se requiere.",evolucion_en:"Patient presents compromise in airway patency due to ineffective clearance. Pathological breath sounds (rhonchi) are auscultated due to accumulated retained secretions and an ineffective cough reflex. Hydration and suctioning are performed if required."},
  { diagnostico:"Intercambio gaseoso deteriorado",codigo:"00030",dominio:"Dominio 3: Eliminación/Intercambio",prioridad:"Alta",abcde:"A-B",palabras_clave:["hipoxia","cianosis central","saturacion baja extrema","hipercapnia","gasometria alterada"],rc:"Alteración de la ventilación/perfusión, cambios en la membrana alveolocapilar",mp:"Hipoxia, cianosis mucocutánea, valores de saturación de oxígeno críticamente bajos, somnolencia por hipercapnia",evolucion_es:"Se evidencia un deterioro crítico del intercambio gaseoso a nivel alveolar. El paciente cursa con hipoxia severa manifiesta por una saturación de oxígeno baja persistente a pesar de aportes externos, acompañada de cianosis peribucal. Intervención médica urgente.",evolucion_en:"Critical impairment of gas exchange at the alveolar level is evident. The patient experiences severe hypoxia manifested by persistent low oxygen saturation despite external inputs, accompanied by perioral cyanosis. Urgent medical intervention."},
  { diagnostico:"Riesgo de infección",codigo:"00004",dominio:"Dominio 11: Seguridad/Protección",prioridad:"Media",abcde:"E",palabras_clave:["via periferica","cateter","sonda vesical","inmunosupresion","herida quirurgica","riesgo infeccion"],rc:"Procedimientos invasivos, defensas primarias rotas, desnutrición",mp:"Presencia de dispositivos invasivos expuestos, soluciones de continuidad en la piel",evolucion_es:"Se valora riesgo de infección incrementado a causa de la permanencia de dispositivos invasivos activos (catéter venoso periférico, sonda vesical). Se mantiene técnica estrictamente aséptica en la manipulación y cura de los accesos.",evolucion_en:"Increased risk of infection is assessed due to the permanence of active invasive devices (peripheral venous catheter, urinary catheter). Strictly aseptic technique is maintained in the manipulation and care of accesses."},
  { diagnostico:"Infección",codigo:"00004",dominio:"Dominio 11: Seguridad/Protección (Clínico)",prioridad:"Alta",abcde:"C-E",palabras_clave:["fiebre","secrecion purulenta","inflamacion","eritema localizado","calor local","hipertermia","infectado"],rc:"Defensas bajas, colonización bacteriana/viral, heridas contaminadas",mp:"Hipertermia (fiebre), secreciones de características purulentas, eritema notable, calor, rubor y edema localizados",evolucion_es:"Paciente cursa con cuadro infeccioso agudo manifestado por picos de hipertermia (fiebre), taquicardia asociada y presencia de signos inflamatorios locales con secreción purulenta en zona afectada. Se toman muestras para cultivo y se administra antibioterapia.",evolucion_en:"Patient presents with an acute infectious picture manifested by spikes of hyperthermia (fever), associated tachycardia, and the presence of local inflammatory signs with purulent secretion in the affected area. Samples are taken for culture and antibiotic therapy is administered."},
  { diagnostico:"Náuseas",codigo:"00134",dominio:"Dominio 12: Confort",prioridad:"Media",abcde:"C",palabras_clave:["vomitos","malestar gastrico","palidez gastrica","ganas de vomitar","arcadas","nauseas","nausea"],rc:"Efectos secundarios de medicación, trastornos digestivos, ansiedad",mp:"Manifestación de malestar gástrico inespecífico, arcadas repetidas, episodios de vómitos, palidez cutánea y sialorrea",evolucion_es:"El paciente expresa marcada sensación de náuseas y malestar gástrico, acompañándose de arcadas y sialorrea. Se reportan episodios aislados de vómitos. Se coloca en posición adecuada para evitar aspiración y se administra antiemético.",evolucion_en:"The patient expresses a marked feeling of nausea and gastric discomfort, accompanied by retching and sialorrhea. Isolated episodes of vomiting are reported. Placed in an appropriate position to prevent aspiration and antiemetic is administered."},
  { diagnostico:"Confusión aguda",codigo:"00128",dominio:"Dominio 5: Percepción/Cognición",prioridad:"Alta",abcde:"D",palabras_clave:["desorientacion","agitacion psicomotriz","cambios conductuales","delirium","no reconoce","desorientado","desorientada","confuso"],rc:"Hipoxia, infección, fiebre alta, deshidratación, polifarmacia",mp:"Desorientación temporo-espacial de inicio abrupto, fluctuaciones cognitivas, agitación psicomotriz o hipoactividad marcada",evolucion_es:"Paciente presenta cuadro de confusión aguda (delirium) instaurado de manera súbita. Se muestra desorientado en tiempo, espacio y persona, manifestando agitación psicomotriz e incoherencia discursiva. Se reevalúan constantes vitales y analítica.",evolucion_en:"Patient presents acute confusion (delirium) established suddenly. Appears disoriented in time, space, and person, manifesting psychomotor agitation and discursive incoherence. Vital signs and laboratory tests are re-evaluated."},
  { diagnostico:"Riesgo de aspiración",codigo:"00039",dominio:"Dominio 11: Seguridad/Protección",prioridad:"Alta",abcde:"A-B",palabras_clave:["disfagia","tos al comer","vomitos profusos","alteracion deglucion","disminucion de conciencia","atorarse","se atora"],rc:"Alteración de la deglución, disminución del nivel de conciencia, alimentación enteral",mp:"Presencia de tos o arcadas durante la ingesta de alimentos, reflejo de deglución deprimido",evolucion_es:"Se valora un alto riesgo de aspiración respiratoria secundario a episodios de disfagia y tos refleja durante la alimentación por vía oral. Se decide elevar la cabecera a 45 grados (posición Fowler) durante las comidas y adaptar texturas.",evolucion_en:"A high risk of respiratory aspiration secondary to episodes of dysphagia and reflex cough during oral feeding is assessed. It is decided to elevate the head of the bed to 45 degrees (Fowler's position) during meals and adapt textures."},
  { diagnostico:"Desequilibrio nutricional: inferior a las necesidades",codigo:"00002",dominio:"Dominio 2: Nutrición",prioridad:"Media",abcde:"C-D",palabras_clave:["perdida de peso","desnutricion","debilidad por no comer","bajo peso","caquexia","no come nada","flaco"],rc:"Ingesta insuficiente, incapacidad para absorber nutrientes, enfermedad crónica",mp:"Pérdida de peso involuntaria con respecto al peso basal, signos físicos de desnutrición, debilidad generalizada, ingesta deficiente",evolucion_es:"Se registra desequilibrio nutricional por defecto evidenciado por pérdida de peso ponderal progresiva y caquexia. El paciente realiza ingestas calóricas muy inferiores a sus necesidades basales diarias. Se solicita valoración por nutricionista.",evolucion_en:"Nutritional imbalance due to defect evidenced by progressive ponderal weight loss and cachexia is recorded. The patient makes caloric intakes far below their baseline daily needs. Nutritionist assessment is requested."},
  { diagnostico:"Retención urinaria",codigo:"00023",dominio:"Dominio 3: Eliminación/Intercambio",prioridad:"Alta",abcde:"C",palabras_clave:["globo vesical","dificultad para orinar","no puede orinar","anuria","dolor supra pubico","retencion urinaria"],rc:"Obstrucción de la salida, efectos farmacológicos, postoperatorio",mp:"Presencia de globo vesical palpable a la exploración abdominal, dolor suprapúbico intenso, incapacidad absoluta para emitir orina",evolucion_es:"Paciente presenta retención urinaria aguda. A la exploración física se evidencia distensión suprapúbica dolorosa compatible con globo vesical, acompañada de tenesmo vesical y agitación. Se procede al sondaje vesical evacuador según orden médica.",evolucion_en:"Patient presents acute urinary retention. Physical examination reveals painful suprapubic distension compatible with bladder globe, accompanied by bladder tenesmus and agitation. Evacuating urinary catheterization is performed per medical order."},
];

// ────────────────────────────────────────────────────────────────
// 2. STATE
// ────────────────────────────────────────────────────────────────
let isSpanish = true;
let currentTab = 'analisis';
let sidebarExpanded = true;
let history = JSON.parse(localStorage.getItem('nurseIA_history') || '[]');
let chatHistory = [];

// ────────────────────────────────────────────────────────────────
// 3. INIT
// ────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('darkMode') === 'true') document.documentElement.classList.add('dark');
  normalizeTriageData();
  showTab('analisis');
  renderTriageMap();
  renderHistory();
  document.getElementById('evolutionText').addEventListener('input', e => {
    document.getElementById('charCount').textContent = e.target.value.length;
  });
});

// ────────────────────────────────────────────────────────────────
// 4. TAB NAVIGATION
// ────────────────────────────────────────────────────────────────
const tabConfig = {
  analisis:   { title: 'Análisis Clínico',   sub: 'Diagnósticos NANDA · Priorización ABCDE' },
  triage:     { title: 'Mapa de Triaje',     sub: 'Virtual Triage Map · Estado del piso en tiempo real' },
  asistente:  { title: 'Asistente IA',       sub: 'Consultá cualquier duda clínica' },
  historial:  { title: 'Historial',          sub: 'Evoluciones guardadas de este turno' },
};

function showTab(tab) {
  ['analisis','triage','asistente','historial'].forEach(t => {
    document.getElementById(`tab-${t}`).classList.add('hidden');
    const btn = document.getElementById(`nav-${t}`);
    btn.classList.remove('bg-iris-50','dark:bg-iris-900/20','text-iris-700','dark:text-iris-300','font-semibold');
    btn.classList.add('text-slate-600','dark:text-slate-400');
  });
  document.getElementById(`tab-${tab}`).classList.remove('hidden');
  const activeBtn = document.getElementById(`nav-${tab}`);
  activeBtn.classList.add('bg-iris-50','dark:bg-iris-900/20','text-iris-700','dark:text-iris-300','font-semibold');
  activeBtn.classList.remove('text-slate-600','dark:text-slate-400');
  document.getElementById('pageTitle').textContent = tabConfig[tab].title;
  document.getElementById('pageSubtitle').textContent = tabConfig[tab].sub;
  currentTab = tab;
}

// ────────────────────────────────────────────────────────────────
// 5. SIDEBAR
// ────────────────────────────────────────────────────────────────
function toggleSidebar() {
  sidebarExpanded = !sidebarExpanded;
  const s = document.getElementById('sidebar');
  const labels = document.querySelectorAll('.sidebar-label');
  if (sidebarExpanded) {
    s.classList.remove('sidebar-collapsed');
    s.classList.add('sidebar-expanded');
    labels.forEach(l => l.classList.remove('hidden'));
  } else {
    s.classList.remove('sidebar-expanded');
    s.classList.add('sidebar-collapsed');
    labels.forEach(l => l.classList.add('hidden'));
  }
}

// ────────────────────────────────────────────────────────────────
// 6. DARK MODE & LANGUAGE
// ────────────────────────────────────────────────────────────────
function toggleDarkMode() {
  document.documentElement.classList.toggle('dark');
  localStorage.setItem('darkMode', document.documentElement.classList.contains('dark'));
}

function toggleLanguage() {
  isSpanish = !isSpanish;
  document.getElementById('langLabel').textContent = isSpanish ? 'Español' : 'English';
}

// ────────────────────────────────────────────────────────────────
// 7. UTILS
// ────────────────────────────────────────────────────────────────
function limpiarAcentos(str) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function pillClass(abcde) {
  const map = { 'A-B':'pill-ab','C':'pill-c','C-D':'pill-cd','D':'pill-d','D-E':'pill-de','C-D-E':'pill-cde','B-C':'pill-bc','E':'pill-e','C-E':'pill-c' };
  return map[abcde] || 'pill-de';
}

function prioColor(p) {
  if (p === 'Alta')  return 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800';
  if (p === 'Media') return 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800';
  return 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800';
}

// ────────────────────────────────────────────────────────────────
// 8. ANALYSIS ENGINE
// ────────────────────────────────────────────────────────────────
function analyzeEvolution() {
  const rawText = document.getElementById('evolutionText').value.trim();
  if (!rawText) { alert('Ingresá la descripción del paciente antes de analizar.'); return; }

  const cleanText = limpiarAcentos(rawText.toLowerCase());
  const btn = document.getElementById('analyzeBtn');
  btn.disabled = true;
  document.getElementById('analyzeIcon').classList.add('hidden');
  document.getElementById('loadingIcon').classList.remove('hidden');
  document.getElementById('btnText').textContent = 'Analizando...';

  setTimeout(() => {
    btn.disabled = false;
    document.getElementById('analyzeIcon').classList.remove('hidden');
    document.getElementById('loadingIcon').classList.add('hidden');
    document.getElementById('btnText').textContent = 'Analizar';

    const encontrados = baseDeDatosClinica.filter(item =>
      item.palabras_clave.some(kw => cleanText.includes(limpiarAcentos(kw)))
    );

    if (!encontrados.length) {
      alert('No se detectaron patrones clínicos. Describí más signos o síntomas específicos.');
      return;
    }

    const prioOrder = { Alta: 0, Media: 1, Baja: 2 };
    encontrados.sort((a, b) => prioOrder[a.prioridad] - prioOrder[b.prioridad]);

    document.getElementById('diagCount').textContent = encontrados.length;
    const container = document.getElementById('diagnosesContainer');
    container.innerHTML = '';

    encontrados.forEach((diag, i) => {
      const matchCount = diag.palabras_clave.filter(k => cleanText.includes(limpiarAcentos(k))).length;
      const pct = Math.min(60 + matchCount * 12, 99);
      const circumference = 2 * Math.PI * 15.5;
      const offset = circumference - (circumference * pct / 100);

      container.insertAdjacentHTML('beforeend', `
        <div class="diag-card bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 hover:shadow-md hover:border-iris-200 dark:hover:border-iris-700 transition-all">
          <div class="flex items-start justify-between gap-3">
            <div class="flex items-start gap-3 flex-1 min-w-0">
              <div class="w-7 h-7 bg-iris-100 dark:bg-iris-900/40 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <span class="text-iris-700 dark:text-iris-300 text-xs font-bold">${i+1}</span>
              </div>
              <div class="flex-1 min-w-0">
                <h4 class="text-sm font-semibold text-slate-900 dark:text-white leading-snug">${diag.diagnostico}</h4>
                <div class="flex flex-wrap items-center gap-2 mt-1.5">
                  <span class="text-xs px-2 py-0.5 rounded-full font-medium border ${prioColor(diag.prioridad)}">${diag.prioridad}</span>
                  <span class="text-xs px-2 py-0.5 rounded-full font-medium ${pillClass(diag.abcde)}">ABCDE: ${diag.abcde}</span>
                  <span class="text-xs text-slate-400">${diag.codigo}</span>
                </div>
              </div>
            </div>
            <div class="relative w-11 h-11 flex-shrink-0">
              <svg class="w-11 h-11 -rotate-90" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="15.5" fill="none" stroke-width="3" class="ring-track"/>
                <circle cx="18" cy="18" r="15.5" fill="none" stroke-width="3" stroke-linecap="round" class="ring-fill" stroke-dasharray="${circumference}" stroke-dashoffset="${offset}"/>
              </svg>
              <span class="absolute inset-0 flex items-center justify-center text-xs font-bold text-iris-600 dark:text-iris-400">${pct}%</span>
            </div>
          </div>
          <div class="mt-3 space-y-1 pl-10">
            <p class="text-xs text-slate-600 dark:text-slate-400"><span class="font-semibold text-slate-700 dark:text-slate-300">R/C:</span> ${diag.rc}</p>
            <p class="text-xs text-slate-600 dark:text-slate-400"><span class="font-semibold text-slate-700 dark:text-slate-300">M/P:</span> ${diag.mp}</p>
            <p class="text-xs text-slate-500 dark:text-slate-500 pt-1 border-t border-slate-100 dark:border-slate-800 mt-1">${diag.dominio}</p>
          </div>
        </div>
      `);
    });

    const evolucion = encontrados.map(d => isSpanish ? d.evolucion_es : d.evolucion_en).join('\n\n');
    document.getElementById('generatedEvolution').textContent = evolucion;

    const alertBox = document.getElementById('priorityAlert');
    const hayAB = encontrados.some(d => (d.abcde === 'A-B' || d.abcde === 'B-C') && d.prioridad === 'Alta');
    const hayC  = encontrados.some(d => (d.abcde === 'C' || d.abcde === 'C-D' || d.abcde === 'C-E') && d.prioridad === 'Alta');
    const hayD  = encontrados.some(d => d.abcde === 'D' && d.prioridad === 'Alta');

    const messages = {
      'A-B': 'Compromiso respiratorio crítico. Evaluar saturación y patrón ventilatorio de forma inmediata.',
      'C':   'Compromiso hemodinámico detectado. Controlar PA, perfusión y signos de shock.',
      'D':   'Alteración neurológica aguda. Evaluar Glasgow y estado de conciencia.',
    };
    if (hayAB || hayC || hayD) {
      const cat = hayAB ? 'A-B' : hayC ? 'C' : 'D';
      document.getElementById('priorityBadge').textContent = cat;
      document.getElementById('priorityText').textContent = messages[cat];
      alertBox.classList.remove('hidden');
    } else {
      alertBox.classList.add('hidden');
    }

    document.getElementById('resultsSection').classList.remove('hidden');
    document.getElementById('resultsSection').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 900);
}

function clearAll() {
  document.getElementById('evolutionText').value = '';
  document.getElementById('charCount').textContent = '0';
  document.getElementById('resultsSection').classList.add('hidden');
  document.getElementById('priorityAlert').classList.add('hidden');
}

function copyEvolution() {
  const text = document.getElementById('generatedEvolution').textContent;
  navigator.clipboard.writeText(text).then(() => {
    document.getElementById('copyIcon').classList.add('hidden');
    document.getElementById('checkIcon').classList.remove('hidden');
    document.getElementById('copyText').textContent = '¡Copiado!';
    setTimeout(() => {
      document.getElementById('copyIcon').classList.remove('hidden');
      document.getElementById('checkIcon').classList.add('hidden');
      document.getElementById('copyText').textContent = 'Copiar';
    }, 2000);
  });
}

function saveResults() {
  const text = document.getElementById('generatedEvolution').textContent;
  if (!text) return;
  const diagCount = document.getElementById('diagCount').textContent;
  const entry = { id: Date.now(), date: new Date().toLocaleString('es-AR'), text, diagCount };
  history.unshift(entry);
  localStorage.setItem('nurseIA_history', JSON.stringify(history));
  renderHistory();
  showTab('historial');
}

// ────────────────────────────────────────────────────────────────
// 9. TRIAGE MAP
// ────────────────────────────────────────────────────────────────
const triageLogic = window?.triageLogic || null;
let triageData = [
  { hab: '101', camas: [
    { id:'101A', nombre:'García, R.', prioridadAtencion:'Alta',   nanda:['00032 Patrón resp. ineficaz','00155 Riesgo de caída'], ia:'Fiebre 38.8°C a las 03:20 hs. Se inició antibiótico. Presenta desorientación nocturna.', edad:78, diagnosticoMedico:'Neumonía bilateral', nota:'' },
    { id:'101B', nombre:'López, M.', prioridadAtencion:'Baja',   nanda:['00093 Fatiga'], ia:'Paciente estable. Toleró dieta completa. Sin novedades en el turno.', edad:65, diagnosticoMedico:'Post-quirúrgico colecistectomía', nota:'' },
  ]},
  { hab: '102', camas: [
    { id:'102A', nombre:'Martínez, A.', prioridadAtencion:'Media', nanda:['00132 Dolor agudo','00146 Ansiedad'], ia:'Dolor 6/10 al movilizarse. Recibió analgesia a las 06:00 con respuesta parcial.', edad:54, diagnosticoMedico:'Fractura de cadera operada', nota:'' },
    { id:'102B', nombre:'——', prioridadAtencion:'Baja', estado:'vacia', nanda:[], ia:'', edad:null, diagnosticoMedico:'', nota:'' },
  ]},
  { hab: '103', camas: [
    { id:'103A', nombre:'Rodríguez, C.', prioridadAtencion:'Baja', nanda:['00085 Deterioro movilidad física'], ia:'Realizó fisioterapia. Deambula con andador. Familia presente y colaboradora.', edad:70, diagnosticoMedico:'ACV isquémico en rehabilitación', nota:'' },
    { id:'103B', nombre:'Fernández, L.', prioridadAtencion:'Baja', nanda:['00095 Descanso ineficaz'], ia:'Durmió mal por ruidos del pasillo. Sin alteraciones clínicas. Solicita analgesia leve.', edad:48, diagnosticoMedico:'Diabetes mellitus tipo 2 descompensada', nota:'' },
  ]},
  { hab: '104', camas: [
    { id:'104A', nombre:'Sánchez, P.', prioridadAtencion:'Alta',    nanda:['00030 Intercambio gaseoso','00031 Limpieza vía aérea'], ia:'SpO2 88% basal. Se escaló O2 a mascarilla 8L. Pendiente valoración médica urgente.', edad:82, diagnosticoMedico:'EPOC exacerbado', nota:'' },
    { id:'104B', nombre:'Torres, J.',   prioridadAtencion:'Media', nanda:['00179 Riesgo glucemia'], ia:'Glucemia 280 mg/dL en ayunas. Se corrigió con insulina corrección. Recontrol en 2 hs.', edad:61, diagnosticoMedico:'Diabetes mellitus tipo 1', nota:'' },
  ]},
  { hab: '105', camas: [
    { id:'105A', nombre:'——', prioridadAtencion:'Baja', estado:'vacia', nanda:[], ia:'', edad:null, diagnosticoMedico:'', nota:'' },
    { id:'105B', nombre:'Díaz, E.', prioridadAtencion:'Baja', nanda:['00002 Desequilibrio nutricional'], ia:'Ingesta mejorada. Completó 70% del almuerzo. Solicita nutricionista.', edad:38, diagnosticoMedico:'Anemia ferropénica grave', nota:'' },
  ]},
  { hab: '106', camas: [
    { id:'106A', nombre:'Morales, V.', prioridadAtencion:'Media', nanda:['00006 Hipotermia','00146 Ansiedad'], ia:'Temperatura 35.2°C. Se aplicó manta térmica. Paciente ansiosa por diagnóstico.', edad:75, diagnosticoMedico:'Hipotermia accidental', nota:'' },
    { id:'106B', nombre:'Jiménez, R.', prioridadAtencion:'Baja',   nanda:['00155 Riesgo de caída'], ia:'Alta programada para mañana. Familia informada. Educación al egreso realizada.', edad:55, diagnosticoMedico:'Hipertensión arterial controlada', nota:'' },
  ]},
];

let selectedCamaId = null;

function normalizeTriageData() {
  triageData = triageData.map(habitacion => ({
    ...habitacion,
    camas: (habitacion.camas || []).map(cama => {
      if (cama.estado === 'vacia' || cama.nombre === '——') {
        return { ...cama, prioridadAtencion: 'Baja', estado: 'vacia', nanda: cama.nanda || [], ia: cama.ia || '', nota: cama.nota || '' };
      }
      const prioridad = cama.prioridadAtencion || mapEstadoToPrioridad(cama.estado || 'verde');
      return { ...cama, prioridadAtencion: prioridad, estado: mapPrioridadToEstado(prioridad) };
    })
  }));
}

function mapEstadoToPrioridad(estado) {
  switch (estado) {
    case 'rojo':
    case 'Alta':
      return 'Alta';
    case 'naranja':
    case 'Media':
      return 'Media';
    default:
      return 'Baja';
  }
}

function mapPrioridadToEstado(prioridad) {
  switch (prioridad) {
    case 'Alta': return 'rojo';
    case 'Media': return 'naranja';
    default: return 'verde';
  }
}

function getEstadoVisual(cama) {
  if (!cama || cama.estado === 'vacia' || cama.nombre === '——') return 'vacia';
  return mapPrioridadToEstado(cama.prioridadAtencion || 'Baja');
}

function renderTriageMap() {
  normalizeTriageData();
  const grid = document.getElementById('triageMapGrid');
  if (!grid) return;
  grid.innerHTML = '';
  let criticos = 0, alertas = 0, estables = 0, vacias = 0;

  triageData.forEach(hab => {
    const div = document.createElement('div');
    div.className = 'bg-slate-50 dark:bg-slate-950 rounded-xl p-3 border border-slate-200 dark:border-slate-800';
    div.innerHTML = `
      <div class="flex items-center justify-between gap-2 mb-2">
        <div>
          <p class="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Hab. ${hab.hab}</p>
          <p class="text-[11px] text-slate-400">${hab.camas.filter(c => c.nombre !== '——').length} ocupadas</p>
        </div>
        <div class="flex items-center gap-1">
          <button type="button" class="text-[11px] font-semibold text-iris-600 hover:text-iris-700" title="Agregar cama" onclick="agregarCama('${hab.hab}')">＋</button>
          <button type="button" class="text-[11px] font-semibold text-slate-400 hover:text-red-500" title="Eliminar habitación" onclick="eliminarHabitacion('${hab.hab}')">✕</button>
        </div>
      </div>
      <div class="space-y-2"></div>
    `;

    const content = div.querySelector('.space-y-2');
    if (!hab.camas.length) {
      content.innerHTML = '<div class="text-[11px] italic text-slate-400">Sin camas</div>';
    }

    hab.camas.forEach(cama => {
      const estado = getEstadoVisual(cama);
      const cls = { rojo:'cama-rojo', naranja:'cama-naranja', verde:'cama-verde', vacia:'cama-vacia' }[estado];
      const dot = { rojo:'bg-red-500', naranja:'bg-orange-500', verde:'bg-green-500', vacia:'bg-slate-300' }[estado];
      const nombreDisplay = cama.nombre === '——' ? 'Vacía' : cama.nombre;
      const isVacia = estado === 'vacia';
      const badge = isVacia ? 'Vacía' : (cama.prioridadAtencion || 'Media');

      const card = document.createElement('div');
      card.className = `cama ${cls} p-2.5 flex items-center gap-2 ${isVacia ? 'opacity-70' : ''}`;
      card.innerHTML = `
        <span class="w-2.5 h-2.5 rounded-full flex-shrink-0 ${dot}"></span>
        <div class="flex-1 min-w-0">
          <p class="text-xs font-medium text-slate-800 dark:text-slate-200 truncate">${nombreDisplay}</p>
          ${cama.edad ? `<p class="text-[11px] text-slate-500">${cama.edad} años</p>` : ''}
        </div>
        <div class="flex items-center gap-1">
          <span class="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-white/70 dark:bg-slate-900/50">${badge}</span>
          <button type="button" class="remove-bed text-[10px] font-semibold text-slate-400 hover:text-red-500" title="Eliminar cama">×</button>
        </div>
      `;

      card.addEventListener('click', (event) => {
        if (event.target.closest('.remove-bed')) {
          event.stopPropagation();
          eliminarCama(cama.id);
          return;
        }
        if (!isVacia) showCamaDetail(cama.id);
      });

      content.appendChild(card);

      if (estado === 'rojo') criticos++;
      else if (estado === 'naranja') alertas++;
      else if (estado === 'verde') estables++;
      else vacias++;
    });

    grid.appendChild(div);
  });

  document.getElementById('mapCriticos').textContent = criticos;
  document.getElementById('mapAlertas').textContent = alertas;
  document.getElementById('mapEstables').textContent = estables;
  document.getElementById('mapTotalCamas').textContent = criticos + alertas + estables + vacias;
  const totalGeneral = document.getElementById('mapTotal');
  if (totalGeneral) totalGeneral.textContent = criticos + alertas + estables + vacias;
}

function agregarHabitacion() {
  const nextNumber = triageData.length
    ? Math.max(...triageData.map(h => Number(h.hab) || 0)) + 1
    : 101;
  const habId = String(nextNumber).padStart(3, '0');
  triageData.push({
    hab: habId,
    camas: [{
      id: `${habId}A`,
      nombre: 'Paciente nuevo',
      prioridadAtencion: 'Media',
      nanda: [],
      ia: 'Nueva habitación añadida al mapa de triaje.',
      edad: null,
      diagnosticoMedico: '',
      nota: ''
    }]
  });
  renderTriageMap();
  showTriageToast(`Habitación ${habId} agregada`);
}

function agregarCama(habId) {
  const habitacion = triageData.find(h => h.hab === habId);
  if (!habitacion) return;

  const nombre = prompt('Nombre del paciente', 'Paciente nuevo')?.trim() || 'Paciente nuevo';
  const prioridad = prompt('Prioridad de atención (Alta / Media / Baja)', 'Media')?.trim() || 'Media';
  const prioridadValida = ['Alta', 'Media', 'Baja'].includes(prioridad) ? prioridad : 'Media';

  const nuevaCama = {
    id: `${habId}${Date.now().toString().slice(-3)}`,
    nombre,
    prioridadAtencion: prioridadValida,
    nanda: [],
    ia: 'Cama agregada desde el mapa de triaje.',
    edad: null,
    diagnosticoMedico: '',
    nota: ''
  };

  habitacion.camas.push(nuevaCama);
  renderTriageMap();
  showCamaDetail(nuevaCama.id);
  showTriageToast(`Cama agregada en habitación ${habId}`);
}

function eliminarCama(camaId) {
  if (!confirm('¿Eliminar esta cama del mapa?')) return;
  triageData = triageData.map(h => ({ ...h, camas: h.camas.filter(c => c.id !== camaId) }));
  renderTriageMap();
  if (selectedCamaId === camaId) {
    document.getElementById('camaDetailPanel').classList.add('hidden');
    selectedCamaId = null;
  }
}

function eliminarHabitacion(habId) {
  if (!confirm('¿Eliminar esta habitación y todas sus camas?')) return;
  triageData = triageData.filter(h => h.hab !== habId);
  renderTriageMap();
  document.getElementById('camaDetailPanel').classList.add('hidden');
  selectedCamaId = null;
}

function cambiarPrioridad(camaId = selectedCamaId) {
  const cama = triageData.flatMap(h => h.camas).find(c => c.id === camaId);
  if (!cama) return;

  const input = prompt('Nueva prioridad de atención (Alta / Media / Baja)', cama.prioridadAtencion || 'Media');
  if (!input) return;
  const prioridad = ['Alta', 'Media', 'Baja'].includes(input.trim()) ? input.trim() : null;
  if (!prioridad) {
    alert('Ingresá una prioridad válida: Alta, Media o Baja.');
    return;
  }

  cama.prioridadAtencion = prioridad;
  cama.estado = mapPrioridadToEstado(prioridad);
  renderTriageMap();
  showCamaDetail(cama.id);
  showTriageToast(`Prioridad actualizada a ${prioridad}`);
}

function showCamaDetail(camaId) {
  let cama = null;
  triageData.forEach(h => h.camas.forEach(c => { if (c.id === camaId) cama = c; }));
  if (!cama || cama.estado === 'vacia') return;

  selectedCamaId = camaId;
  const panel = document.getElementById('camaDetailPanel');
  const estado = getEstadoVisual(cama);
  const dotColors = { rojo:'bg-red-500', naranja:'bg-orange-500', verde:'bg-green-500' };
  const badgeColors = { rojo:'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400', naranja:'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400', verde:'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' };
  const badgeLabels = { rojo:'CRÍTICO', naranja:'ALERTA', verde:'ESTABLE' };

  document.getElementById('camaDetailDot').className = `w-3 h-3 rounded-full ${dotColors[estado]}`;
  document.getElementById('camaDetailTitle').textContent = `${cama.nombre} — Cama ${cama.id}`;
  document.getElementById('camaDetailBadge').textContent = badgeLabels[estado];
  document.getElementById('camaDetailBadge').className = `ml-auto px-2 py-0.5 text-xs font-bold rounded-md ${badgeColors[estado]}`;
  document.getElementById('camaDetailIA').textContent = cama.ia || 'Sin resumen del turno anterior.';
  document.getElementById('camaDetailNota').value = cama.nota || '';

  const nandaContainer = document.getElementById('camaDetailNANDA');
  nandaContainer.innerHTML = (cama.nanda || []).length
    ? (cama.nanda || []).map(n => `<div class="text-xs px-2 py-1 bg-iris-50 dark:bg-iris-900/20 text-iris-700 dark:text-iris-300 rounded-lg border border-iris-100 dark:border-iris-800">${n}</div>`).join('')
    : '<div class="text-xs text-slate-400 italic">Sin alertas activas.</div>';

  panel.classList.remove('hidden');
  panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function aplicarValoracionTurno() {
  const input = document.getElementById('camaDetailNota')?.value?.trim();
  if (!input || !selectedCamaId) return;

  const cama = triageData.flatMap(h => h.camas).find(c => c.id === selectedCamaId);
  if (!cama) return;

  const updatedBed = triageLogic && typeof triageLogic.buildBedAssessmentUpdate === 'function'
    ? triageLogic.buildBedAssessmentUpdate(input, cama)
    : {
        ...cama,
        ia: input,
        nanda: cama.nanda || [],
        prioridadAtencion: cama.prioridadAtencion || 'Baja',
        estado: cama.estado || 'verde'
      };

  Object.assign(cama, updatedBed);
  cama.nota = input;
  renderTriageMap();
  showCamaDetail(cama.id);
  showTriageToast('Valoración aplicada a la cama ✓');
}

function guardarNota() {
  const nota = document.getElementById('camaDetailNota').value.trim();
  if (!nota || !selectedCamaId) return;
  const cama = triageData.flatMap(h => h.camas).find(c => c.id === selectedCamaId);
  if (cama) {
    cama.nota = nota;
    aplicarValoracionTurno();
  }
}

function showTriageToast(msg) {
  const t = document.createElement('div');
  t.className = 'fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl text-white text-sm font-medium shadow-lg fade-in bg-green-600';
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 3000);
}

// ────────────────────────────────────────────────────────────────
// 10. ASISTENTE IA (Claude API)
// ────────────────────────────────────────────────────────────────
const SYSTEM_PROMPT = `Sos nurseIA, un asistente clínico especializado en enfermería. Respondés en español (o en inglés si el usuario escribe en inglés). Ayudás con:
- Diagnósticos NANDA y su justificación
- Intervenciones NIC relacionadas
- Resultados NOC esperados
- Priorización ABCDE
- Redacción de evoluciones de enfermería
- Protocolos y procedimientos clínicos habituales
- Farmacología básica de enfermería

Siempre recordá al usuario que tus respuestas son orientativas y no reemplazan el criterio clínico profesional. Respondés de forma clara, estructurada y en lenguaje clínico apropiado para enfermeros.`;

async function sendChat() {
  const input = document.getElementById('chatInput');
  const msg = input.value.trim();
  if (!msg) return;

  appendMessage(msg, 'user');
  input.value = '';
  input.style.height = 'auto';

  const sendBtn = document.getElementById('sendBtn');
  const sendIcon = document.getElementById('sendIcon');
  const sendLoad = document.getElementById('sendLoading');
  sendBtn.disabled = true;
  sendIcon.classList.add('hidden');
  sendLoad.classList.remove('hidden');

  chatHistory.push({ role: 'user', content: msg });

  const typingId = 'typing-' + Date.now();
  appendMessage('...', 'ai', typingId);

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 1000,
        system: SYSTEM_PROMPT,
        messages: chatHistory
      })
    });

    const data = await response.json();
    const reply = data.content?.map(b => b.text || '').join('') || 'Error al procesar la respuesta.';

    document.getElementById(typingId)?.remove();
    appendMessage(reply, 'ai');
    chatHistory.push({ role: 'assistant', content: reply });

  } catch (e) {
    document.getElementById(typingId)?.remove();
    appendMessage('Error de conexión. Verificá tu conexión a internet e intentá de nuevo.', 'ai');
  }

  sendBtn.disabled = false;
  sendIcon.classList.remove('hidden');
  sendLoad.classList.add('hidden');
}

function appendMessage(text, role, id) {
  const container = document.getElementById('chatMessages');
  const isAI = role === 'ai';
  const el = document.createElement('div');
  el.className = `flex items-start gap-3 ${isAI ? '' : 'flex-row-reverse'}`;
  if (id) el.id = id;

  const avatar = isAI
    ? `<div class="w-8 h-8 bg-iris-100 dark:bg-iris-900/40 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
        <svg class="w-4 h-4 text-iris-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
       </div>`
    : `<div class="w-8 h-8 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
        <svg class="w-4 h-4 text-slate-600 dark:text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
       </div>`;

  const formatted = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>');
  const bubble = isAI
    ? `<div class="chat-bubble-ai rounded-2xl rounded-tl-none px-4 py-3 max-w-lg text-sm text-slate-700 dark:text-slate-200 leading-relaxed">${formatted}</div>`
    : `<div class="chat-bubble-user rounded-2xl rounded-tr-none px-4 py-3 max-w-lg text-sm leading-relaxed">${formatted}</div>`;

  el.innerHTML = avatar + bubble;
  container.appendChild(el);
  container.scrollTop = container.scrollHeight;
}

function quickPrompt(text) {
  document.getElementById('chatInput').value = text;
  sendChat();
}

function handleChatKey(e) {
  if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendChat(); }
}

// ────────────────────────────────────────────────────────────────
// 11. HISTORIAL
// ────────────────────────────────────────────────────────────────
function renderHistory() {
  const list = document.getElementById('historyList');
  if (!history.length) {
    list.innerHTML = `<div class="text-center py-16 text-slate-400 dark:text-slate-600">
      <svg class="w-12 h-12 mx-auto mb-3 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
      <p class="text-sm">Todavía no guardaste ninguna evolución.</p>
      <p class="text-xs mt-1">Analizá un paciente y hacé clic en "Guardar".</p>
    </div>`;
    return;
  }
  list.innerHTML = history.map(entry => `
    <div class="history-item bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4" onclick="expandHistory('${entry.id}')">
      <div class="flex items-start justify-between gap-3">
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-2 mb-1.5">
            <span class="text-xs font-medium text-iris-600 dark:text-iris-400">${entry.diagCount} diagnósticos</span>
            <span class="text-xs text-slate-400">·</span>
            <span class="text-xs text-slate-500">${entry.date}</span>
          </div>
          <p class="text-sm text-slate-700 dark:text-slate-300 line-clamp-2 leading-relaxed">${entry.text.slice(0,200)}...</p>
        </div>
        <button onclick="event.stopPropagation(); deleteHistory('${entry.id}')" class="flex-shrink-0 text-slate-400 hover:text-red-500 transition-colors p-1">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
      </div>
    </div>
  `).join('');
}

function deleteHistory(id) {
  history = history.filter(e => e.id != id);
  localStorage.setItem('nurseIA_history', JSON.stringify(history));
  renderHistory();
}

function clearHistory() {
  if (confirm('¿Borrar todo el historial?')) {
    history = [];
    localStorage.setItem('nurseIA_history', JSON.stringify(history));
    renderHistory();
  }
}

function expandHistory(id) {
  const entry = history.find(e => e.id == id);
  if (!entry) return;
  document.getElementById('generatedEvolution').textContent = entry.text;
  document.getElementById('resultsSection').classList.remove('hidden');
  document.getElementById('priorityAlert').classList.add('hidden');
  showTab('analisis');
  document.getElementById('resultsSection').scrollIntoView({ behavior:'smooth' });
}