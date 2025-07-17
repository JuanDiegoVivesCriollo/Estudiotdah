# EstudioTDAH - Anclaje Visual para Estudiantes

Una aplicación web moderna diseñada específicamente para estudiantes con TDAH que convierte documentos Word y PDF en material de estudio optimizado usando la técnica de anclaje visual.

## 🎯 Características Principales

- **Carga de Archivos**: Soporta documentos Word (.docx) y PDF
- **Anclaje Visual**: Aplica automáticamente negrita a la primera letra de cada palabra
- **Generación de PDF**: Crea PDFs optimizados para mejor lectura
- **🤖 IA REAL con Gemini**: Análisis inteligente de contenido con Google Gemini 2.0
- **📚 Flashcards Personalizadas**: 12 tarjetas generadas automáticamente del contenido
- **🎯 Quiz Inteligente**: 8 preguntas de comprensión con opciones múltiples
- **📊 Sesiones de Estudio Completas**: Experiencias de aprendizaje interactivas
- **Interfaz TDAH-Friendly**: Diseño limpio y enfocado en la accesibilidad
- **Responsive**: Funciona perfectamente en todos los dispositivos

## 🧠 ¿Qué es el Anclaje Visual?

El anclaje visual es una técnica que resalta las primeras letras de cada palabra en negrita, creando puntos de anclaje que ayudan al cerebro a procesar el texto de manera más eficiente. Esto es especialmente beneficioso para personas con TDAH.

### Beneficios Comprobados:
- ✅ Mejora la velocidad de lectura hasta un 13%
- ✅ Reduce la fatiga visual durante el estudio
- ✅ Aumenta la comprensión y retención
- ✅ Facilita el seguimiento de líneas de texto
- ✅ **🚀 IA REAL**: Google Gemini 2.0 analiza tu contenido específico
- ✅ **🧠 Personalización Extrema**: Flashcards y preguntas del texto real
- ✅ **🎯 Aprendizaje Adaptativo**: Material educativo de calidad superior

## 🚀 Tecnologías Utilizadas

- **Frontend**: Next.js 15 con TypeScript
- **Styling**: Tailwind CSS
- **Procesamiento de Archivos**: 
  - Mammoth (Word documents)
  - API personalizada (PDF processing)
- **Generación de PDF**: jsPDF
- **UI Components**: Lucide React para iconos
- **File Upload**: React Dropzone

## 🛠️ Instalación y Uso

### Requisitos Previos
- Node.js 18.17 o superior
- npm, yarn, pnpm o bun

### Instalación

1. Clona el repositorio:
```bash
git clone <repository-url>
cd webtdha
```

2. Instala las dependencias:
```bash
npm install
# o
yarn install
# o
pnpm install
# o
bun install
```

3. Ejecuta el servidor de desarrollo:
```bash
npm run dev
# o
yarn dev
# o
pnpm dev
# o
bun dev
```

4. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── api/
│   │   └── process-pdf/
│   │       └── route.ts          # API para procesamiento de PDFs
│   ├── globals.css               # Estilos globales
│   ├── layout.tsx               # Layout principal
│   └── page.tsx                 # Página principal
├── components/
│   ├── FileUploader.tsx         # Componente de carga de archivos
│   └── ProcessedDocument.tsx    # Componente de visualización y descarga
└── .github/
    └── copilot-instructions.md  # Instrucciones para GitHub Copilot
```

## 🎨 Principios de Diseño

- **Interfaz libre de distracciones**: Colores de alto contraste y elementos claros
- **Navegación intuitiva**: Flujo de trabajo simple y directo
- **Accesibilidad primero**: Diseñado pensando en usuarios con TDAH
- **Responsive**: Optimizado para móviles y escritorio

## 🔧 Personalización

Para personalizar la aplicación:

1. **Colores**: Modifica los colores en `tailwind.config.ts`
2. **Estilos**: Actualiza los componentes en `src/components/`
3. **Procesamiento**: Mejora la lógica de procesamiento en `src/app/api/`

## 📱 Uso de la Aplicación

1. **Sube tu documento**: Arrastra o selecciona un archivo .docx o .pdf
2. **Procesamiento automático**: La aplicación extrae el texto y aplica anclaje visual
3. **Vista previa**: Revisa cómo se ve el texto con anclaje visual
4. **Descarga o Estudia**: 
   - Obtén tu PDF optimizado para mejor lectura
   - **🆕 Crea una sesión de estudio con IA** que incluye:
     - Flashcards personalizadas
     - Preguntas de comprensión
     - Resumen inteligente del contenido
     - Evaluación adaptativa

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👥 Soporte

Si tienes alguna pregunta o necesitas ayuda:
- Abre un issue en GitHub
- Contacta al equipo de EstudioTDAH

---

**EstudioTDAH** - Mejorando la experiencia de aprendizaje para estudiantes con TDAH 🎓
