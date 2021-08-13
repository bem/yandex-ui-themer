export const COUNTER_ID = '69595123'

export const metricaGoal = (goal: string) => {
  // @ts-ignore
  window.ym(COUNTER_ID, 'reachGoal', goal)
}
