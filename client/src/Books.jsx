import React from 'react'
import { connect, } from 'react-redux'
import * as API from './api'
import Library from './Library'

class Books extends React.Component {
  constructor(props) {
    super(props)
    this.state = { books: [], }
    // this.fetchBooks = this.fetchBooks.bind(this)
    // this.fetchBooksSuccess = this.fetchBooksSuccess.bind(this)
  }

  componentDidMount() {
    this.fetchBooks()
  }

  fetchBooks = () => {
    API.get('/books').then(this.fetchBooksSuccess)
  }

  fetchBooksSuccess = books => {
    //this.setState({ books, })
    const dataObject = books.reduce(booksArrayToObject, {})
    const index = getIdsIndex(books)
    this.props.addBooks(dataObject, index)

    // hacky (very impure) wait for images to load
    const objects = document.getElementsByClassName('asyncImage')
    Array.from(objects).forEach(item => {
      if (!item.dataset || !item.dataset.src) {
        return
      }
      const img = new Image()
      img.src = item.dataset.src
      img.alt = item.dataset.title
      img.onload = () => {
        item.classList.remove('asyncImage')
        const placeholder = document.getElementById(
          `placeholder_${item.dataset.id}`
        )
        if (placeholder) {
          placeholder.classList.add('dn')
        }
        item.appendChild(img)
      }
    })
  }

  render() {
    return <Library books={this.props.books} index={this.props.index} />
  }
}

const booksArrayToObject = (acc, nextBook) => ({
  ...acc,
  [nextBook.id]: nextBook,
})

const getIdsIndex = books => books.map(book => book.id)

const mapStateToProps = state => ({
  books: state.books,
  index: state.index,
})

const mapDispatchToProps = dispatch => ({
  addBooks: (books, index) => dispatch({ type: 'ADD_BOOKS', books, index, }),
})

export default connect(mapStateToProps, mapDispatchToProps)(Books)
