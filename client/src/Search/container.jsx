import { connect, } from 'react-redux'
import Search from './Search'

const mapStateToProps = state => ({ ...state.router.location, })

const mapDispatchToProps = () => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Search)
