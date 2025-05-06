'use client';
import Image from 'next/image';
import React, { useState } from 'react';

interface GalleryProps {
  images: { src: string; alt: string }[];
}

export default function Gallery({ images }: GalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
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
              onClick={() => setSelectedImage(img.src)}
            />
          </div>
        ))}
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 bg-gray bg-opacity-75 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl w-full p-4">
            <img src={selectedImage} alt="Ampliada" className="w-full h-auto rounded-xl" />
            <button
              className="absolute top-2 right-2 text-white bg-black bg-opacity-50 rounded-full px-3 py-1 hover:bg-opacity-80"
              onClick={() => setSelectedImage(null)}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
