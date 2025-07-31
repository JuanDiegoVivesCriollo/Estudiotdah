'use client';

import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, Bot, User, Loader2, Minimize2, Maximize2 } from 'lucide-react';
import toast from 'react-hot-toast';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

interface GeminiChatbotProps {
  isOpen: boolean;
  onToggle: () => void;
  studyContext?: string; // Optional context from the current document
  studyTitle?: string;
}

export default function GeminiChatbot({ isOpen, onToggle, studyContext, studyTitle }: GeminiChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [viewportHeight, setViewportHeight] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Detectar teclado virtual en móviles
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const initialHeight = window.visualViewport?.height || window.innerHeight;
    setViewportHeight(initialHeight);

    const handleViewportChange = () => {
      const currentHeight = window.visualViewport?.height || window.innerHeight;
      const heightDifference = initialHeight - currentHeight;
      
      // Si la altura se reduce más de 150px, probablemente el teclado está visible
      const keyboardIsVisible = heightDifference > 150;
      setKeyboardVisible(keyboardIsVisible);
      setViewportHeight(currentHeight);
    };

    const handleResize = () => {
      const currentHeight = window.innerHeight;
      const heightDifference = initialHeight - currentHeight;
      const keyboardIsVisible = heightDifference > 150;
      setKeyboardVisible(keyboardIsVisible);
      setViewportHeight(currentHeight);
    };

    // Usar visualViewport si está disponible (mejor para móviles)
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleViewportChange);
    } else {
      window.addEventListener('resize', handleResize);
    }

    return () => {
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', handleViewportChange);
      } else {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, []);

  // Ajustar scroll cuando el teclado aparece/desaparece
  useEffect(() => {
    if (keyboardVisible && inputRef.current) {
      // Pequeño delay para que el teclado termine de aparecer
      setTimeout(() => {
        inputRef.current?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        });
      }, 100);
    }
  }, [keyboardVisible]);

  // Welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: Message = {
        id: `msg-${Date.now()}`,
        type: 'ai',
        content: studyContext 
          ? `¡Hola! 👋 Soy tu asistente de estudio con IA. Estoy aquí para ayudarte con "${studyTitle || 'tu documento'}" o cualquier pregunta que tengas. ¿En qué puedo ayudarte hoy?`
          : '¡Hola! 👋 Soy tu asistente de estudio con IA. Puedo ayudarte con preguntas sobre estudios, conceptos, o lo que necesites. ¿En qué puedo ayudarte?',
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, studyContext, studyTitle, messages.length]);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, isMinimized]);  const sendMessage = async () => {
    if (!currentMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      type: 'user',
      content: currentMessage.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setCurrentMessage('');
    setIsLoading(true);

    try {
      console.log('🚀 Enviando mensaje al chatbot...');
      
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage.content,
          studyContext,
          studyTitle
        }),
      });

      console.log('📡 Respuesta del servidor:', response.status);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Error de conexión' }));
        console.error('❌ Error del servidor:', errorData);
        
        // Usar mensaje de fallback si está disponible
        if (errorData.fallbackMessage) {
          const aiMessage: Message = {
            id: `msg-${Date.now()}-ai`,
            type: 'ai',
            content: errorData.fallbackMessage,
            timestamp: new Date()
          };
          setMessages(prev => [...prev, aiMessage]);
          return;
        }
        
        throw new Error(errorData.error || `Error del servidor (${response.status})`);
      }

      const data = await response.json();
      console.log('✅ Respuesta exitosa del chatbot');

      if (!data.success || !data.message) {
        throw new Error('Respuesta inválida del servidor');
      }

      const aiMessage: Message = {
        id: `msg-${Date.now()}-ai`,
        type: 'ai',
        content: data.message,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
      
    } catch (error) {
      console.error('❌ Error completo enviando mensaje:', error);
      
      // Mensaje de error más específico según el tipo de error
      let errorContent = '😅 Ups, tuve un problema técnico. ¿Podrías intentar preguntarme de nuevo? Estoy aquí para ayudarte.';
      
      if (error instanceof Error) {
        if (error.message.includes('API Key')) {
          errorContent = '🔑 Hay un problema con la configuración de la IA. Por favor, contacta al administrador.';
        } else if (error.message.includes('429')) {
          errorContent = '⏰ Estoy un poco ocupado ahora. Espera unos segundos e intenta de nuevo.';
        } else if (error.message.includes('500')) {
          errorContent = '🛠️ Tengo problemas técnicos temporales. Intenta de nuevo en un momento.';
        } else if (error.message.includes('network') || error.message.includes('fetch')) {
          errorContent = '🌐 Problemas de conexión. Verifica tu internet e intenta de nuevo.';
        }
      }
      
      const errorMessage: Message = {
        id: `msg-${Date.now()}-error`,
        type: 'ai',
        content: errorContent,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, errorMessage]);
      
      // Toast más específico
      toast.error('Error al conectar con la IA. Intenta de nuevo.', {
        duration: 4000,
        position: 'top-right'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages([]);
    // Re-add welcome message
    const welcomeMessage: Message = {
      id: `msg-${Date.now()}`,
      type: 'ai',
      content: studyContext 
        ? `¡Hola! 👋 Soy tu asistente de estudio con IA. Estoy aquí para ayudarte con "${studyTitle || 'tu documento'}" o cualquier pregunta que tengas. ¿En qué puedo ayudarte hoy?`
        : '¡Hola! 👋 Soy tu asistente de estudio con IA. Puedo ayudarte con preguntas sobre estudios, conceptos, o lo que necesites. ¿En qué puedo ayudarte?',
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);
  };  if (!isOpen) {
    return (
      <button
        onClick={onToggle}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 
                   bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600 
                   text-white p-3 sm:p-4 rounded-full shadow-lg 
                   transition-all duration-200 hover:scale-110 z-50
                   focus:outline-none focus:ring-4 focus:ring-purple-300"
        aria-label="Abrir chatbot de IA"
      >
        <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
        <span className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-green-500 w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full animate-pulse"></span>
      </button>
    );
  }
  return (
    <div 
      className={`fixed z-50 transition-all duration-300 ${
        // En móviles con teclado visible, ajustar posición
        keyboardVisible 
          ? 'inset-x-0 top-2 bottom-2' 
          : 'inset-0 sm:inset-auto sm:bottom-20 sm:right-4 lg:right-6'
      }`}
    >
      {/* Overlay para móvil */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 sm:hidden"
        onClick={onToggle}
      />      {/* Contenedor principal del chat - Responsive y adaptable al teclado */}
      <div 
        ref={chatContainerRef}
        className={`relative w-full sm:w-80 md:w-96
                   bg-white dark:bg-gray-800 
                   sm:rounded-2xl sm:shadow-2xl 
                   border-0 sm:border border-gray-200 dark:border-gray-700 
                   transition-all duration-300 
                   flex flex-col ${
                     isMinimized ? 'sm:h-16' : ''
                   } ${
                     // En móviles, altura completa menos espacio para el teclado
                     keyboardVisible 
                       ? 'h-full max-h-[60vh] mx-2 rounded-lg' 
                       : 'h-full sm:h-[32rem]'
                   }`}
      >
        
        {/* Header responsivo */}
        <div className="flex items-center justify-between p-3 sm:p-4 
                       border-b border-gray-200 dark:border-gray-700 
                       bg-gradient-to-r from-purple-600 to-pink-600 text-white 
                       rounded-t-none sm:rounded-t-2xl
                       shrink-0">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <Bot className="w-5 h-5 sm:w-6 sm:h-6" />
            <div>
              <h3 className="font-semibold text-sm sm:text-base">Asistente IA</h3>
              {studyTitle && (
                <p className="text-xs text-purple-100 truncate max-w-[150px] sm:max-w-[200px]">
                  {studyTitle}
                </p>
              )}
            </div>
            <span className="bg-green-500 w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full animate-pulse"></span>
          </div>
          
          <div className="flex items-center space-x-1 sm:space-x-2">
            {/* Botón minimizar - solo en desktop */}
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="hidden sm:block hover:bg-white/20 p-1 sm:p-2 rounded transition-colors
                        focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
              aria-label={isMinimized ? "Maximizar" : "Minimizar"}
            >
              {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
            </button>
            
            <button
              onClick={onToggle}
              className="hover:bg-white/20 p-1 sm:p-2 rounded transition-colors
                        focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
              aria-label="Cerrar chatbot"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>        {!isMinimized && (
          <>            {/* Área de mensajes con scroll fijo */}
            <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 
                           bg-gray-50 dark:bg-gray-900/50 transition-colors duration-300
                           min-h-0 scrollbar-thin">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-2 sm:space-x-3 max-w-[85%] sm:max-w-[80%] ${
                    message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                  }`}>
                    <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-white text-xs sm:text-sm shrink-0 ${
                      message.type === 'user' ? 'bg-blue-600' : 'bg-purple-600'
                    }`}>
                      {message.type === 'user' ? <User className="w-3 h-3 sm:w-4 sm:h-4" /> : <Bot className="w-3 h-3 sm:w-4 sm:h-4" />}
                    </div>
                    
                    <div className={`p-2.5 sm:p-3 rounded-xl text-sm sm:text-base ${
                      message.type === 'user' 
                        ? 'bg-blue-600 text-white rounded-br-sm' 
                        : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-200 rounded-bl-sm transition-colors duration-300'
                    }`}>
                      <p className="leading-relaxed whitespace-pre-wrap break-words">{message.content}</p>
                      <span className={`text-xs mt-1 sm:mt-2 block ${
                        message.type === 'user' ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
                      }`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex items-start space-x-2 sm:space-x-3">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center bg-purple-600 text-white shrink-0">
                      <Bot className="w-3 h-3 sm:w-4 sm:h-4" />
                    </div>
                    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 p-2.5 sm:p-3 rounded-xl rounded-bl-sm transition-colors duration-300">
                      <div className="flex items-center space-x-2">
                        <Loader2 className="w-3 h-3 sm:w-4 sm:h-4 animate-spin text-purple-600" />
                        <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">Escribiendo...</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>            {/* Input area responsiva y adaptada al teclado */}
            <div className={`border-t border-gray-200 dark:border-gray-700 transition-colors duration-300 shrink-0 ${
              keyboardVisible 
                ? 'p-4 bg-white dark:bg-gray-800 shadow-lg' 
                : 'p-3 sm:p-4'
            }`}>
              <div className="flex items-center space-x-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Pregúntame cualquier cosa..."
                  className={`flex-1 border border-gray-300 dark:border-gray-600 
                           bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 
                           rounded-lg px-3 py-2 text-sm sm:text-base
                           focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent 
                           transition-colors duration-300 ${
                             keyboardVisible ? 'py-3 text-base' : ''
                           }`}
                  disabled={isLoading}
                />
                
                <button
                  onClick={sendMessage}
                  disabled={!currentMessage.trim() || isLoading}
                  className={`bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600 
                           disabled:bg-gray-400 text-white rounded-lg 
                           transition-colors disabled:cursor-not-allowed
                           focus:outline-none focus:ring-2 focus:ring-purple-300 ${
                             keyboardVisible ? 'p-3' : 'p-2 sm:p-2.5'
                           }`}
                  aria-label="Enviar mensaje"
                >
                  <Send className={keyboardVisible ? 'w-5 h-5' : 'w-4 h-4'} />
                </button>
              </div>
              
              <div className="flex justify-between mt-2 text-xs">
                <button
                  onClick={clearChat}
                  className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 
                           transition-colors focus:outline-none focus:underline"
                >
                  🗑️ Limpiar chat
                </button>
                
                {!keyboardVisible && (
                  <span className="text-gray-500 dark:text-gray-400 transition-colors duration-300 hidden sm:inline">
                    Presiona Enter para enviar
                  </span>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
