// models/deleteBlock.ts
import { database } from '@/lib/firebaseClient';
import { ref, remove } from 'firebase/database';

export async function deleteBlockById(ObjBlock: any) {
  try {
    console.log("objetobloqueo", ObjBlock)
    const blockRef = ref(database, `app_data/blocks/${ObjBlock.eventoAEliminar.ids}`);
    await remove(blockRef);
    console.log(`Bloqueo ${ObjBlock.eventoAEliminar.ids} eliminado correctamente.`);
    return true;
  } catch (error) {
    console.error(`Error al eliminar el bloqueo ${ObjBlock.eventoAEliminar.ids}:`, error);
    return false;
  }
}
