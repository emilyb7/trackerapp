import React from 'react'
import { isEmpty, map, } from 'ramda'
import LibraryItem from './LibraryItem'

import Banner from '../lib/Banner'

class Library extends React.Component {
  componentDidMount() {
    const { fetchBooks, } = this.props
    fetchBooks()
  }

  render = () => {
    const { books, loading, error, } = this.props
    if (loading) return <p>loading</p>
    if (error)
      return (
        <Banner
          content={
            <span className="lh-title ml3">
              Something went a bit wrong while loading the library
            </span>
          }
        />
      )
    if (!error && !loading && isEmpty(books))
      return (
        <p>
          This will look better once you've added some books to your library
        </p>
      )
    return (
      <div>
        <ul className="mw6 center">
          {map(book => (
            <li key={book.id} className="list">
              <LibraryItem {...book} />
            </li>
          ))(books)}
        </ul>
        <a
          className="fixed"
          to="/add/scan"
          style={{ bottom: '12px', right: '12px', }}
          title="Add new book"
        >
          <div className="br-100 flex justify-center items-center h3 pointer bg-gray shadow-5 w3">
            <i className="fas fa-plus f3 white" />
          </div>
        </a>
      </div>
    )
  }
}
export default Library
