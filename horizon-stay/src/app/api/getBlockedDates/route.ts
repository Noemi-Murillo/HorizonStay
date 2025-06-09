import { NextResponse } from 'next/server';
import { getBlockedDatesData } from '@/controllers/getBlockedDatesController';

export async function GET() {
  try {
    const result = await getBlockedDatesData();
    return NextResponse.json({ ok: true, data: result });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
}
