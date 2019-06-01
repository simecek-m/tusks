import React from 'react';

import './App.sass';
import Todos from './Todos'
import Error from './Error'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

function App() {

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Todos} />
        <Route component={Error} />
      </Switch>
    </BrowserRouter>
  )
}

export default App;