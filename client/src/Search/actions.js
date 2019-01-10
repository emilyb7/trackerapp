import { get, } from '../api'
import { SEARCH_START, SEARCH_SUCCESS, SEARCH_ERROR, } from './constants'

const buildUrl = ISBN => `/lookup/${ISBN}`

function searchBooks(ISBN) {
  return async dispatch => {
    dispatch({ type: SEARCH_START, payload: {}, })
    await get(buildUrl(ISBN))
      .then(results => dispatch({ type: SEARCH_SUCCESS, payload: { results, }, }))
      .catch(error => dispatch({ type: SEARCH_ERROR, payload: { error, }, }))
  }
}

export { searchBooks, }
