import React from 'react'
import { Link, } from 'react-router-dom'

const Book = ({ book: { title, author, cover, isbn, ...rest }, }) => (
  <div className="pa2">
    <p className="f6 silver ttu tracked">Result for: {isbn}</p>
    <div className="flex flex-column mt4 pl4">
      <img src={cover} alt={`Cover of ${title}`} className="w-content" />
      <h1 className="mt3 f2">{title}</h1>
      <p className="mt2 f4">{author}</p>
    </div>
  </div>
)

export default Book
