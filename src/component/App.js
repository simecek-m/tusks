import React from "react";
import "animate.css";
import { HomePage } from "./page/Home";
import { connect } from "react-redux";
import "component/App.sass";

function App({ theme }) {
  return (
    <div className={`theme-${theme}`}>
      <HomePage />
    </div>
  );
}

const mapStateToProps = state => {
  return {
    theme: state.theme
  };
};
export default connect(mapStateToProps)(App);
