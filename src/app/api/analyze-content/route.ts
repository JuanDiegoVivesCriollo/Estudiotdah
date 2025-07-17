import { NextRequest, NextResponse } from 'next/server';
import { callGeminiAI, geminiPrompts, parseGeminiJSON } from '@/lib/gemini';

// Tipos para las flashcards y preguntas
interface Flashcard {
  id: string;
  question: string;
  answer: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
}

interface StudyQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

interface StudySession {
  id: string;
  title: string;
  summary: string;
  keyTopics: string[];
  flashcards: Flashcard[];
  questions: StudyQuestion[];
  estimatedStudyTime: number;
}

/**
 * Función principal para analizar contenido con Gemini AI
 */
async function analyzeContentWithGemini(text: string, fileName: string): Promise<StudySession> {
  console.log('🧠 Iniciando análisis inteligente con Gemini AI...');
  
  try {
    // 1. Generar resumen
    console.log('📝 Generando resumen...');
    const summaryResponse = await callGeminiAI(geminiPrompts.generateSummary(text));
    const summary = summaryResponse.trim();

    // 2. Extraer temas clave
    console.log('🎯 Extrayendo temas clave...');
    const topicsResponse = await callGeminiAI(geminiPrompts.extractKeyTopics(text));
    const keyTopics = topicsResponse
      .split(',')
      .map(topic => topic.trim())
      .filter(topic => topic.length > 0)
      .slice(0, 6);    // 3. Generar flashcards con IA
    console.log('📚 Generando flashcards...');
    console.log('📝 Longitud del texto a analizar:', text.length, 'caracteres');
    
    const flashcardsResponse = await callGeminiAI(geminiPrompts.generateFlashcards(text));
    console.log('🔍 Respuesta cruda de flashcards:', flashcardsResponse.slice(0, 200) + '...');
    
    const flashcardsData = parseGeminiJSON(flashcardsResponse, { flashcards: [] });
    console.log('📊 Datos parseados de flashcards:', flashcardsData);
    
    let flashcards: Flashcard[] = [];if (flashcardsData.flashcards && Array.isArray(flashcardsData.flashcards)) {
      flashcards = flashcardsData.flashcards
        .filter((fc: {question?: string; answer?: string}) => fc.question && fc.answer)
        .map((fc: {question: string; answer: string; difficulty?: string; category?: string}, index: number) => ({
          id: `fc-${index + 1}`,
          question: String(fc.question).slice(0, 100),
          answer: String(fc.answer).slice(0, 150),
          difficulty: (fc.difficulty as 'easy' | 'medium' | 'hard') || 'medium',
          category: String(fc.category || 'General').slice(0, 30)
        }))
        .slice(0, 8);
    }

    // 4. Generar preguntas de quiz
    console.log('❓ Generando preguntas de quiz...');
    const quizResponse = await callGeminiAI(geminiPrompts.generateQuiz(text));
    const quizData = parseGeminiJSON(quizResponse, { questions: [] });
    
    let questions: StudyQuestion[] = [];    if (quizData.questions && Array.isArray(quizData.questions)) {
      questions = quizData.questions
        .filter((q: {question?: string; options?: unknown[]; correctAnswer?: number}) => 
          q.question && q.options && Array.isArray(q.options) && q.options.length === 4)
        .map((q: {question: string; options: string[]; correctAnswer: number; explanation?: string; difficulty?: string}, index: number) => ({
          id: `q-${index + 1}`,
          question: String(q.question).slice(0, 150),
          options: q.options.map((opt: string) => String(opt).slice(0, 80)),
          correctAnswer: Number(q.correctAnswer) || 0,
          explanation: String(q.explanation || 'Respuesta correcta').slice(0, 200),
          difficulty: (q.difficulty as 'easy' | 'medium' | 'hard') || 'medium'
        }))
        .slice(0, 6);
    }

    // 5. Fallback si la IA no generó suficiente contenido
    if (flashcards.length < 4) {
      console.log('⚠️ Pocas flashcards generadas, creando contenido de respaldo...');
      const fallbackCards = generateFallbackFlashcards(text, keyTopics);
      flashcards = [...flashcards, ...fallbackCards].slice(0, 8);
    }

    if (questions.length < 3) {
      console.log('⚠️ Pocas preguntas generadas, creando contenido de respaldo...');
      const fallbackQuestions = generateFallbackQuestions(text, keyTopics);
      questions = [...questions, ...fallbackQuestions].slice(0, 6);
    }

    // 6. Calcular tiempo estimado de estudio
    const estimatedTime = Math.max(10, Math.min(45, (flashcards.length * 2) + (questions.length * 3)));

    console.log('✅ Análisis completado exitosamente');
    console.log(`📊 Generado: ${flashcards.length} flashcards, ${questions.length} preguntas`);

    return {
      id: `session-${Date.now()}`,
      title: `Sesión de Estudio: ${fileName.replace(/\.[^/.]+$/, '')}`,
      summary,
      keyTopics,
      flashcards,
      questions,
      estimatedStudyTime: estimatedTime
    };

  } catch (error) {
    console.error('❌ Error en análisis con IA:', error);
    
    // Fallback completo en caso de error de IA
    console.log('🔄 Usando generación de respaldo...');
    return generateFallbackSession(text, fileName);
  }
}

/**
 * Función de respaldo para generar flashcards básicas
 */
function generateFallbackFlashcards(text: string, keyTopics: string[]): Flashcard[] {
  const flashcards: Flashcard[] = [];
  
  keyTopics.slice(0, 6).forEach((topic, index) => {
    const sentences = text.split(/[.!?]+/)
      .filter(s => s.toLowerCase().includes(topic.toLowerCase()) && s.length > 20 && s.length < 200)
      .map(s => s.trim());
    
    if (sentences.length > 0) {
      const bestSentence = sentences[0].slice(0, 120);
      flashcards.push({
        id: `fallback-fc-${index + 1}`,
        question: `¿Qué es ${topic}?`,
        answer: bestSentence,
        difficulty: 'medium',
        category: topic
      });
    }
  });
  
  return flashcards;
}

/**
 * Función de respaldo para generar preguntas básicas
 */
function generateFallbackQuestions(text: string, keyTopics: string[]): StudyQuestion[] {
  const questions: StudyQuestion[] = [];
  
  keyTopics.slice(0, 4).forEach((topic, index) => {
    questions.push({
      id: `fallback-q-${index + 1}`,
      question: `¿Cuál es la importancia de ${topic}?`,
      options: [
        'Es un concepto clave',
        'No es relevante',
        'Es información adicional',
        'Es un detalle menor'
      ],
      correctAnswer: 0,
      explanation: `${topic} es importante para entender el tema principal.`,
      difficulty: 'medium'
    });
  });
  
  return questions;
}

/**
 * Sesión de respaldo completa
 */
function generateFallbackSession(text: string, fileName: string): StudySession {
  const keyTopics = text.split(/\s+/)
    .filter(word => word.length > 4)
    .slice(0, 6);
    
  const summary = text.slice(0, 300) + '...';
  
  return {
    id: `fallback-${Date.now()}`,
    title: `Sesión de Estudio: ${fileName}`,
    summary,
    keyTopics,
    flashcards: generateFallbackFlashcards(text, keyTopics),
    questions: generateFallbackQuestions(text, keyTopics),
    estimatedStudyTime: 20
  };
}

/**
 * API Route Handler
 */
export async function POST(request: NextRequest) {
  try {
    console.log('📥 Nueva solicitud de análisis de contenido...');
    
    const { text, fileName } = await request.json();
    
    // Validar entrada
    if (!text || typeof text !== 'string') {
      return NextResponse.json(
        { error: 'Texto no válido o faltante' },
        { status: 400 }
      );
    }
    
    if (text.length < 50) {
      return NextResponse.json(
        { error: 'El texto es demasiado corto para analizar (mínimo 50 caracteres)' },
        { status: 400 }
      );
    }
    
    let processedText = text;
    if (text.length > 50000) {
      console.log('⚠️ Texto muy largo, cortando a 50000 caracteres...');
      processedText = text.slice(0, 50000);
    }
    
    console.log(`📊 Analizando texto: ${processedText.length} caracteres`);
    
    // Analizar con Gemini AI
    const studySession = await analyzeContentWithGemini(processedText, fileName || 'Documento');
    
    return NextResponse.json({
      success: true,
      studySession,
      message: 'Contenido analizado exitosamente con IA'
    });
    
  } catch (error) {
    console.error('❌ Error en API de análisis:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
    
    return NextResponse.json(
      { 
        error: 'Error analizando contenido',
        details: errorMessage,
        fallback: true
      },
      { status: 500 }
    );
  }
}
