"use client";

import { useState } from "react";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (startDate: string, endDate: string, cottageId: string) => void;
    cottages: { id: string; title: string }[];
};

export default function BlockModal({ isOpen, onClose, onSubmit, cottages }: Props) {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [selectedCottage, setSelectedCottage] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = () => {
        if (startDate && endDate && selectedCottage) {
            onSubmit(startDate, endDate, selectedCottage);
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center transition-opacity duration-300 absolute inset-0 bg-black/40 backdrop-blur-sm z-10">
            <div className="bg-white rounded-2xl shadow-lg p-8 w-[400px] animate-fade-in">
                <h2 className="text-xl font-semibold mb-4">Crear Bloqueo</h2>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Cabaña</label>
                    <select
                        className="w-full border px-3 py-2 rounded"
                        value={selectedCottage}
                        onChange={(e) => setSelectedCottage(e.target.value)}
                    >
                        <option value="">Seleccione una cabaña</option>
                        {cottages.map((c) => (
                            <option key={c.id} value={c.id}>
                                {c.title}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label className="block text-sm font-medium mb-1">Fecha inicio</label>
                    <input
                        type="date"
                        className="w-full border px-3 py-2 rounded"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label className="block text-sm font-medium mb-1">Fecha fin</label>
                    <input
                        type="date"
                        className="w-full border px-3 py-2 rounded"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label className="block text-sm font-medium mb-1">Descripción</label>
                    <input
                        type="text"
                        className="w-full border px-3 py-2 rounded"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>



                <div className="flex justify-end space-x-2">
                    <button
                        className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                        onClick={onClose}
                    >
                        Cancelar
                    </button>
                    <button
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                        onClick={handleSubmit}
                    >
                        Guardar
                    </button>
                </div>
            </div>
        </div>
    );
}
