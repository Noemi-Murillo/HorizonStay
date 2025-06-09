import { ref, get, set } from "firebase/database"
import { database } from "@/lib/firebaseClient"
import { openai } from "@/services/openai"
import { PricingContext, HighLowSeason } from "../contexts/princingContext"
import { format } from "date-fns"

export const PricingProtocol: PricingContext = {
    async analyzeSeasons() {
        const resRef = ref(database, "app_data/reservations")
        const snap = await get(resRef)
        const reservations = snap.val()
        if (!reservations) return []

        // Agrupamos por tipo y mes
        const reservationsByTypeAndMonth: Record<string, Record<string, number>> = {}

        Object.values(reservations).forEach((r: any) => {
            const startDate = new Date(r.start)
            const month = format(startDate, "MM")

            const cottageId = r.cottage_id
            let type_id: "lago" | "arbol" | "bosque"

            if (cottageId.startsWith("COT001")) type_id = "lago"
            else if (cottageId.startsWith("COT002")) type_id = "arbol"
            else type_id = "bosque"

            if (!reservationsByTypeAndMonth[type_id]) {
                reservationsByTypeAndMonth[type_id] = {}
            }

            if (!reservationsByTypeAndMonth[type_id][month]) {
                reservationsByTypeAndMonth[type_id][month] = 0
            }

            reservationsByTypeAndMonth[type_id][month] += 1
        })

        // Convertimos a array resumido
        const summarizedData = Object.entries(reservationsByTypeAndMonth).flatMap(
            ([type_id, months]) =>
                Object.entries(months).map(([month, total_reservations]) => ({
                    type_id,
                    month,
                    total_reservations
                }))
        )

        const completion = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [
                {
                    role: "system",
                    content: "Eres un sistema experto en análisis de ocupación hotelera para predecir temporadas altas y bajas, y recomendar precios."
                },
                {
                    role: "user",
                    content: `Estos son los datos de reservas por tipo de cabaña y mes: ${JSON.stringify(summarizedData)}.

Devuelve únicamente un array en formato JSON con la siguiente estructura:

[
  {
    "type_id": "lago" | "arbol" | "bosque",
    "month": "01" | "02" | ... | "12",
    "season": "alta" | "baja",
    "suggested_price": 85000
  },
  ...
]

No expliques nada. No uses texto adicional. Solo devuelve el JSON.`

                }
            ]
        })

        const content = completion.choices[0].message.content || "[]"
        return JSON.parse(content) as HighLowSeason[]
    },

    async updatePricesBasedOnDemand(data: HighLowSeason[]) {
        // Calcula el precio promedio por tipo para actualizar el precio general del tipo
        const grouped: Record<string, number[]> = {}

        data.forEach(({ type_id, suggested_price }) => {
            if (!grouped[type_id]) grouped[type_id] = []
            grouped[type_id].push(suggested_price)
        })

        for (const [type_id, prices] of Object.entries(grouped)) {
            const avg = Math.round(prices.reduce((a, b) => a + b, 0) / prices.length)
            const refPrecio = ref(database, `app_data/cottage_types/${type_id}/price_per_night`)
            await set(refPrecio, avg)
        }
    }
}
