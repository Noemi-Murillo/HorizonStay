"use client"

import React from "react"
import { Controller } from "react-hook-form"
import { useReservationForm, ReservationData } from "@/hooks/useReservationForm"
import SelectCottage from "@/components/reservationComponents/SelectCottage"
import CalendarReservation from "@/components/reservationComponents/CalendarReservation"
import ReservationButton from "@/components/reservationComponents/ReservationButton"
import Swal from 'sweetalert2'
import { useRouter } from 'next/navigation'

const ReservationForm = () => {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors }
  } = useReservationForm()

  const onSubmit = async (formData: ReservationData) => {
    console.log("Reserva enviada:", formData)

    const response = await fetch('/api/createReservation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })

    const data = await response.json()

    if (data.ok) {
      const email = await fetch('/api/emailReservation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data.id)
      })

      const info = await email.json()

      if (info.ok) {
        Swal.fire({
          title: "¡Éxito!",
          text: `${data.message}`,
          icon: "success",
          timer: 3000,
        })

        setTimeout(() => {
          router.push('/bookingInformation')
        }, 3000)
      } else {
        Swal.fire({
          title: "¡Fracaso!",
          text: `${data.error}`,
          icon: "warning"
        })
      }
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 p-4 border rounded max-w-md mx-auto bg-white"
    >
      <h2 className="text-xl font-bold text-green-600">Reserva tu cabaña</h2>

      <div>
        <label className="block font-medium text-gray-700">Nombre</label>
        <input
          {...register("name", { required: "El nombre es obligatorio" })}
          className="border p-2 rounded w-full text-gray-700"
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
      </div>

      <div>
        <label className="block font-medium text-gray-700">Apellidos</label>
        <input
          {...register("lastName", { required: "Los apellidos son obligatorios" })}
          className="border p-2 rounded w-full text-gray-700"
        />
        {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
      </div>

      <div>
        <label className="block font-medium text-gray-700">Correo electrónico</label>
        <input
          type="email"
          {...register("email", {
            required: "El correo es obligatorio",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Correo inválido"
            }
          })}
          className="border p-2 rounded w-full text-gray-700"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
      </div>

      <div>
        <label className="block font-medium text-gray-700">Teléfono</label>
        <input
          type="tel"
          {...register("phone", { required: "El teléfono es obligatorio" })}
          className="border p-2 rounded w-full text-gray-700"
        />
        {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
      </div>

      <Controller
        control={control}
        name="cottage"
        rules={{ required: "Debes seleccionar una cabaña" }}
        render={({ field }) => (
          <SelectCottage onChange={field.onChange} />
        )}
      />
      {errors.cottage && <p className="text-red-500 text-sm">{errors.cottage.message}</p>}

      <CalendarReservation
        onDateSelect={(dates) => {
          setValue("start", dates.startDate)
          setValue("end", dates.endDate)
        }}
      />

      <div>
        <label className="block font-medium text-gray-700">Notas (opcional)</label>
        <textarea
          {...register("notes")}
          placeholder="Especificaciones o comentarios..."
          className="border p-2 rounded w-full text-gray-700"
        />
      </div>
      <ReservationButton />
    </form>
  )
}

export default ReservationForm
