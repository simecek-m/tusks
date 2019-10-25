import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Todos from "component/page/Todos";
import Error from "component/error/Error";
import Login from "component/page/Login";
import Profile from "component/page/Profile";
import TodoList from "component/page/TodoList";
import "component/App.sass";
import AnonymousRoute from "router/AnonymousRoute";
import ProtectedRoute from "router/ProtectedRoute";
import "animate.css";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <AnonymousRoute path="/login" component={Login} />
        <ProtectedRoute exact path="/" component={Todos} />
        <ProtectedRoute path="/profile" component={Profile} />
        <ProtectedRoute path="/todos/:id" component={TodoList} />
        <Route component={Error} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
