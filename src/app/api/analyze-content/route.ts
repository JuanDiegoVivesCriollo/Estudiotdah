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

// Función para dividir documentos largos en chunks manejables
function chunkDocument(text: string, chunkSize: number = 15000): string[] {
  const chunks = [];
  for (let i = 0; i < text.length; i += chunkSize) {
    chunks.push(text.slice(i, i + chunkSize));
  }
  return chunks;
}

// Función para procesar múltiples chunks y combinar resultados
async function processLargeDocument(text: string): Promise<{
  summary: string;
  keyTopics: string[];
  flashcards: Flashcard[];
  questions: StudyQuestion[];
}> {
  const chunks = chunkDocument(text);
  console.log(`📄 Procesando documento en ${chunks.length} chunks de texto`);
  
  // Procesar máximo 3 chunks para balance entre calidad y velocidad
  const activeChunks = chunks.slice(0, 3);
    const allFlashcards: Flashcard[] = [];
  let allQuestions: StudyQuestion[] = [];
  const allTopics: string[] = [];
  
  // Procesar cada chunk
  for (let i = 0; i < activeChunks.length; i++) {
    const chunk = activeChunks[i];
    console.log(`⚡ Procesando chunk ${i + 1}/${activeChunks.length} (${chunk.length} caracteres)`);
    
    try {
      // Generar flashcards para este chunk
      const flashcardsResponse = await callGeminiAI(geminiPrompts.generateFlashcards(chunk));
      const flashcardsData = parseGeminiJSON(flashcardsResponse, { flashcards: [] });
      
      if (flashcardsData.flashcards && Array.isArray(flashcardsData.flashcards)) {
        const chunkFlashcards = flashcardsData.flashcards
          .filter((fc: {question?: string; answer?: string}) => fc.question && fc.answer)
          .map((fc: {question: string; answer: string; difficulty?: string; category?: string}, index: number) => ({
            id: `chunk-${i + 1}-fc-${index + 1}`,
            question: String(fc.question).slice(0, 120),
            answer: String(fc.answer).slice(0, 200),
            difficulty: (fc.difficulty as 'easy' | 'medium' | 'hard') || 'medium',
            category: String(fc.category || `Sección ${i + 1}`).slice(0, 30)
          }))
          .slice(0, 4); // 4 flashcards por chunk máximo
          
        allFlashcards.push(...chunkFlashcards);
      }
      
      // Extraer temas clave de este chunk
      const topicsResponse = await callGeminiAI(geminiPrompts.extractKeyTopics(chunk));
      const chunkTopics = topicsResponse
        .split(',')
        .map(topic => topic.trim())
        .filter(topic => topic.length > 0)
        .slice(0, 3); // 3 temas por chunk
        
      allTopics.push(...chunkTopics);
      
    } catch (error) {
      console.error(`❌ Error procesando chunk ${i + 1}:`, error);
    }
  }
  
  // Generar resumen del documento completo (usando primer chunk + muestra de otros)
  const summaryText = chunks.length > 1 
    ? `${chunks[0]}\n\n[...documento continúa...]\n\n${chunks[chunks.length - 1].slice(-500)}`
    : text;
    
  const summary = await callGeminiAI(geminiPrompts.generateSummary(summaryText));
  
  // Generar preguntas finales basadas en todo el contenido
  const finalQuizResponse = await callGeminiAI(geminiPrompts.generateQuiz(summaryText));
  const quizData = parseGeminiJSON(finalQuizResponse, { questions: [] });
    if (quizData.questions && Array.isArray(quizData.questions)) {
    allQuestions = quizData.questions
      .filter((q: {question?: string; options?: string[]}) => q.question && q.options && Array.isArray(q.options))
      .map((q: {question: string; options: string[]; correctAnswer?: number; explanation?: string; difficulty?: string}, index: number) => ({
        id: `final-q-${index + 1}`,
        question: String(q.question).slice(0, 150),
        options: q.options.slice(0, 4).map((opt: string) => String(opt).slice(0, 80)),
        correctAnswer: Math.max(0, Math.min(3, Number(q.correctAnswer) || 0)),
        explanation: String(q.explanation || 'Revisa el material de estudio').slice(0, 200),
        difficulty: (q.difficulty as 'easy' | 'medium' | 'hard') || 'medium'
      }))
      .slice(0, 6);
  }
  
  return {
    summary: summary.trim(),
    keyTopics: [...new Set(allTopics)].slice(0, 8), // Eliminar duplicados
    flashcards: allFlashcards.slice(0, 12), // Máximo 12 flashcards total
    questions: allQuestions.slice(0, 6) // Máximo 6 preguntas
  };
}

/**
 * Función principal para analizar contenido con Gemini AI
 */
async function analyzeContentWithGemini(text: string, fileName: string): Promise<StudySession> {
  console.log('🧠 Iniciando análisis inteligente con Gemini AI...');
  
  try {    // Usar procesamiento inteligente según el tamaño del documento
    let summary: string;
    let keyTopics: string[];
    let flashcards: Flashcard[];
    let questions: StudyQuestion[];
    
    if (text.length > 10000) {
      // Documento largo: usar chunking inteligente
      console.log('📄 Documento largo detectado, usando procesamiento por chunks...');
      const result = await processLargeDocument(text);
      summary = result.summary;
      keyTopics = result.keyTopics;
      flashcards = result.flashcards;
      questions = result.questions;
    } else {
      // Documento corto: procesamiento directo mejorado
      console.log('📝 Documento corto, procesamiento directo...');
      
      // 1. Generar resumen
      console.log('📝 Generando resumen...');
      const summaryResponse = await callGeminiAI(geminiPrompts.generateSummary(text));
      summary = summaryResponse.trim();

      // 2. Extraer temas clave
      console.log('🎯 Extrayendo temas clave...');
      const topicsResponse = await callGeminiAI(geminiPrompts.extractKeyTopics(text));
      keyTopics = topicsResponse
        .split(',')
        .map(topic => topic.trim())
        .filter(topic => topic.length > 0)
        .slice(0, 6);

      // 3. Generar flashcards con IA
      console.log('📚 Generando flashcards...');
      const flashcardsResponse = await callGeminiAI(geminiPrompts.generateFlashcards(text));
      const flashcardsData = parseGeminiJSON(flashcardsResponse, { flashcards: [] });
      
      flashcards = [];
      if (flashcardsData.flashcards && Array.isArray(flashcardsData.flashcards)) {
        flashcards = flashcardsData.flashcards
          .filter((fc: {question?: string; answer?: string}) => fc.question && fc.answer)
          .map((fc: {question: string; answer: string; difficulty?: string; category?: string}, index: number) => ({
            id: `fc-${index + 1}`,
            question: String(fc.question).slice(0, 120),
            answer: String(fc.answer).slice(0, 200),
            difficulty: (fc.difficulty as 'easy' | 'medium' | 'hard') || 'medium',
            category: String(fc.category || 'General').slice(0, 30)
          }))
          .slice(0, 10);
      }

      // 4. Generar preguntas de quiz
      console.log('❓ Generando preguntas de quiz...');
      const quizResponse = await callGeminiAI(geminiPrompts.generateQuiz(text));
      const quizData = parseGeminiJSON(quizResponse, { questions: [] });
      
      questions = [];
      if (quizData.questions && Array.isArray(quizData.questions)) {
        questions = quizData.questions
          .filter((q: {question?: string; options?: unknown[]; correctAnswer?: number}) => 
            q.question && q.options && Array.isArray(q.options) && q.options.length === 4)
          .map((q: {question: string; options: string[]; correctAnswer: number; explanation?: string; difficulty?: string}, index: number) => ({
            id: `q-${index + 1}`,
            question: String(q.question).slice(0, 150),
            options: q.options.slice(0, 4).map((opt: string) => String(opt).slice(0, 80)),
            correctAnswer: Math.max(0, Math.min(3, Number(q.correctAnswer) || 0)),
            explanation: String(q.explanation || 'Revisa el material de estudio').slice(0, 200),
            difficulty: (q.difficulty as 'easy' | 'medium' | 'hard') || 'medium'
          }))          .slice(0, 6);
      }
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
