import { connect, } from 'react-redux'
import { path, } from 'ramda'
import { push, } from 'connected-react-router'
import { addToLibrary, searchBooks, } from './actions'
import Search from './Search'

const mapStateToProps = state => ({
  query: path('router')(state),
  ...state.search,
})

const addToLibraryAndRedirect = book => dispatch =>
  dispatch(addToLibrary(book))
    .then(() => dispatch(push('/')))
    .catch(e => {
      throw e
    })

const mapDispatchToProps = { addToLibraryAndRedirect, searchBooks, }

export default connect(mapStateToProps, mapDispatchToProps)(Search)
