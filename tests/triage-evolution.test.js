const test = require('node:test');
const assert = require('node:assert/strict');
const { buildBedAssessmentUpdate } = require('../src/utils/triageLogic.js');

test('detecta prioridad alta y genera evolución a partir de palabras clave', () => {
  const bed = { prioridadAtencion: 'Baja', nanda: [] };
  const diagnostics = [
    {
      diagnostico: 'Patrón respiratorio ineficaz',
      codigo: '00032',
      prioridad: 'Alta',
      palabras_clave: ['disnea', 'taquipnea'],
      evolucion_es: 'Paciente presenta alteración del patrón respiratorio.'
    },
    {
      diagnostico: 'Dolor agudo',
      codigo: '00132',
      prioridad: 'Media',
      palabras_clave: ['dolor'],
      evolucion_es: 'Paciente refiere dolor.'
    }
  ];

  const result = buildBedAssessmentUpdate('Paciente con disnea y taquipnea', bed, diagnostics);

  assert.equal(result.prioridadAtencion, 'Alta');
  assert.equal(result.estado, 'rojo');
  assert.match(result.ia, /disnea|taquipnea/);
  assert.ok(result.nanda.some(item => item.includes('Patrón respiratorio ineficaz')));
});
