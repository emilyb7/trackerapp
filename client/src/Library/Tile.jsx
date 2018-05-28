import React from 'react'

const Tile = ({ author, cover, title, }) => {
  return (
    <li className="list" style={{ maxWidth: '50vw', }}>
      <div className="pa1">
        {cover ? (
          <img src={cover} alt={title} style={{ maxWidth: '48vw', }} />
        ) : (
          <svg
            style={{ maxWidth: '48vw', }}
            height={255}
            width={180}
            fill="red"
            viewBox="0 0 180 255"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect fill="silver" x="0" y="0" width="180" height="255" />
            <text
              className="code tracked"
              x="90"
              y="100"
              fontFamily="monospace"
              fontSize="25"
              fill="gray"
              textAnchor="middle"
            >
              {title}
            </text>
            <text
              className="code tracked"
              x="90"
              y="160"
              fontFamily="monospace"
              fontSize="18"
              fill="gray"
              textAnchor="middle"
            >
              {author}
            </text>
          </svg>
        )}
      </div>
    </li>
  )
}

export default Tile
