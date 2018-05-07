import React from 'react'
import { Link, } from 'react-router-dom'

const AddButton = () => (
  <Link className="fixed" to="/scan" style={{ bottom: '6px', right: '6px', }}>
    <div className="br-100 w3 h3 pointer bg-gray" />
  </Link>
)

export default AddButton
