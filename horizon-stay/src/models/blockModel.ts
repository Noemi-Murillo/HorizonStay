import { database } from '@/lib/firebaseClient';
import { ref, get, set } from 'firebase/database';

export async function insertBlockData(ObjBlock: any) {
  const blocksRef = ref(database, 'app_data/blocks');
  const snapshot = await get(blocksRef);

  let nextBlockId = 'BLOCK001';

  if (snapshot.exists()) {
    const blocks = snapshot.val();

    const blockNumbers = Object.keys(blocks)
      .map(key => parseInt(key.replace('BLOCK', '')))
      .filter(num => !isNaN(num));

    const maxBlock = Math.max(...blockNumbers);
    const nextNumber = (maxBlock + 1).toString().padStart(3, '0');
    nextBlockId = `BLOCK${nextNumber}`;
  }

  await set(ref(database, `app_data/blocks/${nextBlockId}`), ObjBlock);

  return nextBlockId;
}
