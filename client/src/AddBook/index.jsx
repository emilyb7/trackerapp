import React from 'react'

import { post, } from '../api'

class AddBook extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  onClick = () => {
    post('/books/create', { ...this.props.data, })
      .then(this.onSuccess)
      .catch(e => console.log(e.message))
  }

  onSuccess = () => console.log('Success!')

  onError = () => console.log('Error!!')

  render = () => (
    <button className="gray" onClick={this.onClick}>
      Add to library
    </button>
  )
}

export default AddBook
