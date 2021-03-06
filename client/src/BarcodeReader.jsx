import React from 'react'
import Quagga from 'quagga'
import { Redirect, } from 'react-router-dom'

import isbnValidator from './isbn-validator'

class BarcodeReader extends React.Component {
  constructor(props) {
    super(props)
    this.state = { match: null, }
  }

  componentDidMount = () => {
    if (this.props.started) return this.init()
  }

  componentDidUpdate = prevProps => {
    if (this.props.started && !prevProps.started) {
      window.setTimeout(() => {
        this.init()
      }, 2000)
    }

    if (!this.props.started && prevProps.started) {
      this.stop()
    }
  }

  onInitSuccess = () => {
    this.props.initialise()
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
    if (this.props.started) Quagga.stop()
  }

  componentWillUnmount = () => {
    this.stop()
  }

  render = () => {
    if (!this.props.started) return null
    if (this.state.match) return <Redirect to={`/result/${this.state.match}`} />
    return null
  }
}

export default BarcodeReader
