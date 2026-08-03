export interface EvolutionBlock {
  label: string;
  colorClass: string;
  text: string;
}

export interface EvolutionGroup {
  blocks: EvolutionBlock[];
}

interface SectionDef {
  pattern: RegExp;
  label: string;
  colorClass: string;
}

const SECTION_DEFS: SectionDef[] = [
  { pattern: /^VALORACIÓN:\s*/i, label: "VALORACIÓN:", colorClass: "text-slate-800 dark:text-slate-100" },
  {
    pattern: /^DIAGNÓSTICO ENFERMERO:\s*/i,
    label: "DIAGNÓSTICO ENFERMERO:",
    colorClass: "text-brand-600 dark:text-brand-300",
  },
  {
    pattern: /^PLANIFICACIÓN \(NOC\):\s*/i,
    label: "PLANIFICACIÓN (NOC):",
    colorClass: "text-blue-700 dark:text-blue-300",
  },
  {
    pattern: /^INTERVENCIÓN \(NIC\):\s*/i,
    label: "INTERVENCIÓN (NIC):",
    colorClass: "text-green-700 dark:text-green-300",
  },
  { pattern: /^EVALUACIÓN:\s*/i, label: "EVALUACIÓN:", colorClass: "text-amber-700 dark:text-amber-300" },
];

function parseBlocks(chunk: string): EvolutionBlock[] {
  const blocks: EvolutionBlock[] = [];
  let current: EvolutionBlock | null = null;

  for (const line of chunk.split("\n")) {
    const def = SECTION_DEFS.find((d) => d.pattern.test(line));
    if (def) {
      current = { label: def.label, colorClass: def.colorClass, text: line.replace(def.pattern, "") };
      blocks.push(current);
    } else if (current) {
      current.text += (current.text ? "\n" : "") + line;
    } else {
      current = { label: "", colorClass: "text-slate-700 dark:text-slate-300", text: line };
      blocks.push(current);
    }
  }
  return blocks;
}

/**
 * Parsea el texto plano de una evolución PAC (con secciones VALORACIÓN,
 * DIAGNÓSTICO ENFERMERO, etc. y grupos separados por "---") en bloques
 * renderizables sin necesidad de inyectar HTML crudo.
 */
export function parseEvolution(raw: string): EvolutionGroup[] {
  return raw
    .split(/^---$/m)
    .map((chunk) => chunk.trim())
    .filter(Boolean)
    .map((chunk) => ({ blocks: parseBlocks(chunk) }));
}
