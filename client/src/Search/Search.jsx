import React from 'react'
import querystring from 'querystring'
import { compose, slice, } from 'ramda'
import Nav from '../Nav'

const Search = ({ search, }) => {
  const query = search
    ? compose(querystring.parse, slice(1, Infinity))(search)
    : {}

  const { ISBN, } = query

  return (
    <div>
      <Nav back={true} text={`Search: (ISBN ${ISBN})`} />
    </div>
  )
}

export default Search
