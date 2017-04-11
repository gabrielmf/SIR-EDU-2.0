import filesService from 'services/files-service'
import router from 'helpers/router-helper';
import { loadingStart, loadingStop } from './loading'

// ------------------------------------
// Constants
// ------------------------------------
export const UPLOAD_FILE_REQUEST = 'UPLOAD_FILE_REQUEST'
export const UPLOAD_FILE_SUCCESS = 'UPLOAD_FILE_SUCCESS'
export const UPLOAD_FILE_FAILURE = 'UPLOAD_FILE_FAILURE'
export const GET_FILE_REQUEST = 'GET_FILE_REQUEST'
export const GET_FILE_SUCCESS = 'GET_FILE_SUCCESS'
export const GET_FILE_FAILURE = 'GET_FILE_FAILURE'

// ------------------------------------
// Actions
// ------------------------------------
export function uploadRequest() {
  return {
    type:  UPLOAD_FILE_REQUEST,
    payload: {
        isFetching: true,
    }
  }
}

export function uploadFailure(message) {
  return {
    type: UPLOAD_FILE_FAILURE,
    payload: {
        isFetching: false,
        error: message
    }
  }
}

export function uploadSuccess(file) {
  return {
    type: UPLOAD_FILE_SUCCESS,
    payload: {
        isFetching: false,
        file
    }
  }
}

export function uploadFile(file) {
  return dispatch => {
    uploadRequest();
    return filesService.uploadFile(file).then((data) => {
        console.log('file', data);
        uploadSuccess(data);
    }).catch((error) => {
        uploadFailure(err);
    })
  } 
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [UPLOAD_FILE_REQUEST] : (state, action) => state,
  [UPLOAD_FILE_SUCCESS] : (state, action) => state,
  [UPLOAD_FILE_FAILURE] : (state, action) => state
}

// ------------------------------------
// Reducer
// ------------------------------------
export default function filesReducer (state = { file: {} }, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
