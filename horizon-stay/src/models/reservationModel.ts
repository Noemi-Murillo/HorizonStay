import { database } from '@/lib/firebaseClient'
import { ref, get, set } from 'firebase/database'
import { v4 as uuidv4 } from 'uuid'
import { ReservationData } from "@/hooks/useReservationForm"


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

function isDateOverlap(startA: string, endA: string, startB: string, endB: string): boolean {
  const aStart = new Date(startA)
  const aEnd = new Date(endA)
  const bStart = new Date(startB)
  const bEnd = new Date(endB)

  return !(aEnd <= bStart || aStart >= bEnd)
}

export async function insertData(reservationData: ReservationData) {
  const reservationsSnap = await get(ref(database, 'app_data/reservations'))
  const cottagesSnap = await get(ref(database, 'app_data/cottages'))

  if (!cottagesSnap.exists()) {
    throw new Error('No se encontraron cabañas registradas.')
  }

  const allCottages = cottagesSnap.val()
  const reservations = reservationsSnap.exists() ? Object.values(reservationsSnap.val()) : []

  const start = reservationData.start.includes("T")
    ? reservationData.start
    : `${reservationData.start}T12:00:00-06:00`

  const end = reservationData.end.includes("T")
    ? reservationData.end
    : `${reservationData.end}T12:00:00-06:00`

  const availableCottageId = Object.keys(allCottages).find(cottageId => {
    if (!cottageId.startsWith(reservationData.cottage!)) return false

    const isTaken = reservations.some((r: any) =>
      r.cottage_id === cottageId &&
      isDateOverlap(start, end, r.start, r.end)
    )

    return !isTaken
  })

  if (!availableCottageId) {
    throw new Error('Todas las cabañas de este tipo ya están reservadas para esas fechas.')
  }

  const guestId = uuidv4()
  await set(ref(database, `app_data/guests/${guestId}`), {
    name: reservationData.name + ' ' + reservationData.lastName,
    email: reservationData.email,
    phone: reservationData.phone,
    registration_date: new Date().toISOString(),
  })

  const reserveNumber = await generateUniqueReserveNumber()
  await set(ref(database, `app_data/reservations/${reserveNumber}`), {
    reserve_number: reserveNumber,
    cottage_id: availableCottageId,
    start,
    end,
    guest_id: guestId,
    guests: reservationData.guests,
    notes: reservationData.notes || '',
    status: 'pendiente',
    total_price: reservationData.total_price ?? 0

  })

  return {
    name: reservationData.name + ' ' + reservationData.lastName,
    email: reservationData.email,
    reservationId: reserveNumber,
    start,
    end,
    cottage_id: availableCottageId,
    cottageName: reservationData.cottageName,
    total_price: reservationData.total_price
  }
}
