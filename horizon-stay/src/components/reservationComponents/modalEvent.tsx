// components/reservationComponents/EventModal.tsx
'use client';
import { useEffect } from 'react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  eventData: any;
  onConfirm: () => void;
  onEdit: () => void;
  onDelete: () => void;
};

export default function EventModal({ isOpen, onClose, eventData, onConfirm, onEdit, onDelete }: Props) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  if (!isOpen || !eventData) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center transition-opacity duration-300">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-[400px] animate-fade-in">
        <h2 className="text-xl font-semibold mb-4">Detalle del Evento</h2>

        <div className="text-sm space-y-2 mb-6">
          <p hidden><strong>Reserva:</strong> {eventData.id}</p>
          <p><strong>Detalle reserva:</strong> {eventData.title}</p>

          {eventData.extendedProps.type !== 'bloqueo' && (
            <>
              <p><strong>Nombre:</strong> {eventData.extendedProps.name}</p>
              <p><strong>Correo electrónico:</strong> {eventData.extendedProps.email}</p>
              <p><strong>Teléfono:</strong> {eventData.extendedProps.phone}</p>
            </>
          )}

          <p><strong>Fecha inicio:</strong> {new Date(eventData.start).toLocaleString()}</p>
          <p><strong>Fecha Fin:</strong> {new Date(eventData.end).toLocaleString()}</p>
          <p hidden><strong>ID Firebase:</strong> {eventData.extendedProps.ids}</p>
          <p><strong>Tipo:</strong> {eventData.extendedProps.type === 'bloqueo' ? 'Bloqueo' : 'Reserva'}</p>
        </div>


        <div className="flex flex-wrap justify-end gap-2">
          <button
            onClick={onConfirm}
            className={`px-4 py-2 rounded text-white ${eventData.extendedProps.type === 'bloqueo' || eventData.extendedProps.status?.toLowerCase() === 'confirmado'
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-700'
              }`}
            disabled={
              eventData.extendedProps.type === 'bloqueo' || eventData.extendedProps.status?.toLowerCase() === 'confirmado'
            }
          >
            Confirmar
          </button>
          {/* <button
            onClick={onEdit}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Editar
          </button> */}
          <button
            onClick={onDelete}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
          >
            Eliminar
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
