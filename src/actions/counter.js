import { INCREMENT } from './constant/counter'

export const increment = (payload) => {
  return {
    type: INCREMENT,
    payload,
  }
}
