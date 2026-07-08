(function (root, factory) {
  const api = factory();
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  }
  root.triageLogic = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  const BASE_DIAGNOSTICS = [
  {
    diagnostico: 'Patrón respiratorio ineficaz',
    codigo: '00032',
    prioridad: 'Alta',
    palabras_clave: ['disnea', 'taquipnea', 'cianosis', 'saturacion baja', 'respiracion superficial', 'musculos accesorios'],
    evolucion_es: 'Paciente presenta alteración del patrón respiratorio evidenciado por disnea y taquipnea.'
  },
  {
    diagnostico: 'Dolor agudo',
    codigo: '00132',
    prioridad: 'Media',
    palabras_clave: ['dolor', 'quejido', 'sufrimiento', 'eva'],
    evolucion_es: 'Paciente manifiesta dolor agudo y requiere control analgésico.'
  },
  {
    diagnostico: 'Riesgo de caída',
    codigo: '00155',
    prioridad: 'Media',
    palabras_clave: ['mareo', 'debilidad', 'desequilibrio', 'inestabilidad', 'caida'],
    evolucion_es: 'Se valora riesgo de caída por inestabilidad funcional y debilidad.'
  },
  {
    diagnostico: 'Deterioro de la movilidad física',
    codigo: '00085',
    prioridad: 'Media',
    palabras_clave: ['debilidad', 'inmovil', 'moverse', 'mobilidad'],
    evolucion_es: 'Paciente presenta limitación funcional para la movilidad.'
  },
  {
    diagnostico: 'Infección',
    codigo: '00004',
    prioridad: 'Alta',
    palabras_clave: ['fiebre', 'secrecion purulenta', 'inflamacion', 'eritema'],
    evolucion_es: 'Se observa cuadro infeccioso agudo con signos inflamatorios locales.'
  },
  {
    diagnostico: 'Hipotensión',
    codigo: '00201',
    prioridad: 'Alta',
    palabras_clave: ['presion baja', 'hipotension', 'mareo', 'desmayo', 'palidez'],
    evolucion_es: 'Paciente presenta compromiso hemodinámico con presión arterial baja.'
  }
];

function normalizeText(text) {
  return text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function mapPriorityToState(priority) {
  switch (priority) {
    case 'Alta': return 'rojo';
    case 'Media': return 'naranja';
    default: return 'verde';
  }
}

function findMatchingDiagnostics(assessmentText, diagnostics = BASE_DIAGNOSTICS) {
  const cleanText = normalizeText(assessmentText || '');
  return diagnostics.filter(item =>
    item.palabras_clave.some(keyword => cleanText.includes(normalizeText(keyword)))
  );
}

function buildBedAssessmentUpdate(assessmentText, bed = {}, diagnostics = BASE_DIAGNOSTICS) {
  const cleanText = normalizeText(assessmentText || '');
  const matches = findMatchingDiagnostics(cleanText, diagnostics);

  if (!matches.length) {
    return {
      ...bed,
      ia: assessmentText || 'Sin novedades clínicas registradas.',
      nanda: bed.nanda || [],
      prioridadAtencion: bed.prioridadAtencion || 'Baja',
      estado: mapPriorityToState(bed.prioridadAtencion || 'Baja')
    };
  }

  const priorityOrder = { Alta: 0, Media: 1, Baja: 2 };
  matches.sort((a, b) => priorityOrder[a.prioridad] - priorityOrder[b.prioridad]);

  const matchedNanda = matches.map(item => `${item.codigo} ${item.diagnostico}`);
  const summary = matches
    .map(item => item.evolucion_es)
    .join(' ');

  const detectedPriority = matches[0].prioridad;

  return {
    ...bed,
    ia: `${assessmentText}\n\nResumen automático: ${summary}`,
    nanda: matchedNanda,
    prioridadAtencion: detectedPriority,
    estado: mapPriorityToState(detectedPriority)
  };
}

  return {
    BASE_DIAGNOSTICS,
    buildBedAssessmentUpdate,
    findMatchingDiagnostics,
    mapPriorityToState
  };
});
