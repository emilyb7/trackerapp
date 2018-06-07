import React from 'react'
import Book from '../Book/index.jsx'

const Item = ({ book, }) => {
  return (
    <div className="bg-light-gray h-fill flex flex-column gray">
      <Book book={book} />
    </div>
  )
}

export default Item
