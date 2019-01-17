import { connect, } from 'react-redux'
import { path, } from 'ramda'
import { push, } from 'connected-react-router'
import { addToLibrary, searchBooks, } from './actions'
import Search from './Search'

const mapStateToProps = state => ({
  query: path('router')(state),
  ...state.search,
})

const addToLibraryAndRedirect = book => dispatch => {
  console.log('🥢', dispatch)
  console.log('🥨', book)
  return dispatch(addToLibrary(book))
    .then(data => {
      console.log('🥓', data)
      if (data) return dispatch(push('/'))
    })
    .catch(e => {
      throw e
    })
}

const mapDispatchToProps = { addToLibraryAndRedirect, searchBooks, }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search)
