import * as actions from '../actions/userActions'

export const initialState = {
  user: {},
  loading: false,
  hasErrors: false,
}

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case actions.GET_USERS:
      return { ...state, loading: true }
    case actions.GET_USER_SUCCESS:
      return { user: action?.payload, loading: false, hasErrors: false }
    case actions.GET_USER_FAILURE:
      return { ...state, loading: false, hasErrors: true }
    default:
      return state
  }
}