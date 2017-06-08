import studentService from 'services/student-service'
import router from 'helpers/router-helper';

// ------------------------------------
// Constants
// ------------------------------------
export const SAVE_STUDENT_REQUEST = 'SAVE_STUDENT_REQUEST'
export const SAVE_STUDENT_SUCCESS = 'SAVE_STUDENT_RECEIVE'
export const SAVE_STUDENT_FAILURE = 'SAVE_STUDENT_FAILURE'
export const GET_STUDENTS_LIST_REQUEST = 'GET_STUDENTS_LIST_REQUEST'
export const GET_STUDENTS_LIST_SUCCESS = 'GET_STUDENTS_LIST_SUCCESS'
export const GET_STUDENTS_LIST_FAILURE = 'GET_STUDENTS_LIST_FAILURE'
const FILTER_STUDENTS = 'FILTER_STUDENTS'
const SET_SELECTED_STUDENT = 'SET_SELECTED_STUDENT'
// ------------------------------------
// Actions
// ------------------------------------
export function request(type) {
  return {
    type:  type,
    payload: {
        isFetching: true,
    }
  }
}

export function success(type, student) {
  return {
    type: type,
    payload: {
        isFetching: false,
        student
    }
  }
}

function failure(type, message) {
  return {
    type: type,
    payload: {
        isFetching: false,
    }
  }
}

export function saveStudent(student) {
  return dispatch => {
    dispatch(request(SAVE_STUDENT_REQUEST));
    return studentService.saveStudent(student).then((res) => {
        dispatch(success(SAVE_STUDENT_SUCCESS, res.data));
        router.goToStudentsPage();
    }).catch((error) => {
        dispatch(failure(SAVE_STUDENT_FAILURE));
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
        dispatch(getStudentListRequest())
        return studentService.getStudents().then((res) => {
          dispatch(getStudentListSuccess(res.data));
        })
        .catch((err) => {
          dispatch(failure(GET_STUDENTS_LIST_FAILURE))
        });
    }
}

export function filterStudents(filterText) {
    return {
      type:  FILTER_STUDENTS,
      payload: {
          filterText
      }
    }
}

export function setSelectedStudent(student) {
    return {
      type:  SET_SELECTED_STUDENT,
      payload: {
          student
      }
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
  [SAVE_STUDENT_SUCCESS] : (state, action) => ({ ...state, isFetching: false, list: [...state.list, action.payload.student] }),
  [SAVE_STUDENT_FAILURE] : (state, action) => ({ ...state, ...action.payload }),
  [GET_STUDENTS_LIST_REQUEST] : (state, action) => state,
  [GET_STUDENTS_LIST_SUCCESS] : (state, action) => ({ ...state, ...action.payload }),
  [GET_STUDENTS_LIST_FAILURE] : (state, action) => state,
  [FILTER_STUDENTS] : (state, action) => ({ ...state, ...action.payload }),
  [SET_SELECTED_STUDENT] : (state, action) => ({ ...state, selectedStudent: action.payload.student })
}

const initialState = {
  isFetching: false,
  list: [], 
  filterText: '',
  selectedStudent: {}
}

// ------------------------------------
// Reducer
// ------------------------------------
export default function studentsReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
