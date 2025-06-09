import { NextResponse } from 'next/server';
import { checkBlocks } from '@/controllers/checkBlockController';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = await checkBlocks();
    return NextResponse.json({ message: 'Bloqueo creado exitosamente.', data, ok:true});
  } catch (error: any) {
    return NextResponse.json({ error: error.message, ok:false }, { status: 400 });
  }
} 