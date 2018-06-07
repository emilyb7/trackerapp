import React, { Component, } from 'react'
import { BrowserRouter, Route, Switch, } from 'react-router-dom'
import { createStore, } from 'redux'
import { Provider, } from 'react-redux'

import Books from './Books'
import Result from './Result'
import LookupPage from './LookupPage'
import Nav from './Nav'
import Book from './Book.jsx'
import reducer from './reducer'

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__
    ? window.__REDUX_DEVTOOLS_EXTENSION__()
    : f => f
)

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="code">
            <Nav />
            <Switch>
              <Route exact path="/" component={Books} />
              <Route path="/result/:isbn" component={Result} />
              <Route path="/add" component={LookupPage} />
              <Route path="/library/:id" component={Book} />
            </Switch>
          </div>
        </BrowserRouter>
      </Provider>
    )
  }
}

export default App
