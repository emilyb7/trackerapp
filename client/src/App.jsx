import React, { Component, } from 'react'
import BarcodeReader from './BarcodeReader'
import Books from './Books'
import Lookup from './Lookup'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { query: null, barcodeReader: false, }
  }

  updateQuery = code => {
    this.setState({ ...this.state, query: code, })
  }

  showBarcodeReader = () => {
    this.setState({ ...this.state, barcodeReader: true, })
  }

  render() {
    return (
      <div className="h-100 relative">
        <header className="bg-light-green gray pa3 tc">
          <h1 className="App-title">Tracker app</h1>
        </header>
        <Books />

        {this.state.barcodeReader && (
          <BarcodeReader updateQuery={this.updateQuery} />
        )}
        <div className="fixed bottom-0 z-999 pa3 bg-light-green w-100 tc">
          <button className="gray" onClick={this.showBarcodeReader}>
            Add book
          </button>
        </div>
        <Lookup query={this.state.query} />
      </div>
    )
  }
}

export default App
