import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import Todos from "component/page/Todos";
import Error from "component/error/Error";
import Login from "component/page/Login";
import Profile from "component/page/Profile";
import TodoList from "component/page/TodoList";
import About from "component/page/About";
import "component/App.sass";
import AnonymousRoute from "router/AnonymousRoute";
import ProtectedRoute from "router/ProtectedRoute";
import { history } from "router";
import "animate.css";

function App() {
  return (
    <Router history={history}>
      <Switch>
        <AnonymousRoute path="/login" component={Login} />
        <ProtectedRoute exact path="/" component={Todos} />
        <ProtectedRoute path="/profile" component={Profile} />
        <ProtectedRoute path="/lists/:id" component={TodoList} />
        <ProtectedRoute path="/about" component={About} />
        <Route component={Error} />
      </Switch>
    </Router>
  );
}

export default App;
