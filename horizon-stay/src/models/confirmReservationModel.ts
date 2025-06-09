import { database } from '@/lib/firebaseClient';
import { ref, update } from 'firebase/database';

export async function ConfirmReservation(ObjReservation: any) {
  try {
    const id = ObjReservation.eventoConfirmar.id;

    const updates = {
      status: 'Confirmado'
    };

    await update(ref(database, `app_data/reservations/${id}`), updates);

    return { success: true };
  } catch (error) {
    console.error("Error al confirmar la reserva:", error);
    return { success: false, error };
  }
}
