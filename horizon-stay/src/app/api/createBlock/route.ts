import { NextResponse } from 'next/server';
import { createBlock } from '@/controllers/blockController';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const id = await createBlock(body);
    return NextResponse.json({ message: 'Bloqueo creado exitosamente.', id, ok:true});
  } catch (error: any) {
    return NextResponse.json({ error: error.message, ok:false }, { status: 400 });
  }
} 