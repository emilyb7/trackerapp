import React, { Component, } from 'react'
import './App.css'
import BarcodeReader from './BarcodeReader'
import Books from './Books'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Books/>

        <BarcodeReader />
      </div>
    )
  }
}

export default App
