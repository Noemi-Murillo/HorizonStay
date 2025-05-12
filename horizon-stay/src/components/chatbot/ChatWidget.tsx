'use client'
import { useState } from 'react';
import Chat from './Chat';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="mb-2 w-[350px]">
          <Chat onClose={() => setIsOpen(false)} />
        </div>
      )}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full bg-green-600 hover:bg-green-700 text-white flex items-center justify-center shadow-lg text-2xl"
        >
          🤖
        </button>
      )}
    </div>
  );
}