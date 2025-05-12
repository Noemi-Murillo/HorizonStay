import { getReservationById } from '@/models/checkReservationModel';

export async function getData(idReservation: string) {
  
  if (!idReservation) {
    throw new Error('Faltan campos requeridos');
  }

  const id = await getReservationById(idReservation);
  return id;
}
