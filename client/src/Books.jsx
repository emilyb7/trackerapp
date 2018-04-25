import React from 'react'
import * as API from './api'

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
    return (
      <ul>
        {this.state.books.map(book => (
          <li key={book.id}>
            <div>
              <h3>{book.title}</h3>
            </div>
          </li>
        ))}
      </ul>
    )
  }
}

export default Books
