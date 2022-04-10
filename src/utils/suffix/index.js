const suffix = (map) => {
  const timestamp = Math.round(new Date().getTime())
  return {
    ...map,
    timestamp,
  }
}
export default suffix
