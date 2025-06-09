// Protocol definitions for the chatbot

export type MessageType = 'user' | 'bot';

export interface Message {
  type: MessageType;
  content: string;
  timestamp: Date;
}

export interface ChatContext {
  messages: Message[];
  currentStep: number;
  reservationData: Partial<ReservationData>;
}

export interface ReservationData {
  name: string;
  lastName: string;
  email: string;
  phone: string;
  guests: number;
  cottage: string;
  start: string;
  end: string;
  notes?: string;
}

export type ChatAction = 
  | { type: 'ADD_MESSAGE'; payload: Message }
  | { type: 'SET_STEP'; payload: number }
  | { type: 'UPDATE_RESERVATION_DATA'; payload: Partial<ReservationData> }
  | { type: 'RESET_CHAT' };

export interface ChatResponse {
  message: string;
  action?: ChatAction;
  nextStep?: number;
} 