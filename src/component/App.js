import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Todos from 'component/Todos';
import Error from 'component/Error';
import 'component/App.sass';

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