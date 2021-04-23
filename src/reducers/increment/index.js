import rootAction from '@/actions'

const initialState = {
  inNumber: 0,
}

const inReducer = (state = initialState, action) => {
  const { payload } = action
  switch (action.type) {
    case rootAction.inAction.actionType.INCREMENT:
      return { ...state, inNumber: state.inNumber + payload }
    case rootAction.deAction.actionType.DECREMENT:
      return { ...state, inNumber: state.inNumber - payload }
    default:
      return state
  }
}

export default inReducer
