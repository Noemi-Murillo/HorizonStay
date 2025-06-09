import { NextResponse } from 'next/server';
import { deleteBlocks } from '@/controllers/deleteBlocksController';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = await deleteBlocks(body);
    return NextResponse.json({ message: 'Bloqueo creado exitosamente.', data, ok:true});
  } catch (error: any) {
    return NextResponse.json({ error: error.message, ok:false }, { status: 400 });
  }
} 