import React from 'react'
import { get, } from './api'

class Lookup extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidUpdate = prevprops => {
    if (this.props.query && !prevprops.query) {
      console.log(this.props.query)
      get('/lookup?isbn=' + this.props.query)
        .then(console.log)
        .catch(console.log)
    }
  }

  render = () => <span />
}

export default Lookup
