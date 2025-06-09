'use client'

import { DateRange as PickerRange } from 'react-day-picker'

type Props = {
  range: PickerRange
  nights: number
}

export default function SelectedDateInfo({ range, nights }: Props) {
  if (!range.from) return null

  const format = (date?: Date) =>
    date?.toLocaleDateString('es-CR', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })

  return (
    <>
      <div className="text-sm text-gray-700 text-center mt-2">
        ✅ Fechas seleccionadas: <strong>{format(range.from)}</strong> a{' '}
        <strong>{format(range.to ?? new Date(range.from.getTime() + 86400000))}</strong>
      </div>
      <div className="mt-1 text-green-700">
        🛏️ {nights} noche(s)
      </div>
    </>
  )
}
