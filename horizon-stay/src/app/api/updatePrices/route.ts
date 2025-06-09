import { PricingProtocol } from "@/mcp/protocols/pricingProtocols"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const data = await PricingProtocol.analyzeSeasons()
    await PricingProtocol.updatePricesBasedOnDemand(data)
    return NextResponse.json({ message: "Precios actualizados", data })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Error al actualizar precios" }, { status: 500 })
  }
}

