import React from 'react'
import { connect, } from 'react-redux'
import { push, } from 'connected-react-router'
import Nav from '../Nav'
import NewBookForm from './NewBookForm'

const NewBook = ({ handleSubmit, }) => (
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
      <NewBookForm handleSubmit={handleSubmit} />
    </div>
  </div>
)

const mapDispatchToProps = dispatch => ({
  handleSubmit: isbn => {
    return dispatch(push(`/search?ISBN=${isbn}`))
  },
})

export default connect(null, mapDispatchToProps)(NewBook)
