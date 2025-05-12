import { NextRequest, NextResponse } from 'next/server';
import { getBotResponse } from '@/chatbot/brain';

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ response: 'Mensaje inválido.' }, { status: 400 });
    }

    const response = getBotResponse(message);
    return NextResponse.json({ response });
  } catch (error) {
    console.error("Error en el chatbot:", error);
    return NextResponse.json({ response: 'Error interno del servidor.' }, { status: 500 });
  }
}
