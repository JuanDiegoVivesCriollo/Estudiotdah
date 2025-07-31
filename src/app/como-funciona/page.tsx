import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Cómo Funciona EstudioTDAH - Guía Completa de la Herramienta',
  description: 'Aprende paso a paso cómo usar EstudioTDAH para convertir tus documentos en material de estudio optimizado para TDAH. Guía completa con ejemplos prácticos.',
  keywords: [
    'como usar EstudioTDAH', 'tutorial TDAH', 'anclaje visual tutorial',
    'guía estudio TDAH', 'procesamiento documentos TDAH', 'flashcards IA'
  ],
  alternates: {
    canonical: 'https://estudiarcontdha.site/como-funciona',
  },
};

export default function ComoFuncionaPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            ¿Cómo Funciona EstudioTDAH?
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Guía paso a paso para transformar tus documentos en 
            <strong> material de estudio optimizado para TDAH</strong>
          </p>
        </header>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-8 text-center">
            Proceso Simple en 4 Pasos
          </h2>
          
          <div className="space-y-8">
            {/* Paso 1 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg border-l-4 border-blue-500">
              <div className="flex items-center mb-4">
                <span className="bg-blue-500 text-white w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold mr-4">1</span>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  Sube tu Documento
                </h3>
              </div>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                Arrastra y suelta tu archivo <strong>PDF o Word</strong> en la zona de carga. 
                EstudioTDAH acepta documentos de hasta 10MB y procesa el texto automáticamente.
              </p>
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  <strong>Formatos compatibles:</strong> .pdf, .docx, .doc
                </p>
              </div>
            </div>

            {/* Paso 2 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg border-l-4 border-purple-500">
              <div className="flex items-center mb-4">
                <span className="bg-purple-500 text-white w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold mr-4">2</span>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  Procesamiento con IA
                </h3>
              </div>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                Nuestra <strong>inteligencia artificial</strong> analiza el contenido y:
              </p>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
                <li>Extrae los <strong>conceptos clave</strong> del documento</li>
                <li>Genera un <strong>resumen optimizado</strong> para TDAH</li>
                <li>Crea <strong>flashcards inteligentes</strong> personalizadas</li>
                <li>Desarrolla <strong>preguntas de evaluación</strong> relevantes</li>
              </ul>
            </div>

            {/* Paso 3 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg border-l-4 border-green-500">
              <div className="flex items-center mb-4">
                <span className="bg-green-500 text-white w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold mr-4">3</span>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  Anclaje Visual Automático
                </h3>
              </div>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                El texto se transforma aplicando la <strong>técnica de anclaje visual</strong>:
              </p>
              <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">Texto Original:</h4>                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      &ldquo;Los estudiantes con TDAH necesitan técnicas especiales para concentrarse mejor.&rdquo;
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">Con Anclaje Visual:</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      &ldquo;<strong>L</strong>os <strong>e</strong>studiantes <strong>c</strong>on <strong>T</strong>DAH <strong>n</strong>ecesitan <strong>t</strong>écnicas <strong>e</strong>speciales <strong>p</strong>ara <strong>c</strong>oncentrarse <strong>m</strong>ejor.&rdquo;
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Paso 4 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg border-l-4 border-orange-500">
              <div className="flex items-center mb-4">
                <span className="bg-orange-500 text-white w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold mr-4">4</span>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  Estudia de Forma Efectiva
                </h3>
              </div>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                Accede a tu <strong>sesión de estudio personalizada</strong> que incluye:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
                  <h5 className="font-semibold text-orange-800 dark:text-orange-200 mb-2">📖 Documento Optimizado</h5>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Texto con anclaje visual para mejor concentración
                  </p>
                </div>
                <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
                  <h5 className="font-semibold text-orange-800 dark:text-orange-200 mb-2">🧠 Flashcards IA</h5>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Tarjetas de estudio generadas automáticamente
                  </p>
                </div>
                <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
                  <h5 className="font-semibold text-orange-800 dark:text-orange-200 mb-2">❓ Quiz Interactivo</h5>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Preguntas para evaluar tu comprensión
                  </p>
                </div>
                <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
                  <h5 className="font-semibold text-orange-800 dark:text-orange-200 mb-2">💬 Tutor IA</h5>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Chatbot para resolver dudas específicas
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-6">
            Características Especiales para TDAH
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-blue-100 dark:bg-blue-900/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Enfoque Mejorado
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  El anclaje visual reduce distracciones y mejora la concentración
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-purple-100 dark:bg-purple-900/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">⚡</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Procesamiento Rápido
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Información organizada en chunks manejables para el cerebro TDAH
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-green-100 dark:bg-green-900/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🧩</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Aprendizaje Multimodal
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Combina lectura, flashcards y evaluación interactiva
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="text-center">
          <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-6">
            ¿Listo para empezar?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Transforma tu próximo documento en una experiencia de estudio optimizada para TDAH
          </p>
          <Link 
            href="/"
            className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-4 px-8 rounded-lg text-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg"
          >
            Probar EstudioTDAH Gratis
          </Link>
        </section>
      </div>
    </div>
  );
}
