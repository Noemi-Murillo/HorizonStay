import { ArrangementContextProtocol } from "@/mcp/protocols/arrangementProtocols"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const { month } = await req.json()

  try {
    await ArrangementContextProtocol.resolveConflictsByMonth(month)
    return NextResponse.json({ ok: true, message: "Reservas reacomodadas correctamente." })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ ok: false, error: "Error al resolver conflictos." }, { status: 500 })
  }
}
