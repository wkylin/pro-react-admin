import rootAction from '@src/actions'

const initialState = {
  deNumber: 0,
}

const deReducer = (state = initialState, action) => {
  const { payload } = action
  switch (action.type) {
    case rootAction.deAction.actionType.DECREMENT:
      return { ...state, deNumber: state.deNumber - payload }
    default:
      return state
  }
}

export default deReducer
