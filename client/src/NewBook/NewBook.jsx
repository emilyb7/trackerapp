import React from 'react'
import Nav from '../Nav'
import NewBookForm from './NewBookForm'

const NewBook = () => (
  <div>
    <Nav text="Add a new book" back={true} />
    <nav className="bb b--light-silver pa3 pa4-ns flex justify-around">
      <a className="link dim black b f6 f5-ns mr3" href="#" title="Home">
        ISBN
      </a>
      <a className="link dim gray f6 f5-ns mr3" href="#" title="Home">
        Scan
      </a>
    </nav>
    <div className="pa4-l">
      <NewBookForm />
    </div>
  </div>
)

export default NewBook
