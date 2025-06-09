// components/reservationComponents/EditEventModal.tsx
'use client';
import { useState, useEffect } from 'react';

type Props = {
    isOpen: boolean;
    eventData: any;
    onClose: () => void;
    onSave: (updated: { title: string; start: string; end: string }) => void;
};

export default function EditEventModal({ isOpen, eventData, onClose, onSave }: Props) {
    const [title, setTitle] = useState('');
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');

    useEffect(() => {
        if (eventData) {
            setTitle(eventData.title || '');
            setStart(new Date(eventData.start).toISOString().slice(0, 10));
            setEnd(new Date(eventData.end).toISOString().slice(0, 10));
        }
    }, [eventData]);

    if (!isOpen || !eventData) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center transition-opacity duration-300">
            <div className="bg-white rounded-2xl shadow-xl p-8 w-[400px] animate-fade-in">
                <h2 className="text-xl font-semibold mb-4">Editar Evento</h2>

                <div className="space-y-3 mb-6">
                    <div>
                        <label className="block text-sm font-medium mb-1">Título</label>
                        <input
                            type="text"
                            className="w-full border px-3 py-2 rounded"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Fecha Inicio</label>
                        <input
                            type="date"
                            className="w-full border px-3 py-2 rounded"
                            value={start}
                            onChange={(e) => setStart(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Fecha Fin</label>
                        <input
                            type="date"
                            className="w-full border px-3 py-2 rounded"
                            value={end}
                            onChange={(e) => setEnd(e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex justify-end gap-2">
                    <button onClick={onClose} className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded">
                        Cancelar
                    </button>
                    <button
                        onClick={() => onSave({ title, start, end })}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                    >
                        Guardar
                    </button>
                </div>
            </div>
        </div>
    );
}
