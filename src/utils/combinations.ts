export const combinations = (values: unknown[][]) => {
  if (values.length === 0) return []

  return values.reduceRight((res, value) => {
    return res.length
      // @ts-ignore
      ? value.map((a) => res.map((r) => r.concat(a))).flat()
      : value.map((v) => [v])
  }, [])
}

export const combinationsCount = (values: unknown[][]): number => {
  return values.reduce((res, v) => res * v.length, 0)
}
