// src/mcp/protocols/arrangementContextProtocol.ts

import { get, set, ref } from "firebase/database"
import { database } from "@/lib/firebaseClient"
import { parseISO, isSameMonth } from "date-fns"
import { Reservation } from "@/mcp/models/reservationModel"
import { ArrangementContext } from "@/mcp/contexts/arrangementContext"
import { openai } from "@/services/openai"

function buildPrompt(type: string, reservations: Reservation[], cottageIds: string[]): string {
  return `
Eres un optimizador de reservaciones.

Solo responde con un arreglo JSON, sin explicaciones, en este formato:
[
  {
    "reserve_number": "RES123",
    "new_cottage_id": "COTTAGE01"
  }
]

Contexto:
- Tipo de cabaña: ${type}
- Cabañas disponibles: ${cottageIds.join(', ')}

Reservas actuales:
${reservations.map(r => `Reserva ${r.reserve_number} del ${r.start} al ${r.end} en ${r.cottage_id}`).join('\n')}

Reglas:
- Las fechas de las reservas no se pueden modificar.
- No puede haber traslapes entre reservas del mismo tipo de cabaña.
- Las reservas solo se pueden mover entre cabañas del mismo tipo.
- Mueve la menor cantidad de reservas posibles para resolver los conflictos.

Pregunta:
¿A qué cabaña moverías cada reserva para evitar traslapes? Solo incluye en el JSON las que sí deben moverse.
  `.trim()
}

export const ArrangementContextProtocol: ArrangementContext = {
  async resolveConflictsByMonth(month) {
    const reservationsSnap = await get(ref(database, "app_data/reservations"))
    const cottagesSnap = await get(ref(database, "app_data/cottages"))
    if (!reservationsSnap.exists() || !cottagesSnap.exists()) return

    const allReservations: Record<string, Reservation> = reservationsSnap.val()
    const allCottages: Record<string, { type_id: string }> = cottagesSnap.val()

    const cottageByType: Record<string, string[]> = {}
    for (const [cottageId, info] of Object.entries(allCottages)) {
      const type = info.type_id
      if (!cottageByType[type]) cottageByType[type] = []
      cottageByType[type].push(cottageId)
    }

    const reservationsByType: Record<string, Reservation[]> = {}
    for (const res of Object.values(allReservations)) {
      const startDate = parseISO(res.start)
      const endDate = parseISO(res.end)

      if (isSameMonth(startDate, new Date(`${month}-01`)) || isSameMonth(endDate, new Date(`${month}-01`))) {
        const type = allCottages[res.cottage_id]?.type_id
        if (!type) continue
        if (!reservationsByType[type]) reservationsByType[type] = []
        reservationsByType[type].push(res)
      }
    }

    for (const [type, reservations] of Object.entries(reservationsByType)) {
      const availableCottages = cottageByType[type]
      const sorted = reservations.sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())
      const prompt = buildPrompt(type, sorted, availableCottages)

      try {
        const completion = await openai.chat.completions.create({
          model: "gpt-4",
          messages: [
            {
              role: "system",
              content: "Eres un experto en optimización de reservaciones de alojamientos turísticos."
            },
            {
              role: "user",
              content: prompt
            }
          ],
          temperature: 0.4
        })

        const content = completion.choices[0].message.content || "[]"
        console.log("🧠 Contenido IA:", content)

        const parsed = JSON.parse(content) as {
          reserve_number: string
          new_cottage_id: string
        }[]
        console.log("✅ Cambios que se aplicarán:", parsed)

        for (const change of parsed) {
          const original = allReservations[change.reserve_number]
          if (!original) continue

          await set(ref(database, `app_data/reservations/${change.reserve_number}/cottage_id`), change.new_cottage_id)
        }

      } catch (err) {
        console.error(`❌ Error al analizar el tipo ${type}:`, err)
      }
    }
  }
}
