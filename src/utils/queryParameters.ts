const getLocation = () => window.location.href.replace(window.location.search, '')

export const getQueryParameter = (name: string) => {
  return new URLSearchParams(window.location.search).get(name)
}

export const setQueryParameter = (name: string, value: string) => {
  const queryParams = new URLSearchParams(window.location.search)
  queryParams.set(name, value)

  window.history.pushState({}, '', `${getLocation()}?${queryParams.toString()}`)
}

export const deleteQueryParameter = (name: string) => {
  const queryParams = new URLSearchParams(window.location.search)
  queryParams.delete(name)

  const query = queryParams.toString() ? `?${queryParams.toString()}` : ''

  window.history.pushState({}, '', getLocation() + query)
}
