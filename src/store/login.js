import loginUser from 'helpers/auth-helper'
import router from 'helpers/router-helper'

// ------------------------------------
// Constants
// ------------------------------------
export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

// ------------------------------------
// Actions
// ------------------------------------
export function requestLogin() {
  return {
    type: LOGIN_REQUEST,
    payload: {
        isFetching: true,
        isAuthenticated: false 
    }
  }
}

export function receiveLogin(user) {
  return {
    type: LOGIN_SUCCESS,
    payload: {
        isFetching: false,
        isAuthenticated: true,
        token: user.token
    }
  }
}

export function loginError(errorMessage) {
  return {
    type: LOGIN_FAILURE,
    payload: {
        isFetching: false,
        isAuthenticated: false,
        errorMessage
    }
  }
}

export function login(creds) {
  //TODO Resolver: passando creds=null o servidor retorna success
  return dispatch => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestLogin(creds))
    return loginUser(creds).then((res) => {
        console.log(res)
        dispatch(receiveLogin(res));
        router.goToStudentsPage();
    })
    .catch((err) => {
      console.log(err)
      dispatch(loginError('Error'));
    });
  }
}

export const actions = {
  requestLogin,
  receiveLogin,
  loginError
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [LOGIN_REQUEST] : (state, action) => ({...state, ...action.payload}),
  [LOGIN_SUCCESS] : (state, action) => ({...state, ...action.payload}),
  [LOGIN_FAILURE] : (state, action) => ({...state, ...action.payload})
}

// ------------------------------------
// Reducer
// ------------------------------------
export default function loginReducer (state = {}, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
