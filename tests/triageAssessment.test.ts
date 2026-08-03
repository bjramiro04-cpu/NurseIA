import { describe, expect, it } from "vitest";
import type { NandaDiagnosis } from "@/types/nanda";
import { buildBedAssessmentUpdate } from "@/services/triageAssessment";
import { findMatchingDiagnoses } from "@/services/nandaEngine";

function diag(overrides: Partial<NandaDiagnosis>): NandaDiagnosis {
  return {
    diagnostico: "Diagnóstico de prueba",
    codigo: "00000",
    dominio: "Dominio de prueba",
    prioridad: "Baja",
    abcde: "E",
    palabras_clave: [],
    rc: "",
    mp: "",
    evolucion_es: "",
    evolucion_en: "",
    ...overrides,
  };
}

describe("buildBedAssessmentUpdate", () => {
  it("detecta prioridad alta y genera evolución a partir de palabras clave", () => {
    const diagnoses = [
      diag({
        diagnostico: "Patrón respiratorio ineficaz",
        codigo: "00032",
        prioridad: "Alta",
        palabras_clave: ["disnea", "taquipnea"],
        evolucion_es: "Paciente presenta alteración del patrón respiratorio.",
      }),
      diag({
        diagnostico: "Dolor agudo",
        codigo: "00132",
        prioridad: "Media",
        palabras_clave: ["dolor"],
        evolucion_es: "Paciente refiere dolor.",
      }),
    ];

    const result = buildBedAssessmentUpdate("Paciente con disnea y taquipnea", diagnoses);

    expect(result.estado).toBe("rojo");
    expect(result.ia).toMatch(/disnea|taquipnea/);
    expect(result.nanda?.some((item) => item.includes("Patrón respiratorio ineficaz"))).toBe(true);
  });

  it("no cambia estado ni alertas cuando no hay coincidencias", () => {
    const diagnoses = [diag({ palabras_clave: ["fiebre"] })];

    const result = buildBedAssessmentUpdate("Paciente tranquilo, sin novedades", diagnoses);

    expect(result.estado).toBeUndefined();
    expect(result.nanda).toBeUndefined();
    expect(result.ia).toBe("Paciente tranquilo, sin novedades");
  });
});

describe("findMatchingDiagnoses", () => {
  it("encuentra diagnósticos por palabras clave sin importar acentos", () => {
    const diagnoses = [
      diag({
        diagnostico: "Patrón respiratorio ineficaz",
        codigo: "00032",
        prioridad: "Alta",
        palabras_clave: ["disnea", "taquipnea"],
      }),
    ];

    const matches = findMatchingDiagnoses(diagnoses, "paciente con disnea y taquipnea");

    expect(matches).toHaveLength(1);
    expect(matches[0].diagnostico).toBe("Patrón respiratorio ineficaz");
  });
});
