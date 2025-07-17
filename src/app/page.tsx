'use client';

import { useState, useRef } from 'react';
import FileUploader from '@/components/FileUploader';
import ProcessedDocument from '@/components/ProcessedDocument';
import GeminiChatbot from '@/components/GeminiChatbot';
import ThemeToggle from '@/components/ThemeToggle';
import { BookOpen, Brain, Target, Users, Zap, GraduationCap, ArrowDown, Sparkles, Eye } from 'lucide-react';

export default function Home() {
  const [processedText, setProcessedText] = useState<string>('');
  const [fileName, setFileName] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  
  // Estados para la experiencia guiada
  const [showGuide, setShowGuide] = useState(false);
  const [highlightOptions, setHighlightOptions] = useState(false);
  
  // Referencias para scroll automático
  const optionsRef = useRef<HTMLDivElement>(null);

  const handleFileProcessed = (text: string, name: string) => {
    setProcessedText(text);
    setFileName(name);
    
    // Activar la experiencia guiada
    setTimeout(() => {
      setShowGuide(true);
      // Scroll suave a las opciones
      optionsRef.current?.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
      });
      
      // Destacar las opciones después del scroll
      setTimeout(() => {
        setHighlightOptions(true);
      }, 1000);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      {/* Theme Toggle */}
      <div className="fixed top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b-4 border-blue-500 dark:border-blue-400 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2 transition-colors duration-300">
              <span className="text-blue-600 dark:text-blue-400">Estudio</span>TDAH
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto transition-colors duration-300">
              Convierte tus documentos en material de estudio optimizado con técnica de anclaje visual
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Features Section */}
        <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6 mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border-t-4 border-blue-500 dark:border-blue-400 text-center transition-colors duration-300">
            <BookOpen className="w-12 h-12 text-blue-600 dark:text-blue-400 mx-auto mb-4 transition-colors duration-300" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 transition-colors duration-300">Fácil Lectura</h3>
            <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">Mejora la comprensión con anclaje visual</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border-t-4 border-green-500 dark:border-green-400 text-center transition-colors duration-300">
            <Brain className="w-12 h-12 text-green-600 dark:text-green-400 mx-auto mb-4 transition-colors duration-300" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 transition-colors duration-300">TDAH Friendly</h3>
            <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">Diseñado específicamente para estudiantes con TDAH</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border-t-4 border-purple-500 dark:border-purple-400 text-center transition-colors duration-300">
            <Target className="w-12 h-12 text-purple-600 dark:text-purple-400 mx-auto mb-4 transition-colors duration-300" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 transition-colors duration-300">Mejor Enfoque</h3>
            <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">Técnicas probadas para mejorar la concentración</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border-t-4 border-orange-500 dark:border-orange-400 text-center transition-colors duration-300">
            <Users className="w-12 h-12 text-orange-600 dark:text-orange-400 mx-auto mb-4 transition-colors duration-300" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 transition-colors duration-300">Para Estudiantes</h3>
            <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">Optimizado para el aprendizaje académico</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border-t-4 border-pink-500 dark:border-pink-400 text-center transition-colors duration-300">
            <Zap className="w-12 h-12 text-pink-600 dark:text-pink-400 mx-auto mb-4 transition-colors duration-300" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 transition-colors duration-300">IA Integrada</h3>
            <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">Flashcards y preguntas generadas automáticamente</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border-t-4 border-indigo-500 dark:border-indigo-400 text-center transition-colors duration-300">
            <GraduationCap className="w-12 h-12 text-indigo-600 dark:text-indigo-400 mx-auto mb-4 transition-colors duration-300" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 transition-colors duration-300">Estudio Activo</h3>
            <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">Sesiones interactivas de aprendizaje</p>
          </div>
        </div>

        {/* Sección de Opciones Guiadas - aparece después de cargar archivo */}
        {processedText && (
          <div 
            ref={optionsRef}
            className={`mb-12 transition-all duration-1000 ${
              showGuide ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Mensaje de éxito con animación */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-green-500 to-blue-600 text-white px-8 py-4 rounded-full shadow-xl animate-bounce">
                <Sparkles className="w-6 h-6 animate-spin" />
                <span className="text-lg font-bold">¡Archivo procesado exitosamente!</span>
                <Sparkles className="w-6 h-6 animate-spin" />
              </div>
              
              {/* Flecha animada */}
              <div className="mt-6 flex justify-center">
                <ArrowDown className="w-10 h-10 text-blue-600 dark:text-blue-400 animate-bounce" />
              </div>
              
              <p className="text-xl font-semibold text-gray-700 dark:text-gray-300 mt-4">
                Ahora puedes elegir cómo quieres estudiar:
              </p>
            </div>

            {/* Opciones principales con animaciones destacadas */}
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              
              {/* Opción 1: Anclaje Visual */}
              <div 
                className={`guide-option relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-2xl cursor-pointer group transform transition-all duration-500 hover:scale-105 ${
                  highlightOptions 
                    ? 'ring-4 ring-blue-400 ring-opacity-75 animate-glow shadow-blue-500/50 highlight-shine' 
                    : ''
                } ${showGuide ? 'animate-fadeInLeft' : ''}`}
                onClick={() => {
                  // Scroll a la vista previa
                  const previewSection = document.querySelector('[data-section="preview"]');
                  previewSection?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }}
              >
                {/* Efecto de brillo */}
                {highlightOptions && (
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl opacity-20 animate-pulse"></div>
                )}
                
                <div className="relative z-10 text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Eye className="w-12 h-12 text-white" />
                  </div>
                  
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    📖 Anclaje Visual
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 text-lg mb-6 leading-relaxed">
                    Convierte tu documento aplicando la <span className="font-semibold text-blue-600 dark:text-blue-400">técnica de anclaje visual</span>. 
                    Mejora tu velocidad de lectura y comprensión.
                  </p>
                  
                  <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-xl">
                    <div className="flex items-center justify-center space-x-2 text-blue-800 dark:text-blue-200">
                      <Target className="w-5 h-5" />
                      <span className="font-semibold">Perfecto para lectura enfocada</span>
                    </div>
                  </div>
                  
                  {/* Indicador de acción */}
                  <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                    👆 Haz clic para ir a la vista previa
                  </div>
                </div>
              </div>

              {/* Opción 2: Sesión de Estudio IA */}
              <div 
                className={`guide-option relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-2xl cursor-pointer group transform transition-all duration-500 hover:scale-105 ${
                  highlightOptions 
                    ? 'ring-4 ring-purple-400 ring-opacity-75 animate-glow shadow-purple-500/50 highlight-shine' 
                    : ''
                } ${showGuide ? 'animate-fadeInRight' : ''}`}
                onClick={() => {
                  // Scroll a la sección de estudio
                  const studySection = document.querySelector('[data-section="study"]');
                  studySection?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }}
              >
                {/* Efecto de brillo */}
                {highlightOptions && (
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-500 rounded-2xl opacity-20 animate-pulse"></div>
                )}
                
                <div className="relative z-10 text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Brain className="w-12 h-12 text-white" />
                  </div>
                  
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    🧠 Estudio Inteligente
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 text-lg mb-6 leading-relaxed">
                    Crea <span className="font-semibold text-purple-600 dark:text-purple-400">flashcards, preguntas y resúmenes</span> automáticamente 
                    con IA. ¡Estudia de forma interactiva!
                  </p>
                  
                  <div className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-xl">
                    <div className="flex items-center justify-center space-x-2 text-purple-800 dark:text-purple-200">
                      <Zap className="w-5 h-5" />
                      <span className="font-semibold">Ideal para memorización activa</span>
                    </div>
                  </div>
                  
                  {/* Indicador de acción */}
                  <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                    👆 Haz clic para crear sesión de estudio
                  </div>
                </div>
              </div>
            </div>

            {/* Mensaje adicional con pulso */}
            <div className="text-center mt-8">
              <div className={`inline-block p-4 bg-yellow-100 dark:bg-yellow-900/30 rounded-xl ${highlightOptions ? 'animate-pulse' : ''}`}>
                <p className="text-yellow-800 dark:text-yellow-200 font-medium">
                  💡 <strong>Tip:</strong> Puedes usar ambas opciones para una experiencia de estudio completa
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* File Upload Section */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl transition-colors duration-300">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center transition-colors duration-300">
              Sube tu Documento
            </h2>
            <FileUploader 
              onFileProcessed={handleFileProcessed}
              isProcessing={isProcessing}
              setIsProcessing={setIsProcessing}
            />
            
            {/* Instructions */}
            <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/30 rounded-xl border border-blue-200 dark:border-blue-700 transition-colors duration-300">
              <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-300 mb-3 transition-colors duration-300">¿Cómo funciona?</h3>
              <ul className="space-y-2 text-blue-800 dark:text-blue-200 transition-colors duration-300">
                <li className="flex items-start">
                  <span className="text-blue-600 dark:text-blue-400 font-bold mr-2">1.</span>
                  Arrastra o selecciona tu archivo Word (.docx) o PDF
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 dark:text-blue-400 font-bold mr-2">2.</span>
                  El sistema aplicará anclaje visual automáticamente
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 dark:text-blue-400 font-bold mr-2">3.</span>
                  Descarga tu PDF optimizado o crea una sesión de estudio con IA
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 dark:text-blue-400 font-bold mr-2">4.</span>
                  <span className="text-purple-600 dark:text-purple-400 font-semibold">¡Nuevo!</span> Estudia con flashcards y preguntas generadas automáticamente
                </li>
              </ul>
            </div>
          </div>

          {/* Preview Section */}
          <div 
            data-section="preview"
            className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl transition-colors duration-300"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Vista Previa
            </h2>
            
            {processedText ? (
              <div data-section="study">
                <ProcessedDocument 
                  text={processedText} 
                  fileName={fileName}
                />
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <BookOpen className="w-12 h-12 text-gray-400" />
                </div>
                <p className="text-gray-500 text-lg">
                  Sube un documento para ver la vista previa con anclaje visual
                </p>
              </div>
            )}
          </div>
        </div>

        {/* AI Features Section */}
        <div className="mt-16 bg-gradient-to-r from-purple-600 to-pink-600 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 text-white shadow-xl transition-all duration-300 border dark:border-gray-700">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4 drop-shadow-lg">🤖 Potenciado por Inteligencia Artificial</h2>
            <p className="text-xl opacity-90 max-w-3xl mx-auto drop-shadow-md">
              Nuestra IA analiza tu documento y crea material de estudio personalizado para maximizar tu aprendizaje
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/10 dark:bg-white/5 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20 dark:border-gray-600 hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-300 hover:scale-105 shadow-lg">
              <div className="text-4xl mb-4 drop-shadow-lg">🧠</div>
              <h3 className="text-xl font-semibold mb-3 drop-shadow-md">Análisis Inteligente</h3>
              <p className="opacity-90 leading-relaxed">
                La IA identifica conceptos clave, temas principales y extrae información relevante de tu documento
              </p>
            </div>

            <div className="bg-white/10 dark:bg-white/5 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20 dark:border-gray-600 hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-300 hover:scale-105 shadow-lg">
              <div className="text-4xl mb-4 drop-shadow-lg">🎯</div>
              <h3 className="text-xl font-semibold mb-3 drop-shadow-md">Flashcards Automáticas</h3>
              <p className="opacity-90 leading-relaxed">
                Genera flashcards personalizadas con preguntas y respuestas basadas en el contenido específico
              </p>
            </div>

            <div className="bg-white/10 dark:bg-white/5 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20 dark:border-gray-600 hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-300 hover:scale-105 shadow-lg">
              <div className="text-4xl mb-4 drop-shadow-lg">📊</div>
              <h3 className="text-xl font-semibold mb-3 drop-shadow-md">Evaluación Adaptativa</h3>
              <p className="opacity-90 leading-relaxed">
                Preguntas de diferentes niveles de dificultad con explicaciones detalladas para reforzar el aprendizaje
              </p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <div className="bg-white/10 dark:bg-white/5 backdrop-blur-sm rounded-xl p-6 max-w-4xl mx-auto border border-white/20 dark:border-gray-600 shadow-lg">
              <h4 className="text-lg font-semibold mb-4 drop-shadow-md">✨ Beneficios del Estudio con IA:</h4>
              <div className="grid md:grid-cols-2 gap-4 text-left">
                <ul className="space-y-3 leading-relaxed">
                  <li className="flex items-start space-x-2">
                    <span className="text-yellow-300 dark:text-blue-400 font-bold">•</span>
                    <span><strong className="text-white drop-shadow-sm">Personalización:</strong> <span className="opacity-90">Contenido adaptado a tu documento específico</span></span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-yellow-300 dark:text-blue-400 font-bold">•</span>
                    <span><strong className="text-white drop-shadow-sm">Eficiencia:</strong> <span className="opacity-90">Ahorra tiempo creando material de estudio instantáneamente</span></span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-yellow-300 dark:text-blue-400 font-bold">•</span>
                    <span><strong className="text-white drop-shadow-sm">Retención:</strong> <span className="opacity-90">Flashcards optimizadas para la memoria a largo plazo</span></span>
                  </li>
                </ul>
                <ul className="space-y-3 leading-relaxed">
                  <li className="flex items-start space-x-2">
                    <span className="text-yellow-300 dark:text-blue-400 font-bold">•</span>
                    <span><strong className="text-white drop-shadow-sm">Comprensión:</strong> <span className="opacity-90">Preguntas que evalúan diferentes niveles de entendimiento</span></span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-yellow-300 dark:text-blue-400 font-bold">•</span>
                    <span><strong className="text-white drop-shadow-sm">Interactividad:</strong> <span className="opacity-90">Sesiones de estudio dinámicas y engaging</span></span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-yellow-300 dark:text-blue-400 font-bold">•</span>
                    <span><strong className="text-white drop-shadow-sm">Progreso:</strong> <span className="opacity-90">Seguimiento de tu rendimiento y áreas de mejora</span></span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Information Section */}
        <div className="mt-16 bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl transition-colors duration-300">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center transition-colors duration-300">
            ¿Qué es el Anclaje Visual?
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 transition-colors duration-300">Beneficios para Estudiantes con TDAH</h3>
              <ul className="space-y-3 text-gray-700 dark:text-gray-300 transition-colors duration-300">
                <li className="flex items-start">
                  <span className="text-green-600 dark:text-green-400 font-bold mr-2 transition-colors duration-300">✓</span>
                  Mejora la velocidad de lectura hasta un 13%
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 dark:text-green-400 font-bold mr-2 transition-colors duration-300">✓</span>
                  Reduce la fatiga visual durante el estudio
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 dark:text-green-400 font-bold mr-2 transition-colors duration-300">✓</span>
                  Aumenta la comprensión y retención
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 dark:text-green-400 font-bold mr-2 transition-colors duration-300">✓</span>
                  Facilita el seguimiento de líneas de texto
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 transition-colors duration-300">Cómo Funciona</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4 transition-colors duration-300">
                La técnica de anclaje visual resalta las primeras letras de cada palabra en negrita, 
                creando puntos de anclaje que ayudan al cerebro a procesar el texto de manera más eficiente.
              </p>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg transition-colors duration-300">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 transition-colors duration-300">Ejemplo:</p>
                <p className="text-lg text-gray-900 dark:text-gray-100 transition-colors duration-300">
                  <span className="font-bold text-blue-600 dark:text-blue-400">E</span>ste <span className="font-bold text-blue-600 dark:text-blue-400">e</span>s <span className="font-bold text-blue-600 dark:text-blue-400">u</span>n 
                  <span className="font-bold text-blue-600 dark:text-blue-400"> e</span>jemplo <span className="font-bold text-blue-600 dark:text-blue-400">d</span>e <span className="font-bold text-blue-600 dark:text-blue-400">t</span>exto 
                  <span className="font-bold text-blue-600 dark:text-blue-400"> c</span>on <span className="font-bold text-blue-600 dark:text-blue-400">a</span>nclaje <span className="font-bold text-blue-600 dark:text-blue-400">v</span>isual.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-bold mb-4">EstudioTDAH</h3>
          <p className="text-gray-400 mb-4">
            Herramienta diseñada con amor para estudiantes con TDAH
          </p>
          <p className="text-gray-500 text-sm">
            © 2025 EstudioTDAH. Mejorando la experiencia de aprendizaje.
          </p>
        </div>
      </footer>

      {/* Gemini AI Chatbot */}
      <GeminiChatbot
        isOpen={isChatbotOpen}
        onToggle={() => setIsChatbotOpen(!isChatbotOpen)}
        studyContext={processedText}
        studyTitle={fileName ? `Documento: ${fileName}` : undefined}
      />
    </div>
  );
}
