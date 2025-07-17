'use client';

import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, File, AlertCircle, Loader2 } from 'lucide-react';
import mammoth from 'mammoth';

interface FileUploaderProps {
  onFileProcessed: (text: string, fileName: string) => void;
  isProcessing: boolean;
  setIsProcessing: (processing: boolean) => void;
}

export default function FileUploader({ onFileProcessed, isProcessing, setIsProcessing }: FileUploaderProps) {
  const processWordDocument = async (file: File) => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const result = await mammoth.extractRawText({ arrayBuffer });
      return result.value;
    } catch (error) {
      console.error('Error processing Word document:', error);
      throw new Error('Error al procesar el documento Word');
    }
  };
  const processPDFDocument = async (file: File) => {
    try {
      console.log('📄 Procesando PDF:', file.name);
      
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await fetch('/api/process-pdf', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error processing PDF');
      }
      
      const { text, metadata } = await response.json();
      
      console.log('✅ PDF procesado exitosamente:', metadata);
      return text;
    } catch (error) {
      console.error('❌ Error processing PDF:', error);
      throw new Error(error instanceof Error ? error.message : 'Error al procesar el archivo PDF');
    }
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setIsProcessing(true);
    
    try {
      let extractedText = '';
      
      if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        extractedText = await processWordDocument(file);
      } else if (file.type === 'application/pdf') {
        extractedText = await processPDFDocument(file);
      } else {
        throw new Error('Tipo de archivo no soportado');
      }

      if (extractedText.trim()) {
        onFileProcessed(extractedText, file.name);
      } else {
        throw new Error('No se pudo extraer texto del documento');
      }
    } catch (error) {
      console.error('Error processing file:', error);
      alert(error instanceof Error ? error.message : 'Error al procesar el archivo');
    } finally {
      setIsProcessing(false);
    }
  }, [onFileProcessed, setIsProcessing]);

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/pdf': ['.pdf']
    },
    maxFiles: 1,
    disabled: isProcessing
  });

  const hasRejectedFiles = fileRejections.length > 0;

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200
          ${isDragActive 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
          }
          ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}
          ${hasRejectedFiles ? 'border-red-300 bg-red-50' : ''}
        `}
      >
        <input {...getInputProps()} />
        
        <div className="flex flex-col items-center space-y-4">
          {isProcessing ? (
            <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
          ) : (
            <Upload className={`w-12 h-12 ${isDragActive ? 'text-blue-600' : 'text-gray-400'}`} />
          )}
          
          <div>
            {isProcessing ? (
              <p className="text-lg font-medium text-blue-600">
                Procesando documento...
              </p>
            ) : isDragActive ? (
              <p className="text-lg font-medium text-blue-600">
                ¡Suelta el archivo aquí!
              </p>
            ) : (
              <>
                <p className="text-lg font-medium text-gray-700 mb-2">
                  Arrastra tu documento aquí o haz clic para seleccionar
                </p>
                <p className="text-sm text-gray-500">
                  Archivos soportados: .docx, .pdf
                </p>
              </>
            )}
          </div>
        </div>
      </div>

      {hasRejectedFiles && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-red-800">
                Archivo no válido
              </h4>
              <div className="mt-1 text-sm text-red-700">
                {fileRejections.map((rejection, index) => (
                  <div key={index}>
                    <p className="font-medium">{rejection.file.name}</p>
                    <ul className="list-disc list-inside">
                      {rejection.errors.map((error, errorIndex) => (
                        <li key={errorIndex}>
                          {error.code === 'file-invalid-type' 
                            ? 'Solo se permiten archivos .docx y .pdf'
                            : error.message
                          }
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center space-x-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <File className="w-5 h-5 text-blue-600" />
          <span className="text-sm font-medium text-blue-800">Word (.docx)</span>
        </div>
        <div className="flex items-center space-x-2 p-3 bg-red-50 rounded-lg border border-red-200">
          <File className="w-5 h-5 text-red-600" />
          <span className="text-sm font-medium text-red-800">PDF (.pdf)</span>
        </div>
      </div>
    </div>
  );
}
