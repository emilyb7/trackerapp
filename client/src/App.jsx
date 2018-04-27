import React, { Component, } from 'react'
import { BrowserRouter, Route, Switch, } from 'react-router-dom'
import BarcodeReader from './BarcodeReader'
import Books from './Books'
import Lookup from './Lookup'
import AddButton from './AddButton'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { query: null, }
  }

  updateQuery = code => {
    this.setState({ ...this.state, query: code, })
  }

  render() {
    const BarcodeReaderWrapped = () => (
      <BarcodeReader updateQuery={this.updateQuery} />
    )

    return (
      <div className="h-100 relative">
        <header className="bg-light-green gray pa3 tc">
          <h1 className="App-title">Tracker app</h1>
        </header>
        <Books />

        {this.state.barcodeReader && (
          <BarcodeReader updateQuery={this.updateQuery} />
        )}
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={AddButton} />
            <Route path="/scan" component={BarcodeReaderWrapped} />
          </Switch>
        </BrowserRouter>
        <Lookup query={this.state.query} />
      </div>
    )
  }
}

export default App
