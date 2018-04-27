import React from 'react'
import Quagga from 'quagga'
import { Link, Redirect, } from 'react-router-dom'

import isbnValidator from './isbn-validator'

class BarcodeReader extends React.Component {
  constructor(props) {
    super(props)
    this.state = { match: null, }
  }

  componentDidMount = () => {
    this.init()
  }

  init = () => {
    Quagga.init(
      {
        inputStream: {
          name: 'Live',
          type: 'LiveStream',
          target: document.querySelector('#target'),
        },
        decoder: {
          readers: [ 'ean_reader', ],
        },
      },
      function(err) {
        if (err) {
          console.log(err) //eslint-disable-line no-console
          return
        }
        console.log('Initialization finished. Ready to start') //eslint-disable-line no-console
        Quagga.start()
      }
    )
    Quagga.onDetected(this.onDetected)
  }

  onDetected = data => {
    const code = data.codeResult.code
    if (isbnValidator(code)) {
      // audio effects or something
      this.setState({ match: code, })
      this.stop()
    }
  }

  stop = () => {
    Quagga.stop()
  }

  componentWillUnmount = () => {
    this.stop()
  }

  render = () =>
    !this.state.match ? (
      <div className="absolute h-50 z-9999 bottom-0 bg-light-green w-100">
        <div id="target">Read me</div>
        <Link to="/">
          <span style={{ position: 'absolute', top: 0, right: 0, }}>Cancel</span>
        </Link>
      </div>
    ) : (
      <Redirect to={`/lookup/${this.state.match}`} />
    )
}

export default BarcodeReader
