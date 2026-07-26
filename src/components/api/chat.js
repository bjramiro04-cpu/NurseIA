export default async function handler(req, res) {
  // 1. Seguridad: Solo permitimos peticiones POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido. Usa POST.' });
  }

  // 2. Extraemos los datos que envía tu frontend (tabAnalisis.js)
  const { nurseText, diagList } = req.body;

  if (!nurseText || !diagList) {
    return res.status(400).json({ error: 'Faltan datos requeridos (texto del paciente o diagnósticos).' });
  }

  // 3. Definimos los Prompts
  const systemPrompt = `Eres un enfermero profesional experto de Argentina. Tu tarea es redactar una nota de evolución de enfermería (formato PAC / SOAPIE) estructurada y profesional.

REGLAS ESTRICTAS:
1. CERO ALUCINACIONES: Utiliza ÚNICAMENTE la información clínica proporcionada. NUNCA inventes causas, valores vitales ni síntomas.
2. ESTRUCTURA: Responde exactamente con estas secciones en mayúsculas: VALORACIÓN, DIAGNÓSTICO ENFERMERO, PLANIFICACIÓN (NOC), INTERVENCIONES (NIC), EVALUACIÓN.
3. FORMATO: Devuelve la respuesta en formato de texto plano con viñetas cuando sea necesario. No uses Markdown excesivo ni introducciones como "Aquí tienes la evolución".`;

  const userPrompt = `DATOS DE ENTRADA (Escritos por el enfermero):
"${nurseText}"

DIAGNÓSTICOS DETECTADOS POR EL SISTEMA:
${diagList}

Por favor, redacta la evolución clínica basándote EXCLUSIVAMENTE en estos datos.`;

  try {
    // 4. Llamada segura a la API de Claude
    // Usamos process.env.CLAUDE_API_KEY para leer la clave desde el entorno del servidor
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.CLAUDE_API_KEY,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: "claude-3-haiku-20240307",
        max_tokens: 800,
        system: systemPrompt,
        messages: [
          { role: "user", content: userPrompt }
        ]
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error de Anthropic:", errorData);
      throw new Error(errorData.error?.message || "Error al comunicarse con Claude");
    }

    const data = await response.json();
    
    // 5. Devolvemos el texto generado al frontend
    return res.status(200).json({ text: data.content[0].text });

  } catch (error) {
    console.error("Error en el servidor:", error);
    return res.status(500).json({ error: "Error interno del servidor al generar la evolución." });
  }
}