import React from 'react'
import Tile from './Tile'
import AddButton from '../AddButton'

const Library = ({ books, index, }) => {
  return (
    <div className="bg-near-white gray overflow-scroll">
      <ul className="content-start flex flex-wrap justify-around">
        {index.length &&
          index.map(bookId => <Tile key={bookId} {...books[bookId]} />)}
      </ul>
      <AddButton />
    </div>
  )
}

export default Library
