import React, { Component, } from 'react'
import './App.css'
import BarcodeReader from './BarcodeReader'
import Books from './Books'
import Lookup from './Lookup'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { query: null, }
  }

  updateQuery = code => {
    this.setState({ ...this.state, query: code, })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Books />

        <BarcodeReader updateQuery={this.updateQuery} />
        <Lookup query={this.state.query} />
      </div>
    )
  }
}

export default App
