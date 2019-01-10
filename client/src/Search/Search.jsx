import React from 'react'
import querystring from 'querystring'
import { compose, prop, slice, } from 'ramda'
import { Redirect, } from 'react-router-dom'
import validate from '../isbn-validator'
import Nav from '../Nav'

const isbnFromProps = compose(
  prop('ISBN'),
  querystring.parse,
  slice(1, Infinity),
  prop('search'),
  prop('location')
)

class Search extends React.Component {
  componentDidMount() {
    const ISBN = isbnFromProps(this.props)
    if (!ISBN || !validate(ISBN)) return

    this.searchBooks(ISBN)
  }

  searchBooks = ISBN => {
    const { searchBooks, } = this.props

    searchBooks(ISBN)
  }

  render = () => {
    const ISBN = isbnFromProps(this.props)

    if (!ISBN || !validate(ISBN)) {
      return <Redirect to="/new" />
    }

    const { books: book, error, loading, } = this.props

    return (
      <div>
        <Nav back={true} text={`Search: (ISBN ${ISBN})`} />
        {loading && <p>loading</p>}
        {!loading && error && <p>error</p>}
        {!loading &&
          book && (
            <div>
              <p className="pv3">
                Success! We found a book matching your search
              </p>
              <article className="bt bb b--black-10">
                <a
                  className="link dt w-100 bb b--black-10 pb2 mt2 dim blue"
                  href="#0"
                >
                  <div className="dtc w3">
                    <img
                      src={book.cover}
                      className="db w-100"
                      alt={book.title}
                    />
                  </div>
                  <div className="dtc v-top pl2">
                    <h1 className="f6 f5-ns fw6 lh-title black mv0">
                      {book.title}
                    </h1>
                    <h2 className="f6 fw4 mt2 mb0 black-60">{book.author}</h2>
                    <dl className="mt2 f6">
                      <dt>Add to my library</dt>
                    </dl>
                  </div>
                </a>
              </article>
            </div>
          )}
      </div>
    )
  }
}

export default Search
