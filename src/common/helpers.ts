export const omit = <T extends object, K extends keyof T>(
  obj: T,
  keys: K | K[],
): Omit<T, K> => {
  const result = { ...obj }

  if (!Array.isArray(keys)) {
    delete result[keys]
    return result
  }

  for (const key of keys) {
    delete result[key]
  }

  return result
}

export const groupBy = <T, K extends keyof any>(
  arr: T[],
  callback: (item: T) => K,
): Record<K, T[]> => {
  return arr.reduce(
    (acc: Record<K, T[]>, item: T) => {
      const key = callback(item)
      if (!acc[key]) acc[key] = []
      acc[key].push(item)

      return acc
    },
    {} as Record<K, T[]>,
  )
}
