import React from "react";
import "animate.css";
import { connect } from "react-redux";
import "component/App.sass";
import { Router } from "react-router-dom";
import { history } from "router";
import { Switch } from "react-router-dom";
import AnonymousRoute from "router/AnonymousRoute";
import ProtectedRoute from "router/ProtectedRoute";
import HomePage from "page/Home";
import ListPage from "page/List";

function App({ theme }) {
  return (
    <div className={`theme-${theme}`}>
      <Router history={history}>
        <Switch>
          <AnonymousRoute exact path="/" component={HomePage} />
          <ProtectedRoute path="/list" component={ListPage} />
        </Switch>
      </Router>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    theme: state.theme
  };
};
export default connect(mapStateToProps)(App);
