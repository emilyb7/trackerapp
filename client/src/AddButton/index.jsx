import React from 'react'
import { Link, } from 'react-router-dom'

const AddButton = () => (
  <Link
    className="fixed"
    to="/add/scan"
    style={{ bottom: '6px', right: '6px', }}
    title="Add new book"
  >
    <div className="br-100 flex justify-center items-center h3 pointer bg-gray shadow-5 w3">
      <i className="fas fa-plus f2 white" />
    </div>
  </Link>
)

export default AddButton
