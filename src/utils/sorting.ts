import { Test } from '../api/api'

export const STATUS_ORDER: Record<string, number> = {
  Online: 1,
  Paused: 2,
  Stopped: 3,
  Draft: 4,
}

export const sortTests = (
  tests: Test[],
  key: keyof Test,
  order: 'asc' | 'desc'
): Test[] => {
  return [...tests].sort((a, b) => {
    let valueA = a[key]
    let valueB = b[key]

    if (key === 'status') {
      return order === 'asc'
        ? STATUS_ORDER[valueA] - STATUS_ORDER[valueB]
        : STATUS_ORDER[valueB] - STATUS_ORDER[valueA]
    }

    return order === 'asc'
      ? valueA?.localeCompare(valueB)
      : valueB?.localeCompare(valueA)
  })
}
