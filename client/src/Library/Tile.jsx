import React from 'react'
import { Link, } from 'react-router-dom'
import Placeholder from './Placeholder'

const Tile = ({ cover, ...rest }) => {
  return (
    <li className="list" style={{ maxWidth: '50vw', }}>
      <Link to={`/library/${rest.id}`}>
        <div
          className="asyncImage pa1"
          data-src={cover || ''}
          data-id={rest.id}
          data-alt={rest.title}
        >
          <Placeholder {...rest} />
        </div>
      </Link>
    </li>
  )
}

export default Tile
