import React, { Component, } from 'react'
import { BrowserRouter, Route, Switch, withRouter, } from 'react-router-dom'
import BarcodeReader from './BarcodeReader'
import Books from './Books'
import Lookup from './Lookup/index.jsx'
import AddButton from './AddButton'
import Nav from './Nav'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { query: null, }
  }

  render() {
    const BarcodeReaderWrapped = () => (
      <BarcodeReader updateQuery={this.updateQuery} />
    )

    return (
      <BrowserRouter>
        <div className="code h-100 relative">
          <Nav />
          <Books />

          <Switch>
            <Route exact path="/" component={AddButton} />
            <Route path="/scan" component={BarcodeReaderWrapped} />
            <Route path="/lookup/:isbn" component={withRouter(Lookup)} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default App
