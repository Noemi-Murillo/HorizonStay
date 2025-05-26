import { getFullyUnavailableDatesByType } from '@/models/datesModel'

export async function fetchUnavailableDates(cottageType: 'lago' | 'arbol' | 'bosque') {
  try {
    const dates = await getFullyUnavailableDatesByType(cottageType)
    return { success: true, data: dates }
  } catch (error) {
    return { success: false, data: [], message: 'No se pudieron obtener las fechas.' }
  }
}
