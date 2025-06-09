import { ChatContext, ChatAction, ReservationData } from './types';

const initialContext: ChatContext = {
  messages: [],
  currentStep: 0,
  reservationData: {}
};

let context: ChatContext = { ...initialContext };

export function getContext(): ChatContext {
  return context;
}

export function dispatch(action: ChatAction): void {
  switch (action.type) {
    case 'ADD_MESSAGE':
      context = {
        ...context,
        messages: [...context.messages, action.payload]
      };
      break;
    
    case 'SET_STEP':
      context = {
        ...context,
        currentStep: action.payload
      };
      break;
    
    case 'UPDATE_RESERVATION_DATA':
      context = {
        ...context,
        reservationData: {
          ...context.reservationData,
          ...action.payload
        }
      };
      break;
    
    case 'RESET_CHAT':
      context = { ...initialContext };
      break;
  }
}

export function updateReservationData(data: Partial<ReservationData>): void {
  dispatch({
    type: 'UPDATE_RESERVATION_DATA',
    payload: data
  });
}

export function addMessage(content: string, type: 'user' | 'bot'): void {
  dispatch({
    type: 'ADD_MESSAGE',
    payload: {
      type,
      content,
      timestamp: new Date()
    }
  });
}

export function setStep(step: number): void {
  dispatch({
    type: 'SET_STEP',
    payload: step
  });
}

export function resetChat(): void {
  dispatch({ type: 'RESET_CHAT' });
} 