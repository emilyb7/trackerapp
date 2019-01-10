import { SEARCH_START, SEARCH_SUCCESS, SEARCH_ERROR, } from './constants'

const initialState = {
  books: null,
  loading: false,
  error: null,
}

function searchReducer(state = initialState, { type, payload, }) {
  switch (type) {
    case SEARCH_START:
      return { ...state, loading: true, }
    case SEARCH_SUCCESS:
      return { ...state, books: payload.results, loading: false, error: null, }
    case SEARCH_ERROR:
      return { ...state, books: null, error: payload.error, }
    default:
      return state
  }
}

export default searchReducer
