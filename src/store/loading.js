// ------------------------------------
// Constants
// ------------------------------------
const LOADING_START = 'LOADING_START'
const LOADING_STOP = 'LOADING_STOP'

export function loadingStart() {
    return {
      type: LOADING_START,
      payload: true
    }
}

export function loadingStop() {
    return {
      type: LOADING_STOP,
      payload: false
    }
}

const actions = {
    LOADING_START,
    LOADING_STOP
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = false;

export default function loadingReducer (state = initialState, action) {
  return actions[action.type] ? action.payload : state;
}
