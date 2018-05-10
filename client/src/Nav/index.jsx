import React from 'react'
import { Link, withRouter, } from 'react-router-dom'

const navMap = {
  defaults: { header: 'my library', back: false, backTo: '/', },
  add: { header: 'add new book', back: true, backTo: '/', },
  result: {
    header: 'result',
    back: true,
    backTo: { pathname: '/add/scan', state: { started: true, }, },
  },
  scan: { header: 'scan', },
}

const Nav = ({ location, }) => {
  const navSettings = navMap[location.pathname.split('/')[1]] || navMap.defaults
  const navHeader = navSettings.header

  return (
    <nav className="bg-dark-gray silver pa3 tracked ttu">
      <h3 className="App-title pointer">
        {navSettings.back && (
          <Link to={navSettings.backTo || navMap.defaults.backTo}>
            <i className="fas fa-arrow-left ph3 pointer silver" />
          </Link>
        )}
        {navHeader}
      </h3>
    </nav>
  )
}

export default withRouter(Nav)
