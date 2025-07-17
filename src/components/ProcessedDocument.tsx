'use client';

import React, { useState } from 'react';
import { Download, Eye, BookOpen, Brain, Loader2 } from 'lucide-react';
import jsPDF from 'jspdf';
import StudySessionComponent from './StudySession';
import toast from 'react-hot-toast';

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

interface ProcessedDocumentProps {
  text: string;
  fileName: string;
}

export default function ProcessedDocument({ text, fileName }: ProcessedDocumentProps) {
  const [studySession, setStudySession] = useState<StudySession | null>(null);
  const [isGeneratingStudySession, setIsGeneratingStudySession] = useState(false);
  const [showStudySession, setShowStudySession] = useState(false);
  // Generate study session with AI
  const generateStudySession = async () => {
    setIsGeneratingStudySession(true);
    toast.loading('Analizando documento con IA...', { id: 'generating-study' });
    
    try {
      const response = await fetch('/api/analyze-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          fileName
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate study session');
      }

      const { studySession } = await response.json();
      setStudySession(studySession);
      setShowStudySession(true);
      toast.success('¡Sesión de estudio creada exitosamente!', { id: 'generating-study' });
    } catch (error) {
      console.error('Error generating study session:', error);
      toast.error('Error al generar la sesión de estudio. Por favor, intenta de nuevo.', { id: 'generating-study' });
    } finally {
      setIsGeneratingStudySession(false);
    }
  };

  // If showing study session, render that component
  if (showStudySession && studySession) {
    return (
      <StudySessionComponent 
        studySession={studySession}
        onBack={() => setShowStudySession(false)}
      />
    );
  }  // Function to intelligently analyze content and determine which sections need visual anchoring
  const analyzeContentForAnchoring = (text: string): { shouldApplyAnchoring: boolean; sections: Array<{text: string; shouldAnchor: boolean}> } => {
    // Split text into sections/paragraphs
    const sections = text.split(/\n\s*\n/).filter(section => section.trim().length > 0);
    
    const analyzedSections = sections.map(section => {
      const cleanSection = section.trim().toLowerCase();
      
      // Patterns that should NOT have visual anchoring
      const noAnchoringPatterns = [
        // Cover page patterns
        /^(universidad|instituto|colegio|escuela)/,
        /^(titulo|title):/,
        /^(autor|author):/,
        /^(fecha|date):/,
        /^(carrera|carrera de|facultad)/,
        
        // Table of contents patterns
        /^(índice|indice|contenido|tabla de contenido)/,
        /^(índice general|contenidos)/,
        /^\d+\.\s*(introducción|desarrollo|conclusión)/,
        /página\s*\d+/,
        /^(capítulo|cap\.|chapter)\s*\d+/,
        
        // Bibliography patterns
        /^(bibliografía|bibliografia|referencias|fuentes)/,
        /^(referencias bibliográficas|fuentes consultadas)/,
        /https?:\/\//,
        /^[A-Z][a-z]+,\s*[A-Z]/,  // Author citations
        
        // Headers and footers
        /^página\s*\d+$/,
        /^\d+\s*$/,
        
        // Very short sections (likely titles)
        /^.{1,20}$/,
        
        // Academic formatting
        /^(resumen|abstract|introducción|conclusiones)$/,
        /^(anexo|apéndice|appendix)/,
        /^(figura|fig\.|tabla|cuadro)\s*\d+/,
      ];
      
      // Check if section should NOT have anchoring
      const shouldNotAnchor = noAnchoringPatterns.some(pattern => pattern.test(cleanSection));
      
      // Additional checks for content that should have anchoring
      const hasSubstantialContent = section.split(/\s+/).length > 10; // More than 10 words
      const hasNormalText = /[a-z]/.test(section); // Contains lowercase letters (not all caps)
      
      const shouldAnchor = !shouldNotAnchor && hasSubstantialContent && hasNormalText;
      
      return {
        text: section,
        shouldAnchor
      };
    });
    
    const overallShouldApply = analyzedSections.some(section => section.shouldAnchor);
    
    return {
      shouldApplyAnchoring: overallShouldApply,
      sections: analyzedSections
    };
  };

  // Enhanced function to apply visual anchoring only to appropriate sections
  const applyIntelligentVisualAnchoring = (text: string) => {
    const analysis = analyzeContentForAnchoring(text);
    
    return analysis.sections.map((section, sectionIndex) => {
      if (!section.shouldAnchor) {
        // Return section without anchoring - just normal text
        return (
          <div key={sectionIndex} className="mb-4">
            <span className="text-gray-800 dark:text-gray-200">{section.text}</span>
          </div>
        );
      }
      
      // Apply visual anchoring to this section
      const anchoredText = section.text.split(/(\s+)/).map((part, index) => {
        if (part.trim() === '') {
          return part; // Preserve whitespace
        }
        
        const firstLetter = part.charAt(0);
        const restOfWord = part.substring(1);
        
        return (
          <span key={index}>
            <span className="font-bold text-blue-600 dark:text-blue-400 transition-colors duration-300">{firstLetter}</span>
            <span className="text-gray-800 dark:text-gray-200">{restOfWord}</span>
          </span>
        );
      });
      
      return (
        <div key={sectionIndex} className="mb-4">
          {anchoredText}
        </div>
      );
    });
  };
  // Function to generate PDF with intelligent visual anchoring
  const generatePDF = () => {
    toast.loading('Generando PDF con anclaje visual inteligente...', { id: 'generating-pdf' });
    
    try {
      const pdf = new jsPDF();
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 20;
      const lineHeight = 7;
      const maxWidth = pageWidth - (margin * 2);
      
      // Set font
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(12);
      
      // Title
      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Documento con Anclaje Visual Inteligente', margin, margin + 10);
      
      // Subtitle
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      pdf.text(`Archivo original: ${fileName}`, margin, margin + 20);
      pdf.text('Procesado con EstudioTDAH - IA aplicada', margin, margin + 25);
      
      // Analyze content for intelligent anchoring
      const analysis = analyzeContentForAnchoring(text);
      
      // Process text with intelligent visual anchoring for PDF
      pdf.setFontSize(12);
      let yPosition = margin + 40;
      
      // Process each analyzed section
      analysis.sections.forEach((section) => {
        if (section.text.trim() === '') return;
        
        // Split section into paragraphs
        const paragraphs = section.text.split('\n').filter(p => p.trim());
        
        paragraphs.forEach((paragraph) => {
          // Split paragraph into words
          const words = paragraph.split(/\s+/);
          let currentLine = '';
          
          words.forEach((word) => {
            const testLine = currentLine + (currentLine ? ' ' : '') + word;
            const textWidth = pdf.getTextWidth(testLine);
            
            if (textWidth > maxWidth && currentLine !== '') {
              // Process current line with or without visual anchoring based on analysis
              if (section.shouldAnchor) {
                processLineForPDFWithAnchoring(pdf, currentLine, margin, yPosition);
              } else {
                processLineForPDFWithoutAnchoring(pdf, currentLine, margin, yPosition);
              }
              yPosition += lineHeight;
              currentLine = word;
              
              // Check if we need a new page
              if (yPosition > pageHeight - margin) {
                pdf.addPage();
                yPosition = margin;
              }
            } else {
              currentLine = testLine;
            }
          });
          
          // Process remaining text in current line
          if (currentLine) {
            if (section.shouldAnchor) {
              processLineForPDFWithAnchoring(pdf, currentLine, margin, yPosition);
            } else {
              processLineForPDFWithoutAnchoring(pdf, currentLine, margin, yPosition);
            }
            yPosition += lineHeight;
          }
          
          // Add extra space between paragraphs
          yPosition += lineHeight * 0.3;
          
          // Check if we need a new page
          if (yPosition > pageHeight - margin) {
            pdf.addPage();
            yPosition = margin;
          }
        });
        
        // Add extra space between sections
        yPosition += lineHeight * 0.5;
      });
      
      // Save the PDF
      const newFileName = fileName.replace(/\.[^/.]+$/, '') + '_anclaje_visual_ia.pdf';
      pdf.save(newFileName);
      toast.success('¡PDF con IA descargado exitosamente!', { id: 'generating-pdf' });
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast.error('Error al generar el PDF. Por favor, intenta de nuevo.', { id: 'generating-pdf' });
    }
  };

  // Helper function to process a line for PDF with visual anchoring
  const processLineForPDFWithAnchoring = (pdf: jsPDF, line: string, x: number, y: number) => {
    const words = line.split(/\s+/);
    let currentX = x;
    
    words.forEach((word, index) => {
      if (word.trim() === '') return;
      
      // Add space before word (except for first word)
      if (index > 0) {
        const spaceWidth = pdf.getTextWidth(' ');
        currentX += spaceWidth;
      }
      
      // First letter bold
      const firstLetter = word.charAt(0);
      const restOfWord = word.substring(1);
      
      // Bold first letter
      pdf.setFont('helvetica', 'bold');
      pdf.text(firstLetter, currentX, y);
      const firstLetterWidth = pdf.getTextWidth(firstLetter);
      currentX += firstLetterWidth;
      
      // Normal text for rest of word
      pdf.setFont('helvetica', 'normal');
      pdf.text(restOfWord, currentX, y);
      const restWidth = pdf.getTextWidth(restOfWord);
      currentX += restWidth;
    });
  };

  // Helper function to process a line for PDF without visual anchoring
  const processLineForPDFWithoutAnchoring = (pdf: jsPDF, line: string, x: number, y: number) => {
    pdf.setFont('helvetica', 'normal');
    pdf.text(line, x, y);
  };

  // Truncate text for preview
  const previewText = text.length > 500 ? text.substring(0, 500) + '...' : text;
  return (
    <div className="space-y-6">
      {/* Document Info */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 transition-colors duration-300">
        <div className="flex items-center space-x-3">
          <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400 transition-colors duration-300" />
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white transition-colors duration-300">{fileName}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">
              {text.split(/\s+/).length} palabras • Listo para descargar
            </p>
          </div>
        </div>
      </div>{/* Preview */}
      <div className="border border-gray-200 dark:border-gray-700 rounded-lg transition-colors duration-300">
        <div className="bg-gray-50 dark:bg-gray-800 px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex items-center space-x-2 transition-colors duration-300">
          <Eye className="w-4 h-4 text-gray-600 dark:text-gray-400 transition-colors duration-300" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-300">Vista Previa con Anclaje Visual Inteligente (IA)</span>
        </div>          <div className="p-6 max-h-96 overflow-y-auto bg-white dark:bg-gray-900 transition-colors duration-300">
          <div className="text-base leading-relaxed">
            {applyIntelligentVisualAnchoring(previewText)}
          </div>
          
          {text.length > 500 && (
            <div className="mt-4 text-center">
              <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full transition-colors duration-300">
                Vista previa limitada • Descarga el PDF completo
              </span>
            </div>
          )}
        </div>
      </div>      {/* Download Buttons */}
      <div className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <button
            onClick={generatePDF}
            className="inline-flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            <Download className="w-5 h-5" />
            <span>Descargar PDF con IA + Anclaje</span>
          </button>

          <button
            onClick={generateStudySession}
            disabled={isGeneratingStudySession}
            className="inline-flex items-center justify-center space-x-2 bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600 disabled:bg-purple-400 disabled:dark:bg-purple-500 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl disabled:cursor-not-allowed"
          >
            {isGeneratingStudySession ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Brain className="w-5 h-5" />
            )}
            <span>
              {isGeneratingStudySession ? 'Generando...' : 'Crear Sesión de Estudio con IA'}
            </span>
          </button>
        </div>
          <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 transition-colors duration-300">
            La IA analizará tu documento y aplicará anclaje visual solo al contenido principal (excluyendo portadas, índices, bibliografías)
          </p>
          <p className="text-sm text-purple-600 dark:text-purple-400 transition-colors duration-300">
            ✨ <strong>Nuevo:</strong> Análisis inteligente con IA + Sesiones de estudio personalizadas
          </p>
        </div>
      </div>{/* Benefits Info */}
      <div className="grid md:grid-cols-2 gap-4">        <div className="bg-green-50 dark:bg-green-900/30 rounded-lg p-4 border border-green-200 dark:border-green-700 transition-colors duration-300">
          <h4 className="font-semibold text-green-900 dark:text-green-300 mb-2 transition-colors duration-300">
            🤖 Tu documento con IA incluye:
          </h4>
          <ul className="text-sm text-green-800 dark:text-green-200 space-y-1 transition-colors duration-300">
            <li>• Análisis inteligente de contenido</li>
            <li>• Anclaje visual solo en texto principal</li>
            <li>• Respeta portadas, índices y bibliografías</li>
            <li>• Optimizado para personas con TDAH</li>
          </ul>
        </div>

        <div className="bg-purple-50 dark:bg-purple-900/30 rounded-lg p-4 border border-purple-200 dark:border-purple-700 transition-colors duration-300">
          <h4 className="font-semibold text-purple-900 dark:text-purple-300 mb-2 transition-colors duration-300">
            🤖 Con IA puedes obtener:
          </h4>
          <ul className="text-sm text-purple-800 dark:text-purple-200 space-y-1 transition-colors duration-300">
            <li>• Flashcards generadas automáticamente</li>
            <li>• Preguntas de comprensión personalizadas</li>
            <li>• Resumen inteligente del contenido</li>
            <li>• Sesiones de estudio interactivas</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
