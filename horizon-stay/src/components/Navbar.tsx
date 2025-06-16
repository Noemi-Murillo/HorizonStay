"use client";

import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRefs = {
    getToKnowUs: useRef<HTMLDivElement>(null),
    cabins: useRef<HTMLDivElement>(null),
    reservations: useRef<HTMLDivElement>(null),
    experiences: useRef<HTMLDivElement>(null),
  };

  const path = usePathname();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const isClickInside = Object.values(dropdownRefs).some(
        (ref) => ref.current && ref.current.contains(event.target as Node)
      );
      if (!isClickInside) setActiveItem(null);
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleItem = (item: string) => {
    setActiveItem(activeItem === item ? null : item);
  };

  if (path.startsWith('/adminPages')) return null;

  return (
    <nav className="bg-white border-b shadow-sm py-2 px-6 fixed top-0 w-full z-50">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-2xl font-bold text-green-800 hover:text-green-900 transition-colors">
            Horizon Stay
          </Link>

          <div className={`${mobileMenuOpen ? "block" : "hidden"} lg:flex gap-6 items-center font-medium text-gray-700 text-base`}>
            <Link href="/" className="px-3 py-2 rounded-lg hover:bg-green-200 transition-all block" onClick={() => setMobileMenuOpen(false)}>Inicio</Link>

            <div className="relative" ref={dropdownRefs.getToKnowUs}>
              <button onClick={() => toggleItem("getToKnowUs")} className="px-3 py-2 rounded-lg hover:bg-green-200 transition-all">
                Conócenos
              </button>
              {activeItem === "getToKnowUs" && (
                <div className="absolute left-0 top-full mt-2 w-48 bg-white border rounded-xl shadow-lg z-10 origin-top-left animate-fade-in">
                  <ul className="flex flex-col p-2">
                    <li><Link href="/aboutUs/history" className="block px-3 py-2 hover:bg-gray-100 rounded">Historia</Link></li>
                    <li><Link href="/aboutUs/policies" className="block px-3 py-2 hover:bg-gray-100 rounded">Políticas</Link></li>
                    <li><Link href="/aboutUs/location" className="block px-3 py-2 hover:bg-gray-100 rounded">Ubicación y Contacto</Link></li>
                  </ul>
                </div>
              )}
            </div>

            <Link href="/cabin/gallery" className="px-3 py-2 rounded-lg hover:bg-green-200 transition-all block" onClick={() => setMobileMenuOpen(false)}>Galería</Link>

            <div className="relative" ref={dropdownRefs.reservations}>
              <button onClick={() => toggleItem("reservations")} className="px-3 py-2 rounded-lg hover:bg-green-200 transition-all">
                Reservas
              </button>
              {activeItem === "reservations" && (
                <div className="absolute left-0 top-full mt-2 w-48 bg-white border rounded-xl shadow-lg z-10 origin-top-left animate-fade-in">
                  <ul className="flex flex-col p-2">
                    <li><Link href="/ReservationForm" className="block px-3 py-2 hover:bg-gray-100 rounded">Reservar</Link></li>
                    <li><Link href="/bookingInformation" className="block px-3 py-2 hover:bg-gray-100 rounded">Mi Reserva</Link></li>
                  </ul>
                </div>
              )}
            </div>

            <div className="relative" ref={dropdownRefs.experiences}>
              <button onClick={() => toggleItem("experiences")} className="px-3 py-2 rounded-lg hover:bg-green-200 transition-all">
                Experiencias
              </button>
              {activeItem === "experiences" && (
                <div className="absolute left-0 top-full mt-2 w-48 bg-white border rounded-xl shadow-lg z-10 origin-top-left animate-fade-in">
                  <ul className="flex flex-col p-2">
                    <li><Link href="/experiences/pool" className="block px-3 py-2 hover:bg-gray-100 rounded">Piscina</Link></li>
                    <li><Link href="/experiences/soccerField" className="block px-3 py-2 hover:bg-gray-100 rounded">Cancha de fútbol</Link></li>
                    <li><Link href="/experiences/restaurant" className="block px-3 py-2 hover:bg-gray-100 rounded">Restaurante</Link></li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
{/* 
        <div className="hidden lg:block">
          <Link
            href="/logIn"
            className="px-3 py-2 text-sm text-gray-500 hover:text-gray-700 border border-gray-300 rounded transition-all"
            onClick={() => setMobileMenuOpen(false)}
          >
            Iniciar sesión
          </Link>
        </div> */}

        {/* <div className="lg:hidden">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div> */}
        
      </div>
    </nav>
  );
}
