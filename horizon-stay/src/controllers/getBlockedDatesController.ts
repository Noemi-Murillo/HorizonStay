import { getBlockedDatesFromDB } from "@/models/getBlockedDatesModel";

export async function getBlockedDatesData() {
  const result = await getBlockedDatesFromDB();
  return result;
}
