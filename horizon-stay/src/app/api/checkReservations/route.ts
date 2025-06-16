import { NextResponse } from 'next/server';
import { getData, getDataLocalStorages } from '@/controllers/checkReservationsController';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = await getData(body);
    return NextResponse.json({ message: 'Se obtuvieron los datos correctamente.', data, ok:true});
  } catch (error: any) {
    return NextResponse.json({ error: error.message, ok:false }, { status: 400 });
  }
} 

export async function GET() {
  try {
    const data = await getDataLocalStorages();
    return NextResponse.json({
      message: 'Se obtuvieron los datos correctamente.',
      data,
      ok: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message, ok: false }, { status: 400 });
  }
}