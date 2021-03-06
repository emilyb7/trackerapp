import React from 'react'
import { Link, withRouter, } from 'react-router-dom'

import AddBook from '../AddBook/index.jsx'
import Book from '../Book'

const Result = ({ data, }) => {
  const BookWithRouter = withRouter(Book)
  return (
    <div className="bg-light-gray h-fill flex flex-column gray">
      <BookWithRouter data={data} />
      <div className="mt2 pa2">
        <AddBook data={data} />
        <div className="ba bw1 b--silver br-pill ma2 pa3 ph4 tc">
          <Link to="/add/scan" className="br-pill silver no-underline ">
            Search again
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Result
