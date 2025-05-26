import { useForm, Controller } from "react-hook-form"

export type ReservationData = {
  name: string
  lastName: string
  email: string
  phone: string
  end: string
  start: string
  notes?: string
  cottage?: string
}

export const useReservationForm = () => {
  const form = useForm<ReservationData>()

  return form
}
