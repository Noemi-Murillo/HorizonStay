import { database } from '@/lib/firebaseClient'
import { ref, update } from 'firebase/database'

export async function updateReservationData({
    id,
    start,
    end,
    cottage_id
}: {
    id: string
    start: string
    end: string
    cottage_id: string
}) {
    const updates = {
        start,
        end,
        cottage_id
    }

    console.log(updates);

    await update(ref(database, `app_data/reservations/${id}`), updates)

    return {
        success: true,
        updated: {
            id,
            start,
            end,
            cottage_id
        }
    }
}