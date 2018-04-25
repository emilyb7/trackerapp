import React from 'react'
import Quagga from 'quagga'
import { get, } from './api'

class BarcodeReader extends React.Component {
  constructor(props) {
    super(props)
    this.state = { results: [], match: null, }
  }

  componentDidMount = () => {
    this.init()
  }

  componentDidUpdate = (_, prevstate) => {
    if (this.state.match && !prevstate.match) {
      const code = this.state.match
      console.log({ code, })
      get('/lookup?isbn=' + code)
        .then(console.log)
        .catch(console.log)
    }
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
    if (this.state.results.indexOf(code) > -1) {
      this.findMatch(code)
      return
    }
    this.setState({ results: [ ...this.state.results, code, ], })
  }

  findMatch = code => {
    this.setState({ ...this.state, match: code, })
  }
  stop = () => {
    Quagga.stop()
  }

  render = () => (
    <div style={{ position: 'relative', }}>
      <span id="target">Read me</span>
      <span
        onClick={this.stop}
        style={{ position: 'absolute', top: 0, right: 0, }}
      >
        stop
      </span>
    </div>
  )
}

export default BarcodeReader
