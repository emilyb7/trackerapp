import {
  FETCH_BOOKS_START,
  FETCH_BOOKS_SUCCESS,
  FETCH_BOOKS_ERROR,
} from './constants'

const initialState = { books: [], loading: false, error: null, }

const libraryReducer = (state = initialState, { type, payload, }) => {
  switch (type) {
    case FETCH_BOOKS_START:
      return { ...state, loading: true, }
    case FETCH_BOOKS_SUCCESS:
      return { ...state, loading: false, error: null, books: payload.books, }
    case FETCH_BOOKS_ERROR:
      return { ...state, loading: false, error: payload.error, }
    default:
      return state
  }
}

export default libraryReducer
