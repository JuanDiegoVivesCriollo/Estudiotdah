import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini AI with new API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// Get the Gemini model (usando modelo estable)
const model = genAI.getGenerativeModel({ 
  model: 'gemini-1.5-flash',
  generationConfig: {
    temperature: 0.3, // Más conservador para análisis
    topP: 0.9,
    topK: 40,
    maxOutputTokens: 4096, // Más tokens para respuestas completas
  },
});

// AI function to call Gemini
export async function callGeminiAI(prompt: string): Promise<string> {
  try {
    console.log('🚀 Llamando a Gemini AI con modelo estable...');
    
    // Verificar que tenemos API key
    if (!process.env.GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY no configurada');
    }
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    console.log('✅ Respuesta de Gemini recibida:', text.slice(0, 100) + '...');
    return text;
  } catch (error: unknown) {
    console.error('❌ Error calling Gemini AI:', error);
    
    // Manejo específico de errores de API
    interface ApiError {
      status?: number;
      message?: string;
    }
    
    const errorObj = error as ApiError;
    if (errorObj?.status === 400) {
      throw new Error('Error de formato en la solicitud a Gemini');
    } else if (errorObj?.status === 401) {
      throw new Error('API Key de Gemini inválida o expirada');
    } else if (errorObj?.status === 429) {
      throw new Error('Límite de solicitudes excedido para Gemini');
    } else if (errorObj?.status === 500) {
      throw new Error('Error interno del servidor de Gemini');
    }
    
    const message = errorObj?.message || String(error);
    throw new Error(`Error de Gemini AI: ${message}`);
  }
}

// Enhanced prompts for educational content generation
export const prompts = {
  generateSummary: (text: string) => 
    `Actúa como un experto educador especializado en TDAH. Analiza cuidadosamente el siguiente texto y crea un resumen ejecutivo.

INSTRUCCIONES ESPECÍFICAS:
- Máximo 200 palabras
- Identifica los 3-4 puntos más importantes
- Usa lenguaje claro y directo
- Estructura en párrafos cortos
- Enfócate en conceptos clave y conclusiones principales

TEXTO A ANALIZAR:
${text.slice(0, 3000)}

FORMATO DE RESPUESTA:
Proporciona únicamente el resumen, sin títulos, introducciones o comentarios adicionales.`,

  extractKeyTopics: (text: string) => 
    `Analiza este texto como un experto en educación y extrae exactamente los 6 conceptos más importantes y relevantes.

CRITERIOS:
- Conceptos que aparecen con frecuencia
- Ideas centrales del texto
- Términos técnicos importantes
- Temas que un estudiante debe recordar

TEXTO:
${text.slice(0, 2000)}

RESPUESTA:
Devuelve solo los conceptos separados por comas, sin numeración ni explicaciones:
concepto1, concepto2, concepto3, concepto4, concepto5, concepto6`,

  generateFlashcards: (text: string) => 
    `Eres un experto en crear material educativo para estudiantes con TDAH. Analiza este texto y crea exactamente 8 flashcards de alta calidad.

REGLAS ESTRICTAS:
1. Preguntas: Máximo 12 palabras, claras y directas
2. Respuestas: Máximo 20 palabras, precisas del texto
3. Basarse SOLO en información del texto proporcionado
4. Variar tipos: definiciones, procesos, características, relaciones
5. No inventar información que no esté en el texto

TEXTO A ANALIZAR:
${text.slice(0, 2500)}

RESPONDE SOLO CON JSON VÁLIDO:
{
  "flashcards": [
    {
      "question": "¿Pregunta específica del texto?",
      "answer": "Respuesta extraída del texto",
      "difficulty": "easy",
      "category": "Tema"
    },
    {
      "question": "¿Otra pregunta del contenido?",
      "answer": "Otra respuesta del texto",
      "difficulty": "medium", 
      "category": "Tema"
    }
  ]
}

IMPORTANTE: Responde ÚNICAMENTE con el JSON, sin texto adicional antes o después.`,

  generateQuestions: (text: string) => 
    `Eres un especialista en evaluación educativa para estudiantes con TDAH. Crea exactamente 6 preguntas de opción múltiple basadas en este texto.

CRITERIOS DE CALIDAD:
1. Preguntas claras sobre el contenido del texto
2. 4 opciones por pregunta, solo una correcta
3. Opciones plausibles pero claramente diferenciadas
4. Explicaciones breves y precisas
5. Dificultad progresiva

TEXTO PARA EVALUAR:
${text.slice(0, 2500)}

FORMATO REQUERIDO (SOLO JSON):
{
  "questions": [
    {
      "question": "¿Pregunta específica sobre el texto?",
      "options": ["Opción correcta", "Opción incorrecta 1", "Opción incorrecta 2", "Opción incorrecta 3"],
      "correctAnswer": 0,
      "explanation": "Explicación breve de por qué es correcta",
      "difficulty": "easy"
    }
  ]
}

RESPONDE SOLO CON EL JSON, SIN TEXTO ADICIONAL.`
};

// Helper function to validate and parse AI responses
export function parseAIResponse<T>(response: string, fallbackValue: T): T {
  try {
    // Limpiar la respuesta
    let cleaned = response.trim();
    
    // Remover posibles bloques de código markdown
    const jsonMatch = cleaned.match(/```(?:json)?\s*(\{[\s\S]*\})\s*```/);
    if (jsonMatch) {
      cleaned = jsonMatch[1];
    }
    
    // Remover texto antes y después del JSON
    const jsonStart = cleaned.indexOf('{');
    const jsonEnd = cleaned.lastIndexOf('}') + 1;
    
    if (jsonStart !== -1 && jsonEnd > jsonStart) {
      cleaned = cleaned.slice(jsonStart, jsonEnd);
    }
    
    // Validar que es JSON válido
    const parsed = JSON.parse(cleaned);
    
    console.log('✅ JSON parseado exitosamente:', Object.keys(parsed));
    return parsed;
  } catch (error) {
    console.error('❌ Error parsing AI response:', error);
    console.log('📄 Raw response:', response.slice(0, 500));
    return fallbackValue;
  }
}
