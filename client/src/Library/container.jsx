import { connect, } from 'react-redux'
import { prop, } from 'ramda'

import * as actions from './actions'
import Library from './Library'

const mapStateToProps = state => ({
  ...prop('library')(state),
})

const mapDispatchToProps = { ...actions, }

export default connect(mapStateToProps, mapDispatchToProps)(Library)
