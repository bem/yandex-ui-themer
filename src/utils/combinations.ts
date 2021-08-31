import groupBy from "lodash.groupby"
import { merge } from 'lodash'

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

export const getVariantsFromProps = (
    current: Record<string, unknown>,
    combined: Record<string, unknown>,
  ) => {
    const variants = Object.keys(combined).map((key) => {
      const values = combined[key]
      if (Array.isArray(values)) {
        return (values as Array<string>).map((value) => ({ [key]: value }))
      } else if (typeof values === 'boolean' && values) {
        return [{ [key]: false }, { [key]: true }]
      }
      return [{ [key]: values }]
    })
  
    const combinedVariants = combinations(variants).map((variant) => ({
      ...current,
      //@ts-expect-error
      ...merge(...(variant as Array<unknown>)),
    }))
    const combinedVariantsByView = groupBy(combinedVariants, 'view')
  
    return Object.values(combinedVariantsByView)
  }