'use client'

import { useEffect, useState } from 'react'
import { DayPicker, DateRange } from 'react-day-picker'
import 'react-day-picker/dist/style.css'
import { fetchUnavailableDates } from '@/controllers/datesController'
import { getToday, calculateNights, sameDay, isRangeBeforeToday } from '@/utils/calendarUtils'
import SelectedDateInfo from './selectedDateInfo'

type Props = {
  onDateSelect: (range: { startDate: string; endDate: string; numNights: number }) => void
  cottageType: 'lago' | 'bosque' | 'arbol'
}

const CalendarReservation = ({ onDateSelect, cottageType }: Props) => {
  const [range, setRange] = useState<DateRange>()
  const [error, setError] = useState('')
  const [reservedDates, setReservedDates] = useState<Date[]>([])

  useEffect(() => {
    const loadDates = async () => {
      try {
        const response = await fetch('/api/getBlockedDates')
        const result = await response.json()
        console.log("Fechas bloquedas",result)
        if (result.ok) {
          const blocked = result.data.blockedDates[cottageType] || []
          const parsedDates = blocked.map((d: string) => {
            const [year, month, day] = d.split('-').map(Number)
            return new Date(year, month - 1, day)
          })
          setReservedDates(parsedDates)
          setError('')
        } else {
          setError(result.error || 'Error cargando fechas')
        }
      } catch (error) {
        console.error('Error al cargar fechas bloqueadas:', error)
        setError('No se pudieron obtener las fechas.')
      }
    }

    if (cottageType) loadDates()
  }, [cottageType])



  const isDateUnavailable = (date: Date) =>
    reservedDates.some(d => sameDay(d, date))

  const isRangeValid = (from: Date, to: Date) => {
    let current = new Date(from)
    while (current <= to) {
      if (isDateUnavailable(current)) return false
      current.setDate(current.getDate() + 1)
    }
    return true
  }

  const handleSelect = (selectedRange: DateRange | undefined) => {
    if (!selectedRange?.from) return setRange(undefined)

    const from = selectedRange.from
    let to = selectedRange.to ?? new Date(from)

    if (from.toDateString() === to.toDateString()) {
      to = new Date(from.getFullYear(), from.getMonth(), from.getDate() + 1)
    }

    if (isRangeBeforeToday(from, to)) {
      setError('Seleccionaste fechas pasadas.')
      return setRange(undefined)
    }

    if (!isRangeValid(from, to)) {
      setError('El rango incluye fechas bloqueadas o reservadas.')
      return setRange(undefined)
    }

    setError('')
    setRange({ from, to })
    onDateSelect({
      startDate: from.toISOString().split('T')[0],
      endDate: to.toISOString().split('T')[0],
      numNights: calculateNights(from, to)
    })
  }

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
          disabled={reservedDates}
          modifiers={{ reserved: reservedDates }}
          modifiersClassNames={{
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
        <SelectedDateInfo
          range={range}
          nights={calculateNights(range.from, range.to)}
        />
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
