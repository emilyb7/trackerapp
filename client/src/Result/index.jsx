import React from 'react'
import { Redirect, } from 'react-router-dom'

import { get, } from '../api'
import validateIsbn from '../isbn-validator'

import Panel from './Panel'
import Result from './Result'
import Loading from './Loading'

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
        window.setTimeout(() => {
          this.setState({ ...this.state, fetching: false, })
        }, 80000)
      })
  }

  onSuccess = data => {
    window.setTimeout(() => {
      this.setState({ ...this.state, data, })
    }, 80000)
  }

  render = () => {
    if (this.state.invalid) return <Redirect to="/" />

    const component = this.state.fetching ? (
      <Loading isbn={this.props.match.params.isbn} />
    ) : this.state.notFound ? (
      <p>Not found</p>
    ) : (
      <Result data={this.state.data} />
    )

    return component
  }
}

export default Lookup
