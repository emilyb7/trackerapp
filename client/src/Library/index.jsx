import React from 'react'
import Tile from './Tile'
import AddButton from '../AddButton'

const Library = ({ books, }) => {
  return (
    <div className="bg-near-white  gray  overflow-scroll">
      <ul className="content-start flex flex-wrap justify-start h-100">
        {books && books.map(book => <Tile key={book.id} {...book} />)}
      </ul>
      <AddButton />
    </div>
  )
}

export default Library
