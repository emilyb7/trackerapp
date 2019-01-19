import { connect, } from 'react-redux'
import { prop, } from 'ramda'

import * as actions from './actions'
import Library from './Library'

const mapStateToProps = state => ({
  ...prop('library')(state),
})

const mapDispatchToProps = dispatch => ({
  fetchBooks: () => dispatch(actions.fetchBooks()),
  finishSession: id =>
    dispatch(actions.finishSession(id)).then(() =>
      dispatch(actions.fetchBooks())
    ),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Library)
