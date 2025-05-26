import { getReservations} from '@/models/checkReservationsModel';

export async function getData(parametro: any) {
  
  const id = await getReservations();
  return id;
}
