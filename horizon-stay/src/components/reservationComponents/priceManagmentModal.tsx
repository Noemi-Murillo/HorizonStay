"use client"

import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { ref, get, set } from "firebase/database"
import { database } from "@/lib/firebaseClient"

type CottagePrice = {
  type_id: string
  name: string
  price_per_night: number
}

type Props = {
  isOpen: boolean
  onClose: () => void
}


export default function PriceManagementModal({ isOpen, onClose }: Props) {
  const [prices, setPrices] = useState<CottagePrice[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setLoading(true)
      fetchPrices().finally(() => setLoading(false))
    }
  }, [isOpen])


  const fetchPrices = async () => {
    const snap = await get(ref(database, "app_data/cottage_types"))
    const data = snap.val()
    const result = Object.entries(data).map(([type_id, value]: any) => ({
      type_id,
      name: value.name,
      price_per_night: value.price_per_night
    }))
    setPrices(result)
  }

  const handleIAUpdate = async () => {
    setLoading(true)
    const res = await fetch("/api/updatePrices")
    const json = await res.json()
    if (res.ok) {
      await fetchPrices()
    }
    setLoading(false)
  }

  const handleManualChange = async (type_id: string, price: number) => {
    await set(ref(database, `app_data/cottage_types/${type_id}/price_per_night`), price)
    await fetchPrices()
  }

  if (!isOpen) return null


  if (loading) {
    return createPortal(
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-md p-6 space-y-4 text-center">
          <div className="animate-pulse text-lg text-gray-800 font-medium">
            Cargando datos...<br />
            Esto puede tardar unos segundos mientras se procesan las predicciones de IA.
          </div>
          <div className="w-16 h-16 mx-auto border-4 border-green-600 border-t-transparent rounded-full animate-spin" />
        </div>
      </div>,
      document.body
    )
  }


  return createPortal(
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 space-y-4 relative">
        <button onClick={onClose} className="absolute top-2 right-4 text-gray-600 text-xl font-bold">&times;</button>
        <h2 className="text-2xl font-bold mb-4">Gestión de Precios de Cabañas</h2>

        <table className="w-full text-left text-sm">
          <thead>
            <tr>
              <th>Tipo</th>
              <th>Precio actual (₡)</th>
              <th>Editar</th>
            </tr>
          </thead>
          <tbody>
            {prices.map(p => (
              <tr key={p.type_id} className="border-b">
                <td className="py-2">{p.name}</td>
                <td className="py-2">{p.price_per_night.toLocaleString()}</td>
                <td className="py-2">
                  <input
                    type="number"
                    defaultValue={p.price_per_night}
                    className="border rounded px-2 py-1 w-24"
                    onBlur={e => handleManualChange(p.type_id, Number(e.target.value))}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button
          onClick={handleIAUpdate}
          disabled={loading}
          className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          {loading ? "Actualizando con IA..." : "Actualizar automáticamente con IA"}
        </button>
      </div>
    </div>,
    document.body
  )
}
