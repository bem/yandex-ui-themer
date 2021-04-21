export const getQueryParameter = (name: string) => {
  return new URLSearchParams(window.location.search).get(name)
}

export const setQueryParameter = (name: string, value: string) => {
  const locationNoQueryParams = window.location.href.replace(window.location.search, '')
  const queryParams = new URLSearchParams(window.location.search)

  queryParams.set(name, value)
  window.history.pushState({}, '', `${locationNoQueryParams}?${queryParams.toString()}`)
}
