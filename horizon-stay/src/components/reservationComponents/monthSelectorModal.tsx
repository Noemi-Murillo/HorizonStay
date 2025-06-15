"use client"

import { useState } from "react"
import { createPortal } from "react-dom"
import Swal from "sweetalert2"

type Props = {
    isOpen: boolean
    onClose: () => void
}

export default function MonthSelectorModal({ isOpen, onClose }: Props) {
    const [selectedMonth, setSelectedMonth] = useState("")
    const [loading, setLoading] = useState(false)

    if (!isOpen) return null

    const handleSubmit = async () => {
        if (!selectedMonth) {
            Swal.fire("Mes no seleccionado", "Debes elegir un mes primero.", "warning")
            return
        }

        setLoading(true)

        try {
            const res = await fetch("/api/arrangement", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ month: selectedMonth })
            })

            const result = await res.json()

            if (res.ok && result.ok) {
                await Swal.fire("Éxito", "Las reservaciones fueron acomodadas correctamente.", "success")
                onClose()
            } else {
                throw new Error(result.error || "Error desconocido.")
            }
        } catch (err) {
            console.error(err)
            Swal.fire("Error", "Ocurrió un problema al acomodar las reservaciones.", "error")
        } finally {
            setLoading(false)
        }
    }


    return createPortal(
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative space-y-4">
                <button onClick={onClose} className="absolute top-2 right-4 text-gray-600 text-xl font-bold">&times;</button>
                <h2 className="text-2xl font-bold">Acomodar reservaciones</h2>
                <p>Selecciona el mes que deseas analizar:</p>

                <input
                    type="month"
                    className="border px-3 py-2 rounded w-full"
                    value={selectedMonth}
                    onChange={e => setSelectedMonth(e.target.value)}
                />

                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full py-2 px-4 bg-green-600 text-white rounded hover:bg-green-700 mt-4"
                >
                    {loading ? "Acomodando..." : "Acomodar reservas del mes"}
                </button>
            </div>
        </div>,
        document.body
    )
}
