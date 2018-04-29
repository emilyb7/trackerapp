import React from 'react'
import { Link, } from 'react-router-dom'

const AddButton = () => (
  <div className="fixed bottom-0 vh-10 pa3 bg-light-green w-100 tc">
    <Link to="/scan">
      <button className="pointer gray">Scan new book</button>
    </Link>
  </div>
)

export default AddButton
