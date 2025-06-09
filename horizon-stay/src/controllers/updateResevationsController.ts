import { updateReservationData} from '@/models/updateReservationModel';

export async function updateData(parametro: any) {
  
  const reply = await updateReservationData(parametro);
  return reply;
}
