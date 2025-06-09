import { deleteReservationById } from '@/models/deleteReservation';


export async function deleteReservation(ObjReservation: any) {
  

  const data = await deleteReservationById(ObjReservation);
  return data;
}
