import React from 'react'
import classnames from 'classnames'
import { Route, Switch, } from 'react-router-dom'

import Scan from '../Scan'

const LookupPage = ({ selected = 'scan', }) => {
  const defaultNavItemStyle = 'bl bw2 b--gray f4 flex-auto gray pa2 pointer ttu'
  return (
    <div>
      <nav className="mt1">
        <ul className="flex list">
          <li
            className={classnames(defaultNavItemStyle, {
              'bg-light-gray': selected !== 'scan',
            })}
          >
            scan
          </li>
          <li
            className={classnames(defaultNavItemStyle, {
              'bg-light-gray': selected !== 'isbn',
            })}
          >
            isbn
          </li>
        </ul>
      </nav>
      <div className="h-fill pt6">
        <Switch>
          <Route path="/add/scan" component={Scan} />
        </Switch>
      </div>
    </div>
  )
}

export default LookupPage
