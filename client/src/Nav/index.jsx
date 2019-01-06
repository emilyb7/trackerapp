import React from 'react'
import { Link, } from 'react-router-dom'

const Nav = ({ back = false, text = '', }) => {
  return (
    <header className="bg-dark-gray w-100 ph3 pv3 pv4-ns ph4-m ph5-l">
      <nav className="f6 fw6 ttu tracked">
        {back && (
          <Link className="link dim white dib mr3" to="/">
            <i className="fa fa-arrow-left white" />
          </Link>
        )}
        <span className="white dib mr3">{text}</span>
      </nav>
    </header>
  )
}

export default Nav
