import React, { Component, } from 'react'
import { BrowserRouter, Route, Switch, } from 'react-router-dom'
import { applyMiddleware, createStore, combineReducers, } from 'redux'
import { Provider, } from 'react-redux'
import { composeWithDevTools, } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import Library, { libraryReducer, } from './Library'
// import Result from './Result'
// import LookupPage from './LookupPage'
import Nav from './Nav'
// import Book from './Book.jsx'
import reducer from './reducer'

const store = createStore(
  combineReducers({
    library: libraryReducer,
  }),
  composeWithDevTools(applyMiddleware(thunk))
)

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="code">
            <Nav />
            <Switch>
              <Route exact path="/" component={Library} />
              {/*<Route path="/result/:isbn" component={Result} />
              <Route path="/add" component={LookupPage} />
              <Route path="/library/:id" component={Book} />*/}
            </Switch>
          </div>
        </BrowserRouter>
      </Provider>
    )
  }
}

export default App
