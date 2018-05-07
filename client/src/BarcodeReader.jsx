import React from 'react'
import Quagga from 'quagga'
import { Link, Redirect, } from 'react-router-dom'

import isbnValidator from './isbn-validator'
import Scan from './Scan'

class BarcodeReader extends React.Component {
  constructor(props) {
    super(props)
    this.state = { initialised: false, match: null, }
  }

  componentDidMount = () => {
    this.init()
  }

  onInitSuccess = () => {
    this.setState({ ...this.state, initialised: true, })
    Quagga.start()
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
      err => {
        if (err) {
          console.log(err) //eslint-disable-line no-console
          return
        }
        this.onInitSuccess()
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

  render = () => {
    if (this.state.match) return <Redirect to={`/lookup/${this.state.match}`} />
    return <Scan initialised={this.state.initialised} />
  }
}

export default BarcodeReader
