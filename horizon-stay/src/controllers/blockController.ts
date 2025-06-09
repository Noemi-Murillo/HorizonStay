import { insertBlockData } from '@/models/blockModel';


export async function createBlock(ObjBlock: any) {
  

  const data = await insertBlockData(ObjBlock);
  return data;
}
