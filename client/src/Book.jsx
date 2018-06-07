import React from 'react'
import { connect, } from 'react-redux'
import Item from './Library/Item'

class Book extends React.Component {
  componentDidMount = () => {
    if (this.props.book) {
      return
    }
  }
  render = () => {
    return this.props.book ? <Item book={this.props.book} /> : null
  }
}

const mapStateToProps = (state, ownprops) => {
  const book = state.books[parseInt(ownprops.match.params.id, 10)]

  return { book, }
}

export default connect(mapStateToProps)(Book)
