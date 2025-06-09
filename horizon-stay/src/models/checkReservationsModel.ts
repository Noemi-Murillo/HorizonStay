import { database } from "@/lib/firebaseClient";
import { ref, get } from "firebase/database";

export async function getReservations() {
    try {
        const reservationRef = ref(database, `app_data/`);
        const reservationSnap = await get(reservationRef);

        if (!reservationSnap.exists()) {
            return { cottages: {}, reservations: {} };
        }

        const appData = reservationSnap.val();

        const cottages = appData.cottages || {};
        const reservations = appData.reservations || {};

        return {
            cottages,
            reservations
        };
    } catch (error) {
        console.error("Error fetching reservations:", error);
        return { cottages: {}, reservations: {} };
    }
}
