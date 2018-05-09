import React, { Component, } from 'react'
import { BrowserRouter, Route, Switch, withRouter, } from 'react-router-dom'
import { TransitionGroup, CSSTransition, } from 'react-transition-group'

import Books from './Books'
import Lookup from './Lookup/index.jsx'
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
              <TransitionGroup>
                <CSSTransition
                  key={location.key}
                  classNames="fade"
                  timeout={500}
                >
                  <Switch location={location}>
                    <Route exact path="/" component={Books} />
                    <Route
                      path="/lookup/:isbn"
                      component={withRouter(Lookup)}
                    />
                    <Route path="/add" component={LookupPage} />
                  </Switch>
                </CSSTransition>
              </TransitionGroup>
            </div>
          )}
        />
      </BrowserRouter>
    )
  }
}

export default App
