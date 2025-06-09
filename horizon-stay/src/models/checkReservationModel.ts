import { database } from "@/lib/firebaseClient";
import { ref, get } from "firebase/database";

export async function getReservationById(reservationId: string) {
  try {
    const reservationRef = ref(database, `app_data`);
    const snapshot = await get(reservationRef);

    if (!snapshot.exists()) {

      return null;
    }

    const appData = snapshot.val();

    const reservation = appData.reservations?.[reservationId];
    if (!reservation) {

      return null;
    }


    const guest = appData.guests?.[reservation.guest_id];
    if (!guest) {

      return null;
    }

    const cottage = appData.cottages?.[reservation.cottage_id];
    if (!cottage) {

      return null;
    }

    const result = {
      name: guest.name,
      email: guest.email,
      cottage: cottage.name,
      start: reservation.start,
      end: reservation.end,
      guests: reservation.guests,
      state: reservation.status,
      ok: true
    };

    return result;

  } catch (error) {
    return null;
  }
}
