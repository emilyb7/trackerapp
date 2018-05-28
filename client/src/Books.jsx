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
    return <Library books={this.state.books} />
  }
}

export default Books
