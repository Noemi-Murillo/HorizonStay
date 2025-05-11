import { NextResponse } from 'next/server';
import { createData } from '@/controllers/reservationController';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const id = await createData(body);
    return NextResponse.json({ mensaje: 'Reservación creada exitosamente.', id });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}