import React from 'react'

const Result = ({ data: { title, author, ...rest }, }) => (
  <div className="flex flex-row">
    <div className="flex-auto">
      <h2>{title}</h2>
      <p>{author}</p>
    </div>
    <div className="flex-auto">
      <button className="gray">Add to library</button>
    </div>
  </div>
)

export default Result
