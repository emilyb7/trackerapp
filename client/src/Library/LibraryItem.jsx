import React from 'react'
import Placeholder from './LibraryItemPlaceholder'

const LibraryItem = ({ author, cover, id, title, }) => {
  return (
    <article className="bt bb b--black-10">
      <a className="link dt w-100 bb b--black-10 pb2 mt2 dim blue" href="#0">
        <div className="dtc w3">
          {cover ? (
            <img src={cover} className="db w-100" alt={title} />
          ) : (
            <Placeholder {...{ title, author, }} />
          )}
        </div>
        <div className="dtc v-top pl2">
          <h1 className="f6 f5-ns fw6 lh-title black mv0">{title}</h1>
          <h2 className="f6 fw4 mt2 mb0 black-60">{author}</h2>
          <dl className="mt2 f6">
            <dt>See more</dt>
          </dl>
        </div>
      </a>
    </article>
  )
}

export default LibraryItem
