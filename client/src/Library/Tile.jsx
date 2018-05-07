import React from 'react'

const Tile = ({ author, cover, title, }) => {
  return (
    <li className="list pv2">
      <div className="pa2 pb3">
        <img src={cover} alt="" />
        <h3 className="ma2">{title}</h3>
        <span className="ma2">{author}</span>
      </div>
    </li>
  )
}

export default Tile
