/**
 * nurseIA — src/utils/triageLogic.js
 * Motor de lógica de triaje: detecta diagnósticos y actualiza prioridades
 */

// Placeholder: se reemplazará con NANDA real en la app
const BASE_DIAGNOSTICS = [];

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
  if (!assessmentText || !diagnostics || !diagnostics.length) return [];
  const cleanText = normalizeText(assessmentText);
  return diagnostics.filter(item =>
    item.palabras_clave && item.palabras_clave.some(keyword => cleanText.includes(normalizeText(keyword)))
  );
}

function generateEvolutionFromDiagnostics(matches, assessmentText) {
  if (!matches || !matches.length) {
    return assessmentText || 'Sin novedades clínicas registradas.';
  }

  const evolutionLines = matches.map(item => item.evolucion_es || '').filter(Boolean);
  return `${assessmentText}\n\n— Evolución automática —\n${evolutionLines.join('\n')}`;
}

function buildBedAssessmentUpdate(assessmentText, bed = {}, diagnostics = BASE_DIAGNOSTICS) {
  // Si no hay texto de valoración, devolver el bed sin cambios
  if (!assessmentText || !assessmentText.trim()) {
    return bed;
  }

  // Si no hay diagnósticos disponibles, devolver el bed con el texto guardado
  if (!diagnostics || !diagnostics.length) {
    return { ...bed, ia: assessmentText };
  }

  // Buscar diagnósticos coincidentes
  const matches = findMatchingDiagnostics(assessmentText, diagnostics);

  // Si no hay coincidencias, guardar el texto sin cambiar prioridad
  if (!matches.length) {
    return { ...bed, ia: assessmentText };
  }

  // Ordenar por prioridad (Alta > Media > Baja)
  const priorityOrder = { Alta: 0, Media: 1, Baja: 2 };
  matches.sort((a, b) => priorityOrder[a.prioridad] - priorityOrder[b.prioridad]);

  // Construir lista de diagnósticos NANDA
  const matchedNanda = matches.map(item => {
    if (item.codigo && item.diagnostico) {
      return `${item.codigo} ${item.diagnostico}`;
    }
    return item.diagnostico;
  }).filter(Boolean);

  // Generar evolución con los textos de evolución de los diagnósticos
  const evolutionLines = matches
    .map(item => item.evolucion_es)
    .filter(Boolean);
  
  const evolution = evolutionLines.length > 0
    ? `${assessmentText}\n\n— Evolución automática —\n${evolutionLines.join('\n')}`
    : assessmentText;

  // Obtener prioridad más alta
  const detectedPriority = matches[0].prioridad;

  return {
    ...bed,
    ia: evolution,
    nanda: matchedNanda,
    estado: mapPriorityToState(detectedPriority)
  };
}

export {
  BASE_DIAGNOSTICS,
  buildBedAssessmentUpdate,
  findMatchingDiagnostics,
  generateEvolutionFromDiagnostics,
  mapPriorityToState,
  normalizeText
};
