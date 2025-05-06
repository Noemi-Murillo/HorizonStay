"use client";

import React from "react";
import { AlertTriangle } from "lucide-react";

const NoReservationFound = ({ onReset }: { onReset: () => void }) => {
  return (
    <>
      <h2 className="text-2xl font-bold mb-6 text-red-600 text-center">Reserva no encontrada</h2>
      <div className="space-y-2 text-left text-gray-700">
        <div className="flex items-center gap-2 mb-4 justify-center">
          <AlertTriangle className="text-yellow-500" size={32} />
          <span>No pudimos encontrar una reserva con los datos proporcionados.</span>
        </div>
        <p><strong>Consejo:</strong> Verifica que el código, el nombre y la fecha de entrada estén escritos correctamente.</p>
        <p className="text-sm text-gray-500 mt-4">Si el problema persiste, por favor contactá al personal de atención.</p>
      </div>
      <div className="mt-6 text-center">
        <button
          onClick={onReset}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-6 rounded-xl shadow"
        >
          Volver a intentar
        </button>
      </div>
    </>
  );
};

export default NoReservationFound;