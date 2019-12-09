import React from "react";
import renderer from "react-test-renderer";
import { Router, Switch } from "react-router-dom";
import { history } from "router";
import Back from "component/navigation/Back";

describe("Back component", () => {
  test("should render back", () => {
    const component = renderer
      .create(
        <Router history={history}>
          <Switch>
            <Back />
          </Switch>
        </Router>
      )
      .toJSON();
    expect(component).toMatchSnapshot();
  });
});
