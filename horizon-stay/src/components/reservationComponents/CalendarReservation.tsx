'use client'

import { useState } from 'react'
import { DayPicker, DateRange } from 'react-day-picker'
import 'react-day-picker/dist/style.css'

type Props = {
    onDateSelect: (range: { startDate: string; endDate: string }) => void
}

const reservedDates = [new Date(2025, 4, 14), new Date(2025, 4, 15)] //Obtener datos de Firebase

const getToday = (): Date => {
    const now = new Date()
    return new Date(now.getFullYear(), now.getMonth(), now.getDate())
}

const calculateNights = (from?: Date, to?: Date): number => {
    if (!from || !to) return 0
    const diffTime = to.getTime() - from.getTime()
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}


const CalendarReservation = ({ onDateSelect }: Props) => {
    const [range, setRange] = useState<DateRange | undefined>()
    const [error, setError] = useState<string>('')

    const isDateInReserved = (date: Date): boolean =>
        reservedDates.some(
            (reserved) => reserved.toDateString() === date.toDateString()
        )

    const isRangeValid = (from: Date, to: Date): boolean => {
        let current = new Date(from)
        while (current <= to) {
            if (isDateInReserved(current)) return false
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
            setError('Selecionaste fechas pasadas.')
            setRange(undefined)
            return
        }

        if (!isRangeValid(from, to)) {
            setError('El rango selecionado incluye fechas reservadas. Por favor elije otras fechas.')
            setRange(undefined)
            return
        }

        setError('')
        setRange({ from, to })
        onDateSelect({
            startDate: from.toISOString().split('T')[0],
            endDate: to.toISOString().split('T')[0],
        })
    }

    const formatDisplayDate = (date: Date | undefined) =>
        date?.toLocaleDateString('en-US', {
            weekday: 'short',
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        })

    return (
        <div className="flex flex-col items-center gap-4">
            <h2 className="text-xl font-semibold mb-2">Select your dates</h2>

            <div className="rounded border p-4 shadow-md">
                <DayPicker
                    mode="range"
                    selected={range}
                    onSelect={handleSelect}
                    fromDate={getToday()}
                    disabled={reservedDates}
                    numberOfMonths={1}
                    showOutsideDays
                    modifiersClassNames={{
                        selected: 'bg-green-600 text-white rounded-full',
                        range_middle: 'bg-green-100 text-green-900',
                        range_start: 'bg-green-600 text-white rounded-full',
                        range_end: 'bg-green-600 text-white rounded-full',
                        disabled: 'text-gray-300 cursor-not-allowed line-through',
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
                <div className="text-sm text-gray-700 text-center">
                    ✅ Fechas seleccionadas: <strong>{formatDisplayDate(range.from)}</strong> a{' '}
                    <strong>
                        {formatDisplayDate(range.to) ??
                            formatDisplayDate(new Date(range.from.getTime() + 86400001))}
                    </strong>
                </div>
            )}

            {range?.to && (
                <div className="mt-1 text-green-700">
                    🛏️ {calculateNights(range.from, range.to)} noche(s)
                </div>
            )}

            {error && (
                <div className="text-sm text-red-600 text-center font-medium">
                    ⚠️ {error}
                </div>
            )}
        </div>
    )
}

export default CalendarReservation
