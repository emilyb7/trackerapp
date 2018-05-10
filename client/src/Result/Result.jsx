import React from 'react'

import AddBook from '../AddBook/index.jsx'

const Result = ({ data: { title, author, ...rest }, }) => (
  <div className="flex flex-row">
    <div className="flex-auto">
      <h2>{title}</h2>
      <p>{author}</p>
    </div>
    <div className="flex-auto">
      <AddBook data={{ title, author, ...rest, }} />
    </div>
  </div>
)

export default Result
