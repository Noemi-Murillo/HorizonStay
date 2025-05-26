// pages/api/checkReservation.ts
import { NextResponse } from 'next/server';
import { getData } from '@/controllers/checkReservationController';

export async function POST(request: Request) {
  try {
    const { reservationId, email } = await request.json();

    if (!reservationId || !email) {
      return NextResponse.json({ ok: false, error: "Faltan datos requeridos." }, { status: 400 });
    }

    const reservation = await getData(reservationId);

    if (!reservation || !reservation.ok) {
      return NextResponse.json({ ok: false, error: "Reservación no encontrada." }, { status: 404 });
    }

    if (reservation.email.toLowerCase() !== email.toLowerCase()) {
      return NextResponse.json({ ok: false, error: "El correo no coincide con la reservación." }, { status: 403 });
    }

    return NextResponse.json({ ok: true, reservation });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message || "Error interno del servidor." }, { status: 500 });
  }
}
