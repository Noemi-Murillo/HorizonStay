// src/chatbot/brain.ts
import { getContext, addMessage, setStep, updateReservationData } from './context';
import { ChatResponse, ReservationData } from './types';
import stringSimilarity from 'string-similarity';
import { infoTool, createReservationTool } from '@/tools/tools';

export async function getBotResponse(message: string): Promise<ChatResponse> {
  const context = getContext();
  const normalizedMsg = message.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();

  // Add user message to context
  addMessage(message, 'user');

  if (context.currentStep > 0) {
    return await handleReservationSteps(message);
  }

  // 🤖 Detectar intención de reservar
  const frasesReserva = ['quiero reservar', 'reservar una cabaña', 'necesito hospedarme', 'hacer reserva'];
  const result = stringSimilarity.findBestMatch(normalizedMsg, frasesReserva);

  if (result.bestMatch.rating > 0.5) {
    const response: ChatResponse = {
      message: '¡Perfecto! Empecemos con tu reserva. ¿Cuál es tu nombre?',
      nextStep: 1
    };
    addMessage(response.message, 'bot');
    setStep(1);
    return response;
  }

  // 📘 Si no está reservando, usar infoTool
  try {
const response = await fetch('http://localhost:3000/api/infotool', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ pregunta: message }),
});

const data = await response.json();
if (data?.content?.[0]?.type === 'text') {
  const botMessage = data.content[0].text;
  addMessage(botMessage, 'bot');
  return { message: botMessage };
}
  } catch (err) {
    console.error('❌ Error en infoTool:', err);
  }

  const defaultResponse = 'Lo siento, no entendí. ¿Quieres hacer una reserva o preguntar algo?';
  addMessage(defaultResponse, 'bot');
  return { message: defaultResponse };
}

// 🧾 Flujo paso a paso para reservar
async function handleReservationSteps(message: string): Promise<ChatResponse> {
  const context = getContext();
  const step = context.currentStep;

  let response: ChatResponse = { message: '', nextStep: step + 1 };

  switch (step) {
    case 1:
      updateReservationData({ name: message });
      response.message = '¿Y tus apellidos?';
      break;
    case 2:
      updateReservationData({ lastName: message });
      response.message = '¿Cuál es tu correo electrónico?';
      break;
    case 3:
      updateReservationData({ email: message });
      response.message = '¿Tu número de teléfono?';
      break;
    case 4:
      updateReservationData({ phone: message });
      response.message = '¿Cuántas personas asistirán?';
      break;
    case 5:
      const guestsNumber = parseInt(message);
      if (isNaN(guestsNumber)) {
        response.message = 'Por favor ingresa un número válido de personas.';
        response.nextStep = 5; // Mantener el mismo paso para reintentar
        break;
      }
      updateReservationData({ guests: guestsNumber });
      response.message = '¿Qué cabaña deseas? (Ej: COT001)';
      break;
    case 6:
      updateReservationData({ cottage: message });
      response.message = '¿Fecha de entrada? (YYYY-MM-DD)';
      break;
    case 7:
      updateReservationData({ start: message });
      response.message = '¿Fecha de salida? (YYYY-MM-DD)';
      break;
    case 8:
      updateReservationData({ end: message });
      response.message = '¿Alguna nota adicional?';
      break;
    case 9:
      updateReservationData({ notes: message });
      
      try {
        const reservationData = context.reservationData as ReservationData;
        const result = await createReservationTool(reservationData);
        response.message = result?.content?.[0]?.text || '✅ Reserva procesada.';
        response.nextStep = 0; // Reset step after completion
      } catch (err) {
        console.error('❌ Error en createReservationTool:', err);
        response.message = '❌ No se pudo completar la reserva.';
        response.nextStep = 0; // Reset step on error
      }
      break;
    default:
      response.message = '❌ Algo falló en el flujo de reserva.';
      response.nextStep = 0;
  }

  addMessage(response.message, 'bot');
  setStep(response.nextStep || 0);
  return response;
}
