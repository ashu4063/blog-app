import * as actions from '../saga'

export const initialState = {
  user: {},
  loading: false,
  hasErrors: false,
}

export default function sagaReducer(state = initialState, action) {
  console.log(action.type)
  switch (action.type) {
    case actions.GET_USER_SUCCESS:
      return { user: action.payload, loaded: true, hasErrors: false }

    default:
      return state
  }
}