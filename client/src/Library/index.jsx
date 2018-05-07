import React from 'react'
import Tile from './Tile'

const Library = ({ books, }) => {
  return (
    <div className="bg-near-white  gray  overflow-scroll vh-90">
      <ul className="flex flex-wrap justify-start h-100">
        {books && books.map(book => <Tile key={book.id} {...book} />)}
      </ul>
    </div>
  )
}

export default Library
