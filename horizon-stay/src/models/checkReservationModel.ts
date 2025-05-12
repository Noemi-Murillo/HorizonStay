import { database } from "@/lib/firebaseClient";
import { ref, get } from "firebase/database";
import { Console, log } from "node:console";

export async function getReservationById(reservationId: string) {
  try {
    const reference = ref(database, `reservations/${reservationId}`);
    const snapshot = await get(reference);
    console.log("ola")
    if (!snapshot.exists()) {
      return null; // or throw an error if you prefer
    }

    const reservation = snapshot.val(); // ✅ obtenés los datos reales
    const guestId = reservation.guest_id; // ✅ accedés a la propiedad

    const idGuest = ref(database, `guests/${guestId}`);
    const snapshot2 = await get(idGuest);

    if (!snapshot2.exists()) {
      return null; // or throw an error if you prefer
    }


    const cottage = snapshot.val(); // ✅ obtenés los datos reales
    const cottageId = cottage.cottage_id; // ✅ accedés a la propiedad

    const idCottage = ref(database, `cottages/${cottageId}`);
    const snapshot3 = await get(idCottage);
    console.log(snapshot.val())
    console.log(snapshot2.val())
    console.log(snapshot3.val())
    if (!snapshot3.exists()) {
      return null; // or throw an error if you prefer
    }

    var data = {
      name: snapshot2.val().name,
      cottage: snapshot3.val().name,
      start: snapshot.val().start,
      end: snapshot.val().end,
      state: snapshot.val().status,
      ok: true
    }
    console.log(data)

    return data;
  } catch (error) {
    var data1 = {
    
      ok: false
    }
    console.error("Error fetching reservation:", error);
    throw new Error("Failed to fetch reservation.");
  }
}
