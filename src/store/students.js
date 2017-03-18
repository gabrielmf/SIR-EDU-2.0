import studentHelper from 'helpers/student-helper'
console.log(studentHelper)
// ------------------------------------
// Constants
// ------------------------------------
export const SAVE_STUDENT = 'SAVE_STUDENT'
export const SAVE_STUDENT_SUCCESS = 'SAVE_STUDENT_SUCCESS'
export const SAVE_STUDENT_FAILURE = 'SAVE_STUDENT_FAILURE'
export const REQUEST_GET_STUDENTS = 'REQUEST_GET_STUDENTS'
// ------------------------------------
// Actions
// ------------------------------------
export function save(student) {
  return {
    type: SAVE_STUDENT,
    payload: {
        isFetching: true,
        student
    }
  }
}

export function savedStudent(student) {
  return {
    type: SAVE_STUDENT_SUCCESS,
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
  //TODO Resolver: passando creds=null o servidor retorna success
  return dispatch => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(save(student))

    return studentHelper('GET', student).then((res) => {
        dispatch(savedStudent(res));
    })
    .catch(() => {
      dispatch(saveStudentError('Erro ao salvar estudante'));
    });
  }
}

export const actions = {
  SAVE_STUDENT,
  SAVE_STUDENT_SUCCESS,
  SAVE_STUDENT_FAILURE
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SAVE_STUDENT] : (state, action) => state,
  [SAVE_STUDENT_SUCCESS] : (state, action) => {list: [...state.list, action.payload.student]},
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
