import React from 'react'

import AddBook from '../AddBook/index.jsx'

const Result = ({ data: { title, author, cover, isbn, ...rest }, }) => (
  <div className="flex flex-column gray">
    <div className="flex-auto pa2">
      <p className="f6 silver ttu tracked">Result for: {isbn}</p>
      <div className="flex flex-column mt4 pl4">
        <img src={cover} alt={`Cover of ${title}`} className="w-content" />
        <h1 className="mt3 f2">{title}</h1>
        <p className="mt2 f4">{author}</p>
      </div>
    </div>
    <div className="flex-auto mt4 pa2">
      <AddBook data={{ title, author, ...rest, }} />
    </div>
  </div>
)

export default Result
