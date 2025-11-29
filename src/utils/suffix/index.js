const suffix = (map) => {
  const timestamp = Math.round(new Date().getTime())
  return {
    ...map,
    _: timestamp,
  }
}
export default suffix
