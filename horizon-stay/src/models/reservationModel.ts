import { database } from '@/lib/firebaseClient'
import { ref, get, set } from 'firebase/database'
import { v4 as uuidv4 } from 'uuid'

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

function generateCustomId(): string {
  const letters = Array.from({ length: 3 }, () =>
    String.fromCharCode(65 + Math.floor(Math.random() * 26))
  ).join('')

  const numbers = Array.from({ length: 3 }, () =>
    Math.floor(Math.random() * 10)
  ).join('')

  return letters + numbers
}

async function generateUniqueReserveNumber(): Promise<string> {
  let attempts = 0
  let reserveNumber = ''

  do {
    if (attempts++ > 20) {
      throw new Error('No se pudo generar un número de reserva único')
    }

    reserveNumber = generateCustomId()
    const checkRef = ref(database, `app_data/reservations`)
    const snapshot = await get(checkRef)

    const exists = snapshot.exists()
      ? Object.values(snapshot.val()).some(
          (r: any) => r.reserve_number === reserveNumber
        )
      : false

    if (!exists) return reserveNumber
  } while (true)
}

export async function insertData(reservationData: ReservationData) {
  const guestId = uuidv4()
  const guestRef = ref(database, `app_data/guests/${guestId}`)

  await set(guestRef, {
    name: reservationData.name + ' ' + reservationData.lastName,
    email: reservationData.email,
    phone: reservationData.phone,
    registration_date: new Date().toISOString(),
  })

  const reserveNumber = await generateUniqueReserveNumber()
  const reservationRef = ref(database, `app_data/reservations/${reserveNumber}`)

  await set(reservationRef, {
    reserve_number: reserveNumber,
    cottage_id: reservationData.cottage,
    end: reservationData.end,
    start: reservationData.start,
    guest_id: guestId,
    notes: reservationData.notes || '',
    status: 'pendiente',
    total_price: 1000
  })

  const reservationDetails = {
    name: reservationData.name + ' ' + reservationData.lastName,
    email: reservationData.email,
    reservationId: reserveNumber
  }

  return reservationDetails
}
