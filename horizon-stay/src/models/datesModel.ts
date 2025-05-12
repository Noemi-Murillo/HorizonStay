import { get, ref } from 'firebase/database';
import { database } from '@/lib/firebaseClient';

function generateDateRange(start: string, end: string): Date[] {
  const [startYear, startMonth, startDay] = start.split('-').map(Number);
  const [endYear, endMonth, endDay] = end.split('-').map(Number);

  const dates: Date[] = [];
  const current = new Date(startYear, startMonth - 1, startDay);
  const final = new Date(endYear, endMonth - 1, endDay);

  while (current <= final) {
    dates.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }

  return dates;
}


export async function getBlockedAndReservedDates(): Promise<Date[]> {
  try {
    const blocksRef = ref(database, 'blocks');
    const reservationsRef = ref(database, 'reservations');

    const [blocksSnap, reservationsSnap] = await Promise.all([
      get(blocksRef),
      get(reservationsRef)
    ]);

    let allDates: Date[] = [];

    if (blocksSnap.exists()) {
      const blocks = blocksSnap.val();
      Object.values(blocks).forEach((block: any) => {
        if (block.start_date && block.end_date) {
          allDates = allDates.concat(generateDateRange(block.start_date, block.end_date));
        }
      });
    }

    if (reservationsSnap.exists()) {
      const reservations = reservationsSnap.val();
      Object.values(reservations).forEach((res: any) => {
        if (res.start && res.end) {
          allDates = allDates.concat(generateDateRange(res.start, res.end));
        }
      });
    }

    return allDates;
  } catch (error) {
    console.error('Error al obtener fechas bloqueadas y reservadas:', error);
    return [];
  }
}
