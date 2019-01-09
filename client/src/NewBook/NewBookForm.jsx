import React from 'react'
import { equals, compose, last, type, } from 'ramda'
import validate from '../isbn-validator'

const isNumber = compose(equals('Number'), type)

class NewBookForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = { isbn: '', }
  }

  onChange = ({ target: { value, }, }) => {
    const int = compose(parseInt, last)(value)

    if (value === '' || (isNumber(int) && int > -1)) {
      this.setState({ isbn: value, })
    }
  }

  handleSubmit = e => {
    e.preventDefault()
    const { isbn, } = this.state
    const { handleSubmit, } = this.props
    return handleSubmit(isbn)
  }

  render = () => {
    const valid = validate(this.state.isbn)

    return (
      <form
        className="bg-light-gray mw7 center pa4 br2-ns ba b--black-10"
        onSubmit={this.handleSubmit}
      >
        <fieldset className="cf bn ma0 pa0">
          <legend className="pa0 f5 f4-ns mb3 black-80">Search by ISBN</legend>
          <div className="cf">
            <label className="clip" htmlFor="ISBN">
              ISBN
            </label>
            <input
              className="f6 f5-l input-reset bn fl black-80 bg-white pa3 lh-solid w-100 w-75-m w-80-l br2-ns br--left-ns"
              placeholder="ISBN"
              type="text"
              name="ISBN"
              value={this.state.isbn}
              id="ISBN"
              onChange={this.onChange}
            />
            <input
              className="code f6 f5-l button-reset fl pv3 tc bn bg-animate bg-dark-gray hover-bg-black white pointer w-100 w-25-m w-20-l br2-ns br--right-ns ttu"
              type="submit"
              value="Search"
              disabled={!valid}
            />
          </div>
        </fieldset>
      </form>
    )
  }
}

export default NewBookForm
