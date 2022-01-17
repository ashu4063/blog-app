import { combineReducers } from 'redux'

import userReducer from './userReducer'
import sagaReducer from './sagaReducer'
const rootReducer = combineReducers({
  user: sagaReducer,

})

export default rootReducer