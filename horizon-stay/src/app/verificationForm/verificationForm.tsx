"use client";

import React, { useState, useEffect } from "react";
import Swal from 'sweetalert2'

interface Props {
  onVerify: (data: any) => void;
  resetSignal?: boolean;
}

const VerificationForm = ({ onVerify, resetSignal }: Props) => {
  const [code, setCode] = useState("");
  const [guestName, setGuestName] = useState("");

  useEffect(() => {
    if (resetSignal) {
      setCode("");
    }
  }, [resetSignal]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch('/api/checkReservation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(code)
    });

    const data = await response.json();
    console.log("RESERVATION DATA:", data);
    console.log("DATA:", data.name);

    if (data.ok) {
      onVerify({
        name: `${data.data.name}`,
        cabin: `${data.data.cottage}`,
        from: `${data.data.start}`,
        to: `${data.data.end}`,
        people: 4,
        status: `${data.data.state}`,
        ok: `${data.data.ok}`
      });
    } else {
      onVerify(null);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold mb-6 text-green-700 text-center">
        Consulta tu Reserva
      </h2>

      <div>
        <label
          htmlFor="code"
          className="block font-semibold text-gray-700 mb-1"
        >
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
        <label
          htmlFor="guestName"
          className="block font-semibold text-gray-700 mb-1"
        >
          Nombre completo (como fue registrado)
        </label>
        <input
          type="text"
          id="guestName"
          value={guestName}
          onChange={(e) => setGuestName(e.target.value)}
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
