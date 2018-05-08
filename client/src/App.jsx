import React, { Component, } from 'react'
import { BrowserRouter, Route, Switch, withRouter, } from 'react-router-dom'
import BarcodeReader from './BarcodeReader'
import Books from './Books'
import Lookup from './Lookup/index.jsx'
import LookupPage from './LookupPage'
import AddButton from './AddButton'
import Nav from './Nav'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { query: null, }
  }

  render() {
    return (
      <BrowserRouter>
        <div className="code">
          <Nav />
          <Switch>
            <Route exact path="/" component={Books} />
            <Route path="/lookup/:isbn" component={withRouter(Lookup)} />
            <Route path="/add" component={LookupPage} />
            <Route path="/add" component={LookupPage} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default App
