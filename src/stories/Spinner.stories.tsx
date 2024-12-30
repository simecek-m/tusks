import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Spinner } from "component/common/Spinner";

export default {
  title: "Spinner",
  component: Spinner,
} as ComponentMeta<typeof Spinner>;

const Template: ComponentStory<typeof Spinner> = (args) => (
  <Spinner {...args} />
);

export const Primary = Template.bind({});
