/**
 * nurseIA — src/data/triage.js
 * Datos del mapa de triaje — Virtual Triage Map
 * En producción estos datos vendrían del backend/EHR.
 * Por ahora son datos de demostración editables.
 */

export const TRIAGE_DATA = [
  {
    hab: "101",
    camas: [
      {
        id: "101A",
        nombre: "García, Roberto",
        estado: "rojo",
        edad: 78,
        diagnosticoMedico: "Neumonía bilateral",
        nanda: ["00032 Patrón resp. ineficaz", "00155 Riesgo de caída"],
        ia: "Fiebre 38.8°C a las 03:20 hs. Hemocultivo tomado. Inició ceftriaxona 1g IV. Presenta desorientación nocturna. Sin deterioro hemodinámico al cierre del turno.",
        nota: ""
      },
      {
        id: "101B",
        nombre: "López, María",
        estado: "verde",
        edad: 65,
        diagnosticoMedico: "Post-quirúrgico colecistectomía",
        nanda: ["00093 Fatiga"],
        ia: "Paciente estable. Toleró dieta líquida completa. Herida quirúrgica sin signos de infección. Deambulando con ayuda. Sin novedades en el turno.",
        nota: ""
      }
    ]
  },
  {
    hab: "102",
    camas: [
      {
        id: "102A",
        nombre: "Martínez, Ana",
        estado: "naranja",
        edad: 54,
        diagnosticoMedico: "Fractura de cadera operada",
        nanda: ["00132 Dolor agudo", "00146 Ansiedad"],
        ia: "Dolor 6/10 al movilizarse. Recibió analgesia a las 06:00 con respuesta parcial. Refiere preocupación por rehabilitación. Familia presente.",
        nota: ""
      },
      {
        id: "102B",
        nombre: "——",
        estado: "vacia",
        edad: null,
        diagnosticoMedico: "",
        nanda: [],
        ia: "",
        nota: ""
      }
    ]
  },
  {
    hab: "103",
    camas: [
      {
        id: "103A",
        nombre: "Rodríguez, Carlos",
        estado: "verde",
        edad: 70,
        diagnosticoMedico: "ACV isquémico en rehabilitación",
        nanda: ["00085 Deterioro movilidad física"],
        ia: "Realizó fisioterapia por 40 minutos. Deambula con andador. Familia colaboradora. Sin alteraciones neurológicas nuevas.",
        nota: ""
      },
      {
        id: "103B",
        nombre: "Fernández, Laura",
        estado: "verde",
        edad: 48,
        diagnosticoMedico: "Diabetes mellitus tipo 2 descompensada",
        nanda: ["00095 Descanso ineficaz", "00179 Riesgo glucemia"],
        ia: "Glucemias estables entre 140-180. Durmió mal por ruidos del pasillo. Sin alteraciones clínicas. Solicita analgesia leve por cefalea.",
        nota: ""
      }
    ]
  },
  {
    hab: "104",
    camas: [
      {
        id: "104A",
        nombre: "Sánchez, Pedro",
        estado: "rojo",
        edad: 82,
        diagnosticoMedico: "EPOC exacerbado",
        nanda: ["00030 Intercambio gaseoso deteriorado", "00031 Limpieza ineficaz vía aérea"],
        ia: "SpO2 88% basal. Se escaló O2 a mascarilla de reservorio 8L. Abundantes secreciones. Pendiente valoración médica urgente. No dejar solo.",
        nota: ""
      },
      {
        id: "104B",
        nombre: "Torres, Jorge",
        estado: "naranja",
        edad: 61,
        diagnosticoMedico: "Diabetes mellitus tipo 1",
        nanda: ["00179 Riesgo glucemia inestable"],
        ia: "Glucemia 280 mg/dL en ayunas. Se corrigió con insulina de corrección según protocolo. Recontrol en 2 horas. Pendiente resultado de laboratorio.",
        nota: ""
      }
    ]
  },
  {
    hab: "105",
    camas: [
      {
        id: "105A",
        nombre: "——",
        estado: "vacia",
        edad: null,
        diagnosticoMedico: "",
        nanda: [],
        ia: "",
        nota: ""
      },
      {
        id: "105B",
        nombre: "Díaz, Elena",
        estado: "verde",
        edad: 38,
        diagnosticoMedico: "Anemia ferropénica grave",
        nanda: ["00002 Desequilibrio nutricional", "00093 Fatiga"],
        ia: "Ingesta alimentaria mejorada. Completó 70% del almuerzo. Iniciando suplemento de hierro oral. Solicita valoración por nutricionista.",
        nota: ""
      }
    ]
  },
  {
    hab: "106",
    camas: [
      {
        id: "106A",
        nombre: "Morales, Verónica",
        estado: "naranja",
        edad: 75,
        diagnosticoMedico: "Hipotermia accidental",
        nanda: ["00006 Hipotermia", "00146 Ansiedad"],
        ia: "Temperatura 35.2°C al ingreso. Se aplicó manta térmica eléctrica. Temperatura en ascenso a 36.1°C. Paciente ansiosa por diagnóstico y pronóstico.",
        nota: ""
      },
      {
        id: "106B",
        nombre: "Jiménez, Ricardo",
        estado: "verde",
        edad: 55,
        diagnosticoMedico: "Hipertensión arterial controlada",
        nanda: ["00155 Riesgo de caída"],
        ia: "Alta programada para mañana por la mañana. PA controlada 130/80. Familia informada. Educación al egreso realizada sobre medicación y signos de alarma.",
        nota: ""
      }
    ]
  }
];