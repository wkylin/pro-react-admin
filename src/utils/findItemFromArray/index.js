export const getItemFromArray = (arrList, queryItem, itemKey) => {
  let result
  if (Array.isArray(arrList)) {
    result = arrList.find((item) => item[itemKey] === queryItem || getItemFromArray(item.children, queryItem, itemKey))
  }
  return result
}

export const getCodeFromArray = (queryItemArr, arrList, queryItem, itemKey) => {
  if (Array.isArray(arrList)) {
    arrList.forEach((item) => {
      if (item[itemKey] === queryItem) {
        queryItemArr.push(item[itemKey])
      } else {
        queryItemArr.push(item[itemKey])
        getCodeFromArray(
          queryItemArr,
          getItemFromArray(item.children, queryItem, itemKey)
            ? [getItemFromArray(item.children, queryItem, itemKey)]
            : [],
          queryItem,
          itemKey
        )
      }
    })
  }
  return queryItemArr
}
