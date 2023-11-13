export const getRouteItem = (arrList, queryItem) => {
  let result
  if (Array.isArray(arrList)) {
    result = arrList.find((item) => item.key === queryItem || getRouteItem(item.children, queryItem))
  }
  return result
}

export const getRouteList = (result, arrList, queryItem) => {
  if (Array.isArray(arrList)) {
    arrList.forEach((item) => {
      if (item.key === queryItem) {
        result.push({
          path: item.path,
          key: item.key,
          name: item.name,
          isSubMenu: item.isSubMenu,
          i18nKey: item.i18nKey,
        })
      } else {
        result.push({
          path: item.path,
          key: item.key,
          name: item.name,
          isSubMenu: item.isSubMenu,
          i18nKey: item.i18nKey,
        })
        getRouteList(
          result,
          getRouteItem(item.children, queryItem) ? [getRouteItem(item.children, queryItem)] : [],
          queryItem
        )
      }
    })
  }
  return result
}
