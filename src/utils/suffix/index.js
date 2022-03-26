export function suffix (map) {
  const timestamp = Math.round(new Date().getTime())
  return {
    ...map,
    timestamp
  }
}
