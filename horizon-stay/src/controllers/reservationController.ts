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
}

export async function createData(reservationData: ReservationData) {
  
  if (!reservationData.start || !reservationData.phone || !reservationData.name || !reservationData.lastName || !reservationData.end || !reservationData.email || !reservationData.cottage) {
    throw new Error('Faltan campos requeridos');
  }

  const id = await insertData(reservationData);
  return id;
}
