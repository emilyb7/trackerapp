import React from 'react'
import { connect, } from 'react-redux'
import Item from './Library/Item'
import * as API from './api'

class Book extends React.Component {
  componentDidMount = () => {
    if (this.props.book) {
      return
    }
    this.fetchBook()
  }

  fetchBook = () => {
    API.get(`/books/${this.props.id}`).then(this.fetchBooksSuccess)
  }

  fetchBooksSuccess = book => this.props.addBook(book)

  render = () => {
    return this.props.book ? <Item book={this.props.book} /> : null
  }
}

const mapStateToProps = (state, ownprops) => {
  const id = parseInt(ownprops.match.params.id, 10)
  const book = state.books[id]

  return { book, id, }
}

const mapDispatchToProps = dispatch => ({
  addBook: book =>
    dispatch({
      type: 'ADD_BOOKS',
      books: { [book.id]: book, },
      index: [ book.id, ],
    }),
})

export default connect(mapStateToProps, mapDispatchToProps)(Book)
