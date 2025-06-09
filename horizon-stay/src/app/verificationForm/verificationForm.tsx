"use client";

import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

interface Props {
  onVerify: (data: any) => void;
  resetSignal?: boolean;
}

function normalize(text: string): string {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
}

const VerificationForm = ({ onVerify, resetSignal }: Props) => {
  const [code, setCode] = useState("");
  const [guestName, setGuestName] = useState("");

  useEffect(() => {
    if (resetSignal) {
      setCode("");
      setGuestName("");
    }
  }, [resetSignal]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/checkReservation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(code),
      });

      const data = await response.json();

      if (data.ok) {
        const inputName = normalize(guestName);
        const storedName = normalize(data.data.name);

        console.log("nombre ingresado:", inputName);
        console.log("nombre almacenado:", storedName);

        if (inputName === storedName) {
          onVerify({
            reservationId: code, 
            name: data.data.name,
            email: data.data.email,
            cabin: data.data.cottage,
            from: data.data.start,
            to: data.data.end,
            people: data.data.guests,
            status: data.data.state,
            ok: true,
          });
        } else {
          Swal.fire({
            title: "Nombre incorrecto",
            text: "El nombre ingresado no coincide con el registrado en la reservación.",
            icon: "warning",
          });
          onVerify(null);
        }
      } else {
        Swal.fire({
          title: "Código no encontrado",
          text: "No se encontró una reserva con ese código.",
          icon: "error",
        });
        onVerify(null);
      }
    } catch (error) {
      console.error("Error al verificar la reservación:", error);
      Swal.fire({
        title: "Error",
        text: "Ocurrió un error al verificar la reserva.",
        icon: "error",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold mb-6 text-green-700 text-center">
        Consulta tu Reserva
      </h2>

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
        <label htmlFor="guestName" className="block font-semibold text-gray-700 mb-1">
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
