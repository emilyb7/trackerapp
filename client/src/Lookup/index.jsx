import React from 'react'
import { Redirect, } from 'react-router-dom'

import { get, } from '../api'
import validateIsbn from '../isbn-validator'

import Panel from './Panel'

class Lookup extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      fetching: false,
      data: {},
      invalid: false,
      notFound: false,
      error: null,
    }
  }

  componentDidMount = () => {
    const isbn = this.props.match.params.isbn
    if (!validateIsbn(isbn)) {
      this.setState({ ...this.state, invalid: true, })
    }
    this.setState({ ...this.state, fetching: true, })
    get('/lookup?isbn=' + isbn)
      .then(this.onSuccess)
      .catch(err => {
        return err.response && err.response.status === 404
          ? this.setState({ ...this.state, notFound: true, })
          : this.setState({ ...this.state, error: err, })
      })
      .finally(() => {
        this.setState({ ...this.state, fetching: false, })
      })
  }

  onSuccess = data => {
    this.setState({ ...this.state, data, })
  }

  render = () => {
    if (this.state.invalid) return <Redirect to="/" />

    const component = this.state.fetching ? (
      <p>fetching data</p>
    ) : this.state.notFound ? (
      <p>Not found</p>
    ) : (
      <p>{JSON.stringify(this.state.data)}</p>
    )

    return <Panel>{component}</Panel>
  }
}

export default Lookup
