'use client'

import React, { useState } from "react"
import { Controller } from "react-hook-form"
import { useReservationForm, ReservationData } from "@/hooks/useReservationForm"
import SelectCottage from "@/components/reservationComponents/SelectCottage"
import CalendarReservation from "@/components/calendarComponents/CalendarReservation"
import ReservationButton from "@/components/reservationComponents/ReservationButton"
import Swal from 'sweetalert2'
import { useRouter } from 'next/navigation'

const ReservationForm = () => {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [totalPrice, setTotalPrice] = useState<number | null>(null)
  const [numNights, setNumNights] = useState<number>(0)

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors }
  } = useReservationForm()

  const guests = watch("guests") || 0
  const cottageId = watch("cottage") || ""

  const capacities: Record<string, number> = {
    "COT001": 4,
    "COT002": 6,
    "COT003": 8
  }

  const getCottageTypeFromId = (id: string): "lago" | "arbol" | "bosque" | null => {
    if (id.startsWith("COT001")) return "lago"
    if (id.startsWith("COT002")) return "arbol"
    if (id.startsWith("COT003")) return "bosque"
    return null
  }

  const getCottageCapacity = (id: string): number | null => {
    const prefix = id.substring(0, 6)
    return capacities[prefix] ?? null
  }

  const fetchCottagePrice = async (type: string): Promise<number | null> => {
    try {
      const res = await fetch(`/api/getPrice?type=${type}`)
      const data = await res.json()
      return data.price ?? null
    } catch (error) {
      console.error("Error al obtener precio:", error)
      return null
    }
  }

  // ✅ Agrega hora personalizada a fecha
  const formatWithTime = (dateStr: string, hour: string): string => {
    const [year, month, day] = dateStr.split("-").map(Number)
    const date = new Date(year, month - 1, day)
    const [h, m] = hour.split(":").map(Number)
    date.setHours(h, m, 0, 0)
    return date.toISOString()
  }

  const onSubmit = async (formData: ReservationData) => {
    setIsSubmitting(true)

    try {
      const prefix = formData.cottage?.substring(0, 6)

      if (!prefix || !capacities[prefix]) {
        Swal.fire({
          title: "Cabaña inválida",
          text: `La cabaña seleccionada no es válida.`,
          icon: "error"
        })
        return
      }

      const selectedCapacity = capacities[prefix]

      if (formData.guests > selectedCapacity) {
        Swal.fire({
          title: "Capacidad excedida",
          text: `La cabaña seleccionada solo admite hasta ${selectedCapacity} personas.`,
          icon: "error"
        })
        return
      }

      // ✅ Formatear fechas con hora personalizada
      formData.start = formatWithTime(formData.start, "12:00") // check-in
      formData.end = formatWithTime(formData.end, "18:00")     // check-out

      const response = await fetch('/api/createReservation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await response.json()
      console.log("INFORMACIÓN RESERVA:", formData);
      console.log("RESPUESTA:", data);

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
            text: `${info.error}`,
            icon: "warning"
          })
        }
      } else {
        Swal.fire({
          title: "Error",
          text: data.error || "No se pudo completar la reserva.",
          icon: "error"
        })
      }

    } catch (error) {
      Swal.fire({
        title: "Error inesperado",
        text: "Ocurrió un error al procesar la reserva.",
        icon: "error"
      })
    } finally {
      setIsSubmitting(false)
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
        <input {...register("name", { required: "El nombre es obligatorio" })} className="border p-2 rounded w-full text-gray-700" />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
      </div>

      <div>
        <label className="block font-medium text-gray-700">Apellidos</label>
        <input {...register("lastName", { required: "Los apellidos son obligatorios" })} className="border p-2 rounded w-full text-gray-700" />
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

      <div>
        <label className="block font-medium text-gray-700">Cantidad de personas</label>
        <input
          type="number"
          min={1}
          {...register("guests", {
            required: "Debes indicar la cantidad de personas",
            min: { value: 1, message: "Debe ser al menos 1 persona" }
          })}
          className="border p-2 rounded w-full text-gray-700"
        />
        {errors.guests && <p className="text-red-500 text-sm">{errors.guests.message}</p>}
      </div>

      <Controller
        control={control}
        name="cottage"
        rules={{ required: "Debes seleccionar una cabaña" }}
        render={({ field }) => (
          <SelectCottage
            value={field.value}
            guests={guests}
            onChange={({ value, label }) => {
              field.onChange(value)
              setValue("cottageName", label)
            }}
          />
        )}
      />

      {errors.cottage && <p className="text-red-500 text-sm">{errors.cottage.message}</p>}

      {getCottageCapacity(cottageId) && (
        <p className="text-sm text-green-700 mb-2">
          👉 La cabaña seleccionada admite hasta <strong>{getCottageCapacity(cottageId)}</strong> personas.
        </p>
      )}

      {getCottageTypeFromId(cottageId) ? (
        <CalendarReservation
          onDateSelect={async ({ startDate, endDate, numNights }) => {
            setValue("start", startDate)
            setValue("end", endDate)
            setTotalPrice(null)
            setNumNights(numNights)

            const type = getCottageTypeFromId(cottageId)
            if (type) {
              const price = await fetchCottagePrice(type)
              if (price !== null) {
                setTotalPrice(price * numNights)
              }
            }
          }}
          cottageType={getCottageTypeFromId(cottageId)!}
        />
      ) : (
        <p className="text-center text-yellow-600 font-medium bg-yellow-100 rounded p-2">
          ⚠️ Primero debes seleccionar una cabaña para ver la disponibilidad.
        </p>
      )}

      {totalPrice !== null && (
        <div className="bg-green-100 border border-green-400 text-green-800 p-3 rounded mt-2 text-center font-medium">
          Total por {numNights} noche(s): ₡{totalPrice.toLocaleString()}
        </div>
      )}

      <div>
        <label className="block font-medium text-gray-700">Notas (opcional)</label>
        <textarea
          {...register("notes")}
          placeholder="Especificaciones o comentarios..."
          className="border p-2 rounded w-full text-gray-700"
        />
      </div>

      <ReservationButton disabled={isSubmitting} />
    </form>
  )
}

export default ReservationForm
