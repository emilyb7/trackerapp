import React, { Component, } from 'react'
import { BrowserRouter, Route, Switch, } from 'react-router-dom'
import { applyMiddleware, createStore, combineReducers, } from 'redux'
import { Provider, } from 'react-redux'
import { composeWithDevTools, } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import Library, { libraryReducer, } from './Library'
import NewBook from './NewBook'

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
            <Switch>
              <Route exact path="/" component={Library} />
              <Route path="/new" component={NewBook} />
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
