import { CALL_API } from 'redux-api-middleware'

export default function() {
  return function(next) {
    return function(action) {
      const callApi = action[CALL_API]

      // Check if this action is a redux-api-middleware action.
      if (callApi) {
        // Inject the Authorization header from localStorage.
        // callApi.headers = Object.assign({}, callApi.headers, {
        //   Authorization: localStorage.get('id_token') || '',
        // })
        console.log('TODO insert token')
      }

      // Pass the FSA to the next action.
      return next(action)
    }
  }
}