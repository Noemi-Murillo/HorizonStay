import { NextResponse } from 'next/server';
import { updateData } from '@/controllers/updateResevationsController';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = await updateData(body);
    return NextResponse.json({ message: 'Se obtuvieron los datos correctamente.', data, ok:true});
  } catch (error: any) {
    return NextResponse.json({ error: error.message, ok:false }, { status: 400 });
  }
} 