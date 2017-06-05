import judgementService from 'services/judgement-service'

// ------------------------------------
// Constants
// ------------------------------------
export const UPLOAD_JUDGEMENT_REQUEST = 'UPLOAD_JUDGEMENT_REQUEST'
export const UPLOAD_JUDGEMENT_SUCCESS = 'UPLOAD_JUDGEMENT_SUCCESS'
export const UPLOAD_JUDGEMENT_FAILURE = 'UPLOAD_JUDGEMENT_FAILURE'
export const GET_ALL_JUDGEMENTS_REQUEST = 'GET_ALL_JUDGEMENTS_REQUEST'
export const GET_ALL_JUDGEMENTS_SUCCESS = 'GET_ALL_JUDGEMENTS_SUCCESS'
export const GET_ALL_JUDGEMENTS_FAILURE = 'GET_ALL_JUDGEMENTS_FAILURE'
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
      dispatch(request(UPLOAD_JUDGEMENT_REQUEST));
    return judgementService.save(jdgmnt).then((res) => {
        dispatch(success(UPLOAD_JUDGEMENT_SUCCESS, res.data));
    }).catch((error) => {
        dispatch(failure(UPLOAD_JUDGEMENT_FAILURE, error));
    })
  } 
}

export function getJudgements(studentId) {
    return dispatch => {
      dispatch(request(GET_ALL_JUDGEMENTS_REQUEST));
    return judgementService.getAll(studentId).then((res) => {
        dispatch(success(GET_ALL_JUDGEMENTS_SUCCESS, res.data));
    }).catch((error) => {
        dispatch(failure(GET_ALL_JUDGEMENTS_FAILURE, error));
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
  [UPLOAD_JUDGEMENT_REQUEST] : (state, action) => ({ ...state , ...action.payload }),
  [UPLOAD_JUDGEMENT_SUCCESS] : (state, action) => (
    { ...state,
      list: [...state.list, action.payload.data ],
      isFetching: action.payload.isFetching,
      success: action.payload.success
    }
  ),
  [UPLOAD_JUDGEMENT_FAILURE] : (state, action) => ({ ...state, ...action.payload }),
  [CLEAR_JUDGMENT_STATE] : (state, action) => ({
      ...state,
      ...action.payload
  }),
  [GET_ALL_JUDGEMENTS_SUCCESS] : (state, action) => ({
    isFetching: action.payload.isFetching,
    list: [ ...action.payload.data ]
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
