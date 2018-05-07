import React from 'react'
import * as API from './api'
import Library from './Library'

class Books extends React.Component {
  constructor(props) {
    super(props)
    this.state = { books: [], }
    this.fetchBooks = this.fetchBooks.bind(this)
    this.fetchBooksSuccess = this.fetchBooksSuccess.bind(this)
  }

  componentDidMount() {
    this.fetchBooks()
  }

  fetchBooks() {
    API.get('/books').then(this.fetchBooksSuccess)
  }

  fetchBooksSuccess(books) {
    this.setState({ books, })
  }

  render() {
    return <Library books={this.state.books} />
  }
}

export default Books
