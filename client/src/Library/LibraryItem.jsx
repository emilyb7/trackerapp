import React from 'react'
import { format, } from 'date-fns'
import Placeholder from './LibraryItemPlaceholder'

class LibraryItem extends React.Component {
  finish = () => {
    const { session, finishSession, } = this.props
    finishSession(session.id)
  }

  render() {
    const { author, cover, id, session, title, } = this.props

    return (
      <article className="bt bb b--black-10">
        <a
          className="link dt w-100 bb b--black-10 pb2 mt2 gray relative"
          href="#0"
          tabIndex={2}
        >
          <div className="dtc w3">
            {cover ? (
              <img src={cover} className="db w-100" alt={title} />
            ) : (
              <Placeholder {...{ title, author, }} />
            )}
          </div>
          <div className="dtc v-top pl2">
            <h1 className="f6 f5-ns fw6 lh-title black mv0">{title}</h1>
            <dl className="mt2 f6">
              <dd className="ma0">{author}</dd>
              {session.started_at && (
                <dd className="ma0">
                  Started: {format(session.started_at, 'Do MMM YYYY')}
                </dd>
              )}
            </dl>
          </div>
          <button
            className="code f7 pointer shadow-5 absolute b--none bg-gray white pa2 right-0 top-50"
            onClick={this.finish}
          >
            Finish reading
          </button>
        </a>
      </article>
    )
  }
}

export default LibraryItem
