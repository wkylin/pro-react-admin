export const actionType = {
  INCREMENT: 'INCREMENT',
}

export const increment = (payload) => {
  return {
    type: actionType.INCREMENT,
    payload,
  }
}
