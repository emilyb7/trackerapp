import React, { Component, } from 'react'
import { BrowserRouter, Route, Switch, withRouter, } from 'react-router-dom'

import Books from './Books'
import Result from './Result'
import LookupPage from './LookupPage'
import Nav from './Nav'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { query: null, }
  }

  render() {
    return (
      <BrowserRouter>
        <Route
          render={({ location, }) => (
            <div className="code">
              <Nav />
              <Switch location={location}>
                <Route exact path="/" component={Books} />
                <Route path="/result/:isbn" component={withRouter(Result)} />
                <Route path="/add" component={LookupPage} />
              </Switch>
            </div>
          )}
        />
      </BrowserRouter>
    )
  }
}

export default App
