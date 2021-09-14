import React from 'react'
import Login from './pages/login/Login'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Provider } from './context/index'
import Curriencies from './pages/currencies/Currencies'
import UpdateCurriencies from './pages/update/UpdateCurriencies'
import HomePage from './pages/homepage/HomePage'

function App(): React.ReactNode {
  return (
    <Provider>
      <Router>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/currency" component={Curriencies} />
          <Route exact path="/currency/update" component={UpdateCurriencies} />
          <Route path="*" component={HomePage} />
        </Switch>
      </Router>
    </Provider>
  )
}

export default App
