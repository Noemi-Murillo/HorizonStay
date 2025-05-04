"use client";

import React from "react";

const MyReservation = ({ data }: { data: any }) => {
  return (
    <>
      <h2 className="text-2xl font-bold mb-6 text-green-700 text-center">Detalle de tu Reserva</h2>
      <div className="space-y-2 text-left">
        <p><strong>Nombre:</strong> {data.name}</p>
        <p><strong>Cabaña:</strong> {data.cabin}</p>
        <p><strong>Desde:</strong> {data.from}</p>
        <p><strong>Hasta:</strong> {data.to}</p>
        <p><strong>Personas:</strong> {data.people}</p>
        <p><strong>Estado:</strong> {data.status}</p>
      </div>
      <div className="mt-6 text-center">
        <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-xl shadow">
          Modificar reserva
        </button>
      </div>
    </>
  );
};

export default MyReservation;
