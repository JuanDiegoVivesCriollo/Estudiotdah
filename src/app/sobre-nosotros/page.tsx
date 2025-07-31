import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Sobre la Aplicación - EstudioTDAH: Creado con Amor para Estudiantes con TDAH',
  description: 'Conoce la historia detrás de EstudioTDAH: una herramienta web creada por amor para Ashly y todos los estudiantes con TDAH. Una historia de amor, tecnología y superación académica.',
  keywords: [
    'historia EstudioTDAH', 'TDAH amor', 'estudiantes TDAH', 'técnicas estudio TDAH',
    'anclaje visual', 'herramienta personalizada TDAH', 'Ashly TDAH', 'amor y tecnología'
  ],
  alternates: {
    canonical: 'https://estudiarcontdha.site/sobre-nosotros',
  },
};

export default function SobreNosotrosPage() {
  return (
    <div className="min-h-screen relative">      {/* Fondo mejorado con patrones */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-100 to-purple-100 dark:from-gray-900 dark:to-blue-900/20"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_0)] bg-[length:20px_20px] dark:bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.03)_1px,transparent_0)]"></div>
      
      <div className="relative max-w-5xl mx-auto px-4 py-12">
        {/* Header mejorado con foto */}
        <header className="text-center mb-20">
          <div className="relative">
            {/* Foto de ustedes dos */}
            <div className="flex justify-center mb-8">
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 rounded-full opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt blur-lg"></div>
                <img 
                  src="/img/ashi.webp" 
                  alt="Diego y Ashly - Los creadores de EstudioTDAH"
                  className="relative w-40 h-40 md:w-48 md:h-48 rounded-full object-cover border-4 border-white shadow-2xl group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center animate-pulse">
                  <span className="text-2xl">💝</span>
                </div>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-6">
              Sobre la Aplicación
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              La historia de <strong className="text-pink-600 dark:text-pink-400">amor, dedicación y tecnología</strong> 
              detrás de EstudioTDAH
            </p>
          </div>
        </header>

        {/* Historia principal con diseño mejorado */}
        <section className="mb-20">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-blue-500/10 rounded-3xl blur-xl"></div>
            <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl p-8 md:p-12 shadow-2xl border border-white/20">
              <div className="flex items-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center mr-6 shadow-lg">
                  <span className="text-3xl">💕</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                  Todo empezó por mi bb Ashly ❤️
                </h2>
              </div>
              
              <div className="space-y-6 text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
                <p>
                  Esta herramienta nació por Ashly, mi bb. 
                  <strong className="text-pink-600 dark:text-pink-400"> Nació del amor</strong>. 
                  EstudioTDAH fue creado específicamente para <strong>Ashly</strong>, mi novia, 
                  quien vive con TDAH y enfrentaba desafíos en la universidad. Quizás aún falte hacer algunas cosas, pero las mejorare.
                </p>
              
              <p>
                 La veía luchar con textos largos, perdiendo la concentración, 
                sintiéndose frustrada por no poder retener la información como sus amiguitos. 
                <strong className="text-blue-600 dark:text-blue-400">Ella me dijo la idea que hacerle una pagina web 
                  sobre eso a ella, ella lo dijo que broma, pero yo me lo llve en serio jaksjajksa</strong>.
              </p>
                <p>
                Como desarrollador, tenía las herramientas. Como su pareja, tenía la motivación. 
              
              </p>
              </div>
            </div>
          </div>
        </section>

        {/* El proceso de creación */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-8 text-center">
            El Proceso de Creación
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-pink-100 to-red-100 dark:from-pink-900/20 dark:to-red-900/20 rounded-xl p-6 text-center">
              <div className="w-16 h-16 bg-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👀</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Observación
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Vi cómo mi bb interactuaba con los textos, qué la distraía y qué la ayudaba a concentrarse. Ella habia encontrado una herramienta nueva que ella me mostro y de ahi ella me dijo que porque no creaba una para ella asi de broma, pero yo me lo lleve en serio.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-6 text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔬</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Investigación
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Investigué sobre TDAH, técnicas de anclaje visual y cómo la tecnología podía ser una aliada.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 text-center">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💻</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Desarrollo
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Algunas noches de código, ayuda con IA xd, ajustes, más código etc hasta crear algo verdaderamente útil.
              </p>
            </div>
          </div>
        </section>

        {/* Los primeros resultados */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl p-8 text-white">
            <div className="text-center mb-8">
              <span className="text-6xl mb-4 block">🎉</span>
              <h2 className="text-3xl font-bold mb-4">Lo que quiero lograr</h2>
               <li>✨ Lectura 40% más rápida</li>
                  <li>✨ Mejor retención de información</li>
                  <li>✨ Menos fatiga mental</li>
                  <li>✨ Mayor confianza académica</li>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white/10 rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-3">Para Ashly ❤️:</h3>
                <ul className="space-y-2 text-lg">
                 <li>💕 Menos estrés</li>
                  <li>💕 Más tiempo de calidad juntos</li>
                  <li>💕 Ella más feliz y segura</li>
                  <li>💕 Un proyecto donde demuestra cuando amo a mi bb</li>
                </ul>
              </div>
              
              
            </div>
          </div>
        </section>

        

        {/* Tecnología con propósito */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-8 text-center">
            Tecnología con Propósito
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3 flex items-center">
                <span className="mr-3">🧠</span>
                Anclaje Visual Inteligente
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Desarrollado y viendo cómo Ashly procesaba la información, 
                creando puntos de anclaje que mejoran la concentración.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-purple-600 dark:text-purple-400 mb-3 flex items-center">
                <span className="mr-3">🤖</span>
                IA Educativa Personalizada
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Genera flashcards y contenido adaptado al ritmo de aprendizaje único 
                de cada estudiante con TDAH.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-green-600 dark:text-green-400 mb-3 flex items-center">
                <span className="mr-3">🎯</span>
                Diseño Sin Distracciones
              </h3>
              
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-orange-600 dark:text-orange-400 mb-3 flex items-center">
                <span className="mr-3">💝</span>
                Hecho con Amor
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Cada línea de código fue escrita pensando en hacer la vida de mi bb
                más fácil y estudiantes como ella.
              </p>
            </div>
          </div>
        </section>

        {/* Mensaje personal final */}
        <section className="text-center">
          <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-2xl p-8 text-white">
            <span className="text-6xl mb-6 block">💌</span>
            <h2 className="text-3xl font-bold mb-6">
              Para Ashly.
            </h2>
            <p className="text-xl mb-8 leading-relaxed max-w-3xl mx-auto">
              Corazon de melon, esto es para ti. Para que puedas estudiar mejor, se que faltan majoeras, 
              para todas las veces que dudaste de ti misma, para todos los logros que están por venir. 
              <strong>Eres más fuerte e inteligente de lo que crees.</strong>
            </p>
            
           
            
            <Link 
              href="/"
              className="inline-block bg-white text-purple-600 font-bold py-4 px-8 rounded-xl text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg transform hover:scale-105"
            >
              Comenzar a Estudiar Mejor ✨
            </Link>
            
            <p className="text-sm mt-6 opacity-90">
              Con amor, para Ashly 💕
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}