import { combineReducers } from 'redux'
import locationReducer from './location'
import loginReducer from './login';
import studentsReducer from './students'
import loadingReducer from './loading'
import filesReducer from './files'
import judgementReducer from './judgement'
import usersReducer from './users' 

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    location: locationReducer,
    auth: loginReducer,
    students: studentsReducer,
    loading: loadingReducer,
    files : filesReducer,
    judgement: judgementReducer,
    user: usersReducer,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return

  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
