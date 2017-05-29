import judgementService from 'services/judgement-service'

// ------------------------------------
// Constants
// ------------------------------------
export const UPLOAD_FILE_REQUEST = 'UPLOAD_FILE_REQUEST'
export const UPLOAD_FILE_SUCCESS = 'UPLOAD_FILE_SUCCESS'
export const UPLOAD_FILE_FAILURE = 'UPLOAD_FILE_FAILURE'
export const GET_FILE_REQUEST = 'GET_FILE_REQUEST'
export const GET_FILE_SUCCESS = 'GET_FILE_SUCCESS'
export const GET_FILE_FAILURE = 'GET_FILE_FAILURE'
const CLEAR_JUDGMENT_STATE = 'CLEAR_JUDGEMENT_STATE'

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
        success: false,
        error: message
    }
  }
}

export function success(type, data) {
  return {
    type,
    payload: {
        isFetching: false,
        success: true,
        data
    }
  }
}

export function saveJudgement(jdgmnt) {
  return dispatch => {
    dispatch(request(UPLOAD_FILE_REQUEST));
    return judgementService.save(jdgmnt).then((res) => {
        dispatch(success(UPLOAD_FILE_SUCCESS, res.data));
    }).catch((error) => {
        dispatch(failure(UPLOAD_FILE_FAILURE, error));
    })
  } 
}

export function clearJudgementState() {
    return dispatch => {
      dispatch({
        type: CLEAR_JUDGMENT_STATE,
        payload: { success: false }
      });
    }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [UPLOAD_FILE_REQUEST] : (state, action) => ({ ...state , ...action.payload }),
  [UPLOAD_FILE_SUCCESS] : (state, action) => (
    { ...state,
      list: [...state.list, action.payload.data ],
      isFetching: action.payload.isFetching,
      success: action.payload.success
    }
  ),
  [UPLOAD_FILE_FAILURE] : (state, action) => ({ ...state, ...action.payload }),
  [CLEAR_JUDGMENT_STATE] : (state, action) => ({
      ...state,
      ...action.payload
  })
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  list: [],
  isFetching: false
};

export default function JudgementReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
