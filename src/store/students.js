import { BASE_URL } from 'constants/configConstants'
import { CALL_API } from 'redux-api-middleware'
// ------------------------------------
// Constants
// ------------------------------------
export const SAVE_STUDENT_REQUEST = 'SAVE_STUDENT_REQUEST'
export const SAVE_STUDENT_RECEIVE = 'SAVE_STUDENT_RECEIVE'
export const SAVE_STUDENT_FAILURE = 'SAVE_STUDENT_FAILURE'
export const REQUEST_GET_STUDENTS = 'REQUEST_GET_STUDENTS'
// ------------------------------------
// Actions
// ------------------------------------
export function save(student) {
  return {
    type:  SAVE_STUDENT_REQUEST,
    payload: {
        isFetching: true,
        student
    }
  }
}

export function savedStudent(student) {
  return {
    type: SAVE_STUDENT_RECEIVE,
    payload: {
        isFetching: false,
        student
    }
  }
}

export function saveStudentError(message) {
  return {
    type: SAVE_STUDENT_FAILURE,
    payload: {
        isFetching: false,
        message
    }
  }
}

export function saveStudent(student) {
  return {
    [CALL_API]: {
      endpoint: BASE_URL + '/students',
      method: 'POST',
      body: student,
      types: [save(student), savedStudent(student), SAVE_STUDENT_FAILURE]
    }
  };
}

export const actions = {
  SAVE_STUDENT_REQUEST,
  SAVE_STUDENT_RECEIVE,
  SAVE_STUDENT_FAILURE
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SAVE_STUDENT_REQUEST] : (state, action) => { console.log('request', action); return state; },
  [SAVE_STUDENT_RECEIVE] : (state, action) => /**/state,
  [SAVE_STUDENT_FAILURE] : (state, action) => state,
  [REQUEST_GET_STUDENTS] : (state, action) => state
}

// ------------------------------------
// Reducer
// ------------------------------------
export default function studentsReducer (state = {list: []}, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
