import { NextResponse } from 'next/server';
import { createData } from '@/controllers/reservationController';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const id = await createData(body);
    return NextResponse.json({ message: 'Reservación creada exitosamente.', id, ok:true});
  } catch (error: any) {
    return NextResponse.json({ error: error.message, ok:false }, { status: 400 });
  }
} 