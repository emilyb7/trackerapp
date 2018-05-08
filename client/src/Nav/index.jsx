import React from 'react'
import { withRouter, } from 'react-router-dom'

const titleMap = {
  defaultTitle: 'my library',
  add: 'add new book',
  scan: 'scan',
}

const getTitle = ({ pathname, }) =>
  titleMap[pathname.split('/')[1]] || titleMap.defaultTitle

const Nav = ({ location, }) => {
  return (
    <nav className="bg-dark-gray silver pa3 tracked ttu">
      <h3 className="App-title pointer">{getTitle(location)}</h3>
    </nav>
  )
}

export default withRouter(Nav)
