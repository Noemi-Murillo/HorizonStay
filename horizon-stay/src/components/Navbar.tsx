'use client';
import Link from 'next/link';
import React, { useState, useRef, useEffect } from 'react';

export default function Navbar() {
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const dropdownRefs = {
    getToKnowUs: useRef<HTMLLIElement>(null),
    cabins: useRef<HTMLLIElement>(null),
    reservations: useRef<HTMLLIElement>(null),
    experiences: useRef<HTMLLIElement>(null),
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const isClickInside = Object.values(dropdownRefs).some(
        (ref) => ref.current && ref.current.contains(event.target as Node)
      );
      if (!isClickInside) setActiveItem(null);
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleItem = (item: string) => {
    setActiveItem(activeItem === item ? null : item);
  };

  return (
    <nav className="bg-gray-100 p-4 shadow">
      <ul className="flex gap-6 relative">
        <li><Link href="/" className="px-3 py-1 rounded hover:bg-gray-200 inline-block">Inicio</Link></li>

        <li className="relative" ref={dropdownRefs.getToKnowUs}>
          <button onClick={() => toggleItem('getToKnowUs')} className="px-3 py-1 rounded hover:bg-gray-200">
            Conócenos
          </button>
          {activeItem === 'getToKnowUs' && (
            <div className="absolute left-0 top-full mt-2 w-48 bg-white border rounded-xl shadow-lg z-10">
              <div className="absolute -top-2 left-4 w-3 h-3 bg-white rotate-45 border-l border-t z-[-1]"></div>
              <ul className="flex flex-col p-2">
                <li><Link href="/aboutUs/location" className="block px-2 py-1 hover:bg-gray-100 rounded">Ubicación</Link></li>
                <li><Link href="/historia" className="block px-2 py-1 hover:bg-gray-100 rounded">Historia</Link></li>
                <li><Link href="/politicas" className="block px-2 py-1 hover:bg-gray-100 rounded">Politicas</Link></li>
              </ul>
            </div>
          )}
        </li>

        <li><Link href="/cabin/gallery" className="px-3 py-1 rounded hover:bg-gray-200 inline-block">Galeria</Link></li>

        <li className="relative" ref={dropdownRefs.reservations}>
          <button onClick={() => toggleItem('reservations')} className="px-3 py-1 rounded hover:bg-gray-200">
            Reservas
          </button>
          {activeItem === 'reservations' && (
            <div className="absolute left-0 top-full mt-2 w-48 bg-white border rounded-xl shadow-lg z-10">
              <div className="absolute -top-2 left-4 w-3 h-3 bg-white rotate-45 border-l border-t z-[-1]"></div>
              <ul className="flex flex-col p-2">
                <li><Link href="/ReservationForm" className="block px-2 py-1 hover:bg-gray-100 rounded">Reservar</Link></li>
                <li><Link href="/miReserva" className="block px-2 py-1 hover:bg-gray-100 rounded">Mi Reserva</Link></li>
              </ul>
            </div>
          )}
        </li>

        <li className="relative" ref={dropdownRefs.experiences}>
          <button onClick={() => toggleItem('experiences')} className="px-3 py-1 rounded hover:bg-gray-200">
            Experiencias
          </button>
          {activeItem === 'experiences' && (
            <div className="absolute left-0 top-full mt-2 w-48 bg-white border rounded-xl shadow-lg z-10">
              <div className="absolute -top-2 left-4 w-3 h-3 bg-white rotate-45 border-l border-t z-[-1]"></div>
              <ul className="flex flex-col p-2">
                <li><Link href="/experiences/pool" className="block px-2 py-1 hover:bg-gray-100 rounded">Piscina</Link></li>
                <li><Link href="/experiences/soccerField" className="block px-2 py-1 hover:bg-gray-100 rounded">Cancha de futbol</Link></li>
                <li><Link href="/experiences/restaurant" className="block px-2 py-1 hover:bg-gray-100 rounded">Restaurante</Link></li>
              </ul>
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
}
