import { database } from '@/lib/firebaseClient';
import { ref, update } from 'firebase/database';

export async function ConfirmReservation(ObjReservation: any) {
  try {
    const id = ObjReservation.eventoConfirmar.id;
    console.log("ID que se intenta actualizar:", id);

    const updates = {
      status: 'Confirmado'
    };

    await update(ref(database, `app_data/reservations/${id}`), updates);

    console.log(`Reserva ${id} confirmada correctamente.`);
    return { success: true };
  } catch (error) {
    console.error("Error al confirmar la reserva:", error);
    return { success: false, error };
  }
}
