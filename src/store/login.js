import loginUser from 'helpers/auth-helper'
import router from 'helpers/router-helper'
import { browserHistory } from 'react-router'

// ------------------------------------
// Constants
// ------------------------------------
export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const USER_LOGOUT = 'USER_LOGOUT'

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

export function receiveLogin(data) {
  console.log(data)
  return {
    type: LOGIN_SUCCESS,
    payload: {
        isFetching: false,
        isAuthenticated: true,
        token: data.token,
        user: data.user
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

function logoutRequest() {
    return {
      type: USER_LOGOUT,
      payload: {
          isFetching: false,
          isAuthenticated: false,
          token: '',
          user: {}
      }
    }
}

export function login(creds) {
  //TODO Resolver: passando creds=null o servidor retorna success
  return dispatch => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestLogin(creds))
    return loginUser(creds).then((res) => {
        dispatch(receiveLogin(res.data));
        localStorage.setItem('authToken', res.data.token);
        router.goToStudentsPage();
    })
    .catch((err) => {
      console.log(err)
      dispatch(loginError('Error'));
    });
  }
}

export function logout() {
    localStorage.removeItem('authToken');
    browserHistory.push('/');
    return dispatch => {
      dispatch(logoutRequest());
    };
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
  [LOGIN_REQUEST] : (state, action) => ({...action.payload}),
  [LOGIN_SUCCESS] : (state, action) => ({...action.payload}),
  [LOGIN_FAILURE] : (state, action) => ({...action.payload}),
  [USER_LOGOUT] : (state, action) => ({...action.payload})
}

// ------------------------------------
// Reducer
// ------------------------------------
export default function loginReducer (state = {}, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
