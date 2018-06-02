const defaultState = { books: [], index: [], }

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'ADD_BOOKS':
      return { ...state, books: action.books, index: action.index, }
    default:
      return state
  }
}

export default reducer
