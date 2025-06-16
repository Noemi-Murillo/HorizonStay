import { getReservations, getDataLocalStorage} from '@/models/checkReservationsModel';

export async function getData(parametro: any) {
  
  const id = await getReservations();
  return id;
}


export async function getDataLocalStorages() {
  
  const data = await getDataLocalStorage();
  return data;
}
