import React from 'react'
import Login from './pages/login/login'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Provider } from './context/index'
import Curriencies from './pages/currencies/currencies'
import UpdateCurriencies from './pages/update/update-curriencies'

function App() {
  return (
    <Provider>
        <Router>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/currency" component={Curriencies} />
            <Route exact path="/currency/update" component={UpdateCurriencies} />
          </Switch>
        </Router>
    </Provider>
  )
}

export default App
