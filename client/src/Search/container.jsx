import { connect, } from 'react-redux'
import { path, } from 'ramda'

import { searchBooks, } from './actions'
import Search from './Search'

const mapStateToProps = state => ({
  query: path('router')(state),
  ...state.search,
})

const mapDispatchToProps = { searchBooks, }

export default connect(mapStateToProps, mapDispatchToProps)(Search)
