import { database } from "@/lib/firebaseClient";
import { ref, get } from "firebase/database";

export async function getBlockedDatesFromDB() {
  try {
    const snapshot = await get(ref(database, 'app_data/'));

    if (!snapshot.exists()) {
      return { blockedDates: {} };
    }

    const appData = snapshot.val();
    const cottages = appData.cottages || {};
    const reservations = appData.reservations || {};
    const blocks = appData.blocks || {};

    const cottageCountByType: Record<string, number> = {};
    const cottageTypeById: Record<string, string> = {};

    for (const id in cottages) {
      const type = cottages[id].type;
      cottageTypeById[id] = type;
      cottageCountByType[type] = (cottageCountByType[type] || 0) + 1;
    }

    const dateCounters: Record<string, Record<string, number>> = {};

    for (const resId in reservations) {
      const res = reservations[resId];
      const type = res.cottage_type;
      const start = new Date(res.start_date);
      const end = new Date(res.end_date);

      if (!dateCounters[type]) dateCounters[type] = {};

      const current = new Date(start);
      while (current <= end) {
        const key = current.toISOString().split('T')[0];
        dateCounters[type][key] = (dateCounters[type][key] || 0) + 1;
        current.setDate(current.getDate() + 1);
      }
    }

    for (const blockId in blocks) {
      const block = blocks[blockId];
      const type = cottageTypeById[blockId];
      if (!type) continue;

      if (!dateCounters[type]) dateCounters[type] = {};

      const start = new Date(block.start_date);
      const end = new Date(block.end_date);
      const current = new Date(start);
      while (current <= end) {
        const key = current.toISOString().split('T')[0];
        dateCounters[type][key] = (dateCounters[type][key] || 0) + 1;
        current.setDate(current.getDate() + 1);
      }
    }


    const blockedDates: Record<string, string[]> = {};

    for (const type in dateCounters) {
      const max = cottageCountByType[type] || 5;
      blockedDates[type] = Object.entries(dateCounters[type])
        .filter(([_, count]) => count >= max)
        .map(([date]) => date);
    }
    console.log("BlockedDates generadas:", blockedDates)

    return { blockedDates };
  } catch (error) {
    console.error("Error fetching blocked dates:", error);
    return { blockedDates: {} };
  }
}
