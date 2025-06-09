import { insertData } from '@/models/reservationModel';
import { ReservationData } from "@/hooks/useReservationForm"


export async function createData(reservationData: ReservationData) {
  
  if (!reservationData.start || !reservationData.end ) {
    throw new Error('Falta seleccionar las fechas de estadía.');
  }

  const id = await insertData(reservationData);
  return id;
}
