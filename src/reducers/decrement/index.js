import rootAction from '@src/actions'

const initialState = {
  deNumber: 0,
}

const deReducer = (state = initialState, { type, payload } = {}) => {
  switch (type) {
    case rootAction.inAction.actionType.INCREMENT:
      return { ...state, inNumber: state.inNumber + payload }
    case rootAction.deAction.actionType.DECREMENT:
      return { ...state, deNumber: state.deNumber - payload }
    default:
      return state
  }
}

export default deReducer
