import React from 'react'
import { Link, } from 'react-router-dom'

const Scan = ({ initialised, }) => (
  <div className="vh-90 overflow-hidden">
    <span id="target" />
    {initialised ? (
      <div>
        <Link to="/">
          <span className="absolute top-0 right-0">Cancel</span>
        </Link>
      </div>
    ) : (
      <div>
        <span>...initialising</span>
      </div>
    )}
  </div>
)

export default Scan
