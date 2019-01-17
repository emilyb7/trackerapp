import * as API from '../api'

import {
  FETCH_BOOKS_START,
  FETCH_BOOKS_SUCCESS,
  FETCH_BOOKS_ERROR,
} from './constants'

export const fetchBooks = () => dispatch => {
  dispatch({ type: FETCH_BOOKS_START, payload: {}, })
  return API.get('/session?finished=false&expand=BOOK')
    .then(books => dispatch({ type: FETCH_BOOKS_SUCCESS, payload: { books, }, }))
    .catch(fetchError =>
      dispatch({ type: FETCH_BOOKS_ERROR, payload: { error: fetchError, }, })
    )
}
