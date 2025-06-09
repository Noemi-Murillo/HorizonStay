import { database } from "@/lib/firebaseClient";
import { ref, get } from "firebase/database";

export async function getReservations() {
    try {
        const appDataRef = ref(database, `app_data/`);
        const snapshot = await get(appDataRef);

        if (!snapshot.exists()) {
            return { cottages: {}, reservations: {} };
        }

        const appData = snapshot.val();

        const cottages = appData.cottages || {};
        const reservationsRaw = appData.reservations || {};
        const guests = appData.guests || {};

        const reservations = Object.entries(reservationsRaw).reduce(
            (acc, [id, res]: [string, any]) => {
                const guestInfo = guests[res.guest_id] || {};

                acc[id] = {
                    ...res,
                    name: guestInfo.name || '',
                    phone: guestInfo.phone || '',
                    email: guestInfo.email || '',
                    registration_date: guestInfo.registration_date || ''
                };

                return acc;
            },
            {} as Record<string, any>
        );
        console.log(reservations)
        return {
            cottages,
            reservations
        };
    } catch (error) {
        console.error("Error fetching reservations:", error);
        return { cottages: {}, reservations: {} };
    }
}
