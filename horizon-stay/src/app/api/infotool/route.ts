import { NextRequest, NextResponse } from 'next/server';
import { infoTool } from '@/tools/infoTool';

export async function POST(req: NextRequest) {
  try {
    const { pregunta } = await req.json();

    if (!pregunta) {
      return NextResponse.json({ error: '❌ Pregunta requerida.' }, { status: 400 });
    }

    const result = await infoTool({ pregunta });
    return NextResponse.json(result);
  } catch (error) {
    console.error('❌ Error en infoTool API:', error);
    return NextResponse.json({ error: '❌ Error interno del servidor.' }, { status: 500 });
  }
}
