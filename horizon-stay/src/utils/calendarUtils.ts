export const getToday = (): Date => {
  const now = new Date()
  return new Date(now.getFullYear(), now.getMonth(), now.getDate())
}

export const calculateNights = (from?: Date, to?: Date): number => {
  if (!from || !to) return 0
  const diffTime = to.getTime() - from.getTime()
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

export const sameDay = (a: Date, b: Date): boolean =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate()

export const isRangeBeforeToday = (from: Date, to: Date): boolean => {
  const today = getToday()
  let current = new Date(from)
  while (current <= to) {
    if (current < today) return true
    current.setDate(current.getDate() + 1)
  }
  return false
}
