"use client"

import React, { useState } from "react"
import SelectCottage from "@/components/reservationComponents/SelectCottage"
import CalendarReservation from "@/components/reservationComponents/CalendarReservation"
import ReservationButton from "@/components/reservationComponents/ReservationButton"
import Swal from 'sweetalert2'
import { useRouter } from 'next/navigation';

type ReservationData = {
  name: string
  lastName: string
  email: string
  phone: string
  end: string
  start: string
  notes?: string
  cottage?: string
}

const ReservationForm = () => {

  const router = useRouter();
  const [formData, setFormData] = useState<ReservationData>({
    name: "",
    lastName: "",
    email: "",
    phone: "",
    end: "",
    start: "",
    notes: "",
    cottage: "",
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    console.log("Reserva enviada:", formData)

    const response = await fetch('/api/createReservation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    const data = await response.json();


    if (data.ok) {
      const email = await fetch('/api/emailReservation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data.id)
      });

      const info = await email.json();

      if (info.ok) {
        Swal.fire({
          title: "¡Éxito!",
          text: `${data.message}`,
          icon: "success",
          timer: 3000,
        });

        setTimeout(() => {
          router.push('/bookingInformation');
        }, 3000);



      } else {
        Swal.fire({
          title: "¡Fracaso!",
          text: `${data.error}`,
          icon: "warning"
        });
      }
    }

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

      <SelectCottage onChange={(cottage) => formData.cottage = cottage} />

      <CalendarReservation onDateSelect={(dates) => (formData.end = dates.endDate) && (formData.start = dates.startDate)} />

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

      <ReservationButton />

    </form>
  )
}

export default ReservationForm
