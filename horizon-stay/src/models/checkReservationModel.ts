import { database } from "@/lib/firebaseClient";
import { ref, get } from "firebase/database";

export async function getReservationById(reservationId: string) {
  try {
    const reservationRef = ref(database, `app_data/`);
    const reservationSnap = await get(reservationRef);

    if (!reservationSnap.exists()) {
      return null;
    }

    const appData = reservationSnap.val();

    const reservation = appData.reservations?.[reservationId];
    if (!reservation) {
      return { ok: false, message: "Reserva no encontrada" };
    }

    const guestId = reservation.guest_id;

    const guest = appData.guests?.[guestId];
    if (!guest) {
      return { ok: false, message: "Huésped no encontrado" };
    }

    const cottage = appData.cottages?.[reservation.cottage_id];
    const cottageName = cottage?.name || "Cabaña no encontrada";

    const data = {
      guestId: guestId,
      name: guest.name,
      cottageId: reservation.cottage_id,
      cottage: cottageName,
      start: reservation.start,
      end: reservation.end,
      state: reservation.status,
      ok: true
    }


    return data;
  } catch (error) {
    console.error("Error fetching reservation:", error);
    return { ok: false };
  }
}
