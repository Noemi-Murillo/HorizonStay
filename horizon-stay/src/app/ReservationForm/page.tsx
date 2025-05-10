"use client"

import React, { useState } from "react"
import SelectCottage from "@/components/reservationComponents/SelectCottage"
import CalendarReservation from "@/components/reservationComponents/CalendarReservation" 

type ReservationData = {
  name: string
  lastName: string
  email: string
  phone: string
  notes?: string
  cottage?: string
}



const ReservationForm = () => {
  const [formData, setFormData] = useState<ReservationData>({
    name: "",
    lastName: "",
    email: "",
    phone: "",
    notes: "",
    cottage: "",
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    console.log("Reserva enviada:", formData)
    // Aquí podrías mandar los datos a una API o base de datos
  }
  
  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 border rounded max-w-md mx-auto bg-white"
    >
      <h2 className="text-xl font-bold text-green-600">Reserva tu cabaña</h2>

      <div>
        <label className="block font-medium text-gray-700">Nombre</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="border p-2 rounded w-full text-gray-700"
          required
        />
      </div>

      <div>
        <label className="block font-medium text-gray-700">Apellidos</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          className="border p-2 rounded w-full text-gray-700"
          required
        />
      </div>

      <div>
        <label className="block font-medium text-gray-700">
          Correo electrónico:
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="border p-2 rounded w-full text-gray-700"
          required
        />
      </div>

      <div>
        <label className="block font-medium text-gray-700">Teléfono:</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="border p-2 rounded w-full text-gray-700"
          required
        />
      </div>

      <SelectCottage />

      <CalendarReservation onDateSelect={(dates) => console.log('Dates:', dates)} />

      <div>

      </div>

      <div>
        <label className="block font-medium text-gray-700">Notas (opcional):</label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Especificaciones o comentarios..."
          className="border p-2 rounded w-full text-gray-700"
        />
      </div>

      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Enviar reserva
      </button>
    </form>
  )
}

export default ReservationForm
