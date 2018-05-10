import React from 'react'
import classnames from 'classnames'

import BarcodeReader from '../BarcodeReader'

class Scan extends React.Component {
  constructor(props) {
    super(props)
    this.state = { started: false, ...this.props.location.state, }
  }

  start = () => {
    window.setTimeout(() => {
      this.setState({ ...this.state, started: true, })
    }, 500)
  }

  cancel = () => {
    this.setState({ started: false, initialised: false, })
  }

  initialise = () => {
    this.setState({ ...this.state, initialised: true, })
  }

  render = () => (
    <div className="flex flex-column items-center">
      {!this.state.started && (
        <div className="lh-copy tc w-75">
          <i className="fas fa-camera-retro f-headline mb5  gray" />
          <p className="mb3">
            With your permission, we'd like to use your device's camera
          </p>
          <a
            onClick={this.start}
            className="ba b--gray bw1 br-pill gray no-underline ma2 pa2"
          >
            Let's go
          </a>
        </div>
      )}
      {this.state.started &&
        !this.state.initialised && (
          <div className="lh-copy tc w-75">
            <i className="ani-rotate fas fa-camera-retro f-headline mb5  gray" />
            <p>When the camera starts up, use it to scan your book's barcode</p>
          </div>
        )}

      {this.state.started && (
        <div className="tc">
          <span
            id="target"
            className={this.state.initialised ? 'o-100' : 'o-025'}
          />
          <a
            onClick={this.cancel}
            className={classnames(
              { dn: !this.state.initialised, },
              'ba b--gray bw1 br-pill gray no-underline ma2 pa2'
            )}
          >
            Cancel
          </a>
        </div>
      )}
      <BarcodeReader
        started={this.state.started}
        initialise={this.initialise}
      />
    </div>
  )
}

export default Scan
