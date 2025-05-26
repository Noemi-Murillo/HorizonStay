import { ref, get } from 'firebase/database'
import { database } from '@/lib/firebaseClient'

export const getPriceByCottageType = async (type: string): Promise<number | null> => {
  try {
    const priceRef = ref(database, `app_data/cottage_types/${type}/price_per_night`)
    const snapshot = await get(priceRef)
    return snapshot.exists() ? snapshot.val() : null
  } catch (error) {
    console.error("Error getting price from Firebase:", error)
    return null
  }
}
