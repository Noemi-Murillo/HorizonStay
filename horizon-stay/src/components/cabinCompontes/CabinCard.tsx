'use client';
import React from 'react';

type Cabin = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
};

type CabinCardProps = {
  cabin: Cabin;
};

const CabinCard: React.FC<CabinCardProps> = ({ cabin }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <img
        src={cabin.image}
        alt={cabin.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{cabin.name}</h3>
        <p className="text-gray-600 mb-4">{cabin.description}</p>
        <p className="text-gray-900 font-semibold mb-4">${cabin.price} por noche</p>
        <button className="bg-green-600 hover:bg-green-700 transition px-4 py-2 rounded text-white">
          Reservar
        </button>
      </div>
    </div>
  );
};

export default CabinCard;
