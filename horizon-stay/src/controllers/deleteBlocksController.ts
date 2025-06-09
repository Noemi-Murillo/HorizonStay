import { deleteBlockById } from '@/models/deleteBlocks';


export async function deleteBlocks(ObjBlock: any) {
  

  const data = await deleteBlockById(ObjBlock);
  return data;
}
