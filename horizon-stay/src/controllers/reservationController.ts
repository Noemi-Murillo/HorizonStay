import { insertData } from '@/models/reservationModel';

type ReservationData = {
  name: string
  lastName: string
  email: string
  phone: string
  end: string
  start: string
  notes?: string
  cottage?: string
   guests: number 
}

export async function createData(reservationData: ReservationData) {
  
  if (!reservationData.start || !reservationData.end ) {
    throw new Error('Falta seleccionar las fechas de estadía.');
  }

  const id = await insertData(reservationData);
  return id;
}
