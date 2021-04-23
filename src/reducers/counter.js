import { INCREMENT } from '@/actions/constant/counter'

const initialState = {
  number: 0,
}

const reducer = (state = initialState, action) => {
  const { payload } = action
  switch (action.type) {
    case INCREMENT:
      return { ...state, number: state.number + payload }
    default:
      return state
  }
}

export default reducer
