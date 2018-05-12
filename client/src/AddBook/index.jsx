import React from 'react'
import { Redirect, } from 'react-router-dom'

import { post, } from '../api'

class AddBook extends React.Component {
  constructor(props) {
    super(props)
    this.state = { fetching: false, success: false, error: false, }
  }

  onClick = () => {
    this.setState({ ...this.state, fetching: true, })
    post('/books/create', { ...this.props.data, })
      .then(this.onSuccess)
      .catch(this.onError)
  }

  onSuccess = () =>
    this.setState({ ...this.state, fetching: false, success: true, })

  onError = () => this.setState({ ...this.state, fetching: false, error: true, })

  render = () => {
    if (this.state.success) return <Redirect to="/" />
    if (this.state.fetching) return <span>fetching data...</span>
    return (
      <a
        onClick={this.onClick}
        className="ba bg-silver bw1 br-pill white no-underline ma2 pa3 ph4"
      >
        Add to library
      </a>
    )
  }
}

export default AddBook
