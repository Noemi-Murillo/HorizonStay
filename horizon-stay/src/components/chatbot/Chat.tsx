'use client';
import { useState, useEffect } from 'react';
import { getContext } from '@/chatbot/context';
import { getBotResponse } from '@/chatbot/brain';
import { Message } from '@/chatbot/types';

export default function Chat({ onClose }: { onClose: () => void }) {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    // Inicializar con mensaje de bienvenida
    setMessages([
      {
        type: 'bot',
        content: '¡Bienvenido a Horizon Stay! 🤖 Estoy aquí para ayudarte a reservar tu cabaña perfecta. Puedes preguntarme sobre precios, ubicación o disponibilidad.',
        timestamp: new Date()
      }
    ]);
  }, []);

  useEffect(() => {
    // Sincronizar mensajes con el contexto
    const context = getContext();
    setMessages(context.messages);
  }, [getContext().messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    try {
      const response = await getBotResponse(input);
      setInput('');
    } catch (error) {
      console.error('Error al procesar mensaje:', error);
      setMessages(prev => [
        ...prev,
        {
          type: 'bot',
          content: 'Ocurrió un error al conectar con el servidor.',
          timestamp: new Date()
        }
      ]);
    }
  };

  return (
    <div className="max-w-md w-[350px] bg-white border border-gray-300 rounded-xl shadow-xl overflow-hidden">
      <div className="bg-[#168AAD] text-white px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl">🤖</span>
          <div>
            <p className="font-bold leading-none">Asistente Horizon</p>
            <p className="text-sm leading-none">Servicio 24 horas</p>
          </div>
        </div>
        <button onClick={onClose} className="text-white text-lg hover:text-gray-200">×</button>
      </div>

      <div className="space-y-2 p-4 h-96 overflow-y-auto bg-gray-100 flex flex-col">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`max-w-[80%] px-3 py-2 rounded-xl text-sm flex items-start gap-2 ${
              msg.type === 'user'
                ? 'bg-[#1A759F] text-white self-end flex-row-reverse'
                : 'bg-white text-gray-900 self-start border border-gray-300'
            }`}
          >
            <span className="text-lg">{msg.type === 'user' ? '🧑' : '🤖'}</span>
            <span>{msg.content}</span>
          </div>
        ))}
      </div>

      <div className="px-4 py-3 bg-white border-t border-gray-200 flex gap-2">
        <input
          className="border border-gray-300 p-2 flex-grow rounded-lg focus:outline-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Escribe tu mensaje..."
        />
        <button
          className="bg-[#168AAD] hover:bg-[#1E6091] text-white px-4 rounded-lg"
          onClick={sendMessage}
        >
          ➤
        </button>
      </div>
    </div>
  );
}
