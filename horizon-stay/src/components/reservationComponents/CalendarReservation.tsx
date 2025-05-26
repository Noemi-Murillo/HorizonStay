'use client'

import { useEffect, useState } from 'react'
import { DayPicker, DateRange } from 'react-day-picker'
import 'react-day-picker/dist/style.css'
import { fetchUnavailableDates } from '@/controllers/datesController'

type Props = {
  onDateSelect: (range: { startDate: string; endDate: string; numNights: number }) => void
  cottageType: 'lago' | 'bosque' | 'arbol'
}

const getToday = (): Date => {
  const now = new Date()
  return new Date(now.getFullYear(), now.getMonth(), now.getDate())
}

const calculateNights = (from?: Date, to?: Date): number => {
  if (!from || !to) return 0
  const diffTime = to.getTime() - from.getTime()
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

const sameDay = (a: Date, b: Date): boolean => {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

const CalendarReservation = ({ onDateSelect, cottageType }: Props) => {
  const [range, setRange] = useState<DateRange | undefined>()
  const [error, setError] = useState<string>('')
  const [reservedDates, setReservedDates] = useState<Date[]>([])
  const [blockedDates, setBlockedDates] = useState<Date[]>([])

  useEffect(() => {
    const loadDates = async () => {
      const result = await fetchUnavailableDates(cottageType)

      if (result.success) {
        setReservedDates(result.data)
        setBlockedDates(result.data)
        setError('')
      } else {
        setError(result.message || 'Error cargando fechas')
      }
    }

    if (cottageType) {
      loadDates()
    }
  }, [cottageType])

  const isDateUnavailable = (date: Date) => {
    return [...reservedDates, ...blockedDates].some(d => sameDay(d, date))
  }

  const isRangeValid = (from: Date, to: Date): boolean => {
    let current = new Date(from)
    while (current <= to) {
      if (isDateUnavailable(current)) return false
      current.setDate(current.getDate() + 1)
    }
    return true
  }

  const isRangeBeforeToday = (from: Date, to: Date): boolean => {
    const today = getToday()
    let current = new Date(from)
    while (current <= to) {
      if (current < today) return true
      current.setDate(current.getDate() + 1)
    }
    return false
  }

  const handleSelect = (selectedRange: DateRange | undefined) => {
    if (!selectedRange?.from) {
      setRange(undefined)
      return
    }

    const from = selectedRange.from
    let to = selectedRange.to ?? new Date(from)

    if (from.toDateString() === to.toDateString()) {
      to = new Date(from.getFullYear(), from.getMonth(), from.getDate() + 1)
    }

    if (isRangeBeforeToday(from, to)) {
      setError('Seleccionaste fechas pasadas.')
      setRange(undefined)
      return
    }

    if (!isRangeValid(from, to)) {
      setError('El rango incluye fechas bloqueadas o reservadas.')
      setRange(undefined)
      return
    }

    setError('')
    setRange({ from, to })
    onDateSelect({
      startDate: from.toISOString().split('T')[0],
      endDate: to.toISOString().split('T')[0],
      numNights: calculateNights(from, to)
    })
  }

  const formatDisplayDate = (date: Date | undefined) =>
    date?.toLocaleDateString('es-CR', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl font-semibold mb-2">Seleccioná tus fechas</h2>

      <div className="rounded border p-4 shadow-md">
        <DayPicker
          mode="range"
          selected={range}
          onSelect={handleSelect}
          fromDate={getToday()}
          numberOfMonths={1}
          showOutsideDays
          disabled={[...reservedDates, ...blockedDates]}
          modifiers={{
            blocked: blockedDates,
            reserved: reservedDates,
          }}
          modifiersClassNames={{
            blocked: 'bg-red-200 text-red-700 line-through',
            reserved: 'bg-yellow-200 text-yellow-800 line-through',
            selected: 'bg-green-600 text-white rounded-full',
            range_middle: 'bg-green-100 text-green-900',
            range_start: 'bg-green-600 text-white rounded-full',
            range_end: 'bg-green-600 text-white rounded-full',
            disabled: 'text-gray-300 cursor-not-allowed',
            today: 'font-bold underline',
          }}
          classNames={{
            caption_label: 'text-xl font-bold text-green-700',
            nav_button: 'text-green-600 hover:bg-green-100 rounded',
            cell: 'text-center',
          }}
        />
      </div>

      {range?.from && (
        <div className="text-sm text-gray-700 text-center mt-2">
          ✅ Fechas seleccionadas: <strong>{formatDisplayDate(range.from)}</strong> a{' '}
          <strong>
            {formatDisplayDate(range.to) ??
              formatDisplayDate(new Date(range.from.getTime() + 86400000))}
          </strong>
        </div>
      )}

      {range?.to && (
        <div className="mt-1 text-green-700">
          🛏️ {calculateNights(range.from, range.to)} noche(s)
        </div>
      )}

      {error && (
        <div className="text-sm text-red-600 text-center font-medium mt-2">
          ⚠️ {error}
        </div>
      )}
    </div>
  )
}

export default CalendarReservation
