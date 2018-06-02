import React, { Component, } from 'react'
import { BrowserRouter, Route, Switch, withRouter, } from 'react-router-dom'
import { createStore, } from 'redux'
import { Provider, } from 'react-redux'

import Books from './Books'
import Result from './Result'
import LookupPage from './LookupPage'
import Nav from './Nav'
import reducer from './reducer'

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__
    ? window.__REDUX_DEVTOOLS_EXTENSION__()
    : f => f
)

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { query: null, }
  }

  render() {
    return (
      <Provider store={store}>
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
      </Provider>
    )
  }
}

export default App
