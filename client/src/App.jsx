import React, { Component, } from 'react'
import { Route, Switch, } from 'react-router-dom'
import {
  connectRouter,
  ConnectedRouter,
  routerMiddleware,
} from 'connected-react-router'

import { createBrowserHistory, } from 'history'
import { applyMiddleware, createStore, combineReducers, } from 'redux'
import { Provider, } from 'react-redux'
import { composeWithDevTools, } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import Library, { libraryReducer, } from './Library'
import NewBook from './NewBook'

const history = createBrowserHistory()

const store = createStore(
  combineReducers({
    library: libraryReducer,
    router: connectRouter(history),
  }),
  composeWithDevTools(applyMiddleware(thunk, routerMiddleware(history)))
)

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <div className="code">
            <Switch>
              <Route exact path="/" component={Library} />
              <Route path="/new" component={NewBook} />
              {/*<Route path="/result/:isbn" component={Result} />
              <Route path="/add" component={LookupPage} />
              <Route path="/library/:id" component={Book} />*/}
            </Switch>
          </div>
        </ConnectedRouter>
      </Provider>
    )
  }
}

export default App
