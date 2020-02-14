import React from "react";
import { ProtectedRoute } from "router/ProtectedRoute";
import { shallow } from "enzyme";

const TEST_MOCK_COMPONENT = () => <div>Component</div>;
const TEST_USER_JWT = "xxxxx.yyyyy.zzzzz";

describe("ProtectedRoute component", () => {
  test("should render Redirect component", () => {
    const wrapper = shallow(<ProtectedRoute user={null} />);
    expect(wrapper).toMatchSnapshot();
  });
  test("should render Route to props component", () => {
    const wrapper = shallow(
      <ProtectedRoute user={TEST_USER_JWT} component={TEST_MOCK_COMPONENT} />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
