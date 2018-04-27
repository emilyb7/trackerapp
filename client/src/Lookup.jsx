import React from 'react'
import { Redirect, } from 'react-router-dom'

import { get, } from './api'
import validateIsbn from './isbn-validator'

class Lookup extends React.Component {
  constructor(props) {
    super(props)
    this.state = { data: {}, invalid: false, }
  }

  componentDidMount = () => {
    const isbn = this.props.match.params.isbn
    if (!validateIsbn(isbn)) {
      this.setState({ ...this.state, invalid: true, })
    }
    get('/lookup?isbn=' + isbn)
      .then(this.onSuccess)
      .catch(console.log)
  }

  onSuccess = data => {
    this.setState({ ...this.state, data, })
  }

  render = () => {
    if (this.state.invalid) return <Redirect to="/" />
    return this.state.data ? (
      <div className="fixed bottom-0 z-999 pa3 bg-light-green w-100 tc">
        <p>{JSON.stringify(this.state.data)}</p>
      </div>
    ) : null
  }
}

export default Lookup
