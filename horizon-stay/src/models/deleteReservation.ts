// models/deleteBlock.ts
import { database } from '@/lib/firebaseClient';
import { ref, remove } from 'firebase/database';

export async function deleteReservationById(ObjReservation: any) {
  try {
    const blockRef = ref(database, `app_data/reservations/${ObjReservation.eventoAEliminar.id}`);
    await remove(blockRef);
    return true;
  } catch (error) {
    console.error(`Error al eliminar el bloqueo ${ObjReservation.eventoAEliminar.id}:`, error);
    return false;
  }
}
