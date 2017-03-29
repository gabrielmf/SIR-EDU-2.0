// ------------------------------------
// Constants
// ------------------------------------
const LOADING_START = 'LOADING_START'
const LOADING_STOP = 'LOADING_STOP'

export function loadingStart() {
    return {
      type: LOADING_START,

    }
}


const ACTION_HANDLERS = {
  [LOADING_START] : () => { console.log('aqui'); return true},
  [LOADING_STOP] : () => false
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = false;

export default function loadingReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler() : state
}
