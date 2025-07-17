import { NextRequest, NextResponse } from 'next/server';
import { callGeminiAI, geminiPrompts } from '@/lib/gemini';

export async function POST(request: NextRequest) {
  try {
    console.log('🤖 Nueva solicitud al chatbot...');
    
    // Verificar API Key
    if (!process.env.GEMINI_API_KEY) {
      console.error('❌ GEMINI_API_KEY no configurada');
      return NextResponse.json(
        { 
          error: 'API Key no configurada',
          fallbackMessage: '🔧 El chatbot no está configurado correctamente. Contacta al administrador.'
        },
        { status: 500 }
      );
    }

    const { message, studyContext, studyTitle } = await request.json();

    // Validar entrada
    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Mensaje requerido' },
        { status: 400 }
      );
    }

    if (message.length > 1000) {
      return NextResponse.json(
        { error: 'Mensaje demasiado largo (máximo 1000 caracteres)' },
        { status: 400 }
      );
    }

    console.log('💬 Procesando mensaje del chatbot:', message.slice(0, 50) + '...');

    // Crear prompt contextualizado
    const prompt = geminiPrompts.chatbotResponse(
      message, 
      studyContext ? `${studyTitle}: ${studyContext.slice(0, 1000)}` : undefined
    );

    console.log('🚀 Enviando consulta a Gemini AI...');
    const aiResponse = await callGeminiAI(prompt);

    // Validar respuesta
    if (!aiResponse || aiResponse.trim().length === 0) {
      throw new Error('Respuesta vacía de la IA');
    }

    console.log('✅ Respuesta del chatbot generada exitosamente');

    return NextResponse.json({
      success: true,
      message: aiResponse.trim()
    });
  } catch (error) {
    console.error('❌ Error en chatbot API:', error);
    
    // Mejor manejo del error para debug
    let errorMessage = 'Error desconocido';
    let errorDetails = '';
    
    if (error instanceof Error) {
      errorMessage = error.message;
      errorDetails = error.stack || '';
    } else if (typeof error === 'object' && error !== null) {
      errorMessage = JSON.stringify(error);
    } else {
      errorMessage = String(error);
    }
    
    console.error('❌ Detalles completos del error:', {
      message: errorMessage,
      details: errorDetails,
      type: typeof error
    });
    
    // Mensajes de error específicos
    let fallbackMessage = '😅 Ups, tuve un problema técnico. ¿Podrías intentar preguntarme de nuevo?';
    
    if (errorMessage.includes('API Key')) {
      fallbackMessage = '🔑 Hay un problema con mi configuración. Por favor, contacta al administrador.';
    } else if (errorMessage.includes('QUOTA_EXCEEDED')) {
      fallbackMessage = '⏰ Estoy un poco ocupado ahora. Espera unos segundos e intenta de nuevo.';
    } else if (errorMessage.includes('SAFETY')) {
      fallbackMessage = '🛡️ Tu mensaje fue filtrado por seguridad. Intenta reformular tu pregunta.';
    } else if (errorMessage.includes('fetch') || errorMessage.includes('network')) {
      fallbackMessage = '🌐 Problemas de conexión. Verifica tu internet e intenta de nuevo.';
    }
    
    return NextResponse.json(
      { 
        error: 'Error connecting to AI chatbot',
        details: errorMessage,
        fallbackMessage
      },
      { status: 500 }
    );
  }
}
