export const actionType = {
  DECREMENT: 'DECREMENT',
}

export const decrement = (payload) => ({
  type: actionType.DECREMENT,
  payload,
})
