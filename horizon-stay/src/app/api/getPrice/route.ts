// src/app/api/getPrice/route.ts
import { fetchCottagePrice } from '@/controllers/priceController'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get('type')

  if (!type) {
    return NextResponse.json({ error: 'Parámetro tipo faltante' }, { status: 400 })
  }

  const result = await fetchCottagePrice(type)

  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 404 })
  }

  return NextResponse.json({ price: result.price })
}
