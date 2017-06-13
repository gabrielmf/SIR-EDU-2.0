import filesService from 'services/files-service'

// ------------------------------------
// Constants
// ------------------------------------
export const UPLOAD_FILE_REQUEST = 'UPLOAD_FILE_REQUEST'
export const UPLOAD_FILE_SUCCESS = 'UPLOAD_FILE_SUCCESS'
export const UPLOAD_FILE_FAILURE = 'UPLOAD_FILE_FAILURE'
export const GET_FILES_REQUEST = 'GET_FILES_REQUEST'
export const GET_FILES_SUCCESS = 'GET_FILES_SUCCESS'
export const GET_FILES_FAILURE = 'GET_FILES_FAILURE'

// ------------------------------------
// Actions
// ------------------------------------
export function request(type) {
  return {
    type,
    payload: {
        isFetching: true,
    }
  }
}

export function failure(type, message) {
  return {
    type,
    payload: {
        isFetching: false,
        error: message
    }
  }
}

export function success(type, data) {
  return {
    type,
    payload: {
        isFetching: false,
        data
    }
  }
}

export function uploadFile(file) {
  return dispatch => {
      dispatch(request(UPLOAD_FILE_REQUEST));
    return filesService.uploadFile(file)
      .then((res) => {
        dispatch(success(UPLOAD_FILE_SUCCESS, res.data));
    }).catch((error) => {
        dispatch(failure(UPLOAD_FILE_FAILURE, error));
    })
  } 
}

export function getFiles(studentId) {
  return dispatch => {
      dispatch(request(GET_FILES_REQUEST));
    return filesService.getAll(studentId)
      .then((res) => {
        dispatch(success(GET_FILES_SUCCESS, res.data));
    }).catch((error) => {
        dispatch(failure(GET_FILES_FAILURE, error));
    })
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [UPLOAD_FILE_SUCCESS] : (state, action) => ({ 
      isFetching: action.payload.isFetching, 
      list: [ action.payload.data, ...state.list ]
  }),
  [GET_FILES_SUCCESS] : (state, action) => ({ 
      isFetching: action.payload.isFetching, 
      list: [ ...action.payload.data ]
  })
}

// ------------------------------------
// Reducer
// ------------------------------------
export default function filesReducer (state ={ list: [], isFetching: false }, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
