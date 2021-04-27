export const actionType = {
  DECREMENT: 'DECREMENT',
}

export const decrement = (payload) => {
  return {
    type: actionType.DECREMENT,
    payload,
  }
}
