"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

type VerificationData = {
  reservationId: string;
  email: string;
};

type Props = {
  onVerify: (data: any) => void;
  resetSignal: boolean;
};

const VerificationForm: React.FC<Props> = ({ onVerify, resetSignal }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<VerificationData>();

  useEffect(() => {
    if (resetSignal) reset();
  }, [resetSignal, reset]);

  const onSubmit = async (formData: VerificationData) => {
    try {
      const response = await fetch("/api/verifyReservation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok && data.ok) {
        onVerify(data.reservation);
      } else {
        onVerify(null);
      }
    } catch (error) {
      console.error("Error al verificar la reserva:", error);
      onVerify(null);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-left">🔍 Verifica tu reserva</h2>

      <div className="text-left">
        <label className="block text-sm font-medium text-gray-700">Código de Reserva</label>
        <input
          {...register("reservationId", { required: "Este campo es obligatorio" })}
          className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:border-green-500"
          placeholder="Ej. a1b2c3d4"
        />
        {errors.reservationId && <p className="text-red-500 text-sm">{errors.reservationId.message}</p>}
      </div>

      <div className="text-left">
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          {...register("email", {
            required: "Este campo es obligatorio",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Correo electrónico no válido",
            },
          })}
          className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:border-green-500"
          placeholder="correo@example.com"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
      </div>

      <button
        type="submit"
        className="w-full bg-green-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-700 transition"
      >
        Verificar Reserva
      </button>
    </form>
  );
};

export default VerificationForm;
