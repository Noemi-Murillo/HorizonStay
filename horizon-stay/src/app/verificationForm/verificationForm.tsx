"use client";

import React, { useState } from "react";

const VerificationForm = ({ onVerify }: { onVerify: (data: any) => void }) => {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (code === "ABC123" && name.toLowerCase() === "carlos ramírez" && date === "2025-06-15") {
      onVerify({
        name: "Carlos Ramírez",
        cabin: "Cabaña Bosque 3",
        from: "15 de junio de 2025",
        to: "18 de junio de 2025",
        people: 4,
        status: "Confirmada",
      });
    } else {
      alert("Datos incorrectos. Intenta nuevamente.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold mb-6 text-green-700 text-center">Consulta tu Reserva</h2>
      <div>
        <label htmlFor="code" className="block font-semibold text-gray-700 mb-1">
          Código de reserva
        </label>
        <input
          type="text"
          id="code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
          className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>
      <div>
        <label htmlFor="name" className="block font-semibold text-gray-700 mb-1">
          Nombre completo
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>
      <div>
        <label htmlFor="date" className="block font-semibold text-gray-700 mb-1">
          Fecha de inicio de estadía
        </label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-xl shadow"
      >
        Ver estado de reserva
      </button>
    </form>
  );
};

export default VerificationForm;

