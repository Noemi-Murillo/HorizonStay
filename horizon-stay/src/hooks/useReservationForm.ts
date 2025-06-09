import { useForm, Controller } from "react-hook-form"

export type ReservationData = {
  reservationId?: string
  name: string
  lastName: string
  email: string
  phone: string
  guests: number
  end: string
  start: string
  notes?: string
  cottage?: string
  cottageName?: string
  total_price?: number
}

export const useReservationForm = () => {
  const form = useForm<ReservationData>()

  return form
}
