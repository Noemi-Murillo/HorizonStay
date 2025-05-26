import { database } from "@/lib/firebaseClient";
import { ref, get } from "firebase/database";

export async function getReservationById(reservationId: string) {
  try {
    const reservationRef = ref(database, `reservations/${reservationId}`);
    const reservationSnap = await get(reservationRef);
    if (!reservationSnap.exists()) return null;

    const reservation = reservationSnap.val();
    const guestId = reservation.guest_id;
    const cottageId = reservation.cottage_id;

    const guestSnap = await get(ref(database, `guests/${guestId}`));
    const cottageSnap = await get(ref(database, `cottages/${cottageId}`));

    if (!guestSnap.exists() || !cottageSnap.exists()) return null;

    const guest = guestSnap.val();
    const cottage = cottageSnap.val();

    return {
      name: guest.name,
      email: guest.email,
      phone: guest.phone,
      cottage: cottage.name,
      start: reservation.start,
      end: reservation.end,
      state: reservation.status,
      guests: reservation.guests,
      notes: reservation.notes,
      total_price: reservation.total_price,
      ok: true
    };
  } catch (error) {
    console.error("Error fetching reservation:", error);
    return { ok: false };
  }
}
