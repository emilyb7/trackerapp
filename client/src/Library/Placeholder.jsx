import React from 'react'

const Placeholder = ({ title, author, id, }) => (
  <svg
    id={`placeholder_${id}`}
    className="bg-moon-gray h-100"
    style={{ maxWidth: '48vw', }}
    height={255}
    width={180}
    fill="silver"
    viewBox="0 0 180 255"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect fill="silver" x="0" y="0" width="180" />
    <foreignObject width={180} height={255} className="tc" y="75">
      <p
        xmlns="http://www.w3.org/1999/xhtml"
        className="code tracked tc f3 gray"
      >
        {title}
      </p>
      <p
        xmlns="http://www.w3.org/1999/xhtml"
        className="code tracked tc f5 gray"
      >
        {author}
      </p>
    </foreignObject>
  </svg>
)

export default Placeholder
