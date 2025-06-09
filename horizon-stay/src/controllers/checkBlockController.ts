import { getBlockEvents } from '@/models/checkBlocks';


export async function checkBlocks() {
  

  const data = await getBlockEvents();
  return data;
}
