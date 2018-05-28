import React from 'react'
import Placeholder from './Placeholder'

const Tile = ({ cover, ...rest }) => {
  return (
    <li className="list" style={{ maxWidth: '50vw', }}>
      <div
        className="asyncImage pa1"
        data-src={cover || ''}
        data-id={rest.id}
        data-alt={rest.title}
      >
        <Placeholder {...rest} />
      </div>
    </li>
  )
}

export default Tile
