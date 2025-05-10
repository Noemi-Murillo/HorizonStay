'use client';
import Image from 'next/image';
import React, { useState } from 'react';

interface GalleryProps {
  images: { src: string; alt: string }[];
}

export default function Gallery({ images }: GalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + images.length) % images.length);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % images.length);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <main className="flex-grow p-4">
        <h2 className="text-2xl font-bold mb-4 text-center">Galería</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((img, index) => (
            <div key={index} className="cursor-pointer group relative">
              <Image
                src={img.src}
                alt={img.alt}
                width={500}
                height={300}
                className="rounded-lg object-cover w-full h-60 transition-transform duration-300 group-hover:scale-105"
                onClick={() => setSelectedIndex(index)}
              />
            </div>
          ))}
        </div>
      </main>

      {selectedIndex !== null && (
        <div className="fixed inset-0 bg-white/10 backdrop-blur-md flex items-center justify-center z-50 px-2"
          onClick={() => setSelectedIndex(null)}>
          {images.length > 1 && (
            <>
              <button className="absolute left-2 sm:left-6 top-1/2 transform -translate-y-1/2 text-white text-4xl font-bold bg-black bg-opacity-30 hover:bg-opacity-50 rounded-full w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
                onClick={handlePrev}
              >
                ‹
              </button>
              <button className="absolute right-2 sm:right-6 top-1/2 transform -translate-y-1/2 text-white text-4xl font-bold bg-black bg-opacity-30 hover:bg-opacity-50 rounded-full w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
                onClick={handleNext} >
                ›
              </button>
            </>
          )}

          <div className="relative w-full max-w-[90vw] max-h-[80vh] sm:w-[800px] sm:h-[500px]">
            <img
              src={images[selectedIndex].src}
              alt="Ampliada"
              className="object-cover w-full h-full rounded-xl shadow-lg"
              onClick={(e) => e.stopPropagation()}
            />
            <button className="absolute top-2 right-2 text-white bg-black bg-opacity-50 rounded-full px-3 py-1 hover:bg-opacity-80 transition-all duration-300 hover:scale-110"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedIndex(null);
              }} >
              ✕
            </button>
          </div>
        </div>
      )}

      <footer className="w-full bg-gray-800 text-white text-center py-6">
        <p>&copy; {new Date().getFullYear()} Horizon Stay. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}
