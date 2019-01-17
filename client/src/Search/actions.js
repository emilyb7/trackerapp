import { get, post, } from '../api'
import {
  ADD_TO_LIBRARY_START,
  ADD_TO_LIBRARY_SUCCESS,
  ADD_TO_LIBRARY_ERROR,
  SEARCH_START,
  SEARCH_SUCCESS,
  SEARCH_ERROR,
} from './constants'

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

function addToLibrary(bookDetails) {
  return async dispatch => {
    dispatch({ type: ADD_TO_LIBRARY_START, payload: {}, })
    return post('/session', bookDetails)
      .then(data => {
        dispatch({ type: ADD_TO_LIBRARY_SUCCESS, payload: {}, })
        return data
      })
      .catch(error => {
        dispatch({ type: ADD_TO_LIBRARY_ERROR, payload: { error, }, })
      })
  }
}

export { addToLibrary, }
