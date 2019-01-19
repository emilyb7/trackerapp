import * as API from '../api'

import {
  FETCH_BOOKS_START,
  FETCH_BOOKS_SUCCESS,
  FETCH_BOOKS_ERROR,
  FINISH_SESSION_START,
  FINISH_SESSION_SUCCESS,
  FINISH_SESSION_ERROR,
} from './constants'

export const fetchBooks = () => dispatch => {
  dispatch({ type: FETCH_BOOKS_START, payload: {}, })
  return API.get('/session?finished=false&expand=BOOK')
    .then(books => dispatch({ type: FETCH_BOOKS_SUCCESS, payload: { books, }, }))
    .catch(fetchError =>
      dispatch({ type: FETCH_BOOKS_ERROR, payload: { error: fetchError, }, })
    )
}

export const finishSession = sessionId => dispatch => {
  dispatch({ type: FINISH_SESSION_START, payload: {}, })
  return API.put(`/session/${sessionId}/finish`)
    .then(() => dispatch({ type: FINISH_SESSION_SUCCESS, payload: {}, }))
    .catch(finishSessionError =>
      dispatch({
        type: FINISH_SESSION_ERROR,
        payload: { error: finishSessionError, },
      })
    )
}
