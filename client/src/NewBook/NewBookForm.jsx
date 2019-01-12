import React from 'react'
import classnames from 'classnames'
import { equals, compose, last, replace, trim, type, } from 'ramda'
import validate from '../isbn-validator'

const isNumber = compose(equals('Number'), type)

const sanitiseIsbn = compose(replace(/-/g, ''), trim)

const toInt = n => parseInt(n, 10)

class NewBookForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = { isbn: '', }
  }

  onChange = ({ target: { value, }, }) => {
    const lastDigit = compose(last, trim)(value)

    if (
      value === '' ||
      (isNumber(toInt(lastDigit)) && toInt(lastDigit) > -1) ||
      (this.state.isbn !== '' && lastDigit === '-')
    ) {
      this.setState({ isbn: value, })
    }
  }

  handleSubmit = e => {
    e.preventDefault()
    const { isbn, } = this.state
    const { handleSubmit, } = this.props
    return handleSubmit(sanitiseIsbn(isbn))
  }

  render = () => {
    const valid = compose(validate, sanitiseIsbn)(this.state.isbn)

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
              className={classnames(
                'code f6 f5-l button-reset fl pv3 tc bn bg-animate bg-dark-gray hover-bg-black white pointer w-100 w-25-m w-20-l br2-ns br--right-ns ttu',
                { 'o-50': !valid, }
              )}
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
