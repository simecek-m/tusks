import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Todos from 'component/Todos';
import Error from 'component/Error';
import Login from 'component/Login';
import Profile from 'component/Profile';
import 'component/App.sass';
import AnonymousRoute from 'router/AnonymousRoute'
import ProtectedRoute from 'router/ProtectedRoute';

function App() {

  return (
    <BrowserRouter>
      <Switch>
        <AnonymousRoute path="/login" component={Login} />
        <ProtectedRoute exact path="/" component={Todos} />
        <ProtectedRoute path="/profile" component={Profile} />
        <Route component={Error} />
      </Switch>
    </BrowserRouter>
  )
}

export default App;