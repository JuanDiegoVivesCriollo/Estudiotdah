// Nueva implementación de Gemini AI - Limpia y funcional
import { GoogleGenerativeAI } from '@google/generative-ai';

// Verificar que tenemos la API key
if (!process.env.GEMINI_API_KEY) {
  console.error('❌ GEMINI_API_KEY no encontrada en variables de entorno');
}

// Inicializar Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// Configuración del modelo optimizada
const model = genAI.getGenerativeModel({ 
  model: 'gemini-2.0-flash-exp',
  generationConfig: {
    temperature: 0.7,
    topP: 0.9,
    topK: 40,
    maxOutputTokens: 2048,
  },
});

/**
 * Función principal para llamar a Gemini AI
 */
export async function callGeminiAI(prompt: string): Promise<string> {
  try {
    console.log('🚀 Enviando prompt a Gemini AI...');
    console.log('📝 Longitud del prompt:', prompt.length, 'caracteres');
    
    if (!process.env.GEMINI_API_KEY) {
      throw new Error('API Key de Gemini no configurada');
    }    console.log('⏳ Llamando a Gemini API...');
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
      console.log('✅ Respuesta recibida de Gemini AI');
    console.log('📊 Longitud de respuesta:', text.length, 'caracteres');
    console.log('🔍 Primeros 100 caracteres:', text.slice(0, 100));
    
    if (!text || text.trim().length === 0) {
      throw new Error('Gemini devolvió una respuesta vacía');
    }
    
    return text.trim();
    
  } catch (error: unknown) {
    console.error('❌ Error en Gemini AI:', error);
    
    const errorMessage = error instanceof Error ? error.message : String(error);
    
    // Manejo específico de errores
    if (errorMessage.includes('API_KEY_INVALID')) {
      throw new Error('API Key de Gemini inválida o expirada');
    } else if (errorMessage.includes('QUOTA_EXCEEDED')) {
      throw new Error('Cuota de Gemini AI excedida');
    } else if (errorMessage.includes('SAFETY')) {
      throw new Error('Contenido bloqueado por filtros de seguridad');
    }
    
    throw new Error(`Error de Gemini AI: ${errorMessage}`);
  }
}

/**
 * Prompts optimizados para estudiantes con TDAH
 */
export const geminiPrompts = {  // Generar flashcards concisas y efectivas
  generateFlashcards: (text: string) => `
Eres un experto educativo creando material de estudio para estudiantes con TDAH.

Analiza este contenido y crea exactamente 8 flashcards que realmente ayuden al estudiante:

"""
${text.slice(0, 3000)}
"""

INSTRUCCIONES ESPECÍFICAS:
1. Lee y comprende el contenido completamente
2. Identifica los conceptos MÁS IMPORTANTES
3. Crea preguntas que evalúen comprensión real
4. Preguntas: máximo 12 palabras, claras
5. Respuestas: máximo 20 palabras, basadas EN EL TEXTO
6. Usa información REAL del contenido, no genérica

TIPOS DE PREGUNTAS a crear:
- Definiciones: "¿Qué es X según el texto?"
- Características: "¿Cuál es la función de X?"  
- Relaciones: "¿Cómo se relaciona X con Y?"
- Procesos: "¿Cómo funciona X?"

FORMATO JSON OBLIGATORIO:
{
  "flashcards": [
    {
      "question": "¿Pregunta específica basada en el texto?",
      "answer": "Respuesta extraída directamente del contenido",
      "difficulty": "easy",
      "category": "Tema del texto"
    }
  ]
}

RESPONDE SOLO CON EL JSON. NO agregues explicaciones antes o después.`,

  // Generar preguntas de quiz
  generateQuiz: (text: string) => `
Eres un experto en crear evaluaciones para estudiantes con TDAH.

Basándote en este texto, crea exactamente 6 preguntas de opción múltiple:

TEXTO:
${text}

REQUISITOS:
- Preguntas claras y directas (máximo 15 palabras)
- 4 opciones por pregunta (máximo 8 palabras cada una)
- Solo una respuesta correcta por pregunta
- Explicaciones breves (máximo 25 palabras)
- Evaluar comprensión real del contenido

RESPONDE EN FORMATO JSON:
{
  "questions": [
    {
      "question": "¿Pregunta clara sobre el contenido?",
      "options": ["Opción A", "Opción B", "Opción C", "Opción D"],
      "correctAnswer": 0,
      "explanation": "Explicación breve y clara",
      "difficulty": "easy|medium|hard"
    }
  ]
}

Genera SOLO el JSON, sin texto adicional.`,

  // Generar resumen
  generateSummary: (text: string) => `
Crea un resumen optimizado para estudiantes con TDAH del siguiente texto:

TEXTO:
${text}

REQUISITOS DEL RESUMEN:
- Máximo 150 palabras
- Lenguaje claro y simple
- Frases cortas (máximo 15 palabras por frase)
- Enfocarse en 3-5 ideas principales
- Usar bullet points si es necesario
- Evitar jerga técnica compleja

Responde ÚNICAMENTE con el resumen, sin introducción ni explicaciones.`,

  // Extraer temas clave
  extractKeyTopics: (text: string) => `
Identifica los 6 conceptos más importantes del siguiente texto:

TEXTO:
${text}

REQUISITOS:
- Máximo 6 temas
- Cada tema máximo 3 palabras
- Conceptos centrales, no detalles
- En español
- Separados por comas

Responde ÚNICAMENTE con la lista: tema1, tema2, tema3, tema4, tema5, tema6`,

  // Chatbot educativo
  chatbotResponse: (message: string, context?: string) => `
Eres un tutor de IA especializado en ayudar a estudiantes con TDAH.

${context ? `CONTEXTO DEL DOCUMENTO: ${context.slice(0, 800)}...` : ''}

MENSAJE DEL ESTUDIANTE: ${message}

INSTRUCCIONES:
- Responde de manera amigable y alentadora
- Usa lenguaje simple y claro
- Si el mensaje se relaciona con el documento, usa esa información
- Frases cortas (máximo 20 palabras)
- Incluye ejemplos prácticos cuando sea útil
- Si no sabes algo, admítelo honestamente
- Sé paciente y comprensivo

Responde de manera conversacional y útil:`
};

/**
 * Función para parsear respuestas JSON de la IA
 */
export function parseGeminiJSON<T>(response: string, fallback: T): T {
  try {
    // Limpiar la respuesta de posibles caracteres extra
    let cleanedResponse = response.trim();
    
    // Buscar JSON dentro de bloques de código markdown
    const jsonMatch = cleanedResponse.match(/```(?:json)?\s*(\{[\s\S]*\})\s*```/);
    if (jsonMatch) {
      cleanedResponse = jsonMatch[1];
    }
    
    // Intentar parsear el JSON
    const parsed = JSON.parse(cleanedResponse);
    return parsed;
    
  } catch (error) {
    console.error('❌ Error parseando JSON de Gemini:', error);
    console.log('📄 Respuesta original:', response);
    return fallback;
  }
}
