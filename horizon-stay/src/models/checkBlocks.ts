import { database } from '@/lib/firebaseClient';
import { ref, get } from 'firebase/database';

export async function getBlockEvents() {
  const blocksRef = ref(database, 'app_data/blocks');
  const snapshot = await get(blocksRef);

  if (!snapshot.exists()) {
    console.log('No hay bloques registrados.');
    return [];
  }

  const blocks = snapshot.val();
  console.log('Bloques obtenidos:', blocks);

  const blockEvents = Object.entries(blocks).map(
    ([id, value]: [string, any]) => ({
      id: value.cottageId,
      title: value.description || 'Bloqueo',
      start: value.start,
      end: value.end,
      resourceId: value.cottageId,
      editable: false, 
      backgroundColor: '#F87171',
      resourceEditable: false
    })
  );

  return blockEvents;
}