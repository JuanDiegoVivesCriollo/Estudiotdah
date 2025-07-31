import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Cómo Estudiar con TDAH: Técnicas y Herramientas Efectivas 2025',
  description: 'Descubre las mejores técnicas para estudiar con TDAH. Flashcards inteligentes, anclaje visual, lectura biónica y convertidores PDF para mejorar tu concentración y rendimiento académico.',
  keywords: [
    'como estudiar con TDAH', 'técnicas estudio TDAH', 'flashcards para estudio',
    'anclaje visual', 'lectura bionica', 'convertidor PDF TDAH', 
    'herramientas estudio TDAH', 'concentración TDAH', 'mejorar lectura TDAH',
    'como estudiar si tengo TDAH', 'tips estudio TDAH', 'ADHD study tips español'
  ],
  alternates: {
    canonical: 'https://estudiarcontdha.site/tecnicas-estudio-tdah',
  },
};

export default function TecnicasEstudioTDAHPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Cómo Estudiar con TDAH: Guía Completa 2025
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Técnicas probadas, herramientas digitales y estrategias efectivas para 
            <strong> estudiantes con TDAH</strong> que quieren mejorar su rendimiento académico
          </p>
        </header>

        {/* Técnicas principales */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-8">
            🎯 Técnicas de Estudio Más Efectivas para TDAH
          </h2>
          
          <div className="space-y-8">
            {/* Anclaje Visual */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg border-l-4 border-blue-500">
              <h3 className="text-2xl font-semibold text-blue-600 dark:text-blue-400 mb-4">
                1. Anclaje Visual (Técnica Más Efectiva)
              </h3>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                El <strong>anclaje visual</strong> consiste en resaltar la primera letra de cada palabra para crear puntos de enfoque. 
                Esta técnica mejora significativamente la <strong>concentración y velocidad de lectura</strong> en personas con TDAH.
              </p>
              <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg mb-4">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Ejemplo práctico:</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Texto normal:</p>                <p className="text-sm mb-3">&ldquo;Los estudiantes con TDAH pueden mejorar su concentración usando técnicas específicas.&rdquo;</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Con anclaje visual:</p>
                <p className="text-sm">
                  &ldquo;<strong>L</strong>os <strong>e</strong>studiantes <strong>c</strong>on <strong>T</strong>DAH <strong>p</strong>ueden <strong>m</strong>ejorar <strong>s</strong>u <strong>c</strong>oncentración <strong>u</strong>sando <strong>t</strong>écnicas <strong>e</strong>specíficas.&rdquo;
                </p>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                <p className="text-sm text-green-800 dark:text-green-200">
                  <strong>💡 Tip:</strong> EstudioTDAH aplica esta técnica automáticamente a tus documentos PDF y Word.
                </p>
              </div>
            </div>

            {/* Flashcards */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg border-l-4 border-purple-500">
              <h3 className="text-2xl font-semibold text-purple-600 dark:text-purple-400 mb-4">
                2. Flashcards Inteligentes para Estudio
              </h3>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                Las <strong>flashcards</strong> son perfectas para estudiantes con TDAH porque:
              </p>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4 mb-4">
                <li>Proporcionan <strong>retroalimentación inmediata</strong></li>
                <li>Dividen la información en <strong>chunks manejables</strong></li>
                <li>Permiten <strong>repetición espaciada</strong></li>
                <li>Mantienen la <strong>atención enfocada</strong> en conceptos específicos</li>
              </ul>
              <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                <p className="text-sm text-purple-800 dark:text-purple-200">
                  <strong>🧠 Ventaja IA:</strong> EstudioTDAH genera flashcards automáticamente basadas en tu material de estudio.
                </p>
              </div>
            </div>

            {/* Lectura Biónica */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg border-l-4 border-green-500">
              <h3 className="text-2xl font-semibold text-green-600 dark:text-green-400 mb-4">
                3. Lectura Biónica y Optimización de Texto
              </h3>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                La <strong>lectura biónica</strong> combina varias técnicas para optimizar la comprensión:
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">✅ Qué hacer:</h4>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• Usar fuentes sans-serif grandes</li>
                    <li>• Aumentar espaciado entre líneas</li>
                    <li>• Resaltar palabras clave</li>
                    <li>• Dividir texto en párrafos cortos</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2">❌ Qué evitar:</h4>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• Texto justificado</li>
                    <li>• Fondos con patrones</li>
                    <li>• Párrafos muy largos</li>
                    <li>• Fuentes decorativas</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Herramientas digitales */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-8">
            🛠️ Herramientas Digitales para Estudiantes con TDAH
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">
                📄 Convertidores PDF Especializados
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Convierte tus PDFs en material optimizado para TDAH con:
              </p>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                <li>✓ Anclaje visual automático</li>
                <li>✓ Mejora del contraste</li>
                <li>✓ Optimización de fuentes</li>
                <li>✓ Generación de resúmenes</li>
              </ul>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-purple-600 dark:text-purple-400 mb-3">
                🤖 IA para Estudio Personalizado
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Usa inteligencia artificial para:
              </p>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                <li>✓ Crear flashcards automáticas</li>
                <li>✓ Generar preguntas de repaso</li>
                <li>✓ Adaptar contenido a tu ritmo</li>
                <li>✓ Proporcionar explicaciones simples</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Tips específicos */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-8">
            💡 Tips Específicos: &ldquo;Cómo Estudiar si Tengo TDAH&rdquo;
          </h2>
          
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-8 text-white">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">⏰ Gestión del Tiempo</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Técnica Pomodoro (25 min estudio + 5 min descanso)</li>
                  <li>• Establecer metas micro (objetivos de 15 minutos)</li>
                  <li>• Usar timers visuales</li>
                  <li>• Planificar descansos activos</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">🎯 Concentración</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Eliminar distracciones digitales</li>
                  <li>• Usar música instrumental de fondo</li>
                  <li>• Estudiar en el mismo lugar siempre</li>
                  <li>• Hacer ejercicio antes de estudiar</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-6">
            ¿Listo para mejorar tu forma de estudiar?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Prueba EstudioTDAH y transforma tus documentos en material optimizado para TDAH
          </p>
          <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
            <Link 
              href="/"
              className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-4 px-8 rounded-lg text-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg"
            >
              Probar EstudioTDAH Gratis
            </Link>
            <Link 
              href="/como-funciona"
              className="inline-block bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-semibold py-4 px-8 rounded-lg text-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300"
            >
              Ver Cómo Funciona
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
