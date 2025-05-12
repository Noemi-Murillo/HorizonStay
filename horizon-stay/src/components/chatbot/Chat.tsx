'use client';
import { useState } from 'react';

export default function Chat({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<string[]>([
    'Bot: ¡Bienvenido a Horizon Stay! 🤖 Estoy aquí para ayudarte a reservar tu cabaña perfecta. Puedes preguntarme sobre precios, ubicación o disponibilidad.',
  ]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input.trim()) return;

    setMessages(prev => [...prev, `Tú: ${input}`]);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();
      setMessages(prev => [...prev, `Bot: ${data.response}`]);
    } catch (error) {
      setMessages(prev => [...prev, 'Bot: Ocurrió un error al conectar con el servidor.']);
    }

    setInput('');
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
        {messages.map((msg, i) => {
          const isUser = msg.startsWith('Tú:');
          const content = msg.replace(/^Tú: |^Bot: /, '');
          return (
            <div
              key={i}
              className={`max-w-[80%] px-3 py-2 rounded-xl text-sm flex items-start gap-2 ${
                isUser
                  ? 'bg-[#1A759F] text-white self-end flex-row-reverse'
                  : 'bg-white text-gray-900 self-start border border-gray-300'
              }`}
            >
              <span className="text-lg">{isUser ? '🧑' : '🤖'}</span>
              <span>{content}</span>
            </div>
          );
        })}
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
