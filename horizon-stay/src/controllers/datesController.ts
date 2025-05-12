import { getBlockedAndReservedDates } from '@/models/datesModel';

export async function fetchUnavailableDates() {
  try {
    const dates = await getBlockedAndReservedDates();
    return { success: true, data: dates };
  } catch (error) {
    return { success: false, data: [], message: 'No se pudieron obtener las fechas.' };
  }
}
