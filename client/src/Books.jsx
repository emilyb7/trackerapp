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
      <div className="bg-washed-green gray overflow-scroll vh-80">
        <ul className="h-100">
          {this.state.books &&
            this.state.books.map(book => (
              <li key={book.id} className="list">
                <div className="pa2 pb3">
                  <h3 className="ma2">{book.title}</h3>
                  <span className="ma2">{book.author}</span>
                </div>
              </li>
            ))}
        </ul>
      </div>
    )
  }
}

export default Books
