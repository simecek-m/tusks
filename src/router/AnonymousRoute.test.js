import React from "react";
import { AnonymousRoute } from "router/AnonymousRoute";
import { shallow } from "enzyme";

const TEST_MOCK_COMPONENT = () => <div>Component</div>;
const TEST_USER_JWT = "xxxxx.yyyyy.zzzzz";

describe("AnonymousRoute component", () => {
  test("should render Route to props component", () => {
    const wrapper = shallow(
      <AnonymousRoute user={null} component={TEST_MOCK_COMPONENT} />
    );
    expect(wrapper).toMatchSnapshot();
  });
  test("should render Redirect component", () => {
    const wrapper = shallow(<AnonymousRoute user={TEST_USER_JWT} />);
    expect(wrapper).toMatchSnapshot();
  });
});
