import { ConfirmReservation} from '@/models/confirmReservationModel';

export async function confirmReservation(parametro: any) {
  
  const reply = await ConfirmReservation(parametro);
  return reply;
}
