import studentService from 'services/student-service'
import router from 'helpers/router-helper';
import { loadingStart, loadingStop } from './loading'

// ------------------------------------
// Constants
// ------------------------------------
export const SAVE_STUDENT_REQUEST = 'SAVE_STUDENT_REQUEST'
export const SAVE_STUDENT_SUCCESS = 'SAVE_STUDENT_RECEIVE'
export const SAVE_STUDENT_FAILURE = 'SAVE_STUDENT_FAILURE'
export const GET_STUDENTS_LIST_REQUEST = 'GET_STUDENTS_LIST_REQUEST'
export const GET_STUDENTS_LIST_SUCCESS = 'GET_STUDENTS_LIST_SUCCESS'
export const GET_STUDENTS_LIST_FAILURE = 'GET_STUDENTS_LIST_FAILURE'
// ------------------------------------
// Actions
// ------------------------------------
export function save(student) {
  return {
    type:  SAVE_STUDENT_REQUEST,
    payload: {
        isFetching: true,
    }
  }
}

// export function savedStudent() {
//   return {
//     type: SAVE_STUDENT_RECEIVE,
//     payload: (action, state) => ({ ...action.payload, isFetching: false })
//   }
// }

export function saveStudentError(message) {
  return {
    type: SAVE_STUDENT_FAILURE,
    payload: {
        isFetching: false,
        error: message
    }
  }
}

export function saveStudent(student) {
  return dispatch => {
    return studentService.saveStudent(student).then((data) => {
        console.log('salvando aluno', data)
        router.goToStudentsPage();
    }).catch((error) => {
        console.log('errrrro miseravi')
    })
  } 
}

export function getStudentListRequest() {
  return {
    type:  GET_STUDENTS_LIST_REQUEST,
    payload: {
        isFetching: true,
    }
  }
}

export function getStudentListSuccess(list) {
  return {
    type:  GET_STUDENTS_LIST_SUCCESS,
    payload: {
        isFetching: false,
        list
    }
  }
}

export function getStudentsList() {
    return dispatch => {
        dispatch(loadingStart());
        dispatch(getStudentListRequest())
        return studentService.getStudents().then((res) => {
          dispatch(loadingStop());
          console.log('get', res.data);
          dispatch(getStudentListSuccess(res.data));
        })
        .catch(() => {
          dispatch(loadingStop());
          console.log('erroooooo')
        });
    }
}

export const actions = {
  SAVE_STUDENT_REQUEST,
  SAVE_STUDENT_SUCCESS,
  SAVE_STUDENT_FAILURE
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SAVE_STUDENT_REQUEST] : (state, action) => ({ ...state, ...action.payload }),
  [SAVE_STUDENT_SUCCESS] : (state, action) => ({ ...state, isFetching: false, list: [...state.list, action.payload] }),
  [SAVE_STUDENT_FAILURE] : (state, action) => state,
  [GET_STUDENTS_LIST_REQUEST] : (state, action) => state,
  [GET_STUDENTS_LIST_SUCCESS] : (state, action) => ({ ...action.payload }),
  [GET_STUDENTS_LIST_FAILURE] : (state, action) => state
}

// ------------------------------------
// Reducer
// ------------------------------------
export default function studentsReducer (state = {list: []}, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
