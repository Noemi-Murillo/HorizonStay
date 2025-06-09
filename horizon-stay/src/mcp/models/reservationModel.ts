export interface Reservation {
  reserve_number: string
  cottage_id: string
  guest_id: string
  start: string
  end: string
  guests: number
  status: string
}
