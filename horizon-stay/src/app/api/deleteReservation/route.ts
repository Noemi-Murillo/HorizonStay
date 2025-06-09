import { NextResponse } from 'next/server';
import { deleteReservation } from '@/controllers/deleteReservationController';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = await deleteReservation(body);
    return NextResponse.json({ message: 'Reserva eliminada exitosamente.', data, ok:true});
  } catch (error: any) {
    return NextResponse.json({ error: error.message, ok:false }, { status: 400 });
  }
} 