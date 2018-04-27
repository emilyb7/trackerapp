import React, { Component, } from 'react'
import { BrowserRouter, Route, Switch, withRouter, } from 'react-router-dom'
import BarcodeReader from './BarcodeReader'
import Books from './Books'
import Lookup from './Lookup'
import AddButton from './AddButton'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { query: null, }
  }

  // updateQuery = code => {
  //   this.setState({ ...this.state, query: code, })
  // }

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

        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={AddButton} />
            <Route path="/scan" component={BarcodeReaderWrapped} />
            <Route path="/lookup/:isbn" component={withRouter(Lookup)} />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

export default App
