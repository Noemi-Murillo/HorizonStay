import { get, ref } from 'firebase/database'
import { database } from '@/lib/firebaseClient'

function generateDateRange(start: string, end: string): string[] {
  const [startYear, startMonth, startDay] = start.split('-').map(Number)
  const [endYear, endMonth, endDay] = end.split('-').map(Number)

  const dates: string[] = []
  const current = new Date(startYear, startMonth - 1, startDay)
  const final = new Date(endYear, endMonth - 1, endDay)

  if (start !== end) {
    final.setDate(final.getDate() - 1)
  }

  while (current <= final) {
    const localDate =
      current.getFullYear() + "-" +
      String(current.getMonth() + 1).padStart(2, "0") + "-" +
      String(current.getDate()).padStart(2, "0")

    dates.push(localDate)
    current.setDate(current.getDate() + 1)
  }

  return dates
}



export async function getFullyUnavailableDatesByType(
  cottageType: 'lago' | 'arbol' | 'bosque'
): Promise<Date[]> {
  const prefixMap = {
    lago: 'COT001',
    arbol: 'COT002',
    bosque: 'COT003'
  }

  const prefix = prefixMap[cottageType]
  if (!prefix) return []

  const cottagesRef = ref(database, 'app_data/cottages')
  const blocksRef = ref(database, 'app_data/blocks')
  const reservationsRef = ref(database, 'app_data/reservations')

  const [cottagesSnap, blocksSnap, reservationsSnap] = await Promise.all([
    get(cottagesRef),
    get(blocksRef),
    get(reservationsRef)
  ])

  const cottages = cottagesSnap.exists() ? cottagesSnap.val() : {}
  const allCottagesOfType = Object.entries(cottages)
    .filter(([id]) => id.startsWith(prefix))
    .map(([id]) => id)

  const totalCottagesOfType = allCottagesOfType.length

  const dateMap: Record<string, Set<string>> = {}

  const addToMap = (entries: any, startKey: string, endKey: string) => {
    Object.values(entries).forEach((entry: any) => {
      const cottageId = entry.cottage_id
      if (!allCottagesOfType.includes(cottageId)) return

      const range = generateDateRange(entry[startKey], entry[endKey])
      range.forEach(date => {
        if (!dateMap[date]) dateMap[date] = new Set()
        dateMap[date].add(cottageId)
      })
    })
  }

  if (blocksSnap.exists()) addToMap(blocksSnap.val(), 'start_date', 'end_date')
  if (reservationsSnap.exists()) addToMap(reservationsSnap.val(), 'start', 'end')

  const unavailableDates: Date[] = []

  for (const [date, cottageSet] of Object.entries(dateMap)) {
    if (cottageSet.size >= totalCottagesOfType) {
      const [year, month, day] = date.split('-').map(Number)
      unavailableDates.push(new Date(year, month - 1, day))

    }
  }

  console.log("❌ Fechas totalmente bloqueadas:", unavailableDates)

  return unavailableDates
}
