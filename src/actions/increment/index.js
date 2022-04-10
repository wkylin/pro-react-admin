export const actionType = {
  INCREMENT: 'INCREMENT',
}

export const increment = (payload) => ({
  type: actionType.INCREMENT,
  payload,
})
