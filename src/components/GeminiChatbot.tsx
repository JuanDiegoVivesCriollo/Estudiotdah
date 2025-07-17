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
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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
  };
  if (!isOpen) {
    return (
      <button
        onClick={onToggle}
        className="fixed bottom-6 right-6 bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600 text-white p-4 rounded-full shadow-lg transition-all duration-200 hover:scale-110 z-50"
        aria-label="Abrir chatbot de IA"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="absolute -top-2 -right-2 bg-green-500 w-3 h-3 rounded-full animate-pulse"></span>
      </button>
    );
  }

  return (
    <div className={`fixed right-6 bottom-6 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 transition-all duration-300 z-50 ${
      isMinimized ? 'w-80 h-16' : 'w-96 h-[32rem]'
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-t-2xl">
        <div className="flex items-center space-x-2">
          <Bot className="w-5 h-5" />
          <h3 className="font-semibold">Asistente IA</h3>
          <span className="bg-green-500 w-2 h-2 rounded-full animate-pulse"></span>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="hover:bg-white/20 p-1 rounded transition-colors"
            aria-label={isMinimized ? "Maximizar" : "Minimizar"}
          >
            {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
          </button>
          
          <button
            onClick={onToggle}
            className="hover:bg-white/20 p-1 rounded transition-colors"
            aria-label="Cerrar chatbot"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 h-80 bg-gray-50 dark:bg-gray-900/50 transition-colors duration-300">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start space-x-2 max-w-[80%] ${
                  message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                }`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm ${
                    message.type === 'user' ? 'bg-blue-600' : 'bg-purple-600'
                  }`}>
                    {message.type === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>
                  
                  <div className={`p-3 rounded-xl ${
                    message.type === 'user' 
                      ? 'bg-blue-600 text-white rounded-br-sm' 
                      : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-200 rounded-bl-sm transition-colors duration-300'
                  }`}>
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                    <span className={`text-xs mt-1 block ${
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
                <div className="flex items-start space-x-2">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center bg-purple-600 text-white">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 p-3 rounded-xl rounded-bl-sm transition-colors duration-300">
                    <div className="flex items-center space-x-2">
                      <Loader2 className="w-4 h-4 animate-spin text-purple-600" />
                      <span className="text-sm text-gray-600 dark:text-gray-300">Escribiendo...</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>          {/* Input */}
          <div className="border-t border-gray-200 dark:border-gray-700 p-4 transition-colors duration-300">
            <div className="flex items-center space-x-2">
              <input
                ref={inputRef}
                type="text"
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Pregúntame cualquier cosa..."
                className="flex-1 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors duration-300"
                disabled={isLoading}
              />
              
              <button
                onClick={sendMessage}
                disabled={!currentMessage.trim() || isLoading}
                className="bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600 disabled:bg-gray-400 text-white p-2 rounded-lg transition-colors disabled:cursor-not-allowed"
                aria-label="Enviar mensaje"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            
            <div className="flex justify-between mt-2">
              <button
                onClick={clearChat}
                className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
              >
                🗑️ Limpiar chat
              </button>
              
              <span className="text-xs text-gray-500 dark:text-gray-400 transition-colors duration-300">
                Presiona Enter para enviar
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
