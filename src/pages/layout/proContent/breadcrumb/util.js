export const getRouteItem = (arrList = [], queryItem) => {
  let result

  if (Array.isArray(arrList)) {
    result = arrList.find((item) => item.path === queryItem || getRouteItem(item.routes, queryItem))
  }
  return result
}

export const getRouteList = (result, arrList = [], queryItem) => {
  if (Array.isArray(arrList)) {
    arrList.forEach((item) => {
      if (item.path === queryItem) {
        result.push({
          path: item.path,
          name: item.name,
        })
      } else {
        result.push({
          path: item.path,
          name: item.name,
        })
        getRouteList(
          result,
          getRouteItem(item.routes, queryItem) ? [getRouteItem(item.routes, queryItem)] : [],
          queryItem
        )
      }
    })
  }
  return result
}
