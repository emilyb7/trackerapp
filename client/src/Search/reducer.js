import {
  ADD_TO_LIBRARY_START,
  ADD_TO_LIBRARY_ERROR,
  SEARCH_START,
  SEARCH_SUCCESS,
  SEARCH_ERROR,
} from './constants'

const initialState = {
  books: null,
  loading: false,
  searchError: null,
  addToLibraryError: null,
  addToLibraryLoading: false,
}

function searchReducer(state = initialState, { type, payload, }) {
  switch (type) {
    case SEARCH_START:
      return { ...state, loading: true, }
    case SEARCH_SUCCESS:
      return {
        ...state,
        books: payload.results,
        loading: false,
        searchError: null,
      }
    case SEARCH_ERROR:
      return { ...state, books: null, loading: false, error: payload.error, }
    case ADD_TO_LIBRARY_START:
      return { ...state, addToLibraryLoading: true, }
    case ADD_TO_LIBRARY_ERROR:
      return { ...state, addToLibraryError: payload.error, }
    default:
      return state
  }
}

export default searchReducer
