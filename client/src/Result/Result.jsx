import React from 'react'
import { Link, } from 'react-router-dom'

import AddBook from '../AddBook/index.jsx'

const Result = ({ data: { title, author, cover, isbn, ...rest }, }) => (
  <div className="bg-light-gray h-fill flex flex-column gray">
    <div className="pa2">
      <p className="f6 silver ttu tracked">Result for: {isbn}</p>
      <div className="flex flex-column mt4 pl4">
        <img src={cover} alt={`Cover of ${title}`} className="w-content" />
        <h1 className="mt3 f2">{title}</h1>
        <p className="mt2 f4">{author}</p>
      </div>
    </div>
    <div className="mt2 pa2">
      <AddBook data={{ title, author, cover, isbn, ...rest, }} />
      <div className="ba bw1 b--silver br-pill ma2 pa3 ph4 tc">
        <Link to="/add/scan" className="br-pill silver no-underline ">
          Search again
        </Link>
      </div>
    </div>
  </div>
)

export default Result
